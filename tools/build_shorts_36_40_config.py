#!/usr/bin/env python3
"""Build the source-of-truth narration/scene plan for Shorts 36–40."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]

def line(id, scene, text):
    return {"id": id, "scene": scene, "text": text}

def cues(second, fourth, closing):
    return [
        {"sync_source": second, "offset_s": -0.15, "sfx_id": "scan-hum", "gain_db": -25, "cue": "Reveal the mechanism"},
        {"sync_source": fourth, "offset_s": -0.10, "sfx_id": "ui-click-soft", "gain_db": -24, "cue": "Focus the active component"},
        {"sync_source": closing, "offset_s": -0.10, "sfx_id": "pop-reveal", "gain_db": -24, "cue": "Resolve the mechanism"},
        {"sync_source": "closing-summary", "offset_s": -0.20, "sfx_id": "warm-shimmer", "gain_db": -21, "cue": "Summary"},
    ]

projects = [
    {
        "id": "short-36-fiber-optics", "slug": "fiber-optics",
        "title": "How Fiber Optics Carry Internet Data", "composition": "Short36FiberOptics",
        "result": "how-fiber-optics-carry-internet-data.mp4", "duration_s": 56.0, "target_voice_end_s": 51.0,
        "prompt": "Fiber-optic cable. Internet data. Laser. Core. Cladding. Total internal reflection. Photodetector.",
        "music": "ambient-pad",
        "lines": [
            line("hook-light", "hook", "A fiber-optic cable carries internet data as flashes of light inside a strand of glass."),
            line("hook-copper", "hook", "Instead of sending electrical pulses through copper, it guides light from one end to the other."),
            line("transmit-encode", "transmit", "At the cable's transmitter, a laser or LED turns digital data into rapid pulses of light."),
            line("core-enter", "core", "Those pulses enter the cable's narrow core, the central path reserved for the light."),
            line("reflect-boundary", "reflect", "The core is wrapped in cladding, which lets light reflect at the boundary instead of escaping."),
            line("reflect-zigzag", "reflect", "Each pulse follows the fiber by repeated total internal reflection, even when the cable bends."),
            line("receive-detect", "receive", "At the destination, a photodetector senses the arriving pattern of light and darkness."),
            line("receive-data", "receive", "The receiver converts that pattern back into electrical data for your computer or router."),
            line("closing-summary", "closing", "So fiber-optic internet moves information by guiding coded light through glass, then decoding it at the far end."),
        ],
        "scenes": [["hook", "Internet data becomes light"], ["transmit", "The transmitter encodes light pulses"], ["core", "Light enters the glass core"], ["reflect", "The fiber confines and guides light"], ["receive", "The receiver restores digital data"], ["closing", "Coded light crosses the fiber"]],
        "cues": cues("hook-copper", "core-enter", "receive-detect"),
    },
    {
        "id": "short-37-electric-motor", "slug": "electric-motor",
        "title": "How an Electric Motor Spins", "composition": "Short37ElectricMotor",
        "result": "how-an-electric-motor-spins.mp4", "duration_s": 58.0, "target_voice_end_s": 49.0,
        "prompt": "Electric motor. Magnetic field. Wire coil. Current. Torque. Shaft. Split-ring commutator. Brushes.",
        "music": "cinematic-min",
        "lines": [
            line("hook-spin", "hook", "An electric motor turns electrical energy into rotation to power fans, tools, and machines."),
            line("hook-interaction", "hook", "Inside the motor, the essential interaction is between electric current and a magnetic field."),
            line("field-magnets", "field", "Two fixed magnets create a magnetic field across the motor's central space."),
            line("coil-current", "coil", "A wire coil sits in that field, and the motor sends electric current through the coil."),
            line("force-torque", "torque", "Current in the coil produces opposite forces on its two sides, creating a turning force called torque."),
            line("force-rotate", "torque", "Those forces rotate the coil and the shaft attached to it."),
            line("switch-stall", "switch", "But the coil would stall if the current stayed in the same direction."),
            line("switch-reverse", "switch", "A split-ring commutator reverses the current every half turn, keeping the torque in the same rotational direction."),
            line("closing-summary", "closing", "So the motor keeps spinning by repeatedly switching the coil's current so magnetic forces continue turning its shaft."),
        ],
        "scenes": [["hook", "Electricity becomes mechanical rotation"], ["field", "Fixed magnets establish a field"], ["coil", "Current flows through the moving coil"], ["torque", "Opposite forces turn the shaft"], ["switch", "The commutator reverses current"], ["closing", "Repeated switching sustains rotation"]],
        "cues": cues("hook-interaction", "coil-current", "switch-reverse"),
    },
    {
        "id": "short-38-transformer", "slug": "transformer",
        "title": "How a Transformer Changes Voltage", "composition": "Short38Transformer",
        "result": "how-a-transformer-changes-voltage.mp4", "duration_s": 52.0, "target_voice_end_s": 45.0,
        "prompt": "Transformer. AC voltage. Primary coil. Secondary coil. Alternating magnetic field. Iron core. Induction. Turns ratio.",
        "music": "ambient-pad",
        "lines": [
            line("hook-voltage", "hook", "A transformer changes AC voltage for the power grid and your home."),
            line("hook-transfer", "hook", "It transfers electrical energy between two coils without a direct wire connection."),
            line("primary-ac", "primary", "Alternating current enters the primary coil, so its magnetic field continually changes."),
            line("core-flux", "core", "The iron core guides this changing magnetic field around a closed loop."),
            line("core-link", "core", "The field then passes through the secondary coil on the other side."),
            line("secondary-induce", "secondary", "Because the field keeps changing, it induces an alternating voltage in this second coil."),
            line("turns-ratio", "turns", "The number of wire turns controls the result."),
            line("turns-up-down", "turns", "More secondary turns increase voltage; fewer secondary turns decrease it."),
            line("closing-summary", "closing", "So the transformer uses magnetic induction to change voltage while transferring power between its coils."),
        ],
        "scenes": [["hook", "Two coils exchange energy"], ["primary", "AC drives the primary winding"], ["core", "The core carries changing magnetic flux"], ["secondary", "Changing flux induces secondary voltage"], ["turns", "The turns ratio sets the voltage"], ["closing", "Magnetic induction changes voltage"]],
        "cues": cues("hook-transfer", "core-flux", "turns-up-down"),
    },
    {
        "id": "short-39-radar", "slug": "radar",
        "title": "How Radar Finds Distant Objects", "composition": "Short39Radar",
        "result": "how-radar-finds-distant-objects.mp4", "duration_s": 56.0, "target_voice_end_s": 47.0,
        "prompt": "Radar. Radio pulse. Antenna. Aircraft. Echo. Round-trip time. Speed of light. Range. Rotating antenna.",
        "music": "cinematic-min",
        "lines": [
            line("hook-echo", "hook", "A radar finds distant objects by sending out radio waves and listening for their echoes."),
            line("hook-dark", "hook", "This works in darkness because radio echoes do not need visible light."),
            line("transmit-pulse", "transmit", "The radar's transmitter creates a short radio pulse, and its antenna sends that pulse into space."),
            line("transmit-travel", "transmit", "The pulse travels outward at the speed of light until it reaches an object such as an aircraft."),
            line("echo-return", "echo", "Some radio energy reflects from the aircraft and returns toward the radar antenna."),
            line("range-time", "range", "The radar measures the echo's round-trip time to calculate distance."),
            line("range-half", "range", "Multiplying half that time by the speed of light gives the object's range."),
            line("scan-map", "scan", "A rotating antenna repeats this process in different directions, building a map of echoes around the radar."),
            line("closing-summary", "closing", "So radar locates objects by timing radio-wave echoes rather than relying on visible light."),
        ],
        "scenes": [["hook", "Radar sends waves and receives echoes"], ["transmit", "The antenna launches a radio pulse"], ["echo", "The object reflects an echo"], ["range", "Round-trip time becomes distance"], ["scan", "Repeated scans build an echo map"], ["closing", "Radio echoes reveal object locations"]],
        "cues": cues("hook-dark", "transmit-travel", "range-half"),
    },
    {
        "id": "short-40-mechanical-watch", "slug": "mechanical-watch",
        "title": "How a Mechanical Watch Keeps Time", "composition": "Short40MechanicalWatch",
        "result": "how-a-mechanical-watch-keeps-time.mp4", "duration_s": 60.0, "target_voice_end_s": 51.0,
        "prompt": "Mechanical watch. Mainspring. Barrel. Gear train. Watch hands. Escapement. Balance wheel. Hairspring.",
        "music": "ambient-pad",
        "lines": [
            line("hook-spring", "hook", "A mechanical watch keeps time using stored spring energy instead of a battery."),
            line("hook-meter", "hook", "Its clever mechanism releases that energy in tiny, evenly timed steps."),
            line("wind-store", "wind", "When you wind the watch, you tighten a mainspring inside a small drum called the barrel."),
            line("wind-release", "wind", "The mainspring slowly unwinds, turning the barrel and feeding energy into a series of gears."),
            line("gears-hands", "gears", "This gear train carries rotation toward the watch hands while reducing the motion into useful speeds."),
            line("escape-fast", "escape", "But left alone, the spring would release its energy much too quickly."),
            line("escape-meter", "escape", "The escapement meters that energy, allowing the gears to advance one small step at a time."),
            line("balance-regulate", "balance", "A balance wheel oscillates back and forth at a steady rate, telling the escapement when each step may happen."),
            line("closing-summary", "closing", "So the watch combines a steady oscillator, a controlled escapement, and gears to turn spring energy into accurate time."),
        ],
        "scenes": [["hook", "A watch meters stored spring energy"], ["wind", "The mainspring stores and releases energy"], ["gears", "The gear train carries motion to the hands"], ["escape", "The escapement releases discrete steps"], ["balance", "The balance wheel sets a steady rhythm"], ["closing", "Regulated energy becomes accurate time"]],
        "cues": cues("hook-meter", "wind-release", "balance-regulate"),
    },
]

config = {"defaults": {"duration_s": 56.0, "initial_silence_s": 0.7, "target_voice_end_s": 47.0, "fps": 30, "width": 1080, "height": 1920}, "projects": projects}
out = ROOT / "tools/shorts-36-40-projects.json"
out.write_text(json.dumps(config, indent=2) + "\n")
for project in projects:
    text = " ".join(x["text"] for x in project["lines"])
    print(project["id"], len(text.split()), "words", len(text), "characters", project["duration_s"], "seconds")
print(out)
