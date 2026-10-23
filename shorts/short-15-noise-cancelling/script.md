# How Noise-Cancelling Headphones Erase Sound

**Composition:** `Short15NoiseCancelling`

**Format:** 1080 × 1920, 30 fps, 60 seconds

**Production:** Original everyday-technology vector animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ambient music, and restrained sound design

## Narration and storyboard

### 1. Silence, made with sound
> Noise-cancelling headphones do not just block sound.
>
> They erase part of it by adding more sound.

**Picture:** Original over-ear headphones meet incoming noise waves. A second, reversed wave appears to show that cancellation is active, not just passive blocking.

### 2. Sound is pressure
> Sound travels through air as pressure waves, with peaks and troughs.

**Picture:** A driver and a slowly moving pressure wave introduce peaks, troughs, compression, and rarefaction without rapid motion.

### 3. First, listen
> A tiny microphone on the outside listens to the noise around you.
>
> Inside, the electronics create a copy of that noise.

**Picture:** A steady engine hum reaches an external microphone, then a signal path leads to a digital signal-processing chip.

### 4. Make the opposite
> But the copy is flipped: every peak becomes a trough.
>
> The speaker plays this anti-noise at exactly the right moment.

**Picture:** Original and inverted waves appear in matched panels, making the phase inversion visible before the anti-noise reaches a speaker.

### 5. Opposites cancel
> When both waves reach your ear, their opposing pressures largely cancel.
>
> This is called destructive interference.

**Picture:** Opposing waves converge and their combined result approaches a flat line. The term `DESTRUCTIVE INTERFERENCE` appears only after the idea is visible.

### 6. Best with steady noise
> It works best on steady, low sounds, like an engine's hum.
>
> Sudden sounds are harder to predict, so some noise still gets through.

**Picture:** A smooth engine-hum wave and an irregular clatter wave explain the limitation side by side. The video does not claim perfect silence.

### 7. Quiet, by design
> So silence is not always less sound. Sometimes, it is a carefully timed copy, played in reverse.

**Picture:** The recap `LISTEN → INVERT → CANCEL` resolves into the final title `SILENCE, MADE WITH SOUND` and a calm outro with no engagement CTA.

## Selected-voice production record

- **Narrator:** The user-selected built-in `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section-by-section voice switching, third-party voice cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 47.92 seconds; SHA-256 `ad01442d5314ccf2ac60532433c2b8f2831238b389f59541d6f674cedab24294`.
- **Calmer pacing:** The source is never sped up. It is uniformly slowed to `0.928439128×` with FFmpeg's pitch-preserving WSOLA `atempo`, making the delivery more comfortable than the previous explainer.
- **Master narration:** 48 kHz mono PCM WAV in a 60-second timeline with 0.8 seconds of initial silence. Paced speech ends at 51.992937 seconds. Master SHA-256: `a6ecc375a716fadb73dd9401af26281cfab2458b4b398b779ba253deb315e1de`.
- **Synchronization:** Caption, scene, and sound-cue timings are generated only after `faster-whisper medium.en` word timestamps match the complete normalized script. The first caption onset is clamped to the measured 0.8-second narration start.
- **Caption treatment:** Complete static clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation beneath the subtitles.

## Sound and accessibility

- Original SVG/CSS artwork created for this topic; the GPS animation and aquatic-life subject matter are not reused.
- `ambient-pad` instrumental bed with no drums or driving pulse, ducked beneath narration and gently released after the final line.
- Eight quiet library cues support only meaningful transitions and reveals.
- Captions use complete clauses inside the vertical safe area, with no moving timing indicator.
- Final QA covers full decode, 1,800 frames, stream formats, duration, integrated loudness, true peak, silence, and actual-MP4 visual review.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-noise-cancelling-headphones-work.mp4`. The production copy at `output/how-noise-cancelling-headphones-work.mp4` is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,800 decoded frames; full-stream decode of the finished MP4 passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final audio mastering used a 70 Hz high-pass, zero-makeup limiter, and loudness normalization (`I=-16`, `TP=-1.5`, `LRA=11`) while copying the validated H.264 stream without re-encoding it.
- **Measured audio:** −16.2 LUFS integrated, 9.2 LU loudness range, −1.5 dBFS true peak. No silence of at least two seconds below −45 dB was detected.
- **Container duration:** 60.10 seconds (60.00 seconds of video plus AAC padding).
- **Size:** 11,082,509 bytes.
- **SHA-256:** `ef9e6020d7f60cdb4f24404e92f03e7d3938c9c7ba6a129e46a758bca60ef6d6`.
- **MD5:** `c4aca9a979f1275d39db167d7d95de23`.
- **Transcription:** `faster-whisper medium.en` matched the complete normalized script with 96.55% mean word confidence. Two spurious tokens beginning in the digitally silent tail were excluded before exact comparison; see `transcription-voice-00.json` and `beats.json`.
- **Synchronization:** 12 caption segments, seven scenes, and eight sound cues are driven by the verified `voice-00` alignment. The ASR caption end is 51.64 seconds; measured speech ends at 51.992937 seconds.
- **Visual review:** All 12 caption midpoints from the finished MP4 plus four final-title/outro frames checked. No moving caption line is present, the closing recap and title are overlap-free, and TypeScript validation passes with `npx tsc --noEmit`.
- **Existing versions:** The GPS video in `RESULT/` and all existing Drive deliverables remain unchanged.
