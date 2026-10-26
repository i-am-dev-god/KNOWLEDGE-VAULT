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

export const compositionConfig = { id: 'Short44PressureCooker', durationInSeconds: 40, fps: 30, width: 1080, height: 1920 };

const SteamPuffs: React.FC<{ x: number; y: number; t: number; opacity?: number; count?: number }> = ({ x, y, t, opacity = 1, count = 12 }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    {Array.from({ length: count }, (_, i) => {
      const p = (t * (0.16 + (i % 3) * 0.025) + i / count) % 1;
      return <circle key={i} cx={Math.sin(i * 2.3 + t) * (35 + p * 85)} cy={-p * 280} r={10 + p * 20} fill={X.white} opacity={(1 - p) * 0.32} />;
    })}
  </g>
);

const PressureGauge: React.FC<{ x: number; y: number; value: number; color?: string }> = ({ x, y, value, color = X.cyan }) => {
  const angle = -120 + value * 240;
  return <g transform={`translate(${x} ${y})`}>
    <circle r={100} fill={X.panel2} stroke={X.steel} strokeWidth={7} />
    <path d="M -70 55 A 90 90 0 1 1 70 55" fill="none" stroke={color} strokeWidth={9} strokeDasharray="12 9" />
    <g transform={`rotate(${angle})`}><path d="M 0 15 V -70" stroke={color} strokeWidth={9} strokeLinecap="round" /><circle r={15} fill={color} /></g>
    <TinyLabel x={0} y={150} text="STEAM PRESSURE" color={color} />
  </g>;
};

const Cooker: React.FC<{ x: number; y: number; t: number; pressure?: number; heat?: number; sealed?: boolean }> = ({ x, y, t, pressure = 0.7, heat = 1, sealed = true }) => (
  <g transform={`translate(${x} ${y})`}>
    <Glow x={0} y={160} r={260} color={X.coral} opacity={0.15 + heat * 0.30} />
    <rect x={-275} y={-40} width={550} height={390} rx={75} fill="#1a2b3b" stroke={X.steel} strokeWidth={11} />
    <path d="M -230 90 H 230 V 260 Q 225 300 180 305 H -180 Q -225 300 -230 260 Z" fill={X.blue} opacity={0.24 + pressure * 0.18} />
    {[0, 1, 2, 3, 4, 5].map((i) => <rect key={i} x={-170 + (i % 3) * 115} y={130 + Math.floor(i / 3) * 75 + Math.sin(t * 2 + i) * 9} width={66} height={48} rx={15} fill={i % 2 ? X.amber : '#b47b54'} opacity={0.50 + heat * 0.35} />)}
    <rect x={-300} y={-90} width={600} height={75} rx={30} fill="#3c4e60" stroke={X.steel} strokeWidth={8} />
    <rect x={-275} y={-22} width={550} height={20} rx={10} fill={sealed ? X.green : X.coral} opacity={0.75} />
    <rect x={-410} y={-55} width={135} height={55} rx={25} fill="#263b4d" stroke={X.steel} strokeWidth={7} />
    <rect x={275} y={-55} width={135} height={55} rx={25} fill="#263b4d" stroke={X.steel} strokeWidth={7} />
    <g transform="translate(0 -125)">
      <rect x={-48} y={-55} width={96} height={75} rx={22} fill="#495b6c" stroke={X.steel} strokeWidth={6} />
      <rect x={-14} y={15} width={28} height={45} rx={10} fill={X.steel} />
      <SteamPuffs x={0} y={-60} t={t} opacity={pressure * 0.85} count={8} />
    </g>
    <SteamPuffs x={0} y={85} t={t} opacity={0.25 + pressure * 0.55} count={15} />
    {[-150, 0, 150].map((dx) => <Arrow key={dx} x1={dx} y1={335} x2={dx} y2={235} color={X.coral} width={7} opacity={heat} />)}
  </g>
);

