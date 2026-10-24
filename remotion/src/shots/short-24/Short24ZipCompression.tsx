import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Chip, DemoPanel, Header, Scene, TitleBlock, line } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short24ZipCompression', durationInSeconds: 52, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;
const PHRASE = 'SCIENCE IS FUN |';

const Phrase: React.FC<{ x: number; y: number; opacity?: number; highlight?: number; small?: boolean }> = ({ x, y, opacity = 1, highlight = 0, small = false }) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity} fontFamily={FONT_MONO} textAnchor="middle">
    <rect x={small ? -170 : -235} y={small ? -34 : -43} width={small ? 340 : 470} height={small ? 68 : 86} rx={18} fill={highlight > 0 ? C.mint : C.paper} fillOpacity={0.25 + highlight * 0.55} stroke={highlight > 0 ? C.teal : C.line} strokeWidth={3} />
    <text y={small ? 10 : 12} fill={C.ink} fontWeight={700} fontSize={small ? 25 : 31} letterSpacing={1}>{PHRASE}</text>
  </g>
);

const ReferenceCard: React.FC<{ x: number; y: number; opacity?: number; dark?: boolean; scale?: number }> = ({ x, y, opacity = 1, dark = false, scale = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} fontFamily={FONT_MONO} textAnchor="middle">
    <rect x={-205} y={-58} width={410} height={116} rx={24} fill={dark ? 'rgba(255,255,255,0.07)' : C.ink} stroke={C.teal} strokeWidth={3} />
    <text y={-5} fill={dark ? C.mint : C.mint} fontWeight={700} fontSize={26}>BACK 16 · COPY 16</text>
    <text y={30} fill={C.paper} fontSize={18}>SHORT REFERENCE</text>
  </g>
);

const CodeRow: React.FC<{ x: number; y: number; symbol: string; frequency: number; bits: string; active: number; rare?: boolean }> = ({ x, y, symbol, frequency, bits, active, rare = false }) => (
  <g transform={`translate(${x} ${y})`} fontFamily={FONT_MONO} opacity={0.25 + active * 0.75}>
    <rect x={-230} y={-48} width={460} height={96} rx={22} fill={C.paper} stroke={rare ? C.coral : C.teal} strokeWidth={active > 0.5 ? 4 : 2} />
    <text x={-175} y={12} textAnchor="middle" fill={C.ink} fontWeight={700} fontSize={35}>{symbol}</text>
    <text x={-105} y={-5} fill={C.muted} fontSize={18}>SEEN {frequency}×</text>
    <text x={-105} y={26} fill={rare ? C.coral : C.teal} fontWeight={700} fontSize={22}>{bits} · {bits.length} BITS</text>
    <rect x={90} y={-19} width={rare ? 100 : 35} height={38} rx={10} fill={rare ? C.coral : C.mint} opacity={active} />
  </g>
);

