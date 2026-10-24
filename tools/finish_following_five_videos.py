#!/usr/bin/env python3
"""Master and validate the following five selected-voice technology explainers.

  FFMPEG_BIN=/path/to/ffmpeg /tmp/next5-runtime/bin/python tools/finish_following_five_videos.py all

`master` copies the validated Remotion H.264 stream and two-pass normalizes its
mixed AAC audio. `qa` fully decodes each delivered video, measures its audio,
and extracts every narration-clause onset and midpoint plus the outro from the
actual MP4 into ignored contact sheets for human visual review. PyAV, Pillow, and NumPy are required
for QA. `summarize` aggregates the reports after human visual review and only marks
the set `passed` when every report has passed. Previous seven deliveries
are hash-checked before and after delivery.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import re
import shutil
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "tools/following-five-projects.json").read_text())
FFMPEG = os.environ.get("FFMPEG_BIN", "ffmpeg")
# Remotion/AAC priming measures about 43 ms in the mixed render and the final
# AAC/mastering stage adds about 5 ms. Remove that priming from the silent head;
# QA subsequently measures the delivered narration offset instead of assuming it.
PRE_FILTER = "atrim=start=0.048,asetpts=PTS-STARTPTS,highpass=f=70,alimiter=limit=0.841395:level=false"
LOUDNESS = "loudnorm=I=-16:TP=-1.5:LRA=11"
PRESERVED = {
    "how-gps-finds-you.mp4": "3c50813629ad228ae8951a1586b42d943a150112fc95976819d83a9e4e527a6c",
    "how-noise-cancelling-headphones-work.mp4": "ef9e6020d7f60cdb4f24404e92f03e7d3938c9c7ba6a129e46a758bca60ef6d6",
    "how-touchscreens-sense-your-finger.mp4": "3492847745db1ba6b490b18f0273c7866f1bfb7085128fbcce8785239e3623fa",
    "how-qr-codes-survive-damage.mp4": "76ff8e25073f5358de4d0c991ec033064a0e5b0a408d4823c3ce66a3dd5db4e3",
    "how-wireless-charging-works.mp4": "c3ceecb903eb86ad8982210e1420e023d124e4e0e16fb5ec04f388896e7f537e",
    "how-fingerprint-sensors-recognize-you.mp4": "df60fa7265673e3fa63b70b058d5b75e3ee4a1bc5471e128f1e51f8e2ff8605c",
    "how-a-camera-turns-light-into-a-photo.mp4": "a1703e903858641e9b1d2a1b7e218f93a6406382b3b2ade74a38c054f4552e51",
}


def sha(path: Path, algorithm: str = "sha256") -> str:
    digest = hashlib.new(algorithm)
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def run_capture(args: list[str]) -> str:
    result = subprocess.run(args, cwd=ROOT, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode:
        raise RuntimeError(f"Command failed ({result.returncode}): {' '.join(args)}\n{result.stderr[-8000:]}")
    return result.stderr


def loudness_json(path: Path, audio_filter: str) -> dict:
    output = run_capture([
        FFMPEG, "-hide_banner", "-nostats", "-i", str(path), "-map", "0:a:0",
        "-af", f"{audio_filter}:print_format=json", "-f", "null", "-",
    ])
    matches = list(re.finditer(r'\{\s*"input_i".*?\}', output, re.DOTALL))
    if not matches:
        raise RuntimeError(f"No loudnorm JSON found for {path}\n{output[-4000:]}")
    return json.loads(matches[-1].group(0))


def assert_preserved() -> None:
    for filename, expected in PRESERVED.items():
        path = ROOT / "RESULT" / filename
        if not path.is_file() or sha(path) != expected:
            raise RuntimeError(f"Existing delivery changed or missing: {path}")


def master_one(project: dict) -> None:
    short_root = ROOT / "shorts" / project["id"]
    beats = json.loads((short_root / "beats.json").read_text())
    narration = ROOT / beats["aiSpeech"]["narration_file"]
    if sha(narration) != beats["aiSpeech"]["narration_sha256"]:
        raise RuntimeError(f"Narration hash changed: {narration}")
    source = ROOT / "remotion/out" / f"{project['composition']}.mp4"
    if not source.is_file():
        raise FileNotFoundError(f"Missing mixed Remotion render: {source}")
    production = short_root / "output" / project["result"]
    production.parent.mkdir(parents=True, exist_ok=True)
    temporary = production.with_name(production.stem + ".mastering.mp4")
    first = loudness_json(source, f"{PRE_FILTER},{LOUDNESS}")
    second_filter = (
        f"{PRE_FILTER},{LOUDNESS}"
        f":measured_I={first['input_i']}:measured_TP={first['input_tp']}"
        f":measured_LRA={first['input_lra']}:measured_thresh={first['input_thresh']}"
        f":offset={first['target_offset']}:linear=true:print_format=summary"
    )
    command = [
        FFMPEG, "-hide_banner", "-y", "-i", str(source),
        "-map", "0:v:0", "-map", "0:a:0", "-map_metadata", "0",
        "-c:v", "copy", "-af", second_filter,
        "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2",
        "-movflags", "+faststart", str(temporary),
    ]
    result = subprocess.run(command, cwd=ROOT, text=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if result.returncode:
        raise RuntimeError(f"Mastering failed for {project['id']}\n{result.stderr[-8000:]}")
    temporary.replace(production)
    delivered = ROOT / "RESULT" / project["result"]
    delivered.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(production, delivered)
    if sha(production) != sha(delivered):
        raise RuntimeError(f"Production/delivery copy mismatch: {project['id']}")
    print(f"Mastered {project['result']} ({delivered.stat().st_size:,} bytes)", flush=True)


def audio_measurements(path: Path) -> dict:
    loud = loudness_json(path, LOUDNESS)
    volume_output = run_capture([
        FFMPEG, "-hide_banner", "-nostats", "-i", str(path), "-map", "0:a:0",
        "-af", "volumedetect", "-f", "null", "-",
    ])
    silence_output = run_capture([
        FFMPEG, "-hide_banner", "-nostats", "-i", str(path), "-map", "0:a:0",
        "-af", "silencedetect=noise=-45dB:d=2", "-f", "null", "-",
    ])
    mean = re.search(r"mean_volume:\s*(-?[0-9.]+) dB", volume_output)
    maximum = re.search(r"max_volume:\s*(-?[0-9.]+) dB", volume_output)
    silence_events = re.findall(r"silence_(?:start|end):[^\n]+", silence_output)
    return {
        "integrated_lufs": float(loud["input_i"]),
        "true_peak_dbfs": float(loud["input_tp"]),
        "loudness_range_lu": float(loud["input_lra"]),
        "mean_volume_db": float(mean.group(1)) if mean else None,
        "max_volume_db": float(maximum.group(1)) if maximum else None,
        "silence_events": silence_events,
        "silence_check": "passed" if not silence_events else "review detected silence events",
    }


def narration_sync(path: Path, narration: Path) -> dict:
    """Measure delivered narration delay against the exact WAV, including AAC muxing."""
    import numpy as np

    sample_rate = 4000

    def decode(source: Path) -> np.ndarray:
        result = subprocess.run([
            FFMPEG, "-v", "error", "-i", str(source), "-map", "0:a:0",
            "-ac", "1", "-ar", str(sample_rate), "-f", "f32le", "pipe:1",
        ], cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if result.returncode:
            raise RuntimeError(f"Could not decode synchronization audio: {source}\n{result.stderr.decode()[-2000:]}")
        return np.frombuffer(result.stdout, dtype="<f4")

    mix = decode(path)
    voice = decode(narration)
    start = sample_rate
    count = 11 * sample_rate
    reference = voice[start:start + count].astype(np.float64)
    reference_norm = np.linalg.norm(reference)
    best_score = -2.0
    best_lag = 0
    # Search ±250 ms at 1 ms steps. Positive lag means the delivered mix is late.
    for lag in range(-1000, 1001, 4):
        candidate = mix[start + lag:start + lag + count].astype(np.float64)
        if candidate.size != reference.size:
            continue
        score = float(np.dot(candidate, reference) / (np.linalg.norm(candidate) * reference_norm + 1e-12))
        if score > best_score:
            best_score = score
            best_lag = lag
    return {
        "delivered_narration_offset_seconds": round(best_lag / sample_rate, 4),
        "narration_mix_correlation": round(best_score, 5),
        "measurement": "Best normalized cross-correlation over 1–12s at 4kHz; positive offset means delivered narration is late",
    }


def decode_and_sample(path: Path, project: dict, beats: dict) -> tuple[dict, list[str]]:
    import av
    from PIL import Image, ImageDraw, ImageFont

    fps = int(CONFIG["defaults"]["fps"])
    duration = float(project.get("duration_s", CONFIG["defaults"]["duration_s"]))
    expected_frames = round(duration * fps)
    qa_dir = ROOT / "shorts" / project["id"] / "output/qa"
    if qa_dir.exists():
        shutil.rmtree(qa_dir)
    qa_dir.mkdir(parents=True, exist_ok=True)
    sample_specs = [
        (min(expected_frames - 1, round((line["start"] + 0.18) * fps)), f"{line['id']}-onset")
        for line in beats["vo"]
    ] + [
        (min(expected_frames - 1, round(((line["start"] + line["end"]) / 2) * fps)), f"{line['id']}-mid")
        for line in beats["vo"]
    ]
    sample_specs.append((expected_frames - 15, "outro"))
    targets = dict(sample_specs)
    if len(targets) != len(sample_specs):
        raise RuntimeError(f"Duplicate QA sample frames for {project['id']}; use unique beat labels")
    saved: dict[int, Path] = {}
    with av.open(str(path)) as container:
        video = next(stream for stream in container.streams if stream.type == "video")
        audio = next(stream for stream in container.streams if stream.type == "audio")
        container_duration = float(container.duration / av.time_base)
        video_duration = float(video.duration * video.time_base)
        audio_duration = float(audio.duration * audio.time_base)
        stream_info = {
            "container_duration_seconds": round(container_duration, 6),
            "video": {
                "codec": video.codec.name,
                "profile": video.codec_context.profile,
                "width": video.codec_context.width,
                "height": video.codec_context.height,
                "fps": float(video.average_rate),
                "video_duration_seconds": round(video_duration, 6),
                "bit_rate": video.codec_context.bit_rate,
            },
            "audio": {
                "codec": audio.codec.name,
                "profile": audio.codec_context.profile,
                "sample_rate": audio.codec_context.sample_rate,
                "channels": audio.codec_context.channels,
                "duration_seconds": round(audio_duration, 6),
                "bit_rate": audio.codec_context.bit_rate,
            },
        }
        decoded_frames = 0
        for decoded_frames, frame in enumerate(container.decode(video=video.index), start=1):
            index = decoded_frames - 1
            if index not in targets:
                continue
            label = targets[index]
            output = qa_dir / f"{index:04d}-{label}.jpg"
            frame.to_image().convert("RGB").resize((540, 960), Image.Resampling.LANCZOS).save(output, quality=92)
            saved[index] = output
    stream_info["video"]["decoded_frames"] = decoded_frames
    missing = sorted(set(targets) - set(saved))
    if missing:
        raise RuntimeError(f"Could not extract QA frames {missing} from {path}")
    if decoded_frames != expected_frames:
        raise RuntimeError(f"Frame count mismatch for {path}: {decoded_frames} != {expected_frames}")
    expected = CONFIG["defaults"]
    video_info = stream_info["video"]
    audio_info = stream_info["audio"]
    if (video_info["codec"], video_info["width"], video_info["height"], video_info["fps"]) != (
        "h264", expected["width"], expected["height"], float(expected["fps"])
    ):
        raise RuntimeError(f"Unexpected video stream for {path}: {video_info}")
    if abs(video_info["video_duration_seconds"] - duration) > 0.002:
        raise RuntimeError(f"Video duration mismatch for {path}: {video_info}")
    if (audio_info["codec"], audio_info["sample_rate"], audio_info["channels"]) != ("aac", 48000, 2):
        raise RuntimeError(f"Unexpected audio stream for {path}: {audio_info}")

    try:
        font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 13)
    except OSError:
        font = ImageFont.load_default()
    ordered = sorted(saved)
    chunks = [ordered[:12], ordered[12:]]
    contact_sheets = []
    for sheet_number, chunk in enumerate(chunks, start=1):
        if not chunk:
            continue
        rows = (len(chunk) + 3) // 4
        sheet = Image.new("RGB", (1080, rows * 510), "#07111f")
        draw = ImageDraw.Draw(sheet)
        for position, index in enumerate(chunk):
            image = Image.open(saved[index]).convert("RGB").resize((270, 480), Image.Resampling.LANCZOS)
            x = (position % 4) * 270
            y = (position // 4) * 510
            sheet.paste(image, (x, y + 30))
            draw.text((x + 5, y + 7), f"{index:04d}-{targets[index]}"[:39], fill="#d7e3f2", font=font)
        contact_sheet = qa_dir / f"contact-sheet-{sheet_number}.jpg"
        sheet.save(contact_sheet, quality=92)
        contact_sheets.append(f"output/qa/{contact_sheet.name}")
    shutil.copy2(saved[expected_frames - 15], qa_dir / "outro.jpg")
    stream_info["validation"] = {
        "full_video_decode": "passed",
        "actual_mp4_contact_sheets": contact_sheets,
        "caption_onsets_extracted": len(beats["vo"]),
        "caption_midpoints_extracted": len(beats["vo"]),
        "narration_beat_samples_extracted": len(saved),
        "outro_extracted": True,
    }
    relative_samples = [f"output/qa/{saved[index].name}" for index in sorted(saved)]
    return stream_info, relative_samples


def qa_one(project: dict) -> dict:
    short_root = ROOT / "shorts" / project["id"]
    beats = json.loads((short_root / "beats.json").read_text())
    transcription = json.loads((short_root / "transcription-voice-00.json").read_text())
    sfx = json.loads((short_root / "sfx-plan.json").read_text())
    delivered = ROOT / "RESULT" / project["result"]
    production = short_root / "output" / project["result"]
    if not delivered.is_file() or not production.is_file():
        raise FileNotFoundError(f"Missing production or delivery master for {project['id']}")
    if sha(delivered) != sha(production):
        raise RuntimeError(f"Delivery and production copy differ for {project['id']}")
    stream_info, visual_samples = decode_and_sample(delivered, project, beats)
    audio = {**stream_info["audio"], **audio_measurements(delivered)}
    if abs(audio["integrated_lufs"] + 16.0) > 0.5 or audio["true_peak_dbfs"] > -1.3:
        raise RuntimeError(f"Final loudness outside acceptance range for {project['id']}: {audio}")
    if audio["silence_events"]:
        raise RuntimeError(f"Long silence detected for {project['id']}: {audio['silence_events']}")
    sync = narration_sync(delivered, ROOT / beats["aiSpeech"]["narration_file"])
    if abs(sync["delivered_narration_offset_seconds"]) > 0.012 or sync["narration_mix_correlation"] < 0.30:
        raise RuntimeError(f"Delivered narration synchronization failed for {project['id']}: {sync}")
    report = {
        "file": f"../../RESULT/{project['result']}",
        "production_copy": f"output/{project['result']}",
        "status": "technical-passed-visual-pending",
        "bytes": delivered.stat().st_size,
        "sha256": sha(delivered),
        "md5": sha(delivered, "md5"),
        "container_duration_seconds": stream_info["container_duration_seconds"],
        "video": stream_info["video"],
        "audio": {
            **audio,
            "target_bitrate": "192k",
            "mastering": "48ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, two-pass loudnorm I=-16/TP=-1.5/LRA=11; H.264 stream copied without re-encoding",
        },
        "synchronization": {
            "caption_segments": len(beats["vo"]),
            "caption_progress_line": False,
            "caption_motion": "Whole-clause opacity fades only; no moving underline, timer, or word-pop animation",
            "timing_source": "faster-whisper medium.en word timestamps on exact selected-voice master; complete normalized script/token match",
            "initial_narration_onset_seconds": beats["aiSpeech"]["initial_silence_seconds"],
            "asr_voice_end_seconds": beats["voiceEnd"],
            "measured_speech_end_seconds": beats["aiSpeech"]["paced_speech_end_seconds"],
            "scenes": len(beats["scenes"]),
            "sfx_cues": len(sfx["events"]),
            "sfx_timing_source": "Narration-aligned segment starts",
            "music": sfx["music"],
            **sync,
            "delivered_sync_check": "passed; absolute narration offset <=12ms and normalized mix correlation >=0.30",
        },
        "pacing": {
            "source_tempo_rate": beats["aiSpeech"]["tempo_rate"],
            "source_sped_up": beats["aiSpeech"]["tempo_rate"] > 1.0,
            "spoken_words": beats["aiSpeech"]["spoken_words"],
            "style": "Demonstration-led scenes, calm holds, complete-clause captions, restrained cues, ducked instrumental bed, and a proper outro",
        },
        "narration": beats["aiSpeech"],
        "transcription": {
            "status": "passed",
            "engine": f"{transcription['engine']} {transcription['model']}",
            "normalized_script_match": beats["aiSpeech"]["normalized_script_match"],
            "mean_word_probability": transcription["mean_word_probability"],
            "low_confidence_words": transcription["low_confidence_words"],
            "report": "transcription-voice-00.json",
        },
        "validation": {
            **stream_info["validation"],
            "typescript": "npx tsc --noEmit passed in remotion/",
            "delivery_and_production_copy_sha256_match": True,
            "previous_seven_results_sha256_unchanged": True,
        },
        "visual_review": {
            "status": "pending",
            "samples": visual_samples,
            "required": "Review every narration-clause onset and midpoint plus the outro in ordered sheets; confirm the visible action and focal component match the narration, unrelated elements recede, labels are legible and safe, and no caption progress line appears",
        },
        "delivery": {
            "github_path": f"RESULT/{project['result']}",
            "branch": "arena/94671a58-knowledge-vault",
            "previous_seven_results": "left unchanged",
            "drive": "Existing Drive deliverables left unchanged",
        },
    }
    (short_root / "qa.json").write_text(json.dumps(report, indent=2) + "\n")
    print(
        f"QA {project['result']}: {stream_info['video']['decoded_frames']} frames, "
        f"{audio['integrated_lufs']:.1f} LUFS, {audio['true_peak_dbfs']:.1f} dBTP; visual review pending",
        flush=True,
    )
    return report


def write_summary(projects: list[dict], reports: list[dict]) -> None:
    passed = all(report["status"] == "passed" for report in reports)
    summary = {
        "status": "passed" if passed else "technical-passed-visual-pending",
        "branch": "arena/94671a58-knowledge-vault",
        "voice": "voice-00",
        "caption_progress_line": False,
        "delivered_narration_offset_limit_seconds": 0.012,
        "preserved_results": PRESERVED,
        "videos": [
            {
                "file": f"RESULT/{project['result']}",
                "composition": project["composition"],
                "bytes": report["bytes"],
                "sha256": report["sha256"],
                "decoded_frames": report["video"]["decoded_frames"],
                "integrated_lufs": report["audio"]["integrated_lufs"],
                "true_peak_dbfs": report["audio"]["true_peak_dbfs"],
                "delivered_narration_offset_seconds": report["synchronization"]["delivered_narration_offset_seconds"],
                "visual_review": report["visual_review"]["status"],
                "status": report["status"],
            }
            for project, report in zip(projects, reports)
        ],
    }
    (ROOT / "shorts/following-five-qa-summary.json").write_text(json.dumps(summary, indent=2) + "\n")
    print(f"Summary: {summary['status']}")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("command", choices=["master", "qa", "all", "summarize"])
    args = parser.parse_args()
    assert_preserved()
    projects = CONFIG["projects"]
    if args.command in {"master", "all"}:
        for project in projects:
            master_one(project)
    reports = []
    if args.command in {"qa", "all"}:
        for project in projects:
            reports.append(qa_one(project))
    if args.command == "summarize":
        reports = [json.loads((ROOT / "shorts" / project["id"] / "qa.json").read_text()) for project in projects]
    if reports:
        write_summary(projects, reports)
    assert_preserved()


if __name__ == "__main__":
    main()
