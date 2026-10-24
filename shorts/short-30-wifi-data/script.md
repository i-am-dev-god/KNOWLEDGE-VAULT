# How Wi-Fi Sends Data Through Air

**Composition:** `Short30WifiData`

**Format:** 1080 × 1920, 30 fps, 55 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Send a file through air · 0.00–5.72s

> Send a photo over Wi-Fi.
> *0.70–2.28s*
>
> The file travels through air as radio signals.
> *2.92–5.46s*

**Picture:** An original code-drawn photo travels toward a router through animated radio paths.

### 2. Packetize and protect the data · 5.72–12.72s

> First, your device divides the data into packets.
> *6.22–8.82s*
>
> Each packet includes addressing and error-checking information.
> *9.46–12.46s*

**Picture:** The photo becomes addressed packets with visible CRC error-checking fields.

### 3. Map bits onto radio subcarriers · 12.72–24.04s

> The radio maps groups of bits onto changes in a carrier wave.
> *13.22–16.80s*
>
> Wi-Fi also splits the data across many closely spaced subcarriers, using a method called OFDM.
> *17.52–23.70s*

**Picture:** Bit groups map onto carrier states, then four animated OFDM subcarrier lanes carry data together.

### 4. Share and listen to the channel · 24.04–32.68s

> These radio signals share the available channel with other nearby devices.
> *24.54–28.08s*
>
> A device listens before transmitting and adjusts when the channel is busy.
> *28.08–32.42s*

**Picture:** Nearby devices share a channel; the sender waits through a busy interval and transmits when the channel becomes clear.

### 5. Check, recover, and rebuild · 32.68–41.78s

> The receiver decodes the subcarriers, checks the packets, and requests retransmission if needed.
> *33.18–38.18s*
>
> Correct packets are reassembled into the original photo.
> *38.82–41.48s*

**Picture:** A failed packet is marked for retry, a corrected packet returns, and the original photo reconstructs in quadrants.

### 6. Data becomes radio and returns · 41.78–55.00s

> Wi-Fi turns data into carefully organized radio waves, then turns those waves back into data.
> *42.28–47.28s*

**Picture:** Data and checks, OFDM subcarriers, the radio channel, and verified reconstruction form the complete chain.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 44.92 seconds; SHA-256 `e96b3926c4a58f95083f04d7227e9903c81c14f806a22b9f8ac6f1d323ab9e12`.
- **Calmer pacing:** Playback is slowed gently to `0.951898148×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 55-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 47.498771 seconds. Master SHA-256: `b1ad781d9e6ac6c40c8389b93f6d644309c6297324d653276e974f9f755d3fa2`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 95.65%.
- **Caption treatment:** 11 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and gently released after the final line; 5 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-wifi-sends-data-through-air.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,650 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.14 LUFS integrated, 8.1 LU loudness range, -1.88 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.32939.
- **Timing:** 11 captions, 6 scenes, and 5 cues use the verified `voice-00` alignment. ASR caption end is 47.28 seconds; measured speech ends at 47.498771 seconds.
- **Container duration:** 55.100 seconds (55.00 seconds of video plus AAC padding).
- **Size:** 8,975,079 bytes.
- **SHA-256:** `100b7a0dcad872cc89ed9ac71650ca589c4139fef14519051007a4756ffc8677`.
- **MD5:** `5549f78d531863911989d13f0aa02063`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (23 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seven retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
