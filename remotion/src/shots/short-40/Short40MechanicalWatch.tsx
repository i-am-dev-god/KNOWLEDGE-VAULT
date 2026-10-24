import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line } from '../../lib/next-calm';
import { Arrow, FocusRing, MovingDots } from '../../lib/focus';
import {
  CinematicBackground, DeviceStage, Gear, Glow, Leader, SceneHeading,
  StatusPill, SvgStage, TinyLabel, X,
} from '../../lib/cinematic';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short40MechanicalWatch', durationInSeconds: 60, fps: 30, width: 1080, height: 1920 };

const spiralPath = (cx: number, cy: number, inner: number, outer: number, turns: number, phase = 0) => (
  Array.from({ length: 181 }, (_, i) => {
    const p = i / 180; const a = phase + p * turns * Math.PI * 2; const r = inner + (outer - inner) * p;
    return `${i === 0 ? 'M' : 'L'} ${(cx + Math.cos(a) * r).toFixed(2)} ${(cy + Math.sin(a) * r).toFixed(2)}`;
  }).join(' ')
);

const WatchFace: React.FC<{ x: number; y: number; r?: number; t?: number; opacity?: number; hands?: boolean }> = ({ x, y, r = 280, t = 0, opacity = 1, hands = true }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <circle r={r + 24} fill="#17263a" stroke={X.steel} strokeWidth={12} />
    <circle r={r} fill="#0b1726" stroke="#72859b" strokeWidth={4} />
    <circle r={r * 0.88} fill="none" stroke={X.steel} strokeWidth={2} opacity={0.25} />
    {Array.from({ length: 60 }, (_, i) => {
      const a = i * Math.PI * 2 / 60 - Math.PI / 2; const major = i % 5 === 0;
      const r1 = r * (major ? 0.78 : 0.84); const r2 = r * 0.91;
      return <line key={i} x1={Math.cos(a) * r1} y1={Math.sin(a) * r1} x2={Math.cos(a) * r2} y2={Math.sin(a) * r2} stroke={major ? X.white : X.steel} strokeWidth={major ? 7 : 3} opacity={major ? 0.9 : 0.45} />;
    })}
    {hands && <g>
      <path d={`M 0 25 L ${Math.sin(t * 0.035) * r * 0.48} ${-Math.cos(t * 0.035) * r * 0.48}`} stroke={X.white} strokeWidth={17} strokeLinecap="round" />
      <path d={`M 0 25 L ${Math.sin(t * 0.42) * r * 0.70} ${-Math.cos(t * 0.42) * r * 0.70}`} stroke={X.cyan} strokeWidth={10} strokeLinecap="round" />
      <circle r={24} fill={X.amber} stroke={X.white} strokeWidth={4} />
    </g>}
  </g>
);

const EscapeWheel: React.FC<{ x: number; y: number; r?: number; rotation?: number; color?: string; opacity?: number }> = ({ x, y, r = 175, rotation = 0, color = X.amber, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation})`} opacity={opacity}>
    {Array.from({ length: 15 }, (_, i) => <path key={i} d={`M ${-r * 0.08} ${-r * 0.82} L ${r * 0.11} ${-r * 1.12} L ${r * 0.16} ${-r * 0.76} Z`} fill={color} transform={`rotate(${i * 24})`} />)}
    <circle r={r * 0.78} fill={X.panel} stroke={color} strokeWidth={7} />
    {Array.from({ length: 5 }, (_, i) => <path key={i} d={`M 0 0 L 0 ${-r * 0.73}`} stroke={color} strokeWidth={12} strokeLinecap="round" transform={`rotate(${i * 72})`} />)}
    <circle r={r * 0.15} fill={color} /><circle r={r * 0.06} fill={X.night} />
  </g>
);

const PalletFork: React.FC<{ x: number; y: number; angle?: number; opacity?: number }> = ({ x, y, angle = 0, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) rotate(${angle})`} opacity={opacity}>
    <path d="M 0 140 L 0 15 M 0 25 L -105 -65 M 0 25 L 105 -65" fill="none" stroke={X.steel} strokeWidth={24} strokeLinecap="round" strokeLinejoin="round" />
    <rect x={-128} y={-89} width={52} height={28} rx={8} fill={X.coral} transform={`rotate(-18 -102 -75)`} />
    <rect x={76} y={-89} width={52} height={28} rx={8} fill={X.coral} transform={`rotate(18 102 -75)`} />
    <circle cy={25} r={25} fill={X.panel2} stroke={X.steel} strokeWidth={6} />
    <path d="M -35 140 H 35" stroke={X.steel} strokeWidth={18} strokeLinecap="round" />
  </g>
);