const Short44PressureCooker: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const seal = prog(t, line(VO, 'hook-seal').start - 0.08, line(VO, 'hook-seal').start + 0.65);
  const steam = prog(t, line(VO, 'steam-form').start - 0.08, line(VO, 'steam-form').start + 0.60);
  const regulate = prog(t, line(VO, 'steam-regulate').start - 0.08, line(VO, 'steam-regulate').start + 0.60);
  const boiling = prog(t, line(VO, 'heat-boiling').start - 0.08, line(VO, 'heat-boiling').start + 0.60);
  const food = prog(t, line(VO, 'heat-food').start - 0.08, line(VO, 'heat-food').start + 0.60);
  const safetyLine = line(VO, 'safety-release');
  const release = prog(t, safetyLine.start + (safetyLine.end - safetyLine.start) * 0.35, safetyLine.end - 0.20);

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.coral} /><DeviceStage accent={X.coral} />
      <SceneHeading eyebrow="The cooking payoff comes first" lines={['Hotter water', 'cooks food faster']} accent={X.amber} />
      <SvgStage>
        <Cooker x={510} y={745} t={t} pressure={0.65 + Math.sin(t * 1.5) * 0.08} heat={0.9} />
        <PressureGauge x={855} y={650} value={0.25 + seal * 0.55} color={seal > 0.4 ? X.coral : X.cyan} />
        <g opacity={seal}>
          <FocusRing x={510} y={710} rx={335} ry={95} t={t} color={X.green} opacity={0.85} />
          <Leader x={185} y={550} tx={330} ty={690} text="SEALED LID TRAPS STEAM" color={X.green} />
        </g>
        <StatusPill x={540} y={1270} text="TRAPPED STEAM → HIGHER PRESSURE → HOTTER COOKING" color={X.amber} opacity={seal} width={780} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="pressure" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="Water becomes confined steam" lines={['Pressure builds', 'the regulator controls it']} accent={X.violet} size={58} />
      <SvgStage>
        <Cooker x={460} y={770} t={t} pressure={0.35 + steam * 0.55} heat={1} />
        <g opacity={0.25 + steam * 0.70}>
          {[-120, 0, 120].map((dx, i) => <MovingDots key={dx} x1={460 + dx} y1={1020} x2={460 + dx} y2={730} t={t + i * 0.3} color={X.white} count={5} radius={10} speed={0.23} />)}
          {[280, 460, 640].map((x) => <g key={x}>
            <Arrow x1={x} y1={850} x2={x + (x < 460 ? -85 : x > 460 ? 85 : 0)} y2={850} color={X.violet} width={6} />
          </g>)}
        </g>
        <g opacity={regulate}>
          <FocusRing x={460} y={580} rx={110} ry={145} t={t} color={X.amber} opacity={0.9} />
          <Leader x={820} y={530} tx={500} ty={570} text="PRESSURE REGULATOR" color={X.amber} />
          <StatusPill x={760} y={1160} text="DESIGNED COOKING PRESSURE" color={X.amber} width={430} />
        </g>
        <StatusPill x={540} y={1320} text="CONFINED STEAM RAISES THE PRESSURE" color={X.violet} opacity={steam} width={650} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="heat" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="Pressure changes the boiling point" lines={['Hotter water and steam', 'reach the food']} accent={X.amber} size={56} />
      <SvgStage>
        <g transform="translate(270 770)">
          <rect x={-190} y={-20} width={380} height={330} rx={55} fill={X.panel2} stroke={X.steel} strokeWidth={9} />
          <path d="M -155 110 H 155 V 250 H -155 Z" fill={X.blue} opacity={0.30} />
          <SteamPuffs x={0} y={-30} t={t} opacity={0.55} count={10} />
          <TinyLabel x={0} y={365} text="OPEN POT" color={X.steel} />
          <StatusPill x={0} y={440} text="NORMAL BOILING" color={X.blue} width={340} />
        </g>
        <g transform="translate(795 770)">
          <rect x={-175} y={-20} width={350} height={330} rx={55} fill={X.panel2} stroke={X.amber} strokeWidth={9} />
          <rect x={-195} y={-75} width={390} height={65} rx={25} fill="#3c4e60" stroke={X.steel} strokeWidth={7} />
          <rect x={-45} y={-135} width={90} height={65} rx={20} fill={X.steel} />
          <path d="M -140 100 H 140 V 250 H -140 Z" fill={X.coral} opacity={0.25 + boiling * 0.20} />
          <SteamPuffs x={0} y={70} t={t} opacity={0.45 + boiling * 0.35} count={10} />
          {[0, 1, 2].map((i) => <rect key={i} x={-105 + i * 75} y={140 + Math.sin(t * 2 + i) * 8} width={58} height={46} rx={14} fill={X.amber} opacity={0.55 + food * 0.40} />)}
          <g opacity={food}>{[-90, 0, 90].map((dx) => <Arrow key={dx} x1={dx} y1={285} x2={dx} y2={175} color={X.coral} width={6} />)}</g>
          <TinyLabel x={0} y={365} text="PRESSURE COOKER" color={X.amber} />
          <StatusPill x={0} y={440} text="HOTTER BOILING" color={X.amber} width={340} />
        </g>
        <FocusRing x={795} y={830} rx={210} ry={300} t={t} color={X.amber} opacity={boiling} />
        <StatusPill x={540} y={1360} text="HIGHER PRESSURE KEEPS WATER LIQUID AT A HIGHER TEMPERATURE" color={X.amber} opacity={food} width={850} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="safety" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.coral} /><DeviceStage accent={X.coral} />
      <SceneHeading eyebrow="Excess pressure must be controlled" lines={['Release the pressure', 'before opening']} accent={X.coral} />
      <SvgStage>
        <g transform="translate(540 820)">
          <rect x={-360} y={-20} width={720} height={290} rx={65} fill="#1a2b3b" stroke={X.steel} strokeWidth={11} />
          <rect x={-395} y={-95} width={790} height={85} rx={30} fill="#3c4e60" stroke={X.steel} strokeWidth={8} />
          <rect x={-360} y={-15} width={720} height={18} fill={release > 0.75 ? X.green : X.coral} />
          <g transform={`translate(-245 -125) rotate(${release > 0.75 ? -32 : 0})`}>
            <rect x={-65} y={-40} width={130} height={105} rx={24} fill={release > 0.75 ? X.green : X.coral} />
            <path d="M -35 -40 V -95 A 35 35 0 0 1 35 -95 V -40" fill="none" stroke={X.steel} strokeWidth={18} />
          </g>
          <TinyLabel x={-245} y={75} text={release > 0.75 ? 'UNLOCKED AT LOW PRESSURE' : 'LID LOCKED'} color={release > 0.75 ? X.green : X.coral} />
          <g transform={`translate(230 ${-135 - release * 35})`}>
            <rect x={-60} y={-55} width={120} height={80} rx={22} fill={X.coral} stroke={X.steel} strokeWidth={6} />
            <SteamPuffs x={0} y={-65} t={t} opacity={release * (1 - release * 0.55)} count={9} />
          </g>
          <TinyLabel x={230} y={75} text="SAFETY VALVE" color={X.coral} />
          <FocusRing x={230} y={-125} rx={130} ry={180} t={t} color={X.coral} opacity={0.8} />
        </g>
        <PressureGauge x={200} y={1170} value={0.85 - release * 0.75} color={release > 0.75 ? X.green : X.coral} />
        <StatusPill x={680} y={1250} text={release > 0.75 ? 'LOW PRESSURE · SAFE TO UNLOCK' : 'DEPRESSURIZE BEFORE OPENING'} color={release > 0.75 ? X.green : X.coral} width={540} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="Why the meal cooks faster" lines={['Trapped steam', 'hotter cooking medium']} accent={X.green} />
      <SvgStage>
        <Cooker x={540} y={770} t={t} pressure={0.75} heat={1} />
        <g fontFamily="JetBrains Mono, monospace" textAnchor="middle">
          <StatusPill x={185} y={1240} text="TRAP STEAM" color={X.violet} width={250} />
          <Arrow x1={320} y1={1210} x2={390} y2={1210} color={X.green} width={6} />
          <StatusPill x={540} y={1240} text="RAISE PRESSURE" color={X.coral} width={280} />
          <Arrow x1={690} y1={1210} x2={755} y2={1210} color={X.green} width={6} />
          <StatusPill x={885} y={1240} text="COOK HOTTER" color={X.amber} width={250} />
          <StatusPill x={540} y={1360} text="HOTTER WATER + STEAM → FASTER COOKING" color={X.green} width={720} />
        </g>
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['pressure cooker', 'higher temperature', 'sealed lid', 'steam', 'pressure', 'regulator', 'normal boiling point', 'hotter water and steam', 'safety valve', 'depressurize', 'cooking medium']} />
    <CalmSound narration="voiceovers/pressure-cooker/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={40} />
  </AbsoluteFill>;
};
export default Short44PressureCooker;
