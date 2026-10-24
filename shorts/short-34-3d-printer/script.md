# How a 3D Printer Builds an Object

**Composition:** `Short34Printer3D`

**Format:** 1080 × 1920, 30 fps, 55 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no top title/duration header, narration-guided focus highlights, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. An object built from thin layers · 0.00–5.92s

> A 3D printer builds a solid object by depositing material one thin layer at a time.
> *0.70–6.04s*

**Picture:** A nozzle and a stack of thin layers show how the 3D printer builds a solid object.

### 2. Software plans each layer · 5.92–17.58s

> First, slicing software divides a digital 3D model into a stack of printable layers.
> *6.42–11.32s*
>
> For each layer, the slicer calculates the nozzle's path around the outer walls and through the inner structure.
> *11.88–17.46s*

**Picture:** A digital model becomes discrete layers, then one layer expands to reveal its outer-wall and inner toolpaths.

### 3. The nozzle prepares the filament · 17.58–22.04s

> The printer heats the nozzle until the plastic filament can flow through its tip.
> *18.08–21.84s*

**Picture:** Filament enters the spotlighted heater block as the nozzle temperature rises and material begins to flow.

### 4. The printer deposits and cools a layer · 22.04–32.80s

> Motors drive the nozzle along the calculated path while it extrudes a thin bead of melted plastic.
> *22.54–27.82s*
>
> The deposited plastic cools and solidifies, forming the current layer of your object.
> *27.82–32.68s*

**Picture:** The nozzle follows the exact perimeter being extruded; the deposited bead changes color as it cools.

### 5. Layers stack and bond · 32.80–42.70s

> The nozzle then rises by one layer height, or the bed lowers, and the printer repeats the process.
> *33.30–38.10s*
>
> Each new layer fuses with the previous one, gradually building a solid shape.
> *38.70–42.68s*

**Picture:** The nozzle rises by one layer height and successive layers appear and fuse into a solid shape.

### 6. From digital model to solid object · 42.70–55.00s

> So a 3D printer turns a digital model into an object through repeated extrusion, cooling, and layer bonding.
> *43.20–48.92s*

**Picture:** Slicing, path following, cooling, and layer bonding summarize the 3D-printing process.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 48.80 seconds; SHA-256 `39caaf9ca2db20dea45cce4ac3ecb272e05d36c868385d75156252e996bb8150`.
- **Calmer pacing:** Playback is kept at its natural `1.0×` tempo; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 55-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 49.090750 seconds. Master SHA-256: `aa8aeb79e50ab9fb45212a16bfc7c8a9f2f09f35e905828221d4663a2b45031a`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 97.77%.
- **Caption treatment:** 9 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `cinematic-min` instrumental bed, ducked beneath narration and gently released after the final line; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-a-3d-printer-builds-an-object.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,650 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.04 LUFS integrated, 16.7 LU loudness range, -1.96 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.39356.
- **Timing:** 9 captions, 6 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 48.92 seconds; measured speech ends at 49.090750 seconds.
- **Container duration:** 55.100 seconds (55.00 seconds of video plus AAC padding).
- **Size:** 10,227,748 bytes.
- **SHA-256:** `e0094b7f44e3a9c29a4af465658d2b7e0bf49e40f3c903b72eb67588616f726c`.
- **MD5:** `602f93e1e85d7cd723e5238c557469a3`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All twelve retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
