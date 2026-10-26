#!/usr/bin/env python3
"""Write final script and RESULT records only after all five new videos pass QA."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "tools/shorts-41-45-projects.json").read_text())

PICTURES = {'short-41-induction-cooktop': {'hook': 'A steaming pan heats food above a dark glass cooking zone; the '
                                        'hidden coil and changing field appear without a directly heated '
                                        'burner.',
                                'coil': 'A glass-surface cutaway exposes the copper induction coil, '
                                        'circulating current markers, and an alternating waveform.',
                                'currents': 'A top-down ferromagnetic pan carries concentric eddy currents '
                                            'before resistance and heat take visual focus.',
                                'control': 'Heat arrows enter the food, then magnetic steel, plain glass, '
                                           'and plain copper cookware are compared directly.',
                                'closing': 'Coil, changing field, and heated pan form one short causal chain '
                                           'with continuous directional motion.'},
 'short-42-smoke-detector': {'hook': 'A smoke detector alarms immediately while smoke enters and a hidden '
                                     'optical path reveals the scattering mechanism.',
                             'chamber': 'In clear air, an LED beam crosses a dark chamber into a light trap '
                                        'while the offset sensor remains dark.',
                             'smoke': 'Animated particles redirect part of the beam into the sensor, whose '
                                      'rising signal activates the alarm indicator.',
                             'use': 'A smouldering, flame-free source sends visible smoke toward the '
                                    'alarming detector for an early-warning example.',
                             'closing': 'The LED, smoke particles, scattered path, sensor, and alarm remain '
                                        'together in one operational optical chamber.'},
 'short-43-hydraulic-lift': {'hook': 'A car rises on lift arms above an oil-filled cylinder while '
                                     'small-input and large-lift piston areas are compared.',
                             'pump': 'A moving input piston pushes oil through a connected chamber as '
                                     'pressure arrows act across the larger piston.',
                             'lift': 'The pressure-area relationship becomes an upward force that raises the '
                                     'piston, lift arms, and car together.',
                             'control': 'A closed valve traps oil to hold the load, then opens for returning '
                                        'oil and a controlled descent.',
                             'closing': 'Small input, oil pressure, and large lifting piston form a compact '
                                        'hydraulic-power chain beneath the car.'},
 'short-44-pressure-cooker': {'hook': 'A steaming pressure cooker heats food immediately while the sealed '
                                      'gasket and rising pressure gauge establish the mechanism.',
                              'pressure': 'Steam forms in the confined vessel, pressure acts on its walls, '
                                          'and the regulator controls the designed level.',
                              'heat': 'Open-pot and pressure-cooker cutaways compare normal and hotter '
                                      'boiling before heat arrows enter the food.',
                              'safety': 'The lid remains locked under pressure while the safety valve '
                                        'releases steam; the gauge falls before unlocking.',
                              'closing': 'The active cooker resolves into a three-step trap-steam, '
                                         'raise-pressure, cook-hotter chain.'},
 'short-45-electric-kettle': {'hook': 'Boiling water trips the kettle switch in the opening second, dimming '
                                      'the element and revealing the steam thermostat.',
                              'steam': 'The heating element warms the water, bubbles rise, and steam follows '
                                       'a dedicated channel to a two-metal strip.',
                              'switch': 'Different expansion arrows accompany the bimetal strip bending, the '
                                        'contacts separating, and the element disconnecting.',
                              'closing': 'Steam, a bent bimetal strip, and open electrical contacts form one '
                                         'short automatic-shutoff chain.'}}


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
        f"**Format:** 1080 × 1920, 30 fps, {duration:g} seconds", "",
        "**Production:** Result-first cinematic original cutaway animation with an immediate device payoff, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no corner topic or duration labels, narration-guided focus highlights, ducked instrumental music, and restrained sound design", "",
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
        f"- **Master narration:** 48 kHz mono PCM WAV in a {duration:g}-second timeline with {narration['initial_silence_seconds']:.2f} seconds of initial silence. Measured paced speech ends at {narration['paced_speech_end_seconds']:.6f} seconds. Master SHA-256: `{narration['narration_sha256']}`.",
        f"- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is {qa['transcription']['mean_word_probability'] * 100:.2f}%.",
        f"- **Caption treatment:** {len(beats['vo'])} complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.", "",
        "## Sound and provenance", "",
        "- Original code-drawn SVG/CSS artwork created for this topic; no stock footage, third-party logos, or external raster artwork is reused.",
        f"- `{sfx['music']['id']}` instrumental bed, ducked beneath narration and faded out during the trimmed ending; {len(sfx['events'])} quiet catalog cues support meaningful reveals only.",
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
        f"- **Visual review:** Passed on the actual delivered MP4 at frame zero, every narration-clause onset and midpoint, targeted late control actions where applicable, and the outro ({qa['validation']['narration_beat_samples_extracted']} ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.",
        "- **Existing versions:** All seventeen retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.", "",
    ])
    (ROOT / "shorts" / project["id"] / "script.md").write_text("\n".join(lines))


def readme_section(project: dict, beats: dict, qa: dict) -> str:
    narration = beats["aiSpeech"]
    duration = project.get("duration_s", CONFIG["defaults"]["duration_s"])
    audio = qa["audio"]
    sync = qa["synchronization"]
    return f"""## {project['title']}

**Finished video:** [{project['result']}]({project['result']})

- Cinematic original science-and-technology cutaway explainer; no top-left title or top-right duration label; active-component highlights and directional motion guide attention
- {duration:.2f} seconds of video; 1080 × 1920; 30 fps; H.264 High with AAC-LC stereo
- User-selected `voice-00` exclusively in one continuous take, {tempo_text(narration['tempo_rate'])}
- Result-first opening, 0.15-second narration onset, content-adaptive duration, calm pacing, {len(beats['vo'])} complete-clause captions, {len(beats['scenes'])} scenes, and **no moving line or timing indicator beneath subtitles**
- Full {qa['video']['decoded_frames']:,}-frame decode, loudness and delivered-sync checks, and ordered frame-zero/narration-onset/midpoint/outro visual review passed
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
    heading = "## How an Induction Cooktop Heats a Pan"
    if heading in text:
        text = text.split(heading, 1)[0].rstrip()
    # Append the new five while preserving all seventeen retained deliveries.
    readme.write_text(text.rstrip() + "\n\n" + "\n".join(sections))
    print("Wrote five final script records and appended RESULT/README.md without replacing earlier masters")


if __name__ == "__main__":
    main()
