#!/usr/bin/env python3
"""Build the result-first Shorts 46–50 narration and timing configuration."""
from pathlib import Path
import json

ROOT = Path(__file__).resolve().parents[1]


def project(number, slug, title, composition, result, duration, prompt, music, lines, scenes, cues):
    return {
        "id": f"short-{number}-{slug}",
        "slug": slug,
        "title": title,
        "composition": composition,
        "result": result,
        "duration_s": float(duration),
        "target_voice_end_s": float(duration) - 0.9,
        "prompt": prompt,
        "music": music,
        "lines": [{"id": x[0], "scene": x[1], "text": x[2]} for x in lines],
        "scenes": scenes,
        "cues": [
            {"sync_source": x[0], "offset_s": x[1], "sfx_id": x[2], "gain_db": x[3], "cue": x[4]}
            for x in cues
        ],
    }


projects = [
    project(
        46, "vacuum-cleaner", "How a Vacuum Cleaner Pulls Up Dirt",
        "Short46VacuumCleaner", "how-a-vacuum-cleaner-pulls-up-dirt.mp4", 42,
        "Vacuum cleaner. Nozzle. Fan. Air pressure. Airflow. Dust. Cyclone. Filter. Collection bin.",
        "ambient-pad",
        [
            ("hook-pickup", "hook", "This vacuum cleaner lifts dirt from the floor and carries it into a collection bin."),
            ("hook-airflow", "hook", "It does this by creating a continuous airflow, not by pulling on each particle directly."),
            ("fan-motor", "fan", "An electric motor spins a fan that pushes air out of the cleaner."),
            ("fan-pressure", "fan", "That lowers the air pressure inside, so room air rushes in through the nozzle."),
            ("path-carry", "path", "The moving air carries loose dust and debris along the suction path."),
            ("path-separate", "path", "A cyclone or filter separates the dirt from that air before the air leaves the machine."),
            ("filter-maintenance", "filter", "A clogged filter restricts airflow, which is why cleaning it can restore cleaning performance."),
            ("closing-summary", "closing", "So the fan starts an airflow, and the moving air transports dirt into the vacuum."),
        ],
        [["hook", "Airflow carries dirt into the vacuum"], ["fan", "The fan creates a pressure difference"], ["path", "Moving air transports and separates dirt"], ["filter", "Clean filters preserve airflow"], ["closing", "Fan, airflow, and collection form one chain"]],
        [("hook-airflow", -0.08, "scan-hum", -25, "Reveal the suction airflow"), ("fan-motor", -0.08, "ui-click-soft", -25, "Start the motor and fan"), ("path-separate", -0.08, "pop-reveal", -24, "Separate dirt from air"), ("closing-summary", -0.12, "warm-shimmer", -22, "Resolve the airflow chain")],
    ),
    project(
        47, "digital-scale", "How a Digital Scale Measures Weight",
        "Short47DigitalScale", "how-a-digital-scale-measures-weight.mp4", 40.5,
        "Digital weighing scale. Load cell. Strain gauge. Resistance. Voltage. Amplifier. Digital reading. Calibration. Tare.",
        "cinematic-min",
        [
            ("hook-reading", "hook", "Place an object on this digital scale, and its weight appears as a number."),
            ("hook-bend", "hook", "Inside, the platform bends a tiny metal element by an extremely small amount."),
            ("loadcell-cell", "loadcell", "That element is a load cell, built to deform predictably under force."),
            ("loadcell-gauges", "loadcell", "Thin strain gauges attached to it stretch or compress along with the metal."),
            ("signal-resistance", "signal", "Their electrical resistance changes, producing a small voltage signal."),
            ("signal-digital", "signal", "The scale's electronics amplify and convert that signal into a digital reading."),
            ("use-tare", "use", "Calibration relates the reading to weight units, while tare subtracts the container."),
            ("closing-summary", "closing", "So a tiny mechanical bend becomes the number you see on the scale."),
        ],
        [["hook", "Weight becomes a tiny mechanical bend"], ["loadcell", "The load cell deforms under force"], ["signal", "Resistance becomes an electrical reading"], ["use", "Calibration and tare make the reading useful"], ["closing", "Mechanical strain becomes a number"]],
        [("hook-bend", -0.08, "scan-hum", -25, "Reveal the hidden load cell"), ("loadcell-gauges", -0.08, "ui-click-soft", -25, "Focus on the strain gauges"), ("signal-digital", -0.08, "pop-reveal", -24, "Convert the signal to digits"), ("closing-summary", -0.12, "warm-shimmer", -22, "Resolve the weighing chain")],
    ),
    project(
        48, "automatic-faucet", "How an Automatic Faucet Senses Your Hands",
        "Short48AutomaticFaucet", "how-an-automatic-faucet-senses-your-hands.mp4", 39.5,
        "Automatic faucet. Infrared LED. Infrared receiver. Reflection. Hands. Controller. Solenoid valve. Water flow.",
        "ambient-pad",
        [
            ("hook-water", "hook", "Put your hands under this automatic faucet, and water starts without a touch."),
            ("hook-sensor", "hook", "A small infrared sensor near the spout detects that your hands are there."),
            ("emit-pulses", "emit", "An infrared LED sends out pulses of light that people cannot see."),
            ("emit-clear", "emit", "With no hands nearby, that light travels away and little returns to the receiver."),
            ("reflect-hands", "reflect", "Your hands reflect some of the infrared light back toward the sensor."),
            ("reflect-valve", "reflect", "When the returned signal is strong enough, a controller opens a solenoid valve."),
            ("valve-remove", "valve", "Remove your hands, the reflection disappears, and the valve closes again."),
            ("closing-summary", "closing", "So the faucet turns reflected infrared light into water flow without touch."),
        ],
        [["hook", "Hands trigger water without touch"], ["emit", "The sensor emits invisible infrared pulses"], ["reflect", "Hands return light to the receiver"], ["valve", "The solenoid valve starts and stops water"], ["closing", "Reflected light becomes hands-free control"]],
        [("hook-sensor", -0.08, "scan-hum", -25, "Reveal the infrared sensor"), ("emit-pulses", -0.08, "ui-click-soft", -25, "Emit infrared pulses"), ("reflect-valve", -0.08, "pop-reveal", -23, "Open the water valve"), ("closing-summary", -0.12, "warm-shimmer", -22, "Resolve the sensing chain")],
    ),
    project(
        49, "washing-machine", "How a Washing Machine Spins Water Out of Clothes",
        "Short49WashingMachine", "how-a-washing-machine-spins-water-out-of-clothes.mp4", 40,
        "Washing machine. Spin cycle. Drum. Wet clothes. Water. Inertia. Perforations. Outer tub. Drain pump. Balanced load.",
        "cinematic-min",
        [
            ("hook-dry", "hook", "This washing machine removes water from wet clothes by spinning the drum rapidly."),
            ("hook-retain", "hook", "The clothes stay against the drum wall while water escapes."),
            ("spin-inward", "spin", "The drum wall pushes inward on the clothes to keep them moving in a circle."),
            ("spin-water", "spin", "Water is not held in the same way, so it can move outward through the fabric."),
            ("drain-holes", "drain", "The drum's small holes let that water pass into the outer tub."),
            ("drain-pump", "drain", "A pump then drains the water away while the clothes stay inside the perforated drum."),
            ("balance-load", "balance", "A balanced load keeps the drum stable and lets it reach an effective spin speed."),
            ("closing-summary", "closing", "So rotation, perforations, and drainage remove water without squeezing the clothes."),
        ],
        [["hook", "Spinning removes water from clothes"], ["spin", "The drum guides clothes while water moves outward"], ["drain", "Perforations and a pump remove the water"], ["balance", "A balanced load enables a stable fast spin"], ["closing", "Rotation and drainage dry the load"]],
        [("hook-retain", -0.08, "scan-hum", -25, "Reveal the spinning drum"), ("spin-water", -0.08, "ui-click-soft", -25, "Separate water from fabric"), ("drain-pump", -0.08, "pop-reveal", -24, "Drain the extracted water"), ("closing-summary", -0.12, "warm-shimmer", -22, "Resolve the spin-drying chain")],
    ),
    project(
        50, "led-bulb", "How an LED Bulb Makes Light",
        "Short50LedBulb", "how-an-led-bulb-makes-light.mp4", 45.5,
        "LED bulb. Semiconductor. Driver. Direct current. Electrons. Holes. Junction. Photons. Phosphor. Diffuser. Heat sink.",
        "ambient-pad",
        [
            ("hook-light", "hook", "This LED bulb produces bright light while using much less power than an old incandescent bulb."),
            ("hook-chips", "hook", "Its light comes from tiny semiconductor chips, not from a glowing metal filament."),
            ("driver-current", "driver", "The bulb's driver changes household electricity into a controlled direct current."),
            ("junction-carriers", "junction", "Inside each LED, electrons and holes move toward a junction in the semiconductor."),
            ("junction-photons", "junction", "When they recombine, they release energy as photons, which are particles of light."),
            ("white-phosphor", "white", "The chip's materials set the light's color, and a phosphor coating can create white light."),
            ("white-diffuse", "white", "A diffuser spreads that light evenly, while the metal body carries heat away."),
            ("closing-summary", "closing", "So controlled current powers semiconductor junctions that turn electrical energy directly into light."),
        ],
        [["hook", "Semiconductor chips make the light"], ["driver", "The driver supplies controlled current"], ["junction", "Recombining charges release photons"], ["white", "Phosphor, diffusion, and cooling make a useful bulb"], ["closing", "Electrical energy becomes light directly"]],
        [("hook-chips", -0.08, "scan-hum", -25, "Reveal the semiconductor chips"), ("driver-current", -0.08, "ui-click-soft", -25, "Supply controlled current"), ("junction-photons", -0.08, "pop-reveal", -23, "Release photons at the junction"), ("closing-summary", -0.12, "warm-shimmer", -22, "Resolve the light-production chain")],
    ),
]

config = {
    "defaults": {
        "duration_s": 42.0,
        "initial_silence_s": 0.15,
        "target_voice_end_s": 41.1,
        "fps": 30,
        "width": 1080,
        "height": 1920,
    },
    "projects": projects,
}
out = ROOT / "tools" / "shorts-46-50-projects.json"
out.write_text(json.dumps(config, indent=2) + "\n")
print(f"Wrote {out.relative_to(ROOT)} with {len(projects)} result-first projects")
for p in projects:
    print(p["composition"], p["duration_s"], "seconds", len(p["lines"]), "captions", len(p["scenes"]), "scenes")
