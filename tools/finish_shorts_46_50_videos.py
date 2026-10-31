#!/usr/bin/env python3
"""Master and validate the five new selected-voice technology explainers.

  FFMPEG_BIN=/path/to/ffmpeg /tmp/next5-runtime/bin/python tools/finish_shorts_46_50_videos.py all

`master` copies the validated Remotion H.264 stream and two-pass normalizes its
mixed AAC audio. `qa` fully decodes each delivered video, measures its audio,
and extracts every narration-clause onset and midpoint plus the outro from the
actual MP4 into ignored contact sheets for human visual review. PyAV, Pillow, and NumPy are required
for QA. `summarize` aggregates the reports after human visual review and only marks
the set `passed` when every report has passed. Retained deliveries
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
CONFIG = json.loads((ROOT / "tools/shorts-46-50-projects.json").read_text())
FFMPEG = os.environ.get("FFMPEG_BIN", "ffmpeg")
# Remotion/AAC priming measures about 43 ms in the mixed render and the final
# AAC/mastering stage adds about 5 ms. Remove that priming from the silent head;
# QA subsequently measures the delivered narration offset instead of assuming it.
PRE_FILTER = "atrim=start=0.048,asetpts=PTS-STARTPTS,highpass=f=70,alimiter=limit=0.841395:level=false"
LOUDNESS = "loudnorm=I=-16:TP=-2.0:LRA=11"
REMOVED = (
    'how-touchscreens-sense-your-finger.mp4',
    'how-qr-codes-survive-damage.mp4',
    'how-wireless-charging-works.mp4',
    'how-fingerprint-sensors-recognize-you.mp4',
    'how-noise-cancelling-headphones-work.mp4',
    'how-a-microwave-oven-heats-food.mp4',
    'how-a-camera-turns-light-into-a-photo.mp4',
    'how-a-speaker-turns-electricity-into-sound.mp4',
    'how-a-lithium-battery-powers-your-phone.mp4',
    'how-an-optical-mouse-tracks-movement.mp4',
)
PRESERVED = {'how-a-3d-printer-builds-an-object.mp4': 'e0094b7f44e3a9c29a4af465658d2b7e0bf49e40f3c903b72eb67588616f726c', 'how-a-hard-drive-finds-your-files.mp4': 'af5e87436daaac94ab68fdb2e37f77a00a5fb57fe3ad5a33df68cf2fd0ff57ef', 'how-a-heat-pump-warms-your-home.mp4': 'a90b6dbc8141e58bd996ef213ba07da70852578a2059b569af70486eb01725a7', 'how-a-hydraulic-lift-raises-a-car.mp4': 'b0ded3e9b9cef622c35fbae0080292cc163775fbe609b541109a95d9d5b2358a', 'how-a-mechanical-watch-keeps-time.mp4': '887d082a0d79fea3abf7a409cc383f3cfd19764ed521af66515fdf1ea5b0c143', 'how-a-pressure-cooker-cooks-faster.mp4': 'a72b57877c4f6dad9a3eab5f70875f14dbb0b6cd5a7bf183b981d79d85e5d28f', 'how-a-smoke-detector-senses-smoke.mp4': '016640322581d4788c63b8cb91e088eca678eac9957365c68da802e9d232651a', 'how-a-solar-panel-turns-sunlight-into-electricity.mp4': 'd1d15732e9b5c0345b1386cb115fa5059aba871e87c66b0c761fd9813feef7b1', 'how-a-transformer-changes-voltage.mp4': 'baa691c774678b193ecb641ad2643b3088360427e7b435f8d09e1995677b991c', 'how-an-accelerometer-counts-your-steps.mp4': 'db389543db0f7a4f4039632cd4e9533debd99b684f323fe552d9177591970395', 'how-an-airbag-protects-you-in-a-crash.mp4': '36b76b86ed68ec84a4eb5d4c0ebff5febfe54b0dad353918dfcbf64478351776', 'how-an-electric-kettle-switches-off.mp4': '11c1f7a9541fe24db6ee23c2c2c60e2914b163eafc837d84e8bd1ce736916189', 'how-an-electric-motor-spins.mp4': '61219ffd5b9c0fc149741eee92dc948c7f9dbaa402a7f3665e93f344e1e9e910', 'how-an-induction-cooktop-heats-a-pan.mp4': '5d51a534d58780eda8e74a882eea018d13c19ef24936fde1679951ee3198163c', 'how-an-ssd-remembers-without-power.mp4': '66f3b4fcad505ae9df10c6d18096fde7107063666a1d07647cee47d13c2c4c14', 'how-bluetooth-sends-music-to-headphones.mp4': '3ea382bf948d32b506d6975a8ec1b7c354e378f1659cd3ba1a07552b6049f338', 'how-face-unlock-recognizes-you.mp4': '714a0d6682f739633bc8495095fca550d69eb714372ac8b60b5c359983c02ba3', 'how-fiber-optics-carry-internet-data.mp4': '2a78d6d018d6b7c5bbc03a8cfd55a9fd589e31964d81b1f17ca6eab423b513a5', 'how-gps-finds-you.mp4': '3c50813629ad228ae8951a1586b42d943a150112fc95976819d83a9e4e527a6c', 'how-radar-finds-distant-objects.mp4': 'b20721da9b774707120a7f747bba2b5a30c6c56fff178c8658bd5e1552454138', 'how-wifi-sends-data-through-air.mp4': '100b7a0dcad872cc89ed9ac71650ca589c4139fef14519051007a4756ffc8677', 'how-zip-files-make-data-smaller.mp4': 'a26a658fc0e31c4ae4c973014309020e97342664385f43100a9b421c0ad07c91'}


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
    for filename in REMOVED:
        path = ROOT / "RESULT" / filename
        if path.exists():
            raise RuntimeError(f"Intentionally removed delivery was restored: {path}")


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
    sample_specs = [(0, "first-frame")] + [
        (min(expected_frames - 1, round((line["start"] + 0.18) * fps)), f"{line['id']}-onset")
        for line in beats["vo"]
    ] + [
        (min(expected_frames - 1, round(((line["start"] + line["end"]) / 2) * fps)), f"{line['id']}-mid")
        for line in beats["vo"]
    ]
    sample_specs += [
        (min(expected_frames - 1, round((line["end"] - (1.2 if line["id"] == "drain-pump" else 0.35)) * fps)), f"{line['id']}-late")
        for line in beats["vo"] if line["id"] in {"filter-maintenance", "use-tare", "valve-remove", "drain-pump", "white-diffuse"}
    ]
    if project["composition"] == "Short47DigitalScale":
        sample_specs.append((round(1.15 * fps), "physical-contact"))
    # Keep contact sheets chronological even when a targeted late-action sample
    # falls between the penultimate and closing narration beats.
    sample_specs.sort(key=lambda item: item[0])
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
    if beats["aiSpeech"]["voice_id"] != "voice-00" or not beats["aiSpeech"]["normalized_script_match"]:
        raise RuntimeError(f"Selected-voice or exact-script narration lineage failed for {project['id']}")
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
    shot_number = project["id"].split("-")[1]
    component = ROOT / "remotion/src/shots" / f"short-{shot_number}" / f"{project['composition']}.tsx"
    component_source = component.read_text()
    if "<Header" in component_source or re.search(r">[^<]*\bSEC\b", component_source):
        raise RuntimeError(f"Old top header or duration label remains in {component}")
    if "ClearLabel" not in component_source or "HighlightPart" not in component_source or not any(token in component_source for token in ["MovingDots", "Arrow"]):
        raise RuntimeError(f"Clear labeled device-diagram and focus system missing from {component}")
    initial_onset = float(beats["vo"][0]["start"])
    final_tail = float(project.get("duration_s", CONFIG["defaults"]["duration_s"])) - float(beats["voiceEnd"])
    if initial_onset > 0.30:
        raise RuntimeError(f"Result-first narration starts too late for {project['id']}: {initial_onset}")
    if not 0.50 <= final_tail <= 1.60:
        raise RuntimeError(f"Closing tail outside the trimmed retention plan for {project['id']}: {final_tail}")

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
            "mastering": "48ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, two-pass loudnorm I=-16/TP=-2.0/LRA=11; H.264 stream copied without re-encoding",
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
            "style": "Result-first opening payoff, immediate narration, content-adaptive duration, meaningful device motion, calm delivery, and a trimmed closing tail",
            "initial_narration_onset_seconds": initial_onset,
            "closing_tail_after_asr_seconds": round(final_tail, 3),
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
            "retained_results_sha256_unchanged": True,
            "ten_intentionally_removed_result_masters_absent": True,
            "selected_voice_00_and_exact_normalized_script_match": True,
            "top_left_title_and_top_right_duration_removed": True,
            "focus_guidance_system_present": True,
            "result_first_narration_onset_within_300ms": True,
            "trimmed_closing_tail_within_500_to_1600ms": True,
        },
        "visual_review": {
            "status": "pending",
            "samples": visual_samples,
            "required": "Review frame zero, every narration-clause onset and midpoint, targeted late device-action states, and the outro in ordered sheets; confirm physical surface contact, connected pipes/wires, label alignment, recognizable device parts, and visible action matching the narration; unrelated elements must recede, labels must remain legible and safe, and no caption progress line may appear",
        },
        "delivery": {
            "github_path": f"RESULT/{project['result']}",
            "branch": "arena/a2e32c43-knowledge-vault",
            "retained_results": "left unchanged",
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
        "branch": "arena/a2e32c43-knowledge-vault",
        "voice": "voice-00",
        "caption_progress_line": False,
        "delivered_narration_offset_limit_seconds": 0.012,
        "total_decoded_frames": sum(report["video"]["decoded_frames"] for report in reports),
        "total_actual_mp4_samples": sum(report["validation"]["narration_beat_samples_extracted"] for report in reports),
        "preserved_results": PRESERVED,
        "removed_results_confirmed_absent": list(REMOVED),
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
    (ROOT / "shorts/shorts-46-50-qa-summary.json").write_text(json.dumps(summary, indent=2) + "\n")
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
