# How a Transformer Changes Voltage

**Composition:** `Short38Transformer`

**Format:** 1080 × 1920, 30 fps, 52 seconds

**Production:** Cinematic demonstration-led original cutaway animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no corner topic or duration labels, narration-guided focus highlights, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Two coils exchange energy · 0.00–10.68s

> A transformer changes AC voltage for the power grid and your home.
> *0.70–5.16s*
>
> It transfers electrical energy between two coils without a direct wire connection.
> *5.74–10.44s*

**Picture:** A laminated core and two detailed copper windings reveal that energy crosses without a direct wire connection.

### 2. AC drives the primary winding · 10.68–16.42s

> Alternating current enters the primary coil, so its magnetic field continually changes.
> *11.18–16.26s*

**Picture:** The primary winding and AC source take focus as an animated alternating waveform drives the changing current.

### 3. The core carries changing magnetic flux · 16.42–25.00s

> The iron core guides this changing magnetic field around a closed loop.
> *16.92–21.00s*
>
> The field then passes through the secondary coil on the other side.
> *21.66–25.00s*

**Picture:** Alternating directional flux traces the actual closed iron-core path and then links the secondary winding.

### 4. Changing flux induces secondary voltage · 25.00–30.58s

> Because the field keeps changing, it induces an alternating voltage in this second coil.
> *25.50–30.44s*

**Picture:** The secondary winding and its induced AC output waveform brighten while the primary recedes.

### 5. The turns ratio sets the voltage · 30.58–38.24s

> The number of wire turns controls the result.
> *31.08–33.58s*
>
> More secondary turns increase voltage; fewer secondary turns decrease it.
> *34.10–38.40s*

**Picture:** Side-by-side step-up and step-down cutaways expose different primary and secondary turn counts and voltage results.

### 6. Magnetic induction changes voltage · 38.24–52.00s

> So the transformer uses magnetic induction to change voltage while transferring power between its coils.
> *38.74–44.76s*

**Picture:** Primary AC, guided core flux, secondary induction, and the turns ratio form one animated transformer.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 38.00 seconds; SHA-256 `42aae617e4100161c430826d959c065733b114f7139c600173acc02080faa0ce`.
- **Calmer pacing:** Playback is slowed gently to `0.849188299×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 52-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 44.983271 seconds. Master SHA-256: `ae7f8ddc714939f6c6f42bff0934ddcc3018914d123dadc27d3544cf20ad776f`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 96.38%.
- **Caption treatment:** 9 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and gently released after the final line; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-a-transformer-changes-voltage.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,560 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.27 LUFS integrated, 9.3 LU loudness range, -1.71 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.32273.
- **Timing:** 9 captions, 6 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 44.76 seconds; measured speech ends at 44.983271 seconds.
- **Container duration:** 52.100 seconds (52.00 seconds of video plus AAC padding).
- **Size:** 13,161,477 bytes.
- **SHA-256:** `baa691c774678b193ecb641ad2643b3088360427e7b435f8d09e1995677b991c`.
- **MD5:** `270f99dac2398e92adfe1c226dc22f18`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seventeen retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
