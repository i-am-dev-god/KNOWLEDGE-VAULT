# How QR Codes Survive Damage

**Composition:** `Short17QrCode`

**Format:** 1080 × 1920, 30 fps, 45 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Start with a message · 0.00–6.24s

> This code stores the word HELLO.
> *0.70–2.88s*
>
> Scan it, and the reader rebuilds HELLO.
> *3.36–5.96s*

**Picture:** A real 21×21 QR symbol encoding HELLO is scanned; a reader-side card reconstructs HELLO.

### 2. Damage the data · 6.24–11.12s

> Now cover some of these central squares.
> *6.74–8.88s*
>
> How can the message survive?
> *9.38–10.70s*

**Picture:** A visible central patch covers data modules while the three finder patterns remain intact.

### 3. Reconstruct missing values · 11.12–23.68s

> A QR code stores extra error-correction information alongside the message.
> *11.62–16.00s*
>
> Watch the reader use that information to work out what the missing values should be.
> *16.64–20.50s*
>
> The reader fills in those missing values, and HELLO is recovered.
> *20.84–24.18s*

**Picture:** The scratched physical code stays scratched on the left. In reader memory on the right, error-correction information helps solve missing message values and recover HELLO.

### 4. Finders do a different job · 23.68–30.20s

> The large corner patterns have another job: helping the reader find and align the code.
> *24.18–29.76s*

**Picture:** Data modules recede and the three large corner patterns are isolated to show their find-and-align role.

### 5. Recovery has a limit · 30.20–37.64s

> But repair has a limit.
> *30.70–32.08s*
>
> Cover too much data, and the reader no longer has enough information to rebuild the message.
> *32.74–37.26s*

**Picture:** Damage expands beyond the recoverable central region; the reader reports that the message is unavailable.

### 6. A second chance · 37.64–45.00s

> Error correction gives the reader a second chance to recover the message.
> *38.14–41.56s*

**Picture:** Message data plus extra information leads to recovery only when enough information remains: a second chance, not magic.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 41.48 seconds; SHA-256 `5b9efcee652f8d5fc5b62c5b76e139baf2f364a589330225fd34a85fa15b2895`.
- **Calmer pacing:** Playback is kept at its natural `1.0×` tempo; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 45-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 41.736646 seconds. Master SHA-256: `7fc7bc4c7ad95e29880c2481a417b55c9cad1f9ef0866a38910687d86d36b89c`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 97.65%.
- **Caption treatment:** 11 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `cinematic-min` instrumental bed, ducked beneath narration and gently released after the final line; 5 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. The QR example is a generated, valid 21×21 HELLO symbol using error correction H.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-qr-codes-survive-damage.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,350 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.15 LUFS integrated, 6.3 LU loudness range, -1.45 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.41777.
- **Timing:** 11 captions, 6 scenes, and 5 cues use the verified `voice-00` alignment. ASR caption end is 41.56 seconds; measured speech ends at 41.736646 seconds.
- **Container duration:** 45.100 seconds (45.00 seconds of video plus AAC padding).
- **Size:** 6,548,198 bytes.
- **SHA-256:** `76ff8e25073f5358de4d0c991ec033064a0e5b0a408d4823c3ce66a3dd5db4e3`.
- **MD5:** `97d88f05961fad151aac9ba66b807aa5`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (23 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** GPS and ANC hashes are verified unchanged, and existing Drive deliverables are left untouched.
