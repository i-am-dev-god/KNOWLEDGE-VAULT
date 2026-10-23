#!/usr/bin/env python3
"""Master and align the noise-cancelling explainer's selected narration.

Speech is generated separately with Arena's speech tool using ONLY voice-00.
This script never selects or synthesizes a voice. It uses one continuous take,
never speeds it up, and derives all timings from verified ASR word timestamps.

Commands (with numpy and soundfile installed):
  FFMPEG_BIN=/path/to/ffmpeg python tools/gen_noise_cancelling_ai_speech.py master
  python tools/gen_noise_cancelling_ai_speech.py align
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import subprocess

import numpy as np
import soundfile as sf

ROOT = Path(__file__).resolve().parents[1]
SHORT_ID = "short-15-noise-cancelling"
SHORT_ROOT = ROOT / "shorts" / SHORT_ID
WORK = SHORT_ROOT / "output" / "ai-speech"
PUBLIC = ROOT / "media" / "voiceovers" / "noise-cancelling"
RAW = WORK / "voice-00-full-raw.wav"
TRIMMED = WORK / "voice-00-trimmed-48k.wav"
PACED = WORK / "voice-00-paced-48k.wav"
MASTER_METADATA = WORK / "master.json"
NARRATION = PUBLIC / "narration.wav"
ASR = SHORT_ROOT / "transcription-voice-00.json"
VOICE_ID = "voice-00"
SAMPLE_RATE = 48000
DURATION_S = 60.0
INITIAL_SILENCE_S = 0.8
TARGET_VOICE_END_S = 52.0
FFMPEG = os.environ.get("FFMPEG_BIN", "ffmpeg")

LINES = [
    {"id": "hook-block", "scene": "hook", "text": "Noise-cancelling headphones do not just block sound."},
    {"id": "hook-add", "scene": "hook", "text": "They erase part of it by adding more sound."},
    {"id": "waves-pressure", "scene": "waves", "text": "Sound travels through air as pressure waves, with peaks and troughs."},
    {"id": "listen-microphone", "scene": "listen", "text": "A tiny microphone on the outside listens to the noise around you."},
    {"id": "listen-copy", "scene": "listen", "text": "Inside, the electronics create a copy of that noise."},
    {"id": "invert-flip", "scene": "invert", "text": "But the copy is flipped: every peak becomes a trough."},
    {"id": "invert-play", "scene": "invert", "text": "The speaker plays this anti-noise at exactly the right moment."},
    {"id": "cancel-meet", "scene": "cancel", "text": "When both waves reach your ear, their opposing pressures largely cancel."},
    {"id": "cancel-name", "scene": "cancel", "text": "This is called destructive interference."},
    {"id": "limits-steady", "scene": "limits", "text": "It works best on steady, low sounds, like an engine's hum."},
    {"id": "limits-sudden", "scene": "limits", "text": "Sudden sounds are harder to predict, so some noise still gets through."},
    {"id": "closing-reverse", "scene": "closing", "text": "So silence is not always less sound. Sometimes, it is a carefully timed copy, played in reverse."},
]

SCENE_DEFS = [
    ("hook", "Silence, made with sound"),
    ("waves", "Sound is pressure"),
    ("listen", "First, listen"),
    ("invert", "Make the opposite"),
    ("cancel", "Opposites cancel"),
    ("limits", "Best with steady noise"),
    ("closing", "Quiet, by design"),
]

CUE_DEFS = [
    {"sync_source": "hook-block", "offset_s": -0.45, "sfx_id": "impact-soft", "gain_db": -15.0, "cue": "Soft opening emphasis"},
    {"sync_source": "waves-pressure", "offset_s": -0.30, "sfx_id": "whoosh-soft", "gain_db": -17.0, "cue": "Pressure-wave scene transition"},
    {"sync_source": "listen-microphone", "offset_s": -0.10, "sfx_id": "scan-hum", "gain_db": -19.0, "cue": "Microphone listens"},
    {"sync_source": "invert-flip", "offset_s": -0.15, "sfx_id": "whoosh-reverse", "gain_db": -18.0, "cue": "Wave inversion"},
    {"sync_source": "cancel-meet", "offset_s": -0.15, "sfx_id": "impact-deep-soft", "gain_db": -17.0, "cue": "Wave cancellation"},
    {"sync_source": "limits-steady", "offset_s": -0.30, "sfx_id": "whoosh-soft", "gain_db": -18.0, "cue": "Limits scene transition"},
    {"sync_source": "closing-reverse", "offset_s": -0.25, "sfx_id": "warm-shimmer", "gain_db": -18.0, "cue": "Closing recap"},
    {"sync_source": "closing-reverse", "offset_s": 0.20, "sfx_id": "chime-reward", "gain_db": -19.0, "cue": "Final reverse-copy idea"},
]


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def run(command: list[str]) -> None:
    subprocess.run(command, check=True)


def audio_duration(path: Path) -> float:
    info = sf.info(str(path))
    return info.frames / info.samplerate


def js_string(value: str) -> str:
    return "'" + value.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n") + "'"


def normalize_tokens(text: str) -> list[str]:
    """Normalize harmless spelling differences, never different wording."""
    text = text.lower().replace("’", "'")
    compact = re.sub(r"[\s-]+", "", text).strip(".")
    if compact == "antinoise":
        return ["anti", "noise"]
    tokens = re.findall(r"[a-z0-9]+", text.replace("'", ""))
    aliases = {"canceling": "cancelling"}
    return [aliases.get(token, token) for token in tokens]


def write_ts_module(timed: list[dict], scenes: list[dict], cues: list[dict]) -> None:
    vo_rows = [
        "  { id: %s, scene: %s, text: %s, start: %.3f, end: %.3f },"
        % (js_string(x["id"]), js_string(x["scene"]), js_string(x["text"]), x["start"], x["end"])
        for x in timed
    ]
    scene_rows = [
        "  { id: %s, title: %s, start: %.3f, end: %.3f },"
        % (js_string(x["id"]), js_string(x["title"]), x["start"], x["end"])
        for x in scenes
    ]
    cue_rows = [
        "  { at: %.3f, id: %s, gain: %.6f },"
        % (x["at_s"], js_string(x["sfx_id"]), 10 ** (x["gain_db"] / 20))
        for x in cues
    ]
    path = ROOT / "remotion" / "src" / "shots" / "short-15" / "vo.gen.ts"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        "// Generated by tools/gen_noise_cancelling_ai_speech.py.\n"
        "// One continuous user-selected voice-00 take; verified ASR alignment.\n\n"
        "export type AncLine = { id: string; scene: string; text: string; start: number; end: number };\n"
        "export type AncScene = { id: string; title: string; start: number; end: number };\n\n"
        "export const VO: AncLine[] = [\n" + "\n".join(vo_rows) + "\n];\n\n"
        "export const SCENES: AncScene[] = [\n" + "\n".join(scene_rows) + "\n];\n\n"
        "export const SFX_CUES: { at: number; id: string; gain: number }[] = [\n"
        + "\n".join(cue_rows) + "\n];\n"
    )


def master() -> None:
    WORK.mkdir(parents=True, exist_ok=True)
    PUBLIC.mkdir(parents=True, exist_ok=True)
    if not RAW.is_file():
        raise SystemExit(f"Missing selected-voice take: {RAW}")
    if sf.info(str(RAW)).samplerate != 24000:
        raise SystemExit("Expected the selected speech tool's 24 kHz WAV")

    run([
        FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-i", str(RAW),
        "-af", "silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.08,"
               "areverse,silenceremove=start_periods=1:start_threshold=-45dB:start_silence=0.15,"
               "areverse,aresample=48000",
        "-ar", "48000", "-ac", "1", "-c:a", "pcm_s16le", str(TRIMMED),
    ])
    trimmed_duration = audio_duration(TRIMMED)
    requested_rate = trimmed_duration / (TARGET_VOICE_END_S - INITIAL_SILENCE_S)
    # This video intentionally slows down. Never speed the selected take up to fill time.
    tempo_rate = min(1.0, requested_rate)
    if not 0.86 <= tempo_rate <= 1.0:
        raise SystemExit(f"Pacing would be unnatural: {tempo_rate:.4f}x")
    run([
        FFMPEG, "-hide_banner", "-loglevel", "error", "-y", "-i", str(TRIMMED),
        "-af", f"atempo={tempo_rate:.9f}",
        "-ar", "48000", "-ac", "1", "-c:a", "pcm_f32le", str(PACED),
    ])
    paced, sample_rate = sf.read(PACED, dtype="float32")
    if sample_rate != SAMPLE_RATE:
        raise SystemExit("Unexpected paced sample rate")
    master_audio = np.zeros(round(DURATION_S * SAMPLE_RATE), dtype=np.float32)
    start = round(INITIAL_SILENCE_S * SAMPLE_RATE)
    end = start + len(paced)
    if end > master_audio.size:
        raise SystemExit("Selected-voice narration exceeds 60 seconds")
    master_audio[start:end] = paced
    sf.write(NARRATION, master_audio, SAMPLE_RATE, subtype="PCM_16")
    script = " ".join(line["text"] for line in LINES)
    metadata = {
        "voice_id": VOICE_ID,
        "voice_selection": "User-selected narration voice; one continuous take; no alternate voice used",
        "take": "One continuous full-script take",
        "raw_file": str(RAW.relative_to(ROOT)),
        "raw_sha256": sha256(RAW),
        "raw_duration_seconds": round(audio_duration(RAW), 6),
        "trimmed_duration_seconds": round(trimmed_duration, 6),
        "tempo_rate": round(tempo_rate, 9),
        "requested_tempo_rate": round(requested_rate, 9),
        "tempo_algorithm": "FFmpeg atempo WSOLA; pitch preserved; never faster than the source take",
        "initial_silence_seconds": INITIAL_SILENCE_S,
        "narration_file": str(NARRATION.relative_to(ROOT)),
        "narration_sha256": sha256(NARRATION),
        "narration_duration_seconds": audio_duration(NARRATION),
        "paced_speech_end_seconds": round(end / SAMPLE_RATE, 6),
        "script_sha256": hashlib.sha256(script.encode()).hexdigest(),
        "spoken_words": len(normalize_tokens(script)),
    }
    MASTER_METADATA.write_text(json.dumps(metadata, indent=2) + "\n")
    print(json.dumps(metadata, indent=2))


def align() -> None:
    metadata = json.loads(MASTER_METADATA.read_text())
    if metadata["voice_id"] != VOICE_ID:
        raise SystemExit("Voice ID mismatch; refusing to change the selected voice")
    if sha256(NARRATION) != metadata["narration_sha256"]:
        raise SystemExit("Narration changed after mastering")
    result = json.loads(ASR.read_text())
    if result.get("voice_id") != VOICE_ID:
        raise SystemExit("ASR voice ID mismatch")
    if result["audio_sha256"] != metadata["narration_sha256"]:
        raise SystemExit("ASR does not belong to the selected-voice narration master")

    expected_flat = []
    for index, segment in enumerate(LINES):
        expected_flat.extend((index, token) for token in normalize_tokens(segment["text"]))
    words = [word for segment in result["segments"] for word in segment.get("words", [])]
    asr_alignment = [(token, word) for word in words for token in normalize_tokens(word["word"])]
    asr_tokens = [token for token, _ in asr_alignment]
    expected_tokens = [token for _, token in expected_flat]
    if expected_tokens != asr_tokens:
        mismatch = next(
            (i for i, pair in enumerate(zip(expected_tokens, asr_tokens)) if pair[0] != pair[1]),
            min(len(expected_tokens), len(asr_tokens)),
        )
        raise SystemExit(
            "Normalized script/ASR mismatch at token "
            f"{mismatch}: expected={expected_tokens[mismatch:mismatch+8]} "
            f"asr={asr_tokens[mismatch:mismatch+8]}; lengths={len(expected_tokens)}/{len(asr_tokens)}"
        )

    timed = []
    cursor = 0
    for index, segment in enumerate(LINES):
        count = len(normalize_tokens(segment["text"]))
        segment_alignment = asr_alignment[cursor:cursor + count]
        cursor += count
        start = max(INITIAL_SILENCE_S, float(segment_alignment[0][1]["start"]))
        end = float(segment_alignment[-1][1]["end"])
        timed.append({
            **segment,
            "speak": segment["text"],
            "start": round(start, 3),
            "end": round(end, 3),
            "duration": round(end - start, 3),
        })
    if cursor != len(asr_alignment):
        raise SystemExit("Not all ASR tokens were aligned")
    voice_end = timed[-1]["end"]
    if voice_end > 55.0:
        raise SystemExit(f"Narration ends too late for a calm outro: {voice_end}")

    scenes = []
    for index, (scene_id, title) in enumerate(SCENE_DEFS):
        members = [item for item in timed if item["scene"] == scene_id]
        start = 0.0 if index == 0 else max(0.0, members[0]["start"] - 0.55)
        scenes.append({"id": scene_id, "title": title, "start": round(start, 3), "end": None})
    for index in range(len(scenes) - 1):
        scenes[index]["end"] = scenes[index + 1]["start"]
    scenes[-1]["end"] = DURATION_S

    by_id = {item["id"]: item for item in timed}
    cues = []
    for event in CUE_DEFS:
        cues.append({
            "at_s": round(max(0.0, by_id[event["sync_source"]]["start"] + event["offset_s"]), 3),
            "sfx_id": event["sfx_id"],
            "gain_db": event["gain_db"],
            "cue": event["cue"],
            "sync_source": event["sync_source"],
        })

    new_beats = {
        "id": SHORT_ID,
        "title": "How Noise-Cancelling Headphones Erase Sound",
        "composition": "Short15NoiseCancelling",
        "format": {"width": 1080, "height": 1920, "fps": 30, "durationSec": DURATION_S},
        "voiceStatus": "ai-speech:voice-00:user-selected:complete",
        "aiSpeech": {
            **metadata,
            "alignment": f"{result['engine']} {result['model']} word timestamps on the exact paced narration master",
            "normalized_script_match": True,
            "mean_word_probability": result["mean_word_probability"],
        },
        "pacing": "Calmer explainer edit; source narration is never sped up; no caption progress line",
        "voiceEnd": voice_end,
        "scenes": scenes,
        "vo": timed,
    }
    (SHORT_ROOT / "beats.json").write_text(json.dumps(new_beats, indent=2) + "\n")
    new_plan = {
        "master": f"RESULT/how-noise-cancelling-headphones-work.mp4",
        "master_fps": 30,
        "catalog": "media/library/sfx/catalog.json",
        "music": {
            "id": "ambient-pad",
            "file": "media/library/music/clips/ambient-pad.mp3",
            "ducked_under_narration": True,
            "style": "Slow ambient pad; no drums or driving pulse",
        },
        "render": {
            "composition": "remotion/out/Short15NoiseCancelling.mp4",
            "out": "RESULT/how-noise-cancelling-headphones-work.mp4",
            "end_s": DURATION_S,
        },
        "note": "Eight restrained cues aligned to one continuous user-selected voice-00 narration take.",
        "events": cues,
    }
    (SHORT_ROOT / "sfx-plan.json").write_text(json.dumps(new_plan, indent=2) + "\n")
    write_ts_module(timed, scenes, cues)
    print(f"Aligned {len(timed)} captions, {len(scenes)} scenes, and {len(cues)} cues; voice end={voice_end:.3f}s")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("command", choices=["master", "align"])
    args = parser.parse_args()
    if args.command == "master":
        master()
    else:
        align()
