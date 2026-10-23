#!/usr/bin/env python3
"""Revoice the GPS explainer with Resemble AI Chatterbox-Nano.

Every caption clause is synthesized independently by Chatterbox. Measured audio
boundaries drive captions, scene transitions and narration-derived SFX cues; no
estimated word alignment is used. The restrained Indian-male voice is cloned
from a short, clean reference retained from the earlier p251 narration, while
all replacement speech is synthesized by Chatterbox-Nano on CPU.

Required environment:
  CHATTERBOX_NANO_DIR=/path/to/ResembleAI/chatterbox-nano
  FFMPEG_BIN=/path/to/ffmpeg (optional when ffmpeg is already on PATH)

The model directory must contain ve.safetensors, t3_nano_v1.safetensors,
s3gen_meanflow.safetensors, conds.pt and the GPT-2 tokenizer files. Install the
official resemble-ai/chatterbox source and its dependencies. Append --reuse to
reuse raw Chatterbox segment WAVs without loading the model.
"""
from __future__ import annotations

import argparse
import gc
import hashlib
import json
import os
from pathlib import Path
import subprocess

import numpy as np
import soundfile as sf
import torch
import torchaudio.functional as AF

ROOT = Path(__file__).resolve().parents[1]
SHORT_ID = "short-14-gps-explainer"
FPS = 30
DURATION_S = 60.0
SAMPLE_RATE = 48000
CHATTERBOX_RATE = 24000
INITIAL_SILENCE_S = 0.65
TARGET_VOICE_END_S = 52.3
INTRA_SCENE_GAP_S = 0.14
TEMPO_RATE = 1.12
FFMPEG_BIN = os.environ.get(
    "FFMPEG_BIN",
    "/tmp/arena-ffmpeg/ffmpeg-linux-x86_64-v7.0.2"
    if Path("/tmp/arena-ffmpeg/ffmpeg-linux-x86_64-v7.0.2").is_file()
    else "ffmpeg",
)
REFERENCE_START_S = 0.65
REFERENCE_END_S = 6.862
BASE_SEED = 1400
TEMPERATURE = 0.7
TOP_P = 0.9
TOP_K = 500
REPETITION_PENALTY = 1.2
EXAGGERATION = 0.0
CFG_WEIGHT = 0.0
CHATTERBOX_SOURCE_COMMIT = "5de7a54aa4e5e2baadb0182dde554908b48b85c2"
MODEL_HASHES = {
    "ve.safetensors": "f0921cab452fa278bc25cd23ffd59d36f816d7dc5181dd1bef9751a7fb61f63c",
    "t3_nano_v1.safetensors": "72b110185087d945dbdf54dee4e333848e1811bdd5fd6cb16ceb8da50006f0c9",
    "s3gen_meanflow.safetensors": "d65cb687a2ed581ee6cc297e919ffefa63386944f42364ae13b78a594945514f",
    "conds.pt": "b1852099306fd6a7814eb9d0bd10186caba7249596cc23868f78a0eefbfa5033",
}

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
    ("four-position", "four", "Three satellites help find your position. A fourth corrects your phone's clock.", "Three satellites help find your position. A fourth corrects your phone's clock."),
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
        raise RuntimeError("Chatterbox returned an empty segment")
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
    """Match segment levels and soften edges without pitch or tempo changes."""
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


def tempo(samples: np.ndarray, rate: float) -> np.ndarray:
    """Pitch-preserving WSOLA pacing through FFmpeg's atempo filter."""
    if rate == 1.0:
        return samples
    command = [
        FFMPEG_BIN, "-hide_banner", "-loglevel", "error",
        "-f", "f32le", "-ar", str(SAMPLE_RATE), "-ac", "1", "-i", "pipe:0",
        "-af", f"atempo={rate}", "-c:a", "pcm_f32le",
        "-f", "f32le", "pipe:1",
    ]
    result = subprocess.run(
        command,
        input=np.asarray(samples, dtype="<f4").tobytes(),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        check=True,
    )
    return np.frombuffer(result.stdout, dtype="<f4").copy()


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
        "// Generated by tools/gen_gps_chatterbox.py.\n"
        "// Caption boundaries are measured Chatterbox segment timings, not ASR estimates.\n\n"
        "export type GpsLine = { id: string; scene: string; text: string; start: number; end: number };\n"
        "export type GpsScene = { id: string; title: string; start: number; end: number };\n\n"
        "export const VO: GpsLine[] = [\n" + "\n".join(vo_rows) + "\n];\n\n"
        "export const SCENES: GpsScene[] = [\n" + "\n".join(scene_rows) + "\n];\n\n"
        "export const SFX_CUES: { at: number; id: string; gain: number }[] = [\n" + "\n".join(cue_rows) + "\n];\n"
    )


