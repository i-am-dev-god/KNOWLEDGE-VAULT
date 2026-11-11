import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line } from '../../lib/next-calm';
import { CinematicBackground, DeviceStage, SceneHeading, SvgStage, X } from '../../lib/cinematic';
import { ClearLabel, HighlightPart, PanelLabel, StageNote } from '../../lib/clear-device';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short51MotionSensor', durationInSeconds: 42, fps: 30, width: 1080, height: 1920 };

// Rectified visual: seated sensor housing, crisp Fresnel zones, steady highlight — NO rotating mesh.
const SensorHousing: React.FC<{ x: number; y: number; w?: number; h?: number; t: number }> = ({ x, y, w = 420, h = 320, t }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={38} fill="#12263a" stroke={X.steel} strokeWidth={8} />
    <rect x={-w / 2 + 22} y={-h / 2 + 22} width={w - 44} height={h - 70} rx={26} fill="#0a1726" stroke={X.steel} strokeWidth={3} />
    {/* Fresnel lens seated flush with front face */}
    <rect x={-w / 2 + 18} y={-h / 2 + 18} width={w - 36} height={h - 108} rx={22} fill="#1d3a52" stroke={X.cyan} strokeWidth={5} />
    {Array.from({ length: 8 }, (_, i) => (
      <path key={i} d={`M ${-w / 2 + 30 + i * 47} ${-h / 2 + 30} V ${h / 2 - 90}`} stroke="rgba(100,230,223,0.22)" strokeWidth={2} />
    ))}
    <circle cx={0} cy={h / 2 - 38} r={16} fill={X.amber} stroke={X.white} strokeWidth={3} />
    <text x={28} y={h / 2 - 32} fill={X.amber} fontFamily="monospace" fontSize={16} fontWeight={700}>PIR</text>
  </g>
);

