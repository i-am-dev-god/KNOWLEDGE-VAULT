# How a Washing Machine Spins Water Out of Clothes

**Composition:** `Short49WashingMachine`

**Format:** 1080 × 1920, 30 fps, 40 seconds

**Production:** Rebuilt result-first device animation with physically aligned contact points, connected pipes/wires, recognizable labeled cutaways, one primary action per beat, steady part highlights, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line or corner metadata, ducked music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Spinning removes water from clothes · 0.00–8.96s

> This washing machine removes water from wet clothes by spinning the drum rapidly.
> *0.15–5.00s*
>
> The clothes stay against the drum wall while water escapes.
> *5.70–8.74s*

**Picture:** A front-loading washer cutaway holds shirt-shaped clothes against the perforated drum wall while water moves into the surrounding outer tub.

### 2. The drum guides clothes while water moves outward · 8.96–18.36s

> The drum wall pushes inward on the clothes to keep them moving in a circle.
> *9.46–13.34s*
>
> Water is not held in the same way, so it can move outward through the fabric.
> *14.08–18.12s*

**Picture:** One cloth at the right drum wall anchors stable inward-force, rotation, and outward-water arrows through nearby perforations.

### 3. Perforations and a pump remove the water · 18.36–27.44s

> The drum's small holes let that water pass into the outer tub.
> *18.86–22.56s*
>
> A pump then drains the water away while the clothes stay inside the perforated drum.
> *23.04–27.94s*

**Picture:** A physically connected inner drum, perforations, outer tub, sump, drain pump, and outlet hose carry water while clothes remain inside.

### 4. A balanced load enables a stable fast spin · 27.44–33.36s

> A balanced load keeps the drum stable and lets it reach an effective spin speed.
> *27.94–33.14s*

**Picture:** Unbalanced and balanced drums compare an off-center mass marker and wobble with evenly distributed clothes and centered mass.

### 5. Rotation and drainage dry the load · 33.36–40.00s

> So rotation, perforations, and drainage remove water without squeezing the clothes.
> *33.86–38.86s*

**Picture:** Three ordered diagrams connect clothes rotating, water exiting perforations, and the connected drain pump.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 36.12 seconds; SHA-256 `6d4bc870e15eb135c31f5921fb8300a10ffe02564c4929f869f99232b34946c1`.
- **Calmer pacing:** Playback is slowed gently to `0.917107403×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 40-second timeline with 0.15 seconds of initial silence. Measured paced speech ends at 39.089229 seconds. Master SHA-256: `d6713aeb135f7a14bd6862c2d82fe4ab0003679aa18997aed86929f701c71789`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 97.52%.
- **Caption treatment:** 8 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no stock footage, third-party logos, or external raster artwork is reused.
- `cinematic-min` instrumental bed, ducked beneath narration and faded out during the trimmed ending; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-a-washing-machine-spins-water-out-of-clothes.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,200 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.00 LUFS integrated, 2.6 LU loudness range, -1.88 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.40167.
- **Timing:** 8 captions, 5 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 38.86 seconds; measured speech ends at 39.089229 seconds.
- **Container duration:** 40.000 seconds (40.00 seconds of video plus AAC padding).
- **Size:** 8,817,431 bytes.
- **SHA-256:** `1d23f2990d2d5365f77d867da3a926b354de53e5288de636be77131ff2de56e1`.
- **MD5:** `eef9097daba84a1c4b97f3518c4f1327`.
- **Visual review:** Passed on the actual delivered MP4 at frame zero, every narration-clause onset and midpoint, targeted late control actions where applicable, and the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All twenty-two retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
