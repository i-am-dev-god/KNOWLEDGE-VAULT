# How an Airbag Protects You in a Crash

**Composition:** `Short35Airbag`

**Format:** 1080 × 1920, 30 fps, 55 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no top title/duration header, narration-guided focus highlights, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. An airbag cushions the occupant · 0.00–12.72s

> In a severe car crash, an airbag works with your seat belt to cushion you from hard interior surfaces.
> *0.70–6.24s*
>
> This explanation slows the sequence down; in a real crash, the airbag responds in tens of milliseconds.
> *6.94–12.54s*

**Picture:** A seat-belted occupant and airbag cushion establish the protective purpose; a label explicitly marks the slowed explanation.

### 2. Sensors and the control unit detect a severe crash · 12.72–23.96s

> Crash sensors detect the vehicle's sudden deceleration and send that information to the airbag control unit.
> *13.22–18.76s*
>
> The control unit triggers the airbag only when the crash pattern indicates a severe impact.
> *19.30–23.94s*

**Picture:** A deceleration spike reaches the crash sensor and control unit; a threshold and authorization check appear for a severe impact.

### 3. The module generates gas · 23.96–33.54s

> A small igniter then activates a gas generator inside the folded airbag module.
> *24.46–28.96s*
>
> The generator rapidly produces gas that flows into the woven fabric cushion.
> *28.96–33.34s*

**Picture:** The igniter activates first, then the gas generator and upward gas flow into the folded fabric take focus.

### 4. The cushion spreads force and deflates · 33.54–45.00s

> The expanding airbag spreads out in front of the occupant, distributing force over a wider area.
> *34.04–39.08s*
>
> As you press into the cushion, vents let gas escape so the airbag can absorb motion while deflating.
> *39.60–44.98s*

**Picture:** The cushion expands between occupant and steering wheel, spreads contact force, then vents gas as it yields.

### 5. Sense, inflate, cushion, and yield · 45.00–55.00s

> So the airbag protects by sensing a crash, inflating quickly, and then yielding in a controlled way.
> *45.50–50.64s*

**Picture:** Sensing, gas generation, force distribution, and controlled venting form the airbag's protective sequence.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 50.48 seconds; SHA-256 `3a81cdb8313b7fb94e281826ea65d705ad142406e25b91b4d0aeab12d4bcd464`.
- **Calmer pacing:** Playback is kept at its natural `1.0×` tempo; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 55-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 50.710479 seconds. Master SHA-256: `3a941f8b94405ac23639bc6fccaab6a745d9e883006acf641c7dc0d8fb0a0890`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 97.59%.
- **Caption treatment:** 9 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `cinematic-min` instrumental bed, ducked beneath narration and gently released after the final line; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-an-airbag-protects-you-in-a-crash.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,650 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.11 LUFS integrated, 2.4 LU loudness range, -1.85 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.34214.
- **Timing:** 9 captions, 5 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 50.64 seconds; measured speech ends at 50.710479 seconds.
- **Container duration:** 55.100 seconds (55.00 seconds of video plus AAC padding).
- **Size:** 10,761,232 bytes.
- **SHA-256:** `36b76b86ed68ec84a4eb5d4c0ebff5febfe54b0dad353918dfcbf64478351776`.
- **MD5:** `378aa28eeb19ef74d641a36608331cc5`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All twelve retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
