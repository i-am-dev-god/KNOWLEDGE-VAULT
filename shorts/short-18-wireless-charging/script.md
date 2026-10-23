# How Wireless Charging Works

**Composition:** `Short18WirelessCharging`

**Format:** 1080 × 1920, 30 fps, 45 seconds

**Production:** Original code-drawn vector animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked ambient music, and restrained sound design

## Narration and storyboard

### 1. Power without a plug
> Wireless charging needs no metal plug between the pad and your phone.
>
> It passes energy through a magnetic field.

**Picture:** A phone and charging pad are linked by gentle magnetic-field arcs, with no metal connector between them.

### 2. The changing field
> Inside the pad, alternating current flows through a coil.
>
> That current makes the magnetic field rise and fall.

**Picture:** An alternating-current waveform drives the transmitter coil; the surrounding field strengthens as the current changes.

### 3. A voltage is induced
> A second coil inside your phone sits within that field.
>
> The changing magnetism induces a voltage in this coil.
>
> The phone turns that induced power into a form its battery can use.

**Picture:** The receiver coil enters the changing field, then a battery indicator appears inside the phone to show usable induced power.

### 4. Close and aligned
> The coils work best when they are close and aligned.
>
> Distance and misalignment weaken the link and waste energy.

**Picture:** Side-by-side aligned and offset coils compare a strong link with a weaker one; no claim of lossless charging is made.

### 5. Two coils, one link
> So the cable disappears, but a pair of coils still makes the connection.

**Picture:** Transmitter and receiver coils resolve into `NO CABLE. STILL LINKED.` with a calm outro and no engagement CTA.

## Selected-voice production record

- **Narrator:** The user-selected built-in `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party voice cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 36.24 seconds; SHA-256 `0f4da600a521cbb920406b56ba5b006abe4dde11cddb8767942eef1801e771d0`.
- **Calmer pacing:** The source is never sped up. It is uniformly slowed to `0.921124356×` with FFmpeg's pitch-preserving WSOLA `atempo`.
- **Master narration:** 48 kHz mono PCM WAV in a 45-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 39.483229 seconds. Master SHA-256: `173a05e3150e8f76cb8713ce42e1bb0bd6cf0fc4a0901e53d2a7467022b9a638`.
- **Synchronization:** Caption, scene, and sound-cue timings are generated only after `faster-whisper medium.en` word timestamps match the complete normalized script. Mean raw ASR word confidence is 97.50%.
- **Caption treatment:** Ten complete static clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation beneath the subtitles.

## Sound and accessibility

- Original SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `ambient-pad` instrumental bed with no drums or driving pulse, ducked beneath narration and gently released after the final line.
- Six quiet library cues support only meaningful transitions and reveals; their existing catalog provenance is retained.
- Final QA covers full decode, all 1,350 frames, stream formats, duration, integrated loudness, true peak, silence, delivered-audio/narration offset, and actual-MP4 visual review.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-wireless-charging-works.mp4`. The production copy at `output/how-wireless-charging-works.mp4` is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,350 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization (`I=-16`, `TP=-1.5`, `LRA=11`) while copying the H.264 stream without re-encoding it.
- **Measured audio:** −16.19 LUFS integrated, 7.5 LU loudness range, −1.38 dBFS true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Cross-correlation against the exact narration WAV measured 0 ms offset, within the 12 ms acceptance limit; normalized mix correlation 0.36171.
- **Container duration:** 45.10 seconds (45.00 seconds of video plus AAC padding).
- **Size:** 7,550,235 bytes.
- **SHA-256:** `9656eaf91dfee2d4ed94a87b0ad72f2b9bf346dee377d4a87af2f4418ce6ba63`.
- **MD5:** `322898b96ad67d7e62fb6ca108b85540`.
- **Timing:** Ten caption segments, five scenes, and six sound cues use the verified `voice-00` alignment. ASR caption end is 39.30 seconds; measured speech ends at 39.483229 seconds.
- **Visual review:** Every caption midpoint and the final outro were extracted from the delivered MP4 and reviewed. Captions are legible, diagrams remain inside the safe area, no moving caption line is present, and TypeScript validation passes with `npx tsc --noEmit`.
- **Existing versions:** The GPS and ANC videos in `RESULT/` and all existing Drive deliverables remain unchanged.
