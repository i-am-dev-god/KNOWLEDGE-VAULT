# How Touchscreens Sense Your Finger

**Composition:** `Short16Touchscreen`

**Format:** 1080 × 1920, 30 fps, 45 seconds

**Production:** Original code-drawn vector animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked ambient music, and restrained sound design

## Narration and storyboard

### 1. Not pressure. Electric.
> Your touchscreen does not need to feel pressure from your finger.
>
> It senses a tiny change in an electric field.

**Picture:** A finger touches a phone labeled `CAPACITIVE TOUCH`; concentric field lines show an electrical disturbance rather than a pressure button.

### 2. A grid under glass
> Under the glass sits a grid of transparent electrodes.
>
> A small electrical signal moves through them.

**Picture:** Transparent row and column electrodes appear beneath a glass surface, followed by a small moving signal indicator.

### 3. Find the disturbance
> Your finger conducts a little charge and disturbs the field nearby.
>
> The controller measures which rows and columns change.
>
> Their crossing point becomes your touch.

**Picture:** The finger disturbs the field, one row and one column are highlighted, and their crossing feeds a touch controller.

### 4. Why gloves matter
> That is why a normal glove blocks the signal.
>
> A conductive glove works because it lets the field reach your skin.

**Picture:** A normal glove and conductive glove are compared directly; only the conductive path connects the field to the skin.

### 5. Listening to touch
> So the glass is not just watching your finger. It is listening for a tiny electrical disturbance.

**Picture:** The recap `FIELD → ROW + COLUMN → TOUCH` resolves into the final title `TOUCH, DETECTED.` with a quiet outro and no engagement CTA.

## Selected-voice production record

- **Narrator:** The user-selected built-in `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section-by-section switching, third-party voice cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 37.44 seconds; SHA-256 `0613587eea92cc6dba6674967fa41cff7b4cca80e459f6c4a4bb674d0e9a2458`.
- **Calmer pacing:** The source is never sped up. It is uniformly slowed to `0.952702964×` with FFmpeg's pitch-preserving WSOLA `atempo`.
- **Master narration:** 48 kHz mono PCM WAV in a 45-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 39.482125 seconds. Master SHA-256: `e3430c4192ff7ffb8c9384967fa41cff7b4cca80e459f6c4a4bb674d0e9a2458`.
- **Synchronization:** Caption, scene, and sound-cue timings are generated only after `faster-whisper medium.en` word timestamps match the complete normalized script. Mean raw ASR word confidence is 98.30%.
- **Caption treatment:** Ten complete static clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation beneath the subtitles.

## Sound and accessibility

- Original SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `ambient-pad` instrumental bed with no drums or driving pulse, ducked beneath narration and gently released after the final line.
- Six quiet library cues support only meaningful transitions and reveals; their existing catalog provenance is retained.
- Final QA covers full decode, all 1,350 frames, stream formats, duration, integrated loudness, true peak, silence, delivered-audio/narration offset, and actual-MP4 visual review.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-touchscreens-sense-your-finger.mp4`. The production copy at `output/how-touchscreens-sense-your-finger.mp4` is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,350 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization (`I=-16`, `TP=-1.5`, `LRA=11`) while copying the H.264 stream without re-encoding it.
- **Measured audio:** −16.26 LUFS integrated, 7.4 LU loudness range, −1.42 dBFS true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Cross-correlation against the exact narration WAV measured 1 ms early, within the 12 ms acceptance limit; normalized mix correlation 0.45451.
- **Container duration:** 45.10 seconds (45.00 seconds of video plus AAC padding).
- **Size:** 6,505,456 bytes.
- **SHA-256:** `6e61efc444bcadd251ba648d806ae1699fc24cdf39c49b4cddb33f0c432c5908`.
- **MD5:** `069dae73155048178ae27c55bd9feb19`.
- **Timing:** Ten caption segments, five scenes, and six sound cues use the verified `voice-00` alignment. ASR caption end is 39.16 seconds; measured speech ends at 39.482125 seconds.
- **Visual review:** Every caption midpoint and the final outro were extracted from the delivered MP4 and reviewed. Captions are legible, diagrams remain inside the safe area, no moving caption line is present, and TypeScript validation passes with `npx tsc --noEmit`.
- **Existing versions:** The GPS and ANC videos in `RESULT/` and all existing Drive deliverables remain unchanged.
