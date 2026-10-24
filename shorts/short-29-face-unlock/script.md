# How Face Unlock Recognizes You

**Composition:** `Short29FaceUnlock`

**Format:** 1080 × 1920, 30 fps, 52 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Compare with an enrolled representation · 0.00–6.94s

> Look at your phone to unlock it.
> *0.70–2.82s*
>
> It is comparing your face with a stored representation.
> *3.32–6.48s*

**Picture:** An original schematic face on a phone is compared with an enrolled mathematical representation.

### 2. Project and read infrared structure · 6.94–17.20s

> Many phones project a pattern of infrared dots that your eyes cannot see.
> *7.44–12.04s*
>
> An infrared camera reads how that pattern bends across your face.
> *12.74–16.86s*

**Picture:** An infrared projector sends a dot pattern to the face and an infrared camera reads the distorted pattern.

### 3. Turn distortion into depth · 17.20–23.12s

> Those distortions become a depth map, describing shape rather than skin color.
> *17.70–22.68s*

**Picture:** The dotted face becomes a color-coded depth map with contour lines for shape and distance.

### 4. Build a mathematical template · 23.12–28.22s

> The system converts distinctive shape information into a mathematical face template.
> *23.62–28.72s*

**Picture:** Depth features become a numbered node-and-edge mathematical face template.

### 5. Compare templates and check liveness · 28.22–38.72s

> It compares the new template with the template created during enrollment.
> *28.72–33.42s*
>
> If they are close enough, and liveness checks pass, the phone unlocks.
> *34.20–38.26s*

**Picture:** A shifted new template aligns with the enrolled template, a similarity bar fills, and liveness plus unlock decisions appear.

### 6. More than a photograph · 38.72–52.00s

> The phone is not simply matching a photograph; it is checking a secure representation of your face.
> *39.22–44.80s*

**Picture:** Infrared pattern, depth and template, comparison and liveness, and unlock form the complete sequence.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 39.32 seconds; SHA-256 `259ba1664d68dceb0ba5f4db2f428ada3f8bb39e7bc69be100ab4ae3be8e3a57`.
- **Calmer pacing:** Playback is slowed gently to `0.880268999×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 52-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 44.982438 seconds. Master SHA-256: `702b3a3a690cdfe2d9d133dbbfb03e58e7788b8cf069faa56f595a8d78cb7a39`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 96.50%.
- **Caption treatment:** 9 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and gently released after the final line; 5 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-face-unlock-recognizes-you.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,560 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.23 LUFS integrated, 9.5 LU loudness range, -1.94 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.39960.
- **Timing:** 9 captions, 6 scenes, and 5 cues use the verified `voice-00` alignment. ASR caption end is 44.80 seconds; measured speech ends at 44.982438 seconds.
- **Container duration:** 52.100 seconds (52.00 seconds of video plus AAC padding).
- **Size:** 8,070,187 bytes.
- **SHA-256:** `714a0d6682f739633bc8495095fca550d69eb714372ac8b60b5c359983c02ba3`.
- **MD5:** `62b36ebf64a2f67e39ffb0c187825790`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seven retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
