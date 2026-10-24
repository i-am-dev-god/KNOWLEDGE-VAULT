# How Fiber Optics Carry Internet Data

**Composition:** `Short36FiberOptics`

**Format:** 1080 × 1920, 30 fps, 56 seconds

**Production:** Cinematic demonstration-led original cutaway animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no corner topic or duration labels, narration-guided focus highlights, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Internet data becomes light · 0.00–11.98s

> A fiber-optic cable carries internet data as flashes of light inside a strand of glass.
> *0.70–6.08s*
>
> Instead of sending electrical pulses through copper, it guides light from one end to the other.
> *6.74–11.82s*

**Picture:** A layered fiber connector pair carries animated light pulses, while a copper conductor recedes into a dim comparison.

### 2. The transmitter encodes light pulses · 11.98–18.16s

> At the cable's transmitter, a laser or LED turns digital data into rapid pulses of light.
> *12.48–18.10s*

**Picture:** Digital bit blocks and an electrical waveform drive a glowing laser/LED, which launches optical pulses into the fiber.

### 3. Light enters the glass core · 18.16–23.16s

> Those pulses enter the cable's narrow core, the central path reserved for the light.
> *18.66–23.10s*

**Picture:** A large jacket–cladding–core cutaway isolates the central glass pathway as incoming light converges into it.

### 4. The fiber confines and guides light · 23.16–34.56s

> The core is wrapped in cladding, which lets light reflect at the boundary instead of escaping.
> *23.66–28.26s*
>
> Each pulse follows the fiber by repeated total internal reflection, even when the cable bends.
> *28.26–34.24s*

**Picture:** A bending fiber carries light above a magnified zigzag reflection demonstration at the core–cladding boundary.

### 5. The receiver restores digital data · 34.56–44.66s

> At the destination, a photodetector senses the arriving pattern of light and darkness.
> *35.06–39.46s*
>
> The receiver converts that pattern back into electrical data for your computer or router.
> *40.26–44.54s*

**Picture:** Arriving flashes strike a photodetector, then become an electrical waveform, restored bit blocks, and router data.

### 6. Coded light crosses the fiber · 44.66–56.00s

> So fiber-optic internet moves information by guiding coded light through glass, then decoding it at the far end.
> *45.16–50.90s*

**Picture:** One continuous animated link connects digital input, optical encoding, guided glass transmission, detection, and decoded output.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 49.60 seconds; SHA-256 `4c6ebc265e364bad166e0b14d11f84fa77d4128ee2d52221fd505c6c25a6cd79`.
- **Calmer pacing:** Playback is slowed gently to `0.969642147×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 56-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 50.994271 seconds. Master SHA-256: `b13b0adcd3d00bb16d0fd129a8fd4d5b29e1813adb7811089e2e2f2cbbb1747d`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 96.27%.
- **Caption treatment:** 9 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and gently released after the final line; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-fiber-optics-carry-internet-data.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,680 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.15 LUFS integrated, 3.2 LU loudness range, -1.82 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.37626.
- **Timing:** 9 captions, 6 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 50.90 seconds; measured speech ends at 50.994271 seconds.
- **Container duration:** 56.000 seconds (56.00 seconds of video plus AAC padding).
- **Size:** 11,565,281 bytes.
- **SHA-256:** `2a78d6d018d6b7c5bbc03a8cfd55a9fd589e31964d81b1f17ca6eab423b513a5`.
- **MD5:** `1f29691d4b727c1c669f2266b1db25e9`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seventeen retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
