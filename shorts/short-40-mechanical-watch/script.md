# How a Mechanical Watch Keeps Time

**Composition:** `Short40MechanicalWatch`

**Format:** 1080 × 1920, 30 fps, 60 seconds

**Production:** Cinematic demonstration-led original cutaway animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no corner topic or duration labels, narration-guided focus highlights, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. A watch meters stored spring energy · 0.00–10.36s

> A mechanical watch keeps time using stored spring energy instead of a battery.
> *0.70–5.32s*
>
> Its clever mechanism releases that energy in tiny, evenly timed steps.
> *5.88–10.24s*

**Picture:** A large watch cutaway combines hands, mainspring, gears, and a highlighted escapement in one detailed face.

### 2. The mainspring stores and releases energy · 10.36–21.80s

> When you wind the watch, you tighten a mainspring inside a small drum called the barrel.
> *10.86–15.58s*
>
> The mainspring slowly unwinds, turning the barrel and feeding energy into a series of gears.
> *16.12–21.54s*

**Picture:** A rotating crown winds a visible spiral mainspring inside its barrel, which then drives an adjacent gear.

### 3. The gear train carries motion to the hands · 21.80–27.26s

> This gear train carries rotation toward the watch hands while reducing the motion into useful speeds.
> *22.30–27.76s*

**Picture:** Four meshing gears counter-rotate at related speeds and carry motion upward to a working watch-hand dial.

### 4. The escapement releases discrete steps · 27.26–37.40s

> But left alone, the spring would release its energy much too quickly.
> *27.76–31.64s*
>
> The escapement meters that energy, allowing the gears to advance one small step at a time.
> *32.24–37.30s*

**Picture:** A toothed escape wheel advances in discrete steps as a jeweled pallet fork alternately locks and releases it.

### 5. The balance wheel sets a steady rhythm · 37.40–43.58s

> A balance wheel oscillates back and forth at a steady rate, telling the escapement when each step may happen.
> *37.90–43.64s*

**Picture:** A balance wheel oscillates while its spiral hairspring visibly breathes and the pallet rhythm marks tick and tock.

### 6. Regulated energy becomes accurate time · 43.58–60.00s

> So the watch combines a steady oscillator, a controlled escapement, and gears to turn spring energy into accurate time.
> *44.08–50.72s*

**Picture:** Mainspring, gear train, escapement, oscillator, and hands form a continuous regulated mechanical-timekeeping chain.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 48.28 seconds; SHA-256 `74d96db2ce58acd251cfbd49acec75a2e66cd567186794da50614c297e529fd7`.
- **Calmer pacing:** Playback is slowed gently to `0.955779490×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 60-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 50.985208 seconds. Master SHA-256: `ea5824c7210e274d52b4ac1b1db232c17c1b2d622832df78d07733936ebb8157`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 96.38%.
- **Caption treatment:** 9 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and gently released after the final line; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-a-mechanical-watch-keeps-time.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,800 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.06 LUFS integrated, 8.6 LU loudness range, -1.73 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset -1 ms, within the 12 ms acceptance limit; normalized mix correlation 0.45622.
- **Timing:** 9 captions, 6 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 50.72 seconds; measured speech ends at 50.985208 seconds.
- **Container duration:** 60.100 seconds (60.00 seconds of video plus AAC padding).
- **Size:** 22,407,625 bytes.
- **SHA-256:** `887d082a0d79fea3abf7a409cc383f3cfd19764ed521af66515fdf1ea5b0c143`.
- **MD5:** `dc0d023bc444a8a718ed2efcc3043abc`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seventeen retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
