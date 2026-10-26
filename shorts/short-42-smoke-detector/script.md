# How a Smoke Detector Senses Smoke

**Composition:** `Short42SmokeDetector`

**Format:** 1080 × 1920, 30 fps, 43.5 seconds

**Production:** Result-first cinematic original cutaway animation with an immediate device payoff, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no corner topic or duration labels, narration-guided focus highlights, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Smoke triggers the alarm · 0.00–11.44s

> This smoke detector can sound the alarm before flames are visible.
> *0.15–4.18s*
>
> Inside this photoelectric detector, smoke reveals itself by scattering a hidden beam of light.
> *5.06–11.06s*

**Picture:** A smoke detector alarms immediately while smoke enters and a hidden optical path reveals the scattering mechanism.

### 2. Clear air keeps the sensor dark · 11.44–21.44s

> In clear air, an LED sends light across a dark chamber.
> *11.94–15.82s*
>
> The light sensor sits off to one side, so the straight beam normally misses it.
> *16.70–21.24s*

**Picture:** In clear air, an LED beam crosses a dark chamber into a light trap while the offset sensor remains dark.

### 3. Smoke redirects the light · 21.44–31.56s

> When smoke enters, tiny particles scatter some of that light toward the sensor.
> *21.94–26.48s*
>
> The sensor's signal rises, and the electronics trigger the loud alarm.
> *26.48–31.16s*

**Picture:** Animated particles redirect part of the beam into the sensor, whose rising signal activates the alarm indicator.

### 4. A useful warning for smouldering fires · 31.56–36.60s

> It is especially useful for slow, smouldering fires that produce visible smoke.
> *32.06–36.50s*

**Picture:** A smouldering, flame-free source sends visible smoke toward the alarming detector for an early-warning example.

### 5. Scattered light becomes a warning · 36.60–43.50s

> So the detector does not smell smoke; it notices smoke scattering light into its sensor.
> *37.10–42.40s*

**Picture:** The LED, smoke particles, scattered path, sensor, and alarm remain together in one operational optical chamber.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 39.56 seconds; SHA-256 `05cc1c926816f291805b4dced08f46d765a1711e5d0c999ce20dc25844d8f36c`.
- **Calmer pacing:** Playback is slowed gently to `0.921483117×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 43.5-second timeline with 0.15 seconds of initial silence. Measured paced speech ends at 42.581250 seconds. Master SHA-256: `d5436a88edbc00f02af09b5627861841f469e1fe9f25520717e534ef3567eb5c`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 97.94%.
- **Caption treatment:** 8 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no stock footage, third-party logos, or external raster artwork is reused.
- `cinematic-min` instrumental bed, ducked beneath narration and faded out during the trimmed ending; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-a-smoke-detector-senses-smoke.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,305 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.14 LUFS integrated, 2.9 LU loudness range, -1.95 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset -1 ms, within the 12 ms acceptance limit; normalized mix correlation 0.44562.
- **Timing:** 8 captions, 5 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 42.40 seconds; measured speech ends at 42.581250 seconds.
- **Container duration:** 43.600 seconds (43.50 seconds of video plus AAC padding).
- **Size:** 11,016,479 bytes.
- **SHA-256:** `016640322581d4788c63b8cb91e088eca678eac9957365c68da802e9d232651a`.
- **MD5:** `9b73681eb2b81278722f6411c6660afe`.
- **Visual review:** Passed on the actual delivered MP4 at frame zero, every narration-clause onset and midpoint, targeted late control actions where applicable, and the outro (18 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seventeen retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