const Short40MechanicalWatch: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const meter = prog(t, line(VO, 'hook-meter').start - 0.1, line(VO, 'hook-meter').start + 0.7);
  const store = prog(t, line(VO, 'wind-store').start - 0.1, line(VO, 'wind-store').start + 0.9);
  const release = prog(t, line(VO, 'wind-release').start - 0.1, line(VO, 'wind-release').start + 0.9);
  const gears = prog(t, line(VO, 'gears-hands').start - 0.1, line(VO, 'gears-hands').start + 0.8);
  const escape = prog(t, line(VO, 'escape-meter').start - 0.1, line(VO, 'escape-meter').start + 0.8);
  const regulate = prog(t, line(VO, 'balance-regulate').start - 0.1, line(VO, 'balance-regulate').start + 0.8);
  const tick = Math.floor(t * 2.4);
  const balanceAngle = Math.sin(t * 7.2) * 125;

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="Inside a mechanical watch" lines={['Spring energy', 'released in time']} accent={X.amber} />
      <SvgStage>
        <Glow x={540} y={825} r={290} color={X.amber} opacity={0.55} />
        <WatchFace x={540} y={825} r={290} t={t} hands={false} />
        <g opacity={0.82}>
          <Gear x={430} y={925} r={95} teeth={18} rotation={t * 9} color={X.amber} />
          <Gear x={620} y={925} r={72} teeth={14} rotation={-t * 13} color={X.steel} />
          <EscapeWheel x={545} y={720} r={65} rotation={tick * 6} color={X.cyan} opacity={meter} />
          <path d={spiralPath(420, 690, 12, 65, 4, t * 0.1)} fill="none" stroke={X.coral} strokeWidth={6} opacity={0.8} />
        </g>
        <g transform={`translate(540 825)`}>
          <path d={`M 0 20 L ${Math.sin(t * 0.035) * 135} ${-Math.cos(t * 0.035) * 135}`} stroke={X.white} strokeWidth={16} strokeLinecap="round" />
          <path d={`M 0 20 L ${Math.sin(t * 0.42) * 200} ${-Math.cos(t * 0.42) * 200}`} stroke={X.cyan} strokeWidth={9} strokeLinecap="round" />
          <circle r={22} fill={X.amber} />
        </g>
        <rect x={855} y={785} width={85} height={80} rx={20} fill="#34465a" stroke={X.steel} strokeWidth={5} />
        <FocusRing x={545} y={720} rx={110} ry={110} t={t} color={X.cyan} opacity={meter} />
        <StatusPill x={540} y={1250} text="STORED ENERGY · METERED IN EVEN STEPS" color={X.amber} opacity={meter} width={680} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="wind" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.coral} /><DeviceStage accent={X.coral} />
      <SceneHeading eyebrow="The barrel stores the winding energy" lines={['Tighten the mainspring.', 'Release it slowly.']} accent={X.coral} size={58} />
      <SvgStage>
        <g opacity={0.35 + store * 0.65}>
          <Gear x={450} y={835} r={260} teeth={32} rotation={release * 35} color="#8a6b46" spokes={0} />
          <circle cx={450} cy={835} r={235} fill={X.panel} stroke={X.steel} strokeWidth={5} />
          <path d={spiralPath(450, 835, 22, 210 - store * 35, 5 + store * 1.5, -release * 0.35)} fill="none" stroke={store > 0.55 ? X.coral : X.steel} strokeWidth={13} strokeLinecap="round" />
          <circle cx={450} cy={835} r={30} fill={X.coral} stroke={X.white} strokeWidth={4} />
          <FocusRing x={450} y={835} rx={290} ry={290} t={t} color={X.coral} opacity={store} />
        </g>
        <g transform={`translate(845 835) rotate(${store * 210})`}>
          <rect x={-45} y={-85} width={90} height={170} rx={22} fill="#35495d" stroke={X.steel} strokeWidth={6} />
          {[-55, -25, 5, 35, 65].map((y) => <line key={y} x1={-43} y1={y} x2={43} y2={y} stroke={X.white} strokeWidth={4} opacity={0.35} />)}
        </g>
        <path d="M 710 835 H 790" stroke={X.steel} strokeWidth={18} />
        <Leader x={840} y={620} tx={845} ty={745} text="WINDING CROWN" color={X.steel} opacity={store} />
        <Leader x={180} y={1210} tx={350} ty={1010} text="MAINSPRING INSIDE THE BARREL" color={X.coral} opacity={store} />
        <g opacity={release}>
          <Gear x={850} y={1100} r={72} teeth={14} rotation={-t * 24} color={X.amber} />
          <MovingDots x1={690} y1={1010} x2={795} y2={1070} t={t} color={X.amber} count={4} radius={9} />
          <Arrow x1={690} y1={1010} x2={780} y2={1060} color={X.amber} width={5} opacity={0.5} />
        </g>
        <StatusPill x={560} y={1320} text="THE UNWINDING SPRING DRIVES THE GEARS" color={X.amber} opacity={release} width={640} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="gears" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="The gear train delivers useful motion" lines={['Pass rotation', 'toward the hands']} accent={X.amber} />
      <SvgStage>
        <Glow x={520} y={920} r={330} color={X.amber} opacity={0.35} />
        <Gear x={205} y={940} r={135} teeth={22} rotation={t * 15} color={X.amber} opacity={0.4 + gears * 0.6} />
        <Gear x={455} y={940} r={92} teeth={16} rotation={-t * 22} color={X.steel} opacity={0.4 + gears * 0.6} />
        <Gear x={640} y={940} r={65} teeth={12} rotation={t * 31} color={X.cyan} opacity={0.4 + gears * 0.6} />
        <Gear x={830} y={940} r={110} teeth={20} rotation={-t * 18} color={X.amber} opacity={0.4 + gears * 0.6} />
        <path d="M 830 830 V 745" stroke={X.steel} strokeWidth={12} />
        <WatchFace x={830} y={650} r={105} t={t} opacity={0.35 + gears * 0.65} />
        <FocusRing x={830} y={650} rx={150} ry={150} t={t} color={X.cyan} opacity={gears} />
        <TinyLabel x={205} y={1145} text="BARREL" color={X.amber} /><TinyLabel x={515} y={1145} text="GEAR TRAIN" color={X.steel} /><TinyLabel x={830} y={1145} text="HANDS" color={X.cyan} />
        <StatusPill x={540} y={1280} text="MESHING TEETH TRANSFER ROTATION AND CHANGE SPEED" color={X.amber} opacity={gears} width={780} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="escape" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="The escapement prevents uncontrolled unwinding" lines={['Lock. Release.', 'One small step.']} accent={X.cyan} />
      <SvgStage>
        <Glow x={410} y={820} r={210} color={X.cyan} opacity={0.35 + escape * 0.3} />
        <EscapeWheel x={390} y={820} r={190} rotation={tick * 6} color={X.amber} opacity={0.45 + escape * 0.55} />
        <PalletFork x={675} y={820} angle={Math.sin(t * 7.2) * 10} opacity={0.35 + escape * 0.65} />
        <path d="M 700 960 L 790 1080" stroke={X.steel} strokeWidth={10} opacity={0.5} />
        <g transform={`translate(840 1130)`} opacity={0.25}>
          <circle r={105} fill="none" stroke={X.steel} strokeWidth={15} /><circle r={25} fill={X.steel} />
        </g>
        <FocusRing x={620} y={790} rx={190} ry={210} t={t} color={X.cyan} opacity={escape} />
        <Leader x={220} y={540} tx={350} ty={630} text="ESCAPE WHEEL" color={X.amber} />
        <Leader x={800} y={590} tx={700} ty={730} text="PALLET FORK" color={X.cyan} opacity={escape} />
        <StatusPill x={540} y={1190} text={tick % 2 === 0 ? 'LOCK · THE WHEEL WAITS' : 'RELEASE · ONE TOOTH ADVANCES'} color={tick % 2 === 0 ? X.coral : X.green} opacity={escape} width={590} />
        <StatusPill x={540} y={1310} text="THE SPRING CANNOT DUMP ITS ENERGY AT ONCE" color={X.cyan} opacity={escape} width={680} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="balance" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="The balance wheel sets the rhythm" lines={['Oscillate. Regulate.', 'Repeat precisely.']} accent={X.violet} />
      <SvgStage>
        <Glow x={540} y={810} r={260} color={X.violet} opacity={0.45 + regulate * 0.25} />
        <g transform={`translate(540 810) rotate(${balanceAngle})`} opacity={0.45 + regulate * 0.55}>
          <circle r={255} fill="none" stroke={X.violet} strokeWidth={28} />
          <circle r={230} fill="none" stroke={X.white} strokeWidth={4} opacity={0.35} />
          {[0, 120, 240].map((a) => <path key={a} d="M 0 0 V -225" stroke={X.violet} strokeWidth={17} strokeLinecap="round" transform={`rotate(${a})`} />)}
          <circle r={37} fill={X.violet} stroke={X.white} strokeWidth={5} />
          {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={Math.cos(i * Math.PI / 6) * 255} cy={Math.sin(i * Math.PI / 6) * 255} r={11} fill={X.amber} />)}
        </g>
        <g transform={`translate(540 810) scale(${1 + Math.sin(t * 7.2) * 0.055})`} opacity={regulate}>
          <path d={spiralPath(0, 0, 35, 180, 6, -balanceAngle * Math.PI / 180)} fill="none" stroke={X.cyan} strokeWidth={7} />
        </g>
        <circle cx={540} cy={810} r={20} fill={X.steel} />
        <PalletFork x={540} y={1150} angle={Math.sin(t * 7.2) * 9} opacity={0.35 + regulate * 0.5} />
        <FocusRing x={540} y={810} rx={305} ry={305} t={t} color={X.violet} opacity={regulate} />
        <Leader x={170} y={550} tx={350} ty={650} text="BALANCE WHEEL" color={X.violet} />
        <Leader x={900} y={550} tx={680} ty={720} text="HAIRSPRING" color={X.cyan} opacity={regulate} />
        <StatusPill x={540} y={1360} text={Math.sin(t * 7.2) > 0 ? 'TICK · ONE CONTROLLED RELEASE' : 'TOCK · THE NEXT CONTROLLED RELEASE'} color={X.violet} opacity={regulate} width={650} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="The complete mechanical timekeeper" lines={['Store. Meter. Regulate.', 'Display the time.']} accent={X.green} size={58} />
      <SvgStage>
        <Gear x={210} y={850} r={125} teeth={22} rotation={t * 12} color={X.amber} spokes={0} />
        <path d={spiralPath(210, 850, 18, 95, 5, -t * 0.08)} fill="none" stroke={X.coral} strokeWidth={9} />
        <Arrow x1={340} y1={850} x2={410} y2={850} color={X.green} width={6} />
        <Gear x={485} y={850} r={76} teeth={15} rotation={-t * 20} color={X.steel} />
        <Arrow x1={570} y1={850} x2={630} y2={850} color={X.green} width={6} />
        <EscapeWheel x={710} y={850} r={75} rotation={tick * 6} color={X.cyan} />
        <g transform={`translate(895 850) rotate(${balanceAngle})`}>
          <circle r={105} fill="none" stroke={X.violet} strokeWidth={18} /><path d="M 0 0 V -95 M 0 0 L 82 48 M 0 0 L -82 48" stroke={X.violet} strokeWidth={10} />
        </g>
        <WatchFace x={540} y={1180} r={100} t={t} />
        <TinyLabel x={210} y={1045} text="SPRING ENERGY" color={X.amber} /><TinyLabel x={485} y={1045} text="GEARS" color={X.steel} /><TinyLabel x={710} y={1045} text="ESCAPEMENT" color={X.cyan} /><TinyLabel x={895} y={1045} text="OSCILLATOR" color={X.violet} />
        <StatusPill x={540} y={1380} text="REGULATED SPRING ENERGY BECOMES ACCURATE TIME" color={X.green} width={710} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['mechanical watch', 'spring energy', 'mainspring', 'barrel', 'series of gears', 'gear train', 'watch hands', 'escapement', 'balance wheel', 'steady rate', 'accurate time']} />
    <CalmSound narration="voiceovers/mechanical-watch/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={60} />
  </AbsoluteFill>;
};
export default Short40MechanicalWatch;
