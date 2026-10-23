# How GPS Finds You

**Composition:** `Short14GpsExplainer`

**Format:** 1080 × 1920, 30 fps, 60 seconds

**Production:** Original everyday-technology explainer, original vector animation, VoiceStudio Indian male narration, exact segment-timed captions, tech music and synchronized sound design

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
> Three help solve your position. A fourth corrects your phone's clock.
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

## VoiceStudio production record

- **Application source:** `debpalash/VoiceStudio`, local `SherpaOnnxBackend` path.
- **Engine:** `sherpa-onnx` VITS/Piper inference on CPU.
- **Voice model:** `en_GB-vctk-medium`, 22.05 kHz, 109 speakers.
- **Narrator:** VCTK **p251**, model speaker ID **92**; VCTK records identify this speaker as a 26-year-old Indian male. The alternate Indian male p376 / speaker 26 was also tested.
- **Selection QA:** p251 produced a male fundamental-frequency distribution with median approximately 129.7 Hz and healthy short-test RMS; p281 / speaker 13 was rejected after its synthesized output did not satisfy the male-voice requirement.
- **Model source mirror:** `tylerjoh86/REJI`, commit `2d98055b2c06751902f8f4e93e898ac80888a715`, `Voices/en_GB-vctk-medium.onnx` and JSON configuration. Original model SHA-256: `4e9fc85ab9009385319fc6bae7f55577f8a2d7ee77fd9159a5500eb6531f41e6`.
- **Compatibility:** Sherpa's official Piper metadata script added model metadata and generated `tokens.txt`; model-local eSpeak-NG data is used by VoiceStudio.
- **Synthesis:** 16 separate caption clauses at speed `0.88`. Raw narration is trimmed and level-matched without voice conversion, pitch shifting, or accent transformation.
- **Synchronization:** Every caption is a complete synthesized audio segment. Caption and scene timings come from the actual measured segment durations and placement—no estimated word-level alignment is used.
- **Master narration:** 48 kHz mono PCM WAV in a 60-second timeline.

## Sound and accessibility

- Original SVG/CSS animation; no stock footage or copied sample composition.
- `tech-pulse` instrumental bed, ducked beneath narration.
- Library clock, scan, interface, impact, whoosh, and shimmer effects are triggered from measured narration/scene cues.
- Captions use complete measured clauses inside the vertical safe area.
- Final QA covers full decode, 1,800 frames, stream formats, duration, integrated loudness, true peak, silence, and visual contact sheets.

## Final master and QA

- **Deliverable:** `output/how-gps-finds-you.mp4` (ignored by Git, consistent with the repository's other rendered finals).
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,800 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. A final +4.5 dB playback master was applied to the complete Remotion mix while copying the validated video stream without re-encoding it.
- **Measured audio:** −17.4 LUFS integrated, 6.1 LU loudness range, −1.1 dBFS true peak. No silence of at least two seconds below −45 dB was detected.
- **Container duration:** 60.05 seconds (60.00 seconds of video plus AAC padding).
- **Size:** 10,914,253 bytes.
- **SHA-256:** `5eacc8331d6452cb48a67380a646bce907e108812c50f5f8dd1190b15603083a`.
- **Synchronization:** 16 caption segments and 15 sound cues are driven by measured VoiceStudio timings; no estimated word alignment is used.
- **Visual review:** Final-MP4 contact sheet plus isolated scene and transition frames checked. The closing recap/title transition was corrected and rerendered to remove overlapping text.
