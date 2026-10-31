# Shorts 46–50: visual-explanation revision

Reviewed on 2026-10-31. Rebuilt animation source: `3ec4890`.

## Reason for revision

The original Shorts 46–50 were rejected because their animation was insufficiently organized, some diagrams were not recognizable, and the digital-scale object appeared to float while weight was already being measured. The replacement pass rebuilds the visuals rather than treating technical decode/loudness checks as proof of explanatory quality.

## Rebuild rules

- Show recognizable device assemblies before magnifying individual parts.
- Keep contact points, supports, pipes, wires, and drainage paths physically aligned.
- Use one primary causal action per narration beat and reduce decorative motion.
- Use steady labels, solid highlights, and directed arrows instead of rotating dotted rings.
- Keep the existing user-selected `voice-00` narration, scripts, durations, and cue timings unchanged.
- Preserve captions without a progress line and keep corner topic/duration metadata absent.

## Device-specific changes

| Video | Rebuilt explanation |
| --- | --- |
| Vacuum cleaner | A complete nozzle/hose/bin/fan/exhaust route; labeled pressure-producing fan layout; a dirt-separation chamber; directly compared clogged and clean filters. |
| Digital scale | The object descends onto the platform at 0.00 kg; object, platform, support, and load cell then share deflection before 2.50 kg appears. Bonded strain gauges and seated calibration/tare objects replace floating arrangements. |
| Automatic faucet | A recognizable faucet, basin, hand, and sensor; distinct outgoing/reflected IR; hand-contacting rays; a separated controller connected to a solenoid valve in a continuous water pipe. |
| Washing machine | Shirt-shaped clothes held at the drum wall; explicit perforations; water bounded by the outer tub; connected sump/pump/drain route; centered versus off-center load comparison. |
| LED bulb | A recognizable labeled bulb; socket-to-driver-to-board power path; explicit P/N junction and recombination; phosphor attached to the chip; separate diffuser and heat-path explanation. |

## Fresh delivered-MP4 verification

- Five videos; **6,225 decoded frames** and **96 actual-MP4 visual samples** reviewed.
- Scale review includes a dedicated exact-contact sample: supported object, **0.00 kg**, and “Contact made — force is building.”
- All five visual reviews passed for device recognition, contact/connection alignment, label clearance, current-focus clarity, and narration matching.
- Delivered narration offsets: **0.0 / 0.0 / 0.0 / 0.0 / 0.0 seconds**.
- Integrated loudness: **-16.10 / -16.08 / -16.17 / -16.00 / -16.12 LUFS**.
- Durations remain **42.0 / 40.5 / 39.5 / 40.0 / 45.5 seconds**.
- Narration tempos remain **0.910460× / 0.916207× / 0.910613× / 0.917107× / 0.919360×**.
- Caption progress line remains disabled; all samples use the existing calm caption treatment.
- The other **22 RESULT masters** are preserved byte-for-byte and the **10 removed topics** remain absent.

The machine-readable results and per-file hashes are in `shorts/shorts-46-50-qa-summary.json`; detailed review records are in each project’s `qa.json`.
