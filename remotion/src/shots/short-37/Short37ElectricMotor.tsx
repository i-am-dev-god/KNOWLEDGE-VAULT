import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line } from '../../lib/next-calm';
import { Arrow, FocusRing, MovingDots } from '../../lib/focus';
import {
  CircularFlow, CinematicBackground, DeviceStage, Glow, Leader,
  SceneHeading, StatusPill, SvgStage, TinyLabel, X,
} from '../../lib/cinematic';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short37ElectricMotor', durationInSeconds: 58, fps: 30, width: 1080, height: 1920 };

const Magnet: React.FC<{ x: number; y: number; pole: 'N' | 'S'; side: 'left' | 'right'; opacity?: number }> = ({ x, y, pole, side, opacity = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <rect x={side === 'left' ? -150 : -45} y={-220} width={195} height={440} rx={28} fill={pole === 'N' ? '#66324b' : '#214b68'} stroke={pole === 'N' ? X.coral : X.blue} strokeWidth={5} />
    <rect x={side === 'left' ? 20 : -55} y={-175} width={35} height={350} rx={14} fill={pole === 'N' ? X.coral : X.blue} opacity={0.8} />
    <text x={side === 'left' ? -55 : 55} y={22} textAnchor="middle" fill={X.white} fontSize={64} fontWeight={800}>{pole}</text>
  </g>
);

const Coil: React.FC<{ x: number; y: number; angle?: number; color?: string; opacity?: number; current?: boolean; reverse?: boolean }> = ({
  x, y, angle = 0, color = X.amber, opacity = 1, current = false, reverse = false,
}) => {
  const frame = useCurrentFrame(); const time = frame / 30;
  return <g transform={`translate(${x} ${y}) rotate(${angle})`} opacity={opacity}>
    <rect x={-155} y={-210} width={310} height={420} rx={45} fill="rgba(255,201,104,0.055)" stroke="#7b5428" strokeWidth={29} />
    <rect x={-155} y={-210} width={310} height={420} rx={45} fill="none" stroke={color} strokeWidth={17} />
    <rect x={-133} y={-188} width={266} height={376} rx={35} fill="none" stroke={X.white} strokeWidth={3} opacity={0.3} />
    {current && <>
      <rect x={-155} y={-210} width={310} height={420} rx={45} fill="none" stroke={color} strokeWidth={7} strokeDasharray="16 28" strokeDashoffset={(reverse ? 1 : -1) * time * 85} />
      <Arrow x1={-155} y1={reverse ? -80 : 80} x2={-155} y2={reverse ? 80 : -80} color={color} width={6} />
      <Arrow x1={155} y1={reverse ? 80 : -80} x2={155} y2={reverse ? -80 : 80} color={color} width={6} />
    </>}
  </g>;
};

const Commutator: React.FC<{ x: number; y: number; angle?: number; reversed?: boolean; opacity?: number }> = ({ x, y, angle = 0, reversed = false, opacity = 1 }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <g transform={`rotate(${angle})`}>
      <path d="M -135 -95 A 165 165 0 0 1 -135 95" fill="none" stroke={reversed ? X.blue : X.amber} strokeWidth={48} strokeLinecap="round" />
      <path d="M 135 95 A 165 165 0 0 1 135 -95" fill="none" stroke={reversed ? X.amber : X.blue} strokeWidth={48} strokeLinecap="round" />
      <circle r={68} fill={X.panel2} stroke={X.steel} strokeWidth={5} />
      <circle r={24} fill={X.steel} />
    </g>
    <rect x={-230} y={-48} width={72} height={96} rx={16} fill="#303c4c" stroke={X.steel} strokeWidth={4} />
    <rect x={158} y={-48} width={72} height={96} rx={16} fill="#303c4c" stroke={X.steel} strokeWidth={4} />
    <TinyLabel x={-260} y={-75} text="+" color={X.coral} /><TinyLabel x={260} y={-75} text="−" color={X.blue} />
  </g>
);

const Short37ElectricMotor: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const interaction = prog(t, line(VO, 'hook-interaction').start - 0.1, line(VO, 'hook-interaction').start + 0.7);
  const field = prog(t, line(VO, 'field-magnets').start - 0.1, line(VO, 'field-magnets').start + 0.8);
  const current = prog(t, line(VO, 'coil-current').start - 0.1, line(VO, 'coil-current').start + 0.8);
  const torque = prog(t, line(VO, 'force-torque').start - 0.1, line(VO, 'force-torque').start + 0.8);
  const rotate = prog(t, line(VO, 'force-rotate').start - 0.1, line(VO, 'force-rotate').start + 1.0);
  const reverse = prog(t, line(VO, 'switch-reverse').start - 0.1, line(VO, 'switch-reverse').start + 1.2);
  const reversed = reverse > 0.55;

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="Inside a brushed DC electric motor" lines={['Electricity becomes', 'continuous rotation']} accent={X.amber} size={59} />
      <SvgStage>
        <Glow x={535} y={845} r={280} color={X.amber} opacity={0.65} />
        <circle cx={535} cy={845} r={320} fill="#0a1524" stroke="#4d5e70" strokeWidth={28} />
        <circle cx={535} cy={845} r={277} fill="none" stroke={X.steel} strokeWidth={4} opacity={0.35} />
        {Array.from({ length: 12 }, (_, i) => <circle key={i} cx={535 + Math.cos(i * Math.PI / 6) * 298} cy={845 + Math.sin(i * Math.PI / 6) * 298} r={9} fill={X.steel} />)}
        <Magnet x={340} y={845} pole="N" side="left" opacity={0.75} /><Magnet x={730} y={845} pole="S" side="right" opacity={0.75} />
        <Coil x={535} y={845} angle={t * 28} current color={X.amber} />
        <circle cx={535} cy={845} r={38} fill={X.steel} stroke={X.white} strokeWidth={4} />
        <path d="M 690 745 A 190 190 0 0 0 535 655" fill="none" stroke={X.cyan} strokeWidth={9} strokeDasharray="13 13" />
        <Arrow x1={575} y1={663} x2={525} y2={654} color={X.cyan} width={7} />
        <FocusRing x={535} y={845} rx={230} ry={275} t={t} color={X.amber} opacity={interaction} />
        <StatusPill x={535} y={1260} text="CURRENT + MAGNETISM → TORQUE" color={X.amber} opacity={interaction} width={590} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="field" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.blue} /><DeviceStage accent={X.blue} />
      <SceneHeading eyebrow="The stationary motor magnets" lines={['A magnetic field', 'crosses the rotor']} accent={X.blue} />
      <SvgStage>
        <Magnet x={290} y={835} pole="N" side="left" /><Magnet x={790} y={835} pole="S" side="right" />
        {[690, 765, 835, 905, 980].map((y, i) => <g key={y}>
          <path d={`M 355 ${y} C 480 ${y + (i - 2) * 14} 620 ${y + (i - 2) * 14} 725 ${y}`} fill="none" stroke={X.blue} strokeWidth={5} opacity={0.28 + field * 0.45} />
          <MovingDots x1={385} y1={y} x2={695} y2={y} t={t} color={X.cyan} count={3} radius={7} opacity={field} speed={0.26 + i * 0.015} />
        </g>)}
        <Coil x={540} y={835} opacity={0.16} color={X.steel} />
        <FocusRing x={540} y={835} rx={245} ry={285} t={t} color={X.blue} opacity={field} />
        <Leader x={540} y={565} tx={540} ty={655} text="FIELD: NORTH → SOUTH" color={X.blue} opacity={field} />
        <StatusPill x={540} y={1250} text="THE COIL SITS INSIDE THIS FIELD" color={X.cyan} opacity={field} width={610} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="coil" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="The rotor coil carries current" lines={['Energize the coil', 'inside the field']} accent={X.amber} />
      <SvgStage>
        <Magnet x={275} y={810} pole="N" side="left" opacity={0.24} /><Magnet x={805} y={810} pole="S" side="right" opacity={0.24} />
        <path d="M 355 690 C 490 650 620 650 725 690 M 355 810 H 725 M 355 930 C 490 970 620 970 725 930" fill="none" stroke={X.blue} strokeWidth={5} opacity={0.2} />
        <Coil x={540} y={810} current color={X.amber} opacity={0.35 + current * 0.65} />
        <FocusRing x={540} y={810} rx={215} ry={275} t={t} color={X.amber} opacity={current} />
        <circle cx={190} cy={1130} r={67} fill={X.panel2} stroke={X.coral} strokeWidth={4} /><TinyLabel x={190} y={1145} text="DC" color={X.white} />
        <path d="M 255 1130 C 370 1130 310 1040 385 1010" fill="none" stroke={X.coral} strokeWidth={7} />
        <MovingDots x1={270} y1={1125} x2={380} y2={1020} t={t} color={X.amber} count={4} radius={8} opacity={current} />
        <Leader x={760} y={1170} tx={625} ty={1010} text="CURRENT FLOWS AROUND THE COIL" color={X.amber} opacity={current} />
        <StatusPill x={540} y={1280} text="THE CURRENT-CARRYING WIRE IS READY TO MOVE" color={X.amber} opacity={current} width={790} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="torque" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.coral} /><DeviceStage accent={X.coral} />
      <SceneHeading eyebrow="Magnetic forces create mechanical torque" lines={['Opposite forces', 'turn the shaft']} accent={X.coral} />
      <SvgStage>
        <circle cx={540} cy={825} r={255} fill="none" stroke={X.steel} strokeWidth={5} opacity={0.25} />
        <Coil x={540} y={825} angle={-rotate * 55} current color={X.amber} opacity={0.8} />
        <g opacity={0.3 + torque * 0.7}>
          <circle cx={385} cy={825} r={35} fill={X.panel2} stroke={X.amber} strokeWidth={6} /><TinyLabel x={385} y={836} text="I" color={X.amber} />
          <circle cx={695} cy={825} r={35} fill={X.panel2} stroke={X.amber} strokeWidth={6} /><TinyLabel x={695} y={836} text="I" color={X.amber} />
          <Arrow x1={350} y1={710} x2={350} y2={950} color={X.coral} width={12} />
          <Arrow x1={730} y1={950} x2={730} y2={710} color={X.coral} width={12} />
          <TinyLabel x={300} y={1010} text="FORCE" color={X.coral} /><TinyLabel x={780} y={1010} text="FORCE" color={X.coral} />
        </g>
        <path d="M 740 640 A 285 285 0 0 0 375 595" fill="none" stroke={X.cyan} strokeWidth={10} strokeDasharray="15 15" opacity={rotate} />
        <Arrow x1={405} y1={600} x2={355} y2={585} color={X.cyan} width={8} opacity={rotate} />
        <circle cx={540} cy={825} r={34} fill={X.steel} /><Leader x={835} y={570} tx={570} ty={805} text="SHAFT ROTATES" color={X.cyan} opacity={rotate} />
        <StatusPill x={540} y={1260} text="TWO FORCES · ONE TURNING MOMENT" color={X.coral} opacity={torque} width={650} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="switch" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="The split-ring commutator prevents a stall" lines={['Reverse current', 'every half turn']} accent={X.violet} size={60} />
      <SvgStage>
        <Coil x={540} y={690} angle={reverse * 180} current reverse={reversed} color={reversed ? X.blue : X.amber} opacity={0.55} />
        <path d="M 420 860 L 455 925 M 660 860 L 625 925" stroke={X.steel} strokeWidth={9} />
        <Commutator x={540} y={1030} angle={reverse * 180} reversed={reversed} />
        <FocusRing x={540} y={1030} rx={285} ry={235} t={t} color={X.violet} opacity={reverse} />
        <Leader x={170} y={650} tx={385} ty={930} text="STATIONARY BRUSH" color={X.steel} anchor="start" />
        <Leader x={860} y={650} tx={700} ty={950} text="ROTATING SPLIT RING" color={X.violet} anchor="end" opacity={reverse} />
        <StatusPill x={540} y={450} text={reversed ? 'CURRENT REVERSED · TORQUE CONTINUES' : 'APPROACHING THE HALF-TURN SWITCH'} color={reversed ? X.cyan : X.coral} width={750} />
        <StatusPill x={540} y={1320} text="BRUSHES FEED THE ROTATING RING" color={X.violet} opacity={reverse} width={590} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="The motor repeats the cycle" lines={['Switch current.', 'Sustain rotation.']} accent={X.cyan} />
      <SvgStage>
        <Glow x={540} y={810} r={260} color={X.cyan} opacity={0.5} />
        <circle cx={540} cy={810} r={275} fill={X.panel} stroke={X.steel} strokeWidth={18} />
        <Magnet x={355} y={810} pole="N" side="left" opacity={0.45} /><Magnet x={725} y={810} pole="S" side="right" opacity={0.45} />
        <Coil x={540} y={810} angle={t * 65} current reverse={Math.floor(t * 1.4) % 2 === 1} color={X.amber} />
        <CircularFlow cx={540} cy={810} r={310} t={t} color={X.cyan} count={5} speed={0.13} />
        <Leader x={180} y={1190} tx={370} ty={1010} text="1 · CURRENT" color={X.amber} />
        <Leader x={540} y={1190} tx={540} ty={1085} text="2 · SWITCH" color={X.violet} />
        <Leader x={900} y={1190} tx={745} ty={1000} text="3 · ROTATE" color={X.cyan} />
        <StatusPill x={540} y={1300} text="MAGNETIC FORCES KEEP TURNING THE SHAFT" color={X.cyan} width={710} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['electric motor', 'electrical energy', 'magnetic field', 'electric current', 'coil', 'torque', 'shaft', 'split-ring commutator', 'reverses the current']} />
    <CalmSound narration="voiceovers/electric-motor/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={58} />
  </AbsoluteFill>;
};
export default Short37ElectricMotor;
