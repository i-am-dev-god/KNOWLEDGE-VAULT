import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Callout, DemoPanel, Header, Pill, Scene, TitleBlock, line, reached } from '../../lib/next-calm';
import { QR_ROWS, QR_SIZE } from './qr.gen';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short17QrCode', durationInSeconds: 45, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;

type Damage = 'none' | 'light' | 'severe';
const isFinder = (x: number, y: number) => (x <= 6 && y <= 6) || (x >= 14 && y <= 6) || (x <= 6 && y >= 14);
const isDamaged = (x: number, y: number, damage: Damage) => {
  if (damage === 'none' || isFinder(x, y)) return false;
  if (damage === 'light') return x >= 8 && x <= 12 && y >= 8 && y <= 12;
  return (x >= 4 && x <= 16 && y >= 4 && y <= 16) || (x + 2 * y) % 5 === 0;
};

const Qr: React.FC<{
  x: number; y: number; cell?: number; damage?: Damage; damageOpacity?: number;
  dimData?: boolean; finderFocus?: boolean; scan?: number;
}> = ({ x, y, cell = 22, damage = 'none', damageOpacity = 1, dimData = false, finderFocus = false, scan = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-30} y={-30} width={QR_SIZE * cell + 60} height={QR_SIZE * cell + 60} rx={22} fill={C.paper} stroke={C.line} strokeWidth={3} />
    {QR_ROWS.flatMap((row, my) => row.split('').map((value, mx) => {
      const finder = isFinder(mx, my);
      const damaged = isDamaged(mx, my, damage);
      const opacity = dimData && !finder ? 0.16 : 1;
      return <g key={`${mx}-${my}`} opacity={opacity}>
        <rect x={mx * cell} y={my * cell} width={cell + 0.5} height={cell + 0.5} fill={value === '1' ? C.ink : C.paper} />
        {damaged && <rect x={mx * cell} y={my * cell} width={cell + 0.5} height={cell + 0.5} fill={C.paper} opacity={damageOpacity} />}
      </g>;
    }))}
    {damage !== 'none' && <rect x={7.5 * cell} y={7.5 * cell} width={6 * cell} height={6 * cell} rx={10} fill="none" stroke={C.coral} strokeWidth={4} strokeDasharray="10 10" opacity={damageOpacity} />}
    {finderFocus && [[0, 0], [14, 0], [0, 14]].map(([fx, fy]) => <rect key={`${fx}-${fy}`} x={fx * cell - 7} y={fy * cell - 7} width={7 * cell + 14} height={7 * cell + 14} rx={10} fill="none" stroke={C.teal} strokeWidth={6} />)}
    {scan > 0 && <g opacity={Math.sin(scan * Math.PI)} transform={`translate(0 ${scan * QR_SIZE * cell})`}><rect x={-10} y={-10} width={QR_SIZE * cell + 20} height={16} fill={C.mint} opacity={0.65} /><path d={`M -10 0 L ${QR_SIZE * cell + 10} 0`} stroke={C.teal} strokeWidth={5} /></g>}
  </g>
);

const MessageCard: React.FC<{
  x: number; y: number; title: string; subtitle: string; color?: string; opacity?: number; width?: number;
}> = ({ x, y, title, subtitle, color = C.teal, opacity = 1, width = 360 }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <rect x={-width / 2} y={-85} width={width} height={170} rx={28} fill={C.ink} stroke={color} strokeWidth={3} />
    <text x={0} y={-10} textAnchor="middle" fill={color} fontFamily={FONT_MONO} fontWeight={700} fontSize={title.length > 16 ? 23 : 42} letterSpacing={2}>{title}</text>
    <text x={0} y={40} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontSize={19}>{subtitle}</text>
  </g>
);

const DataBlock: React.FC<{ x: number; y: number; label: string; bits: string; color: string; opacity: number }> = ({ x, y, label, bits, color, opacity }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity}>
    <rect x={-195} y={-55} width={390} height={110} rx={20} fill={C.paper} stroke={color} strokeWidth={3} />
    <text x={0} y={-10} textAnchor="middle" fill={color} fontFamily={FONT_MONO} fontWeight={700} fontSize={20}>{label}</text>
    <text x={0} y={28} textAnchor="middle" fill={C.ink} fontFamily={FONT_MONO} fontSize={25} letterSpacing={3}>{bits}</text>
  </g>
);

