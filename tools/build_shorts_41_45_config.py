#!/usr/bin/env python3
"""Build the result-first Shorts 41–45 narration and timing configuration."""
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
        41, "induction-cooktop", "How an Induction Cooktop Heats a Pan",
        "Short41InductionCooktop", "how-an-induction-cooktop-heats-a-pan.mp4", 39,
        "Induction cooktop. Copper coil. Alternating current. Magnetic field. Eddy currents. Resistance. Ferromagnetic pan.",
        "ambient-pad",
        [
            ("hook-heat", "hook", "This pan heats on an induction cooktop without a directly heated burner."),
            ("hook-field", "hook", "The cooktop sends energy into the pan using a changing magnetic field."),
            ("coil-current", "coil", "Below the glass, high-frequency alternating current flows through a copper coil."),
            ("pan-currents", "currents", "That field drives circular electric currents inside the magnetic metal pan."),
            ("pan-resistance", "currents", "Electrical resistance turns their energy into heat, so the pan itself gets hot."),
            ("food-conduction", "control", "The pan then conducts that heat into the food."),
            ("pan-requirement", "control", "A suitable magnetic pan is essential; ordinary glass or copper alone will not work."),
            ("closing-summary", "closing", "So the coil creates the field, but the resistant pan becomes the heater."),
        ],
        [["hook", "The pan is the heater"], ["coil", "The coil creates a changing field"], ["currents", "The pan produces heat"], ["control", "Heat reaches the food"], ["closing", "Field in the coil, heat in the pan"]],
        [("hook-field", -0.08, "scan-hum", -25, "Reveal the hidden energy transfer"), ("coil-current", -0.08, "ui-click-soft", -25, "Expose the induction coil"), ("pan-currents", -0.08, "pop-reveal", -24, "Start the pan currents"), ("closing-summary", -0.12, "warm-shimmer", -22, "Resolve the heating chain")],
    ),
    project(
        42, "smoke-detector", "How a Smoke Detector Senses Smoke",
        "Short42SmokeDetector", "how-a-smoke-detector-senses-smoke.mp4", 43.5,
        "Photoelectric smoke detector. LED. Dark chamber. Light sensor. Smoke particles. Scattering. Alarm.",
        "cinematic-min",
        [
            ("hook-alarm", "hook", "This smoke detector can sound the alarm before flames are visible."),
            ("hook-scatter", "hook", "Inside this photoelectric detector, smoke reveals itself by scattering a hidden beam of light."),
            ("clear-beam", "chamber", "In clear air, an LED sends light across a dark chamber."),
            ("clear-sensor", "chamber", "The light sensor sits off to one side, so the straight beam normally misses it."),
            ("smoke-scatter", "smoke", "When smoke enters, tiny particles scatter some of that light toward the sensor."),
            ("smoke-alarm", "smoke", "The sensor's signal rises, and the electronics trigger the loud alarm."),
            ("smouldering-use", "use", "It is especially useful for slow, smouldering fires that produce visible smoke."),
            ("closing-summary", "closing", "So the detector does not smell smoke; it notices smoke scattering light into its sensor."),
        ],
        [["hook", "Smoke triggers the alarm"], ["chamber", "Clear air keeps the sensor dark"], ["smoke", "Smoke redirects the light"], ["use", "A useful warning for smouldering fires"], ["closing", "Scattered light becomes a warning"]],
        [("hook-scatter", -0.08, "scan-hum", -25, "Reveal the optical chamber"), ("smoke-scatter", -0.08, "ui-click-soft", -24, "Scatter light onto the sensor"), ("smoke-alarm", 0.1, "pop-reveal", -23, "Trigger the alarm"), ("closing-summary", -0.12, "warm-shimmer", -22, "Resolve the sensing chain")],
    ),
    project(
        43, "hydraulic-lift", "How a Hydraulic Lift Raises a Car",
        "Short43HydraulicLift", "how-a-hydraulic-lift-raises-a-car.mp4", 43.5,
        "Hydraulic car lift. Pump. Input piston. Oil. Pressure. Lifting piston. Force. Valve.",
        "cinematic-min",
        [
            ("hook-lift", "hook", "This hydraulic lift raises a heavy car using pressure in trapped oil."),
            ("hook-area", "hook", "A small input piston can multiply force because the lifting piston has a much larger area."),
            ("pump-oil", "pump", "The pump pushes nearly incompressible oil into the lift cylinder."),
            ("pump-pressure", "pump", "Pressure spreads through the fluid and acts across the large piston."),
            ("lift-force", "lift", "Force equals pressure times area, so that piston produces a powerful upward push."),
            ("lift-motion", "lift", "As oil enters, the piston and lift arms rise together, carrying the car."),
            ("valve-control", "control", "A closed valve traps the oil to hold the car; opening it allows a controlled descent."),
            ("closing-summary", "closing", "So confined oil turns a compact pump into smooth, controlled lifting power."),
        ],
        [["hook", "Oil pressure lifts the car"], ["pump", "The pump pressurizes confined oil"], ["lift", "Pressure becomes lifting force"], ["control", "The valve controls holding and descent"], ["closing", "Pressure becomes controlled motion"]],
        [("hook-area", -0.08, "scan-hum", -25, "Reveal the two piston sizes"), ("pump-oil", -0.08, "ui-click-soft", -25, "Push oil into the cylinder"), ("lift-force", -0.08, "pop-reveal", -24, "Raise the lifting piston"), ("closing-summary", -0.12, "warm-shimmer", -22, "Resolve the hydraulic chain")],
    ),
    project(
        44, "pressure-cooker", "How a Pressure Cooker Cooks Faster",
        "Short44PressureCooker", "how-a-pressure-cooker-cooks-faster.mp4", 40,
        "Pressure cooker. Sealed lid. Steam. Pressure regulator. Boiling point. Safety valve. Heat.",
        "ambient-pad",
        [
            ("hook-faster", "hook", "This pressure cooker cooks faster by making water boil at a higher temperature."),
            ("hook-seal", "hook", "Its sealed lid traps steam, so pressure builds above the food."),
            ("steam-form", "pressure", "Heating turns some water into steam inside the limited space."),
            ("steam-regulate", "pressure", "The regulator holds the pressure at its designed cooking level."),
            ("heat-boiling", "heat", "At that higher pressure, water can stay liquid beyond its normal boiling point."),
            ("heat-food", "heat", "The hotter water and steam transfer energy into food more quickly."),
            ("safety-release", "safety", "A locking lid and safety valve help control excess pressure, and the cooker must depressurize before opening."),
            ("closing-summary", "closing", "So trapped steam raises the boiling temperature, and the hotter cooking medium speeds up the meal."),
        ],
        [["hook", "Trapped steam enables faster cooking"], ["pressure", "Steam raises the pressure"], ["heat", "Higher pressure raises the boiling point"], ["safety", "Pressure is limited and released"], ["closing", "Hotter water and steam cook faster"]],
        [("hook-seal", -0.08, "scan-hum", -25, "Seal the cooking chamber"), ("steam-regulate", -0.08, "ui-click-soft", -25, "Regulate the steam pressure"), ("heat-boiling", -0.08, "pop-reveal", -24, "Compare the boiling temperatures"), ("closing-summary", -0.12, "warm-shimmer", -22, "Resolve the cooking chain")],
    ),
    project(
        45, "electric-kettle", "How an Electric Kettle Switches Off",
        "Short45ElectricKettle", "how-an-electric-kettle-switches-off.mp4", 36,
        "Electric kettle. Boiling water. Steam channel. Thermostat. Bimetallic strip. Mechanical switch. Heating element.",
        "cinematic-min",
        [
            ("hook-off", "hook", "This electric kettle switches itself off when the water boils."),
            ("hook-thermostat", "hook", "A small steam-activated thermostat makes that automatic decision."),
            ("element-heat", "steam", "While heating, an electric element sends heat into the water."),
            ("steam-travel", "steam", "When the water boils, steam rises through a small channel toward the thermostat."),
            ("steam-bimetal", "steam", "Inside it, a bimetallic strip made of two metals bends as steam heats it."),
            ("switch-expand", "switch", "The two metals expand by different amounts, forcing the strip to curve."),
            ("switch-open", "switch", "That movement trips a mechanical switch and disconnects the heating element."),
            ("closing-summary", "closing", "So boiling water creates the steam signal that physically cuts the kettle's power."),
        ],
        [["hook", "Boiling water cuts the power"], ["steam", "Steam carries the boil signal"], ["switch", "The thermostat opens the switch"], ["closing", "Steam becomes an automatic shutoff"]],
        [("hook-thermostat", -0.08, "scan-hum", -25, "Reveal the steam thermostat"), ("steam-travel", -0.08, "ui-click-soft", -25, "Send steam through the channel"), ("switch-open", -0.08, "pop-reveal", -23, "Trip the power switch"), ("closing-summary", -0.12, "warm-shimmer", -22, "Resolve the shutoff chain")],
    ),
]

config = {
    "defaults": {
        "duration_s": 46.0,
        "initial_silence_s": 0.15,
        "target_voice_end_s": 45.1,
        "fps": 30,
        "width": 1080,
        "height": 1920,
    },
    "projects": projects,
}
out = ROOT / "tools" / "shorts-41-45-projects.json"
out.write_text(json.dumps(config, indent=2) + "\n")
print(f"Wrote {out.relative_to(ROOT)} with {len(projects)} result-first projects")
for p in projects:
    print(p["composition"], p["duration_s"], "seconds", len(p["lines"]), "captions", len(p["scenes"]), "scenes")
