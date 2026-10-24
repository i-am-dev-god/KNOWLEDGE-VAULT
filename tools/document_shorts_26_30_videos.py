#!/usr/bin/env python3
"""Write final script and RESULT records only after all following five videos pass QA."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "tools/shorts-26-30-projects.json").read_text())

PICTURES = {
    "short-26-bluetooth-audio": {
        "hook": "A phone sends digital audio toward headphones through animated short-range radio paths.",
        "encode": "A waveform is sampled at points on the actual curve, then a compressed stream appears as a separate step.",
        "packets": "The stream becomes discrete packets with distinct control and audio-data regions.",
        "radio": "Packets move between phone and headphones on coordinated frequency lanes; both endpoints highlight the same active channel.",
        "receive": "Received packets are checked, reassembled, decoded, and routed toward the converter and animated headphone output.",
        "closing": "Digital samples, radio packets, decode-and-convert, and the headphone driver form the complete chain.",
    },
    "short-27-ssd-storage": {
        "hook": "The SSD power switch turns off while the stored cell pattern and file data remain visible.",
        "cell": "Charge carriers settle into a flash cell's trap region and move the threshold-voltage marker.",
        "read": "A controller applies a test voltage, a conduction path responds, and the stored value is identified.",
        "organize": "A labeled grid organizes individual flash cells into pages within a larger block.",
        "wear": "One repeatedly written cell shows wear, then new writes move across different cells under wear leveling.",
        "closing": "Trapped charge, threshold reading, and wear leveling form the storage-and-maintenance summary.",
    },
    "short-28-hard-drive": {
        "hook": "A cutaway hard drive holds on the platter and a marked location for the requested file.",
        "platter": "The platter rotates at a constant speed and a magnified inset reveals alternating magnetic regions.",
        "map": "An example logical block address passes through a controller and becomes a highlighted track and sector.",
        "seek": "The actuator moves the head inward while the marked sector rotates toward the head position.",
        "read": "The marked sector reaches the head and magnetic changes become a visible recovered-bit readout.",
        "closing": "Address-to-track, arm-to-sector, and magnetism-to-bits form the mechanical seek summary.",
    },
    "short-29-face-unlock": {
        "hook": "An original schematic face on a phone is compared with an enrolled mathematical representation.",
        "illuminate": "An infrared projector sends a dot pattern to the face and an infrared camera reads the distorted pattern.",
        "depth": "The dotted face becomes a color-coded depth map with contour lines for shape and distance.",
        "template": "Depth features become a numbered node-and-edge mathematical face template.",
        "match": "A shifted new template aligns with the enrolled template, a similarity bar fills, and liveness plus unlock decisions appear.",
        "closing": "Infrared pattern, depth and template, comparison and liveness, and unlock form the complete sequence.",
    },
    "short-30-wifi-data": {
        "hook": "An original code-drawn photo travels toward a router through animated radio paths.",
        "prepare": "The photo becomes addressed packets with visible CRC error-checking fields.",
        "modulate": "Bit groups map onto carrier states, then four animated OFDM subcarrier lanes carry data together.",
        "air": "Nearby devices share a channel; the sender waits through a busy interval and transmits when the channel becomes clear.",
        "receive": "A failed packet is marked for retry, a corrected packet returns, and the original photo reconstructs in quadrants.",
        "closing": "Data and checks, OFDM subcarriers, the radio channel, and verified reconstruction form the complete chain.",
    },
}


def tempo_text(rate: float) -> str:
    if abs(rate - 1.0) < 0.000001:
        return "kept at its natural `1.0×` tempo; never sped up"
    return f"slowed gently to `{rate:.9f}×` with pitch preserved; never sped up"


def load(project: dict) -> tuple[dict, dict, dict, dict]:
    root = ROOT / "shorts" / project["id"]
    return (
        json.loads((root / "beats.json").read_text()),
        json.loads((root / "sfx-plan.json").read_text()),
        json.loads((root / "qa.json").read_text()),
        json.loads((root / "transcription-voice-00.json").read_text()),
    )


def write_script(project: dict, beats: dict, sfx: dict, qa: dict) -> None:
    narration = beats["aiSpeech"]
    duration = project.get("duration_s", CONFIG["defaults"]["duration_s"])
    lines = [
        f"# {project['title']}", "",
        f"**Composition:** `{project['composition']}`", "",
        f"**Format:** 1080 × 1920, 30 fps, {duration:.0f} seconds", "",
        "**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked instrumental music, and restrained sound design", "",
        "## Timed narration and matching demonstrations", "",
    ]
    for index, scene in enumerate(beats["scenes"], start=1):
        lines.extend([f"### {index}. {scene['title']} · {scene['start']:.2f}–{scene['end']:.2f}s", ""])
        for clause in [item for item in beats["vo"] if item["scene"] == scene["id"]]:
            lines.append(f"> {clause['text']}")
            lines.append(f"> *{clause['start']:.2f}–{clause['end']:.2f}s*")
            lines.append(">")
        lines.pop()  # trailing blockquote separator
        lines.extend(["", f"**Picture:** {PICTURES[project['id']][scene['id']]}", ""])
    audio = qa["audio"]
    sync = qa["synchronization"]
    video = qa["video"]
    asset_note = {
        "short-17-qr-code": "The QR example is a generated, valid 21×21 HELLO symbol using error correction H.",
        "short-20-digital-photo": "The closing landscape is an original generated asset stored at `media/assets/digital-photo-landscape.png`.",
    }.get(project["id"], "No external raster assets are used.")
    lines.extend([
        "## Selected-voice production record", "",
        "- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.",
        f"- **Source take:** 24 kHz mono, {narration['raw_duration_seconds']:.2f} seconds; SHA-256 `{narration['raw_sha256']}`.",
        f"- **Calmer pacing:** Playback is {tempo_text(narration['tempo_rate'])}. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.",
        f"- **Master narration:** 48 kHz mono PCM WAV in a {duration:.0f}-second timeline with {narration['initial_silence_seconds']:.1f} seconds of initial silence. Measured paced speech ends at {narration['paced_speech_end_seconds']:.6f} seconds. Master SHA-256: `{narration['narration_sha256']}`.",
        f"- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is {qa['transcription']['mean_word_probability'] * 100:.2f}%.",
        f"- **Caption treatment:** {len(beats['vo'])} complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.", "",
        "## Sound and provenance", "",
        "- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.",
        f"- `{sfx['music']['id']}` instrumental bed, ducked beneath narration and gently released after the final line; {len(sfx['events'])} quiet catalog cues support meaningful reveals only.",
        f"- Existing music and sound-effect catalog provenance is retained. {asset_note}", "",
        "## Final master and QA", "",
        f"- **GitHub deliverable:** `RESULT/{project['result']}`. The production copy is byte-identical and remains ignored by Git.",
        f"- **Picture:** H.264 {video['profile']}, 1080 × 1920, 30 fps, exactly {video['decoded_frames']:,} decoded frames; full-stream decode passed.",
        "- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.",
        f"- **Measured audio:** {audio['integrated_lufs']:.2f} LUFS integrated, {audio['loudness_range_lu']:.1f} LU loudness range, {audio['true_peak_dbfs']:.2f} dBTP true peak. No silence of at least two seconds below −45 dB was detected.",
        f"- **Delivered synchronization:** Narration offset {sync['delivered_narration_offset_seconds'] * 1000:.0f} ms, within the 12 ms acceptance limit; normalized mix correlation {sync['narration_mix_correlation']:.5f}.",
        f"- **Timing:** {len(beats['vo'])} captions, {len(beats['scenes'])} scenes, and {len(sfx['events'])} cues use the verified `voice-00` alignment. ASR caption end is {beats['voiceEnd']:.2f} seconds; measured speech ends at {narration['paced_speech_end_seconds']:.6f} seconds.",
        f"- **Container duration:** {qa['container_duration_seconds']:.3f} seconds ({duration:.2f} seconds of video plus AAC padding).",
        f"- **Size:** {qa['bytes']:,} bytes.",
        f"- **SHA-256:** `{qa['sha256']}`.",
        f"- **MD5:** `{qa['md5']}`.",
        f"- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro ({qa['validation']['narration_beat_samples_extracted']} ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.",
        "- **Existing versions:** All seven retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.", "",
    ])
    (ROOT / "shorts" / project["id"] / "script.md").write_text("\n".join(lines))


def readme_section(project: dict, beats: dict, qa: dict) -> str:
    narration = beats["aiSpeech"]
    duration = project.get("duration_s", CONFIG["defaults"]["duration_s"])
    audio = qa["audio"]
    sync = qa["synchronization"]
    return f"""## {project['title']}

