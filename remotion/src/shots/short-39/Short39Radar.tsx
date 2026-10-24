import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line } from '../../lib/next-calm';
import { Arrow, FocusRing, MovingDots } from '../../lib/focus';
import {
  BodyText, CinematicBackground, DeviceStage, FlowPath, Glow, Leader, QuadraticPulse,
  SceneHeading, StatusPill, SvgStage, TinyLabel, X,
} from '../../lib/cinematic';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short39Radar', durationInSeconds: 56, fps: 30, width: 1080, height: 1920 };

const Aircraft: React.FC<{ x: number; y: number; scale?: number; opacity?: number; color?: string }> = ({ x, y, scale = 1, opacity = 1, color = X.steel }) => (
  <g transform={`translate(${x} ${y}) scale(${scale}) rotate(18)`} opacity={opacity}>
    <path d="M 0 -120 C 22 -110 25 -70 24 -28 L 145 52 L 145 76 L 25 45 L 20 105 L 58 130 L 58 146 L 0 132 L -58 146 L -58 130 L -20 105 L -25 45 L -145 76 L -145 52 L -24 -28 C -25 -70 -22 -110 0 -120 Z" fill={color} stroke={X.white} strokeWidth={4} strokeLinejoin="round" />
    <path d="M 0 -100 V 115 M -110 57 L 110 57" stroke={X.night} strokeWidth={4} opacity={0.35} />
    <ellipse cy={-67} rx={12} ry={24} fill={X.blue} opacity={0.65} />
  </g>
);

