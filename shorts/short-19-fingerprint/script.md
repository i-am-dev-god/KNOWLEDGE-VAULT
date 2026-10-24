# How Fingerprint Sensors Recognize You

**Composition:** `Short19Fingerprint`

**Format:** 1080 × 1920, 30 fps, 50 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Look at the details · 0.00–11.64s

> Look at this one tiny ridge, not the whole fingerprint.
> *0.70–4.06s*
>
> Here, the ridge ends.
> *4.66–6.08s*
>
> Here, another ridge splits into two.
> *6.44–8.60s*
>
> Details like these are called minutiae.
> *9.24–11.54s*

**Picture:** A small ridge crop replaces the full-fingerprint poster. One ridge ending and one split are isolated in turn; the other ridges dim.

### 2. Map the ridges · 11.64–17.96s

> A capacitive sensor maps them by measuring tiny electrical differences at many small points.
> *12.14–17.86s*

**Picture:** The same ridge details remain while small capacitive cells beneath them produce different electrical measurements.

### 3. Record relative positions · 17.96–25.90s

> The phone records which details are present and where they sit relative to one another.
> *18.46–22.96s*
>
> That is a mathematical template, not a photograph.
> *23.36–26.40s*

**Picture:** Feature types and relative positions become a small node-and-edge template rather than a stored photograph.

### 4. Compare two templates · 25.90–38.62s

> On your next touch, the phone builds another template.
> *26.40–29.86s*
>
> It compares corresponding details, even if your finger shifted or rotated slightly.
> *30.44–34.86s*
>
> Enough matching features can unlock; too few cannot.
> *35.48–38.42s*

**Picture:** A shifted and rotated new template is compared with the stored template, then corresponding features align before pass and fail outcomes appear.

### 5. Patterns, not identical pictures · 38.62–50.00s

> Recognition means comparing patterns, not finding two identical pictures.
> *39.12–43.80s*

**Picture:** Two different feature samples remain side by side to emphasize comparable patterns, not identical pictures.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 43.44 seconds; SHA-256 `af2e68d67f20e8ff7872d74c382cd70954a1907ee333b2c8a4c6a84d85680062`.
- **Calmer pacing:** Playback is slowed gently to `0.995531178×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 50-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 43.986396 seconds. Master SHA-256: `25b9a3dcef760de7ec8b0349835e01fa226a4b71165ffd18ad0e880541c4ce7e`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 98.00%.
- **Caption treatment:** 11 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `cinematic-min` instrumental bed, ducked beneath narration and gently released after the final line; 5 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-fingerprint-sensors-recognize-you.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,500 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.02 LUFS integrated, 9.2 LU loudness range, -1.41 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset -1 ms, within the 12 ms acceptance limit; normalized mix correlation 0.54141.
- **Timing:** 11 captions, 5 scenes, and 5 cues use the verified `voice-00` alignment. ASR caption end is 43.80 seconds; measured speech ends at 43.986396 seconds.
- **Container duration:** 50.000 seconds (50.00 seconds of video plus AAC padding).
- **Size:** 6,819,274 bytes.
- **SHA-256:** `df60fa7265673e3fa63b70b058d5b75e3ee4a1bc5471e128f1e51f8e2ff8605c`.
- **MD5:** `482eab54f439932331c3608d4ba7573a`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (23 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** GPS and ANC hashes are verified unchanged, and existing Drive deliverables are left untouched.
