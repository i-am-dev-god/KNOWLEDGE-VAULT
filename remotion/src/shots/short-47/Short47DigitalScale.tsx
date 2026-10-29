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

export const compositionConfig = { id: 'Short47DigitalScale', durationInSeconds: 40.5, fps: 30, width: 1080, height: 1920 };

const Display: React.FC<{ x: number; y: number; value: string; color?: string; width?: number }> = ({ x, y, value, color = X.green, width = 280 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-width / 2} y={-55} width={width} height={110} rx={22} fill="#07151c" stroke={color} strokeWidth={5} />
    <text x={0} y={21} textAnchor="middle" fill={color} fontSize={51} fontWeight={700} letterSpacing={2}>{value}</text>
  </g>
);

const Gauge: React.FC<{ x: number; y: number; stretch?: number; color?: string }> = ({ x, y, stretch = 0, color = X.coral }) => (
  <g transform={`translate(${x} ${y}) scale(${1 + stretch * 0.12} 1)`}>
    <rect x={-78} y={-48} width={156} height={96} rx={16} fill={X.panel2} stroke={color} strokeWidth={5} />
    <path d="M -58 15 H -40 L -28 -20 L -5 35 L 18 -20 L 40 15 H 58" fill="none" stroke={color} strokeWidth={7} strokeLinejoin="round" />
  </g>
);

