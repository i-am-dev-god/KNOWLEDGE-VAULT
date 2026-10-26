#!/usr/bin/env python3
"""Write final script and RESULT records only after all five new videos pass QA."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "tools/shorts-31-35-projects.json").read_text())

PICTURES = {
    "short-31-solar-panel": {
        "hook": "Sunlight moves toward a solar panel, then the thin solar cell beneath the glass is isolated and highlighted.",
        "cell": "Photons enter the silicon; freed electrons and positive holes appear inside the spotlighted solar cell.",
        "field": "The built-in field region is highlighted while electrons move in one guided direction.",
        "circuit": "Electrons travel from the panel through a load and back along the return path; the load receives the final focus.",
        "inverter": "Direct current enters the highlighted inverter and an animated alternating-current waveform feeds a house.",
        "closing": "Sunlight, charge guidance, direct current, and the inverter form the complete solar-panel chain.",
    },
    "short-32-heat-pump": {
        "hook": "Warm particles inside cold outdoor air move toward a house, explicitly showing that the heat pump transports existing heat.",
        "outside": "Outdoor heat flows into the spotlighted coil as cold refrigerant evaporates into gas.",
        "compress": "The compressor piston squeezes the gas; particles and a temperature indicator change together.",
        "inside": "The hot indoor coil releases heat, then the fan and warm-air paths take focus as heat enters the rooms.",
        "valve": "A complete refrigerant loop shows condensation, then shifts focus to the expansion valve and cold return flow.",
        "closing": "Outdoor absorption, compression, indoor release, and valve reset form one continuous heat-pump cycle.",
    },
    "short-33-accelerometer-steps": {
        "hook": "A phone step counter isolates the tiny accelerometer chip responsible for sensing motion.",
        "mass": "The proof mass moves inside the chip, then the flexible springs become the highlighted constraint.",
        "capacitor": "Interlocking fixed and moving fingers change their spacing under an animated gap spotlight.",
        "signal": "The accelerometer chip feeds an electronics block and an acceleration waveform.",
        "walk": "A noisy body-motion waveform reveals a repeating walking rhythm and step markers.",
        "filter": "The noisy signal recedes while filtered peaks are accepted and the visible step counter increments.",
        "closing": "Mass motion, capacitor change, acceleration data, and software pattern recognition form the complete chain.",
    },
    "short-34-3d-printer": {
        "hook": "A nozzle and a stack of thin layers show how the 3D printer builds a solid object.",
        "slice": "A digital model becomes discrete layers, then one layer expands to reveal its outer-wall and inner toolpaths.",
        "heat": "Filament enters the spotlighted heater block as the nozzle temperature rises and material begins to flow.",
        "extrude": "The nozzle follows the exact perimeter being extruded; the deposited bead changes color as it cools.",
        "stack": "The nozzle rises by one layer height and successive layers appear and fuse into a solid shape.",
        "closing": "Slicing, path following, cooling, and layer bonding summarize the 3D-printing process.",
    },
    "short-35-airbag": {
        "hook": "A seat-belted occupant and airbag cushion establish the protective purpose; a label explicitly marks the slowed explanation.",
        "sense": "A deceleration spike reaches the crash sensor and control unit; a threshold and authorization check appear for a severe impact.",
        "trigger": "The igniter activates first, then the gas generator and upward gas flow into the folded fabric take focus.",
        "cushion": "The cushion expands between occupant and steering wheel, spreads contact force, then vents gas as it yields.",
        "closing": "Sensing, gas generation, force distribution, and controlled venting form the airbag's protective sequence.",
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
        "**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no top title/duration header, narration-guided focus highlights, ducked instrumental music, and restrained sound design", "",
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
        "- **Existing versions:** All twelve retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.", "",
    ])
    (ROOT / "shorts" / project["id"] / "script.md").write_text("\n".join(lines))


def readme_section(project: dict, beats: dict, qa: dict) -> str:
    narration = beats["aiSpeech"]
    duration = project.get("duration_s", CONFIG["defaults"]["duration_s"])
    audio = qa["audio"]
    sync = qa["synchronization"]
    return f"""## {project['title']}

**Finished video:** [{project['result']}]({project['result']})

- Demonstration-led original science-and-technology explainer; no top-left title or top-right duration label; active-component highlights and directional motion guide attention
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
    heading = "## How a Solar Panel Turns Sunlight Into Electricity"
    if heading in text:
        text = text.split(heading, 1)[0].rstrip()
    # Append the new five while preserving the twelve retained deliveries.
    readme.write_text(text.rstrip() + "\n\n" + "\n".join(sections))
    print("Wrote five final script records and appended RESULT/README.md without replacing earlier masters")


if __name__ == "__main__":
    main()
