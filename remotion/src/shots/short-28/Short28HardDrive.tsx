import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Chip, DemoPanel, Header, Scene, TitleBlock, line } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short28HardDrive', durationInSeconds: 52, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;
const polar = (cx: number, cy: number, r: number, degrees: number) => {
  const a = degrees * Math.PI / 180;
  return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r };
};
const sectorPath = (cx: number, cy: number, inner: number, outer: number, angle: number, width: number) => {
  const a = polar(cx, cy, outer, angle - width / 2);
  const b = polar(cx, cy, outer, angle + width / 2);
  const c = polar(cx, cy, inner, angle + width / 2);
  const d = polar(cx, cy, inner, angle - width / 2);
  return `M ${a.x} ${a.y} A ${outer} ${outer} 0 0 1 ${b.x} ${b.y} L ${c.x} ${c.y} A ${inner} ${inner} 0 0 0 ${d.x} ${d.y} Z`;
};

const Drive: React.FC<{
  rotation: number; seek?: number; sectorAngle?: number; read?: number; actuator?: boolean; frame?: boolean; label?: boolean;
}> = ({ rotation, seek = 0, sectorAngle = 0, read = 0, actuator = true, frame = true, label = true }) => {
  const cx = 410;
  const cy = 900;
  const r = 220;
  const headRadius = 205 - seek * 85;
  const head = polar(cx, cy, headRadius, -25);
  const pivot = { x: 820, y: 1130 };
  return <g fontFamily={FONT_MONO}>
    {frame && <rect x={125} y={630} width={770} height={590} rx={40} fill={C.paper} stroke={C.ink} strokeWidth={6} />}
    <circle cx={cx} cy={cy} r={r + 16} fill={C.dark} />
    <circle cx={cx} cy={cy} r={r} fill="#dfe5ec" stroke={C.muted} strokeWidth={4} />
    {[0.35, 0.55, 0.75, 0.92].map((p) => <circle key={p} cx={cx} cy={cy} r={r * p} fill="none" stroke={C.muted} strokeWidth={2} opacity={0.6} />)}
    <g transform={`rotate(${rotation} ${cx} ${cy})`} opacity={0.45}>
      {Array.from({ length: 16 }, (_, i) => {
        const p = polar(cx, cy, 55, i * 22.5);
        const q = polar(cx, cy, r - 8, i * 22.5);
        return <line key={i} x1={p.x} y1={p.y} x2={q.x} y2={q.y} stroke={C.muted} strokeWidth={2} />;
      })}
      <circle cx={cx} cy={cy - r + 18} r={8} fill={C.indigo} />
    </g>
    <path d={sectorPath(cx, cy, headRadius - 18, headRadius + 18, sectorAngle, 16)} fill={read > 0.2 ? C.mint : C.coral} opacity={0.85} />
    <circle cx={cx} cy={cy} r={48} fill={C.paper} stroke={C.ink} strokeWidth={5} /><circle cx={cx} cy={cy} r={13} fill={C.ink} />
    {actuator && <>
      <line x1={pivot.x} y1={pivot.y} x2={head.x} y2={head.y} stroke={C.indigo} strokeWidth={28} strokeLinecap="round" />
      <circle cx={pivot.x} cy={pivot.y} r={47} fill={C.dark} stroke={C.indigo} strokeWidth={7} />
      <g transform={`translate(${head.x} ${head.y}) rotate(-25)`}>
        <rect x={-24} y={-20} width={48} height={40} rx={9} fill={read > 0.2 ? C.mint : C.coral} stroke={C.ink} strokeWidth={4} />
        <text x={0} y={-35} textAnchor="middle" fill={C.muted} fontWeight={700} fontSize={17}>HEAD</text>
      </g>
    </>}
    {label && <text x={cx} y={1230} textAnchor="middle" fill={C.teal} fontWeight={700} fontSize={21}>SPINNING PLATTER · TRACKS + SECTORS</text>}
  </g>;
};