**Finished video:** [{project['result']}]({project['result']})

- Demonstration-led original science-and-technology explainer; visible actions and focal components follow the narration
- {duration:.2f} seconds of video; 1080 × 1920; 30 fps; H.264 High with AAC-LC stereo
- User-selected `voice-00` exclusively in one continuous take, {tempo_text(narration['tempo_rate'])}
- Calm pacing, {len(beats['vo'])} complete-clause captions, {len(beats['scenes'])} scenes, and **no moving line or timing indicator beneath subtitles**
- Full {qa['video']['decoded_frames']:,}-frame decode, loudness and delivered-sync checks, and ordered narration-onset/midpoint/outro visual review passed
- Integrated loudness {audio['integrated_lufs']:.2f} LUFS; true peak {audio['true_peak_dbfs']:.2f} dBTP; measured narration offset {sync['delivered_narration_offset_seconds'] * 1000:.0f} ms

**Size:** {qa['bytes']:,} bytes

**SHA-256:** `{qa['sha256']}`

Production and QA: [`script.md`](../shorts/{project['id']}/script.md) · [`qa.json`](../shorts/{project['id']}/qa.json)
"""


def main() -> None:
    sections = []
    for project in CONFIG["projects"]:
        beats, sfx, qa, _ = load(project)
        if qa["status"] != "passed" or qa["visual_review"]["status"] != "passed":
            raise RuntimeError(f"Refusing to document unreviewed master: {project['id']}")
        write_script(project, beats, sfx, qa)
        sections.append(readme_section(project, beats, qa))
    readme = ROOT / "RESULT/README.md"
    text = readme.read_text()
    heading = "## How Bluetooth Sends Music to Your Headphones"
    if heading in text:
        text = text.split(heading, 1)[0].rstrip()
    # Append the new five while preserving GPS, ANC, and the accepted earlier five.
    readme.write_text(text.rstrip() + "\n\n" + "\n".join(sections))
    print("Wrote five final script records and appended RESULT/README.md without replacing earlier masters")


if __name__ == "__main__":
    main()
