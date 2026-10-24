# How Bluetooth Sends Music to Your Headphones

**Composition:** `Short26BluetoothAudio`

**Format:** 1080 × 1920, 30 fps, 52 seconds

**Production:** Demonstration-led original animation, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line, ducked instrumental music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Music without a cable · 0.00–5.32s

> Press play on your phone.
> *0.70–2.10s*
>
> The music reaches your headphones without a cable.
> *2.58–5.06s*

**Picture:** A phone sends digital audio toward headphones through animated short-range radio paths.

### 2. Prepare digital audio · 5.32–15.02s

> First, the phone represents the music as digital audio samples.
> *5.82–9.64s*
>
> Bluetooth usually compresses those samples so they fit within the available data rate.
> *10.36–14.90s*

**Picture:** A waveform is sampled at points on the actual curve, then a compressed stream appears as a separate step.

### 3. Divide the stream into packets · 15.02–22.26s

> The compressed stream is divided into small packets.
> *15.52–18.46s*
>
> Each packet carries control information alongside the audio data.
> *19.08–22.76s*

**Picture:** The stream becomes discrete packets with distinct control and audio-data regions.

### 4. Send coordinated radio transmissions · 22.26–32.68s

> The paired devices transmit these packets over short-range radio.
> *22.76–27.04s*
>
> They rapidly change frequencies in a coordinated pattern, helping avoid interference.
> *27.66–32.36s*

**Picture:** Packets move along coordinated frequency lanes; the active channel is highlighted and marked linked.

### 5. Rebuild and decode the stream · 32.68–40.16s

> Your headphones receive the packets and check that the data arrived correctly.
> *33.18–36.88s*
>
> They reassemble and decode the audio stream.
> *37.34–39.86s*

**Picture:** Received packets are checked, reassembled, decoded, and routed toward the converter and animated headphone output.

### 6. Samples become music again · 40.16–52.00s

> Digital samples become radio packets, then become music again through the headphone's converter and driver.
> *40.66–46.08s*

**Picture:** Digital samples, radio packets, decode-and-convert, and the headphone driver form the complete chain.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 45.96 seconds; SHA-256 `1a18606275360bdd17c4c3a0c017c2a6a70b497257e27acdb139a75a36d848fe`.
- **Calmer pacing:** Playback is kept at its natural `1.0×` tempo; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 52-second timeline with 0.7 seconds of initial silence. Measured paced speech ends at 46.221167 seconds. Master SHA-256: `373e2d8f2742a2879dbca4782206d748ab22ba586295725b9197ecd87f638089`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 97.05%.
- **Caption treatment:** 11 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no GPS, ANC, aquatic-life, stock-footage, or third-party logo material is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and gently released after the final line; 5 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-bluetooth-sends-music-to-headphones.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,560 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.22 LUFS integrated, 7.5 LU loudness range, -1.54 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.44030.
- **Timing:** 11 captions, 6 scenes, and 5 cues use the verified `voice-00` alignment. ASR caption end is 46.08 seconds; measured speech ends at 46.221167 seconds.
- **Container duration:** 52.100 seconds (52.00 seconds of video plus AAC padding).
- **Size:** 7,576,512 bytes.
- **SHA-256:** `3ea382bf948d32b506d6975a8ec1b7c354e378f1659cd3ba1a07552b6049f338`.
- **MD5:** `210eb0065de9972097273c2b69431f49`.
- **Visual review:** Passed on the actual delivered MP4 at every narration-clause onset and midpoint plus the outro (23 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All seven retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
