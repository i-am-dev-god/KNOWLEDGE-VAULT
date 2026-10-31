import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line, wavePath } from '../../lib/next-calm';
import { Arrow, MovingDots } from '../../lib/focus';
import { CinematicBackground, DeviceStage, Glow, SceneHeading, SvgStage, X } from '../../lib/cinematic';
import { ClearLabel, HighlightPart, PanelLabel, StageNote } from '../../lib/clear-device';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short50LedBulb', durationInSeconds: 45.5, fps: 30, width: 1080, height: 1920 };

const LedBoard: React.FC<{ x: number; y: number; on?: number; scale?: number }> = ({ x, y, on = 1, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-165} y={-35} width={330} height={70} rx={18} fill="#29475b" stroke={X.steel} strokeWidth={6} />
    {[-100, 0, 100].map((cx) => <g key={cx}>
      <rect x={cx - 33} y={-28} width={66} height={48} rx={9} fill="#425b9a" stroke={X.violet} strokeWidth={4} />
      <circle cx={cx} cy={-4} r={10} fill={on > 0.4 ? X.white : X.violet} />
      <Glow x={cx} y={-4} r={42} color={X.amber} opacity={on * 0.42} />
    </g>)}
  </g>
);

const LedBulb: React.FC<{ x: number; y: number; t: number; on?: number; scale?: number; rays?: boolean }> = ({ x, y, t, on = 1, scale = 1, rays = true }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <Glow x={0} y={-140} r={260} color={X.amber} opacity={on * 0.42} />
    <path d="M -230 -30 Q -230 -330 0 -345 Q 230 -330 230 -30 L 175 80 H -175 Z" fill="#cfe0e4" fillOpacity={0.22 + on * 0.20} stroke={X.white} strokeWidth={9} />
    <path d="M 0 -345 Q 230 -330 230 -30 L 175 80 H 0 Z" fill="#dce9e9" fillOpacity={0.20} stroke={X.steel} strokeWidth={4} />
    <LedBoard x={0} y={75} on={on} />
    <rect x={-175} y={115} width={350} height={85} rx={20} fill="#415a6c" stroke={X.steel} strokeWidth={7} />
    {[0, 1, 2, 3].map((i) => <path key={i} d={`M -160 ${215 + i * 38} H 160`} stroke={X.steel} strokeWidth={17} />)}
    <path d="M -105 345 V 405 M 105 345 V 405 M -105 405 H 105" stroke={X.steel} strokeWidth={24} />
    <rect x={-105} y={205} width={210} height={125} rx={20} fill="#173629" stroke={X.green} strokeWidth={5} opacity={0.85} />
    {rays && [-1, 1].map((side) => [0, 1].map((i) => <path key={`${side}-${i}`} d={`M ${side * 165} -210 Q ${side * (250 + i * 55)} -170 ${side * (280 + i * 60)} -60`} fill="none" stroke={X.amber} strokeWidth={8} strokeLinecap="round" opacity={on * (0.75 - i * 0.15)} />))}
  </g>
);

