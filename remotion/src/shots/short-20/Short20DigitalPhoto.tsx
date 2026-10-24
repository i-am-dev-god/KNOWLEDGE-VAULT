import React from 'react';
import { AbsoluteFill, staticFile, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Callout, DemoPanel, Header, Scene, TitleBlock, line, spoken } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short20DigitalPhoto', durationInSeconds: 50, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;
const COLORS = { R: '#e66767', G: '#55b987', B: '#5b8cff' };
const MOSAIC = [
  ['G', 'R', 'G'], ['B', 'G', 'R'], ['G', 'B', 'G'],
] as const;
const VALUES = [[0.45, 0.62, 0.50], [0.38, 0.85, 0.58], [0.42, 0.41, 0.48]];

const Mosaic: React.FC<{ x: number; y: number; cell?: number; focusNeighbors?: boolean; values?: boolean }> = ({ x, y, cell = 150, focusNeighbors = false, values = false }) => (
  <g transform={`translate(${x} ${y})`}>
    {MOSAIC.flatMap((row, ri) => row.map((color, ci) => {
      const center = ri === 1 && ci === 1;
      const otherGreen = color === 'G' && !center;
      const opacity = focusNeighbors && otherGreen ? 0.18 : 1;
      return <g key={`${ri}-${ci}`} opacity={opacity}>
        <rect x={ci * cell} y={ri * cell} width={cell - 8} height={cell - 8} rx={12} fill={COLORS[color]} stroke={center ? C.ink : C.paper} strokeWidth={center ? 7 : 3} />
        <text x={ci * cell + (cell - 8) / 2} y={ri * cell + cell * 0.43} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontWeight={700} fontSize={cell * 0.25}>{color}</text>
        {values && <text x={ci * cell + (cell - 8) / 2} y={ri * cell + cell * 0.68} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontWeight={700} fontSize={cell * 0.20}>{VALUES[ri][ci].toFixed(2)}</text>}
      </g>;
    }))}
  </g>
);

const PhotoLandscape: React.FC<{ x: number; y: number; scale?: number; noise?: number }> = ({ x, y, scale = 1, noise = 0 }) => {
  const clipId = `photo-crop-${scale}`;
  return <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <defs><clipPath id={clipId}><rect x={-300} y={-205} width={600} height={410} rx={35} /></clipPath></defs>
    <rect x={-300} y={-205} width={600} height={410} rx={35} fill="#dcecf4" />
    <image href={staticFile('assets/digital-photo-landscape.png')} x={-300} y={-205} width={600} height={410} preserveAspectRatio="xMidYMid slice" clipPath={`url(#${clipId})`} />
    {noise > 0 && <g clipPath={`url(#${clipId})`} opacity={noise}>
      {Array.from({ length: 80 }, (_, i) => {
        const nx = ((i * 83) % 590) - 295;
        const ny = ((i * 137) % 400) - 200;
        const size = 5 + (i % 4) * 3;
        return <rect key={i} x={nx} y={ny} width={size} height={size} fill={i % 2 ? C.paper : C.ink} opacity={0.45 + (i % 3) * 0.15} />;
      })}
    </g>}
    <rect x={-300} y={-205} width={600} height={410} rx={35} fill="none" stroke={C.line} strokeWidth={4} />
  </g>;
};

