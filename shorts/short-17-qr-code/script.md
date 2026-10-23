# How QR Codes Survive Damage

**Composition:** `Short17QrCode`

**Format:** 1080 × 1920, 30 fps, 45 seconds

**Production:** Original code-drawn vector animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked minimal music, and restrained sound design

## Narration and storyboard

### 1. Data in black and white
> A QR code is not just a random pile of squares.
>
> It is data written in black and white.

**Picture:** An original QR-style module matrix introduces the progression `MODULES → BITS → MESSAGE` rather than treating the pattern as decorative noise.

### 2. A map inside the pattern
> Each tiny module stands for a binary zero or one.
>
> The big corner squares help your camera find the code and its rotation.
>
> A clear border called the quiet zone separates it from everything else.

**Picture:** Three finder patterns, timing modules, and the quiet zone are labeled as the code's orientation and separation guide.

### 3. Read in a set order
> Your phone reads the modules in a set order and rebuilds the message.

**Picture:** A scanning path traverses the modules and feeds a phone marked `MESSAGE REBUILT`.

### 4. Built-in repair
> Extra error-correction data is stored inside the pattern.
>
> It lets the reader repair missing or damaged parts.
>
> So scratches can be forgiven, but only up to a limit.

**Picture:** A scratch damages central data modules while leaving all three finder patterns intact. Reconstructed modules appear as the physical scar fades; the final scar remains faint to distinguish data recovery from physical repair. The limitation is stated explicitly.

### 5. Message plus backup
> The code carries a message, a reading guide, and a backup plan.

**Picture:** `MESSAGE + READING GUIDE + BACKUP` resolves into `DATA, WITH A BACKUP PLAN.` with a calm outro and no engagement CTA.

## Selected-voice production record

- **Narrator:** The user-selected built-in `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party voice cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 36.24 seconds; SHA-256 `200d499a47c6fb1ec95d9623d47733374ab586d63c58f187e3c49d5164c7a581`.
- **Calmer pacing:** The source is never sped up. It is uniformly slowed to `0.923962629×` with FFmpeg's pitch-preserving WSOLA `atempo`.
- **Master narration:** 48 kHz mono PCM WAV in a 45-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 39.489208 seconds. Master SHA-256: `db9c120cfc212435658203fc6a3da3b83b40abc7e5edd7b94e64e2b5c7c28729`.
- **Synchronization:** Caption, scene, and sound-cue timings are generated only after `faster-whisper medium.en` word timestamps match the complete normalized script. Mean raw ASR word confidence is 95.11%. One spurious 0.06-second `the` insertion with 0.177 confidence was excluded; every remaining normalized token still had to match the script exactly.
- **Caption treatment:** Ten complete static clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation beneath the subtitles.

## Sound and accessibility

- Original SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `cinematic-min` sparse instrumental bed with no drums or vocals, ducked beneath narration and gently released after the final line.
- Six quiet library cues support only meaningful transitions and reveals; their existing catalog provenance is retained.
- Final QA covers full decode, all 1,350 frames, stream formats, duration, integrated loudness, true peak, silence, delivered-audio/narration offset, and actual-MP4 visual review.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-qr-codes-survive-damage.mp4`. The production copy at `output/how-qr-codes-survive-damage.mp4` is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,350 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization (`I=-16`, `TP=-1.5`, `LRA=11`) while copying the H.264 stream without re-encoding it.
- **Measured audio:** −16.10 LUFS integrated, 5.7 LU loudness range, −1.49 dBFS true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Cross-correlation against the exact narration WAV measured 0 ms offset, within the 12 ms acceptance limit; normalized mix correlation 0.36614.
- **Container duration:** 45.10 seconds (45.00 seconds of video plus AAC padding).
- **Size:** 7,430,215 bytes.
- **SHA-256:** `eb704d77f3178c18f18744613f6def2d8dcab20d8e9985df60e79a80847acb10`.
- **MD5:** `cb3b1dca2dc5ffae345bc00bb7ff2734`.
- **Timing:** Ten caption segments, five scenes, and six sound cues use the verified `voice-00` alignment. ASR caption end is 39.32 seconds; measured speech ends at 39.489208 seconds.
- **Visual review:** Every caption midpoint and the final outro were extracted from the delivered MP4 and reviewed. Captions are legible, diagrams remain inside the safe area, the scratch avoids all finder patterns, no moving caption line is present, and TypeScript validation passes with `npx tsc --noEmit`.
- **Existing versions:** The GPS and ANC videos in `RESULT/` and all existing Drive deliverables remain unchanged.
