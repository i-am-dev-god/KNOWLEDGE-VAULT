# How GPS Finds You

**Composition:** `Short14GpsExplainer`

**Format:** 1080 × 1920, 30 fps, 60 seconds

**Production:** Existing everyday-technology vector animation, one continuous user-selected `voice-00` narration take, ASR-aligned captions, ducked tech music, and synchronized sound design

## Narration and storyboard

### 1. No signal. Still found.
> Your phone can find you without mobile signal or internet.
>
> The map may need data. GPS itself does not.

**Picture:** A phone and location pin remain illuminated while mobile-data and Wi-Fi symbols switch off. A satellite answers from above. The map-vs-GPS distinction is explicit.

### 2. Clocks in orbit
> GPS satellites orbit about twenty thousand kilometres above Earth.
>
> Each one carries an extremely accurate atomic clock.

**Picture:** Earth, orbital paths, a detailed satellite and an altitude bracket resolve into a close-up of an atomic-clock chip.

### 3. A timestamp from space
> Every satellite broadcasts its position,
>
> and the exact time its signal was sent.

**Picture:** Two labelled data packets—`POSITION` and `TIME SENT`—ride radio-wave arcs from a satellite toward the phone.

### 4. Time becomes distance
> Your phone measures how long that signal took to arrive.
>
> The timing must be astonishingly precise.
>
> Because radio waves travel at the speed of light, delay becomes distance.

**Picture:** A signal timeline, stopwatch and precision counter resolve into the equation `DISTANCE = TIME × SPEED OF LIGHT`.

### 5. Why four satellites?
> One satellite gives a distance, not a fix.
>
> Three satellites help find your position. A fourth corrects your phone's clock.
>
> Without that correction, the position would be wrong.

**Picture:** One distance sphere becomes a four-satellite diagram. Three cyan channels are labelled `POSITION`; the amber fourth channel is labelled `CLOCK CORRECTION`.

### 6. Trilateration
> Imagine invisible spheres around the satellites.
>
> Where the distances meet is your location. That's trilateration.

**Picture:** Expanding three-dimensional wireframe spheres converge on one glowing receiver point. The title distinguishes trilateration from angle-based triangulation.

### 7. A cosmic stopwatch
> So GPS is a cosmic stopwatch.
>
> Satellites send the time. Your phone turns tiny delays into a dot on the map.

**Picture:** The three-step recap `TIME → DISTANCE → POSITION` returns to the phone map and the final title `HOW GPS FINDS YOU`.

## Selected-voice production record

- **Narrator:** The user-selected built-in `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section-by-section voice switching, third-party voice cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 56.24 seconds; SHA-256 `aa6f9f521a5793ae5f339c3ac4bc9a023c4e1a629ff6178a39d5774761155311`.
- **Synthesis and pacing:** Edge-trimmed and resampled to 48 kHz, then uniformly paced to `1.079588577×` with FFmpeg's pitch-preserving WSOLA `atempo`. The same rate is used throughout; no pitch shifting or accent transformation is applied.
- **Master narration:** 48 kHz mono PCM WAV in a 60-second timeline with 0.65 seconds of initial silence. Paced speech ends at 52.292563 seconds. Master SHA-256: `df3abe50f290f5201a8d3b9f476b6c38dbf7bbed5bc0a37ab040d20bf3bb346f`.
- **Script verification:** Independent `faster-whisper medium.en` transcription of the exact narration master matches the complete intended script after harmless spelling/number normalization, including `speed of light`, with 96.63% mean word confidence. See `transcription-voice-00.json`.
- **Synchronization:** Caption boundaries come from verified ASR word timestamps, with the first onset clamped to the measured 0.65-second narration start. Scene changes and all 15 SFX cues are derived from the aligned narration. The closing title transition and music release are derived from the final-line end.

## Sound and accessibility

- Existing SVG/CSS animation preserved; no stock footage or replacement visual concept introduced.
- `tech-pulse` instrumental bed, ducked beneath narration and released after the final line.
- Library clock, scan, interface, impact, whoosh, and shimmer effects are triggered from narration-aligned cues.
- Captions use complete aligned clauses inside the vertical safe area.
- Final QA covers full decode, 1,800 frames, stream formats, duration, integrated loudness, true peak, silence, and visual contact sheets.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-gps-finds-you.mp4`. The production copy at `output/how-gps-finds-you.mp4` is byte-identical and remains ignored by Git, consistent with the repository's other rendered finals.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,800 decoded frames; full-stream decode of the finished MP4 passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final audio mastering used a 70 Hz high-pass, zero-makeup limiter, and loudness normalization (`I=-16`, `TP=-1.5`, `LRA=11`) while copying the validated H.264 stream without re-encoding it.
- **Measured audio:** −16.5 LUFS integrated, 4.9 LU loudness range, −1.1 dBFS true peak. No silence of at least two seconds below −45 dB was detected.
- **Container duration:** 60.10 seconds (60.00 seconds of video plus AAC padding).
- **Size:** 10,286,691 bytes.
- **SHA-256:** `3c50813629ad228ae8951a1586b42d943a150112fc95976819d83a9e4e527a6c`.
- **MD5:** `c6354a20f58d664cd959fe16bc40ba10`.
- **Synchronization:** 16 caption segments and 15 sound cues are driven by the verified `voice-00` alignment.
- **Visual review:** All 16 caption midpoints from the finished MP4 plus an isolated closing-title frame checked. The closing recap and title remain overlap-free, and TypeScript validation passes with `npx tsc --noEmit`.
- **Existing Drive version:** Left unchanged; this delivery is through GitHub in `RESULT/`.
