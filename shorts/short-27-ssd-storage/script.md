# How an SSD Remembers Without Power

**Composition:** `Short27SsdStorage`

**Format:** 1080 × 1920, 30 fps, 52 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Data survives without power · 0.00–5.10s

> Switch off the power.
> *0.70–1.88s*
>
> An SSD still remembers your files.
> *2.42–4.82s*

**Picture:** The SSD power switch turns off while the stored cell pattern and file data remain visible.

### 2. Trap charge inside a flash cell · 5.10–14.72s

> Inside each flash cell, a special region can trap electrical charge.
> *5.60–10.34s*
>
> The amount of charge changes the cell's threshold voltage.
> *11.06–14.40s*

**Picture:** Charge carriers settle into a flash cell's trap region and move the threshold-voltage marker.

### 3. Measure the threshold response · 14.72–23.76s

> To read it, the controller applies a test voltage and checks whether the cell conducts.
> *15.22–20.38s*
>
> That response reveals the stored value.
> *21.08–23.38s*

**Picture:** A controller applies a test voltage, a conduction path responds, and the stored value is identified.

### 4. Organize cells into pages and blocks · 23.76–27.02s

> Billions of cells are organized into pages and blocks.
> *24.26–27.52s*

**Picture:** A labeled grid organizes individual flash cells into pages within a larger block.

### 5. Spread writes to reduce wear · 27.02–38.72s

> Writing gradually wears the insulating material that holds the charge.
> *27.52–32.26s*
>
> So the controller spreads new writes across different cells, a process called wear leveling.
> *32.98–38.68s*

**Picture:** One repeatedly written cell shows wear, then new writes move across different cells under wear leveling.

### 6. Charge plus careful control · 38.72–52.00s

> Trapped charge preserves the data, while careful reading and wear leveling keep the SSD useful.
> *39.22–44.80s*

**Picture:** Trapped charge, threshold reading, and wear leveling form the storage-and-maintenance summary.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 38.64 seconds; SHA-256 `4d7d11ca547b00b560a2da23c556911e0a8e09f8ecb6c63c54b87a206f71bc3d`.
- **Calmer pacing:** Playback is slowed gently to `0.861107035×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 52-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 44.986167 seconds. Master SHA-256: `1a86c57c750377b5d341cc905508a34b4b34752ddd9919b52452a07957187d02`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 96.39%.
- **Caption treatment:** 10 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `cinematic-min` instrumental bed, ducked beneath narration and gently released after the final line; 5 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-an-ssd-remembers-without-power.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,560 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.10 LUFS integrated, 12.2 LU loudness range, -1.98 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.39314.
- **Timing:** 10 captions, 6 scenes, and 5 cues use the verified `voice-00` alignment. ASR caption end is 44.80 seconds; measured speech ends at 44.986167 seconds.
- **Container duration:** 52.100 seconds (52.00 seconds of video plus AAC padding).
- **Size:** 7,396,172 bytes.
- **SHA-256:** `66f3b4fcad505ae9df10c6d18096fde7107063666a1d07647cee47d13c2c4c14`.
- **MD5:** `8cda47e1c70e296d9a4c4828035de7f1`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (21 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seven retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
