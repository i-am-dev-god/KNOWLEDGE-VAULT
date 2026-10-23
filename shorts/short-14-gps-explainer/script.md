# How GPS Finds You

**Composition:** `Short14GpsExplainer`

**Format:** 1080 × 1920, 30 fps, 60 seconds

**Production:** Original everyday-technology explainer and vector animation, restrained Chatterbox-Nano Indian male narration, exact segment-timed captions, tech music and synchronized sound design

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

## Chatterbox production record

- **Application source:** `resemble-ai/chatterbox`, commit `5de7a54aa4e5e2baadb0182dde554908b48b85c2`.
- **Engine:** Official `ChatterboxTurboTTS` inference with `nano=True`, running on CPU.
- **Voice model:** `ResembleAI/chatterbox-nano`; the required voice encoder, Nano T3 checkpoint, mean-flow speech decoder and built-in conditioning files were checksum-verified. Individual SHA-256 values are recorded in `beats.json`.
- **Narrator:** Restrained Indian English male, cloned from a 6.212-second dry reference retained from the earlier VCTK p251 narration. The reference is used only for Chatterbox conditioning; **all 16 replacement speech segments are synthesized by Chatterbox-Nano**.
- **Delivery settings:** temperature `0.7`, top-p `0.9`, top-k `500`, repetition penalty `1.2`, exaggeration `0.0`, CFG weight `0.0`, and deterministic per-segment seeds `1401–1416`. No dramatic speech tags are used.
- **Clarity revision:** `Three satellites help find your position` replaces the less clear original phrase. Independent `faster-whisper small.en` transcription of the exact 60-second narration master matches the complete intended script after normalization, with 97.3% mean word confidence. See `transcription-qa.json`.
- **Synthesis and pacing:** 24 kHz Chatterbox output with Resemble's Perth watermark, trimmed and level-matched, resampled to 48 kHz, then uniformly paced to `1.12×` with FFmpeg's pitch-preserving WSOLA `atempo`. No pitch shifting or accent transformation is applied.
- **Synchronization:** Every caption is a complete synthesized audio segment. Caption, scene and SFX timings come from actual measured segment durations and placement—no estimated word-level alignment is used. The closing title transition and music release are derived from the measured final-line end.
- **Master narration:** 48 kHz mono PCM WAV in a 60-second timeline; final speech ends at 52.849 seconds.

## Sound and accessibility

- Original SVG/CSS animation; no stock footage or copied sample composition.
- `tech-pulse` instrumental bed, ducked beneath narration.
- Library clock, scan, interface, impact, whoosh, and shimmer effects are triggered from measured narration/scene cues.
- Captions use complete measured clauses inside the vertical safe area.
- Final QA covers full decode, 1,800 frames, stream formats, duration, integrated loudness, true peak, silence, and visual contact sheets.

## Final master and QA

- **Deliverable:** `output/how-gps-finds-you.mp4` (ignored by Git, consistent with the repository's other rendered finals).
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,800 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. A final +4.62 dB playback gain and zero-makeup, latency-compensated lookahead limiter were applied to the complete Remotion mix while copying the validated video stream without re-encoding it.
- **Measured audio:** −17.4 LUFS integrated, 9.9 LU loudness range, −1.1 dBFS true peak. No silence of at least two seconds below −45 dB was detected.
- **Container duration:** 60.05 seconds (60.00 seconds of video plus AAC padding).
- **Size:** 11,031,960 bytes.
- **SHA-256:** `d20cb101cf51307362881fa58eb2f5c6e58397b32e7d8a304281934849009c40`.
- **MD5:** `cfb1e567eef2c96e1247de49b3937a78`.
- **Synchronization:** 16 caption segments and 15 sound cues are driven by measured Chatterbox timings; no estimated word alignment is used.
- **Visual review:** Actual-MP4 contact sheet plus isolated closing-title frame checked. The closing recap and title remain overlap-free, and TypeScript validation passes with `npx tsc --noEmit`.
- **Drive replacement:** Uploaded to **COMEBACK** as file `1UxCwWWUhNJkgnp1SO9qn1C5xvYxya9Dm`; Drive's reported size and MD5 match the validated local master. [Open the Chatterbox version](https://drive.google.com/file/d/1UxCwWWUhNJkgnp1SO9qn1C5xvYxya9Dm/view?usp=drivesdk). The earlier VoiceStudio file `132OmQMuxxeABKF45VqO6dwsLQfO0cKFr` was moved to trash only after that verification.