const Short17QrCode: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const scanned = prog(t, line(VO, 'scan-read').start - 0.1, line(VO, 'scan-read').start + 0.7);
  const damaged = prog(t, line(VO, 'damage-cover').start - 0.1, line(VO, 'damage-cover').start + 0.6);
  const extra = 0.2 + 0.8 * prog(t, line(VO, 'repair-extra').start - 0.1, line(VO, 'repair-extra').start + 0.5);
  const solving = prog(t, line(VO, 'repair-rebuild').start - 0.1, line(VO, 'repair-rebuild').start + 0.7);
  const recovered = prog(t, line(VO, 'repair-recovered').start - 0.1, line(VO, 'repair-recovered').start + 0.5);
  const severe = prog(t, line(VO, 'limit-fail').start - 0.1, line(VO, 'limit-fail').start + 0.5);

  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="scan" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · QR" seconds={45} /><DemoPanel />
      <TitleBlock eyebrow="A concrete example" lines={['Start with', 'a message']} accentIndex={1} size={66} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <Qr x={145} y={680} cell={22} scan={scanned} />
        <path d="M 640 885 L 700 885" stroke={C.teal} strokeWidth={6} strokeDasharray="9 10" opacity={scanned} />
        <MessageCard x={810} y={885} title="HELLO" subtitle="MESSAGE REBUILT" opacity={0.18 + scanned * 0.82} width={330} />
        <text x={380} y={1240} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={21}>REAL QR CODE · CONTENT: HELLO</text>
      </svg>
    </Scene>

    <Scene t={t} id="damage" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · QR" seconds={45} /><DemoPanel />
      <TitleBlock eyebrow="Keep the finder patterns intact" lines={['Damage only', 'central data']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <Qr x={309} y={610} cell={22} damage="light" damageOpacity={damaged} />
        <Callout x={540} y={1190} targetX={560} targetY={855} text="MISSING DATA VALUES" color={C.coral} opacity={damaged} />
      </svg>
      <Pill text={reached(t, VO, 'damage-question') ? 'HOW CAN HELLO SURVIVE?' : 'THE PHYSICAL CODE IS DAMAGED'} y={1320} color={C.coral} />
    </Scene>

    <Scene t={t} id="repair" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · QR" seconds={45} /><DemoPanel />
      <TitleBlock eyebrow="Damage on the left, calculation on the right" lines={['Reconstruct', 'missing values']} accentIndex={1} size={61} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <text x={280} y={575} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={20}>PHYSICAL CODE</text>
        <Qr x={120} y={640} cell={15} damage="light" />
        <text x={280} y={1120} textAnchor="middle" fill={C.coral} fontFamily={FONT_MONO} fontSize={19}>SCRATCH REMAINS</text>
        <text x={730} y={575} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={20}>READER'S WORKING MEMORY</text>
        <DataBlock x={730} y={690} label="MESSAGE DATA" bits={recovered > 0.5 ? '10110 00101' : '10??0 0??01'} color={C.indigo} opacity={0.35 + solving * 0.65} />
        <DataBlock x={730} y={840} label="ERROR-CORRECTION INFO" bits="11001 01110" color={C.teal} opacity={extra} />
        <g transform="translate(730 990)" opacity={solving}>
          <circle r={62} fill={C.ink} stroke={C.teal} strokeWidth={4} />
          <text x={0} y={9} textAnchor="middle" fill={C.mint} fontFamily={FONT_MONO} fontWeight={700} fontSize={23}>SOLVE</text>
          <path d="M 0 -135 L 0 -75 M 0 -62 L 0 62" stroke={C.teal} strokeWidth={4} strokeDasharray="8 9" />
        </g>
        <MessageCard x={730} y={1170} title="HELLO" subtitle="MISSING VALUES FILLED IN" color={C.teal} opacity={recovered} width={420} />
      </svg>
    </Scene>

    <Scene t={t} id="finders" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · QR" seconds={45} /><DemoPanel />
      <TitleBlock eyebrow="Dim the data, isolate the finders" lines={['A different', 'job']} accentIndex={1} size={68} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <Qr x={309} y={610} cell={22} dimData finderFocus />
        <Callout x={540} y={1190} targetX={386} targetY={687} text="FIND + ALIGN THE CODE" />
        <text x={540} y={1250} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={21}>FOCUS: THREE LARGE CORNER PATTERNS</text>
      </svg>
    </Scene>

    <Scene t={t} id="limit" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · QR" seconds={45} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Do not promise unlimited repair" lines={['Recovery has', 'a limit']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <Qr x={140} y={680} cell={20} damage={severe > 0.4 ? 'severe' : 'light'} damageOpacity={0.4 + severe * 0.6} />
        <MessageCard x={800} y={880} title={severe > 0.4 ? 'TOO MUCH DAMAGE' : 'REPAIR HAS A LIMIT'} subtitle={severe > 0.4 ? 'MESSAGE UNAVAILABLE' : 'ENOUGH INFORMATION MATTERS'} color={C.coral} width={390} />
      </svg>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · QR" seconds={45} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Error correction, within limits" lines={['A second', 'chance']} accentIndex={1} size={68} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO} textAnchor="middle">
        <text x={540} y={665} fill={C.mint} fontSize={25} fontWeight={700}>MESSAGE DATA + EXTRA INFORMATION</text>
        <path d="M 540 720 L 540 805" stroke={C.mint} strokeWidth={6} strokeDasharray="9 10" />
        <rect x={220} y={850} width={640} height={150} rx={30} fill="rgba(255,255,255,0.07)" stroke={C.mint} strokeWidth={3} />
        <text x={540} y={915} fill={C.paper} fontSize={25}>MISSING VALUES CAN BE RECOVERED</text>
        <text x={540} y={960} fill={C.mint} fontSize={24}>WHEN ENOUGH INFORMATION REMAINS</text>
        <text x={540} y={1130} fill={C.paper} fontSize={44} fontWeight={700}>A SECOND CHANCE, NOT MAGIC.</text>
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['HELLO', 'central squares', 'error-correction information', 'missing values', 'large corner patterns', 'limit']} />
    <CalmSound narration="voiceovers/qr-code/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={45} />
  </AbsoluteFill>;
};
export default Short17QrCode;
