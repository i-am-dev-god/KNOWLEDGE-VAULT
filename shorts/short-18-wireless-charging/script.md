# How Wireless Charging Works

**Composition:** `Short18WirelessCharging`

**Format:** 1080 × 1920, 30 fps, 45 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Drive one coil · 0.00–7.20s

> Inside the pad, alternating current flows through this coil.
> *0.70–4.46s*
>
> Watch the current reverse direction.
> *5.22–7.02s*

**Picture:** One pad coil is shown alone. Current arrows reverse while an alternating waveform makes the direction change explicit.

### 2. Make a changing field · 7.20–11.42s

> That makes the magnetic field expand and collapse.
> *7.70–10.92s*

**Picture:** Magnetic loops expand and collapse around the same driven coil; no receiver is introduced yet.

### 3. Induce a voltage · 11.42–22.62s

> Now place a second coil inside that changing field.
> *11.92–15.12s*
>
> The field induces a voltage in the second coil.
> *15.72–18.68s*
>
> The coils do not touch. They are magnetically linked.
> *19.34–22.36s*

**Picture:** A second coil enters the changing field, an induced-voltage readout appears, and a no-contact bracket identifies the magnetic link.

### 4. Prepare battery power · 22.62–26.02s

> The phone then rectifies and regulates that power for its battery.
> *23.12–26.52s*

**Picture:** The receiver feeds one combined RECTIFY + REGULATE stage and then the battery; the alternating waveform becomes controlled DC.

### 5. Change the coupling · 26.02–34.56s

> Move the coils apart or off-center.
> *26.52–29.48s*
>
> Less of the field links them, so the transfer weakens and wastes energy.
> *30.20–34.00s*

**Picture:** The receiver moves off-center and away. Fewer shared field lines remain, and the transfer weakens.

### 6. Two coils, one transfer · 34.56–45.00s

> Wireless charging is energy crossing a changing magnetic field between two coils.
> *35.06–39.78s*

**Picture:** The two coils and the changing magnetic field remain together as the complete transfer is summarized.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 37.20 seconds; SHA-256 `7bd80c6ab8a9098e2bd3a438e4dd08ec303ac0b8f2f466492fb8bb535dd32e81`.
- **Calmer pacing:** Playback is slowed gently to `0.937254029×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 45-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 39.984896 seconds. Master SHA-256: `8364ddc5136c03f76a959cb8f152b4612b1da57a138bfc5a2bb566c20138e91b`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 98.57%.
- **Caption treatment:** 10 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and gently released after the final line; 5 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-wireless-charging-works.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,350 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.19 LUFS integrated, 9.7 LU loudness range, -1.33 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.35510.
- **Timing:** 10 captions, 6 scenes, and 5 cues use the verified `voice-00` alignment. ASR caption end is 39.78 seconds; measured speech ends at 39.984896 seconds.
- **Container duration:** 45.100 seconds (45.00 seconds of video plus AAC padding).
- **Size:** 7,256,912 bytes.
- **SHA-256:** `c3ceecb903eb86ad8982210e1420e023d124e4e0e16fb5ec04f388896e7f537e`.
- **MD5:** `a86726af8a68da080353c4473d910113`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (21 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** GPS and ANC hashes are verified unchanged, and existing Drive deliverables are left untouched.
