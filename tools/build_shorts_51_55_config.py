#!/usr/bin/env python3
"""Build the result-first Shorts 51–55 narration and timing configuration.

Rectified visuals per feedback 2026-11-07:
- No rotating mesh/circle highlight — use solid HighlightPart (steady outline + faint fill)
- Objects physically seated: every contact has explicit x/y snap, no floating gaps
- One primary action per beat, oversized safe fonts, calm motion
"""
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
        51, "motion-sensor", "How a Motion Sensor Turns On Your Light",
        "Short51MotionSensor", "how-a-motion-sensor-turns-on-your-light.mp4", 42,
        "Motion sensor. PIR. Infrared heat. Fresnel lens. Window. Comparator. Relay. Light.",
        "ambient-pad",
        [
            ("hook-dark", "hook", "You walk into a dark room, and the light turns on by itself."),
            ("hook-question", "hook", "A small motion sensor on the wall made that decision."),
            ("lens-heat", "lens", "Behind its window, a Fresnel lens focuses invisible heat from your body onto a sensor."),
            ("lens-windows", "lens", "The lens divides the room into separate zones, so movement creates a changing pattern."),
            ("sensor-change", "sensor", "A PIR sensor compares the heat in different windows and detects that change."),
            ("sensor-trigger", "sensor", "When the pattern shifts enough, the sensor sends a brief trigger signal."),
            ("switch-relay", "switch", "A controller uses that signal to close a relay and power the light."),
            ("closing-summary", "closing", "So focused heat, a changing pattern, and a relay turn your movement into light."),
        ],
        [["hook", "Motion turns dark to light"], ["lens", "The lens splits the room into zones"], ["sensor", "The PIR sensor sees a heat change"], ["switch", "A relay switches the light on"], ["closing", "Movement becomes light"]],
        [("lens-windows", -0.08, "scan-hum", -25, "Reveal the zoned lens"), ("sensor-change", -0.08, "ui-click-soft", -25, "Detect the heat change"), ("switch-relay", -0.08, "pop-reveal", -24, "Close the relay"), ("closing-summary", -0.12, "warm-shimmer", -22, "Resolve the motion chain")],
    ),
    project(
        52, "ir-thermometer", "How an Infrared Thermometer Reads Temperature Without Touch",
        "Short52IrThermometer", "how-an-infrared-thermometer-reads-temperature-without-touch.mp4", 40,
        "Infrared thermometer. Infrared radiation. Lens. Thermopile. Filter. Emissivity. Trigger. Display.",
        "ambient-pad",
        [
            ("hook-point", "hook", "Point this thermometer, press the trigger, and you get a temperature without touching anything."),
            ("hook-infrared", "hook", "It does not measure air. It measures invisible infrared light coming from the surface."),
            ("lens-focus", "lens", "A lens gathers that infrared radiation and focuses it onto a tiny detector."),
            ("filter-band", "filter", "A filter keeps only the heat-related wavelengths and blocks other light."),
            ("sensor-voltage", "sensor", "The thermopile detector turns that focused heat into a small voltage."),
            ("process-table", "process", "Electronics compare that voltage to a calibration table to determine temperature."),
            ("display-emissivity", "display", "Settings like emissivity adjust the reading for different surface materials."),
            ("closing-summary", "closing", "So focused infrared light becomes a voltage, and that voltage becomes a temperature."),
        ],
        [["hook", "Temperature without touch"], ["lens", "The lens gathers infrared"], ["filter", "A filter keeps the heat signal"], ["sensor", "Heat creates a voltage"], ["process", "A table turns voltage into temperature"], ["display", "Material settings tune accuracy"], ["closing", "Infrared becomes temperature"]],
        [("lens-focus", -0.08, "scan-hum", -25, "Gather infrared"), ("sensor-voltage", -0.08, "ui-click-soft", -25, "Generate voltage"), ("process-table", -0.08, "pop-reveal", -24, "Look up temperature"), ("closing-summary", -0.12, "warm-shimmer", -22, "Resolve the thermometer chain")],
    ),
    project(
        53, "portrait-mode", "How Your Phone Blurs the Background in Portrait Mode",
        "Short53PortraitMode", "how-your-phone-blurs-the-background-in-portrait-mode.mp4", 43,
        "Portrait mode. Dual camera. Depth map. Disparity. Segmentation. Blur. Bokeh.",
        "cinematic-min",
        [
            ("hook-blur", "hook", "In portrait mode, your phone keeps you sharp while the background turns soft and blurry."),
            ("hook-not-lens", "hook", "That blur is not from a large lens. It is added after the photo is taken."),
            ("capture-two", "capture", "The phone captures the same scene with two lenses or two focus positions to measure depth."),
            ("depth-map", "depth", "Software builds a depth map, marking how far each part of the picture is from the camera."),
            ("cut-person", "cutout", "It then cuts out the person as the sharp foreground."),
            ("blur-background", "blur", "Everything marked as background is blurred with a soft bokeh effect."),
            ("edge-hair", "edge", "Edge refinement keeps difficult areas like hair sharp while the rest of the background stays blurred."),
            ("closing-summary", "closing", "So measured depth and a precise cutout turn a regular photo into a portrait with blurred background."),
        ],
        [["hook", "Sharp subject, blurred background"], ["capture", "Two views measure depth"], ["depth", "A depth map separates near and far"], ["cutout", "The phone isolates the person"], ["blur", "Background gets blurred"], ["edge", "Edges keep fine detail sharp"], ["closing", "Depth creates portrait blur"]],
        [("capture-two", -0.08, "scan-hum", -25, "Capture two views"), ("cut-person", -0.08, "ui-click-soft", -25, "Cut out the subject"), ("blur-background", -0.08, "pop-reveal", -24, "Apply background blur"), ("closing-summary", -0.12, "warm-shimmer", -22, "Resolve portrait chain")],
    ),
    project(
        54, "autofocus", "How Autofocus Finds Sharp Focus Instantly",
        "Short54Autofocus", "how-autofocus-finds-sharp-focus-instantly.mp4", 41,
        "Autofocus. Phase detection. Contrast detection. Lens. Sensor. Split image. Peak contrast. Motor.",
        "ambient-pad",
        [
            ("hook-blurry", "hook", "You tap to focus, and a blurry scene snaps sharp in a fraction of a second."),
            ("hook-old", "hook", "Early cameras had to hunt back and forth to guess the right lens position."),
            ("split-pair", "split", "Modern autofocus creates two copies of the same subject from opposite sides of the lens."),
            ("split-align", "split", "When the subject is out of focus, those copies are separated. When focused, they align."),
            ("measure-distance", "measure", "The camera measures that separation to know exactly how far and which direction to move the lens."),
            ("drive-lens", "drive", "A focus motor then drives the lens directly to the calculated position."),
            ("contrast-refine", "refine", "Contrast detection then makes a final tiny adjustment for peak sharpness."),
            ("closing-summary", "closing", "So split images tell the camera where to go, and the lens moves straight to sharp focus."),
        ],
        [["hook", "Blurry to sharp instantly"], ["split", "Split images reveal focus error"], ["measure", "Separation tells distance and direction"], ["drive", "The motor jumps to focus"], ["refine", "Contrast adds final polish"], ["closing", "Measure error, move lens, snap sharp"]],
        [("split-pair", -0.08, "scan-hum", -25, "Split the image"), ("measure-distance", -0.08, "ui-click-soft", -25, "Measure separation"), ("drive-lens", -0.08, "pop-reveal", -24, "Drive the lens"), ("closing-summary", -0.12, "warm-shimmer", -22, "Resolve focus chain")],
    ),
    project(
        55, "touchpad", "How a Touchpad Knows Tap vs Swipe",
        "Short55Touchpad", "how-a-touchpad-knows-tap-vs-swipe.mp4", 42,
        "Touchpad. Capacitive grid. Finger capacitance. Controller. Position. Velocity. Gesture. Click.",
        "ambient-pad",
        [
            ("hook-pad", "hook", "A tap clicks. A swipe scrolls. The touchpad has no buttons, yet it knows the difference."),
            ("hook-grid", "hook", "Under the surface, a grid of capacitive electrodes watches your finger."),
            ("sense-grid", "sense", "Each finger changes the electrical signal at its position on the grid."),
            ("track-position", "track", "A controller scans the whole grid many times per second to track where you touch."),
            ("gesture-velocity", "gesture", "Software then compares position over time. A short stationary touch is a tap."),
            ("gesture-swipe", "gesture", "A continued movement in one direction becomes a swipe, with speed setting scroll amount."),
            ("hardware-click", "hardware", "Pressing harder flexes the pad against a physical switch for a firm click."),
            ("closing-summary", "closing", "So a scanned grid, tracked motion, and timing turn finger movement into tap or swipe."),
        ],
        [["hook", "No buttons, yet it knows"], ["sense", "A grid senses finger capacitance"], ["track", "The controller tracks position constantly"], ["gesture", "Motion over time becomes gesture"], ["hardware", "A press gives a physical click"], ["closing", "Grid, motion, and timing decide gesture"]],
        [("sense-grid", -0.08, "scan-hum", -25, "Sense the capacitive grid"), ("gesture-velocity", -0.08, "ui-click-soft", -25, "Classify tap versus swipe"), ("hardware-click", -0.08, "pop-reveal", -24, "Physical switch click"), ("closing-summary", -0.12, "warm-shimmer", -22, "Resolve touchpad chain")],
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
out = ROOT / "tools" / "shorts-51-55-projects.json"
out.write_text(json.dumps(config, indent=2) + "\n")
print(f"Wrote {out.relative_to(ROOT)} with {len(projects)} rectified projects")
for p in projects:
    print(p["composition"], p["duration_s"], "seconds", len(p["lines"]), "captions", len(p["scenes"]), "scenes")
