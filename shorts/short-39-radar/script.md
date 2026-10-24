# How Radar Finds Distant Objects

**Composition:** `Short39Radar`

**Format:** 1080 × 1920, 30 fps, 56 seconds

**Production:** Cinematic demonstration-led original cutaway animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, no corner topic or duration labels, narration-guided focus highlights, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Radar sends waves and receives echoes · 0.00–10.22s

> A radar finds distant objects by sending out radio waves and listening for their echoes.
> *0.70–5.70s*
>
> This works in darkness because radio echoes do not need visible light.
> *6.32–10.04s*

**Picture:** A night-time radar dish and aircraft exchange distinct outgoing radio pulses and returning echoes.

### 2. The antenna launches a radio pulse · 10.22–22.18s

> The radar's transmitter creates a short radio pulse, and its antenna sends that pulse into space.
> *10.72–16.48s*
>
> The pulse travels outward at the speed of light until it reaches an object such as an aircraft.
> *17.10–21.92s*

**Picture:** The transmitter creates a pulse, the antenna launches it, and the packet travels toward the highlighted aircraft.

### 3. The object reflects an echo · 22.18–26.36s

> Some radio energy reflects from the aircraft and returns toward the radar antenna.
> *22.68–26.86s*

**Picture:** The aircraft reflects a subset of the radio energy along the return path while minor scattered rays recede.

### 4. Round-trip time becomes distance · 26.36–35.40s

> The radar measures the echo's round-trip time to calculate distance.
> *26.86–30.96s*
>
> Multiplying half that time by the speed of light gives the object's range.
> *31.64–35.16s*

**Picture:** A pulse-versus-echo timeline and double-travel path resolve into the half-round-trip range calculation.

### 5. Repeated scans build an echo map · 35.40–41.48s

> A rotating antenna repeats this process in different directions, building a map of echoes around the radar.
> *35.90–41.28s*

**Picture:** A top-down radar scope rotates its sweep and accumulates echo blips across range rings and directions.

### 6. Radio echoes reveal object locations · 41.48–56.00s

> So radar locates objects by timing radio-wave echoes rather than relying on visible light.
> *41.98–46.84s*

**Picture:** The radar, outgoing pulse, returning echo, and range relationship appear together in one operational view.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 44.08 seconds; SHA-256 `f95733d5c6ef6692c8949f195edcfe24aac1da70329d772a23a5bba9e5effd4c`.
- **Calmer pacing:** Playback is slowed gently to `0.944121670×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 56-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 46.985375 seconds. Master SHA-256: `0e31244555746eda4fe04ff783ed7fdc206ee4fab2f4ca0bcf1595fdc48732ac`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 96.62%.
- **Caption treatment:** 9 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `cinematic-min` instrumental bed, ducked beneath narration and gently released after the final line; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-radar-finds-distant-objects.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,680 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.08 LUFS integrated, 13.5 LU loudness range, -1.73 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset -1 ms, within the 12 ms acceptance limit; normalized mix correlation 0.43260.
- **Timing:** 9 captions, 6 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 46.84 seconds; measured speech ends at 46.985375 seconds.
- **Container duration:** 56.000 seconds (56.00 seconds of video plus AAC padding).
- **Size:** 9,890,191 bytes.
- **SHA-256:** `b20721da9b774707120a7f747bba2b5a30c6c56fff178c8658bd5e1552454138`.
- **MD5:** `33613c62edf643b96392f775445d1430`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seventeen retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