const Short24ZipCompression: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const repeats = prog(t, line(VO, 'hook-phrase').start - 0.1, line(VO, 'hook-phrase').start + 0.8);
  const once = prog(t, line(VO, 'dictionary-once').start - 0.1, line(VO, 'dictionary-once').start + 0.6);
  const reference = prog(t, line(VO, 'dictionary-reference').start - 0.1, line(VO, 'dictionary-reference').start + 0.8);
  const bits = prog(t, line(VO, 'bits-translate').start - 0.1, line(VO, 'bits-translate').start + 0.8);
  const common = prog(t, line(VO, 'bits-common').start - 0.1, line(VO, 'bits-common').start + 0.5);
  const rebuild = prog(t, line(VO, 'unpack-rebuild').start - 0.1, line(VO, 'unpack-rebuild').start + 1.2);
  const exact = prog(t, line(VO, 'unpack-exact').start - 0.1, line(VO, 'unpack-exact').start + 0.4);
  const random = prog(t, line(VO, 'limit-random').start - 0.1, line(VO, 'limit-random').start + 0.6);
  const structure = prog(t, line(VO, 'limit-structure').start - 0.1, line(VO, 'limit-structure').start + 0.5);

  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · DATA" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="A concrete repeated phrase" lines={['Find the', 'repetition']} accentIndex={1} size={68} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        {[0, 1, 2].map((i) => <Phrase key={i} x={540} y={700 + i * 170} highlight={prog(t, line(VO, 'hook-phrase').start + i * 0.25, line(VO, 'hook-phrase').start + i * 0.25 + 0.4)} />)}
        <path d="M 860 660 Q 930 850 860 1040" fill="none" stroke={C.teal} strokeWidth={6} opacity={repeats} />
        <text x={540} y={1220} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={25} opacity={repeats}>THE SAME 16 CHARACTERS, THREE TIMES</text>
      </svg>
    </Scene>

    <Scene t={t} id="dictionary" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · DATA" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="Keep one, reference the rest" lines={['Repeats become', 'references']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <text x={290} y={570} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={21}>ORIGINAL PHRASE</text>
        <Phrase x={290} y={710} small highlight={once} />
        <Phrase x={290 + reference * 390} y={855} small opacity={1 - reference} />
        <Phrase x={290 + reference * 390} y={1000} small opacity={1 - reference} />
        <text x={290} y={625} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={20} opacity={once}>STORE THIS ONCE</text>
        <ReferenceCard x={765} y={855} opacity={reference} />
        <ReferenceCard x={765} y={1000} opacity={reference} />
        <g opacity={reference} stroke={C.teal} strokeWidth={4} strokeDasharray="8 8" fill="none">
          <path d="M 580 835 Q 470 780 390 740" /><path d="M 580 985 Q 470 880 390 745" />
        </g>
        <text x={540} y={1200} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={22} opacity={reference}>LZ77 IDEA: LOOK BACK, COPY A KNOWN PHRASE</text>
      </svg>
    </Scene>

    <Scene t={t} id="bits" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · DATA" seconds={52} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="A second, separate coding step" lines={['Common symbols', 'use fewer bits']} accentIndex={1} size={59} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <CodeRow x={540} y={680} symbol="SPACE" frequency={3} bits="01" active={bits} />
        <CodeRow x={540} y={855} symbol="E" frequency={2} bits="10" active={prog(t, line(VO, 'bits-translate').start + 0.35, line(VO, 'bits-translate').start + 0.95)} />
        <CodeRow x={540} y={1030} symbol="U" frequency={1} bits="11010" active={prog(t, line(VO, 'bits-translate').start + 0.7, line(VO, 'bits-translate').start + 1.3)} rare />
        <text x={540} y={1195} textAnchor="middle" fill={common > 0.4 ? C.mint : C.paper} fontFamily={FONT_MONO} fontWeight={700} fontSize={22}>{common > 0.4 ? 'SHORT CODES FOR COMMON SYMBOLS' : 'SYMBOLS → BIT PATTERNS'}</text>
        <text x={540} y={1240} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontSize={18}>ILLUSTRATIVE HUFFMAN CODE LENGTHS</text>
      </svg>
    </Scene>

    <Scene t={t} id="unpack" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · DATA" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="Reverse the process exactly" lines={['Rebuild every', 'character']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <g opacity={1 - rebuild * 0.55}>
          <Phrase x={250} y={690} small />
          <ReferenceCard x={250} y={855} scale={0.85} /><ReferenceCard x={250} y={1000} scale={0.85} />
        </g>
        <Chip x={540} y={850} scale={0.5} label="READ" />
        <path d="M 410 850 L 455 850 M 625 850 L 670 850" stroke={C.teal} strokeWidth={5} strokeDasharray="8 8" opacity={rebuild} />
        {[0, 1, 2].map((i) => <Phrase key={i} x={825} y={690 + i * 165} small opacity={prog(t, line(VO, 'unpack-rebuild').start + i * 0.4, line(VO, 'unpack-rebuild').start + i * 0.4 + 0.5)} />)}
        <g transform="translate(540 1190)" opacity={exact} fontFamily={FONT_MONO} textAnchor="middle">
          <rect x={-340} y={-55} width={680} height={110} rx={25} fill={C.ink} stroke={C.mint} strokeWidth={3} />
          <text y={12} fill={C.mint} fontWeight={700} fontSize={28}>ORIGINAL = REBUILT ✓</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="limit" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · DATA" seconds={52} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="No useful repetition, little savings" lines={['Compression has', 'a limit']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO} textAnchor="middle">
        <g opacity={Math.min(1, 1 - random * 0.7 + structure * 0.7)}>
          <text x={280} y={610} fill={C.mint} fontSize={21}>REPEATED DATA</text>
          <Phrase x={280} y={730} small /><Phrase x={280} y={850} small />
          <path d="M 280 930 L 280 1010" stroke={C.mint} strokeWidth={5} strokeDasharray="8 8" />
          <ReferenceCard x={280} y={1110} />
          <text x={280} y={1230} fill={C.mint} fontWeight={700} fontSize={20} opacity={structure}>USEFUL STRUCTURE → SAVINGS</text>
        </g>
        <g opacity={0.2 + random * 0.8 - structure * 0.25}>
          <text x={790} y={610} fill={C.coral} fontSize={21}>ALREADY-COMPRESSED DATA</text>
          {['7F 2A 91 0C', 'D4 88 1B F0', '63 C9 02 AD'].map((text, i) => <g key={text} transform={`translate(790 ${740 + i * 140})`}>
            <rect x={-190} y={-45} width={380} height={90} rx={20} fill="rgba(255,255,255,0.07)" stroke={C.coral} strokeWidth={2} />
            <text y={10} fill={C.paper} fontWeight={700} fontSize={26}>{text}</text>
          </g>)}
          <text x={790} y={1170} fill={C.coral} fontWeight={700} fontSize={22} opacity={structure}>LITTLE OR NO SAVINGS</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · DATA" seconds={52} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Efficient, not destructive" lines={['Same information.', 'Better representation.']} accentIndex={1} size={56} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO} textAnchor="middle">
        <text x={540} y={630} fill={C.paper} fontSize={23}>REPEATS + SYMBOL FREQUENCIES</text>
        <path d="M 540 690 L 540 770" stroke={C.mint} strokeWidth={6} strokeDasharray="8 8" />
        <rect x={190} y={820} width={700} height={150} rx={30} fill="rgba(255,255,255,0.07)" stroke={C.mint} strokeWidth={3} />
        <text x={540} y={885} fill={C.mint} fontWeight={700} fontSize={26}>REFERENCES + EFFICIENT BITS</text>
        <text x={540} y={930} fill={C.paper} fontSize={21}>EXACTLY REVERSIBLE</text>
        <text x={540} y={1110} fill={C.paper} fontWeight={700} fontSize={31}>NOT DELETING INFORMATION</text>
        <text x={540} y={1180} fill={C.mint} fontSize={24}>WRITING IT MORE EFFICIENTLY</text>
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['three times', 'store a phrase once', 'short references', 'bits', 'shorter bit patterns', 'every original character', 'Nothing is lost', 'useful structure']} />
    <CalmSound narration="voiceovers/zip-compression/narration.wav" music="cinematic-min" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={52} />
  </AbsoluteFill>;
};
export default Short24ZipCompression;
