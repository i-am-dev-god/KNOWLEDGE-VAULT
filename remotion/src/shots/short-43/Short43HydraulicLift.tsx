import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line } from '../../lib/next-calm';
import { Arrow, FocusRing, MovingDots } from '../../lib/focus';
import {
  CinematicBackground, DeviceStage, FlowPath, Glow, Leader, SceneHeading,
  StatusPill, SvgStage, TinyLabel, X,
} from '../../lib/cinematic';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short43HydraulicLift', durationInSeconds: 43.5, fps: 30, width: 1080, height: 1920 };

const CarSide: React.FC<{ x: number; y: number; scale?: number; opacity?: number }> = ({ x, y, scale = 1, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
    <path d="M -250 25 L -225 -55 Q -210 -85 -155 -90 L -85 -150 Q -55 -175 5 -175 H 120 Q 165 -165 195 -120 L 225 -70 Q 260 -55 270 -10 V 40 H -250 Z" fill="#334a62" stroke={X.steel} strokeWidth={8} />
    <path d="M -75 -135 Q -55 -150 -10 -150 H 35 V -75 H -135 Z" fill={X.blue} opacity={0.32} />
    <path d="M 55 -150 H 110 Q 140 -140 165 -95 L 175 -75 H 55 Z" fill={X.blue} opacity={0.32} />
    <rect x={-265} y={5} width={545} height={60} rx={25} fill="#263b51" stroke={X.steel} strokeWidth={6} />
    {[-165, 165].map((wx) => <g key={wx} transform={`translate(${wx} 65)`}>
      <circle r={67} fill={X.night} stroke={X.steel} strokeWidth={9} /><circle r={30} fill={X.panel2} stroke={X.blue} strokeWidth={5} />
    </g>)}
    <rect x={215} y={-25} width={50} height={24} rx={9} fill={X.amber} />
  </g>
);

const OilDrop: React.FC<{ x: number; y: number; scale?: number; color?: string }> = ({ x, y, scale = 1, color = X.blue }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M 0 -85 C -15 -45 -70 5 -70 50 C -70 105 -35 130 0 130 C 35 130 70 105 70 50 C 70 5 15 -45 0 -85 Z" fill={color} opacity={0.30} stroke={color} strokeWidth={7} />
    <path d="M -25 55 Q 0 80 25 55" fill="none" stroke={X.white} strokeWidth={6} opacity={0.5} />
  </g>
);

const Short43HydraulicLift: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const area = prog(t, line(VO, 'hook-area').start - 0.08, line(VO, 'hook-area').start + 0.65);
  const pump = prog(t, line(VO, 'pump-oil').start - 0.08, line(VO, 'pump-oil').start + 0.60);
  const pressure = prog(t, line(VO, 'pump-pressure').start - 0.08, line(VO, 'pump-pressure').start + 0.60);
  const force = prog(t, line(VO, 'lift-force').start - 0.08, line(VO, 'lift-force').start + 0.60);
  const rise = prog(t, line(VO, 'lift-motion').start - 0.08, line(VO, 'lift-motion').end - 0.15);
  const valveLine = line(VO, 'valve-control');
  const opened = prog(t, valveLine.start + (valveLine.end - valveLine.start) * 0.50, valveLine.end - 0.25);
  const hookLift = prog(t, 0, 1.3);

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.blue} /><DeviceStage accent={X.blue} />
      <SceneHeading eyebrow="A compact pump moves a heavy load" lines={['Oil pressure', 'lifts the car']} accent={X.cyan} />
      <SvgStage>
        <g transform={`translate(0 ${-hookLift * 45})`}>
          <CarSide x={565} y={650} scale={0.92} />
          <path d="M 330 805 L 520 920 L 745 805" fill="none" stroke={X.amber} strokeWidth={25} strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={520} cy={920} r={24} fill={X.panel2} stroke={X.amber} strokeWidth={7} />
        </g>
        <rect x={450} y={910} width={190} height={270} rx={35} fill="#172a3d" stroke={X.steel} strokeWidth={8} />
        <rect x={475} y={935} width={140} height={210} rx={24} fill={X.blue} opacity={0.30} />
        <rect x={495} y={830 - hookLift * 45} width={100} height={180} rx={22} fill="#344d63" stroke={X.steel} strokeWidth={7} />
        <MovingDots x1={545} y1={1110} x2={545} y2={965} t={t} color={X.cyan} count={6} radius={9} speed={0.27} />
        <g opacity={0.35 + area * 0.65}>
          <rect x={115} y={900} width={150} height={230} rx={28} fill={X.panel2} stroke={X.violet} strokeWidth={6} />
          <rect x={145} y={930} width={90} height={55} rx={15} fill={X.violet} />
          <TinyLabel x={190} y={1190} text="SMALL INPUT PISTON" color={X.violet} />
          <FocusRing x={545} y={1020} rx={145} ry={195} t={t} color={X.cyan} opacity={area} />
          <TinyLabel x={750} y={1190} text="LARGE LIFT PISTON" color={X.cyan} />
          <FlowPath d="M 265 1080 H 450" t={t} color={X.blue} width={12} speed={65} />
        </g>
        <StatusPill x={540} y={1330} text="SAME PRESSURE · LARGER AREA · GREATER FORCE" color={X.cyan} opacity={area} width={720} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="pump" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="Confined oil carries the pressure" lines={['Pump in oil', 'pressurize the system']} accent={X.violet} />
      <SvgStage>
        <path d="M 210 950 H 870 V 1160 H 210 Z" fill={X.blue} opacity={0.23} stroke={X.blue} strokeWidth={6} />
        <rect x={185} y={600} width={190} height={400} rx={35} fill="none" stroke={X.steel} strokeWidth={12} />
        <rect x={640} y={520} width={380} height={560} rx={45} fill="none" stroke={X.steel} strokeWidth={12} />
        <g transform={`translate(0 ${Math.sin(t * 2.2) * 22})`}>
          <rect x={205} y={670} width={150} height={65} rx={18} fill={X.violet} stroke={X.white} strokeWidth={4} />
          <path d="M 280 670 V 555" stroke={X.steel} strokeWidth={24} /><path d="M 280 560 L 400 500" stroke={X.amber} strokeWidth={20} strokeLinecap="round" />
        </g>
        <rect x={665} y={650 - pressure * 45} width={330} height={90} rx={25} fill={X.cyan} stroke={X.white} strokeWidth={5} />
        <path d="M 830 650 V 510" stroke={X.steel} strokeWidth={32} />
        <MovingDots x1={255} y1={1030} x2={815} y2={1030} t={t} color={X.cyan} count={11} radius={10} speed={0.22} opacity={0.35 + pump * 0.65} />
        <FlowPath d="M 375 920 H 665" t={t} color={X.cyan} width={12} speed={80} opacity={pump} />
        <g opacity={pressure}>
          {[720, 830, 940].map((x) => <Arrow key={x} x1={x} y1={880} x2={x} y2={760} color={X.cyan} width={6} />)}
          <TinyLabel x={280} y={1085} text="PUMP INPUT" color={X.violet} />
          <TinyLabel x={830} y={1195} text="PRESSURE ACTS OVER THE WHOLE FLUID" color={X.cyan} />
          <FocusRing x={830} y={790} rx={200} ry={300} t={t} color={X.cyan} opacity={0.7} />
        </g>
        <StatusPill x={540} y={1330} text="NEARLY INCOMPRESSIBLE OIL TRANSMITS PRESSURE" color={X.violet} opacity={pressure} width={740} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="lift" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="Pressure multiplied by piston area" lines={['A powerful push', 'raises the load']} accent={X.cyan} />
      <SvgStage>
        <g transform={`translate(0 ${-rise * 115})`}>
          <CarSide x={555} y={595} scale={0.82} />
          <path d="M 350 750 L 540 860 L 745 750" fill="none" stroke={X.amber} strokeWidth={23} strokeLinecap="round" />
          <rect x={475} y={830} width={160} height={130} rx={25} fill={X.cyan} stroke={X.white} strokeWidth={5} />
        </g>
        <rect x={410} y={900} width={290} height={340} rx={45} fill="#12263a" stroke={X.steel} strokeWidth={12} />
        <rect x={440} y={980 - rise * 70} width={230} height={230 + rise * 70} rx={28} fill={X.blue} opacity={0.35} />
        <MovingDots x1={555} y1={1180} x2={555} y2={1000} t={t} color={X.cyan} count={7} radius={11} speed={0.25} />
        <g opacity={0.35 + force * 0.65}>
          <Arrow x1={810} y1={1060} x2={810} y2={700 - rise * 70} color={X.amber} width={13} />
          <TinyLabel x={835} y={1140} text="UPWARD FORCE" color={X.amber} />
          <FocusRing x={555} y={1000} rx={205} ry={250} t={t} color={X.cyan} opacity={force} />
        </g>
        <StatusPill x={540} y={1320} text="FORCE = PRESSURE × PISTON AREA" color={X.amber} opacity={force} width={640} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="control" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="The valve holds or releases the oil" lines={['Hold the load', 'or lower with control']} accent={X.amber} />
      <SvgStage>
        <g transform={`translate(0 ${opened * 80})`}>
          <CarSide x={560} y={600} scale={0.82} />
          <path d="M 365 760 L 540 855 L 735 760" fill="none" stroke={X.amber} strokeWidth={23} strokeLinecap="round" />
          <rect x={480} y={825} width={150} height={150} rx={25} fill={X.cyan} stroke={X.white} strokeWidth={5} />
        </g>
        <rect x={420} y={930} width={280} height={300} rx={45} fill="#12263a" stroke={X.steel} strokeWidth={12} />
        <rect x={450} y={1000} width={220} height={195} rx={25} fill={X.blue} opacity={0.32} />
        <path d="M 700 1100 H 875 V 870" fill="none" stroke={X.blue} strokeWidth={35} opacity={0.35} />
        <MovingDots x1={720} y1={1100} x2={865} y2={1100} t={t} color={X.cyan} count={4} radius={9} reverse={opened > 0.5} opacity={opened} />
        <g transform={`translate(820 1010) rotate(${opened * 70})`}>
          <rect x={-75} y={-30} width={150} height={60} rx={20} fill={X.panel2} stroke={opened > 0.5 ? X.coral : X.green} strokeWidth={7} />
          <path d="M 0 -30 V -110" stroke={X.steel} strokeWidth={18} /><path d="M -55 -110 H 55" stroke={X.amber} strokeWidth={20} strokeLinecap="round" />
        </g>
        <FocusRing x={820} y={980} rx={150} ry={190} t={t} color={opened > 0.5 ? X.coral : X.green} opacity={0.8} />
        <StatusPill x={540} y={1330} text={opened > 0.45 ? 'VALVE OPEN · OIL RETURNS · CAR DESCENDS' : 'VALVE CLOSED · TRAPPED OIL HOLDS THE CAR'} color={opened > 0.45 ? X.coral : X.green} width={760} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="Controlled hydraulic lifting" lines={['Compact pump', 'powerful controlled lift']} accent={X.green} size={58} />
      <SvgStage>
        <g transform="translate(200 850)">
          <rect x={-85} y={-180} width={170} height={360} rx={30} fill={X.panel2} stroke={X.violet} strokeWidth={8} />
          <rect x={-55} y={-110} width={110} height={55} rx={14} fill={X.violet} />
          <TinyLabel x={0} y={235} text="SMALL INPUT" color={X.violet} />
        </g>
        <Arrow x1={315} y1={850} x2={405} y2={850} color={X.blue} width={7} />
        <OilDrop x={500} y={800} scale={0.75} color={X.blue} />
        <TinyLabel x={500} y={1085} text="OIL PRESSURE" color={X.blue} />
        <Arrow x1={595} y1={850} x2={685} y2={850} color={X.cyan} width={7} />
        <g transform="translate(810 850)">
          <rect x={-105} y={-150} width={210} height={300} rx={35} fill={X.panel2} stroke={X.cyan} strokeWidth={8} />
          <rect x={-75} y={-95} width={150} height={65} rx={18} fill={X.cyan} />
          <Arrow x1={0} y1={70} x2={0} y2={-80} color={X.amber} width={7} />
          <TinyLabel x={0} y={235} text="LARGE LIFT" color={X.cyan} />
        </g>
        <CarSide x={550} y={560} scale={0.50} />
        <StatusPill x={540} y={1280} text="CONFINED OIL → PRESSURE → CONTROLLED MOTION" color={X.green} width={730} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['hydraulic lift', 'heavy car', 'trapped oil', 'input piston', 'larger area', 'incompressible oil', 'pressure', 'Force equals pressure times area', 'closed valve', 'controlled descent', 'lifting power']} />
    <CalmSound narration="voiceovers/hydraulic-lift/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={43.5} />
  </AbsoluteFill>;
};
export default Short43HydraulicLift;
