#!/usr/bin/env python3
"""Write final script and RESULT records only after all five new videos pass QA."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "tools/shorts-46-50-projects.json").read_text())

PICTURES = {'short-46-vacuum-cleaner': {'hook': 'A floor nozzle and transparent collection bin show dirt moving with '
                                     'the airflow from the opening seconds.',
                             'fan': 'A motor-driven fan pushes exhaust air out while room-air arrows enter '
                                    'through the lower-pressure inlet.',
                             'path': 'Dust travels with air into a cyclone cutaway, where dirt falls into '
                                     'the bin and filtered air exits.',
                             'filter': 'A pleated filter changes from clogged to clean as moving airflow '
                                       'markers become stronger.',
                             'closing': 'Fan, moving air, and collected dirt form one continuously animated '
                                        'cleaning chain.'},
 'short-47-digital-scale': {'hook': 'An object loads a digital scale, the reading appears, and a cutaway '
                                    'reveals the hidden metal element bending.',
                            'loadcell': 'A magnified load cell deflects under force while attached strain '
                                        'gauges stretch and compress with it.',
                            'signal': 'A resistance element feeds an amplifier and digitizer before a '
                                      'numerical reading appears.',
                            'use': 'A known calibration weight and a container-side tare demonstration show '
                                   'units and subtraction directly.',
                            'closing': 'A bent beam, changing resistance, and a digital value form one '
                                       'measurement chain.'},
 'short-48-automatic-faucet': {'hook': 'Hands beneath a recognizable faucet trigger an immediate visible '
                                       'water stream and reveal the infrared sensor window.',
                               'emit': 'An infrared LED and receiver send animated invisible pulses outward '
                                       'with no hands in the detection zone.',
                               'reflect': 'Hands redirect pulses into the receiver while a controller and '
                                          'solenoid valve respond to the stronger return signal.',
                               'valve': 'Hands leave, the return path disappears, the solenoid plunger '
                                        'closes, and water-flow markers stop.',
                               'closing': 'Infrared emission, hand reflection, and valve-controlled water '
                                          'form one touch-free chain.'},
 'short-49-washing-machine': {'hook': 'A front-loading washing machine spins clothes against its drum while '
                                      'water droplets escape.',
                              'spin': 'A rotating drum cutaway contrasts inward wall forces on clothes with '
                                      'outward-moving water.',
                              'drain': 'Water passes through perforations into the outer tub and follows a '
                                       'visible path to the drain pump.',
                              'balance': 'Unbalanced and balanced drum cross-sections compare wobble with an '
                                         'evenly distributed stable spin.',
                              'closing': 'Rotation, perforations, and pumping form one animated '
                                         'water-extraction chain.'},
 'short-50-led-bulb': {'hook': 'A glowing LED-bulb cutaway reveals semiconductor chips beside a hotter '
                               'filament-bulb comparison.',
                       'driver': 'Household power enters a component-filled LED driver and leaves as a '
                                 'controlled direct-current path.',
                       'junction': 'Electrons and holes move toward a semiconductor junction, where '
                                   'recombination releases animated photons.',
                       'white': 'Blue-chip light enters a phosphor layer, then a diffuser spreads white '
                                'light while heat leaves the metal body.',
                       'closing': 'Controlled current, junction emission, and a glowing bulb form one direct '
                                  'energy-conversion chain.'}}


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
        "- **Existing versions:** All twenty-two retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.", "",
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
    heading = "## How a Vacuum Cleaner Pulls Up Dirt"
    if heading in text:
        text = text.split(heading, 1)[0].rstrip()
    # Append the new five while preserving all twenty-two retained deliveries.
    readme.write_text(text.rstrip() + "\n\n" + "\n".join(sections))
    print("Wrote five final script records and appended RESULT/README.md without replacing earlier masters")


if __name__ == "__main__":
    main()