def load_nano(model_dir: Path):
    """Memory-safe equivalent of ChatterboxTurboTTS.from_local(..., nano=True)."""
    from safetensors.torch import load_file
    from transformers import AutoTokenizer
    from chatterbox.tts_turbo import ChatterboxTurboTTS, Conditionals
    from chatterbox.models.t3 import T3
    from chatterbox.models.t3.modules.t3_config import T3Config
    from chatterbox.models.s3gen import S3Gen
    from chatterbox.models.voice_encoder import VoiceEncoder

    for filename, expected in MODEL_HASHES.items():
        path = model_dir / filename
        if not path.is_file():
            raise SystemExit(f"Missing Chatterbox-Nano model file: {path}")
        actual = hashlib.sha256(path.read_bytes()).hexdigest()
        if actual != expected:
            raise SystemExit(f"Checksum mismatch for {path}: {actual}")

    ve = VoiceEncoder()
    state = load_file(model_dir / "ve.safetensors")
    ve.load_state_dict(state, assign=True)
    del state
    ve.to("cpu").eval()
    gc.collect()

    hp = T3Config(text_tokens_dict_size=50276)
    hp.llama_config_name = "GPT2_small"
    hp.speech_tokens_dict_size = 6563
    hp.input_pos_emb = None
    hp.speech_cond_prompt_len = 375
    hp.use_perceiver_resampler = False
    hp.emotion_adv = False
    t3 = T3(hp)
    state = load_file(model_dir / "t3_nano_v1.safetensors")
    if "model" in state:
        state = state["model"][0]
    t3.load_state_dict(state, assign=True)
    del state
    del t3.tfmr.wte
    t3.to("cpu").eval()
    gc.collect()

    s3gen = S3Gen(meanflow=True)
    state = load_file(model_dir / "s3gen_meanflow.safetensors")
    s3gen.load_state_dict(state, strict=True, assign=True)
    del state
    s3gen.to("cpu").eval()
    gc.collect()

    tokenizer = AutoTokenizer.from_pretrained(model_dir)
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token
    conds = Conditionals.load(model_dir / "conds.pt", map_location="cpu").to("cpu")
    model = ChatterboxTurboTTS(t3, s3gen, ve, tokenizer, "cpu", conds=conds, model_label="Nano")
    return model


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--reuse", action="store_true", help="Reuse raw WAVs in output/chatterbox-voice-segments")
    parser.add_argument("--model-dir", type=Path, default=Path(os.environ.get("CHATTERBOX_NANO_DIR", "/tmp/chatterbox-nano-model")))
    args = parser.parse_args()

    torch.set_num_threads(2)
    torch.set_num_interop_threads(1)
    torch.set_grad_enabled(False)

    output_dir = ROOT / "shorts" / SHORT_ID / "output" / "chatterbox-voice-segments"
    output_dir.mkdir(parents=True, exist_ok=True)
    public_dir = ROOT / "media" / "voiceovers" / "gps-explainer"
    public_dir.mkdir(parents=True, exist_ok=True)
    reference_path = public_dir / "chatterbox-voice-reference.wav"

    # Preserve the exact Indian-male reference before replacing the old master.
    if not reference_path.is_file():
        original, original_rate = sf.read(public_dir / "narration.wav", dtype="float32")
        if original_rate != SAMPLE_RATE:
            raise RuntimeError(f"Unexpected original narration sample rate: {original_rate}")
        reference = original[int(REFERENCE_START_S * original_rate):int(REFERENCE_END_S * original_rate)]
        sf.write(reference_path, reference, original_rate, subtype="PCM_16")

    raw_paths = [output_dir / f"{index:02d}-{row[0]}-raw.wav" for index, row in enumerate(SEGMENTS, start=1)]
    need_model = not args.reuse or any(not path.is_file() for path in raw_paths)
    model = None
    if need_model:
        print(f"Loading official Chatterbox-Nano from {args.model_dir}", flush=True)
        model = load_nano(args.model_dir)
        print("Preparing restrained Indian-male reference conditionals", flush=True)
        model.prepare_conditionals(str(reference_path), exaggeration=EXAGGERATION, norm_loudness=True)
        gc.collect()

    synthesized = []
    for index, (segment_id, scene, display, speak) in enumerate(SEGMENTS, start=1):
        raw_path = raw_paths[index - 1]
        seed = BASE_SEED + index
        if args.reuse and raw_path.is_file():
            raw, source_rate = sf.read(raw_path, dtype="float32")
            if source_rate != CHATTERBOX_RATE:
                raise RuntimeError(f"Sample rate changed for cached {raw_path}")
        else:
            print(f"Chatterbox synthesis {index:02d}/{len(SEGMENTS)}: {segment_id}; seed={seed}", flush=True)
            torch.manual_seed(seed)
            with torch.inference_mode():
                wav = model.generate(
                    speak,
                    temperature=TEMPERATURE,
                    top_p=TOP_P,
                    top_k=TOP_K,
                    repetition_penalty=REPETITION_PENALTY,
                    exaggeration=EXAGGERATION,
                    cfg_weight=CFG_WEIGHT,
                )
            raw = wav.reshape(-1).cpu().numpy().astype(np.float32)
            source_rate = model.sr
            sf.write(raw_path, raw, source_rate, subtype="PCM_16")
        processed = tempo(resample(polish(trim_voice(raw, source_rate)), source_rate), TEMPO_RATE)
        sf.write(output_dir / f"{index:02d}-{segment_id}.wav", processed, SAMPLE_RATE, subtype="PCM_16")
        synthesized.append((segment_id, scene, display, processed, seed))
        print(f"  measured={len(processed) / SAMPLE_RATE:.3f}s", flush=True)

    speech_total = sum(len(x[3]) for x in synthesized) / SAMPLE_RATE
    intra_count = len(SEGMENTS) - len(SCENES)
    between_gap = (TARGET_VOICE_END_S - INITIAL_SILENCE_S - speech_total - intra_count * INTRA_SCENE_GAP_S) / (len(SCENES) - 1)
    between_gap = min(0.85, max(0.38, between_gap))

    master = np.zeros(int(DURATION_S * SAMPLE_RATE), dtype=np.float32)
    timed = []
    cursor = INITIAL_SILENCE_S
    for index, (segment_id, scene, display, samples, seed) in enumerate(synthesized):
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
            "generationSeed": seed,
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
    reference_hash = hashlib.sha256(reference_path.read_bytes()).hexdigest()
    timeline = {
        "id": SHORT_ID,
        "title": "How GPS Finds You",
        "composition": "Short14GpsExplainer",
        "format": {"width": 1080, "height": 1920, "fps": FPS, "durationSec": DURATION_S},
        "voiceStatus": "chatterbox:nano:indian-male-clone:complete",
        "chatterbox": {
            "source": "resemble-ai/chatterbox",
            "sourceCommit": CHATTERBOX_SOURCE_COMMIT,
            "engine": "ChatterboxTurboTTS",
            "variant": "Nano",
            "model": "ResembleAI/chatterbox-nano",
            "modelFileSha256": MODEL_HASHES,
            "device": "cpu",
            "sourceSampleRate": CHATTERBOX_RATE,
            "masterSampleRate": SAMPLE_RATE,
            "tempoRate": TEMPO_RATE,
            "tempoAlgorithm": "FFmpeg atempo WSOLA; pitch preserved",
            "temperature": TEMPERATURE,
            "topP": TOP_P,
            "topK": TOP_K,
            "repetitionPenalty": REPETITION_PENALTY,
            "exaggeration": EXAGGERATION,
            "cfgWeight": CFG_WEIGHT,
            "speakerGender": "male",
            "speakerAccent": "Indian English, cloned from the earlier VCTK p251 narration reference",
            "voiceTransformation": "segment RMS matching, edge fades, sample-rate conversion and uniform 1.12x WSOLA pacing; no pitch shifting",
            "watermark": "Resemble Perth implicit audio watermark, applied by Chatterbox",
            "reference": {
                "file": "media/voiceovers/gps-explainer/chatterbox-voice-reference.wav",
                "source": "Earlier dry VCTK p251 narration; reference only, not replacement speech",
                "startSec": REFERENCE_START_S,
                "endSec": REFERENCE_END_S,
                "durationSec": round(REFERENCE_END_S - REFERENCE_START_S, 3),
                "sha256": reference_hash,
            },
            "captionTiming": "exact measured Chatterbox synthesis segment boundaries",
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
        "note": "All cues are sequenced in Short14GpsExplainer.tsx from exact Chatterbox segment timings. No estimated word alignment is used.",
        "events": cues,
    }
    (short_root / "sfx-plan.json").write_text(json.dumps(plan, indent=2) + "\n")
    write_ts_module(ROOT / "remotion" / "src" / "shots" / "short-14" / "vo.gen.ts", timed, scene_times, cues)
    print(f"Narration: {narration_path}")
    print(f"Voice ends at {voice_end:.3f}s; between-scene gap={between_gap:.3f}s; master={DURATION_S:.1f}s")


if __name__ == "__main__":
    main()
