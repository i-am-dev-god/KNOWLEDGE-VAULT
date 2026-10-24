import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Chip, DemoPanel, Header, Scene, TitleBlock, line } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short27SsdStorage', durationInSeconds: 52, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;

const FlashCell: React.FC<{ x: number; y: number; scale?: number; charge?: number; test?: number; wear?: number }> = ({ x, y, scale = 1, charge = 1, test = 0, wear = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} fontFamily={FONT_MONO}>
    <rect x={-180} y={190} width={360} height={100} rx={20} fill={C.indigo} opacity={0.28} />
    <text x={0} y={255} textAnchor="middle" fill={C.muted} fontSize={18}>SILICON</text>
    <rect x={-180} y={70} width={360} height={120} rx={14} fill={C.paper} stroke={C.blue} strokeWidth={4} />
    <rect x={-110} y={-55} width={220} height={125} rx={18} fill={C.dark} stroke={wear > 0.4 ? C.coral : C.teal} strokeWidth={5} />
    <text x={0} y={165} textAnchor="middle" fill={C.blue} fontSize={18}>INSULATOR</text>
    <rect x={-145} y={-145} width={290} height={70} rx={16} fill={C.indigo} />
    <text x={0} y={-102} textAnchor="middle" fill={C.paper} fontWeight={700} fontSize={20}>CONTROL GATE</text>
    <text x={0} y={-175} textAnchor="middle" fill={C.muted} fontSize={18} opacity={test}>TEST VOLTAGE</text>
    <g opacity={test}>
      <path d="M 0 -205 L 0 -155" stroke={C.coral} strokeWidth={6} strokeDasharray="7 7" />
      <path d="M -120 230 Q 0 120 120 230" fill="none" stroke={C.mint} strokeWidth={9} strokeDasharray="10 8" />
    </g>
    {Array.from({ length: 9 }, (_, i) => {
      const targetX = -75 + (i % 3) * 75;
      const targetY = -25 + Math.floor(i / 3) * 28;
      const p = prog(charge, i / 12, i / 12 + 0.45);
      return <circle key={i} cx={targetX} cy={targetY - (1 - p) * 190} r={10} fill={C.amber} stroke={C.paper} strokeWidth={2} opacity={p} />;
    })}
    {wear > 0.2 && <g stroke={C.coral} strokeWidth={5} opacity={wear}><path d="M -180 85 L -130 120 L -165 155" /><path d="M 180 90 L 135 125 L 165 165" /></g>}
    <text x={0} y={120} textAnchor="middle" fill={C.mint} fontWeight={700} fontSize={18}>TRAPPED CHARGE</text>
  </g>
);

const CellGrid: React.FC<{ wear?: number; spread?: number; t?: number; showPages?: boolean }> = ({ wear = 0, spread = 0, t = 0, showPages = false }) => {
  const active = Math.floor(Math.max(0, t) * 2.2) % 16;
  return <g fontFamily={FONT_MONO}>
    <rect x={190} y={650} width={700} height={480} rx={30} fill={C.paper} stroke={C.ink} strokeWidth={5} />
    {Array.from({ length: 16 }, (_, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const focused = spread > 0.2 && i === active;
      const worn = wear > 0.2 && i === 5;
      return <g key={i}>
        <rect x={225 + col * 160} y={690 + row * 100} width={125} height={72} rx={13} fill={worn ? C.coral : focused ? C.mint : C.pale} stroke={worn || focused ? C.ink : C.line} strokeWidth={worn || focused ? 4 : 2} />
        <text x={287 + col * 160} y={735 + row * 100} textAnchor="middle" fill={C.ink} fontSize={17}>{worn ? 'WEAR' : focused ? 'WRITE' : `CELL ${i + 1}`}</text>
      </g>;
    })}
    {showPages && Array.from({ length: 4 }, (_, row) => <g key={row} fontFamily={FONT_MONO}>
      <path d={`M 905 ${690 + row * 100} L 918 ${690 + row * 100} L 918 ${762 + row * 100} L 905 ${762 + row * 100}`} stroke={C.indigo} strokeWidth={3} fill="none" />
      <text x={930} y={735 + row * 100} fill={C.indigo} fontWeight={700} fontSize={16}>PAGE {row + 1}</text>
    </g>)}
    <path d="M 180 625 L 180 1150 M 180 625 L 205 625 M 180 1150 L 205 1150" stroke={C.indigo} strokeWidth={4} fill="none" />
    <text x={135} y={890} textAnchor="middle" fill={C.indigo} fontWeight={700} fontSize={20} transform="rotate(-90 135 890)">BLOCK</text>
    <text x={540} y={1200} textAnchor="middle" fill={spread > 0.4 ? C.teal : C.muted} fontWeight={700} fontSize={22}>{spread > 0.4 ? 'NEW WRITES SPREAD ACROSS CELLS' : 'PAGES OF CELLS INSIDE EACH BLOCK'}</text>
  </g>;
};

