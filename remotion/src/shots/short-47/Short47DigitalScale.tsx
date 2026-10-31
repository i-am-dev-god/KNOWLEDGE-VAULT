import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line } from '../../lib/next-calm';
import { Arrow, MovingDots } from '../../lib/focus';
import { CinematicBackground, DeviceStage, SceneHeading, SvgStage, TinyLabel, X } from '../../lib/cinematic';
import { ClearLabel, HighlightPart, PanelLabel, StageNote } from '../../lib/clear-device';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short47DigitalScale', durationInSeconds: 40.5, fps: 30, width: 1080, height: 1920 };

const Display: React.FC<{ x: number; y: number; value: string; color?: string; width?: number }> = ({ x, y, value, color = X.green, width = 280 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-width / 2} y={-52} width={width} height={104} rx={18} fill="#06131b" stroke={color} strokeWidth={5} />
    <text x={0} y={20} textAnchor="middle" fill={color} fontSize={48} fontWeight={700} letterSpacing={1}>{value}</text>
  </g>
);

const GaugeStrip: React.FC<{ x: number; y: number; color: string; deformation?: number; width?: number }> = ({ x, y, color, deformation = 0, width = 220 }) => (
  <g transform={`translate(${x} ${y}) scale(${1 + deformation * 0.10} 1)`}>
    <rect x={-width / 2} y={-19} width={width} height={38} rx={8} fill="#142536" stroke={color} strokeWidth={4} />
    <path d={`M ${-width / 2 + 18} 4 H -72 L -52 -10 L -30 10 L -8 -10 L 14 10 L 36 -10 L 58 4 H ${width / 2 - 18}`} fill="none" stroke={color} strokeWidth={6} strokeLinejoin="round" />
  </g>
);

const MiniScale: React.FC<{ x: number; kind: 'weight' | 'bowl'; value: string; tare?: number }> = ({ x, kind, value, tare = 0 }) => (
  <g transform={`translate(${x} 0)`}>
    <rect x={-165} y={820} width={330} height={285} rx={42} fill="#263b4d" stroke={X.steel} strokeWidth={7} />
    <rect x={-180} y={780} width={360} height={45} rx={16} fill="#60758a" stroke={X.white} strokeWidth={5} />
    {kind === 'weight' ? <>
      <rect x={-95} y={625} width={190} height={155} rx={20} fill="#8b6d42" stroke={X.amber} strokeWidth={6} />
      <rect x={-45} y={590} width={90} height={40} rx={15} fill="none" stroke={X.amber} strokeWidth={12} />
      <TinyLabel x={0} y={715} text="1 kg" color={X.white} />
    </> : <>
      <path d="M -120 650 H 120 L 88 780 H -88 Z" fill="#35546a" stroke={X.cyan} strokeWidth={6} />
      <path d="M -120 650 Q 0 690 120 650" fill="none" stroke={X.cyan} strokeWidth={5} />
    </>}
    <Display x={0} y={945} value={value} color={kind === 'bowl' && value === '0.80 kg' ? X.amber : X.green} width={240} />
    {kind === 'bowl' && <g transform={`translate(0 ${1045 + tare * 5})`}>
      <rect x={-75} y={-25} width={150} height={55} rx={18} fill="#10231f" stroke={tare > 0.5 ? X.green : X.amber} strokeWidth={4} />
      <TinyLabel x={0} y={12} text="TARE" color={tare > 0.5 ? X.green : X.amber} />
    </g>}
  </g>
);