const Short47DigitalScale: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const weight = prog(t, 0.08, 1.10);
  const bend = prog(t, line(VO, 'hook-bend').start - 0.08, line(VO, 'hook-bend').start + 0.60);
  const cell = prog(t, line(VO, 'loadcell-cell').start - 0.08, line(VO, 'loadcell-cell').start + 0.60);
  const gauges = prog(t, line(VO, 'loadcell-gauges').start - 0.08, line(VO, 'loadcell-gauges').start + 0.60);
  const resistance = prog(t, line(VO, 'signal-resistance').start - 0.08, line(VO, 'signal-resistance').start + 0.60);
  const digital = prog(t, line(VO, 'signal-digital').start - 0.08, line(VO, 'signal-digital').start + 0.60);
  const tare = prog(t, line(VO, 'use-tare').start + 1.0, line(VO, 'use-tare').end - 0.35);

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="The useful reading comes first" lines={['A tiny bend', 'becomes a number']} accent={X.green} />
      <SvgStage>
        <g transform={`translate(540 ${570 + weight * 32})`}>
          <rect x={-155} y={-170} width={310} height={190} rx={30} fill="#886b48" stroke={X.amber} strokeWidth={8} />
          <path d="M -155 -80 H 155 M 0 -170 V 20" stroke={X.amber} strokeWidth={5} opacity={0.55} />
          <TinyLabel x={0} y={-65} text="OBJECT" color={X.white} />
        </g>
        <path d="M 240 700 H 840 L 910 1110 H 170 Z" fill="#263a4d" stroke={X.steel} strokeWidth={10} />
        <rect x={210} y={665} width={660} height={65} rx={25} fill="#52677b" stroke={X.white} strokeWidth={6} />
        <path d={`M 350 790 H 520 Q 610 ${790 + (weight + bend) * 22} 730 ${790 + (weight + bend) * 28}`} fill="none" stroke={X.coral} strokeWidth={32} strokeLinecap="round" />
        <rect x={300} y={745} width={70} height={150} rx={15} fill={X.steel} />
        <Display x={540} y={1000} value={weight > 0.52 ? '2.50 kg' : '0.00 kg'} color={weight > 0.52 ? X.green : X.muted} />
        <g opacity={bend}>
          <FocusRing x={555} y={810} rx={270} ry={120} t={t} color={X.coral} opacity={0.85} />
          <Leader x={820} y={790} tx={700} ty={825} text="HIDDEN METAL ELEMENT BENDS" color={X.coral} anchor="end" />
        </g>
        <StatusPill x={540} y={1300} text="FORCE DEFORMS THE LOAD CELL INSIDE" color={X.green} opacity={bend} width={650} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="loadcell" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.coral} /><DeviceStage accent={X.coral} />
      <SceneHeading eyebrow="An engineered metal spring element" lines={['The load cell flexes', 'the gauges follow']} accent={X.coral} />
      <SvgStage>
        <rect x={105} y={740} width={150} height={300} rx={25} fill="#405468" stroke={X.steel} strokeWidth={8} />
        <path d={`M 225 785 H 500 Q 720 ${785 + cell * 65} 885 ${800 + cell * 100}`} fill="none" stroke="#8194a8" strokeWidth={105} strokeLinecap="round" />
        <path d={`M 225 785 H 500 Q 720 ${785 + cell * 65} 885 ${800 + cell * 100}`} fill="none" stroke={X.coral} strokeWidth={5} strokeDasharray="14 12" opacity={0.7} />
        <g transform={`translate(865 ${650 + cell * 70})`}>
          <Arrow x1={0} y1={-170} x2={0} y2={30} color={X.amber} width={12} />
          <TinyLabel x={0} y={-205} text="APPLIED FORCE" color={X.amber} />
        </g>
        {[430, 660].map((x, i) => <g key={x} transform={`translate(${x} ${740 + cell * (i ? 35 : 10)})`}>
          <Gauge x={0} y={0} stretch={gauges * (i ? -0.5 : 1)} color={i ? X.blue : X.coral} />
          <FocusRing x={0} y={0} rx={115} ry={85} t={t} color={i ? X.blue : X.coral} opacity={gauges} />
        </g>)}
        <g opacity={gauges}>
          <TinyLabel x={430} y={590} text="STRETCHES" color={X.coral} />
          <TinyLabel x={680} y={630} text="COMPRESSES" color={X.blue} />
          <Arrow x1={340} y1={1080} x2={540} y2={1080} color={X.coral} width={7} />
          <Arrow x1={740} y1={1080} x2={560} y2={1080} color={X.blue} width={7} />
        </g>
        <Leader x={280} y={1230} tx={430} ty={900} text="LOAD CELL · PREDICTABLE DEFORMATION" color={X.coral} opacity={cell} />
        <StatusPill x={540} y={1340} text="STRAIN GAUGES STRETCH WITH THE METAL" color={X.coral} opacity={gauges} width={680} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="signal" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="Mechanical strain becomes data" lines={['Resistance changes', 'electronics read it']} accent={X.violet} />
      <SvgStage>
        <g transform="translate(210 790)">
          <Gauge x={0} y={0} stretch={Math.sin(t * 3) * resistance} color={X.coral} />
          <TinyLabel x={0} y={150} text="R ± ΔR" color={X.coral} />
          <FocusRing x={0} y={0} rx={125} ry={115} t={t} color={X.coral} opacity={resistance} />
        </g>
        <Arrow x1={325} y1={790} x2={425} y2={790} color={X.violet} width={8} />
        <g transform="translate(545 790)" opacity={0.35 + digital * 0.65}>
          <path d="M -100 -135 L -100 135 L 115 0 Z" fill="#1c3347" stroke={X.violet} strokeWidth={8} />
          <TinyLabel x={-10} y={15} text="AMP" color={X.white} />
          <path d={`M -85 190 Q -45 ${190 - resistance * 45} 0 190 T 90 190`} fill="none" stroke={X.cyan} strokeWidth={7} />
          <TinyLabel x={0} y={270} text="AMPLIFY + DIGITIZE" color={X.violet} />
          <FocusRing x={0} y={0} rx={160} ry={190} t={t} color={X.violet} opacity={digital} />
        </g>
        <Arrow x1={680} y1={790} x2={760} y2={790} color={X.violet} width={8} />
        <Display x={875} y={790} value={digital > 0.45 ? '2.50' : '—'} color={digital > 0.45 ? X.green : X.muted} width={230} />
        <TinyLabel x={875} y={950} text="DIGITAL READING" color={X.green} />
        <MovingDots x1={300} y1={790} x2={770} y2={790} t={t} count={8} color={X.cyan} radius={8} speed={0.25} opacity={0.25 + digital * 0.75} />
        <StatusPill x={540} y={1280} text="SMALL VOLTAGE SIGNAL → DIGITAL VALUE" color={X.violet} opacity={digital} width={680} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="use" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="Two features make the reading useful" lines={['Calibrate the units', 'tare the container']} accent={X.amber} />
      <SvgStage>
        <g transform="translate(285 790)">
          <rect x={-190} y={60} width={380} height={230} rx={45} fill="#263a4d" stroke={X.steel} strokeWidth={8} />
          <rect x={-140} y={-100} width={280} height={125} rx={22} fill="#8c7047" stroke={X.amber} strokeWidth={7} />
          <TinyLabel x={0} y={-25} text="KNOWN 1 kg" color={X.white} />
          <Display x={0} y={180} value="1.00" color={X.green} width={220} />
          <TinyLabel x={0} y={350} text="CALIBRATION" color={X.amber} />
        </g>
        <g transform="translate(790 790)">
          <rect x={-190} y={60} width={380} height={230} rx={45} fill="#263a4d" stroke={X.steel} strokeWidth={8} />
          <path d="M -125 -105 H 125 L 95 25 H -95 Z" fill="#35546a" stroke={X.cyan} strokeWidth={7} opacity={0.9} />
          <Display x={0} y={180} value={tare > 0.5 ? '0.00' : '0.80'} color={tare > 0.5 ? X.green : X.amber} width={220} />
          <rect x={-85} y={305} width={170} height={65} rx={25} fill={X.panel2} stroke={tare > 0.5 ? X.green : X.amber} strokeWidth={5} />
          <TinyLabel x={0} y={349} text="TARE" color={tare > 0.5 ? X.green : X.amber} />
          <FocusRing x={0} y={335} rx={120} ry={65} t={t} color={X.green} opacity={tare} />
        </g>
        <StatusPill x={540} y={1310} text={tare > 0.5 ? 'CONTAINER SUBTRACTED · READY TO WEIGH' : 'CALIBRATE UNITS · SUBTRACT THE CONTAINER'} color={tare > 0.5 ? X.green : X.amber} width={730} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="One measurement chain" lines={['Bend becomes resistance', 'resistance becomes digits']} accent={X.green} size={56} />
      <SvgStage>
        <g transform="translate(190 820)">
          <path d="M -110 0 H 0 Q 65 0 110 45" fill="none" stroke={X.steel} strokeWidth={45} strokeLinecap="round" />
          <Arrow x1={75} y1={-145} x2={75} y2={-25} color={X.amber} width={8} />
          <TinyLabel x={0} y={210} text="METAL BENDS" color={X.amber} />
        </g>
        <Arrow x1={320} y1={820} x2={410} y2={820} color={X.green} width={8} />
        <Gauge x={540} y={820} stretch={Math.sin(t * 2.5) * 0.5} color={X.coral} />
        <TinyLabel x={540} y={1030} text="RESISTANCE CHANGES" color={X.coral} />
        <Arrow x1={665} y1={820} x2={750} y2={820} color={X.green} width={8} />
        <Display x={875} y={820} value="2.50" color={X.green} width={220} />
        <TinyLabel x={875} y={1030} text="WEIGHT READING" color={X.green} />
        <StatusPill x={540} y={1280} text="FORCE → STRAIN → RESISTANCE → NUMBER" color={X.green} width={700} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['digital scale', 'weight', 'metal element', 'load cell', 'strain gauges', 'electrical resistance', 'voltage signal', 'digital reading', 'calibration', 'tare', 'mechanical bend']} />
    <CalmSound narration="voiceovers/digital-scale/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={40.5} />
  </AbsoluteFill>;
};
export default Short47DigitalScale;
