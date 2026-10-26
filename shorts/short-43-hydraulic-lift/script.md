# How a Hydraulic Lift Raises a Car

**Composition:** `Short43HydraulicLift`

**Format:** 1080 × 1920, 30 fps, 43.5 seconds

**Production:** Result-first cinematic original cutaway animation with an immediate device payoff, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no corner topic or duration labels, narration-guided focus highlights, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Oil pressure lifts the car · 0.00–11.38s

> This hydraulic lift raises a heavy car using pressure in trapped oil.
> *0.15–4.98s*
>
> A small input piston can multiply force because the lifting piston has a much larger area.
> *5.64–11.16s*

**Picture:** A car rises on lift arms above an oil-filled cylinder while small-input and large-lift piston areas are compared.

### 2. The pump pressurizes confined oil · 11.38–20.30s

> The pump pushes nearly incompressible oil into the lift cylinder.
> *11.88–15.74s*
>
> Pressure spreads through the fluid and acts across the large piston.
> *16.34–20.04s*

**Picture:** A moving input piston pushes oil through a connected chamber as pressure arrows act across the larger piston.

### 3. Pressure becomes lifting force · 20.30–31.26s

> Force equals pressure times area, so that piston produces a powerful upward push.
> *20.80–25.92s*
>
> As oil enters, the piston and lift arms rise together, carrying the car.
> *25.92–31.16s*

**Picture:** The pressure-area relationship becomes an upward force that raises the piston, lift arms, and car together.

### 4. The valve controls holding and descent · 31.26–37.16s

> A closed valve traps the oil to hold the car; opening it allows a controlled descent.
> *31.76–37.04s*

**Picture:** A closed valve traps oil to hold the load, then opens for returning oil and a controlled descent.

### 5. Pressure becomes controlled motion · 37.16–43.50s

> So confined oil turns a compact pump into smooth, controlled lifting power.
> *37.66–42.46s*

**Picture:** Small input, oil pressure, and large lifting piston form a compact hydraulic-power chain beneath the car.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 39.76 seconds; SHA-256 `63fac2631c8c1eb6b145bcb7d29f055a8c71a4a03caa7a9ed56f9d4b9b98a925`.
- **Calmer pacing:** Playback is slowed gently to `0.927124068×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 43.5-second timeline with 0.15 seconds of initial silence. Measured paced speech ends at 42.590250 seconds. Master SHA-256: `cad916d3209467a027c09a5305b1fda03bb543f387c923367c362e34a8e82601`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 97.70%.
- **Caption treatment:** 8 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no stock footage, third-party logos, or external raster artwork is reused.
- `cinematic-min` instrumental bed, ducked beneath narration and faded out during the trimmed ending; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-a-hydraulic-lift-raises-a-car.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,305 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.06 LUFS integrated, 2.7 LU loudness range, -1.91 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.38642.
- **Timing:** 8 captions, 5 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 42.46 seconds; measured speech ends at 42.590250 seconds.
- **Container duration:** 43.600 seconds (43.50 seconds of video plus AAC padding).
- **Size:** 9,228,229 bytes.
- **SHA-256:** `b0ded3e9b9cef622c35fbae0080292cc163775fbe609b541109a95d9d5b2358a`.
- **MD5:** `1f05177c929381792ada0ea8702825f8`.
- **Visual review:** Passed on the actual delivered MP4 at frame zero, every narration-clause onset and midpoint, targeted late control actions where applicable, and the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seventeen retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
