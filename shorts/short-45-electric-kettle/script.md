# How an Electric Kettle Switches Off

**Composition:** `Short45ElectricKettle`

**Format:** 1080 × 1920, 30 fps, 36 seconds

**Production:** Result-first cinematic original cutaway animation with an immediate device payoff, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no corner topic or duration labels, narration-guided focus highlights, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Boiling water cuts the power · 0.00–7.78s

> This electric kettle switches itself off when the water boils.
> *0.15–3.50s*
>
> A small steam-activated thermostat makes that automatic decision.
> *4.02–7.54s*

**Picture:** Boiling water trips the kettle switch in the opening second, dimming the element and revealing the steam thermostat.

### 2. Steam carries the boil signal · 7.78–21.80s

> While heating, an electric element sends heat into the water.
> *8.28–11.40s*
>
> When the water boils, steam rises through a small channel toward the thermostat.
> *11.96–16.38s*
>
> Inside it, a bimetallic strip made of two metals bends as steam heats it.
> *16.88–21.86s*

**Picture:** The heating element warms the water, bubbles rise, and steam follows a dedicated channel to a two-metal strip.

### 3. The thermostat opens the switch · 21.80–30.50s

> The two metals expand by different amounts, forcing the strip to curve.
> *22.30–25.94s*
>
> That movement trips a mechanical switch and disconnects the heating element.
> *25.94–30.38s*

**Picture:** Different expansion arrows accompany the bimetal strip bending, the contacts separating, and the element disconnecting.

### 4. Steam becomes an automatic shutoff · 30.50–36.00s

> So boiling water creates the steam signal that physically cuts the kettle's power.
> *31.00–34.90s*

**Picture:** Steam, a bent bimetal strip, and open electrical contacts form one short automatic-shutoff chain.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 32.64 seconds; SHA-256 `07b9b280e67dd480d9fb531d7d1884c468363fb2e1d287a853a3f6a04e28e5d5`.
- **Calmer pacing:** Playback is slowed gently to `0.921431807×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 36-second timeline with 0.15 seconds of initial silence. Measured paced speech ends at 35.085042 seconds. Master SHA-256: `07f790e4e6acf1bd77f37f0c53dabd867e41eecabebae088e55d3fa208bd1d1e`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 97.71%.
- **Caption treatment:** 8 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no stock footage, third-party logos, or external raster artwork is reused.
- `cinematic-min` instrumental bed, ducked beneath narration and faded out during the trimmed ending; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-an-electric-kettle-switches-off.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,080 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.11 LUFS integrated, 2.0 LU loudness range, -1.94 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.36392.
- **Timing:** 8 captions, 4 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 34.90 seconds; measured speech ends at 35.085042 seconds.
- **Container duration:** 36.100 seconds (36.00 seconds of video plus AAC padding).
- **Size:** 7,465,843 bytes.
- **SHA-256:** `11c1f7a9541fe24db6ee23c2c2c60e2914b163eafc837d84e8bd1ce736916189`.
- **MD5:** `bd84c7248c50f4bdc47e90ea74f2262e`.
- **Visual review:** Passed on the actual delivered MP4 at frame zero, every narration-clause onset and midpoint, targeted late control actions where applicable, and the outro (18 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seventeen retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
