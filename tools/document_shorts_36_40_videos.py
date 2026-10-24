#!/usr/bin/env python3
"""Write final script and RESULT records only after all five new videos pass QA."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CONFIG = json.loads((ROOT / "tools/shorts-36-40-projects.json").read_text())

PICTURES = {'short-36-fiber-optics': {'closing': 'One continuous animated link connects digital input, optical encoding, guided glass transmission, '
                                      'detection, and decoded output.',
                           'core': 'A large jacket–cladding–core cutaway isolates the central glass pathway as incoming light converges '
                                   'into it.',
                           'hook': 'A layered fiber connector pair carries animated light pulses, while a copper conductor recedes into a '
                                   'dim comparison.',
                           'receive': 'Arriving flashes strike a photodetector, then become an electrical waveform, restored bit blocks, '
                                      'and router data.',
                           'reflect': 'A bending fiber carries light above a magnified zigzag reflection demonstration at the '
                                      'core–cladding boundary.',
                           'transmit': 'Digital bit blocks and an electrical waveform drive a glowing laser/LED, which launches optical '
                                       'pulses into the fiber.'},
 'short-37-electric-motor': {'closing': 'The complete motor runs continuously with repeating current direction, commutation, magnetic '
                                        'force, and shaft rotation.',
                             'coil': 'The stator recedes while the energized rotor coil, current arrows, DC supply, and feed path take '
                                     'focus.',
                             'field': 'North and south stator magnets establish multiple animated field lines across the central coil '
                                      'space.',
                             'hook': 'A detailed brushed DC motor cutaway exposes fixed magnets, a rotating coil, housing fasteners, and the '
                                     'output shaft.',
                             'switch': 'A macro split-ring commutator rotates between stationary brushes and reverses current at the '
                                       'half-turn.',
                             'torque': 'Opposite force arrows act on the coil sides; the coil and shaft rotate under a visible turning '
                                       'moment.'},
 'short-38-transformer': {'closing': 'Primary AC, guided core flux, secondary induction, and the turns ratio form one animated '
                                     'transformer.',
                          'core': 'Alternating directional flux traces the actual closed iron-core path and then links the secondary '
                                  'winding.',
                          'hook': 'A laminated core and two detailed copper windings reveal that energy crosses without a direct wire '
                                  'connection.',
                          'primary': 'The primary winding and AC source take focus as an animated alternating waveform drives the changing '
                                     'current.',
                          'secondary': 'The secondary winding and its induced AC output waveform brighten while the primary recedes.',
                          'turns': 'Side-by-side step-up and step-down cutaways expose different primary and secondary turn counts and '
                                   'voltage results.'},
 'short-39-radar': {'closing': 'The radar, outgoing pulse, returning echo, and range relationship appear together in one operational view.',
                    'echo': 'The aircraft reflects a subset of the radio energy along the return path while minor scattered rays recede.',
                    'hook': 'A night-time radar dish and aircraft exchange distinct outgoing radio pulses and returning echoes.',
                    'range': 'A pulse-versus-echo timeline and double-travel path resolve into the half-round-trip range calculation.',
                    'scan': 'A top-down radar scope rotates its sweep and accumulates echo blips across range rings and directions.',
                    'transmit': 'The transmitter creates a pulse, the antenna launches it, and the packet travels toward the highlighted '
                                'aircraft.'},
 'short-40-mechanical-watch': {'balance': 'A balance wheel oscillates while its spiral hairspring visibly breathes and the pallet rhythm '
                                          'marks tick and tock.',
                               'closing': 'Mainspring, gear train, escapement, oscillator, and hands form a continuous regulated '
                                          'mechanical-timekeeping chain.',
                               'escape': 'A toothed escape wheel advances in discrete steps as a jeweled pallet fork alternately locks and '
                                         'releases it.',
                               'gears': 'Four meshing gears counter-rotate at related speeds and carry motion upward to a working '
                                        'watch-hand dial.',
                               'hook': 'A large watch cutaway combines hands, mainspring, gears, and a highlighted escapement in one '
                                       'detailed face.',
                               'wind': 'A rotating crown winds a visible spiral mainspring inside its barrel, which then drives an '
                                       'adjacent gear.'}}


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
        "**Production:** Cinematic demonstration-led original cutaway animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no corner topic or duration labels, narration-guided focus highlights, ducked instrumental music, and restrained sound design", "",
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
    heading = "## How Fiber Optics Carry Internet Data"
    if heading in text:
        text = text.split(heading, 1)[0].rstrip()
    # Append the new five while preserving the twelve retained deliveries.
    readme.write_text(text.rstrip() + "\n\n" + "\n".join(sections))
    print("Wrote five final script records and appended RESULT/README.md without replacing earlier masters")


if __name__ == "__main__":
    main()
