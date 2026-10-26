# How a Pressure Cooker Cooks Faster

**Composition:** `Short44PressureCooker`

**Format:** 1080 × 1920, 30 fps, 40 seconds

**Production:** Result-first cinematic original cutaway animation with an immediate device payoff, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no corner topic or duration labels, narration-guided focus highlights, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Trapped steam enables faster cooking · 0.00–9.24s

> This pressure cooker cooks faster by making water boil at a higher temperature.
> *0.15–4.86s*
>
> Its sealed lid traps steam, so pressure builds above the food.
> *5.54–9.18s*

**Picture:** A steaming pressure cooker heats food immediately while the sealed gasket and rising pressure gauge establish the mechanism.

### 2. Steam raises the pressure · 9.24–17.32s

> Heating turns some water into steam inside the limited space.
> *9.74–13.30s*
>
> The regulator holds the pressure at its designed cooking level.
> *13.86–17.20s*

**Picture:** Steam forms in the confined vessel, pressure acts on its walls, and the regulator controls the designed level.

### 3. Higher pressure raises the boiling point · 17.32–26.02s

> At that higher pressure, water can stay liquid beyond its normal boiling point.
> *17.82–22.18s*
>
> The hotter water and steam transfer energy into food more quickly.
> *22.66–26.52s*

**Picture:** Open-pot and pressure-cooker cutaways compare normal and hotter boiling before heat arrows enter the food.

### 4. Pressure is limited and released · 26.02–33.44s

> A locking lid and safety valve help control excess pressure, and the cooker must depressurize before opening.
> *26.52–33.30s*

**Picture:** The lid remains locked under pressure while the safety valve releases steam; the gauge falls before unlocking.

### 5. Hotter water and steam cook faster · 33.44–40.00s

> So trapped steam raises the boiling temperature, and the hotter cooking medium speeds up the meal.
> *33.94–39.02s*

**Picture:** The active cooker resolves into a three-step trap-steam, raise-pressure, cook-hotter chain.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 36.28 seconds; SHA-256 `7b376e1e76398e07b791e0aace0abdba58a895156f8174648fe2d4cecc5fd255`.
- **Calmer pacing:** Playback is slowed gently to `0.919117458×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 40-second timeline with 0.15 seconds of initial silence. Measured paced speech ends at 39.084292 seconds. Master SHA-256: `96e494b2ce34270df85b5fc89facb6dae9debc366e25021e8690dcd1560dbbcd`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 97.91%.
- **Caption treatment:** 8 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no stock footage, third-party logos, or external raster artwork is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and faded out during the trimmed ending; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-a-pressure-cooker-cooks-faster.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,200 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.09 LUFS integrated, 2.9 LU loudness range, -1.88 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.38154.
- **Timing:** 8 captions, 5 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 39.02 seconds; measured speech ends at 39.084292 seconds.
- **Container duration:** 40.000 seconds (40.00 seconds of video plus AAC padding).
- **Size:** 9,593,078 bytes.
- **SHA-256:** `a72b57877c4f6dad9a3eab5f70875f14dbb0b6cd5a7bf183b981d79d85e5d28f`.
- **MD5:** `c283a2da3f500ace85ea4a122a80e1e1`.
- **Visual review:** Passed on the actual delivered MP4 at frame zero, every narration-clause onset and midpoint, targeted late control actions where applicable, and the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seventeen retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