const Short20DigitalPhoto: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const signal = prog(t, line(VO, 'photosite-signal').start - 0.1, line(VO, 'photosite-signal').start + 0.6);
  const more = spoken(t, VO, 'photosite-more');
  const intensity = 0.35 + more * 0.50;
  const filter = prog(t, line(VO, 'filter-green').start - 0.1, line(VO, 'filter-green').start + 0.5);
  const greenValue = prog(t, line(VO, 'filter-value').start - 0.1, line(VO, 'filter-value').start + 0.5);
  const neighbors = prog(t, line(VO, 'neighbors-rgb').start - 0.1, line(VO, 'neighbors-rgb').start + 0.6);
  const estimated = prog(t, line(VO, 'demosaic-estimate').start - 0.1, line(VO, 'demosaic-estimate').start + 0.8);
  const named = prog(t, line(VO, 'demosaic-name').start - 0.1, line(VO, 'demosaic-name').start + 0.4);
  const onePixel = prog(t, line(VO, 'pixel-rgb').start - 0.1, line(VO, 'pixel-rgb').start + 0.5);
  const repeated = prog(t, line(VO, 'pixel-repeat').start - 0.1, line(VO, 'pixel-repeat').start + 0.7);

  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="photosite" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · CAMERA" seconds={50} /><DemoPanel />
      <TitleBlock eyebrow="One site, one measurement" lines={['Follow one', 'photosite']} accentIndex={1} size={66} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        {[-100, 0, 100].map((dx, i) => <line key={i} x1={540 + dx} y1={565} x2={540 + dx * 0.45} y2={735} stroke={C.amber} strokeWidth={5 + intensity * 7} strokeLinecap="round" opacity={0.35 + intensity * 0.65} />)}
        <rect x={400} y={735} width={280} height={280} rx={35} fill={C.ink} />
        <rect x={435} y={770} width={210} height={210} rx={25} fill={C.indigo} opacity={0.35 + signal * 0.45} />
        <path d="M 700 875 L 765 875" stroke={C.teal} strokeWidth={6} strokeDasharray="8 9" opacity={signal} />
        <rect x={795} y={650} width={70} height={400} rx={20} fill={C.pale} />
        <rect x={795} y={1050 - intensity * 400} width={70} height={intensity * 400} rx={20} fill={C.teal} opacity={signal} />
        <text x={830} y={1120} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={30}>{intensity.toFixed(2)}</text>
        <text x={830} y={1160} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={20}>SIGNAL</text>
        <text x={540} y={1235} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={23}>MORE LIGHT → LARGER ELECTRICAL SIGNAL</text>
      </svg>
    </Scene>

    <Scene t={t} id="filter" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · CAMERA" seconds={50} /><DemoPanel />
      <TitleBlock eyebrow={filter > 0.05 ? 'Keep the same photosite' : 'One number, not color'} lines={filter > 0.05 ? ['Add a', 'color filter'] : ['Only', 'brightness']} accentIndex={1} size={66} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        {[['R', 460], ['G', 540], ['B', 620]].map(([color, x]) => <g key={String(color)}>
          <line x1={Number(x)} y1={555} x2={Number(x)} y2={690} stroke={COLORS[color as 'R' | 'G' | 'B']} strokeWidth={12} strokeLinecap="round" opacity={filter} />
          <line x1={Number(x)} y1={745} x2={Number(x)} y2={825} stroke={COLORS[color as 'R' | 'G' | 'B']} strokeWidth={12} strokeLinecap="round" opacity={color === 'G' ? filter : filter * 0.08} />
        </g>)}
        <rect x={400} y={690} width={280} height={55} rx={14} fill={COLORS.G} opacity={filter} stroke={C.ink} strokeWidth={3} />
        <rect x={400} y={825} width={280} height={245} rx={35} fill={C.ink} />
        <rect x={435} y={860} width={210} height={175} rx={25} fill={C.indigo} opacity={0.35} />
        <rect x={435} y={860} width={210} height={175} rx={25} fill={COLORS.G} opacity={greenValue * 0.65} />
        <Callout x={820} y={650} targetX={680} targetY={715} text="GREEN FILTER" color={C.teal} opacity={filter} />
        <g transform="translate(540 1170)" opacity={1 - filter}>
          <rect x={-310} y={-65} width={620} height={130} rx={26} fill={C.ink} />
          <text x={0} y={12} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontWeight={700} fontSize={30}>BRIGHTNESS = 0.85</text>
        </g>
        <g transform="translate(540 1170)" opacity={greenValue}>
          <rect x={-310} y={-65} width={620} height={130} rx={26} fill={C.ink} />
          <text x={0} y={12} textAnchor="middle" fill={C.mint} fontFamily={FONT_MONO} fontWeight={700} fontSize={30}>GREEN BRIGHTNESS = 0.85</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="neighbors" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · CAMERA" seconds={50} /><DemoPanel />
      <TitleBlock eyebrow="Zoom out just enough to see neighbors" lines={['Measure neighboring', 'colors']} accentIndex={1} size={59} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <Mosaic x={315} y={625} cell={150} focusNeighbors={neighbors > 0} values={neighbors > 0.15} />
        <text x={540} y={1215} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={23}>CENTER: GREEN · NEIGHBORS: RED + BLUE</text>
        <text x={540} y={1255} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={20}>EACH SITE STILL HAS ONLY ONE MEASUREMENT</text>
      </svg>
    </Scene>

    <Scene t={t} id="demosaic" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · CAMERA" seconds={50} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Use neighbors to estimate what is missing" lines={['Estimate', 'missing colors']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <Mosaic x={135} y={700} cell={105} focusNeighbors values />
        <path d="M 465 855 L 570 855" stroke={C.mint} strokeWidth={6} strokeDasharray="9 10" opacity={estimated} />
        <g transform="translate(750 855)">
          <rect x={-180} y={-235} width={360} height={470} rx={30} fill="rgba(255,255,255,0.07)" stroke={named > 0 ? C.mint : C.indigo} strokeWidth={4} />
          <text x={0} y={-185} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontWeight={700} fontSize={22}>CENTER SITE</text>
          <text x={0} y={-95} textAnchor="middle" fill={COLORS.G} fontFamily={FONT_MONO} fontWeight={700} fontSize={34}>G = 0.85</text>
          <text x={0} y={0} textAnchor="middle" fill={COLORS.R} fontFamily={FONT_MONO} fontWeight={700} fontSize={34}>R = {estimated > 0.35 ? '0.58' : '?'}</text>
          <text x={0} y={95} textAnchor="middle" fill={COLORS.B} fontFamily={FONT_MONO} fontWeight={700} fontSize={34}>B = {estimated > 0.70 ? '0.40' : '?'}</text>
          <text x={0} y={180} textAnchor="middle" fill={C.mint} fontFamily={FONT_MONO} fontSize={19} opacity={named}>DEMOSAICING</text>
        </g>
        <text x={540} y={1235} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontSize={22} opacity={named}>ESTIMATE MISSING VALUES FROM NEIGHBORS</text>
      </svg>
    </Scene>

    <Scene t={t} id="pixel" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · CAMERA" seconds={50} /><DemoPanel />
      <TitleBlock eyebrow="Three values become one pixel" lines={['Build one', 'colored pixel']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <g transform={`translate(${540 - repeated * 250} 800)`} opacity={1 - repeated * 0.25}>
          <rect x={-125} y={-125} width={250} height={250} rx={25} fill="#94d966" stroke={C.ink} strokeWidth={6} opacity={onePixel} />
          <text x={0} y={190} textAnchor="middle" fill={C.ink} fontFamily={FONT_MONO} fontWeight={700} fontSize={23}>R 0.58 · G 0.85 · B 0.40</text>
        </g>
        <g opacity={repeated}>
          <path d="M 450 800 L 540 800" stroke={C.teal} strokeWidth={6} strokeDasharray="9 10" />
          <PhotoLandscape x={760} y={800} scale={0.48} noise={1 - repeated} />
          <text x={700} y={1110} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={22}>REPEAT → REDUCE NOISE → ADJUST</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · CAMERA" seconds={50} /><DemoPanel />
      <TitleBlock eyebrow="The same process across the sensor" lines={['Repeat millions', 'of times']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <PhotoLandscape x={540} y={850} scale={1.15} />
        <text x={540} y={1215} textAnchor="middle" fill={C.ink} fontFamily={FONT_MONO} fontWeight={700} fontSize={25}>TINY MEASUREMENTS → COLORED PIXELS → PHOTOGRAPH</text>
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['one photosite', 'electrical signal', 'brightness measurement', 'green brightness', 'red or blue', 'missing color values', 'demosaicing', 'one colored pixel']} />
    <CalmSound narration="voiceovers/digital-photo/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={50} />
  </AbsoluteFill>;
};
export default Short20DigitalPhoto;
