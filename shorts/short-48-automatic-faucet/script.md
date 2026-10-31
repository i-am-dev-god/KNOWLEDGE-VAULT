# How an Automatic Faucet Senses Your Hands

**Composition:** `Short48AutomaticFaucet`

**Format:** 1080 × 1920, 30 fps, 39.5 seconds

**Production:** Rebuilt result-first device animation with physically aligned contact points, connected pipes/wires, recognizable labeled cutaways, one primary action per beat, steady part highlights, one continuous user-selected `voice-00` narration take, calm ASR-aligned captions with no progress line or corner metadata, ducked music, and restrained sound design

## Timed narration and matching demonstrations

### 1. Hands trigger water without touch · 0.00–9.60s

> Put your hands under this automatic faucet, and water starts without a touch.
> *0.15–4.90s*
>
> A small infrared sensor near the spout detects that your hands are there.
> *5.42–9.60s*

**Picture:** A recognizable faucet and basin show a hand moving directly under the spout before the aligned water stream starts, with the infrared sensor window labeled.

### 2. The sensor emits invisible infrared pulses · 9.60–19.70s

> An infrared LED sends out pulses of light that people cannot see.
> *10.10–14.28s*
>
> With no hands nearby, that light travels away and little returns to the receiver.
> *14.86–19.50s*

**Picture:** A close-up sensor window identifies the infrared LED and receiver while outgoing pulses enter an explicitly empty detection zone and little light returns.

### 3. Hands return light to the receiver · 19.70–28.22s

> Your hands reflect some of the infrared light back toward the sensor.
> *20.20–23.88s*
>
> When the returned signal is strong enough, a controller opens a solenoid valve.
> *24.44–28.72s*

**Picture:** Hand-contacting reflection arrows lead to the receiver and controller beside a labeled solenoid-valve cutaway whose lifted plunger opens the water pipe.

### 4. The solenoid valve starts and stops water · 28.22–33.26s

> Remove your hands, the reflection disappears, and the valve closes again.
> *28.72–33.22s*

**Picture:** As the hand leaves and reflection disappears, the same solenoid plunger lowers into the valve seat and blocks the connected water pipe.

### 5. Reflected light becomes hands-free control · 33.26–39.50s

> So the faucet turns reflected infrared light into water flow without touch.
> *33.76–38.36s*

**Picture:** Three ordered diagrams connect hand reflection, valve opening, and water delivery from the faucet.

## Selected-voice production record

- **Narrator:** The user-selected `voice-00`, used exclusively for the complete script in one continuous take. No alternate voice, section switching, third-party cloning, or reference conditioning is used.
- **Source take:** 24 kHz mono, 35.40 seconds; SHA-256 `4f7868e8a7c783ab23602fd52bbdfa25fc4881f5f8e46df4340f44eeb6eaa191`.
- **Calmer pacing:** Playback is slowed gently to `0.910613351×` with pitch preserved; never sped up. Pitch-preserving FFmpeg WSOLA `atempo` is used whenever slowing is required.
- **Master narration:** 48 kHz mono PCM WAV in a 39.5-second timeline with 0.15 seconds of initial silence. Measured paced speech ends at 38.580958 seconds. Master SHA-256: `8b9c90029a49fac35a2334866010074ac0056f8e59687efa045d53c32c535a68`.
- **Synchronization:** `faster-whisper medium.en` word timestamps on the exact master match the complete normalized script. Mean raw ASR word confidence is 97.66%.
- **Caption treatment:** 8 complete clauses fade in and out. There is no moving underline, progress bar, per-caption timer, or word-pop animation.

## Sound and provenance

- Original code-drawn SVG/CSS artwork created for this topic; no stock footage, third-party logos, or external raster artwork is reused.
- `ambient-pad` instrumental bed, ducked beneath narration and faded out during the trimmed ending; 4 quiet catalog cues support meaningful reveals only.
- Existing music and sound-effect catalog provenance is retained. No external raster assets are used.

## Final master and QA

- **GitHub deliverable:** `RESULT/how-an-automatic-faucet-senses-your-hands.mp4`. The production copy is byte-identical and remains ignored by Git.
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,185 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. Final mastering applied a measured 48 ms silent-head priming correction, 70 Hz high-pass, zero-makeup limiter, and two-pass loudness normalization while copying the H.264 stream without re-encoding it.
- **Measured audio:** -16.17 LUFS integrated, 2.5 LU loudness range, -1.99 dBTP true peak. No silence of at least two seconds below −45 dB was detected.
- **Delivered synchronization:** Narration offset 0 ms, within the 12 ms acceptance limit; normalized mix correlation 0.30466.
- **Timing:** 8 captions, 5 scenes, and 4 cues use the verified `voice-00` alignment. ASR caption end is 38.36 seconds; measured speech ends at 38.580958 seconds.
- **Container duration:** 39.600 seconds (39.50 seconds of video plus AAC padding).
- **Size:** 6,569,904 bytes.
- **SHA-256:** `226c778922f83a71add50b9e6ac2828256cbd370c6afa08960a69c94ffcb9251`.
- **MD5:** `0911b94a9e670d2dc2f023aeca6252de`.
- **Visual review:** Passed on the actual delivered MP4 at frame zero, every narration-clause onset and midpoint, targeted late control actions where applicable, and the outro (19 ordered samples). The active object and visible state match the narration, unrelated elements recede, labels and captions remain safe and legible, and no caption timing/progress line appears.
- **Existing versions:** All twenty-two retained delivery hashes are verified unchanged, and existing Drive deliverables are left untouched.
