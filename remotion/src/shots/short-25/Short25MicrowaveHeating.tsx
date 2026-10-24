import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Callout, DemoPanel, Header, Scene, TitleBlock, line } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short25MicrowaveHeating', durationInSeconds: 55, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;

const Dipole: React.FC<{
  x: number; y: number; angle?: number; scale?: number; opacity?: number; heat?: number; index?: number;
}> = ({ x, y, angle = 0, scale = 1, opacity = 1, heat = 0, index = 0 }) => {
  const jiggleX = Math.sin(tSafe(index) + angle * 0.08) * heat * 5;
  const jiggleY = Math.cos(tSafe(index + 4) + angle * 0.06) * heat * 5;
  return <g transform={`translate(${x + jiggleX} ${y + jiggleY}) rotate(${angle}) scale(${scale})`} opacity={opacity}>
    <path d="M -20 0 L 20 0" stroke={C.muted} strokeWidth={6} />
    <circle cx={-24} cy={0} r={25} fill={heat > 0.4 ? C.amber : C.coral} />
    <circle cx={23} cy={-13} r={13} fill={C.blue} /><circle cx={23} cy={13} r={13} fill={C.blue} />
    <text x={-24} y={-36} textAnchor="middle" fill={C.coral} fontFamily={FONT_MONO} fontWeight={700} fontSize={19}>δ−</text>
    <text x={28} y={-36} textAnchor="middle" fill={C.blue} fontFamily={FONT_MONO} fontWeight={700} fontSize={19}>δ+</text>
  </g>;
};
const tSafe = (seed: number) => seed * 1.713;

const Turntable: React.FC<{ angle?: number; rotate?: number; zones?: boolean; heat?: number }> = ({ angle = 0, rotate = 1, zones = false, heat = 0 }) => (
  <g>
    <rect x={205} y={650} width={670} height={480} rx={38} fill="#e7ebf1" stroke={C.ink} strokeWidth={6} />
    {zones && <>
      <ellipse cx={385} cy={820} rx={150} ry={130} fill={C.amber} opacity={0.22 + heat * 0.2} />
      <ellipse cx={720} cy={965} rx={130} ry={115} fill={C.blue} opacity={0.16} />
      <text x={360} y={710} textAnchor="middle" fill={C.amber} fontFamily={FONT_MONO} fontWeight={700} fontSize={21}>HOTTER REGION</text>
      <text x={740} y={1090} textAnchor="middle" fill={C.blue} fontFamily={FONT_MONO} fontWeight={700} fontSize={21}>COOLER REGION</text>
    </>}
    <circle cx={540} cy={890} r={190} fill={C.paper} stroke={C.muted} strokeWidth={5} strokeDasharray="10 9" />
    <g transform={`rotate(${angle} 540 890)`}>
      <g transform="translate(455 820)">
        <rect x={-65} y={-45} width={130} height={90} rx={24} fill={heat > 0.4 ? C.amber : C.coral} opacity={0.85} />
        <circle cx={-22} cy={-5} r={13} fill={C.paper} opacity={0.5} /><circle cx={25} cy={12} r={17} fill={C.paper} opacity={0.4} />
      </g>
      <g transform="translate(640 950)">
        <path d="M -65 35 Q -55 -55 0 -45 Q 60 -55 65 35 Z" fill={heat > 0.4 ? C.amber : C.teal} opacity={0.85} />
      </g>
      <circle cx={540} cy={700} r={8} fill={C.indigo} />
    </g>
    <path d="M 375 1120 Q 540 1200 705 1120" fill="none" stroke={C.teal} strokeWidth={6} strokeDasharray="10 9" opacity={rotate} />
    <text x={540} y={1240} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={22}>TURNTABLE MOVES THE FOOD</text>
  </g>
);

