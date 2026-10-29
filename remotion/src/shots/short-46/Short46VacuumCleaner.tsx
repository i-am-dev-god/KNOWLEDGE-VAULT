import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line } from '../../lib/next-calm';
import { Arrow, FocusRing, MovingDots } from '../../lib/focus';
import {
  CinematicBackground, CircularFlow, DeviceStage, FlowPath, Glow, Leader,
  SceneHeading, StatusPill, SvgStage, TinyLabel, X,
} from '../../lib/cinematic';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short46VacuumCleaner', durationInSeconds: 42, fps: 30, width: 1080, height: 1920 };

const FanRotor: React.FC<{ x: number; y: number; r: number; t: number; color?: string }> = ({ x, y, r, t, color = X.cyan }) => (
  <g transform={`translate(${x} ${y})`}>
    <circle r={r + 28} fill={X.panel2} stroke={X.steel} strokeWidth={8} />
    <g transform={`rotate(${t * 210})`}>
      {Array.from({ length: 7 }, (_, i) => <path key={i} d={`M 0 0 Q ${r * 0.18} ${-r * 0.72} ${r * 0.64} ${-r * 0.72} Q ${r * 0.90} ${-r * 0.28} ${r * 0.28} ${r * 0.12} Z`} fill={color} opacity={0.52} transform={`rotate(${i * 360 / 7})`} />)}
      <circle r={r * 0.18} fill={X.amber} stroke={X.white} strokeWidth={5} />
    </g>
    <CircularFlow cx={0} cy={0} r={r + 12} t={t} count={9} color={color} speed={0.22} />
  </g>
);