const ZoneOverlay: React.FC<{ x: number; y: number; active?: number }> = ({ x, y, active = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    {[ -160, -80, 0, 80, 160 ].map((dx, i) => (
      <g key={i} opacity={i === 2 ? 0.35 + active * 0.65 : 0.18}>
        <path d={`M 0 40 L ${dx - 30} 210 L ${dx + 30} 210 Z`} fill={i===2 ? X.amber : X.steel} fillOpacity={i===2?0.28:0.12} stroke={i===2? X.amber : X.steel} strokeWidth={2} strokeDasharray="8 8" />
      </g>
    ))}
    <rect x={-210} y={210} width={420} height={14} rx={7} fill="#34465a" />
  </g>
);

const Short51MotionSensor: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const lensHeat = prog(t, line(VO, 'lens-heat').start - 0.08, line(VO, 'lens-heat').start + 0.6);
  const lensWindows = prog(t, line(VO, 'lens-windows').start - 0.08, line(VO, 'lens-windows').start + 0.6);
  const sensorChange = prog(t, line(VO, 'sensor-change').start - 0.08, line(VO, 'sensor-change').start + 0.6);
  const sensorTrigger = prog(t, line(VO, 'sensor-trigger').start - 0.08, line(VO, 'sensor-trigger').start + 0.5);
  const switchRelay = prog(t, line(VO, 'switch-relay').start - 0.08, line(VO, 'switch-relay').start + 0.6);

  return (
    <AbsoluteFill style={{ background: X.night }}>
      <Scene t={t} id="hook" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.cyan} />
        <DeviceStage accent={X.cyan} />
        <SceneHeading eyebrow="Dark room, sensor on the wall" lines={['You enter,', 'light turns on']} accent={X.cyan} size={64} />
        <SvgStage>
          <PanelLabel text="WALL SENSOR → RELAY → CEILING LIGHT" color={X.cyan} />
          {/* Wall plane - seated */}
          <rect x={80} y={540} width={920} height={18} rx={9} fill="#20344e" />
          <rect x={80} y={558} width={920} height={560} rx={26} fill="#0f2135" stroke="#2a3b52" strokeWidth={6} />
          {/* Sensor precisely seated on wall surface (no floating gap) */}
          <SensorHousing x={540} y={790} w={340} h={260} t={t} />
          <ClearLabel x={540} y={485} text="Fresnel lens window" color={X.cyan} targetX={540} targetY={560} />
          {/* Person icon standing on floor line */}
          <g transform="translate(220 980)">
            <circle cx={0} cy={-140} r={42} fill="#d2dced" stroke={X.steel} strokeWidth={4} />
            <rect x={-34} y={-96} width={68} height={96} rx={18} fill="#d2dced" stroke={X.steel} strokeWidth={4} />
            <rect x={-36} y={0} width={26} height={88} rx={10} fill="#d2dced" />
            <rect x={10} y={0} width={26} height={88} rx={10} fill="#d2dced" />
            <rect x={-12} y={982-980} width={920- -0} height={0} />
          </g>
          {/* Light fixture - seated on ceiling */}
          <g transform="translate(820 620)">
            <rect x={-120} y={-18} width={240} height={36} rx={12} fill="#182d44" stroke={X.amber} strokeWidth={4} />
            <circle cx={0} cy={28} r={44} fill={switchRelay>0.1? X.amber : "#22364e"} stroke={X.amber} strokeWidth={4} opacity={0.55+switchRelay*0.45} />
            {[0,120,240].map((ang)=>(<path key={ang} d={`M 0 28 L ${Math.cos(ang*Math.PI/180)*62} ${28+Math.sin(ang*Math.PI/180)*62}`} stroke={X.amber} strokeWidth={3} opacity={switchRelay*0.55} />))}
          </g>
          <StageNote text="A wall sensor watches for body heat" color={X.cyan} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="lens" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.cyan} />
        <DeviceStage accent={X.cyan} />
        <SceneHeading eyebrow="Lens in front of the detector" lines={['One lens,', 'many zones']} accent={X.cyan} size={60} />
        <SvgStage>
          <PanelLabel text="FRESNEL LENS · 5 ZONES" color={X.cyan} />
          <SensorHousing x={540} y={720} w={520} h={360} t={t} />
          <ZoneOverlay x={540} y={980} active={lensWindows} />
          <ClearLabel x={540} y={540} text="Fresnel facets focus heat" color={X.cyan} />
          <ClearLabel x={340} y={1150} text="Zone A" color={X.steel} size={19} />
          <ClearLabel x={540} y={1150} text="Zone C" color={X.amber} size={19} />
          <ClearLabel x={740} y={1150} text="Zone E" color={X.steel} size={19} />
          {lensHeat>0.05 && <HighlightPart x={280} y={540} width={520} height={360} color={X.cyan} opacity={lensHeat*0.5} />}
          <StageNote text={lensWindows>0.3 ? "Each facet looks at a different slice of the room" : "Body heat passes through the lens to the detector"} color={X.cyan} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="sensor" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.amber} />
        <DeviceStage accent={X.amber} />
        <SceneHeading eyebrow="Two sensing windows compare heat" lines={['Steady = no trigger', 'changing = movement']} accent={X.amber} size={56} />
        <SvgStage>
          <PanelLabel text="PIR · TWO ELEMENTS COMPARE" color={X.amber} />
          {/* Two window comparator - seated side by side with no gap misalignment */}
          <g transform="translate(540 850)">
            <rect x={-420} y={-180} width={400} height={280} rx={28} fill="#12263a" stroke={X.steel} strokeWidth={6} />
            <rect x={20} y={-180} width={400} height={280} rx={28} fill="#12263a" stroke={X.amber} strokeWidth={6} opacity={0.35+sensorChange*0.65} />
            <rect x={-380} y={-140} width={320} height={180} rx={18} fill={sensorChange>0.2 ? "#22364e":"#0a1726"} stroke={X.steel} strokeWidth={3} />
            <rect x={60} y={-140} width={320} height={180} rx={18} fill={sensorChange>0.5 ? X.amber : "#0a1726"} fillOpacity={0.12+sensorChange*0.18} stroke={X.amber} strokeWidth={3} />
            <ClearLabel x={-220} y={-210} text="Window A" color={X.steel} size={20} />
            <ClearLabel x={220} y={-210} text="Window B" color={X.amber} size={20} />
            <text x={-220} y={-40} textAnchor="middle" fill={X.steel} fontFamily="monospace" fontWeight={700} fontSize={42}>1.2 V</text>
            <text x={220} y={-40} textAnchor="middle" fill={X.amber} fontFamily="monospace" fontWeight={700} fontSize={42}>{sensorChange>0.4? "1.8 V":"1.2 V"}</text>
            <rect x={-110} y={60} width={220} height={54} rx={14} fill={sensorTrigger>0.1? X.amber : "#20344e"} stroke={X.amber} strokeWidth={4} />
            <text x={0} y={94} textAnchor="middle" fill={sensorTrigger>0.1? X.night:"#8b9bb3"} fontFamily="monospace" fontWeight={800} fontSize={18}>{sensorTrigger>0.1? "TRIGGER":"IDLE"}</text>
            <path d="M -20 -60 L 20 -60" stroke={X.amber} strokeWidth={5} strokeLinecap="round" opacity={sensorChange} />
          </g>
          {sensorTrigger>0.05 && <HighlightPart x={120} y={670} width={840} height={360} color={X.amber} opacity={sensorTrigger*0.55} />}
          <StageNote text={sensorTrigger>0.1 ? "Difference large enough — sensor fires" : "Both windows see same heat — no trigger"} color={X.amber} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="switch" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.green} />
        <DeviceStage accent={X.green} />
        <SceneHeading eyebrow="Trigger closes a power switch" lines={['Small signal,', 'big power switch']} accent={X.green} size={60} />
        <SvgStage>
          <PanelLabel text="CONTROLLER → RELAY → LIGHT" color={X.green} />
          <g transform="translate(540 880)">
            <rect x={-460} y={-120} width={280} height={140} rx={24} fill="#12263a" stroke={X.cyan} strokeWidth={5} />
            <text x={-320} y={-45} textAnchor="middle" fill={X.cyan} fontFamily="monospace" fontWeight={700} fontSize={18}>CONTROLLER</text>
            <text x={-320} y={-15} textAnchor="middle" fill={X.white} fontFamily="monospace" fontSize={16}>TRIGGER IN</text>
            <rect x={120} y={-120} width={320} height={140} rx={24} fill={switchRelay>0.1? "#1a3d2f" : "#12263a"} stroke={X.green} strokeWidth={5+switchRelay*3} />
            <rect x={150} y={-90} width={110} height={80} rx={12} fill={switchRelay>0.1? X.green : "#2a3b52"} stroke={X.white} strokeWidth={3} />
            <circle cx={280} cy={-50} r={14} fill={switchRelay>0.1? X.white:"#5a6b82"} />
            <text x={280} y={-45} textAnchor="middle" fill={X.green} fontFamily="monospace" fontWeight={800} fontSize={15}>RELAY</text>
            <path d="M -180 -50 H 120" stroke={X.cyan} strokeWidth={6} opacity={switchRelay?1:0.45} />
            <circle cx={-90} cy={-50} r={8} fill={X.cyan} opacity={switchRelay?1:0.35} />
            <path d="M 440 -50 H 560" stroke={X.amber} strokeWidth={8} opacity={0.2+switchRelay*0.8} />
            <ClearLabel x={-320} y={85} text="Low-voltage signal" color={X.cyan} size={18} />
            <ClearLabel x={280} y={85} text={switchRelay>0.1? "Relay closed — light ON":"Relay open"} color={X.green} size={18} />
          </g>
          {switchRelay>0.05 && <HighlightPart x={660} y={760} width={320} height={140} color={X.green} opacity={switchRelay*0.45} />}
          <StageNote text="Controller uses the small trigger to switch mains power" color={X.green} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="closing" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.cyan} />
        <DeviceStage accent={X.cyan} />
        <SceneHeading eyebrow="Whole chain, no extra motion" lines={['Heat pattern', 'becomes light']} accent={X.cyan} size={62} />
        <SvgStage>
          <PanelLabel text="LENS → PIR → RELAY → LIGHT" color={X.cyan} />
          <g transform="translate(540 860)">
            {[
              { x: -360, label: "Lens zones", color: X.cyan },
              { x: -120, label: "PIR compare", color: X.amber },
              { x: 120, label: "Trigger", color: X.cyan },
              { x: 360, label: "Light ON", color: X.green },
            ].map((step)=>(
              <g key={step.label} transform={`translate(${step.x} 0)`}>
                <rect x={-92} y={-72} width={184} height={144} rx={22} fill="#12263a" stroke={step.color} strokeWidth={4} />
                <line x1={92} y1={0} x2={148} y2={0} stroke={X.steel} strokeWidth={4} strokeDasharray="7 7" opacity={step.x===360?0:1} />
                <text x={0} y={12} textAnchor="middle" fill={X.white} fontFamily="monospace" fontWeight={700} fontSize={15}>{step.label}</text>
              </g>
            ))}
          </g>
          <StageNote text="Focused heat, changing pattern, relay — movement turns to light" color={X.cyan} />
        </SvgStage>
      </Scene>
      <CalmCaptions lines={VO} accentWords={['Fresnel lens','invisible heat','separate zones','changing pattern','PIR sensor','trigger signal','relay','movement into light']} />
      <CalmSound narration="voiceovers/motion-sensor/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO,'closing-summary').end} duration={42} />
    </AbsoluteFill>
  );
};
export default Short51MotionSensor;
