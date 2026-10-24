# How Touchscreens Sense Your Finger

**Composition:** `Short16Touchscreen`

**Format:** 1080 × 1920, 30 fps, 45 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Where did you touch? · 0.00–5.14s

> Touch this spot.
> *0.70–1.80s*
>
> How does the glass know where your finger landed?
> *2.44–4.78s*

**Picture:** A finger touches one marked point on a phone; the question holds on that exact location.

### 2. Crossings under glass · 5.14–13.24s

> Beneath it, transparent electrodes cross in rows and columns.
> *5.64–9.50s*
>
> Each crossing holds a tiny electric field.
> *10.20–12.86s*

**Picture:** Transparent row and column electrodes cross beneath the glass. Every crossing is initially equal, then small nodes reveal the electric fields.

### 3. Watch one crossing · 13.24–21.86s

> Watch the center crossing.
> *13.74–14.90s*
>
> Your finger draws a little charge, so this field changes.
> *15.46–18.64s*
>
> The other crossings stay nearly unchanged.
> *19.10–21.48s*

**Picture:** Unrelated crossings dim. The finger approaches the center crossing, its field changes shape, and the other crossings remain nearly steady.

### 4. Turn change into position · 21.86–27.02s

> The controller finds the changed row and column.
> *22.36–25.12s*
>
> Their intersection becomes the touch position.
> *25.48–27.52s*

**Picture:** The changed row and column illuminate separately; their readouts combine into the coordinate (ROW 3, COLUMN 3).

### 5. Test the same field · 27.02–35.06s

> A normal glove stops this effect.
> *27.52–30.62s*
>
> Conductive thread lets it through, so the crossing responds again.
> *31.30–34.60s*

**Picture:** The same crossing is tested with a normal glove and conductive thread. Only the conductive path makes the field respond again.

### 6. A changed field becomes a location · 35.06–45.00s

> That is how glass turns a changed electric field into a touch location.
> *35.56–39.86s*

**Picture:** A restrained causal chain connects finger charge, one changed crossing, and the row-plus-column position.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 36.96 seconds; SHA-256 `867696087fff09a2bdf14e75d4442c4d9bc971250e63955c4ab6e12812b22816`.
- **Calmer pacing:** Playback is slowed gently to `0.927111959×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 45-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 39.993229 seconds. Master SHA-256: `4decae645a3931cb26127d217a1f7ee811db39ed8b9f629eab532dcea74c1ea5`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 98.09%.
- **Caption treatment:** 12 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and gently released after the final line; 5 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-touchscreens-sense-your-finger.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,350 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.23 LUFS integrated, 8.2 LU loudness range, -1.34 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.36509.
- **Timing:** 12 captions, 6 scenes, and 5 cues use the verified `voice-00` alignment. ASR caption end is 39.86 seconds; measured speech ends at 39.993229 seconds.
- **Container duration:** 45.100 seconds (45.00 seconds of video plus AAC padding).
- **Size:** 6,464,289 bytes.
- **SHA-256:** `3492847745db1ba6b490b18f0273c7866f1bfb7085128fbcce8785239e3623fa`.
- **MD5:** `da5c6a51c606de682e02f3cc7f1998a4`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (25 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** GPS and ANC hashes are verified unchanged, and existing Drive deliverables are left untouched.
