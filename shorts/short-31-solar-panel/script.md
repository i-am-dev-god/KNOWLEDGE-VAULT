# How a Solar Panel Turns Sunlight Into Electricity

**Composition:** `Short31SolarPanel`

**Format:** 1080 × 1920, 30 fps, 52 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no top title/duration header, narration-guided focus highlights, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Sunlight enters the solar panel · 0.00–9.24s

> A solar panel turns sunlight directly into electricity for your home.
> *0.70–4.70s*
>
> The working part is not the glass cover; it is the thin solar cell underneath.
> *5.22–9.12s*

**Picture:** Sunlight moves toward a solar panel, then the thin solar cell beneath the glass is isolated and highlighted.

### 2. Photons free charges in silicon · 9.24–20.52s

> When sunlight enters the solar cell, photons transfer energy to electrons in the silicon.
> *9.74–14.58s*
>
> That energy frees some electrons, leaving behind positively charged vacancies called holes.
> *15.16–20.38s*

**Picture:** Photons enter the silicon; freed electrons and positive holes appear inside the spotlighted solar cell.

### 3. The cell guides electrons · 20.52–25.24s

> A built-in electric field inside the solar cell pushes the freed electrons in one direction.
> *21.02–25.74s*

**Picture:** The built-in field region is highlighted while electrons move in one guided direction.

### 4. Direct current flows through a load · 25.24–35.40s

> Metal contacts collect those electrons and send their flow through an external circuit as direct current.
> *25.74–31.40s*
>
> The moving electrons can power a load before returning to the solar cell.
> *32.02–35.48s*

**Picture:** Electrons travel from the panel through a load and back along the return path; the load receives the final focus.

### 5. The inverter supplies alternating current · 35.40–41.18s

> For many home appliances, an inverter changes the solar panel's direct current into alternating current.
> *35.90–41.30s*

**Picture:** Direct current enters the highlighted inverter and an animated alternating-current waveform feeds a house.

### 6. From sunlight to household electricity · 41.18–52.00s

> So the solar panel supplies electricity because sunlight frees charges and the cell guides their flow.
> *41.68–46.94s*

**Picture:** Sunlight, charge guidance, direct current, and the inverter form the complete solar-panel chain.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 46.88 seconds; SHA-256 `6b4ba4f659d5e8a3dc0ac98f68b692353f49a738273818b7c705a117e165ed4f`.
- **Calmer pacing:** Playback is kept at its natural `1.0×` tempo; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 52-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 47.048208 seconds. Master SHA-256: `07e49cc657bc4b36b716be4549143ced02f3270b610ab238cf8f7f032de621bd`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 97.89%.
- **Caption treatment:** 9 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and gently released after the final line; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-a-solar-panel-turns-sunlight-into-electricity.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,560 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.17 LUFS integrated, 5.1 LU loudness range, -1.95 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.38504.
- **Timing:** 9 captions, 6 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 46.94 seconds; measured speech ends at 47.048208 seconds.
- **Container duration:** 52.100 seconds (52.00 seconds of video plus AAC padding).
- **Size:** 9,401,430 bytes.
- **SHA-256:** `d1d15732e9b5c0345b1386cb115fa5059aba871e87c66b0c761fd9813feef7b1`.
- **MD5:** `4a952eaefa388aa27ab15cae626cc570`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All twelve retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
