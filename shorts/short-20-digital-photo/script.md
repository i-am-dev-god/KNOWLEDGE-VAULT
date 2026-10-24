# How a Camera Turns Light Into a Photo

**Composition:** `Short20DigitalPhoto`

**Format:** 1080 × 1920, 30 fps, 50 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Follow one photosite · 0.00–9.44s

> Follow just one photosite on the sensor.
> *0.70–3.38s*
>
> Light enters it and becomes an electrical signal.
> *4.02–6.82s*
>
> More light makes a larger signal.
> *7.40–9.28s*

**Picture:** Light enters one photosite and its numerical electrical signal grows when the light increases.

### 2. Add a color filter · 9.44–19.30s

> But that signal is only a brightness measurement.
> *9.94–12.54s*
>
> This site's filter passes mostly green light.
> *13.28–16.18s*
>
> So it records green brightness at this location.
> *16.56–19.06s*

**Picture:** A neutral brightness value appears first. The green filter is then added, red and blue are blocked, and the site records green brightness.

### 3. Measure neighboring colors · 19.30–23.22s

> Neighboring sites record red or blue through their filters.
> *19.80–22.88s*

**Picture:** A small Bayer mosaic keeps the green center in focus while red and blue neighbors reveal their own single measurements.

### 4. Estimate missing colors · 23.22–31.24s

> The processor compares neighbors to estimate each site's missing color values.
> *23.72–28.54s*
>
> This step is called demosaicing.
> *28.54–30.92s*

**Picture:** Neighboring measurements feed the center site's missing red and blue estimates; the completed step is labeled demosaicing.

### 5. Build one colored pixel · 31.24–40.58s

> Now red, green, and blue values describe one colored pixel.
> *31.74–35.68s*
>
> Repeat that millions of times, then reduce noise and adjust brightness.
> *36.30–40.26s*

**Picture:** Red, green, and blue values form one colored pixel. Repetition leads to a landscape while visible noise clears and the image is adjusted.

### 6. Repeat millions of times · 40.58–50.00s

> Many tiny measurements become the photograph you see.
> *41.08–43.90s*

**Picture:** The finished original landscape photograph holds with the chain from tiny measurements to colored pixels to a photograph.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 38.44 seconds; SHA-256 `b626191a5d213a10390a637111a0f941b3ff30336bf45931f2f6819401e37325`.
- **Calmer pacing:** Playback is slowed gently to `0.877053503×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 50-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 43.996417 seconds. Master SHA-256: `d8da27e2f3eecbc56695850f40b4dbc6fbbbd5f0e9676304ac079d04d41d307d`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 94.84%.
- **Caption treatment:** 12 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and gently released after the final line; 5 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. The closing landscape is an original generated asset stored at `media/assets/digital-photo-landscape.png`.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-a-camera-turns-light-into-a-photo.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,500 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.14 LUFS integrated, 10.5 LU loudness range, -1.48 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.35150.
- **Timing:** 12 captions, 6 scenes, and 5 cues use the verified `voice-00` alignment. ASR caption end is 43.90 seconds; measured speech ends at 43.996417 seconds.
- **Container duration:** 50.000 seconds (50.00 seconds of video plus AAC padding).
- **Size:** 7,381,699 bytes.
- **SHA-256:** `a1703e903858641e9b1d2a1b7e218f93a6406382b3b2ade74a38c054f4552e51`.
- **MD5:** `511c249222f28984f7a02b53ccb06abb`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (25 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** GPS and ANC hashes are verified unchanged, and existing Drive deliverables are left untouched.