const FilamentBulb: React.FC<{ x: number; y: number; scale?: number }> = ({ x, y, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M -150 -20 Q -150 -260 0 -270 Q 150 -260 150 -20 L 105 75 H -105 Z" fill="#2a3643" stroke={X.steel} strokeWidth={8} />
    <path d="M -55 -40 Q -25 -120 0 -40 T 55 -40" fill="none" stroke={X.coral} strokeWidth={10} />
    <path d="M -85 80 V 230 M 85 80 V 230 M -85 230 H 85" stroke={X.steel} strokeWidth={22} />
    {[-70, 0, 70].map((hx) => <path key={hx} d={`M ${hx} -290 Q ${hx - 25} -330 ${hx} -365`} fill="none" stroke={X.coral} strokeWidth={7} opacity={0.65} />)}
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
      <SceneHeading eyebrow="A recognizable LED bulb, opened up" lines={['Light starts at the LED board', 'not at a metal filament']} accent={X.amber} size={56} />
      <SvgStage>
        <PanelLabel text="DIFFUSER · LED BOARD · HEAT SINK · DRIVER · BASE" color={X.amber} />
        <LedBulb x={440} y={850} t={t} on={light} scale={0.88} />
        <ClearLabel x={760} y={650} targetX={530} targetY={900} text="LED chips on the board" color={X.amber} opacity={chips} />
        <ClearLabel x={735} y={1100} targetX={535} targetY={1080} text="Metal heat sink" color={X.steel} />
        <g transform="translate(855 1040) scale(0.46)"><FilamentBulb x={0} y={0} /></g>
        <ClearLabel x={855} y={1250} text="Filament bulb · more heat" color={X.coral} size={20} />
        {chips > 0.05 && <HighlightPart x={280} y={855} width={320} height={110} color={X.amber} opacity={chips * 0.55} />}
        <StageNote y={1325} text="The small chips emit light directly; no glowing wire is needed" color={X.amber} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="driver" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="The driver stays inside the bulb base" lines={['Socket power enters the driver', 'controlled DC feeds the board']} accent={X.violet} size={55} />
      <SvgStage>
        <PanelLabel text="LOWER BULB · CONNECTED POWER PATH" color={X.violet} />
        <path d="M 260 620 H 820 L 770 720 H 310 Z" fill="#31495b" stroke={X.steel} strokeWidth={8} opacity={0.65} />
        <LedBoard x={540} y={610} on={1} scale={0.85} />
        <rect x={335} y={735} width={410} height={280} rx={30} fill="#173629" stroke={X.green} strokeWidth={7} />
        <rect x={385} y={790} width={135} height={80} rx={15} fill="#293d4e" stroke={X.violet} strokeWidth={5} />
        <ClearLabel x={452} y={840} text="Rectifier" color={X.white} size={20} />
        <rect x={560} y={790} width={135} height={80} rx={15} fill="#293d4e" stroke={X.violet} strokeWidth={5} />
        <ClearLabel x={627} y={840} text="Regulator" color={X.white} size={20} />
        <Arrow x1={450} y1={940} x2={450} y2={970} color={X.violet} width={5} /><Arrow x1={625} y1={940} x2={625} y2={970} color={X.violet} width={5} />
        <ClearLabel x={540} y={960} text="LED driver board" color={X.green} />
        <path d="M 450 735 V 680 M 625 735 V 680" stroke={X.cyan} strokeWidth={9} />
        <Arrow x1={450} y1={710} x2={450} y2={660} color={X.cyan} width={7} opacity={driver} /><Arrow x1={625} y1={710} x2={625} y2={660} color={X.cyan} width={7} opacity={driver} />
        <ClearLabel x={790} y={710} targetX={640} targetY={690} text="Controlled DC to chips" color={X.cyan} opacity={driver} />
        <path d="M 355 1030 V 1120 H 725 V 1030" fill="#263b4d" stroke={X.steel} strokeWidth={8} />
        {[1060, 1090, 1120].map((y) => <path key={y} d={`M 370 ${y} H 710`} stroke={X.steel} strokeWidth={13} />)}
        <path d={wavePath(400, 1180, 280, 32, 2.5, t * 1.5)} fill="none" stroke={X.coral} strokeWidth={8} />
        <Arrow x1={540} y1={1145} x2={540} y2={1030} color={X.coral} width={8} opacity={0.30 + driver * 0.70} />
        <ClearLabel x={540} y={1245} text="AC from the household socket" color={X.coral} />
        {driver > 0.05 && <HighlightPart x={325} y={725} width={430} height={300} color={X.violet} opacity={driver * 0.30} />}
        <StageNote y={1325} text="The base electronics convert and regulate power before it reaches the LEDs" color={X.violet} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="junction" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="One LED chip, greatly magnified" lines={['Electrons and holes meet', 'their energy becomes light']} accent={X.amber} size={57} />
      <SvgStage>
        <PanelLabel text="P-TYPE / N-TYPE SEMICONDUCTOR JUNCTION" color={X.amber} />
        <rect x={150} y={650} width={780} height={430} rx={30} fill="#122639" stroke={X.steel} strokeWidth={8} />
        <path d="M 150 650 H 930 V 825 H 150 Z" fill="#57355f" opacity={0.68} />
        <path d="M 150 825 H 930 V 1080 H 150 Z" fill="#1b4963" opacity={0.68} />
        <path d="M 150 825 H 930" stroke={X.amber} strokeWidth={7} />
        <ClearLabel x={235} y={710} text="P-type" color={X.coral} anchor="start" />
        <ClearLabel x={235} y={1030} text="N-type" color={X.blue} anchor="start" />
        <ClearLabel x={235} y={770} text="holes (+)" color={X.coral} anchor="start" size={20} />
        <ClearLabel x={235} y={975} text="electrons (−)" color={X.blue} anchor="start" size={20} />
        {[470, 640, 810].map((x, i) => {
          const p = (t * 0.18 + i / 3) % 1;
          const fade = 1 - prog(p, 0.76, 0.90);
          return <g key={x} opacity={(0.25 + carriers * 0.75) * fade}>
            <circle cx={x} cy={715 + p * 100} r={18} fill={X.night} stroke={X.coral} strokeWidth={5} />
            <text x={x} y={722 + p * 100} textAnchor="middle" fill={X.coral} fontSize={22} fontWeight={700}>+</text>
            <circle cx={x} cy={1010 - p * 165} r={17} fill={X.blue} stroke={X.white} strokeWidth={3} />
            <text x={x} y={1017 - p * 165} textAnchor="middle" fill={X.white} fontSize={21} fontWeight={700}>−</text>
          </g>;
        })}
        <g opacity={photons}>
          <Glow x={640} y={825} r={200} color={X.amber} opacity={0.55} />
          {[470, 640, 810].map((x) => <g key={x}>
            <Arrow x1={x} y1={800} x2={x} y2={595} color={X.amber} width={7} />
            <path d={`M ${x - 20} 630 L ${x} 610 L ${x + 20} 630`} fill="none" stroke={X.white} strokeWidth={4} />
          </g>)}
          <ClearLabel x={640} y={585} text="Photons · light leaving the chip" color={X.amber} />
        </g>
        <ClearLabel x={540} y={1160} targetX={640} targetY={825} text="Recombination happens at this junction" color={X.amber} />
        <StageNote text="Electron + hole → photon (a particle of light)" color={X.amber} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="white" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="Two useful bulb features, shown separately" lines={['Phosphor shapes the color', 'the diffuser spreads the light']} accent={X.cyan} size={56} />
      <SvgStage>
        <PanelLabel text="CHIP COATING ON THE LEFT · COMPLETE BULB ON THE RIGHT" color={X.cyan} />
        <g transform="translate(0 20)">
          <rect x={125} y={960} width={340} height={85} rx={20} fill="#29475b" stroke={X.steel} strokeWidth={6} />
          <rect x={215} y={885} width={160} height={75} rx={12} fill="#405ca0" stroke={X.blue} strokeWidth={5} />
          <rect x={205} y={840} width={180} height={45} rx={10} fill={X.amber} opacity={0.35 + phosphor * 0.55} stroke={X.amber} strokeWidth={4} />
          {[255, 295, 335].map((x) => <Arrow key={x} x1={x} y1={885} x2={x} y2={850} color={X.blue} width={5} />)}
          {[255, 295, 335].map((x, i) => <Arrow key={x} x1={x} y1={830} x2={x + (i - 1) * 45} y2={680} color={phosphor > 0.35 ? X.white : X.blue} width={7} opacity={0.25 + phosphor * 0.75} />)}
          <ClearLabel x={295} y={790} targetX={350} targetY={840} text="Yellow phosphor coating" color={X.amber} />
          <ClearLabel x={295} y={1100} targetX={295} targetY={960} text="Blue LED chip" color={X.blue} />
          <ClearLabel x={295} y={640} text="White light out" color={X.white} opacity={phosphor} />
        </g>
        <LedBulb x={785} y={920} t={t} on={diffuse} scale={0.58} rays={false} />
        {[0, 1, 2].map((i) => <Arrow key={i} x1={720 + i * 65} y1={740} x2={675 + i * 110} y2={600} color={X.amber} width={6} opacity={diffuse} />)}
        {[0, 1, 2].map((i) => <Arrow key={i} x1={745 + i * 45} y1={1080} x2={745 + i * 45} y2={1190} color={X.coral} width={6} opacity={diffuse} />)}
        <ClearLabel x={810} y={610} targetX={850} targetY={740} text="Diffuser dome" color={X.cyan} opacity={diffuse} />
        <ClearLabel x={800} y={1250} targetX={800} targetY={1090} text="Metal carries heat away" color={X.coral} opacity={diffuse} />
        <StageNote y={1325} text="Phosphor produces white light; the dome spreads it and the body sheds heat" color={X.cyan} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="The whole bulb, with its energy path labeled" lines={['Controlled current powers chips', 'the chips directly emit light']} accent={X.green} size={55} />
      <SvgStage>
        <PanelLabel text="DRIVER IN THE BASE → LED JUNCTIONS → LIGHT" color={X.green} />
        <LedBulb x={540} y={850} t={t} on={1} scale={0.88} />
        <ClearLabel x={185} y={1090} targetX={465} targetY={1090} text="1 · Driver controls current" color={X.green} />
        <ClearLabel x={845} y={810} targetX={630} targetY={910} text="2 · Chip junctions emit" color={X.amber} />
        <ClearLabel x={850} y={570} targetX={650} targetY={680} text="3 · Useful light leaves" color={X.white} />
        <StageNote y={1325} text="Electrical energy → recombination photons → illumination" color={X.green} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['LED bulb', 'bright light', 'less power', 'incandescent bulb', 'semiconductor chips', 'glowing metal filament', 'driver', 'controlled direct current', 'electrons and holes', 'junction', 'recombine', 'photons', 'phosphor coating', 'white light', 'diffuser', 'carries heat away']} />
    <CalmSound narration="voiceovers/led-bulb/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={45.5} />
  </AbsoluteFill>;
};
export default Short50LedBulb;
