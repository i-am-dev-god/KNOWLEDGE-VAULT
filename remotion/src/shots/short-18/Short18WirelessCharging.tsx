import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Header, PhoneFrame, Pill, Scene, TitleBlock, line, wavePath } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short18WirelessCharging', durationInSeconds: 45, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;

const Coil: React.FC<{ x: number; y: number; scale?: number; color?: string; opacity?: number }> = ({ x, y, scale = 1, color = C.indigo, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke={color} strokeWidth={8} opacity={opacity}>
    {[0, 1, 2, 3].map((index) => <rect key={index} x={-145 + index * 22} y={-52 + index * 8} width={290 - index * 44} height={104 - index * 16} rx={45 - index * 5} />)}
  </g>
);

const ChargingPad: React.FC<{ x: number; y: number; scale?: number; active?: number }> = ({ x, y, scale = 1, active = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <ellipse cy={62} rx={235} ry={45} fill="#000" opacity={0.12} />
    <rect x={-245} y={-75} width={490} height={150} rx={65} fill={C.ink} />
    <rect x={-215} y={-52} width={430} height={90} rx={45} fill="#2b364a" />
    <Coil x={0} y={-7} scale={0.82} color={C.mint} opacity={0.25 + active * 0.75} />
    <circle cx={190} cy={0} r={9} fill={C.mint} opacity={active} />
  </g>
);

const FieldArcs: React.FC<{ x?: number; top: number; bottom: number; opacity?: number; weak?: boolean }> = ({ x = 540, top, bottom, opacity = 1, weak = false }) => (
  <g fill="none" stroke={weak ? C.coral : C.teal} strokeWidth={weak ? 5 : 7} strokeDasharray={weak ? '10 17' : undefined} opacity={opacity}>
    {[0, 1, 2].map((index) => {
      const spread = 105 + index * 85;
      return <path key={index} d={`M ${x - spread} ${bottom} C ${x - spread * 1.25} ${top + 120}, ${x + spread * 1.25} ${top + 120}, ${x + spread} ${bottom}`} opacity={0.75 - index * 0.15} />;
    })}
  </g>
);

const Battery: React.FC<{ x: number; y: number; charge: number; scale?: number }> = ({ x, y, charge, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-95} y={-48} width={180} height={96} rx={18} fill="none" stroke={C.ink} strokeWidth={8} />
    <rect x={85} y={-20} width={18} height={40} rx={6} fill={C.ink} />
    <rect x={-78} y={-31} width={140 * charge} height={62} rx={10} fill={C.teal} />
    <path d="M -5 -32 L -30 8 L -4 8 L -18 36 L 27 -12 L 1 -12 L 15 -32 Z" fill={C.paper} opacity={0.9} />
  </g>
);

const Short18WirelessCharging: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const field = prog(t, line(VO, 'hook-field').start - 0.1, line(VO, 'hook-field').start + 0.7);
  const alternating = prog(t, line(VO, 'transmitter-field').start - 0.1, line(VO, 'transmitter-field').start + 0.7);
  const induced = prog(t, line(VO, 'receiver-voltage').start - 0.1, line(VO, 'receiver-voltage').start + 0.7);
  const battery = prog(t, line(VO, 'receiver-battery').start - 0.1, line(VO, 'receiver-battery').start + 0.7);
  const misaligned = prog(t, line(VO, 'alignment-distance').start - 0.1, line(VO, 'alignment-distance').start + 0.6);
  const finalStart = line(VO, 'closing-link').end + 0.55;
  const finalReveal = prog(t, finalStart, finalStart + 0.9);
  const closingExit = 1 - prog(t, finalStart - 0.65, finalStart);

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Scene t={t} id="hook" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · CHARGING" seconds={45} />
        <TitleBlock eyebrow="Everyday tech, explained" lines={['Power', 'without a plug.']} accentIndex={1} subtitle="Energy crosses a closely linked magnetic field." size={75} />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <FieldArcs top={650} bottom={1110} opacity={0.25 + field * 0.75} />
          <PhoneFrame x={540} y={720} scale={0.63}><Coil x={0} y={60} scale={0.72} color={C.teal} opacity={field} /></PhoneFrame>
          <ChargingPad x={540} y={1160} scale={0.9} active={field} />
        </svg>
        <Pill text="NO METAL CONNECTOR REQUIRED" y={1300} color={C.teal} />
      </Scene>

      <Scene t={t} id="transmitter" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · CHARGING" seconds={45} />
        <TitleBlock eyebrow="Inside the charging pad" lines={['The changing', 'field.']} accentIndex={1} subtitle="Alternating current drives the transmitter coil." />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <rect x={105} y={520} width={870} height={230} rx={32} fill={C.paper} stroke={C.line} strokeWidth={3} />
          <text x={150} y={580} fill={C.indigo} fontFamily={FONT_MONO} fontWeight={700} fontSize={23} letterSpacing={2}>ALTERNATING CURRENT</text>
          <path d={wavePath(150, 655, 780, 58, 2.2, t * 0.45)} fill="none" stroke={C.indigo} strokeWidth={8} />
          <FieldArcs top={755} bottom={1120} opacity={0.2 + alternating * 0.8} />
          <ChargingPad x={540} y={1160} scale={0.9} active={alternating} />
        </svg>
        <Pill text="CURRENT  →  RISING + FALLING MAGNETISM" y={1300} />
      </Scene>

      <Scene t={t} id="receiver" scenes={SCENES}>
        <Background t={t} dark /><Header label="TECH EXPLAINED · CHARGING" seconds={45} dark />
        <TitleBlock dark eyebrow="Inside the phone" lines={['A voltage', 'is induced.']} accentIndex={1} subtitle="The second coil responds to the changing field." />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <FieldArcs top={650} bottom={1180} opacity={0.65} />
          <PhoneFrame x={540} y={770} scale={0.75} dark>
            <Coil x={0} y={-30} scale={0.85} color={C.mint} opacity={0.4 + induced * 0.6} />
            <g opacity={battery}><Battery x={0} y={170} charge={battery} scale={0.65} /></g>
          </PhoneFrame>
          <ChargingPad x={540} y={1210} scale={0.72} active={1} />
        </svg>
        <Pill dark text={battery > 0.5 ? 'INDUCED POWER  →  BATTERY' : 'CHANGING FIELD  →  VOLTAGE'} y={1300} />
      </Scene>

      <Scene t={t} id="alignment" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · CHARGING" seconds={45} />
        <TitleBlock eyebrow="Coupling matters" lines={['Close +', 'aligned.']} accentIndex={1} subtitle="The coils transfer energy best when they line up." />
        <div style={{ position: 'absolute', left: 60, right: 60, top: 540, display: 'flex', gap: 22 }}>
          <div style={{ flex: 1, height: 610, borderRadius: 34, background: C.paper, border: `1px solid ${C.teal}66`, textAlign: 'center', paddingTop: 28 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 23, color: C.teal, letterSpacing: 2 }}>ALIGNED</div>
            <svg width="100%" height={450} viewBox="0 0 420 450"><FieldArcs x={210} top={90} bottom={320} opacity={0.85} /><Coil x={210} y={135} scale={0.48} color={C.teal} /><ChargingPad x={210} y={355} scale={0.48} /></svg>
            <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: C.teal }}>STRONG LINK</div>
          </div>
          <div style={{ flex: 1, height: 610, borderRadius: 34, background: C.paper, border: `1px solid ${C.coral}66`, textAlign: 'center', paddingTop: 28, opacity: 0.18 + misaligned * 0.82 }}>
            <div style={{ fontFamily: FONT_MONO, fontSize: 23, color: C.coral, letterSpacing: 2 }}>OFFSET</div>
            <svg width="100%" height={450} viewBox="0 0 420 450"><FieldArcs x={235} top={90} bottom={320} opacity={0.55} weak /><Coil x={280} y={135} scale={0.48} color={C.coral} /><ChargingPad x={180} y={355} scale={0.48} /></svg>
            <div style={{ fontFamily: FONT_MONO, fontSize: 24, color: C.coral }}>WEAKER LINK</div>
          </div>
        </div>
        <Pill text="DISTANCE + MISALIGNMENT WASTE ENERGY" y={1240} color={C.coral} opacity={0.3 + misaligned * 0.7} size={21} />
      </Scene>

      <Scene t={t} id="closing" scenes={SCENES}>
        <Background t={t} dark /><Header label="TECH EXPLAINED · CHARGING" seconds={45} dark />
        <AbsoluteFill style={{ opacity: closingExit }}>
          <TitleBlock dark eyebrow="The whole idea" lines={['Two coils,', 'one link.']} accentIndex={1} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}><FieldArcs top={640} bottom={1110} opacity={0.65} /><Coil x={540} y={710} scale={1.05} color={C.mint} /><ChargingPad x={540} y={1160} scale={0.85} /></svg>
          <Pill dark text="TRANSMITTER  ↔  RECEIVER" y={1290} />
        </AbsoluteFill>
        <AbsoluteFill style={{ opacity: finalReveal, transform: `translateY(${(1 - finalReveal) * 18}px)` }}>
          <TitleBlock dark eyebrow="Now you know" lines={['No cable.', 'Still linked.']} accentIndex={1} subtitle="Energy passes through a changing magnetic field." y={290} size={91} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}><Coil x={540} y={980} scale={1.2} color={C.mint} /><Coil x={540} y={1180} scale={1.2} color={C.indigo} /><path d="M 540 1060 L 540 1100" stroke={C.mint} strokeWidth={8} strokeDasharray="8 12" /></svg>
        </AbsoluteFill>
      </Scene>
      <CalmCaptions lines={VO} accentWords={['magnetic field', 'alternating current', 'coil', 'voltage', 'battery', 'aligned', 'cable']} />
      <CalmSound narration="voiceovers/wireless-charging/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-link').end} duration={45} />
    </AbsoluteFill>
  );
};

export default Short18WirelessCharging;