const Short47DigitalScale: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const contact = prog(t, 0.12, 1.15);
  const settled = prog(t, 1.15, 1.70);
  const deflection = settled * 14;
  const platformY = 700 + deflection;
  const objectTop = platformY - 170 - (1 - contact) * 100;
  const bend = prog(t, line(VO, 'hook-bend').start - 0.08, line(VO, 'hook-bend').start + 0.60);
  const cell = prog(t, line(VO, 'loadcell-cell').start - 0.08, line(VO, 'loadcell-cell').start + 0.60);
  const gauges = prog(t, line(VO, 'loadcell-gauges').start - 0.08, line(VO, 'loadcell-gauges').start + 0.60);
  const resistance = prog(t, line(VO, 'signal-resistance').start - 0.08, line(VO, 'signal-resistance').start + 0.60);
  const digital = prog(t, line(VO, 'signal-digital').start - 0.08, line(VO, 'signal-digital').start + 0.60);
  const tare = prog(t, line(VO, 'use-tare').start + 1.0, line(VO, 'use-tare').end - 0.35);

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="A real scale, shown in side cutaway" lines={['Contact creates force', 'force creates a reading']} accent={X.green} size={57} />
      <SvgStage>
        <PanelLabel text="OBJECT → PLATFORM → LOAD CELL" color={X.green} />
        <path d="M 280 790 H 800 L 870 1140 H 210 Z" fill="#24394c" stroke={X.steel} strokeWidth={9} />
        <path d={`M 340 850 H 520 L 700 ${850 + deflection}`} fill="none" stroke={bend > 0.2 ? X.coral : X.steel} strokeWidth={34} strokeLinecap="round" />
        <rect x={292} y={805} width={76} height={150} rx={14} fill="#435a70" stroke={X.steel} strokeWidth={6} />
        <path d={`M 700 ${platformY + 48} V ${850 + deflection}`} stroke={X.steel} strokeWidth={34} />
        {bend > 0.05 && <HighlightPart x={315} y={805} width={420} height={105} color={X.coral} opacity={bend} />}
        <rect x={230} y={platformY} width={620} height={48} rx={16} fill="#61788d" stroke={X.white} strokeWidth={6} />
        <g>
          <rect x={420} y={objectTop} width={240} height={170} rx={24} fill="#896b45" stroke={X.amber} strokeWidth={7} />
          <TinyLabel x={540} y={objectTop + 98} text="OBJECT" color={X.white} />
        </g>
        <g opacity={settled}>
          <Arrow x1={775} y1={575} x2={775} y2={675 + deflection} color={X.amber} width={9} />
          <ClearLabel x={790} y={555} text="Weight force" color={X.amber} />
        </g>
        <ClearLabel x={255} y={1000} targetX={410} targetY={850} text="Load cell" color={bend > 0.2 ? X.coral : X.steel} />
        <Display x={540} y={1050} value={settled > 0.35 ? '2.50 kg' : '0.00 kg'} color={settled > 0.35 ? X.green : X.muted} />
        <StageNote y={1285} color={settled > 0.35 ? X.green : X.amber} text={settled > 0.35 ? 'Object in contact → platform loaded → 2.50 kg' : contact > 0.98 ? 'Contact made — force is building' : 'Approaching the platform — no weight measured yet'} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="loadcell" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.coral} /><DeviceStage accent={X.coral} />
      <SceneHeading eyebrow="The same load cell, magnified" lines={['The metal beam flexes', 'bonded gauges deform too']} accent={X.coral} size={57} />
      <SvgStage>
        <PanelLabel text="LOAD CELL · SIDE VIEW" color={X.coral} />
        <rect x={130} y={675} width={150} height={350} rx={22} fill="#3e5367" stroke={X.steel} strokeWidth={8} />
        {[700, 750, 800, 850, 900, 950].map((y) => <path key={y} d={`M 145 ${y} L 195 ${y + 45}`} stroke={X.muted} strokeWidth={5} opacity={0.5} />)}
        <ClearLabel x={205} y={1090} text="Fixed support" color={X.steel} />
        <g transform={`rotate(${cell * 2.2} 280 790)`}>
          <rect x={280} y={750} width={620} height={80} rx={15} fill="#73899d" stroke={X.white} strokeWidth={6} />
          <rect x={850} y={630} width={32} height={125} rx={10} fill={X.steel} />
          <GaugeStrip x={500} y={750} color={X.coral} deformation={gauges} />
          <GaugeStrip x={665} y={830} color={X.blue} deformation={-gauges * 0.65} />
        </g>
        <g opacity={cell}>
          <Arrow x1={866} y1={555} x2={866} y2={615} color={X.amber} width={10} />
          <ClearLabel x={950} y={565} text="Force" color={X.amber} anchor="end" />
        </g>
        <ClearLabel x={490} y={625} targetX={500} targetY={735} text="Top gauge stretches" color={X.coral} opacity={0.35 + gauges * 0.65} />
        <ClearLabel x={680} y={965} targetX={665} targetY={850} text="Bottom gauge compresses" color={X.blue} opacity={0.35 + gauges * 0.65} />
        {gauges > 0.05 && <HighlightPart x={360} y={700} width={440} height={180} color={X.coral} opacity={gauges * 0.45} />}
        <StageNote text="The gauges are bonded to the beam—not separate floating parts" color={X.coral} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="signal" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="One organized measurement path" lines={['Strain changes resistance', 'electronics show weight']} accent={X.violet} size={57} />
      <SvgStage>
        <PanelLabel text="MECHANICAL → ELECTRICAL → DIGITAL" color={X.violet} />
        <g>
          <rect x={70} y={650} width={260} height={390} rx={28} fill="#112236" stroke={X.coral} strokeWidth={4} />
          <GaugeStrip x={200} y={790} color={X.coral} deformation={resistance * 0.5} width={200} />
          <text x={200} y={910} textAnchor="middle" fill={X.coral} fontSize={34} fontWeight={700}>R → R + ΔR</text>
          <ClearLabel x={200} y={1110} text="1 · Strain gauge" color={X.coral} />
          {resistance > 0.05 && <HighlightPart x={70} y={650} width={260} height={390} color={X.coral} opacity={resistance} />}
        </g>
        <Arrow x1={340} y1={825} x2={405} y2={825} color={X.violet} width={8} />
        <ClearLabel x={372} y={785} text="Voltage" color={X.violet} size={19} />
        <g>
          <rect x={415} y={650} width={270} height={390} rx={28} fill="#112236" stroke={X.violet} strokeWidth={4} />
          <rect x={465} y={705} width={170} height={105} rx={18} fill="#1d3147" stroke={X.violet} strokeWidth={5} />
          <ClearLabel x={550} y={770} text="Amplify" color={X.white} />
          <Arrow x1={550} y1={825} x2={550} y2={865} color={X.violet} width={6} />
          <rect x={465} y={880} width={170} height={105} rx={18} fill="#1d3147" stroke={X.violet} strokeWidth={5} />
          <ClearLabel x={550} y={945} text="Digitize" color={X.white} />
          <ClearLabel x={550} y={1110} text="2 · Electronics" color={X.violet} />
          {digital > 0.05 && <HighlightPart x={415} y={650} width={270} height={390} color={X.violet} opacity={digital} />}
        </g>
        <Arrow x1={695} y1={825} x2={760} y2={825} color={X.green} width={8} />
        <ClearLabel x={727} y={785} text="Data" color={X.green} size={19} />
        <g>
          <rect x={770} y={650} width={240} height={390} rx={28} fill="#112236" stroke={X.green} strokeWidth={4} />
          <Display x={890} y={835} value={digital > 0.40 ? '2.50 kg' : '—'} color={digital > 0.40 ? X.green : X.muted} width={210} />
          <ClearLabel x={890} y={1110} text="3 · Display" color={X.green} />
        </g>
        <MovingDots x1={340} y1={825} x2={405} y2={825} t={t} count={2} radius={6} color={X.white} speed={0.20} />
        <MovingDots x1={695} y1={825} x2={760} y2={825} t={t} count={2} radius={6} color={X.white} speed={0.20} />
        <StageNote text="A small resistance change becomes a calibrated weight reading" color={X.violet} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="use" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="Everyday controls, shown on real scales" lines={['Calibrate with a known weight', 'tare with the container on top']} accent={X.amber} size={54} />
      <SvgStage>
        <PanelLabel text="BOTH OBJECTS REMAIN ON THEIR PLATFORMS" color={X.amber} />
        <ClearLabel x={290} y={575} text="1 · Calibration weight" color={X.amber} />
        <ClearLabel x={790} y={575} text="2 · Empty container" color={X.cyan} />
        <MiniScale x={290} kind="weight" value="1.00 kg" />
        <MiniScale x={790} kind="bowl" value={tare > 0.5 ? '0.00 kg' : '0.80 kg'} tare={tare} />
        <ClearLabel x={290} y={1180} text="Reading maps to kilograms" color={X.green} size={21} />
        <ClearLabel x={790} y={1180} text={tare > 0.5 ? 'Container weight subtracted' : 'Press TARE to subtract container'} color={tare > 0.5 ? X.green : X.amber} size={21} />
        <StageNote text={tare > 0.5 ? 'The bowl stays on the scale; only its stored weight is subtracted' : 'Calibration sets the units; tare sets the container-only reading to zero'} color={X.amber} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="The complete scale, simplified" lines={['Force bends metal', 'electronics show kilograms']} accent={X.green} size={57} />
      <SvgStage>
        <PanelLabel text="THE SAME THREE PARTS, IN ORDER" color={X.green} />
        <g transform="translate(200 820)">
          <rect x={-120} y={-150} width={240} height={300} rx={28} fill="#112236" stroke={X.amber} strokeWidth={4} />
          <path d="M -85 10 H 0 L 85 35" fill="none" stroke={X.steel} strokeWidth={28} strokeLinecap="round" />
          <Arrow x1={65} y1={-105} x2={65} y2={-25} color={X.amber} width={7} />
          <ClearLabel x={0} y={225} text="Load cell bends" color={X.amber} />
        </g>
        <Arrow x1={335} y1={820} x2={405} y2={820} color={X.green} width={8} />
        <g transform="translate(540 820)">
          <rect x={-120} y={-150} width={240} height={300} rx={28} fill="#112236" stroke={X.coral} strokeWidth={4} />
          <GaugeStrip x={0} y={0} color={X.coral} width={190} deformation={Math.sin(t * 2) * 0.25} />
          <ClearLabel x={0} y={225} text="Resistance changes" color={X.coral} />
        </g>
        <Arrow x1={675} y1={820} x2={745} y2={820} color={X.green} width={8} />
        <g transform="translate(880 820)">
          <rect x={-120} y={-150} width={240} height={300} rx={28} fill="#112236" stroke={X.green} strokeWidth={4} />
          <Display x={0} y={0} value="2.50 kg" width={210} />
          <ClearLabel x={0} y={225} text="Weight appears" color={X.green} />
        </g>
        <StageNote text="Contact → force → strain → resistance → digital weight" color={X.green} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['digital scale', 'weight', 'metal element', 'load cell', 'strain gauges', 'electrical resistance', 'voltage signal', 'digital reading', 'calibration', 'tare', 'mechanical bend']} />
    <CalmSound narration="voiceovers/digital-scale/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={40.5} />
  </AbsoluteFill>;
};
export default Short47DigitalScale;
