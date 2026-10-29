import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line, wavePath } from '../../lib/next-calm';
import { Arrow, FocusRing, MovingDots } from '../../lib/focus';
import {
  CinematicBackground, DeviceStage, FlowPath, Glow, Leader, SceneHeading,
  StatusPill, SvgStage, TinyLabel, X,
} from '../../lib/cinematic';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short50LedBulb', durationInSeconds: 45.5, fps: 30, width: 1080, height: 1920 };

const LedChips: React.FC<{ x: number; y: number; on?: number }> = ({ x, y, on = 1 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-150} y={-45} width={300} height={90} rx={22} fill="#244258" stroke={X.steel} strokeWidth={6} />
    {[-95, 0, 95].map((cx) => <g key={cx}>
      <rect x={cx - 32} y={-28} width={64} height={56} rx={10} fill="#4b5b90" stroke={X.violet} strokeWidth={4} />
      <Glow x={cx} y={0} r={48} color={X.amber} opacity={on * 0.75} />
      <circle cx={cx} cy={0} r={11} fill={on > 0.4 ? X.white : X.violet} />
    </g>)}
  </g>
);

const Bulb: React.FC<{ x: number; y: number; t: number; on?: number; cutaway?: boolean }> = ({ x, y, t, on = 1, cutaway = false }) => (
  <g transform={`translate(${x} ${y})`}>
    <Glow x={0} y={-90} r={310} color={X.amber} opacity={on * 0.65} />
    <path d="M -245 -40 Q -245 -340 0 -350 Q 245 -340 245 -40 L 185 80 H -185 Z" fill={cutaway ? '#1b3448' : '#d8e5e7'} fillOpacity={cutaway ? 0.55 : 0.88} stroke={X.white} strokeWidth={9} />
    <LedChips x={0} y={20} on={on} />
    <rect x={-180} y={80} width={360} height={85} rx={22} fill="#41576a" stroke={X.steel} strokeWidth={8} />
    {[-135, -75, -15, 45, 105].map((y) => <path key={y} d={`M -170 ${165 + y} H 170`} stroke={X.steel} strokeWidth={18} />)}
    <path d="M -115 305 V 390 M 115 305 V 390 M -115 390 H 115" stroke={X.steel} strokeWidth={25} />
    {[-1, 1].map((side) => [0, 1, 2].map((i) => <path key={`${side}-${i}`} d={`M ${side * 190} -230 Q ${side * (310 + i * 55)} -180 ${side * (335 + i * 60)} -70`} fill="none" stroke={X.amber} strokeWidth={8} strokeLinecap="round" strokeDasharray="20 22" strokeDashoffset={-t * 45} opacity={on * (0.75 - i * 0.13)} />))}
  </g>
);

