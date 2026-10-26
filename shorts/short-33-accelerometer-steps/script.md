# How an Accelerometer Counts Your Steps

**Composition:** `Short33AccelerometerSteps`

**Format:** 1080 × 1920, 30 fps, 55 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no top title/duration header, narration-guided focus highlights, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. A tiny sensor inside your device · 0.00–5.70s

> Your phone or fitness band can count steps with a tiny chip called an accelerometer.
> *0.70–5.54s*

**Picture:** A phone step counter isolates the tiny accelerometer chip responsible for sensing motion.

### 2. The proof mass responds to motion · 5.70–17.48s

> Inside this accelerometer, a microscopic proof mass shifts slightly when your body moves.
> *6.20–11.62s*
>
> Tiny flexible springs hold the mass inside the chip while allowing that small movement.
> *12.30–17.28s*

**Picture:** The proof mass moves inside the chip, then the flexible springs become the highlighted constraint.

### 3. Movement changes capacitance · 17.48–22.36s

> As the mass shifts, the spacing between interlocking capacitor fingers changes.
> *17.98–22.22s*

**Picture:** Interlocking fixed and moving fingers change their spacing under an animated gap spotlight.

### 4. The chip outputs acceleration · 22.36–26.74s

> The accelerometer's electronics convert that spacing change into an acceleration signal.
> *22.86–27.24s*

**Picture:** The accelerometer chip feeds an electronics block and an acceleration waveform.

### 5. Walking creates a repeating pattern · 26.74–32.74s

> During walking, the signal contains a repeating pattern from each step and other body motion.
> *27.24–32.70s*

**Picture:** A noisy body-motion waveform reveals a repeating walking rhythm and step markers.

### 6. Software accepts real steps · 32.74–42.60s

> Software filters noise and looks for the rhythm and strength of genuine steps, rather than counting every bump.
> *33.24–38.80s*
>
> Each accepted step pattern advances the step counter by one.
> *39.38–42.60s*

**Picture:** The noisy signal recedes while filtered peaks are accepted and the visible step counter increments.

### 7. From microscopic motion to a step count · 42.60–55.00s

> So your step count begins with motion inside the accelerometer and ends with software recognizing a walking pattern.
> *43.10–48.96s*

**Picture:** Mass motion, capacitor change, acceleration data, and software pattern recognition form the complete chain.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 49.00 seconds; SHA-256 `7ffca34d85af159fed949c365bb25bb4dc8d5055515f076cb53a210df907f8a8`.
- **Calmer pacing:** Playback is kept at its natural `1.0×` tempo; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 55-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 49.137979 seconds. Master SHA-256: `0c698c9e85f10e5306722e256eb8cadf0e74cfd6de78bef00c2535cdf98f8664`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 97.28%.
- **Caption treatment:** 9 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and gently released after the final line; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-an-accelerometer-counts-your-steps.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,650 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.14 LUFS integrated, 9.9 LU loudness range, -1.96 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.33072.
- **Timing:** 9 captions, 7 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 48.96 seconds; measured speech ends at 49.137979 seconds.
- **Container duration:** 55.100 seconds (55.00 seconds of video plus AAC padding).
- **Size:** 11,907,762 bytes.
- **SHA-256:** `db389543db0f7a4f4039632cd4e9533debd99b684f323fe552d9177591970395`.
- **MD5:** `d0c4b5b3a6ab6b001b24301702cb0ff8`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All twelve retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
