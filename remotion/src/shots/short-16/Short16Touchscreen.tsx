import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Chip, Header, Pill, Scene, TitleBlock, line } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short16Touchscreen', durationInSeconds: 45, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;

const Finger: React.FC<{ x: number; y: number; scale?: number; rotation?: number; glove?: boolean; conductive?: boolean }> = ({
  x, y, scale = 1, rotation = 0, glove = false, conductive = false,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotation}) scale(${scale})`}>
    <path d="M -72 190 L -72 -15 C -72 -125 72 -125 72 -15 L 72 190 Z" fill={glove ? '#dce2eb' : '#e6b49c'} stroke={C.ink} strokeWidth={5} />
    {!glove && <ellipse cx={0} cy={-44} rx={37} ry={49} fill="#f0c8b4" stroke="#c58f7b" strokeWidth={3} />}
    {glove && <g stroke={C.muted} strokeWidth={5} opacity={0.55}><line x1={-64} y1={110} x2={64} y2={110} /><line x1={-64} y1={135} x2={64} y2={135} /></g>}
    {conductive && <g fill={C.teal}><ellipse cx={0} cy={-45} rx={40} ry={52} opacity={0.85} /><rect x={-66} y={95} width={132} height={24} opacity={0.7} /></g>}
  </g>
);

const ElectrodeGrid: React.FC<{ touch?: boolean; signal?: number; compact?: boolean }> = ({ touch = false, signal = 0, compact = false }) => (
  <g>
    <rect x={compact ? 260 : 180} y={compact ? 610 : 520} width={compact ? 560 : 720} height={compact ? 470 : 650} rx={42} fill="rgba(255,254,249,0.82)" stroke={C.line} strokeWidth={3} />
    {Array.from({ length: compact ? 6 : 8 }, (_, index) => {
      const x = (compact ? 310 : 235) + index * (compact ? 92 : 90);
      return <line key={`v${index}`} x1={x} y1={compact ? 640 : 560} x2={x} y2={compact ? 1040 : 1120} stroke={touch && index === 3 ? C.teal : C.indigo} strokeWidth={touch && index === 3 ? 10 : 5} opacity={touch && index === 3 ? 0.9 : 0.32} />;
    })}
    {Array.from({ length: compact ? 5 : 7 }, (_, index) => {
      const y = (compact ? 670 : 610) + index * (compact ? 85 : 80);
      return <line key={`h${index}`} x1={compact ? 290 : 215} y1={y} x2={compact ? 790 : 865} y2={y} stroke={touch && index === 2 ? C.coral : C.violet} strokeWidth={touch && index === 2 ? 10 : 5} opacity={touch && index === 2 ? 0.85 : 0.28} />;
    })}
    <g opacity={signal}>
      <circle cx={530} cy={610} r={13} fill={C.mint} />
      <path d="M 235 610 L 825 610" stroke={C.mint} strokeWidth={4} strokeDasharray="14 18" opacity={0.5} />
    </g>
    {touch && <g transform="translate(595 850)">
      {[0, 1, 2].map((index) => <circle key={index} r={54 + index * 42} fill="none" stroke={C.teal} strokeWidth={5} opacity={0.55 - index * 0.13} />)}
      <circle r={24} fill={C.paper} stroke={C.teal} strokeWidth={7} />
      <circle r={8} fill={C.teal} />
    </g>}
  </g>
);

const Short16Touchscreen: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const gridSignal = prog(t, line(VO, 'grid-signal').start - 0.1, line(VO, 'grid-signal').start + 0.6);
  const disturb = prog(t, line(VO, 'detect-finger').start - 0.1, line(VO, 'detect-finger').start + 0.6);
  const locate = prog(t, line(VO, 'detect-controller').start - 0.1, line(VO, 'detect-crossing').start + 0.4);
  const conductive = prog(t, line(VO, 'gloves-conductive').start - 0.1, line(VO, 'gloves-conductive').start + 0.5);
  const finalStart = line(VO, 'closing-listen').end + 0.55;
  const finalReveal = prog(t, finalStart, finalStart + 0.9);
  const closingExit = 1 - prog(t, finalStart - 0.65, finalStart);

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Scene t={t} id="hook" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · TOUCH" seconds={45} />
        <TitleBlock eyebrow="Everyday tech, explained" lines={['Not pressure.', 'Electric.']} accentIndex={1} subtitle="A capacitive screen senses a field change." size={80} />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <rect x={255} y={570} width={570} height={610} rx={55} fill={C.ink} />
          <rect x={278} y={595} width={524} height={560} rx={40} fill="#e8eef4" />
          <g transform="translate(540 790)" fill="none" stroke={C.teal} strokeWidth={6} opacity={0.5}>
            {[0, 1, 2].map((index) => <ellipse key={index} rx={80 + index * 65} ry={45 + index * 42} />)}
          </g>
          <Finger x={540} y={790} scale={0.82} rotation={-8} />
        </svg>
        <Pill text="CAPACITIVE TOUCH" y={1260} color={C.teal} />
      </Scene>

      <Scene t={t} id="grid" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · TOUCH" seconds={45} />
        <TitleBlock eyebrow="Below the surface" lines={['A grid', 'under glass.']} accentIndex={1} subtitle="Transparent electrodes carry a tiny signal." />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}><ElectrodeGrid signal={gridSignal} /></svg>
        <Pill text="ROWS  ×  COLUMNS" y={1260} />
      </Scene>

      <Scene t={t} id="detect" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · TOUCH" seconds={45} />
        <TitleBlock eyebrow="Measure the change" lines={['Find the', 'disturbance.']} accentIndex={1} subtitle="The controller locates the altered row and column." size={69} />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <ElectrodeGrid touch={disturb > 0.25} compact />
          <g opacity={disturb}><Finger x={690} y={850} scale={0.52} rotation={18} /></g>
          <path d="M 595 850 Q 780 1080 640 1190" fill="none" stroke={C.teal} strokeWidth={5} strokeDasharray="10 14" opacity={locate} />
          <Chip x={540} y={1215} scale={0.58} opacity={0.25 + locate * 0.75} label="TOUCH" />
        </svg>
        <Pill text={locate > 0.55 ? 'ROW  +  COLUMN  =  POSITION' : 'FINGER CHANGES THE FIELD'} y={1300} color={C.teal} />
      </Scene>

      <Scene t={t} id="gloves" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · TOUCH" seconds={45} />
        <TitleBlock eyebrow="A useful comparison" lines={['Why gloves', 'matter.']} accentIndex={1} subtitle="The field must still reach your skin." />
        <div style={{ position: 'absolute', left: 70, right: 70, top: 535, display: 'flex', gap: 26 }}>
          <div style={{ flex: 1, height: 590, borderRadius: 34, background: C.paper, border: `1px solid ${C.coral}55`, textAlign: 'center', paddingTop: 30 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 23, letterSpacing: 2, color: C.coral }}>NORMAL GLOVE</div>
            <svg width="100%" height={410} viewBox="0 0 420 410"><Finger x={210} y={205} scale={0.65} glove /><g stroke={C.coral} strokeWidth={6} strokeDasharray="12 14" opacity={0.5}><line x1={70} y1={365} x2={350} y2={365} /></g></svg>
            <div style={{ fontFamily: FONT_MONO, fontSize: 25, color: C.coral }}>FIELD BLOCKED</div>
          </div>
          <div style={{ flex: 1, height: 590, borderRadius: 34, background: C.paper, border: `1px solid ${C.teal}66`, textAlign: 'center', paddingTop: 30, opacity: 0.18 + conductive * 0.82 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 23, letterSpacing: 2, color: C.teal }}>CONDUCTIVE</div>
            <svg width="100%" height={410} viewBox="0 0 420 410"><Finger x={210} y={205} scale={0.65} glove conductive /><g fill="none" stroke={C.teal} strokeWidth={5} opacity={0.55}><ellipse cx={210} cy={330} rx={105} ry={40} /><ellipse cx={210} cy={330} rx={145} ry={65} /></g></svg>
            <div style={{ fontFamily: FONT_MONO, fontSize: 25, color: C.teal }}>FIELD CONNECTED</div>
          </div>
        </div>
        <Pill text="CONDUCTIVE THREAD MAKES THE LINK" y={1220} color={C.teal} opacity={0.3 + conductive * 0.7} />
      </Scene>

      <Scene t={t} id="closing" scenes={SCENES}>
        <Background t={t} dark /><Header label="TECH EXPLAINED · TOUCH" seconds={45} dark />
        <AbsoluteFill style={{ opacity: closingExit }}>
          <TitleBlock dark eyebrow="The whole idea" lines={['Listening', 'to touch.']} accentIndex={1} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}><g transform="translate(540 840)" fill="none" stroke={C.mint} strokeWidth={7} opacity={0.55}>{[0, 1, 2].map((i) => <ellipse key={i} rx={100 + i * 85} ry={60 + i * 55} />)}</g><Finger x={540} y={800} scale={0.8} /></svg>
          <Pill dark text="FIELD  →  ROW + COLUMN  →  TOUCH" y={1260} />
        </AbsoluteFill>
        <AbsoluteFill style={{ opacity: finalReveal, transform: `translateY(${(1 - finalReveal) * 18}px)` }}>
          <TitleBlock dark eyebrow="Now you know" lines={['Touch,', 'detected.']} accentIndex={1} subtitle="A tiny electrical disturbance, not pressure." y={330} size={94} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}><circle cx={540} cy={1070} r={190} fill="none" stroke={C.mint} strokeWidth={8} opacity={0.5} /><circle cx={540} cy={1070} r={90} fill="none" stroke={C.mint} strokeWidth={8} opacity={0.7} /><circle cx={540} cy={1070} r={24} fill={C.mint} /></svg>
        </AbsoluteFill>
      </Scene>
      <CalmCaptions lines={VO} accentWords={['electric field', 'electrodes', 'charge', 'rows and columns', 'touch', 'conductive glove', 'electrical disturbance']} />
      <CalmSound narration="voiceovers/touchscreen/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-listen').end} duration={45} />
    </AbsoluteFill>
  );
};

export default Short16Touchscreen;
