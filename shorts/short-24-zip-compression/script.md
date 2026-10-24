# How ZIP Files Make Data Smaller

**Composition:** `Short24ZipCompression`

**Format:** 1080 × 1920, 30 fps, 52 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Find repeated structure · 0.00–6.84s

> This sentence wastes space.
> *0.70–2.62s*
>
> The phrase science is fun appears three times.
> *3.42–6.62s*

**Picture:** Three identical 16-character phrases are highlighted one after another to expose repetition.

### 2. Replace repeats with references · 6.84–15.82s

> Instead of writing every repeat, a compressor can store a phrase once.
> *7.34–11.62s*
>
> Later repeats become short references to that earlier phrase.
> *12.38–15.62s*

**Picture:** One phrase is stored once; the other two become short BACK 16, COPY 16 references that point back to the stored phrase.

### 3. Use fewer bits for common symbols · 15.82–23.52s

> The remaining symbols are then translated into bits.
> *16.32–19.30s*
>
> Common symbols can use shorter bit patterns than rare ones.
> *20.02–23.28s*

**Picture:** Separate illustrative code-length examples give common symbols shorter bit patterns than a rare symbol.

### 4. Rebuild the exact original · 23.52–31.92s

> To open the file, the reader follows the references and rebuilds every original character.
> *24.02–29.24s*
>
> Nothing is guessed. Nothing is lost.
> *29.24–31.88s*

**Picture:** The stored phrase and references pass through a reader and reconstruct all three original phrases exactly.

### 5. Compression needs useful structure · 31.92–39.12s

> But already-compressed data may barely shrink.
> *32.42–35.16s*
>
> ZIP saves space only when it finds useful structure.
> *35.98–39.06s*

**Picture:** Repeated data compresses beside already-compressed data that shows little useful structure and little savings.

### 6. Same information, efficient representation · 39.12–52.00s

> Compression is not deleting information. It is writing the same information more efficiently.
> *39.62–44.76s*

**Picture:** References and efficient bit patterns are summarized as a better representation, not deleted information.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 38.32 seconds; SHA-256 `9191b37ad9b6fb372eaaa0b85b9817980dbba764bc450270b0c27d7ffbf27f00`.
- **Calmer pacing:** Playback is slowed gently to `0.854340670×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 52-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 44.986021 seconds. Master SHA-256: `5ffd4bd4ed5904decf005377689c1af4256f53bfe3f07865a66950021a200180`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 96.89%.
- **Caption treatment:** 11 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `cinematic-min` instrumental bed, ducked beneath narration and gently released after the final line; 5 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-zip-files-make-data-smaller.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,560 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.10 LUFS integrated, 13.7 LU loudness range, -1.50 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.41595.
- **Timing:** 11 captions, 6 scenes, and 5 cues use the verified `voice-00` alignment. ASR caption end is 44.76 seconds; measured speech ends at 44.986021 seconds.
- **Container duration:** 52.100 seconds (52.00 seconds of video plus AAC padding).
- **Size:** 7,934,140 bytes.
- **SHA-256:** `a26a658fc0e31c4ae4c973014309020e97342664385f43100a9b421c0ad07c91`.
- **MD5:** `b4c9c6511c68a552906aacd301bb83f8`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (23 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seven earlier delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
