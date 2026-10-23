# How Fingerprint Sensors Recognize You

**Composition:** `Short19Fingerprint`

**Format:** 1080 × 1920, 30 fps, 45 seconds

**Production:** Original code-drawn vector animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked minimal music, and restrained sound design

## Narration and storyboard

### 1. More than a photo
> Your phone does not need to remember a perfect photograph of your finger.
>
> It learns a pattern of distinguishing details.

**Picture:** An original fingerprint ridge drawing gains markers for distinguishing details rather than being treated as a perfect stored photograph.

### 2. Reading the ridges
> Many phones use a capacitive sensor to read ridges and valleys.
>
> Tiny electrical differences help map where each ridge sits.

**Picture:** Ridges sit above a row of capacitive elements; varying electrical responses form a ridge-and-valley map.

### 3. Details become a template
> The system finds features such as ridge endings and splits.
>
> It stores a mathematical template, not an ordinary image you can open.

**Picture:** Endings and splits become a compact graph of features and relative positions, explicitly labeled as minutiae rather than an ordinary image.

### 4. Compare, not copy
> When you try again, the new scan becomes another template.
>
> The phone compares features and their positions, allowing for small shifts.
>
> A close match unlocks; a poor match fails.

**Picture:** Two feature templates are compared with a small positional shift, followed by a close-match unlock indication.

### 5. A pattern, not perfection
> So your fingerprint becomes a pattern the phone can compare without expecting two touches to be identical.

**Picture:** `SCAN → TEMPLATE → COMPARE` resolves into `PATTERN RECOGNIZED.` with a calm outro and no engagement CTA.

## Selected-voice production record

- **Narrator:** The user-selected built-in `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party voice cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 41.28 seconds; SHA-256 `e3725039b810213c9c282f43a5f95a0f6faf41f305214ba5bf474b59e98740a9`.
- **Natural pacing:** The selected take already fit the calm timeline, so it remains at its original `1.0×` tempo and is never sped up.
- **Master narration:** 48 kHz mono PCM WAV in a 45-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 41.605167 seconds. Master SHA-256: `5017a1110357eb03da0e6ed17096bb4cf7426a88c45a1e0ae2b9d5923c922efa`.
- **Synchronization:** Caption, scene, and sound-cue timings are generated only after `faster-whisper medium.en` word timestamps match the complete normalized script. Mean raw ASR word confidence is 97.63%.
- **Caption treatment:** Ten complete static clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation beneath the subtitles.

## Sound and accessibility

- Original SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `cinematic-min` sparse instrumental bed with no drums or vocals, ducked beneath narration and gently released after the final line.
- Six quiet library cues support only meaningful transitions and reveals; their existing catalog provenance is retained.
- Final QA covers full decode, all 1,350 frames, stream formats, duration, integrated loudness, true peak, silence, delivered-audio/narration offset, and actual-MP4 visual review.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-fingerprint-sensors-recognize-you.mp4`. The production copy at `output/how-fingerprint-sensors-recognize-you.mp4` is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,350 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization (`I=-16`, `TP=-1.5`, `LRA=11`) while copying the H.264 stream without re-encoding it.
- **Measured audio:** −16.14 LUFS integrated, 4.5 LU loudness range, −1.43 dBFS true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Cross-correlation against the exact narration WAV measured 1 ms early, within the 12 ms acceptance limit; normalized mix correlation 0.51269.
- **Container duration:** 45.10 seconds (45.00 seconds of video plus AAC padding).
- **Size:** 7,931,346 bytes.
- **SHA-256:** `de615c547486e5bb0b58598ccc9684e64f3ed172b21e6eb6977f86d92b875bf2`.
- **MD5:** `be02ca33fe030d347b5fa7d5fb05829a`.
- **Timing:** Ten caption segments, five scenes, and six sound cues use the verified `voice-00` alignment. ASR caption end is 41.38 seconds; measured speech ends at 41.605167 seconds.
- **Visual review:** Every caption midpoint and the final outro were extracted from the delivered MP4 and reviewed. Captions are legible, diagrams remain inside the safe area, no moving caption line is present, and TypeScript validation passes with `npx tsc --noEmit`.
- **Existing versions:** The GPS and ANC videos in `RESULT/` and all existing Drive deliverables remain unchanged.
