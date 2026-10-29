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

export const compositionConfig = { id: 'Short49WashingMachine', durationInSeconds: 40, fps: 30, width: 1080, height: 1920 };

const Cloth: React.FC<{ x: number; y: number; rotation?: number; color?: string; scale?: number }> = ({ x, y, rotation = 0, color = X.violet, scale = 1 }) => (
  <path d="M -65 -35 Q -35 -70 0 -45 Q 45 -75 70 -25 Q 95 20 55 50 Q 15 80 -20 55 Q -75 75 -80 20 Q -95 -10 -65 -35 Z" transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`} fill={color} stroke={X.white} strokeWidth={5} opacity={0.82} />
);

const DrumFront: React.FC<{ cx: number; cy: number; r: number; t: number; water?: number }> = ({ cx, cy, r, t, water = 1 }) => (
  <g>
    <circle cx={cx} cy={cy} r={r + 45} fill="#14293a" stroke={X.steel} strokeWidth={18} />
    <circle cx={cx} cy={cy} r={r} fill="#0d1e2e" stroke={X.cyan} strokeWidth={7} strokeDasharray="8 18" strokeDashoffset={-t * 80} />
    <g transform={`rotate(${t * 95} ${cx} ${cy})`}>
      <Cloth x={cx - r * 0.45} y={cy - r * 0.50} rotation={-20} color={X.violet} scale={r / 300} />
      <Cloth x={cx + r * 0.52} y={cy - r * 0.05} rotation={65} color={X.coral} scale={r / 300} />
      <Cloth x={cx - r * 0.25} y={cy + r * 0.55} rotation={150} color={X.blue} scale={r / 300} />
    </g>
    <CircularFlow cx={cx} cy={cy} r={r * 0.78} t={t} count={9} color={X.cyan} speed={0.26} />
    {Array.from({ length: 14 }, (_, i) => {
      const p = (t * 0.28 + i / 14) % 1; const a = i * 2.399 + t * 0.32; const rr = r * (0.55 + p * 0.85);
      return <circle key={i} cx={cx + Math.cos(a) * rr} cy={cy + Math.sin(a) * rr} r={6 + p * 6} fill={X.cyan} opacity={water * (1 - p * 0.65)} />;
    })}
  </g>
);

const Short49WashingMachine: React.FC = () => {
  const frame = useCurrentFrame(); const t = frame / 30;
  const retain = prog(t, line(VO, 'hook-retain').start - 0.08, line(VO, 'hook-retain').start + 0.60);
  const inward = prog(t, line(VO, 'spin-inward').start - 0.08, line(VO, 'spin-inward').start + 0.60);
  const water = prog(t, line(VO, 'spin-water').start - 0.08, line(VO, 'spin-water').start + 0.60);
  const holes = prog(t, line(VO, 'drain-holes').start - 0.08, line(VO, 'drain-holes').start + 0.60);
  const pump = prog(t, line(VO, 'drain-pump').start - 0.08, line(VO, 'drain-pump').start + 0.60);
  const balance = prog(t, line(VO, 'balance-load').start - 0.08, line(VO, 'balance-load').start + 0.70);

  return <AbsoluteFill style={{ background: X.night }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="The spin-drying result comes first" lines={['Clothes stay inside', 'water escapes']} accent={X.cyan} />
      <SvgStage>
        <rect x={185} y={500} width={710} height={770} rx={65} fill="#263b4d" stroke={X.steel} strokeWidth={10} />
        <rect x={255} y={555} width={570} height={85} rx={25} fill="#142637" />
        <circle cx={735} cy={598} r={22} fill={X.green} />
        <DrumFront cx={540} cy={875} r={245} t={t} water={0.40 + retain * 0.60} />
        <FocusRing x={540} y={875} rx={305} ry={305} t={t} color={X.cyan} opacity={retain} />
        <Leader x={855} y={1180} tx={760} ty={1050} text="WATER LEAVES THE DRUM" color={X.cyan} anchor="end" opacity={retain} />
        <StatusPill x={540} y={1360} text="RAPID ROTATION EXTRACTS WATER" color={X.cyan} opacity={retain} width={590} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="spin" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.violet} /><DeviceStage accent={X.violet} />
      <SceneHeading eyebrow="The wall guides the clothes" lines={['Clothes follow the circle', 'water moves outward']} accent={X.violet} size={57} />
      <SvgStage>
        <circle cx={540} cy={835} r={355} fill="#142a3c" stroke={X.steel} strokeWidth={15} />
        <circle cx={540} cy={835} r={295} fill="#0c1e2e" stroke={X.cyan} strokeWidth={7} strokeDasharray="7 20" strokeDashoffset={-t * 75} />
        {[0, 1, 2].map((i) => {
          const a = t * 0.75 + i * Math.PI * 2 / 3; const cx = 540 + Math.cos(a) * 205; const cy = 835 + Math.sin(a) * 205;
          return <g key={i}>
            <Cloth x={cx} y={cy} rotation={a * 180 / Math.PI + 40} color={[X.violet, X.coral, X.blue][i]} scale={0.85} />
            <g opacity={inward}>
              <Arrow x1={cx + Math.cos(a) * 85} y1={cy + Math.sin(a) * 85} x2={cx - Math.cos(a) * 45} y2={cy - Math.sin(a) * 45} color={X.amber} width={7} />
            </g>
          </g>;
        })}
        {Array.from({ length: 18 }, (_, i) => {
          const p = (t * 0.25 + i / 18) % 1; const a = i * 2.399 + t * 0.40; const r = 145 + p * 275;
          return <circle key={i} cx={540 + Math.cos(a) * r} cy={835 + Math.sin(a) * r} r={7 + p * 5} fill={X.cyan} opacity={water * (1 - p * 0.45)} />;
        })}
        <CircularFlow cx={540} cy={835} r={235} t={t} count={8} color={X.violet} speed={0.23} />
        <FocusRing x={540} y={835} rx={375} ry={375} t={t} color={water > 0.45 ? X.cyan : X.amber} opacity={0.65} />
        <TinyLabel x={540} y={475} text="WALL PUSHES CLOTHES INWARD" color={X.amber} opacity={inward} />
        <StatusPill x={540} y={1320} text="WATER CAN MOVE OUT THROUGH THE FABRIC" color={X.cyan} opacity={water} width={700} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="drain" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.cyan} /><DeviceStage accent={X.cyan} />
      <SceneHeading eyebrow="The machine needs an escape path" lines={['Through the holes', 'out through the pump']} accent={X.cyan} />
      <SvgStage>
        <rect x={165} y={535} width={750} height={590} rx={130} fill="#1a3042" stroke={X.steel} strokeWidth={12} />
        <rect x={250} y={610} width={580} height={430} rx={105} fill="#0d2031" stroke={X.cyan} strokeWidth={8} />
        <Cloth x={480} y={820} rotation={t * 35} color={X.violet} scale={1.25} />
        {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={815} cy={655 + i * 43} r={10} fill={X.night} stroke={X.cyan} strokeWidth={4} />)}
        <g opacity={0.20 + holes * 0.80}>
          {Array.from({ length: 12 }, (_, i) => {
            const p = (t * 0.24 + i / 12) % 1;
            return <circle key={i} cx={650 + p * 245} cy={665 + (i % 7) * 48} r={8} fill={X.cyan} opacity={1 - p * 0.35} />;
          })}
          <MovingDots x1={875} y1={760} x2={875} y2={1100} t={t} count={6} color={X.cyan} radius={9} speed={0.25} />
          <FocusRing x={825} y={825} rx={100} ry={285} t={t} color={X.cyan} opacity={holes} />
        </g>
        <g transform="translate(540 1150)" opacity={0.30 + pump * 0.70}>
          <circle r={95} fill={X.panel2} stroke={X.green} strokeWidth={8} />
          <g transform={`rotate(${t * 190})`}>
            {[0, 1, 2, 3].map((i) => <path key={i} d="M 0 0 Q 20 -65 65 -55 Q 75 -10 20 20 Z" fill={X.green} opacity={0.55} transform={`rotate(${i * 90})`} />)}
          </g>
          <TinyLabel x={0} y={150} text="DRAIN PUMP" color={X.green} />
          <FocusRing x={0} y={0} rx={125} ry={125} t={t} color={X.green} opacity={pump} />
        </g>
        <FlowPath d="M 875 1100 Q 800 1150 640 1150 H 910" t={t} color={X.green} width={10} speed={95} opacity={pump} />
        <StatusPill x={540} y={1370} text="PERFORATED DRUM KEEPS CLOTHES INSIDE" color={X.cyan} opacity={pump} width={680} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="balance" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.amber} /><DeviceStage accent={X.amber} />
      <SceneHeading eyebrow="Distribution matters at high speed" lines={['Balance the load', 'steady the drum']} accent={X.amber} />
      <SvgStage>
        <g transform={`translate(${295 + Math.sin(t * 13) * 13} 820) rotate(${Math.sin(t * 11) * 4})`}>
          <circle r={190} fill="#142a3c" stroke={X.coral} strokeWidth={12} />
          <circle r={145} fill={X.night} stroke={X.steel} strokeWidth={6} strokeDasharray="8 16" />
          <Cloth x={75} y={35} rotation={t * 40} color={X.coral} scale={1.2} />
          <TinyLabel x={0} y={260} text="UNBALANCED · WOBBLES" color={X.coral} />
        </g>
        <g transform="translate(785 820)">
          <circle r={190} fill="#142a3c" stroke={X.green} strokeWidth={12} />
          <circle r={145} fill={X.night} stroke={X.steel} strokeWidth={6} strokeDasharray="8 16" strokeDashoffset={-t * 55} />
          <Cloth x={0} y={-85} rotation={t * 30} color={X.violet} scale={0.75} />
          <Cloth x={80} y={55} rotation={t * 30 + 120} color={X.blue} scale={0.75} />
          <Cloth x={-80} y={55} rotation={t * 30 + 240} color={X.coral} scale={0.75} />
          <CircularFlow cx={0} cy={0} r={130} t={t} count={7} color={X.green} speed={0.25} />
          <FocusRing x={0} y={0} rx={220} ry={220} t={t} color={X.green} opacity={balance} />
          <TinyLabel x={0} y={260} text="BALANCED · STABLE SPIN" color={X.green} />
        </g>
        <StatusPill x={540} y={1300} text="EVEN LOAD DISTRIBUTION ENABLES FAST SPIN" color={X.green} opacity={balance} width={700} />
      </SvgStage>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <CinematicBackground t={t} accent={X.green} /><DeviceStage accent={X.green} />
      <SceneHeading eyebrow="One water-extraction chain" lines={['Rotate, perforate', 'and drain away']} accent={X.green} />
      <SvgStage>
        <g transform="translate(185 820)">
          <circle r={115} fill={X.panel2} stroke={X.violet} strokeWidth={8} />
          <CircularFlow cx={0} cy={0} r={82} t={t} count={7} color={X.violet} speed={0.30} />
          <Cloth x={0} y={0} rotation={t * 45} color={X.violet} scale={0.65} />
          <TinyLabel x={0} y={205} text="DRUM ROTATES" color={X.violet} />
        </g>
        <Arrow x1={320} y1={820} x2={410} y2={820} color={X.green} width={8} />
        <g transform="translate(540 820)">
          <rect x={-85} y={-135} width={170} height={270} rx={35} fill={X.panel2} stroke={X.cyan} strokeWidth={8} />
          {[-70, 0, 70].map((y) => <g key={y}>
            <circle cx={65} cy={y} r={10} fill={X.night} stroke={X.cyan} strokeWidth={4} />
            <MovingDots x1={-55} y1={y} x2={135} y2={y} t={t} count={3} color={X.cyan} radius={8} speed={0.32} />
          </g>)}
          <TinyLabel x={0} y={205} text="WATER EXITS" color={X.cyan} />
        </g>
        <Arrow x1={685} y1={820} x2={765} y2={820} color={X.green} width={8} />
        <g transform="translate(875 820)">
          <circle r={105} fill={X.panel2} stroke={X.green} strokeWidth={8} />
          <g transform={`rotate(${t * 180})`}><path d="M 0 0 Q 15 -70 65 -55 Q 80 -5 15 20 Z M 0 0 Q 15 70 -65 55 Q -80 5 -15 -20 Z" fill={X.green} opacity={0.65} /></g>
          <TinyLabel x={0} y={205} text="PUMP DRAINS" color={X.green} />
        </g>
        <StatusPill x={540} y={1300} text="WATER LEAVES · CLOTHES REMAIN · NO SQUEEZING" color={X.green} width={730} />
      </SvgStage>
    </Scene>

    <CalmCaptions lines={VO} accentWords={['washing machine', 'spinning the drum', 'clothes', 'water escapes', 'pushes inward', 'moving in a circle', 'move outward', 'small holes', 'outer tub', 'pump', 'perforated drum', 'balanced load', 'rotation, perforations, and drainage']} />
    <CalmSound narration="voiceovers/washing-machine/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={40} />
  </AbsoluteFill>;
};
export default Short49WashingMachine;
