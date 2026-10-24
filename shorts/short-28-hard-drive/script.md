# How a Hard Drive Finds Your Files

**Composition:** `Short28HardDrive`

**Format:** 1080 × 1920, 30 fps, 52 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Find the requested file · 0.00–5.96s

> Open a file on a hard drive.
> *0.70–2.44s*
>
> The drive must find where its data is stored.
> *3.00–5.68s*

**Picture:** A cutaway hard drive holds on the platter and a marked location for the requested file.

### 2. Spinning magnetic storage · 5.96–14.40s

> Inside, circular platters spin at a steady speed.
> *6.46–9.86s*
>
> Tiny magnetic regions on their surfaces represent the bits.
> *10.62–14.10s*

**Picture:** The platter rotates at a constant speed and a magnified inset reveals alternating magnetic regions.

### 3. Translate an address into a location · 14.40–24.26s

> The file system gives the drive a logical address for the requested data.
> *14.90–19.00s*
>
> The controller translates that address into a track and sector on the platter.
> *19.70–24.10s*

**Picture:** An example logical block address passes through a controller and becomes a highlighted track and sector.

### 4. Move the head and rotate the sector · 24.26–32.74s

> An actuator swings the read and write head to the correct track.
> *24.76–28.30s*
>
> The head waits briefly for the correct sector to rotate underneath.
> *28.30–32.42s*

**Picture:** The actuator moves the head inward while the marked sector rotates toward the head position.

### 5. Sense magnetic changes · 32.74–39.28s

> As the magnetic regions pass, the head senses their changes and the electronics retrieve the bits.
> *33.24–39.04s*

**Picture:** The marked sector reaches the head and magnetic changes become a visible recovered-bit readout.

### 6. Arm movement plus rotation · 39.28–52.00s

> A quick movement of the arm, plus the spinning platter, brings the stored data to the head.
> *39.78–44.82s*

**Picture:** Address-to-track, arm-to-sector, and magnetism-to-bits form the mechanical seek summary.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 38.00 seconds; SHA-256 `28760da89dd23d6a215d125fcba1d829a100555a68ece6cbc0883bb4c8e28c05`.
- **Calmer pacing:** Playback is slowed gently to `0.844936983×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 52-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 44.983771 seconds. Master SHA-256: `19bbb54c669ccb27e7dc3413dd38340731292193c2fa78a80d2b1c5fda3b9238`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 97.53%.
- **Caption treatment:** 10 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `cinematic-min` instrumental bed, ducked beneath narration and gently released after the final line; 5 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-a-hard-drive-finds-your-files.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,560 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.15 LUFS integrated, 11.9 LU loudness range, -1.87 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.38144.
- **Timing:** 10 captions, 6 scenes, and 5 cues use the verified `voice-00` alignment. ASR caption end is 44.82 seconds; measured speech ends at 44.983771 seconds.
- **Container duration:** 52.100 seconds (52.00 seconds of video plus AAC padding).
- **Size:** 11,991,162 bytes.
- **SHA-256:** `af5e87436daaac94ab68fdb2e37f77a00a5fb57fe3ad5a33df68cf2fd0ff57ef`.
- **MD5:** `67c204be2fc7b1448bc30b06efd08c8e`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (21 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seven retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