const Short50LedBulb: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const light = 0.65 + prog(t, 0.02, 0.55) * 0.35;
  const chips = prog(t, line(VO, 'hook-chips').start - 0.08, line(VO, 'hook-chips').start + 0.60);
  const driver = prog(t, line(VO, 'driver-current').start - 0.08, line(VO, 'driver-current').start + 0.60);
  const carriers = prog(t, line(VO, 'junction-carriers').start - 0.08, line(VO, 'junction-carriers').start + 0.60);
  const photons = prog(t, line(VO, 'junction-photons').start - 0.08, line(VO, 'junction-photons').start + 0.60);
  const phosphor = prog(t, line(VO, 'white-phosphor').start - 0.08, line(VO, 'white-phosphor').start + 0.60);
  const diffuse = prog(t, line(VO, 'white-diffuse').start - 0.08, line(VO, 'white-diffuse').start + 0.60);

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="The efficient light comes first" lines={['Semiconductor chips', 'make the light']} accent={X.amber} />
      <SvgStage>
        <Bulb x={465} y={800} t={t} on={light} cutaway />
        <FocusRing x={465} y={820} rx={215} ry={110} t={t} color={X.amber} opacity={chips} />
        <Leader x={810} y={690} tx={570} ty={820} text="TINY LED CHIPS" color={X.amber} opacity={chips} />
        <g transform="translate(875 1010)" opacity={0.30 + chips * 0.45}>
          <path d="M -95 -40 Q -95 -190 0 -195 Q 95 -190 95 -40 L 65 45 H -65 Z" fill="#263647" stroke={X.steel} strokeWidth={7} />
          <path d="M -35 -45 Q -20 -100 0 -45 T 35 -45" fill="none" stroke={X.coral} strokeWidth={9} />
          <path d="M -50 55 V 135 M 50 55 V 135 M -50 135 H 50" stroke={X.steel} strokeWidth={17} />
          {[0, 1, 2].map((i) => <path key={i} d={`M ${-50 + i * 50} -225 Q ${-65 + i * 55} -265 ${-45 + i * 45} -300`} fill="none" stroke={X.coral} strokeWidth={5} opacity={0.55} />)}
          <TinyLabel x={0} y={205} text="FILAMENT · MORE HEAT" color={X.coral} />
        </g>
        <StatusPill x={540} y={1340} text="LED LIGHT · NO GLOWING METAL FILAMENT" color={X.amber} opacity={chips} width={670} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="driver" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="The base contains power electronics" lines={['The driver controls', 'the direct current']} accent={X.violet} />
      <SvgStage>
        <path d={wavePath(70, 820, 250, 70, 2.5, t * 2)} fill="none" stroke={X.coral} strokeWidth={9} />
        <TinyLabel x={195} y={970} text="HOUSEHOLD POWER" color={X.coral} />
        <Arrow x1={320} y1={820} x2={395} y2={820} color={X.violet} width={8} />
        <g transform="translate(550 820)">
          <rect x={-150} y={-220} width={300} height={440} rx={40} fill="#173629" stroke={X.green} strokeWidth={8} />
          {[[-75, -120], [60, -105], [-65, 15], [65, 65]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}>
            <rect x={-40} y={-32} width={80} height={64} rx={12} fill={i % 2 ? '#31445c' : '#554634'} stroke={i % 2 ? X.blue : X.amber} strokeWidth={5} />
            <path d="M -60 0 H -40 M 40 0 H 60" stroke={X.steel} strokeWidth={6} />
          </g>)}
          <path d="M -110 -175 H 110 V 175 H -110 Z" fill="none" stroke={X.green} strokeWidth={4} strokeDasharray="8 10" opacity={0.45} />
          <FocusRing x={0} y={0} rx={195} ry={270} t={t} color={X.violet} opacity={driver} />
          <TinyLabel x={0} y={300} text="LED DRIVER" color={X.violet} />
        </g>
        <Arrow x1={705} y1={820} x2={770} y2={820} color={X.green} width={8} />
        <path d="M 775 820 H 1010" stroke={X.cyan} strokeWidth={10} strokeLinecap="round" />
        <MovingDots x1={770} y1={820} x2={1010} y2={820} t={t} count={5} color={X.white} radius={8} speed={0.24} />
        <TinyLabel x={890} y={970} text="CONTROLLED DC" color={X.cyan} />
        <StatusPill x={540} y={1320} text="THE DRIVER REGULATES CURRENT TO THE CHIPS" color={X.violet} opacity={driver} width={730} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="junction" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="The semiconductor junction releases energy" lines={['Charges recombine', 'photons emerge']} accent={X.amber} />
      <SvgStage>
        <rect x={165} y={560} width={750} height={570} rx={45} fill="#14273a" stroke={X.steel} strokeWidth={9} />
        <rect x={200} y={595} width={680} height={225} rx={25} fill="#4b315d" opacity={0.58} />
        <rect x={200} y={820} width={680} height={275} rx={25} fill="#1e4660" opacity={0.62} />
        <path d="M 200 820 H 880" stroke={X.amber} strokeWidth={8} strokeDasharray="16 12" strokeDashoffset={-t * 35} />
        <TinyLabel x={275} y={650} text="HOLES" color={X.coral} />
        <TinyLabel x={275} y={1035} text="ELECTRONS" color={X.blue} />
        <TinyLabel x={540} y={1170} text="SEMICONDUCTOR JUNCTION" color={X.amber} />
        {Array.from({ length: 16 }, (_, i) => {
          const p = (t * 0.26 + i / 16) % 1; const x = 350 + (i % 4) * 125; const top = i % 2 === 0;
          const y = top ? 650 + p * 155 : 1030 - p * 190;
          return <g key={i} opacity={0.20 + carriers * 0.80}>
            <circle cx={x} cy={y} r={15} fill={top ? X.night : X.blue} stroke={top ? X.coral : X.blue} strokeWidth={5} />
            <text x={x} y={y + 7} textAnchor="middle" fill={top ? X.coral : X.white} fontSize={18} fontWeight={700}>{top ? '+' : '−'}</text>
          </g>;
        })}
        <g opacity={photons}>
          <Glow x={540} y={820} r={240} color={X.amber} opacity={0.65} />
          {Array.from({ length: 12 }, (_, i) => {
            const p = (t * 0.32 + i / 12) % 1; const a = -Math.PI * 0.90 + i * Math.PI * 0.16; const r = 35 + p * 220;
            return <circle key={i} cx={540 + Math.cos(a) * r} cy={820 + Math.sin(a) * r} r={8 + p * 5} fill={X.amber} opacity={1 - p * 0.6} />;
          })}
          <FocusRing x={540} y={820} rx={350} ry={270} t={t} color={X.amber} opacity={0.75} />
        </g>
        <StatusPill x={540} y={1350} text="RECOMBINATION RELEASES ENERGY AS LIGHT" color={X.amber} opacity={photons} width={700} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="white" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="A chip becomes a useful white bulb" lines={['Phosphor and diffusion', 'shape the light']} accent={X.cyan} />
      <SvgStage>
        <g transform="translate(285 820)">
          <rect x={-130} y={20} width={260} height={105} rx={25} fill="#244258" stroke={X.blue} strokeWidth={7} />
          <rect x={-70} y={45} width={140} height={55} rx={10} fill="#425ca0" />
          <rect x={-155} y={-80} width={310} height={65} rx={25} fill={X.amber} opacity={0.30 + phosphor * 0.45} stroke={X.amber} strokeWidth={5} />
          <TinyLabel x={0} y={-120} text="PHOSPHOR COATING" color={X.amber} />
          {[0, 1, 2].map((i) => <g key={i}>
            <Arrow x1={-60 + i * 60} y1={30} x2={-60 + i * 60} y2={-5} color={X.blue} width={6} />
            <Arrow x1={-60 + i * 60} y1={-95} x2={-100 + i * 100} y2={-245} color={phosphor > 0.4 ? X.white : X.blue} width={7} opacity={0.25 + phosphor * 0.75} />
          </g>)}
          <FocusRing x={0} y={-50} rx={190} ry={200} t={t} color={X.amber} opacity={phosphor} />
          <TinyLabel x={0} y={195} text="BLUE CHIP → WHITE LIGHT" color={X.amber} />
        </g>
        <g transform="translate(780 835)">
          <path d="M -175 -20 Q -175 -270 0 -280 Q 175 -270 175 -20 L 130 80 H -130 Z" fill={diffuse > 0.4 ? '#dce9e9' : '#24394c'} fillOpacity={0.72} stroke={X.white} strokeWidth={8} />
          {[-1, 1].map((side) => [0, 1].map((i) => <path key={`${side}-${i}`} d={`M ${side * 85} -160 Q ${side * (190 + i * 50)} -120 ${side * (225 + i * 60)} 10`} fill="none" stroke={X.amber} strokeWidth={7} strokeDasharray="17 19" strokeDashoffset={-t * 40} opacity={diffuse} />))}
          <rect x={-125} y={80} width={250} height={85} rx={20} fill="#465c6e" stroke={X.steel} strokeWidth={7} />
          {[0, 1, 2].map((i) => <Arrow key={i} x1={-70 + i * 70} y1={190} x2={-70 + i * 70} y2={285} color={X.coral} width={6} opacity={diffuse} />)}
          <FocusRing x={0} y={-80} rx={215} ry={245} t={t} color={X.cyan} opacity={diffuse} />
          <TinyLabel x={0} y={355} text="DIFFUSER + METAL HEAT PATH" color={X.cyan} />
        </g>
        <StatusPill x={540} y={1360} text="EVEN LIGHT · HEAT CARRIED AWAY" color={X.cyan} opacity={diffuse} width={620} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="One direct energy conversion" lines={['Controlled current', 'becomes light']} accent={X.green} />
      <SvgStage>
        <g transform="translate(180 820)">
          <rect x={-100} y={-120} width={200} height={240} rx={30} fill="#173629" stroke={X.green} strokeWidth={7} />
          <path d="M -65 0 H 65" stroke={X.cyan} strokeWidth={10} />
          <MovingDots x1={-65} y1={0} x2={65} y2={0} t={t} count={4} color={X.white} radius={8} speed={0.30} />
          <TinyLabel x={0} y={205} text="DRIVER + CURRENT" color={X.green} />
        </g>
        <Arrow x1={310} y1={820} x2={400} y2={820} color={X.green} width={8} />
        <g transform="translate(540 820)">
          <rect x={-120} y={-135} width={240} height={270} rx={30} fill={X.panel2} stroke={X.violet} strokeWidth={8} />
          <path d="M -120 0 H 120" stroke={X.amber} strokeWidth={7} strokeDasharray="12 10" strokeDashoffset={-t * 30} />
          {[0, 1, 2].map((i) => <g key={i}>
            <circle cx={-65 + i * 65} cy={-55 + Math.sin(t * 2 + i) * 20} r={14} fill={X.night} stroke={X.coral} strokeWidth={5} />
            <circle cx={-65 + i * 65} cy={60 - Math.sin(t * 2 + i) * 20} r={12} fill={X.blue} />
          </g>)}
          <Glow x={0} y={0} r={105} color={X.amber} opacity={0.65} />
          <TinyLabel x={0} y={205} text="JUNCTION EMITS" color={X.amber} />
        </g>
        <Arrow x1={690} y1={820} x2={770} y2={820} color={X.green} width={8} />
        <g transform="translate(875 850) scale(0.42)"><Bulb x={0} y={0} t={t} on={1} /></g>
        <TinyLabel x={875} y={1070} text="LIGHT" color={X.amber} />
        <StatusPill x={540} y={1320} text="ELECTRICAL ENERGY → PHOTONS → USEFUL LIGHT" color={X.green} width={720} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['LED bulb', 'bright light', 'less power', 'incandescent bulb', 'semiconductor chips', 'glowing metal filament', 'driver', 'controlled direct current', 'electrons and holes', 'junction', 'recombine', 'photons', 'phosphor coating', 'white light', 'diffuser', 'carries heat away']} />
    <CalmSound narration="voiceovers/led-bulb/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={45.5} />
  </AbsoluteFill>;
};
export default Short50LedBulb;
