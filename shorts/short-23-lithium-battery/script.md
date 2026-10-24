# How a Lithium Battery Powers Your Phone

**Composition:** `Short23LithiumBattery`

**Format:** 1080 × 1920, 30 fps, 52 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Chemical energy, not an electricity tank · 0.00–9.14s

> This battery is not a tank full of electricity.
> *0.70–3.66s*
>
> It stores chemical energy by moving lithium ions between two materials.
> *4.44–8.86s*

**Picture:** A cutaway lithium-ion cell shows two electrodes, a separator, and a path to a phone.

### 2. Two paths during discharge · 9.14–22.72s

> During discharge, lithium ions leave the negative electrode.
> *9.64–13.34s*
>
> They travel through the electrolyte toward the positive electrode.
> *14.00–17.26s*
>
> At the same time, electrons flow through the outside circuit, powering the phone.
> *17.86–22.60s*

**Picture:** Lithium ions move internally from the negative to the positive electrode while electrons take the external phone circuit. The separator blocks electron crossing.

### 3. Separate the electrodes, guide the ions · 22.72–31.18s

> The separator lets ions pass, but keeps the electrodes from touching.
> *23.22–27.42s*
>
> The electrons must take the external path.
> *27.42–30.96s*

**Picture:** The thin separator enlarges. Ion paths pass through while an electron route is explicitly stopped inside the cell.

### 4. Use external energy to reverse the shuttle · 31.18–38.62s

> Plug in the charger, and the energy pushes ions and electrons back.
> *31.68–35.60s*
>
> The battery is ready to discharge again.
> *36.20–38.34s*

**Picture:** A charger reverses both flows: ions move toward the negative electrode and electrons move through the external circuit in the opposite direction.

### 5. Ions inside, electrons outside · 38.62–52.00s

> A battery controls this shuttle: ions inside, electrons outside.
> *39.12–43.72s*

**Picture:** The internal ion route, external electron route, and separator remain together as the complete energy-transfer summary.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 36.88 seconds; SHA-256 `5e8e00c40768688c3bc71a8a619ad91bfca7e49acdbad1bca95f786b056b2d64`.
- **Calmer pacing:** Playback is slowed gently to `0.841617590×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 52-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 43.982708 seconds. Master SHA-256: `56ecba23fecf30b0cf3b2c8868799f518e585acf4ea01e15acd6be5c66fd4f68`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 96.23%.
- **Caption treatment:** 10 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and gently released after the final line; 5 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-a-lithium-battery-powers-your-phone.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,560 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.26 LUFS integrated, 10.1 LU loudness range, -1.39 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset -1 ms, within the 12 ms acceptance limit; normalized mix correlation 0.44088.
- **Timing:** 10 captions, 5 scenes, and 5 cues use the verified `voice-00` alignment. ASR caption end is 43.72 seconds; measured speech ends at 43.982708 seconds.
- **Container duration:** 52.100 seconds (52.00 seconds of video plus AAC padding).
- **Size:** 9,201,862 bytes.
- **SHA-256:** `289304d405605d7c181a6d628a4e1b11c0b3ebf407571d5626ca73131f0cb8c2`.
- **MD5:** `888bf4bfe54db886c6d7c72530a2cefd`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (21 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seven earlier delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