const Short28HardDrive: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const where = prog(t, line(VO, 'hook-where').start - 0.1, line(VO, 'hook-where').start + 0.6);
  const spin = prog(t, line(VO, 'platter-spin').start - 0.1, line(VO, 'platter-spin').start + 0.6);
  const domains = prog(t, line(VO, 'platter-domains').start - 0.1, line(VO, 'platter-domains').start + 0.6);
  const address = prog(t, line(VO, 'map-address').start - 0.1, line(VO, 'map-address').start + 0.6);
  const locate = prog(t, line(VO, 'map-sector').start - 0.1, line(VO, 'map-sector').start + 0.7);
  const seek = prog(t, line(VO, 'seek-arm').start - 0.1, line(VO, 'seek-arm').start + 1.0);
  const wait = prog(t, line(VO, 'seek-rotate').start - 0.1, line(VO, 'seek-rotate').start + 0.5);
  const read = prog(t, line(VO, 'read-sense').start - 0.1, line(VO, 'read-sense').start + 0.7);
  const rotation = t * 45;
  const readStart = line(VO, 'read-sense').start;
  const sectorBase = -25 - readStart * 45;
  const sectorAngle = sectorBase + rotation;

  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · STORAGE" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="A file has a physical location" lines={['Where is', 'your file?']} accentIndex={1} size={67} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <Drive rotation={rotation} sectorAngle={sectorAngle} seek={0.25} />
        <g opacity={where} fontFamily={FONT_MONO} textAnchor="middle">
          <rect x={690} y={650} width={180} height={95} rx={22} fill={C.ink} stroke={C.coral} strokeWidth={3} />
          <text x={780} y={710} fill={C.coral} fontWeight={700} fontSize={25}>FILE ?</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="platter" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · STORAGE" seconds={52} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="The storage surface moves" lines={['Spinning platter.', 'Magnetic bits.']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <g opacity={0.4 + spin * 0.6}><Drive rotation={rotation} sectorAngle={sectorAngle} seek={0.35} /></g>
        <g opacity={domains} fontFamily={FONT_MONO}>
          <rect x={615} y={650} width={280} height={230} rx={26} fill="rgba(255,255,255,0.07)" stroke={C.mint} strokeWidth={3} />
          <text x={755} y={690} textAnchor="middle" fill={C.mint} fontWeight={700} fontSize={19}>MAGNETIC REGIONS</text>
          {Array.from({ length: 6 }, (_, i) => <g key={i} transform={`translate(${655 + (i % 3) * 85} ${755 + Math.floor(i / 3) * 75}) rotate(${i % 2 ? 180 : 0})`}>
            <path d="M -24 0 L 24 0 M 24 0 L 12 -10 M 24 0 L 12 10" stroke={i % 2 ? C.coral : C.mint} strokeWidth={6} />
          </g>)}
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="map" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · STORAGE" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="Translate the request" lines={['Address becomes', 'a location']} accentIndex={1} size={63} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <g opacity={address}>
          <rect x={105} y={730} width={310} height={250} rx={30} fill={C.paper} stroke={C.indigo} strokeWidth={4} />
          <text x={260} y={795} textAnchor="middle" fill={C.muted} fontSize={20}>EXAMPLE ADDRESS</text>
          <text x={260} y={875} textAnchor="middle" fill={C.indigo} fontWeight={700} fontSize={32}>LBA 4,204</text>
          <text x={260} y={930} textAnchor="middle" fill={C.muted} fontSize={18}>LOGICAL BLOCK</text>
        </g>
        <Chip x={530} y={855} scale={0.43} label="MAP" opacity={locate} />
        <path d="M 425 855 L 465 855 M 595 855 L 630 855" stroke={C.teal} strokeWidth={5} strokeDasharray="7 7" opacity={locate} />
        <g transform="translate(404 142) scale(0.82)">
          <Drive rotation={rotation} sectorAngle={sectorAngle} seek={0.65} actuator={false} frame={false} label={false} />
        </g>
        <g opacity={locate} textAnchor="middle">
          <text x={740} y={1170} fill={C.coral} fontWeight={700} fontSize={22}>TRACK + SECTOR IDENTIFIED</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="seek" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · STORAGE" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="Two motions must meet" lines={['Seek the track.', 'Wait for the sector.']} accentIndex={1} size={60} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <Drive rotation={rotation} sectorAngle={sectorAngle} seek={seek} />
        <g opacity={wait} fontFamily={FONT_MONO} textAnchor="middle">
          <rect x={620} y={650} width={310} height={100} rx={24} fill={C.ink} stroke={C.amber} strokeWidth={3} />
          <text x={775} y={710} fill={C.amber} fontWeight={700} fontSize={21}>SECTOR ROTATING → HEAD</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="read" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · STORAGE" seconds={52} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="The sector passes the head" lines={['Magnetic changes', 'become bits']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <Drive rotation={rotation} sectorAngle={sectorAngle} seek={1} read={read} />
        <g opacity={read} fontFamily={FONT_MONO} textAnchor="middle">
          <rect x={595} y={650} width={350} height={130} rx={25} fill="rgba(255,255,255,0.07)" stroke={C.mint} strokeWidth={3} />
          <text x={770} y={705} fill={C.mint} fontWeight={700} fontSize={24}>0 1 0 1 1 0 0 1</text>
          <text x={770} y={750} fill={C.paper} fontSize={19}>RECOVERED DATA</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · STORAGE" seconds={52} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="The complete mechanical seek" lines={['Arm moves.', 'Platter turns.', 'Data arrives.']} accentIndex={2} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO} textAnchor="middle">
        {[['ADDRESS → TRACK', C.indigo], ['ARM → SECTOR', C.coral], ['MAGNETISM → BITS', C.mint]].map(([label, color], i) => <g key={label} transform={`translate(540 ${730 + i * 200})`}>
          <rect x={-300} y={-65} width={600} height={130} rx={27} fill="rgba(255,255,255,0.06)" stroke={color as string} strokeWidth={3} />
          <text y={10} fill={color as string} fontWeight={700} fontSize={25}>{label}</text>
          {i < 2 && <path d="M 0 75 L 0 125" stroke={C.mint} strokeWidth={4} strokeDasharray="7 7" />}
        </g>)}
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['where its data is stored', 'platters spin', 'magnetic regions', 'logical address', 'track and sector', 'actuator', 'rotate underneath', 'recover the bits']} />
    <CalmSound narration="voiceovers/hard-drive/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={52} />
  </AbsoluteFill>;
};
export default Short28HardDrive;
