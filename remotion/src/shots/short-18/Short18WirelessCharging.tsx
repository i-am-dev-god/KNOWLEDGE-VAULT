import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Callout, DemoPanel, Header, Scene, TitleBlock, line, spoken, wavePath } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short18WirelessCharging', durationInSeconds: 45, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;

const Coil: React.FC<{ x: number; y: number; scale?: number; color?: string; opacity?: number }> = ({ x, y, scale = 1, color = C.teal, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke={color} strokeWidth={8} opacity={opacity}>
    {[0, 1, 2, 3].map((i) => <rect key={i} x={-145 + i * 22} y={-52 + i * 8} width={290 - i * 44} height={104 - i * 16} rx={45 - i * 5} />)}
  </g>
);

const LinkField: React.FC<{ x?: number; top: number; bottom: number; opacity: number; weak?: boolean }> = ({ x = 540, top, bottom, opacity, weak = false }) => (
  <g fill="none" stroke={weak ? C.coral : C.teal} strokeWidth={weak ? 5 : 7} strokeDasharray={weak ? '10 16' : undefined} opacity={opacity}>
    {[0, 1, 2].map((i) => {
      const spread = 90 + i * 75;
      return <path key={i} d={`M ${x - spread} ${bottom} C ${x - spread * 1.2} ${top + 90}, ${x + spread * 1.2} ${top + 90}, ${x + spread} ${bottom}`} opacity={0.8 - i * 0.18} />;
    })}
  </g>
);

const Battery: React.FC<{ x: number; y: number; opacity: number }> = ({ x, y, opacity }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <rect x={-80} y={-45} width={160} height={90} rx={18} fill="none" stroke={C.ink} strokeWidth={7} />
    <rect x={80} y={-18} width={16} height={36} rx={5} fill={C.ink} />
    <rect x={-62} y={-27} width={124} height={54} rx={10} fill={C.teal} />
    <path d="M -5 -30 L -27 5 L -3 5 L -15 30 L 28 -12 L 3 -12 L 15 -30 Z" fill={C.paper} />
  </g>
);

const ProcessBox: React.FC<{ x: number; label: string; subLabel?: string; opacity: number; color?: string }> = ({ x, label, subLabel, opacity, color = C.indigo }) => (
  <g transform={`translate(${x} 850)`} opacity={opacity}>
    <rect x={-85} y={-75} width={170} height={150} rx={25} fill={C.ink} stroke={color} strokeWidth={3} />
    <text x={0} y={subLabel ? -7 : 10} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontWeight={700} fontSize={20}>{label}</text>
    {subLabel && <text x={0} y={27} textAnchor="middle" fill={C.mint} fontFamily={FONT_MONO} fontWeight={700} fontSize={18}>{subLabel}</text>}
  </g>
);

const Short18WirelessCharging: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const reverse = spoken(t, VO, 'drive-reverse');
  const field = prog(t, line(VO, 'field-change').start - 0.1, line(VO, 'field-change').start + 0.8);
  const receiver = prog(t, line(VO, 'receive-coil').start - 0.1, line(VO, 'receive-coil').start + 0.6);
  const voltage = prog(t, line(VO, 'receive-voltage').start - 0.1, line(VO, 'receive-voltage').start + 0.6);
  const linked = prog(t, line(VO, 'receive-link').start - 0.1, line(VO, 'receive-link').start + 0.5);
  const condition = spoken(t, VO, 'condition-power');
  const batteryReady = prog(t, line(VO, 'condition-power').start + 1.55, line(VO, 'condition-power').start + 2.25);
  const moved = prog(t, line(VO, 'alignment-move').start - 0.1, line(VO, 'alignment-move').start + 0.8);
  const loss = prog(t, line(VO, 'alignment-loss').start - 0.1, line(VO, 'alignment-loss').start + 0.5);
  const direction = Math.sin(t * 2.2) >= 0 ? 1 : -1;

  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="drive" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · CHARGING" seconds={45} /><DemoPanel />
      <TitleBlock eyebrow="Start with one coil, nothing else" lines={['Drive one', 'coil']} accentIndex={1} size={68} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <Coil x={540} y={790} scale={1.35} />
        <text x={540} y={650} textAnchor="middle" fill={C.indigo} fontFamily={FONT_MONO} fontWeight={700} fontSize={28} opacity={0.35 + reverse * 0.65}>{direction > 0 ? 'CURRENT  →' : '←  CURRENT'}</text>
        <rect x={180} y={980} width={720} height={210} rx={28} fill={C.paper} stroke={C.line} strokeWidth={3} />
        <path d={wavePath(230, 1080, 620, 65, 2, t * 0.7)} fill="none" stroke={C.indigo} strokeWidth={8} />
        <text x={540} y={1245} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={22}>DIRECTION REVERSES AGAIN AND AGAIN</text>
      </svg>
    </Scene>

    <Scene t={t} id="field" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · CHARGING" seconds={45} /><DemoPanel />
      <TitleBlock eyebrow="Keep your eyes around the coil" lines={['Make a changing', 'magnetic field']} accentIndex={1} size={60} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <g transform={`translate(540 850) scale(${0.88 + Math.sin(t * 1.7) * 0.08})`} opacity={field}>
          {[0, 1, 2].map((i) => <ellipse key={i} rx={170 + i * 85} ry={85 + i * 65} fill="none" stroke={C.teal} strokeWidth={7 - i} opacity={0.85 - i * 0.2} />)}
        </g>
        <Coil x={540} y={1040} scale={1.15} opacity={0.5} />
        <Callout x={540} y={1220} targetX={760} targetY={850} text="EXPAND + COLLAPSE" opacity={field} />
      </svg>
    </Scene>

    <Scene t={t} id="receive" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · CHARGING" seconds={45} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Now, and only now, add the second coil" lines={['Induce a', 'voltage']} accentIndex={1} size={68} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <LinkField top={690} bottom={1110} opacity={0.25 + receiver * 0.55} />
        <Coil x={540} y={700} scale={1.15} color={C.mint} opacity={0.12 + receiver * 0.88} />
        <Coil x={540} y={1100} scale={1.0} color={C.indigo} opacity={0.55} />
        <g transform="translate(850 700)" opacity={voltage}>
          <rect x={-145} y={-65} width={290} height={130} rx={25} fill="rgba(255,255,255,0.07)" stroke={C.mint} strokeWidth={3} />
          <text x={0} y={-5} textAnchor="middle" fill={C.mint} fontFamily={FONT_MONO} fontSize={20}>INDUCED</text>
          <text x={0} y={30} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontWeight={700} fontSize={27}>VOLTAGE</text>
        </g>
        <g opacity={linked} fontFamily={FONT_MONO} textAnchor="middle">
          <path d="M 300 760 L 300 1030" stroke={C.mint} strokeWidth={4} strokeDasharray="8 10" />
          <text x={230} y={900} fill={C.mint} fontSize={21} transform="rotate(-90 230 900)">NO CONTACT</text>
          <text x={540} y={1240} fill={C.paper} fontSize={25}>THE CHANGING FIELD LINKS THE COILS</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="condition" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · CHARGING" seconds={45} /><DemoPanel />
      <TitleBlock eyebrow="Follow the power, one stage at a time" lines={['Prepare', 'battery power']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <Coil x={170} y={850} scale={0.55} opacity={0.8} />
        <path d="M 245 850 L 430 850" stroke={C.indigo} strokeWidth={5} strokeDasharray="8 8" />
        <ProcessBox x={540} label="RECTIFY" subLabel="+ REGULATE" opacity={condition > 0.03 ? 1 : 0.15} />
        <Battery x={880} y={850} opacity={0.15 + batteryReady * 0.85} />
        <path d="M 650 850 L 790 850" stroke={C.teal} strokeWidth={5} strokeDasharray="8 8" opacity={0.2 + batteryReady * 0.8} />
        <path d={wavePath(300, 1050, 200, 40, 1.5, t * 0.4)} fill="none" stroke={C.indigo} strokeWidth={6} opacity={condition > 0.03 ? 1 : 0.15} />
        <path d="M 600 1050 L 800 1050" stroke={C.teal} strokeWidth={7} opacity={0.15 + batteryReady * 0.85} />
        <text x={400} y={1130} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={20}>ALTERNATING</text>
        <text x={700} y={1130} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={20}>CONTROLLED DC</text>
      </svg>
    </Scene>

    <Scene t={t} id="alignment" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · CHARGING" seconds={45} /><DemoPanel />
      <TitleBlock eyebrow="Same coils, changed position" lines={['Change the', 'coupling']} accentIndex={1} size={66} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <LinkField x={540 + moved * 80} top={700 - moved * 60} bottom={1080} opacity={0.75 - loss * 0.45} weak={moved > 0.35} />
        <Coil x={540 + moved * 180} y={700 - moved * 60} scale={1.1} color={moved > 0.35 ? C.coral : C.teal} />
        <Coil x={540} y={1080} scale={1.0} color={C.indigo} />
        <text x={540} y={1230} textAnchor="middle" fill={loss > 0.3 ? C.coral : C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={26}>{loss > 0.3 ? 'LESS FIELD SHARED → WEAKER TRANSFER' : 'CLOSE + ALIGNED'}</text>
      </svg>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · CHARGING" seconds={45} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="The complete transfer" lines={['Two coils,', 'one transfer']} accentIndex={1} size={68} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <LinkField top={680} bottom={1100} opacity={0.75} />
        <Coil x={540} y={680} scale={1.1} color={C.mint} />
        <Coil x={540} y={1100} scale={1.0} color={C.indigo} />
        <text x={540} y={900} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontWeight={700} fontSize={25}>CHANGING MAGNETIC FIELD</text>
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['alternating current', 'reverse direction', 'expand and collapse', 'second coil', 'voltage', 'rectifies and regulates', 'off-center']} />
    <CalmSound narration="voiceovers/wireless-charging/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={45} />
  </AbsoluteFill>;
};
export default Short18WirelessCharging;
