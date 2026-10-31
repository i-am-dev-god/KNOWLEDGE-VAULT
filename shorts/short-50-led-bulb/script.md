# How an LED Bulb Makes Light

**Composition:** `Short50LedBulb`

**Format:** 1080 × 1920, 30 fps, 45.5 seconds

**Production:** Rebuilt result-first device animation with physically aligned contact points, connected pipes/wires, recognizable labeled cutaways, one primary action per beat, steady part highlights, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line or corner metadata, ducked music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Semiconductor chips make the light · 0.00–11.82s

> This LED bulb produces bright light while using much less power than an old incandescent bulb.
> *0.15–6.56s*
>
> Its light comes from tiny semiconductor chips, not from a glowing metal filament.
> *7.18–11.58s*

**Picture:** A labeled LED-bulb cutaway identifies the diffuser, LED board, heat sink, driver, and base beside a smaller filament-bulb comparison.

### 2. The driver supplies controlled current · 11.82–17.22s

> The bulb's driver changes household electricity into a controlled direct current.
> *12.32–17.06s*

**Picture:** Inside the lower bulb, socket AC connects to a rectifier-and-regulator driver board whose controlled DC output connects upward to the LED board.

### 3. Recombining charges release photons · 17.22–27.32s

> Inside each LED, electrons and holes move toward a junction in the semiconductor.
> *17.72–22.80s*
>
> When they recombine, they release energy as photons, which are particles of light.
> *23.28–27.82s*

**Picture:** A magnified P-type/N-type chip uses a few deliberate electron-hole pairs at a labeled recombination junction and upward photon arrows.

### 4. Phosphor, diffusion, and cooling make a useful bulb · 27.32–38.12s

> The chip's materials set the light's color, and a phosphor coating can create white light.
> *27.82–33.20s*
>
> A diffuser spreads that light evenly, while the metal body carries heat away.
> *33.76–38.08s*

**Picture:** A blue chip with a directly attached yellow phosphor coating contrasts with a complete bulb showing diffuser-spread light and heat leaving the metal body.

### 5. Electrical energy becomes light directly · 38.12–45.50s

> So controlled current powers semiconductor junctions that turn electrical energy directly into light.
> *38.62–44.36s*

**Picture:** One full LED bulb carries three numbered callouts for base current control, chip-junction emission, and useful light leaving the dome.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 41.20 seconds; SHA-256 `a37a369ed2e3459ce7f3e829da07daecefa5b0f8230f36fb7d2c0bff9b6024d2`.
- **Calmer pacing:** Playback is slowed gently to `0.919359768×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 45.5-second timeline with 0.15 seconds of initial silence. Measured paced speech ends at 44.589646 seconds. Master SHA-256: `5cf5c5635820bc92faeebcb38248a1b1debd9ce5bf15ecfe49357615f27219bf`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 96.76%.
- **Caption treatment:** 8 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no stock footage, third-party logos, or external raster artwork is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and faded out during the trimmed ending; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-an-led-bulb-makes-light.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,365 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.12 LUFS integrated, 1.7 LU loudness range, -1.84 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.37178.
- **Timing:** 8 captions, 5 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 44.36 seconds; measured speech ends at 44.589646 seconds.
- **Container duration:** 45.500 seconds (45.50 seconds of video plus AAC padding).
- **Size:** 7,637,449 bytes.
- **SHA-256:** `9460ad8e789023ba3b107d9428327c11286e3a115881cfdc9ace2a6b1221c534`.
- **MD5:** `ce8fd8b5f5f139e06f5e536d341ce1d4`.
- **Visual review:** Passed on the actual delivered MP4 at frame zero, every narration-clause onset and midpoint, targeted late control actions where applicable, and the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All twenty-two retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
