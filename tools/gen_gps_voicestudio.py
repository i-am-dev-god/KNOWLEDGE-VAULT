#!/usr/bin/env python3
"""Generate the GPS explainer narration through VoiceStudio.

The narrator is VCTK p251 (Indian male), speaker ID 92 in the Piper
en_GB-vctk-medium model. Every caption clause is synthesized independently, so
its measured audio duration gives exact caption and scene timing without ASR or
estimated word alignment.

Required environment:
  VOICESTUDIO_BACKEND_DIR=/path/to/VoiceStudio/backend
  OMNIVOICE_SHERPA_MODEL=/path/to/prepared/en_GB-vctk-medium

The prepared model directory must contain model.onnx, tokens.txt and
espeak-ng-data. Append --reuse to reuse the raw VoiceStudio segment WAVs.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import sys

import numpy as np
import soundfile as sf
import torch
import torchaudio.functional as AF

ROOT = Path(__file__).resolve().parents[1]
SHORT_ID = "short-14-gps-explainer"
FPS = 30
DURATION_S = 60.0
SAMPLE_RATE = 48000
INITIAL_SILENCE_S = 0.65
TARGET_VOICE_END_S = 56.2
INTRA_SCENE_GAP_S = 0.14
SPEAKER_ID = 92
SPEAKER_NAME = "VCTK p251 — Indian male"
SPEED = 0.88

# id, scene, display caption, spoken text. GPS is spelled for reliable letter
# pronunciation while captions retain the familiar acronym.
SEGMENTS = [
    ("hook-offline", "hook", "Your phone can find you without mobile signal or internet.", "Your phone can find you without mobile signal or internet."),
    ("hook-map", "hook", "The map may need data. GPS itself does not.", "The map may need data. G P S itself does not."),
    ("orbit-altitude", "orbit", "GPS satellites orbit about twenty thousand kilometres above Earth.", "G P S satellites orbit about twenty thousand kilometres above Earth."),
    ("orbit-clock", "orbit", "Each one carries an extremely accurate atomic clock.", "Each one carries an extremely accurate atomic clock."),
    ("signal-position", "signals", "Every satellite broadcasts its position,", "Every satellite broadcasts its position,"),
    ("signal-time", "signals", "and the exact time its signal was sent.", "and the exact time its signal was sent."),
    ("delay-measure", "delay", "Your phone measures how long that signal took to arrive.", "Your phone measures how long that signal took to arrive."),
    ("delay-precise", "delay", "The timing must be astonishingly precise.", "The timing must be astonishingly precise."),
    ("delay-light", "delay", "Because radio waves travel at the speed of light, delay becomes distance.", "Because radio waves travel at the speed of light, delay becomes distance."),
    ("four-one", "four", "One satellite gives a distance, not a fix.", "One satellite gives a distance, not a fix."),
    ("four-position", "four", "Three help solve your position. A fourth corrects your phone's clock.", "Three help solve your position. A fourth corrects your phone's clock."),
    ("four-correction", "four", "Without that correction, the position would be wrong.", "Without that correction, the position would be wrong."),
    ("tri-spheres", "trilateration", "Imagine invisible spheres around the satellites.", "Imagine invisible spheres around the satellites."),
    ("tri-location", "trilateration", "Where the distances meet is your location. That's trilateration.", "Where the distances meet is your location. That's trilateration."),
    ("closing-stopwatch", "closing", "So GPS is a cosmic stopwatch.", "So G P S is a cosmic stopwatch."),
    ("closing-map", "closing", "Satellites send the time. Your phone turns tiny delays into a dot on the map.", "Satellites send the time. Your phone turns tiny delays into a dot on the map."),
]

SCENES = [
    ("hook", "No signal. Still found."),
    ("orbit", "Clocks in orbit"),
    ("signals", "A timestamp from space"),
    ("delay", "Time becomes distance"),
    ("four", "Why four satellites?"),
    ("trilateration", "Trilateration"),
    ("closing", "A cosmic stopwatch"),
]

# Narration-derived cues. Offset is relative to the measured segment start.
SFX = [
    ("hook-offline", -0.40, "impact-soft", -15.0, "Offline-location hook lands"),
    ("hook-map", -0.08, "ui-toggle-on", -15.5, "Map data and GPS are distinguished"),
    ("orbit-altitude", -0.32, "whoosh-soft", -15.0, "Lift from phone into orbit"),
    ("orbit-clock", -0.10, "clock-tick-soft", -15.0, "Atomic-clock reveal"),
    ("signal-position", -0.16, "scan-hum", -17.0, "Satellite begins broadcasting"),
    ("signal-time", -0.05, "ui-send", -15.0, "Timestamp packet leaves the satellite"),
    ("delay-precise", -0.08, "clock-tick-soft", -16.5, "Precision stopwatch emphasis"),
    ("delay-light", 0.10, "sparkle-soft", -15.5, "Delay-to-distance equation resolves"),
    ("four-one", -0.16, "impact-soft", -16.0, "One distance is not a fix"),
    ("four-position", -0.06, "pop-reveal", -15.0, "Four-satellite layout appears"),
    ("four-correction", -0.08, "ui-toggle-on", -16.0, "Clock-correction channel confirmed"),
    ("tri-spheres", -0.25, "whoosh-wind", -16.0, "Wireframe distance spheres expand"),
    ("tri-location", 0.10, "chime-magic", -16.0, "Intersection resolves to receiver"),
    ("closing-stopwatch", -0.20, "warm-shimmer", -16.0, "Cosmic-stopwatch recap"),
    ("closing-map", 0.15, "chime-reward", -16.0, "Final map pin and title"),
]


def trim_voice(samples: np.ndarray, sr: int) -> np.ndarray:
    """Trim edge silence while retaining natural consonants and breath."""
    mono = np.asarray(samples, dtype=np.float32).reshape(-1)
    if mono.size == 0:
        raise RuntimeError("VoiceStudio returned an empty segment")
    window = max(1, int(sr * 0.02))
    padded = np.pad(np.abs(mono), (window // 2, window - 1 - window // 2))
    rms = np.sqrt(np.convolve(padded * padded, np.ones(window) / window, mode="valid"))
    threshold = max(0.00030, float(np.max(rms)) * 0.016)
    active = np.flatnonzero(rms >= threshold)
    if active.size == 0:
        return mono
    first = max(0, int(active[0]) - int(sr * 0.055))
    last = min(mono.size, int(active[-1]) + window + int(sr * 0.13))
    return mono[first:last]


def polish(samples: np.ndarray) -> np.ndarray:
    """Transparent level matching and click-free edges; no voice transformation."""
    mono = np.asarray(samples, dtype=np.float32).reshape(-1)
    rms = float(np.sqrt(np.mean(mono * mono) + 1e-12))
    peak = max(float(np.max(np.abs(mono))), 1e-6)
    gain = min(0.095 / max(rms, 1e-6), 0.90 / peak)
    mono = mono * gain
    fade = min(240, mono.size // 2)
    if fade:
        mono[:fade] *= np.linspace(0.0, 1.0, fade, dtype=np.float32)
        mono[-fade:] *= np.linspace(1.0, 0.0, fade, dtype=np.float32)
    return mono


def resample(samples: np.ndarray, source_rate: int) -> np.ndarray:
    tensor = torch.from_numpy(np.asarray(samples, dtype=np.float32)).reshape(1, -1)
    if source_rate != SAMPLE_RATE:
        tensor = AF.resample(tensor, source_rate, SAMPLE_RATE)
    return tensor.reshape(-1).numpy().astype(np.float32)


def js_string(value: str) -> str:
    return "'" + value.replace("\\", "\\\\").replace("'", "\\'").replace("\n", "\\n") + "'"


def write_ts_module(path: Path, timed: list[dict], scenes: list[dict], cues: list[dict]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
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
        "  { at: %.3f, id: %s, gain: %.6f }," % (x["at_s"], js_string(x["sfx_id"]), 10 ** (x["gain_db"] / 20))
        for x in cues
    ]
    path.write_text(
        "// Generated by tools/gen_gps_voicestudio.py.\n"
        "// Caption boundaries are measured VoiceStudio segment timings, not ASR estimates.\n\n"
        "export type GpsLine = { id: string; scene: string; text: string; start: number; end: number };\n"
        "export type GpsScene = { id: string; title: string; start: number; end: number };\n\n"
        "export const VO: GpsLine[] = [\n" + "\n".join(vo_rows) + "\n];\n\n"
        "export const SCENES: GpsScene[] = [\n" + "\n".join(scene_rows) + "\n];\n\n"
        "export const SFX_CUES: { at: number; id: string; gain: number }[] = [\n" + "\n".join(cue_rows) + "\n];\n"
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--reuse", action="store_true", help="Reuse raw VoiceStudio WAVs in output/voice-segments")
    args = parser.parse_args()

    backend_dir = Path(os.environ.get("VOICESTUDIO_BACKEND_DIR", "/tmp/voicestudio-inspect/backend"))
    model_dir = Path(os.environ.get("OMNIVOICE_SHERPA_MODEL", "/tmp/voicestudio-vctk-piper"))
    if not backend_dir.is_dir():
        raise SystemExit(f"VoiceStudio backend not found: {backend_dir}")
    if not (model_dir / "model.onnx").is_file():
        raise SystemExit(f"Prepared VCTK model not found: {model_dir}")
    os.environ["OMNIVOICE_SHERPA_MODEL"] = str(model_dir)
    sys.path.insert(0, str(backend_dir))

    from services.tts_backend import SherpaOnnxBackend

    output_dir = ROOT / "shorts" / SHORT_ID / "output" / "voice-segments"
    output_dir.mkdir(parents=True, exist_ok=True)
    public_dir = ROOT / "media" / "voiceovers" / "gps-explainer"
    public_dir.mkdir(parents=True, exist_ok=True)

    backend = SherpaOnnxBackend()
    available, reason = backend.is_available()
    if not available:
        raise SystemExit(f"VoiceStudio Sherpa-ONNX is unavailable: {reason}")
    print(f"VoiceStudio: {backend.id}; {SPEAKER_NAME}; sid={SPEAKER_ID}; speed={SPEED}")
    backend.ensure_ready()
    source_rate = backend.sample_rate

    synthesized = []
    for index, (segment_id, scene, display, speak) in enumerate(SEGMENTS, start=1):
        raw_path = output_dir / f"{index:02d}-{segment_id}-raw.wav"
        if args.reuse and raw_path.is_file():
            raw, raw_rate = sf.read(raw_path, dtype="float32")
            if raw_rate != source_rate:
                raise RuntimeError(f"Sample rate changed for cached {raw_path}")
        else:
            print(f"Synthesizing {index:02d}/{len(SEGMENTS)}: {segment_id}", flush=True)
            wav = backend.generate(speak, speed=SPEED, language="en", speaker_id=SPEAKER_ID)
            raw = wav.reshape(-1).cpu().numpy().astype(np.float32)
            sf.write(raw_path, raw, source_rate, subtype="PCM_16")
        processed = resample(polish(trim_voice(raw, source_rate)), source_rate)
        sf.write(output_dir / f"{index:02d}-{segment_id}.wav", processed, SAMPLE_RATE, subtype="PCM_16")
        synthesized.append((segment_id, scene, display, processed))
        print(f"  measured={len(processed) / SAMPLE_RATE:.3f}s", flush=True)

    scene_ids = [scene for scene, _ in SCENES]
    speech_total = sum(len(x[3]) for x in synthesized) / SAMPLE_RATE
    intra_count = len(SEGMENTS) - len(SCENES)
    between_gap = (TARGET_VOICE_END_S - INITIAL_SILENCE_S - speech_total - intra_count * INTRA_SCENE_GAP_S) / (len(SCENES) - 1)
    between_gap = min(0.85, max(0.38, between_gap))

    master = np.zeros(int(DURATION_S * SAMPLE_RATE), dtype=np.float32)
    timed = []
    cursor = INITIAL_SILENCE_S
    for index, (segment_id, scene, display, samples) in enumerate(synthesized):
        duration = len(samples) / SAMPLE_RATE
        start_index = int(round(cursor * SAMPLE_RATE))
        end_index = start_index + len(samples)
        if end_index > master.size:
            raise RuntimeError("Narration exceeds the 60-second composition")
        master[start_index:end_index] += samples
        timed.append({
            "id": segment_id,
            "scene": scene,
            "text": display,
            "speak": SEGMENTS[index][3],
            "start": round(cursor, 3),
            "end": round(cursor + duration, 3),
            "duration": round(duration, 3),
        })
        if index < len(synthesized) - 1:
            next_scene = synthesized[index + 1][1]
            cursor += duration + (INTRA_SCENE_GAP_S if next_scene == scene else between_gap)

    voice_end = timed[-1]["end"]
    if voice_end > 58.4:
        raise RuntimeError(f"Narration ends too late for the outro: {voice_end:.3f}s")
    narration_path = public_dir / "narration.wav"
    sf.write(narration_path, master, SAMPLE_RATE, subtype="PCM_16")

    scene_times = []
    for index, (scene, title) in enumerate(SCENES):
        members = [x for x in timed if x["scene"] == scene]
        start = 0.0 if index == 0 else max(0.0, members[0]["start"] - 0.35)
        end = DURATION_S if index == len(SCENES) - 1 else None
        scene_times.append({"id": scene, "title": title, "start": round(start, 3), "end": end})
    for index in range(len(scene_times) - 1):
        scene_times[index]["end"] = scene_times[index + 1]["start"]
    if scene_ids != [x["id"] for x in scene_times]:
        raise RuntimeError("Scene order mismatch")

    by_id = {x["id"]: x for x in timed}
    cues = []
    for segment_id, offset, sfx_id, gain_db, cue in SFX:
        cues.append({
            "at_s": round(max(0.0, by_id[segment_id]["start"] + offset), 3),
            "sfx_id": sfx_id,
            "gain_db": gain_db,
            "cue": cue,
            "sync_source": segment_id,
        })

    short_root = ROOT / "shorts" / SHORT_ID
    prepared_hash = hashlib.sha256((model_dir / "model.onnx").read_bytes()).hexdigest()
    timeline = {
        "id": SHORT_ID,
        "title": "How GPS Finds You",
        "composition": "Short14GpsExplainer",
        "format": {"width": 1080, "height": 1920, "fps": FPS, "durationSec": DURATION_S},
        "voiceStatus": "voicestudio:sherpa-onnx:vctk-indian-male:complete",
        "voiceStudio": {
            "source": "debpalash/VoiceStudio",
            "engine": backend.id,
            "model": "piper-en_GB-vctk-medium",
            "modelMirror": "tylerjoh86/REJI@2d98055b2c06751902f8f4e93e898ac80888a715",
            "originalModelSha256": "4e9fc85ab9009385319fc6bae7f55577f8a2d7ee77fd9159a5500eb6531f41e6",
            "preparedModelSha256": prepared_hash,
            "speaker": "p251",
            "speakerId": SPEAKER_ID,
            "speakerGender": "male",
            "speakerAccent": "Indian English",
            "sourceSampleRate": source_rate,
            "masterSampleRate": SAMPLE_RATE,
            "speed": SPEED,
            "voiceTransformation": "none",
            "captionTiming": "exact measured synthesis segment boundaries",
        },
        "gaps": {"initial": INITIAL_SILENCE_S, "intraScene": INTRA_SCENE_GAP_S, "betweenScenes": round(between_gap, 3)},
        "voiceEnd": voice_end,
        "scenes": scene_times,
        "vo": timed,
    }
    (short_root / "beats.json").write_text(json.dumps(timeline, indent=2) + "\n")
    plan = {
        "master": f"shorts/{SHORT_ID}/output/how-gps-finds-you.mp4",
        "master_fps": FPS,
        "catalog": "media/library/sfx/catalog.json",
        "music": {"id": "tech-pulse", "file": "media/library/music/clips/tech-pulse.mp3", "ducked_under_narration": True},
        "render": {"composition": "remotion/out/Short14GpsExplainer.mp4", "out": f"shorts/{SHORT_ID}/output/how-gps-finds-you.mp4", "end_s": DURATION_S},
        "note": "All cues are sequenced in Short14GpsExplainer.tsx from exact VoiceStudio segment timings. No estimated word alignment is used.",
        "events": cues,
    }
    (short_root / "sfx-plan.json").write_text(json.dumps(plan, indent=2) + "\n")
    write_ts_module(ROOT / "remotion" / "src" / "shots" / "short-14" / "vo.gen.ts", timed, scene_times, cues)
    print(f"Narration: {narration_path}")
    print(f"Voice ends at {voice_end:.3f}s; between-scene gap={between_gap:.3f}s; master={DURATION_S:.1f}s")


if __name__ == "__main__":
    main()