const Short25MicrowaveHeating: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const turn = prog(t, line(VO, 'hook-plate').start, line(VO, 'hook-plate').start + 0.6);
  const magnetron = prog(t, line(VO, 'magnetron-source').start - 0.1, line(VO, 'magnetron-source').start + 0.6);
  const walls = prog(t, line(VO, 'magnetron-walls').start - 0.1, line(VO, 'magnetron-walls').start + 0.6);
  const charge = prog(t, line(VO, 'water-charge').start - 0.1, line(VO, 'water-charge').start + 0.5);
  const rotate = prog(t, line(VO, 'water-rotate').start - 0.1, line(VO, 'water-rotate').start + 0.6);
  const heat = prog(t, line(VO, 'water-heat').start - 0.1, line(VO, 'water-heat').start + 1.0);
  const zones = prog(t, line(VO, 'standing-zones').start - 0.1, line(VO, 'standing-zones').start + 0.6);
  const turning = prog(t, line(VO, 'standing-turn').start - 0.1, line(VO, 'standing-turn').start + 0.7);
  const safe = prog(t, line(VO, 'safety-radioactive').start - 0.1, line(VO, 'safety-radioactive').start + 0.5);
  const off = prog(t, line(VO, 'safety-heat').start - 0.1, line(VO, 'safety-heat').start + 0.7);
  const dipoleAngle = Math.sin(t * 2.3) * 68 * rotate * (1 - off);

  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · HEAT" seconds={55} /><DemoPanel />
      <TitleBlock eyebrow="Movement inside the oven" lines={['Why the plate', 'turns']} accentIndex={1} size={66} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}><Turntable angle={Math.max(0, t - line(VO, 'hook-plate').start) * 45} rotate={turn} heat={0.3} /></svg>
    </Scene>

    <Scene t={t} id="magnetron" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · HEAT" seconds={55} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Generate, then guide the field" lines={['Microwaves', 'around the cavity']} accentIndex={1} size={61} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <rect x={170} y={640} width={740} height={500} rx={35} fill="rgba(255,255,255,0.05)" stroke={C.paper} strokeWidth={7} />
        <rect x={190} y={770} width={120} height={180} rx={20} fill={C.ink} stroke={C.coral} strokeWidth={4} />
        <text x={250} y={745} textAnchor="middle" fill={C.coral} fontFamily={FONT_MONO} fontWeight={700} fontSize={19}>MAGNETRON</text>
        <circle cx={250} cy={860} r={25 + magnetron * 8} fill={C.coral} opacity={0.35 + magnetron * 0.65} />
        <g opacity={magnetron} fill="none" stroke={C.mint} strokeWidth={6} strokeDasharray="16 13" strokeDashoffset={-t * 45}>
          <path d="M 290 830 L 490 680 L 790 790 L 520 960 L 830 1070" />
          <path d="M 290 890 L 530 790 L 850 920 L 620 1090" opacity={0.65} />
        </g>
        <g opacity={walls} fontFamily={FONT_MONO} fontWeight={700} fontSize={21}>
          <text x={720} y={610} textAnchor="middle" fill={C.mint}>METAL WALLS REFLECT THE WAVES</text>
          <path d="M 810 665 L 810 620 L 780 645 M 810 620 L 840 645" stroke={C.mint} fill="none" strokeWidth={5} />
        </g>
        <ellipse cx={590} cy={1040} rx={190} ry={45} fill="none" stroke={C.muted} strokeWidth={5} opacity={0.45} />
      </svg>
    </Scene>

    <Scene t={t} id="water" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · HEAT" seconds={55} /><DemoPanel />
      <TitleBlock eyebrow="Zoom into the water" lines={['Dipoles rotate.', 'Heat spreads.']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        {[
          [360, 730], [590, 710], [760, 790], [410, 960], [650, 960],
        ].map(([x, y], i) => <Dipole key={i} x={x} y={y} index={i} angle={dipoleAngle + i * 22} scale={i === 1 ? 1.35 : 1} opacity={i === 1 ? 1 : 0.25 + rotate * 0.75} heat={heat} />)}
        <g opacity={charge} fontFamily={FONT_MONO} textAnchor="middle">
          <text x={540} y={580} fill={C.muted} fontWeight={700} fontSize={22}>UNEVEN CHARGE → ELECTRIC DIPOLE</text>
        </g>
        <g opacity={rotate} fontFamily={FONT_MONO} fontWeight={700}>
          <path d={Math.sin(t * 2.3) >= 0 ? 'M 160 750 L 160 950 M 160 750 L 140 780 M 160 750 L 180 780' : 'M 160 950 L 160 750 M 160 950 L 140 920 M 160 950 L 180 920'} stroke={C.indigo} strokeWidth={6} fill="none" />
          <text x={160} y={1020} textAnchor="middle" fill={C.indigo} fontSize={20}>CHANGING FIELD</text>
        </g>
        <g opacity={heat} fontFamily={FONT_MONO} textAnchor="middle">
          {[0, 1, 2].map((i) => <circle key={i} cx={590} cy={840} r={130 + i * 65 + heat * 25} fill="none" stroke={C.amber} strokeWidth={4} opacity={0.45 - i * 0.1} />)}
          <text x={540} y={1210} fill={C.amber} fontWeight={700} fontSize={24}>MOLECULAR MOTION SPREADS ENERGY AS HEAT</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="standing" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · HEAT" seconds={55} /><DemoPanel />
      <TitleBlock eyebrow="Move through the uneven field" lines={['Hotter. Cooler.', 'More even.']} accentIndex={2} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <Turntable angle={Math.max(0, t - line(VO, 'standing-turn').start) * 35} rotate={turning} zones heat={0.3} />
        <text x={540} y={1305} textAnchor="middle" fill={C.amber} fontFamily={FONT_MONO} fontWeight={700} fontSize={21} opacity={turning}>FOOD SAMPLES DIFFERENT REGIONS</text>
      </svg>
    </Scene>

    <Scene t={t} id="safety" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · HEAT" seconds={55} dark /><DemoPanel dark />
      <div style={{ opacity: 1 - off }}><TitleBlock dark eyebrow="A crucial safety distinction" lines={['Safe heating.', 'No radioactivity.']} accentIndex={1} size={58} /></div>
      <div style={{ opacity: off }}><TitleBlock dark eyebrow="Switch off the field" lines={['Field gone.', 'Heat remains.']} accentIndex={1} size={64} /></div>
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <g opacity={1 - off}>
          {[0, 1, 2, 3].map((i) => <path key={i} d={`M ${300 + i * 150} 650 Q ${360 + i * 150} 760 ${300 + i * 150} 870`} fill="none" stroke={C.mint} strokeWidth={5} strokeDasharray="12 10" strokeDashoffset={-t * 35} />)}
        </g>
        {[0, 1, 2, 3, 4].map((i) => <Dipole key={i} x={315 + (i % 3) * 220} y={760 + Math.floor(i / 3) * 220} index={i} angle={dipoleAngle} heat={0.5 + safe * 0.5} />)}
        <g opacity={safe} fontFamily={FONT_MONO} textAnchor="middle">
          <rect x={240} y={1100} width={600} height={105} rx={26} fill="rgba(255,255,255,0.07)" stroke={off > 0.4 ? C.amber : C.mint} strokeWidth={3} />
          <text x={540} y={1165} fill={off > 0.4 ? C.amber : C.mint} fontWeight={700} fontSize={23}>{off > 0.4 ? 'FIELD OFF · HEAT REMAINS' : 'NO RADIOACTIVITY ADDED'}</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · HEAT" seconds={55} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="The complete energy conversion" lines={['Field. Motion.', 'Heat.']} accentIndex={2} size={70} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO} textAnchor="middle">
        {[
          ['MICROWAVE FIELD', C.mint], ['MOLECULAR MOTION', C.indigo], ['HEAT IN THE FOOD', C.amber],
        ].map(([label, color], i) => <g key={label} transform={`translate(540 ${700 + i * 210})`}>
          <rect x={-310} y={-70} width={620} height={140} rx={28} fill="rgba(255,255,255,0.06)" stroke={color as string} strokeWidth={3} />
          <text y={12} fill={color as string} fontWeight={700} fontSize={27}>{label}</text>
          {i < 2 && <path d="M 0 80 L 0 120" stroke={C.mint} strokeWidth={5} strokeDasharray="8 8" />}
        </g>)}
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['heat more evenly', 'magnetron', 'microwaves', 'metal walls', 'tiny dipoles', 'rotate back and forth', 'as heat', 'hotter and cooler regions', 'radioactive', 'heat remains']} />
    <CalmSound narration="voiceovers/microwave-heating/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={55} />
  </AbsoluteFill>;
};
export default Short25MicrowaveHeating;