const RadarDish: React.FC<{ x: number; y: number; scale?: number; rotation?: number; opacity?: number }> = ({ x, y, scale = 1, rotation = 0, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
    <path d="M -85 165 H 85 L 55 110 H -55 Z" fill="#24364a" stroke={X.steel} strokeWidth={5} />
    <rect x={-22} y={10} width={44} height={115} rx={14} fill="#354a60" stroke={X.steel} strokeWidth={5} />
    <g transform={`rotate(${rotation})`}>
      <path d="M -135 -55 Q 0 115 135 -55 Q 0 25 -135 -55 Z" fill="#28425a" stroke={X.cyan} strokeWidth={7} />
      <path d="M -105 -45 Q 0 55 105 -45" fill="none" stroke={X.white} strokeWidth={3} opacity={0.35} />
      <path d="M 0 25 V -95" stroke={X.steel} strokeWidth={7} />
      <circle cy={-100} r={18} fill={X.amber} stroke={X.white} strokeWidth={4} />
    </g>
    <circle cy={18} r={26} fill={X.panel2} stroke={X.steel} strokeWidth={5} />
  </g>
);

const RadioArcs: React.FC<{ x: number; y: number; t: number; color?: string; opacity?: number; reverse?: boolean }> = ({ x, y, t, color = X.cyan, opacity = 1, reverse = false }) => (
  <g opacity={opacity} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round">
    {[75, 135, 195].map((r, i) => {
      const phase = (t * 0.7 + i / 3) % 1;
      const rr = reverse ? 210 - phase * 140 : 65 + phase * 145;
      return <path key={r} d={`M ${x + rr * 0.72} ${y - rr * 0.72} A ${rr} ${rr} 0 0 1 ${x + rr} ${y}`} opacity={0.85 - i * 0.18} />;
    })}
  </g>
);

const Short39Radar: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const dark = prog(t, line(VO, 'hook-dark').start - 0.1, line(VO, 'hook-dark').start + 0.7);
  const pulse = prog(t, line(VO, 'transmit-pulse').start - 0.1, line(VO, 'transmit-pulse').start + 0.8);
  const travel = prog(t, line(VO, 'transmit-travel').start - 0.1, line(VO, 'transmit-travel').start + 0.8);
  const echo = prog(t, line(VO, 'echo-return').start - 0.1, line(VO, 'echo-return').start + 0.8);
  const timing = prog(t, line(VO, 'range-time').start - 0.1, line(VO, 'range-time').start + 0.8);
  const half = prog(t, line(VO, 'range-half').start - 0.1, line(VO, 'range-half').start + 0.7);
  const scan = prog(t, line(VO, 'scan-map').start - 0.1, line(VO, 'scan-map').start + 0.8);
  const sweep = t * 0.75;
  const a1 = sweep - 0.20; const a2 = sweep + 0.20;
  const wedge = `M 540 840 L ${540 + Math.cos(a1) * 335} ${840 + Math.sin(a1) * 335} A 335 335 0 0 1 ${540 + Math.cos(a2) * 335} ${840 + Math.sin(a2) * 335} Z`;

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="A radar station searches the sky" lines={['Radio waves find', 'objects in the dark']} accent={X.cyan} />
      <SvgStage>
        <path d="M 90 630 C 220 540 330 640 440 590 C 560 530 680 620 800 565 C 890 525 950 555 1010 590" fill="none" stroke="#31445b" strokeWidth={65} strokeLinecap="round" opacity={0.22 + dark * 0.2} />
        <Glow x={790} y={690} r={140} color={X.blue} opacity={0.45} />
        <Aircraft x={790} y={690} scale={0.8} /><RadarDish x={290} y={1010} scale={0.9} rotation={-28} />
        <RadioArcs x={350} y={920} t={t} color={X.cyan} />
        <QuadraticPulse x1={390} y1={900} cx={570} cy={790} x2={730} y2={710} t={t} count={4} color={X.cyan} radius={10} speed={0.30} />
        <QuadraticPulse x1={730} y1={735} cx={560} cy={850} x2={390} y2={935} t={t} count={3} color={X.amber} radius={9} speed={0.26} opacity={dark} />
        <Leader x={810} y={505} tx={790} ty={575} text="DISTANT AIRCRAFT" color={X.steel} />
        <Leader x={215} y={1260} tx={275} ty={1150} text="RADAR ANTENNA" color={X.cyan} />
        <StatusPill x={650} y={1190} text="RADIO ECHOES WORK WITHOUT VISIBLE LIGHT" color={X.amber} opacity={dark} width={660} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="transmit" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.blue} /><DeviceStage accent={X.blue} />
      <SceneHeading eyebrow="The radar launches a precise radio pulse" lines={['Transmit. Travel.', 'Reach the object.']} accent={X.blue} />
      <SvgStage>
        <g opacity={0.35 + pulse * 0.65}>
          <rect x={90} y={950} width={250} height={190} rx={30} fill={X.panel2} stroke={X.blue} strokeWidth={4} />
          <TinyLabel x={215} y={1005} text="TRANSMITTER" color={X.blue} />
          <path d="M 130 1080 L 160 1035 L 190 1080 L 220 1035 L 250 1080 L 300 1035" fill="none" stroke={X.cyan} strokeWidth={7} />
          <FocusRing x={215} y={1045} rx={175} ry={145} t={t} color={X.blue} opacity={pulse} />
        </g>
        <RadarDish x={370} y={940} scale={0.65} rotation={-28} />
        <Aircraft x={825} y={665} scale={0.85} opacity={0.35 + travel * 0.65} />
        <path d="M 420 870 L 760 700" stroke={X.blue} strokeWidth={4} strokeDasharray="10 15" opacity={0.35} />
        <MovingDots x1={440} y1={855} x2={750} y2={710} t={t} color={X.cyan} count={6} radius={13} opacity={travel} speed={0.32} />
        <FocusRing x={825} y={665} rx={175} ry={175} t={t} color={X.cyan} opacity={travel} />
        <Leader x={710} y={1080} tx={600} ty={785} text="RADIO PULSE · SPEED OF LIGHT" color={X.cyan} opacity={travel} />
        <StatusPill x={540} y={1250} text="THE PULSE CROSSES THE SPACE BETWEEN THEM" color={X.blue} opacity={travel} width={700} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="echo" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="The object reflects part of the energy" lines={['A radio echo', 'returns to radar']} accent={X.amber} />
      <SvgStage>
        <RadarDish x={280} y={1030} scale={0.8} rotation={-28} opacity={0.7} />
        <Aircraft x={750} y={665} scale={1.05} />
        <Glow x={750} y={665} r={140} color={X.amber} opacity={echo} />
        <path d="M 350 920 L 665 710" stroke={X.blue} strokeWidth={5} strokeDasharray="9 18" opacity={0.2} />
        <path d="M 690 735 L 365 955" stroke={X.amber} strokeWidth={6} strokeDasharray="12 14" opacity={0.25 + echo * 0.55} />
        <MovingDots x1={690} y1={735} x2={370} y2={950} t={t} color={X.amber} count={6} radius={12} opacity={echo} speed={0.34} />
        {[0, 1, 2].map((i) => <path key={i} d={`M 760 690 L ${880 + i * 25} ${790 + i * 60}`} stroke={X.amber} strokeWidth={4} opacity={0.10 + echo * 0.12} />)}
        <FocusRing x={750} y={665} rx={200} ry={190} t={t} color={X.amber} opacity={echo} />
        <RadioArcs x={365} y={955} t={t} color={X.amber} opacity={echo} reverse />
        <Leader x={790} y={490} tx={760} ty={525} text="REFLECTION" color={X.amber} opacity={echo} />
        <StatusPill x={590} y={1260} text="ONLY SOME ENERGY RETURNS AS THE ECHO" color={X.amber} opacity={echo} width={670} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="range" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="The radar converts time into distance" lines={['Measure the echo’s', 'round-trip time']} accent={X.green} />
      <SvgStage>
        <RadarDish x={210} y={720} scale={0.55} rotation={-25} /><Aircraft x={865} y={610} scale={0.58} />
        <path d="M 285 750 L 810 650" stroke={X.steel} strokeWidth={4} strokeDasharray="10 10" opacity={0.5} />
        <Arrow x1={330} y1={735} x2={770} y2={652} color={X.green} width={5} opacity={timing} />
        <Arrow x1={770} y1={700} x2={330} y2={782} color={X.amber} width={5} opacity={timing} />
        <TinyLabel x={550} y={630} text="RANGE" color={X.green} opacity={half} />
        <g opacity={timing}>
          <rect x={115} y={925} width={850} height={200} rx={30} fill={X.panel} stroke={X.steel} strokeWidth={3} />
          <path d="M 175 1035 H 905" stroke={X.steel} strokeWidth={5} />
          <path d="M 220 1035 V 970 M 840 1035 V 970" stroke={X.cyan} strokeWidth={9} />
          <TinyLabel x={220} y={1090} text="PULSE OUT" color={X.cyan} /><TinyLabel x={840} y={1090} text="ECHO BACK" color={X.amber} />
          <path d="M 220 950 H 840" stroke={X.amber} strokeWidth={4} /><Arrow x1={220} y1={950} x2={840} y2={950} color={X.amber} width={4} />
          <TinyLabel x={530} y={920} text="ROUND-TRIP TIME" color={X.amber} />
        </g>
        <g opacity={half}>
          <rect x={140} y={1175} width={800} height={100} rx={28} fill="rgba(121,226,166,0.08)" stroke={X.green} strokeWidth={4} />
          <BodyText x={540} y={1240} text="RANGE = (SPEED OF LIGHT × TIME) ÷ 2" color={X.green} size={27} />
        </g>
      </SvgStage>
    </Scene>

    <Scene t={t} id="scan" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="The antenna repeats the measurement" lines={['Scan directions.', 'Map the echoes.']} accent={X.cyan} />
      <SvgStage>
        <Glow x={540} y={840} r={300} color={X.cyan} opacity={0.4} />
        {[110, 220, 335].map((r) => <circle key={r} cx={540} cy={840} r={r} fill="none" stroke={X.cyan} strokeWidth={3} opacity={0.25} />)}
        {[0, 45, 90, 135].map((a) => <line key={a} x1={540 - Math.cos(a * Math.PI / 180) * 335} y1={840 - Math.sin(a * Math.PI / 180) * 335} x2={540 + Math.cos(a * Math.PI / 180) * 335} y2={840 + Math.sin(a * Math.PI / 180) * 335} stroke={X.cyan} strokeWidth={2} opacity={0.16} />)}
        <path d={wedge} fill={X.cyan} opacity={0.09 + scan * 0.12} />
        <line x1={540} y1={840} x2={540 + Math.cos(sweep) * 335} y2={840 + Math.sin(sweep) * 335} stroke={X.cyan} strokeWidth={7} opacity={scan} />
        {[[710, 650], [365, 710], [650, 1040], [430, 1000], [785, 905]].map(([x, y], i) => <g key={i} opacity={prog(scan, i * 0.09, i * 0.09 + 0.28)}>
          <circle cx={x} cy={y} r={24} fill={X.amber} opacity={0.15} /><circle cx={x} cy={y} r={9} fill={X.amber} />
        </g>)}
        <circle cx={540} cy={840} r={35} fill={X.panel2} stroke={X.cyan} strokeWidth={5} />
        <circle cx={540} cy={840} r={10} fill={X.cyan} />
        <TinyLabel x={540} y={1230} text="EACH NEW DIRECTION ADDS ANOTHER ECHO MEASUREMENT" color={X.cyan} opacity={scan} />
        <StatusPill x={540} y={1320} text="ROTATING SCAN → SURROUNDING OBJECT MAP" color={X.amber} opacity={scan} width={670} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="The radar’s complete location method" lines={['Pulse out. Echo back.', 'Time becomes range.']} accent={X.green} size={58} />
      <SvgStage>
        <RadarDish x={280} y={940} scale={0.85} rotation={-28} /><Aircraft x={790} y={660} scale={0.9} />
        <QuadraticPulse x1={370} y1={840} cx={560} cy={740} x2={710} y2={680} t={t} count={4} color={X.cyan} radius={11} speed={0.31} />
        <QuadraticPulse x1={710} y1={720} cx={560} cy={825} x2={370} y2={900} t={t} count={4} color={X.amber} radius={10} speed={0.29} />
        <Leader x={540} y={545} tx={560} ty={755} text="RADIO WAVES · NOT VISIBLE LIGHT" color={X.cyan} />
        <StatusPill x={540} y={1190} text="RANGE = HALF THE ROUND-TRIP LIGHT-TRAVEL DISTANCE" color={X.green} width={790} />
        <TinyLabel x={540} y={1310} text="REPEAT IN NEW DIRECTIONS TO LOCATE MORE OBJECTS" color={X.steel} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['radar', 'radio waves', 'echoes', 'darkness', 'transmitter', 'antenna', 'radio pulse', 'speed of light', 'aircraft', 'reflects', 'round-trip time', 'range', 'rotating antenna']} />
    <CalmSound narration="voiceovers/radar/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={56} />
  </AbsoluteFill>;
};
export default Short39Radar;