const Short27SsdStorage: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const off = prog(t, line(VO, 'hook-off').start, line(VO, 'hook-off').start + 0.5);
  const remain = prog(t, line(VO, 'hook-remain').start - 0.1, line(VO, 'hook-remain').start + 0.6);
  const trap = prog(t, line(VO, 'cell-trap').start - 0.1, line(VO, 'cell-trap').start + 1.0);
  const threshold = prog(t, line(VO, 'cell-state').start - 0.1, line(VO, 'cell-state').start + 0.6);
  const test = prog(t, line(VO, 'read-test').start - 0.1, line(VO, 'read-test').start + 0.7);
  const value = prog(t, line(VO, 'read-value').start - 0.1, line(VO, 'read-value').start + 0.5);
  const pages = prog(t, line(VO, 'organize-pages').start - 0.1, line(VO, 'organize-pages').start + 0.7);
  const wear = prog(t, line(VO, 'wear-limit').start - 0.1, line(VO, 'wear-limit').start + 0.7);
  const spread = prog(t, line(VO, 'wear-spread').start - 0.1, line(VO, 'wear-spread').start + 0.8);

  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · STORAGE" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="No battery required for memory" lines={['Power off.', 'Files remain.']} accentIndex={1} size={66} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <rect x={220} y={690} width={640} height={390} rx={40} fill={C.dark} stroke={C.ink} strokeWidth={6} />
        {Array.from({ length: 8 }, (_, i) => <rect key={i} x={285 + (i % 4) * 135} y={760 + Math.floor(i / 4) * 120} width={95} height={80} rx={14} fill={C.indigo} opacity={0.35 + remain * 0.65} />)}
        <g transform="translate(770 620)">
          <rect x={-75} y={-38} width={150} height={76} rx={38} fill={C.paper} stroke={C.ink} strokeWidth={4} />
          <circle cx={-35 + off * 70} cy={0} r={28} fill={off > 0.5 ? C.coral : C.teal} />
          <text x={0} y={-60} textAnchor="middle" fill={off > 0.5 ? C.coral : C.teal} fontWeight={700} fontSize={20}>{off > 0.5 ? 'POWER OFF' : 'POWER ON'}</text>
        </g>
        <text x={540} y={1180} textAnchor="middle" fill={C.mint} fontWeight={700} fontSize={23} opacity={remain}>THE STORED CHARGE DOES NOT NEED POWER</text>
      </svg>
    </Scene>

    <Scene t={t} id="cell" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · STORAGE" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="Inside one flash cell" lines={['Charge changes', 'the threshold']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <g transform="translate(390 850) scale(0.85)"><FlashCell x={0} y={0} charge={trap} /></g>
        <g opacity={threshold} fontFamily={FONT_MONO}>
          <text x={765} y={650} textAnchor="middle" fill={C.muted} fontWeight={700} fontSize={20}>THRESHOLD VOLTAGE</text>
          <line x1={710} y1={1020} x2={710} y2={720} stroke={C.muted} strokeWidth={5} />
          <line x1={680} y1={780} x2={850} y2={780} stroke={C.coral} strokeWidth={5} />
          <text x={860} y={788} fill={C.coral} fontSize={19}>HIGHER</text>
          <line x1={680} y1={950} x2={850} y2={950} stroke={C.teal} strokeWidth={5} />
          <text x={860} y={958} fill={C.teal} fontSize={19}>LOWER</text>
          <circle cx={710} cy={950 - trap * 170} r={12} fill={C.amber} />
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="read" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · STORAGE" seconds={52} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Measure, do not open the file" lines={['Test the', 'cell response']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <g transform="translate(360 860) scale(0.78)"><FlashCell x={0} y={0} charge={1} test={test} /></g>
        <Chip x={790} y={800} scale={0.58} label="CTRL" opacity={test} />
        <path d="M 650 800 L 560 800" stroke={C.coral} strokeWidth={6} strokeDasharray="8 8" opacity={test} />
        <g opacity={value} fontFamily={FONT_MONO} textAnchor="middle">
          <rect x={625} y={1010} width={330} height={120} rx={25} fill="rgba(255,255,255,0.07)" stroke={C.mint} strokeWidth={3} />
          <text x={790} y={1060} fill={C.mint} fontWeight={700} fontSize={22}>RESPONSE MEASURED</text>
          <text x={790} y={1100} fill={C.paper} fontSize={20}>STORED VALUE IDENTIFIED</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="organize" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · STORAGE" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="Scale up the same cell" lines={['Pages inside', 'blocks']} accentIndex={1} size={67} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} opacity={pages}><CellGrid showPages /></svg>
    </Scene>

    <Scene t={t} id="wear" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · STORAGE" seconds={52} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Writes cause gradual wear" lines={['Spread the', 'next writes']} accentIndex={1} size={66} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <g opacity={1 - spread * 0.25}><CellGrid wear={wear} spread={spread} t={t - line(VO, 'wear-spread').start} /></g>
        <g opacity={spread} fontFamily={FONT_MONO} textAnchor="middle">
          <rect x={300} y={1240} width={480} height={72} rx={22} fill="rgba(255,255,255,0.07)" stroke={C.mint} strokeWidth={3} />
          <text x={540} y={1286} fill={C.mint} fontWeight={700} fontSize={24}>WEAR LEVELING</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · STORAGE" seconds={52} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Memory plus maintenance" lines={['Charge holds.', 'Control protects.']} accentIndex={1} size={61} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO} textAnchor="middle">
        {[['TRAPPED CHARGE', C.amber], ['THRESHOLD READ', C.indigo], ['WEAR LEVELING', C.mint]].map(([label, color], i) => <g key={label} transform={`translate(540 ${720 + i * 210})`}>
          <rect x={-300} y={-65} width={600} height={130} rx={27} fill="rgba(255,255,255,0.06)" stroke={color as string} strokeWidth={3} />
          <text y={10} fill={color as string} fontWeight={700} fontSize={26}>{label}</text>
          {i < 2 && <path d="M 0 75 L 0 130" stroke={C.mint} strokeWidth={4} strokeDasharray="7 7" />}
        </g>)}
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['still remembers', 'trap electrical charge', 'threshold voltage', 'test voltage', 'stored value', 'pages and blocks', 'gradually wears', 'wear leveling']} />
    <CalmSound narration="voiceovers/ssd-storage/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={52} />
  </AbsoluteFill>;
};
export default Short27SsdStorage;
