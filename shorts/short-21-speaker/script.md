# How a Speaker Turns Electricity Into Sound

**Composition:** `Short21Speaker`

**Format:** 1080 × 1920, 30 fps, 48 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Start with the moving cone · 0.00–5.86s

> Watch this speaker cone.
> *0.70–2.26s*
>
> A changing electrical signal will make it move.
> *2.82–5.62s*

**Picture:** A cutaway loudspeaker holds on the cone, then the cone begins moving in response to the electrical input.

### 2. Current creates a reversing force · 5.86–18.08s

> Inside, a coil sits in the field of a permanent magnet.
> *6.36–9.94s*
>
> The audio signal sends alternating current through that coil.
> *10.66–14.00s*
>
> The current reverses, so the magnetic force reverses too.
> *14.64–17.96s*

**Picture:** The voice coil is isolated between magnet poles. Reversing current arrows reverse the visible force and motion arrows.

### 3. Force becomes cone movement · 18.08–25.22s

> The coil pulls the cone inward, then pushes it outward.
> *18.58–22.22s*
>
> Follow the cone, not the waveform.
> *22.88–25.14s*

**Picture:** The same alternating drive moves the attached cone forward and backward; the current and direction remain visible together.

### 4. Movement becomes pressure variations · 25.22–36.68s

> As the cone moves out, it compresses the air in front.
> *25.72–29.12s*
>
> As it moves back, it leaves a region of lower pressure.
> *29.66–32.52s*
>
> Those pressure variations travel outward as sound.
> *33.24–36.46s*

**Picture:** Forward cone motion squeezes nearby air particles into compression; backward motion spreads them into rarefaction. The pattern then travels outward while the cone remains at the speaker.

### 5. Electricity becomes sound · 36.68–48.00s

> Electrical variations become mechanical motion, and motion becomes sound.
> *37.18–41.78s*

**Picture:** The electrical signal, moving coil and cone, and outgoing pressure pattern form a restrained causal chain.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 35.96 seconds; SHA-256 `a0157a3adb262197f17a32f51ac581e8e900a0e10a7bdfa6803166929c34b40b`.
- **Calmer pacing:** Playback is slowed gently to `0.858514931×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 48-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 41.977833 seconds. Master SHA-256: `a90e358cd82a73356c6940bb9d2f72b0d19bf24bbdd0354f8475345c75f2453c`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 98.42%.
- **Caption treatment:** 11 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `cinematic-min` instrumental bed, ducked beneath narration and gently released after the final line; 5 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-a-speaker-turns-electricity-into-sound.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,440 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.13 LUFS integrated, 9.6 LU loudness range, -1.37 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset -1 ms, within the 12 ms acceptance limit; normalized mix correlation 0.44492.
- **Timing:** 11 captions, 5 scenes, and 5 cues use the verified `voice-00` alignment. ASR caption end is 41.78 seconds; measured speech ends at 41.977833 seconds.
- **Container duration:** 48.000 seconds (48.00 seconds of video plus AAC padding).
- **Size:** 8,854,404 bytes.
- **SHA-256:** `32a52c2d00a64db5573bb316d212d4f682c4e062e2e883ba9c67df788d9b1bfc`.
- **MD5:** `a08eceac0c5c73a269d721610823dc75`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (23 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seven earlier delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
