#!/usr/bin/env python3
"""Scaffold beats.json and vo.gen.ts for Shorts 51-55 with estimated timings.

Estimated timings are linear per-character distribution within each project's
duration, respecting initial_silence 0.15s. Will be replaced after real voice-00
master/alignment. This unblocks rectified TSX rendering immediately.
"""
import json
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "tools" / "shorts-51-55-projects.json").read_text())
defaults = CONFIG["defaults"]

for proj in CONFIG["projects"]:
    total_chars = sum(len(li["text"]) for li in proj["lines"])
    total_voice_window = proj["duration_s"] - 0.9 - defaults["initial_silence_s"]  # target_voice_end - initial_silence
    # fallback: distribute proportionally to char count
    cursor = defaults["initial_silence_s"]
    vo_entries = []
    scene_bounds = {}
    # compute per-scene time: scenes are equal share weighted by line char length inside scene
    for scene in proj["scenes"]:
        sid = scene[0]
        # sum chars in scene
        scene_chars = sum(len(li["text"]) for li in proj["lines"] if li["scene"]==sid)
        scene_duration = total_voice_window * scene_chars / total_chars if total_chars else total_voice_window/len(proj["scenes"])
        # keep scene start/end for later
        # We'll compute linearly; store
    # Second pass to assign vo starts/ends sequentially
    # Compute scene start/end based on grouped vo distribution
    # Build vo with proportional duration
    vo = []
    for li in proj["lines"]:
        dur = total_voice_window * len(li["text"]) / total_chars
        vo.append({"id": li["id"], "scene": li["scene"], "text": li["text"], "start": round(cursor,3), "end": round(cursor+dur,3)})
        cursor += dur
        # tiny gap 0.12 between lines for breathe? but we already distribute continuously; leave 0 for now
    # derive scenes start/end from vo grouping
    from collections import defaultdict
    scene_groups = defaultdict(list)
    for v in vo:
        scene_groups[v["scene"]].append(v)
    scenes = []
    for sid, title in proj["scenes"]:
        group = scene_groups[sid]
        if group:
            s = min(x["start"] for x in group)
            e = max(x["end"] for x in group)
            # expand slightly to include leading silence for first scene
            if sid == proj["scenes"][0][0]:
                s = 0.0
            # last scene extends to duration
            if sid == proj["scenes"][-1][0]:
                e = proj["duration_s"]
            scenes.append({"id": sid, "title": title, "start": round(s,3), "end": round(e,3)})
    # cues
    cues = []
    for c in proj["cues"]:
        # find source line start
        src = next((v for v in vo if v["id"]==c["sync_source"]), None)
        if src:
            at = src["start"] + c["offset_s"]
            cues.append({"at": round(at,3), "id": c["sfx_id"], "gain": round(10**(c["gain_db"]/20),6)})
    # build beats.json
    short_root = ROOT / "shorts" / proj["id"]
    short_root.mkdir(parents=True, exist_ok=True)
    beats = {
        "id": proj["id"],
        "title": proj["title"],
        "composition": proj["composition"],
        "format": {"width": defaults["width"], "height": defaults["height"], "fps": defaults["fps"], "durationSec": proj["duration_s"]},
        "voiceStatus": "ai-speech:voice-00:user-selected:estimated",
        "aiSpeech": {
            "voice_id": "voice-00",
            "voice_selection": "User-selected narration voice; one continuous take; no alternate voice used",
            "take": "One continuous full-script take (ESTIMATED timing — replace after voice-00 master)",
            "raw_file": f"shorts/{proj['id']}/output/ai-speech/voice-00-full-raw.wav",
            "raw_sha256": "pending",
            "raw_duration_seconds": round(total_voice_window + 1.0, 3),
            "trimmed_duration_seconds": round(total_voice_window,3),
            "tempo_rate": 1.0,
            "requested_tempo_rate": 1.0,
            "tempo_algorithm": "FFmpeg atempo WSOLA; pitch preserved; never faster than source",
            "initial_silence_seconds": defaults["initial_silence_s"],
            "target_voice_end_seconds": proj["target_voice_end_s"],
            "narration_file": f"media/voiceovers/{proj['slug']}/narration.wav",
            "narration_sha256": "pending",
            "narration_duration_seconds": proj["duration_s"],
            "paced_speech_end_seconds": round(cursor,3),
            "script_sha256": "pending",
            "spoken_words": sum(len(li["text"].split()) for li in proj["lines"]),
            "alignment": "ESTIMATED linear per-char distribution; replace with faster-whisper medium.en after voice-00",
        },
        "pacing": f"Calm {proj['duration_s']:.0f}-second explainer; source never sped up; no caption progress line",
        "voiceEnd": round(cursor,2),
        "scenes": scenes,
        "vo": vo,
        "sfx": cues,
    }
    # write beats.json
    (short_root / "beats.json").write_text(json.dumps(beats, indent=2)+"\n")
    # write vo.gen.ts
    shot_num = proj["id"].split("-")[1]  # e.g. 51
    tsx_dir = ROOT / "remotion" / "src" / "shots" / f"short-{shot_num}"
    tsx_dir.mkdir(parents=True, exist_ok=True)
    vo_rows = [f"  {{ id: '{x['id']}', scene: '{x['scene']}', text: '{x['text'].replace(chr(39), chr(92)+chr(39))}', start: {x['start']:.3f}, end: {x['end']:.3f} }}," for x in vo]
    scene_rows = [f"  {{ id: '{x['id']}', title: '{x['title'].replace(chr(39), chr(92)+chr(39))}', start: {x['start']:.3f}, end: {x['end']:.3f} }}," for x in scenes]
    cue_rows = [f"  {{ at: {x['at']:.3f}, id: '{x['id']}', gain: {x['gain']:.6f} }}," for x in cues]
    tsx_content = (
        "// Generated by tools/scaffold_shorts_51_55.py — ESTIMATED timing, replace after voice-00 master\n"
        "// One continuous user-selected voice-00 take; rectified visuals (no dancing mesh)\n\n"
        "export type NextLine = { id: string; scene: string; text: string; start: number; end: number };\n"
        "export type NextScene = { id: string; title: string; start: number; end: number };\n\n"
        "export const VO: NextLine[] = [\n" + "\n".join(vo_rows) + "\n];\n\n"
        "export const SCENES: NextScene[] = [\n" + "\n".join(scene_rows) + "\n];\n\n"
        "export const SFX_CUES: { at: number; id: string; gain: number }[] = [\n" + "\n".join(cue_rows) + "\n];\n"
    )
    (tsx_dir / "vo.gen.ts").write_text(tsx_content)
    print(f"Scaffolded {proj['id']} -> {proj['composition']} ({len(vo)} VO, {len(scenes)} scenes)")

# update manifest
manifest_path = ROOT / "remotion" / "src" / "shots.manifest.json"
manifest = json.loads(manifest_path.read_text())
existing_ids = {m["id"] for m in manifest}
added = 0
for proj in CONFIG["projects"]:
    mid = proj["composition"]
    if mid not in existing_ids:
        manifest.append({"id": mid, "durationInSeconds": proj["duration_s"], "fps": defaults["fps"], "width": defaults["width"], "height": defaults["height"]})
        added+=1
manifest_path.write_text(json.dumps(manifest, indent=2)+"\n")
print(f"Manifest updated: +{added} new compositions, total {len(manifest)}")
