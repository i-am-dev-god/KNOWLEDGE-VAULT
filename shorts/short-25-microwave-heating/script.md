# How a Microwave Oven Heats Food

**Composition:** `Short25MicrowaveHeating`

**Format:** 1080 × 1920, 30 fps, 55 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Why the plate turns · 0.00–5.98s

> This plate turns for a reason.
> *0.70–2.82s*
>
> It helps food heat more evenly.
> *3.40–5.56s*

**Picture:** Food rides a rotating turntable inside a cutaway oven cavity.

### 2. Generate and guide microwaves · 5.98–13.94s

> A magnetron inside the oven generates microwaves.
> *6.48–9.58s*
>
> The metal walls guide and reflect them around the cavity.
> *10.32–13.50s*

**Picture:** A labeled magnetron generates microwave paths that reflect around the metal cavity.

### 3. Field energy becomes molecular motion · 13.94–26.40s

> Water molecules have uneven electrical charge, so they behave like tiny dipoles.
> *14.44–19.24s*
>
> The changing field makes them rotate back and forth.
> *20.04–22.78s*
>
> Their motion spreads energy to nearby molecules as heat.
> *23.48–26.90s*

**Picture:** Water molecules show opposite partial charges. Dipoles rotate back and forth with the changing field, then neighboring molecular motion spreads energy as heat.

### 4. Move food through hotter and cooler regions · 26.40–35.14s

> The oven can have hotter and cooler regions.
> *26.90–30.28s*
>
> The turntable moves food through those regions for more even heating.
> *31.02–34.64s*

**Picture:** Hotter and cooler regions are visible while the turntable moves food through different regions at a steady local speed.

### 5. The field stops, the heat remains · 35.14–42.78s

> The microwaves do not make the food radioactive.
> *35.64–38.02s*
>
> Once the oven stops, the field is gone, but the heat remains.
> *38.88–42.28s*

**Picture:** The microwave field fades off while molecular heat remains; a separate label states that radioactivity is not added.

### 6. Molecular motion becomes heat · 42.78–55.00s

> Microwave energy becomes molecular motion, and molecular motion becomes heat.
> *43.28–47.28s*

**Picture:** The microwave field, molecular motion, and heat form a three-step energy-conversion chain.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 41.48 seconds; SHA-256 `cd0afc76d87962d3a5dce4252b0f4811c67bd14d6e536a30c36c927182063b6a`.
- **Calmer pacing:** Playback is slowed gently to `0.877996795×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 55-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 47.485333 seconds. Master SHA-256: `4ebdbf298bc955577ccf132cae978875844c7358fc1e89a15e2aa643e00144b5`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 98.00%.
- **Caption treatment:** 12 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and gently released after the final line; 5 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-a-microwave-oven-heats-food.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,650 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.15 LUFS integrated, 7.7 LU loudness range, -1.48 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.40757.
- **Timing:** 12 captions, 6 scenes, and 5 cues use the verified `voice-00` alignment. ASR caption end is 47.28 seconds; measured speech ends at 47.485333 seconds.
- **Container duration:** 55.100 seconds (55.00 seconds of video plus AAC padding).
- **Size:** 9,803,321 bytes.
- **SHA-256:** `a9215550a8791de416a1995cd8ba757a7b6e79bdd9f0147f20b830913d68cbab`.
- **MD5:** `aabc6876c85f3562c27685f8e6a79655`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (25 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seven earlier delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
