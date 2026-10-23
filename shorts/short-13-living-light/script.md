# The Ocean's Living Light

**Composition:** `Short13LivingLight`

**Format:** 1080 × 1920, 30 fps, 60 seconds

**Production:** Original script, original vector animation, VoiceStudio narration, cinematic sound mix

## Narration script

### 1. Hook — the impossible wave
> On a moonless beach, a wave can turn electric blue. But the light isn't in the water. It's alive.

**Picture:** A dark shore and a single breaking wave. The wave becomes a ribbon of living blue points. A microscopic organism emerges from the foam.

### 2. Meet the plankton
> Meet the dinoflagellates: microscopic plankton drifting through the sea. Disturb them, and some species answer with a flash.

**Picture:** Macro drift through original dinoflagellate illustrations. A passing pressure ring triggers a localized flash; the wording deliberately says “some species,” not all.

### 3. Chemistry into light
> Inside each cell, a molecule called luciferin meets oxygen. An enzyme, luciferase, helps turn that reaction into light—with almost no heat.

**Picture:** A cutaway cell becomes a reaction chamber. Luciferin and oxygen converge with luciferase; a blue photon leaves the reaction. Labels: `LUCIFERIN + O₂`, `LUCIFERASE`, `LIGHT · VERY LITTLE HEAT`.

### 4. The survival question
> But why flash when touched? One leading idea is the burglar alarm effect.

**Picture:** The blue cell is approached by a small grazer. The title “ONE LEADING HYPOTHESIS” keeps the scientific claim appropriately qualified.

### 5. The burglar alarm
> The sudden light can startle a tiny predator. It may also expose that predator to larger hunters nearby.

**Picture:** A flash interrupts the grazer; its silhouette becomes visible to a larger fish in the distance. The fish turns toward the revealed shape. “CAN STARTLE” and “MAY EXPOSE” preserve the uncertainty in the narration.

### 6. More than beautiful
> So the glow is more than beautiful. It can be a warning, a distraction, or a call for help.

**Picture:** Three visual chapters—warning ring, scattering afterimage, and a glowing alarm beacon—resolve back into one organism.

### 7. Closing image
> Next time the night ocean ignites, look closer. You're watching a hidden conversation, written in blue.

**Picture:** Return to the shore. Individual flashes become a wave of light, then a final title: `THE OCEAN'S LIVING LIGHT`.

## VoiceStudio production record

- **Application source:** `debpalash/VoiceStudio`, inspected commit `770118cfb563568d0aa2a7fa248fe354535510d2`.
- **Engine:** VoiceStudio `SherpaOnnxBackend` (`sherpa-onnx`), running locally on CPU.
- **Model:** Piper `en_US-amy-low`, 16 kHz mono, one speaker; model SHA-256 before Sherpa metadata preparation: `a5a91abb7de0f104358a25aded480ddacf1ff0762886325886ec406a2e86aab3`.
- **Model source mirror:** `siva-sub/NekoSpeak`, `app/src/main/assets/piper/en_US-amy-low.onnx` and its JSON configuration, retrieved through the GitHub API because the normal Hugging Face route is unavailable in this environment.
- **Compatibility:** The model was prepared using Sherpa-ONNX's documented Piper metadata fields and generated `tokens.txt`. The local VoiceStudio adapter was given the model-local `espeak-ng-data` path required by this Piper voice. No substitute speech service or built-in assistant narration is used.
- **Timing:** Each of the seven lines is synthesized separately through VoiceStudio. Actual trimmed audio durations determine scene and caption timing; word timings inside each measured line are estimates, not an ASR alignment.
- **Master narration:** 48 kHz mono PCM WAV, assembled with intentional pauses in a 60-second timeline.

## Sound and accessibility

- Original animation is entirely SVG/CSS; no stock footage or copied sample composition is used.
- Captions remain inside the vertical safe area and use measured line timing.
- `cinematic-min` is the instrumental bed. Existing library wind, stream, sparkle, chime, and impact effects are layered at story cues.
- The final loudness mix is checked for audible narration, true peaks, stream format, frame count, and duration.

## Final master and QA

- **Deliverable:** `output/the-oceans-living-light.mp4` (ignored by Git, like the repository's other rendered finals).
- **Picture:** H.264 High, 1080 × 1920, 30 fps, exactly 1,800 decoded frames; full-stream decode passed.
- **Sound:** AAC-LC, 48 kHz stereo, 192 kb/s target. A final +4 dB master was applied to the complete Remotion mix while copying the validated video stream without re-encoding it.
- **Measured audio:** −17.2 LUFS integrated, 2.9 LU loudness range, −0.9 dBFS true peak. No silence of at least two seconds below −45 dB was detected.
- **Container duration:** 60.05 seconds (60.00 seconds of video plus AAC padding).
- **Size:** 12,227,806 bytes.
- **SHA-256:** `0e72cb5c98f5a4cc304103c5ba3135e09a016614d0d990f6200dea3ce9eaee9b`.
- **Visual review:** Final-MP4 contact sheet plus full-resolution opening, organism, chemistry, predator, meaning-card, and closing-title frames checked for safe-area layout and legibility.
