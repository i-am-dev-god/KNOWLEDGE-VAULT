# How a Camera Turns Light Into a Photo

**Composition:** `Short20DigitalPhoto`

**Format:** 1080 × 1920, 30 fps, 50 seconds

**Production:** Original code-drawn vector animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked ambient music, and restrained sound design

## Narration and storyboard

### 1. Not a finished photo
> A camera sensor does not see a finished photograph.
>
> It measures light with millions of tiny photosites.

**Picture:** An original vector landscape is paired with a small photosite grid, separating the finished image from the sensor's individual measurements.

### 2. Light becomes signal
> Each photosite turns incoming light into an electrical signal.

**Picture:** Incoming photons reach one photosite and produce an electrical waveform labeled as a measured light-intensity value.

### 3. One color per site
> Most sensors place a color filter above each site.
>
> The filters follow a mosaic of red, green, and blue.
>
> So each site records only one color plus brightness.

**Picture:** A Bayer `RG/GB` mosaic alternates red, green, and blue filters. The diagram clarifies that each site measures one color's brightness.

### 4. Fill in the colors
> The processor compares neighboring sites to estimate the missing colors.
>
> This step is called demosaicing.
>
> It also adjusts brightness and reduces noise before saving the image.

**Picture:** Neighboring mosaic measurements feed a color processor and resolve into the original vector photograph; demosaicing, brightness adjustment, and noise reduction are labeled in sequence.

### 5. Measurements become an image
> A photo begins as many tiny light measurements, which the processor weaves into the colors you see.

**Picture:** `MEASURE → DEMOSAIC → IMAGE` resolves into `LIGHT, WOVEN INTO COLOR.` with a proper calm outro and no engagement CTA.

## Selected-voice production record

- **Narrator:** The user-selected built-in `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party voice cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 43.48 seconds; SHA-256 `8f3c7496be8f8cb2b73712df564d282bb1edee81de253a3783fa3e09de7b9069`.
- **Natural pacing:** The selected take already fit the calm timeline, so it remains at its original `1.0×` tempo and is never sped up. The video is 50 seconds rather than compressing the narration into 45 seconds.
- **Master narration:** 48 kHz mono PCM WAV in a 50-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 43.737771 seconds. Master SHA-256: `d397c371ecc9fb7f5b787a98f1f9dc07f76d04890e11ceac9aa5bc01142bc331`.
- **Synchronization:** Caption, scene, and sound-cue timings are generated only after `faster-whisper medium.en` word timestamps match the complete normalized script. Mean raw ASR word confidence is 98.31%.
- **Caption treatment:** Ten complete static clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation beneath the subtitles.

## Sound and accessibility

- Original SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `ambient-pad` instrumental bed with no drums or driving pulse, ducked beneath narration and gently released after the final line.
- Six quiet library cues support only meaningful transitions and reveals; their existing catalog provenance is retained.
- Final QA covers full decode, all 1,500 frames, stream formats, duration, integrated loudness, true peak, silence, delivered-audio/narration offset, and actual-MP4 visual review.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-a-camera-turns-light-into-a-photo.mp4`. The production copy at `output/how-a-camera-turns-light-into-a-photo.mp4` is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,500 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization (`I=-16`, `TP=-1.5`, `LRA=11`) while copying the H.264 stream without re-encoding it.
- **Measured audio:** −16.31 LUFS integrated, 8.5 LU loudness range, −1.37 dBFS true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Cross-correlation against the exact narration WAV measured 1 ms early, within the 12 ms acceptance limit; normalized mix correlation 0.51658.
- **Container duration:** 50.00 seconds.
- **Size:** 7,732,916 bytes.
- **SHA-256:** `57950e681921955876f9b551daec52299b74f13741d4ea92800dc71cf37243a9`.
- **MD5:** `08a9a4645fc20e04259abac3c1a28087`.
- **Timing:** Ten caption segments, five scenes, and six sound cues use the verified `voice-00` alignment. ASR caption end is 43.66 seconds; measured speech ends at 43.737771 seconds.
- **Visual review:** Every caption midpoint and the final outro were extracted from the delivered MP4 and reviewed. Captions are legible, diagrams remain inside the safe area, no moving caption line is present, and TypeScript validation passes with `npx tsc --noEmit`.
- **Existing versions:** The GPS and ANC videos in `RESULT/` and all existing Drive deliverables remain unchanged.
