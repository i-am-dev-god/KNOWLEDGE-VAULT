#!/usr/bin/env python3
"""Write final script and RESULT records only after all five revised videos pass QA."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "tools/next-five-projects.json").read_text())

PICTURES = {
    "short-16-touchscreen": {
        "hook": "A finger touches one marked point on a phone; the question holds on that exact location.",
        "grid": "Transparent row and column electrodes cross beneath the glass. Every crossing is initially equal, then small nodes reveal the electric fields.",
        "disturb": "Unrelated crossings dim. The finger approaches the center crossing, its field changes shape, and the other crossings remain nearly steady.",
        "locate": "The changed row and column illuminate separately; their readouts combine into the coordinate (ROW 3, COLUMN 3).",
        "gloves": "The same crossing is tested with a normal glove and conductive thread. Only the conductive path makes the field respond again.",
        "closing": "A restrained causal chain connects finger charge, one changed crossing, and the row-plus-column position.",
    },
    "short-17-qr-code": {
        "scan": "A real 21×21 QR symbol encoding HELLO is scanned; a reader-side card reconstructs HELLO.",
        "damage": "A visible central patch covers data modules while the three finder patterns remain intact.",
        "repair": "The scratched physical code stays scratched on the left. In reader memory on the right, error-correction information helps solve missing message values and recover HELLO.",
        "finders": "Data modules recede and the three large corner patterns are isolated to show their find-and-align role.",
        "limit": "Damage expands beyond the recoverable central region; the reader reports that the message is unavailable.",
        "closing": "Message data plus extra information leads to recovery only when enough information remains: a second chance, not magic.",
    },
    "short-18-wireless-charging": {
        "drive": "One pad coil is shown alone. Current arrows reverse while an alternating waveform makes the direction change explicit.",
        "field": "Magnetic loops expand and collapse around the same driven coil; no receiver is introduced yet.",
        "receive": "A second coil enters the changing field, an induced-voltage readout appears, and a no-contact bracket identifies the magnetic link.",
        "condition": "The receiver feeds one combined RECTIFY + REGULATE stage and then the battery; the alternating waveform becomes controlled DC.",
        "alignment": "The receiver moves off-center and away. Fewer shared field lines remain, and the transfer weakens.",
        "closing": "The two coils and the changing magnetic field remain together as the complete transfer is summarized.",
    },
    "short-19-fingerprint": {
        "ridges": "A small ridge crop replaces the full-fingerprint poster. One ridge ending and one split are isolated in turn; the other ridges dim.",
        "sensor": "The same ridge details remain while small capacitive cells beneath them produce different electrical measurements.",
        "template": "Feature types and relative positions become a small node-and-edge template rather than a stored photograph.",
        "match": "A shifted and rotated new template is compared with the stored template, then corresponding features align before pass and fail outcomes appear.",
        "closing": "Two different feature samples remain side by side to emphasize comparable patterns, not identical pictures.",
    },
    "short-20-digital-photo": {
        "photosite": "Light enters one photosite and its numerical electrical signal grows when the light increases.",
        "filter": "A neutral brightness value appears first. The green filter is then added, red and blue are blocked, and the site records green brightness.",
        "neighbors": "A small Bayer mosaic keeps the green center in focus while red and blue neighbors reveal their own single measurements.",
        "demosaic": "Neighboring measurements feed the center site's missing red and blue estimates; the completed step is labeled demosaicing.",
        "pixel": "Red, green, and blue values form one colored pixel. Repetition leads to a landscape while visible noise clears and the image is adjusted.",
        "closing": "The finished original landscape photograph holds with the chain from tiny measurements to colored pixels to a photograph.",
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
        "- **Existing versions:** GPS and ANC hashes are verified unchanged, and existing Drive deliverables are left untouched.", "",
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
    preserved = readme.read_text().split("## How Noise-Cancelling Headphones Erase Sound", 1)
    if len(preserved) != 2:
        raise RuntimeError("Could not locate preserved ANC/GPS records in RESULT/README.md")
    readme.write_text("# Finished videos\n\n" + "\n".join(sections) + "\n## How Noise-Cancelling Headphones Erase Sound" + preserved[1])
    print("Wrote five final script records and RESULT/README.md")


if __name__ == "__main__":
    main()
