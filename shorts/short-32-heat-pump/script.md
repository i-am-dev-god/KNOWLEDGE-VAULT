# How a Heat Pump Warms Your Home

**Composition:** `Short32HeatPump`

**Format:** 1080 × 1920, 30 fps, 55 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no top title/duration header, narration-guided focus highlights, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. A heat pump moves existing heat · 0.00–11.56s

> A heat pump warms your home by moving heat from outdoor air, even when that air feels cold.
> *0.70–6.78s*
>
> It transports existing heat rather than creating heat from nothing.
> *7.44–11.18s*

**Picture:** Warm particles inside cold outdoor air move toward a house, explicitly showing that the heat pump transports existing heat.

### 2. The outdoor coil absorbs heat · 11.56–17.42s

> Outside, cold refrigerant absorbs heat from the air and evaporates into a gas.
> *12.06–17.24s*

**Picture:** Outdoor heat flows into the spotlighted coil as cold refrigerant evaporates into gas.

### 3. The compressor raises temperature · 17.42–22.76s

> The heat pump's compressor squeezes this gas, raising its pressure and temperature.
> *17.92–22.52s*

**Picture:** The compressor piston squeezes the gas; particles and a temperature indicator change together.

### 4. The indoor coil heats your rooms · 22.76–32.94s

> The hot gas enters the indoor coil and releases its heat into your home.
> *23.26–27.66s*
>
> A fan blows across that coil, carrying the released heat into your rooms.
> *27.66–32.60s*

**Picture:** The hot indoor coil releases heat, then the fan and warm-air paths take focus as heat enters the rooms.

### 5. The refrigerant resets for another cycle · 32.94–42.40s

> The refrigerant condenses into a liquid as it gives up heat.
> *33.44–36.74s*
>
> An expansion valve then lowers its pressure, making it cold again for the outdoor coil.
> *37.14–42.16s*

**Picture:** A complete refrigerant loop shows condensation, then shifts focus to the expansion valve and cold return flow.

### 6. A continuous heat-moving loop · 42.40–55.00s

> This repeating refrigeration cycle is how the heat pump moves heat indoors.
> *42.90–47.22s*

**Picture:** Outdoor absorption, compression, indoor release, and valve reset form one continuous heat-pump cycle.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 43.48 seconds; SHA-256 `1613a61fa2e07b62085e7335f96ee94cfaaf3aeeb5664e2f8b17cf3ad22c7a2b`.
- **Calmer pacing:** Playback is slowed gently to `0.920321403×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 55-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 47.485833 seconds. Master SHA-256: `3eef40ca7f27f88fa6a2240548b224cf18e3b2dc4f0dae7fb1cb4002f2511ad6`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 98.37%.
- **Caption treatment:** 9 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `cinematic-min` instrumental bed, ducked beneath narration and gently released after the final line; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-a-heat-pump-warms-your-home.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,650 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.19 LUFS integrated, 11.6 LU loudness range, -1.88 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset -1 ms, within the 12 ms acceptance limit; normalized mix correlation 0.44786.
- **Timing:** 9 captions, 6 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 47.22 seconds; measured speech ends at 47.485833 seconds.
- **Container duration:** 55.100 seconds (55.00 seconds of video plus AAC padding).
- **Size:** 11,346,300 bytes.
- **SHA-256:** `a90b6dbc8141e58bd996ef213ba07da70852578a2059b569af70486eb01725a7`.
- **MD5:** `5322b10155a94aecc9fa772943a44db6`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All twelve retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
