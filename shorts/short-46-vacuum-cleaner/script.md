# How a Vacuum Cleaner Pulls Up Dirt

**Composition:** `Short46VacuumCleaner`

**Format:** 1080 × 1920, 30 fps, 42 seconds

**Production:** Rebuilt result-first device animation with physically aligned contact points, connected pipes/wires, recognizable labeled cutaways, one primary action per beat, steady part highlights, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line or corner metadata, ducked music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Airflow carries dirt into the vacuum · 0.00–10.74s

> This vacuum cleaner lifts dirt from the floor and carries it into a collection bin.
> *0.15–4.88s*
>
> It does this by creating a continuous airflow, not by pulling on each particle directly.
> *5.38–10.60s*

**Picture:** A complete canister-vacuum cutaway connects the floor nozzle, hose, transparent dust bin, fan, and exhaust while dirt follows one defined pickup path.

### 2. The fan creates a pressure difference · 10.74–20.18s

> An electric motor spins a fan that pushes air out of the cleaner.
> *11.24–15.10s*
>
> That lowers the air pressure inside, so room air rushes in through the nozzle.
> *15.58–19.92s*

**Picture:** A labeled inlet, dust bin, filter, motor, fan, and exhaust show fan-driven exhaust and replacement room air entering from the opposite side.

### 3. Moving air transports and separates dirt · 20.18–30.24s

> The moving air carries loose dust and debris along the suction path.
> *20.68–24.64s*
>
> A cyclone or filter separates the dirt from that air before the air leaves the machine.
> *24.64–29.94s*

**Picture:** A labeled separator chamber shows air and dirt entering, air circulating upward to the cleaner-air outlet, and dirt falling into the collection bin.

### 4. Clean filters preserve airflow · 30.24–35.80s

> A clogged filter restricts airflow, which is why cleaning it can restore cleaning performance.
> *30.74–35.56s*

**Picture:** Side-by-side before-and-after pleated filters contrast a dust-blocked passage with restored airflow through clean pleats.

### 5. Fan, airflow, and collection form one chain · 35.80–42.00s

> So the fan starts an airflow, and the moving air transports dirt into the vacuum.
> *36.30–40.86s*

**Picture:** Three ordered diagrams connect the running fan, directed airflow, and collected dirt without decorative particle clutter.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 37.64 seconds; SHA-256 `8e1a4b131927da02a575c4c856a52fc26d3530d123f6c22d6c21133e7e401c23`.
- **Calmer pacing:** Playback is slowed gently to `0.910459910×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 42-second timeline with 0.15 seconds of initial silence. Measured paced speech ends at 41.087750 seconds. Master SHA-256: `3aed67f47f7e384ecb1387102d302ab56ed06f8cb2fbe683672d5daa82103c03`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 97.18%.
- **Caption treatment:** 8 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no stock footage, third-party logos, or external raster artwork is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and faded out during the trimmed ending; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-a-vacuum-cleaner-pulls-up-dirt.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,260 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.10 LUFS integrated, 1.9 LU loudness range, -1.75 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.39889.
- **Timing:** 8 captions, 5 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 40.86 seconds; measured speech ends at 41.087750 seconds.
- **Container duration:** 42.000 seconds (42.00 seconds of video plus AAC padding).
- **Size:** 7,911,201 bytes.
- **SHA-256:** `71b1622ce583dea86d94d0060b254c4beef649370f6f92e9ffe781a19a4d5f3b`.
- **MD5:** `51db4a71d0a472a77c2d442e2a7e2efe`.
- **Visual review:** Passed on the actual delivered MP4 at frame zero, every narration-clause onset and midpoint, targeted late control actions where applicable, and the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All twenty-two retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
