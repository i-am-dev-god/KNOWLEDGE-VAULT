# How an Electric Motor Spins

**Composition:** `Short37ElectricMotor`

**Format:** 1080 × 1920, 30 fps, 58 seconds

**Production:** Cinematic demonstration-led original cutaway animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no corner topic or duration labels, narration-guided focus highlights, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Electricity becomes mechanical rotation · 0.00–12.76s

> An electric motor turns electrical energy into rotation to power fans, tools, and machines.
> *0.70–6.66s*
>
> Inside the motor, the essential interaction is between electric current and a magnetic field.
> *7.40–12.50s*

**Picture:** A detailed brushed DC motor cutaway exposes fixed magnets, a rotating coil, housing fasteners, and the output shaft.

### 2. Fixed magnets establish a field · 12.76–17.56s

> Two fixed magnets create a magnetic field across the motor's central space.
> *13.26–17.44s*

**Picture:** North and south stator magnets establish multiple animated field lines across the central coil space.

### 3. Current flows through the moving coil · 17.56–22.76s

> A wire coil sits in that field, and the motor sends electric current through the coil.
> *18.06–22.54s*

**Picture:** The stator recedes while the energized rotor coil, current arrows, DC supply, and feed path take focus.

### 4. Opposite forces turn the shaft · 22.76–32.38s

> Current in the coil produces opposite forces on its two sides, creating a turning force called torque.
> *23.26–28.74s*
>
> Those forces rotate the coil and the shaft attached to it.
> *29.38–32.56s*

**Picture:** Opposite force arrows act on the coil sides; the coil and shaft rotate under a visible turning moment.

### 5. The commutator reverses current · 32.38–42.34s

> But the coil would stall if the current stayed in the same direction.
> *32.88–35.90s*
>
> A split-ring commutator reverses the current every half turn, keeping the torque in the same rotational direction.
> *36.58–42.48s*

**Picture:** A macro split-ring commutator rotates between stationary brushes and reverses current at the half-turn.

### 6. Repeated switching sustains rotation · 42.34–58.00s

> So the motor keeps spinning by repeatedly switching the coil's current so magnetic forces continue turning its shaft.
> *42.84–48.80s*

**Picture:** The complete motor runs continuously with repeating current direction, commutation, magnetic force, and shaft rotation.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 46.68 seconds; SHA-256 `c227914db487cf45af01201a3b257c5e072a088ba7337389391936da9369d995`.
- **Calmer pacing:** Playback is slowed gently to `0.958410110×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 58-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 48.989750 seconds. Master SHA-256: `bcfd0941448baa8824a649be0bf9d27d274e27cb4771a372160360f210a6f8c4`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 97.58%.
- **Caption treatment:** 9 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `cinematic-min` instrumental bed, ducked beneath narration and gently released after the final line; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-an-electric-motor-spins.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,740 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.05 LUFS integrated, 13.9 LU loudness range, -1.84 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset -1 ms, within the 12 ms acceptance limit; normalized mix correlation 0.42082.
- **Timing:** 9 captions, 6 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 48.80 seconds; measured speech ends at 48.989750 seconds.
- **Container duration:** 58.000 seconds (58.00 seconds of video plus AAC padding).
- **Size:** 14,667,469 bytes.
- **SHA-256:** `61219ffd5b9c0fc149741eee92dc948c7f9dbaa402a7f3665e93f344e1e9e910`.
- **MD5:** `d25bf3e8ec2d6ab758678644e5b5d2e9`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seventeen retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
