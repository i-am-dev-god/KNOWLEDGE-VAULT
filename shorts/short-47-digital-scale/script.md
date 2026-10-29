# How a Digital Scale Measures Weight

**Composition:** `Short47DigitalScale`

**Format:** 1080 × 1920, 30 fps, 40.5 seconds

**Production:** Result-first cinematic original cutaway animation with an immediate device payoff, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no corner topic or duration labels, narration-guided focus highlights, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Weight becomes a tiny mechanical bend · 0.00–10.56s

> Place an object on this digital scale, and its weight appears as a number.
> *0.15–4.38s*
>
> Inside, the platform bends a tiny metal element by an extremely small amount.
> *5.10–10.56s*

**Picture:** An object loads a digital scale, the reading appears, and a cutaway reveals the hidden metal element bending.

### 2. The load cell deforms under force · 10.56–20.62s

> That element is a load cell, built to deform predictably under force.
> *11.06–15.44s*
>
> Thin strain gauges attached to it stretch or compress along with the metal.
> *16.18–20.60s*

**Picture:** A magnified load cell deflects under force while attached strain gauges stretch and compress with it.

### 3. Resistance becomes an electrical reading · 20.62–30.34s

> Their electrical resistance changes, producing a small voltage signal.
> *21.12–24.90s*
>
> The scale's electronics amplify and convert that signal into a digital reading.
> *25.50–29.98s*

**Picture:** A resistance element feeds an amplifier and digitizer before a numerical reading appears.

### 4. Calibration and tare make the reading useful · 30.34–35.26s

> Calibration relates the reading to weight units, while tare subtracts the container.
> *30.84–35.22s*

**Picture:** A known calibration weight and a container-side tare demonstration show units and subtraction directly.

### 5. Mechanical strain becomes a number · 35.26–40.50s

> So a tiny mechanical bend becomes the number you see on the scale.
> *35.76–39.44s*

**Picture:** A bent beam, changing resistance, and a digital value form one measurement chain.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 36.56 seconds; SHA-256 `ae7aa7dbfeb923647f8855517d49045b2877ca2cab9b43fcfef1f98864a5e55b`.
- **Calmer pacing:** Playback is slowed gently to `0.916207224×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 40.5-second timeline with 0.15 seconds of initial silence. Measured paced speech ends at 39.585104 seconds. Master SHA-256: `f52b28d376d9d8bdf0e4566b1854dd9547b8cf3d0976caa11c78b415745d8c11`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 97.56%.
- **Caption treatment:** 8 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no stock footage, third-party logos, or external raster artwork is reused.
- `cinematic-min` instrumental bed, ducked beneath narration and faded out during the trimmed ending; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-a-digital-scale-measures-weight.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,215 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.08 LUFS integrated, 2.5 LU loudness range, -1.99 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.38738.
- **Timing:** 8 captions, 5 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 39.44 seconds; measured speech ends at 39.585104 seconds.
- **Container duration:** 40.600 seconds (40.50 seconds of video plus AAC padding).
- **Size:** 7,339,399 bytes.
- **SHA-256:** `5ffb8e8fbbec290c026d5db1d30725e11bf4bee407321fde01011df1fa586606`.
- **MD5:** `62576e77a9573b79a84cca307a61457c`.
- **Visual review:** Passed on the actual delivered MP4 at frame zero, every narration-clause onset and midpoint, targeted late control actions where applicable, and the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All twenty-two retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
