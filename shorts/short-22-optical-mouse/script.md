# How an Optical Mouse Tracks Movement

**Composition:** `Short22OpticalMouse`

**Format:** 1080 × 1920, 30 fps, 52 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Movement becomes cursor motion · 0.00–5.52s

> Move the mouse a little.
> *0.70–2.14s*
>
> The cursor follows almost instantly.
> *2.78–5.26s*

**Picture:** An optical mouse and pointer move together before the underside sensor is revealed.

### 2. Light the surface and take pictures · 5.52–12.74s

> Underneath, an LED lights the surface.
> *6.02–8.66s*
>
> A tiny camera takes rapid pictures of the texture.
> *9.26–12.44s*

**Picture:** The LED illuminates a small surface patch and the reflected light is guided to a tiny camera.

### 3. Measure the shift between snapshots · 12.74–23.38s

> Watch these two snapshots.
> *13.24–14.54s*
>
> The dots have not changed. Their positions have shifted.
> *15.34–19.12s*
>
> The processor compares the images and measures that shift.
> *19.86–23.36s*

**Picture:** Several adjacent camera frames contain the same texture shifted by a few pixels, not different textures.

### 4. Turn image shift into direction · 23.38–32.10s

> If the texture moves left in the images, the mouse must have moved right.
> *23.88–28.16s*
>
> That measured movement becomes the cursor's motion.
> *28.16–31.86s*

**Picture:** Matching patches are compared. Displacement arrows and a readout distinguish X from Y, then the pointer moves in the measured direction.

### 5. Why tracking can fail · 32.10–39.52s

> On a plain, glossy surface, there may be too little texture to compare.
> *32.60–37.00s*
>
> That is why tracking can fail.
> *37.54–39.26s*

**Picture:** A glossy surface removes useful texture contrast; the snapshots look alike and tracking uncertainty rises.

### 6. Changing pictures reveal motion · 39.52–52.00s

> An optical mouse does not feel direction. It measures changing pictures.
> *40.02–44.72s*

**Picture:** The LED, tiny camera, matching frames, displacement measurement, and pointer response form the complete sequence.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 38.08 seconds; SHA-256 `6c1cf6906989f2dd2126ad5434d3a80a35769ab787e916a815d6fdef09485289`.
- **Calmer pacing:** Playback is slowed gently to `0.850210685×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 52-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 44.988229 seconds. Master SHA-256: `29b4ffb96c12bcba4478930e619da788060de728f629a503a23895cd1b0f0574`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 98.01%.
- **Caption treatment:** 12 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and gently released after the final line; 5 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-an-optical-mouse-tracks-movement.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,560 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.17 LUFS integrated, 9.6 LU loudness range, -1.46 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.41460.
- **Timing:** 12 captions, 6 scenes, and 5 cues use the verified `voice-00` alignment. ASR caption end is 44.72 seconds; measured speech ends at 44.988229 seconds.
- **Container duration:** 52.100 seconds (52.00 seconds of video plus AAC padding).
- **Size:** 7,088,889 bytes.
- **SHA-256:** `eb9dc3bf4769158a8ffcfe4f65e96b99aaa3762e20a59316e4d5822397b51b45`.
- **MD5:** `6706205372251d8856f0d2c6a18d3316`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (25 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seven earlier delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