const Short46VacuumCleaner: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const pickup = prog(t, 0.10, 1.35);
  const airflow = prog(t, line(VO, 'hook-airflow').start - 0.08, line(VO, 'hook-airflow').start + 0.65);
  const motor = prog(t, line(VO, 'fan-motor').start - 0.08, line(VO, 'fan-motor').start + 0.60);
  const pressure = prog(t, line(VO, 'fan-pressure').start - 0.08, line(VO, 'fan-pressure').start + 0.60);
  const carry = prog(t, line(VO, 'path-carry').start - 0.08, line(VO, 'path-carry').start + 0.55);
  const separate = prog(t, line(VO, 'path-separate').start - 0.08, line(VO, 'path-separate').start + 0.65);
  const clean = prog(t, line(VO, 'filter-maintenance').start + 0.8, line(VO, 'filter-maintenance').end - 0.25);

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="The cleaning result comes first" lines={['Moving air', 'carries dirt inside']} accent={X.cyan} />
      <SvgStage>
        <rect x={90} y={1070} width={900} height={36} rx={15} fill="#314356" />
        {Array.from({ length: 15 }, (_, i) => {
          const p = (t * 0.24 + i / 15) % 1;
          const x = 115 + (i % 6) * 62 + p * 260 * pickup;
          const y = 1045 - (i % 3) * 18 - p * 95 * pickup;
          return <circle key={i} cx={x} cy={y} r={7 + (i % 3) * 3} fill={X.amber} opacity={(1 - p * 0.75) * (0.45 + pickup * 0.55)} />;
        })}
        <path d="M 130 875 L 390 875 L 445 1015 L 105 1015 Z" fill="#263b50" stroke={X.steel} strokeWidth={9} />
        <rect x={165} y={995} width={240} height={35} rx={15} fill={X.night} stroke={X.cyan} strokeWidth={5} />
        <path d="M 370 900 C 510 825 465 675 625 700" fill="none" stroke={X.steel} strokeWidth={55} strokeLinecap="round" />
        <path d="M 370 900 C 510 825 465 675 625 700" fill="none" stroke={X.night} strokeWidth={34} strokeLinecap="round" />
        <FlowPath d="M 240 1000 C 355 975 400 915 415 860 C 470 720 520 720 640 745" t={t} color={X.cyan} width={9} speed={100} opacity={0.35 + airflow * 0.65} />
        <g transform="translate(730 810)">
          <rect x={-165} y={-190} width={330} height={410} rx={90} fill="#20354a" stroke={X.steel} strokeWidth={10} />
          <rect x={-112} y={-135} width={224} height={250} rx={50} fill="#0f2234" stroke={X.cyan} strokeWidth={5} opacity={0.88} />
          {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={-70 + (i % 4) * 45} cy={65 - Math.floor(i / 4) * 42 + Math.sin(t * 2 + i) * 8} r={10 + (i % 2) * 4} fill={X.amber} opacity={0.35 + pickup * 0.55} />)}
          <circle cx={-115} cy={210} r={42} fill={X.night} stroke={X.steel} strokeWidth={12} /><circle cx={115} cy={210} r={42} fill={X.night} stroke={X.steel} strokeWidth={12} />
        </g>
        <FocusRing x={715} y={810} rx={215} ry={280} t={t} color={X.cyan} opacity={airflow} />
        <Leader x={820} y={560} tx={755} ty={650} text="DIRT COLLECTS IN THE BIN" color={X.amber} />
        <StatusPill x={540} y={1300} text="CONTINUOUS AIRFLOW CARRIES THE DIRT" color={X.cyan} opacity={airflow} width={650} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="fan" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="A fan changes the air pressure" lines={['Push air out', 'room air rushes in']} accent={X.violet} />
      <SvgStage>
        <rect x={190} y={565} width={700} height={590} rx={85} fill="#101f31" stroke={X.steel} strokeWidth={8} />
        <g opacity={0.35 + motor * 0.65}>
          <rect x={235} y={750} width={220} height={180} rx={35} fill="#31445a" stroke={X.amber} strokeWidth={7} />
          <path d="M 455 840 H 545" stroke={X.steel} strokeWidth={28} />
          <TinyLabel x={345} y={985} text="ELECTRIC MOTOR" color={X.amber} />
          <FocusRing x={345} y={840} rx={150} ry={140} t={t} color={X.amber} opacity={motor} />
        </g>
        <FanRotor x={650} y={840} r={150} t={t} color={motor > 0.4 ? X.cyan : X.steel} />
        <g opacity={pressure}>
          <Arrow x1={795} y1={840} x2={975} y2={840} color={X.violet} width={10} />
          <TinyLabel x={875} y={790} text="AIR LEAVES" color={X.violet} />
          <Arrow x1={85} y1={1110} x2={300} y2={1110} color={X.cyan} width={10} />
          <Arrow x1={85} y1={1190} x2={300} y2={1190} color={X.cyan} width={10} />
          <TinyLabel x={190} y={1060} text="ROOM AIR ENTERS" color={X.cyan} />
          <StatusPill x={610} y={1270} text="LOWER PRESSURE INSIDE · AIR FLOWS IN" color={X.cyan} width={690} />
          <FocusRing x={650} y={840} rx={220} ry={220} t={t} color={X.violet} opacity={0.75} />
        </g>
      </SvgStage>
    </Scene>

    <Scene t={t} id="path" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="The suction path has two jobs" lines={['Carry the dirt', 'then separate it']} accent={X.cyan} />
      <SvgStage>
        <path d="M 100 820 H 565" stroke={X.steel} strokeWidth={90} strokeLinecap="round" opacity={0.32} />
        <FlowPath d="M 110 820 H 600" t={t} color={X.cyan} width={12} speed={115} opacity={0.35 + carry * 0.65} />
        {Array.from({ length: 9 }, (_, i) => {
          const p = (t * 0.22 + i / 9) % 1;
          return <circle key={i} cx={115 + p * 490} cy={820 + Math.sin(i * 2.1) * 28} r={9 + (i % 3) * 3} fill={X.amber} opacity={0.25 + carry * 0.75} />;
        })}
        <g transform="translate(750 820)">
          <path d="M -180 -220 H 180 L 115 180 L 45 265 H -45 L -115 180 Z" fill="#152a3e" stroke={X.steel} strokeWidth={9} />
          <CircularFlow cx={0} cy={-40} r={125} t={t} count={10} color={X.cyan} speed={0.30} />
          <CircularFlow cx={0} cy={-40} r={75} t={t} count={7} color={X.amber} speed={0.38} reverse />
          {Array.from({ length: 8 }, (_, i) => {
            const p = (t * 0.18 + i / 8) % 1;
            return <circle key={i} cx={-65 + (i % 4) * 42} cy={70 + p * 145} r={10} fill={X.amber} opacity={separate * (1 - p * 0.4)} />;
          })}
          <FocusRing x={0} y={0} rx={225} ry={300} t={t} color={X.amber} opacity={separate} />
        </g>
        <g opacity={separate}>
          <Arrow x1={750} y1={555} x2={750} y2={475} color={X.cyan} width={8} />
          <TinyLabel x={750} y={440} text="FILTERED AIR LEAVES" color={X.cyan} />
          <TinyLabel x={750} y={1190} text="DIRT STAYS IN THE BIN" color={X.amber} />
        </g>
        <Leader x={250} y={640} tx={330} ty={790} text="AIR + LOOSE DEBRIS" color={X.cyan} opacity={carry} />
        <StatusPill x={540} y={1320} text="CYCLONE OR FILTER SEPARATES DIRT FROM AIR" color={X.cyan} opacity={separate} width={760} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="filter" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="Airflow must pass through the filter" lines={['A clogged filter', 'restricts pickup']} accent={X.amber} />
      <SvgStage>
        <rect x={270} y={570} width={540} height={525} rx={45} fill="#142638" stroke={clean > 0.6 ? X.green : X.amber} strokeWidth={9} />
        {Array.from({ length: 11 }, (_, i) => <path key={i} d={`M ${315 + i * 45} 625 V 1040`} stroke={X.steel} strokeWidth={19} opacity={0.65} />)}
        {Array.from({ length: 28 }, (_, i) => <circle key={i} cx={315 + (i % 7) * 72 + Math.sin(i) * 12} cy={660 + Math.floor(i / 7) * 105} r={16 + (i % 3) * 5} fill={X.amber} opacity={(1 - clean) * 0.82} />)}
        {[700, 835, 970].map((y) => <g key={y} opacity={0.18 + clean * 0.82}>
          <MovingDots x1={110} y1={y} x2={965} y2={y} t={t} count={7} color={clean > 0.55 ? X.green : X.cyan} radius={11} speed={0.22 + clean * 0.20} />
          <Arrow x1={850} y1={y} x2={970} y2={y} color={clean > 0.55 ? X.green : X.cyan} width={7} />
        </g>)}
        <FocusRing x={540} y={835} rx={340} ry={330} t={t} color={clean > 0.55 ? X.green : X.amber} opacity={0.8} />
        <StatusPill x={540} y={1260} text={clean > 0.55 ? 'CLEAN FILTER · AIRFLOW RESTORED' : 'CLEAN THE FILTER TO RESTORE AIRFLOW'} color={clean > 0.55 ? X.green : X.amber} width={680} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="One continuous cleaning chain" lines={['Fan starts airflow', 'air carries dirt']} accent={X.green} />
      <SvgStage>
        <FanRotor x={185} y={820} r={95} t={t} color={X.cyan} />
        <TinyLabel x={185} y={1060} text="FAN" color={X.cyan} />
        <Arrow x1={315} y1={820} x2={405} y2={820} color={X.green} width={8} />
        <g transform="translate(540 820)">
          {[680, 820, 960].map((y) => <MovingDots key={y} x1={-95} y1={y - 820} x2={95} y2={y - 820} t={t} count={4} color={X.cyan} radius={10} speed={0.32} />)}
          <TinyLabel x={0} y={240} text="MOVING AIR" color={X.cyan} />
        </g>
        <Arrow x1={675} y1={820} x2={755} y2={820} color={X.green} width={8} />
        <g transform="translate(875 820)">
          <rect x={-105} y={-140} width={210} height={290} rx={50} fill={X.panel2} stroke={X.amber} strokeWidth={8} />
          {Array.from({ length: 8 }, (_, i) => <circle key={i} cx={-55 + (i % 3) * 55} cy={70 - Math.floor(i / 3) * 55 + Math.sin(t * 2 + i) * 8} r={13} fill={X.amber} />)}
          <TinyLabel x={0} y={240} text="DIRT IN THE BIN" color={X.amber} />
        </g>
        <StatusPill x={540} y={1280} text="PRESSURE DIFFERENCE → AIRFLOW → PICKUP" color={X.green} width={720} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['vacuum cleaner', 'continuous airflow', 'electric motor', 'fan', 'air pressure', 'nozzle', 'moving air', 'cyclone or filter', 'clogged filter', 'transports dirt']} />
    <CalmSound narration="voiceovers/vacuum-cleaner/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={42} />
  </AbsoluteFill>;
};
export default Short46VacuumCleaner;
