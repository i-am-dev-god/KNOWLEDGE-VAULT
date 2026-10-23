import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Header, Pill, Scene, TitleBlock, line, seeded } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short17QrCode', durationInSeconds: 45, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;

const finderValue = (x: number, y: number, ox: number, oy: number) => {
  const dx = x - ox;
  const dy = y - oy;
  if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return null;
  return dx === 0 || dy === 0 || dx === 6 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
};

const QrCode: React.FC<{
  x: number; y: number; scale?: number; finders?: boolean; scan?: number; damage?: number; repair?: number; dark?: boolean;
}> = ({ x, y, scale = 1, finders = false, scan = 0, damage = 0, repair = 0, dark = false }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <rect x={-18} y={-18} width={366} height={366} rx={28} fill={dark ? '#e9edf5' : C.paper} stroke={dark ? C.mint : C.line} strokeWidth={3} />
    <rect x={0} y={0} width={330} height={330} fill={C.paper} />
    {Array.from({ length: 29 * 29 }, (_, index) => {
      const mx = index % 29;
      const my = Math.floor(index / 29);
      const finder = finderValue(mx, my, 0, 0) ?? finderValue(mx, my, 22, 0) ?? finderValue(mx, my, 0, 22);
      const inFinderZone = (mx <= 7 && my <= 7) || (mx >= 21 && my <= 7) || (mx <= 7 && my >= 21);
      const timing = !inFinderZone && (mx === 6 || my === 6);
      const on = finder ?? (timing ? (mx + my) % 2 === 0 : seeded(index + 17) > 0.49);
      if (inFinderZone && finder === null) return null;
      return <rect key={index} x={20 + mx * 10} y={20 + my * 10} width={10.4} height={10.4} fill={on ? C.ink : C.paper} />;
    })}
    {finders && <g fill="none" stroke={C.teal} strokeWidth={6}>
      {[[15, 15], [235, 15], [15, 235]].map(([fx, fy], index) => <rect key={index} x={fx} y={fy} width={80} height={80} rx={5} />)}
      <rect x={-7} y={-7} width={344} height={344} rx={10} stroke={C.indigo} strokeDasharray="10 12" strokeWidth={4} />
    </g>}
    {scan > 0 && <g opacity={scan}>
      <path d="M 295 45 L 295 285 L 265 285 L 265 115 L 235 115 L 235 285 L 205 285 L 205 45 L 45 45 L 45 285" fill="none" stroke={C.teal} strokeWidth={6} strokeDasharray="10 12" />
      <circle cx={295} cy={45 + ((scan * 3) % 1) * 230} r={11} fill={C.teal} />
    </g>}
    {damage > 0 && <g opacity={damage * (1 - repair * 0.85)}>
      <path d="M 125 245 L 245 125" stroke={C.paper} strokeWidth={48} strokeLinecap="round" />
      <path d="M 125 245 L 245 125" stroke={C.coral} strokeWidth={5} strokeDasharray="13 12" strokeLinecap="round" />
    </g>}
    {repair > 0 && <g fill={C.teal} opacity={repair}>
      {[0, 1, 2, 3, 4].map((index) => <rect key={index} x={125 + index * 24} y={245 - index * 24} width={14} height={14} rx={2} />)}
    </g>}
  </g>
);

const Short17QrCode: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const data = prog(t, line(VO, 'hook-data').start - 0.1, line(VO, 'hook-data').start + 0.5);
  const corners = prog(t, line(VO, 'pattern-corners').start - 0.1, line(VO, 'pattern-quiet').start + 0.3);
  const read = prog(t, line(VO, 'read-message').start - 0.1, line(VO, 'read-message').start + 0.9);
  const damage = prog(t, line(VO, 'repair-damage').start - 0.1, line(VO, 'repair-damage').start + 0.5);
  const repair = prog(t, line(VO, 'repair-damage').start + 0.25, line(VO, 'repair-limit').start + 0.3);
  const finalStart = line(VO, 'closing-backup').end + 0.55;
  const finalReveal = prog(t, finalStart, finalStart + 0.9);
  const closingExit = 1 - prog(t, finalStart - 0.65, finalStart);

  return (
    <AbsoluteFill style={{ background: C.bg }}>
      <Scene t={t} id="hook" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · QR" seconds={45} />
        <TitleBlock eyebrow="Everyday tech, explained" lines={['Data in', 'black + white.']} accentIndex={1} subtitle="A structured message, not random squares." size={75} />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}><QrCode x={370} y={570} scale={1.03} /></svg>
        <Pill text={data > 0.5 ? 'MODULES  →  BITS  →  MESSAGE' : 'QUICK RESPONSE CODE'} y={1270} color={C.teal} />
      </Scene>

      <Scene t={t} id="pattern" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · QR" seconds={45} />
        <TitleBlock eyebrow="Orientation comes first" lines={['A map inside', 'the pattern.']} accentIndex={1} subtitle="Finders, timing, and a quiet border guide the reader." size={67} />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <QrCode x={375} y={555} scale={1.0} finders={corners > 0.1} />
          <g fontFamily={FONT_MONO} fontSize={23} fontWeight={700} fill={C.teal} opacity={corners}>
            <text x={130} y={590}>FINDER</text><text x={730} y={590}>FINDER</text><text x={430} y={945} textAnchor="middle">FINDER</text>
          </g>
          <text x={540} y={1260} textAnchor="middle" fill={C.indigo} fontFamily={FONT_MONO} fontSize={23} letterSpacing={3} opacity={corners}>QUIET ZONE</text>
        </svg>
        <Pill text="POSITION  +  ROTATION  +  SEPARATION" y={1310} />
      </Scene>

      <Scene t={t} id="read" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · QR" seconds={45} />
        <TitleBlock eyebrow="Decode the modules" lines={['Read in', 'a set order.']} accentIndex={1} subtitle="The scan rebuilds the stored message." />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <QrCode x={165} y={650} scale={0.82} scan={read} />
          <path d="M 485 830 L 650 830" stroke={C.teal} strokeWidth={7} strokeDasharray="12 14" opacity={read} />
          <g transform="translate(765 830)" opacity={read}>
            <rect x={-145} y={-170} width={290} height={340} rx={34} fill={C.ink} />
            <rect x={-122} y={-140} width={244} height={270} rx={22} fill="#e8eef4" />
            <circle cy={-70} r={44} fill={C.teal} opacity={0.85} />
            <path d="M -20 -70 L -4 -52 L 24 -90" fill="none" stroke={C.paper} strokeWidth={9} strokeLinecap="round" strokeLinejoin="round" />
            <text x={0} y={30} textAnchor="middle" fill={C.ink} fontFamily={FONT_MONO} fontWeight={700} fontSize={25}>MESSAGE</text>
            <text x={0} y={68} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontSize={23}>REBUILT</text>
          </g>
        </svg>
        <Pill text="READ  →  DECODE  →  REBUILD" y={1260} color={C.teal} />
      </Scene>

      <Scene t={t} id="repair" scenes={SCENES}>
        <Background t={t} dark /><Header label="TECH EXPLAINED · QR" seconds={45} dark />
        <TitleBlock dark eyebrow="Error correction" lines={['Built-in', 'repair.']} accentIndex={1} subtitle="Extra data can reconstruct damaged modules." />
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
          <QrCode x={375} y={560} scale={1.0} damage={damage} repair={repair} dark />
          <g opacity={repair} transform="translate(540 1195)">
            <rect x={-280} y={-55} width={560} height={110} rx={26} fill="rgba(120,205,189,0.10)" stroke={C.mint} strokeWidth={3} />
            <text x={0} y={13} textAnchor="middle" fill={C.mint} fontFamily={FONT_MONO} fontWeight={700} fontSize={27} letterSpacing={2}>MISSING DATA RESTORED</text>
          </g>
        </svg>
        <Pill dark text={repair > 0.6 ? 'REPAIR WORKS, UP TO A LIMIT' : 'ERROR-CORRECTION DATA'} y={1300} />
      </Scene>

      <Scene t={t} id="closing" scenes={SCENES}>
        <Background t={t} /><Header label="TECH EXPLAINED · QR" seconds={45} />
        <AbsoluteFill style={{ opacity: closingExit }}>
          <TitleBlock eyebrow="The whole idea" lines={['Message', 'plus backup.']} accentIndex={1} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}><QrCode x={390} y={565} scale={0.9} repair={1} /></svg>
          <Pill text="MESSAGE  +  READING GUIDE  +  BACKUP" y={1255} color={C.teal} />
        </AbsoluteFill>
        <AbsoluteFill style={{ opacity: finalReveal, transform: `translateY(${(1 - finalReveal) * 18}px)` }}>
          <TitleBlock eyebrow="Now you know" lines={['Data,', 'with a', 'backup plan.']} accentIndex={2} subtitle="That is how a damaged QR code can still be read." y={250} size={86} />
          <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}><QrCode x={425} y={900} scale={0.7} repair={1} /></svg>
        </AbsoluteFill>
      </Scene>
      <CalmCaptions lines={VO} accentWords={['QR code', 'black and white', 'binary zero or one', 'quiet zone', 'error-correction', 'repair', 'scratches', 'backup plan']} />
      <CalmSound narration="voiceovers/qr-code/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-backup').end} duration={45} />
    </AbsoluteFill>
  );
};

export default Short17QrCode;
