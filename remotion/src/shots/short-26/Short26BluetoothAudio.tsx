import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Chip, DemoPanel, Header, PhoneFrame, Scene, TitleBlock, line, wavePath } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short26BluetoothAudio', durationInSeconds: 52, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;

const Headphones: React.FC<{ x: number; y: number; scale?: number; active?: number; time?: number }> = ({ x, y, scale = 1, active = 0, time = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M -115 10 Q -105 -150 0 -155 Q 105 -150 115 10" fill="none" stroke={C.ink} strokeWidth={28} strokeLinecap="round" />
    <rect x={-150} y={-10} width={72} height={150} rx={32} fill={C.indigo} stroke={C.ink} strokeWidth={5} />
    <rect x={78} y={-10} width={72} height={150} rx={32} fill={C.indigo} stroke={C.ink} strokeWidth={5} />
    <path d="M 92 65 Q 35 65 35 65" fill="none" stroke={C.mint} strokeWidth={7} opacity={active} />
    <path d={wavePath(42, 65, 65, 13, 1.4, time * 3)} fill="none" stroke={C.mint} strokeWidth={5} opacity={active} />
    <text x={0} y={195} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontWeight={700} fontSize={21}>HEADPHONES</text>
  </g>
);

const Packet: React.FC<{ x: number; y: number; scale?: number; opacity?: number; checked?: boolean; index?: number }> = ({ x, y, scale = 1, opacity = 1, checked = false, index = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} fontFamily={FONT_MONO}>
    <rect x={-250} y={-42} width={500} height={84} rx={18} fill={C.paper} stroke={checked ? C.teal : C.line} strokeWidth={3} />
    <rect x={-238} y={-30} width={105} height={60} rx={11} fill={C.coral} opacity={0.8} />
    <text x={-185} y={7} textAnchor="middle" fill={C.paper} fontWeight={700} fontSize={18}>CTRL</text>
    {Array.from({ length: 5 }, (_, i) => <rect key={i} x={-115 + i * 61} y={-24 + (i % 2) * 7} width={45} height={48 - (i % 2) * 14} rx={8} fill={i % 2 ? C.indigo : C.teal} opacity={0.75} />)}
    <text x={185} y={7} textAnchor="middle" fill={C.ink} fontWeight={700} fontSize={17}>{checked ? '✓' : `0${index + 1}`}</text>
  </g>
);

const Short26BluetoothAudio: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const travel = prog(t, line(VO, 'hook-travel').start - 0.1, line(VO, 'hook-travel').start + 0.7);
  const samples = prog(t, line(VO, 'encode-samples').start - 0.1, line(VO, 'encode-samples').start + 0.7);
  const compress = prog(t, line(VO, 'encode-compress').start - 0.1, line(VO, 'encode-compress').start + 0.8);
  const chop = prog(t, line(VO, 'packets-chop').start - 0.1, line(VO, 'packets-chop').start + 0.8);
  const control = prog(t, line(VO, 'packets-control').start - 0.1, line(VO, 'packets-control').start + 0.5);
  const radio = prog(t, line(VO, 'radio-pair').start - 0.1, line(VO, 'radio-pair').start + 0.6);
  const hop = prog(t, line(VO, 'radio-hop').start - 0.1, line(VO, 'radio-hop').start + 0.6);
  const check = prog(t, line(VO, 'receive-check').start - 0.1, line(VO, 'receive-check').start + 0.8);
  const decode = prog(t, line(VO, 'receive-decode').start - 0.1, line(VO, 'receive-decode').start + 0.8);
  const hopTime = Math.max(0, t - line(VO, 'radio-pair').start) * 1.15;
  const hopIndex = Math.floor(hopTime) % 3;
  const hopPhase = hopTime - Math.floor(hopTime);
  const hopY = 710 + hopIndex * 155;

  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · BLUETOOTH" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="Music without a cable" lines={['Phone to', 'headphones']} accentIndex={1} size={65} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <PhoneFrame x={290} y={875} scale={0.65}>
          <circle cx={0} cy={-40} r={65} fill={C.indigo} /><path d="M -15 -75 L 35 -40 L -15 -5 Z" fill={C.paper} />
          <path d={wavePath(-110, 125, 220, 22, 2, t * 2)} fill="none" stroke={C.teal} strokeWidth={6} />
        </PhoneFrame>
        <Headphones x={790} y={850} scale={0.85} active={travel} time={t} />
        <g opacity={travel} fill="none" stroke={C.teal} strokeWidth={6} strokeDasharray="10 10" strokeDashoffset={-t * 35}>
          <path d="M 450 810 Q 555 700 660 810" /><path d="M 460 900 Q 555 810 650 900" opacity={0.6} />
        </g>
        <text x={550} y={1190} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={22} opacity={travel}>DIGITAL AUDIO OVER SHORT-RANGE RADIO</text>
      </svg>
    </Scene>

    <Scene t={t} id="encode" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · BLUETOOTH" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="Prepare the audio" lines={['Samples first.', 'Then compression.']} accentIndex={1} size={61} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <text x={315} y={600} textAnchor="middle" fill={C.muted} fontFamily={FONT_MONO} fontWeight={700} fontSize={21}>DIGITAL AUDIO SAMPLES</text>
        <rect x={105} y={650} width={420} height={350} rx={28} fill={C.paper} stroke={C.line} strokeWidth={3} />
        <path d={wavePath(140, 820, 350, 90, 2, 0)} fill="none" stroke={C.indigo} strokeWidth={5} />
        {Array.from({ length: 12 }, (_, i) => {
          const x = 150 + i * 30;
          const p = (x - 140) / 350;
          const envelope = Math.sin(Math.PI * Math.min(1, p * 1.06)) ** 0.35;
          const y = 820 - Math.sin(p * Math.PI * 4) * 90 * envelope;
          return <g key={i} opacity={samples}><line x1={x} y1={690} x2={x} y2={950} stroke={C.muted} strokeWidth={2} opacity={0.35} /><circle cx={x} cy={y} r={7} fill={C.coral} /></g>;
        })}
        <path d="M 545 825 L 630 825" stroke={C.teal} strokeWidth={6} strokeDasharray="8 8" opacity={compress} />
        <g opacity={compress} fontFamily={FONT_MONO}>
          <text x={790} y={600} textAnchor="middle" fill={C.teal} fontWeight={700} fontSize={21}>COMPRESSED STREAM</text>
          {Array.from({ length: 5 }, (_, i) => <rect key={i} x={685} y={680 + i * 70} width={210 - (i % 3) * 30} height={44} rx={10} fill={i % 2 ? C.indigo : C.teal} opacity={0.75} />)}
          <text x={790} y={1090} textAnchor="middle" fill={C.muted} fontSize={20}>FEWER BITS TO TRANSMIT</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="packets" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · BLUETOOTH" seconds={52} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="A stream becomes manageable units" lines={['Audio inside', 'packets']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        {Array.from({ length: 4 }, (_, i) => <Packet key={i} x={540} y={650 + i * 145} index={i} opacity={prog(t, line(VO, 'packets-chop').start + i * 0.18, line(VO, 'packets-chop').start + i * 0.18 + 0.5)} />)}
        <g opacity={control} fontFamily={FONT_MONO} fontWeight={700} fontSize={21}>
          <text x={245} y={1240} fill={C.coral}>CONTROL</text><text x={725} y={1240} fill={C.mint}>AUDIO DATA</text>
          <path d="M 330 1225 L 350 1170 M 700 1225 L 680 1170" stroke={C.muted} strokeWidth={3} strokeDasharray="6 7" />
        </g>
        <text x={540} y={570} textAnchor="middle" fill={C.paper} fontFamily={FONT_MONO} fontSize={21} opacity={chop}>SMALL PACKETS, ONE AFTER ANOTHER</text>
      </svg>
    </Scene>

    <Scene t={t} id="radio" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · BLUETOOTH" seconds={52} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Both devices follow the same pattern" lines={['Coordinated', 'frequency hops']} accentIndex={1} size={63} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <text x={230} y={590} textAnchor="middle" fill={C.paper} fontWeight={700} fontSize={21}>PHONE</text>
        <text x={850} y={590} textAnchor="middle" fill={C.paper} fontWeight={700} fontSize={21}>HEADPHONES</text>
        {[0, 1, 2].map((i) => <g key={i} opacity={0.2 + hop * 0.8}>
          <rect x={150} y={650 + i * 155} width={780} height={120} rx={25} fill={hopIndex === i ? 'rgba(120,205,189,0.12)' : 'rgba(255,255,255,0.025)'} stroke={hopIndex === i ? C.mint : C.muted} strokeWidth={hopIndex === i ? 3 : 1} />
          <text x={200} y={720 + i * 155} fill={hopIndex === i ? C.mint : C.muted} fontWeight={700} fontSize={19}>CH {i + 1}</text>
          <text x={850} y={720 + i * 155} textAnchor="middle" fill={hopIndex === i ? C.mint : C.muted} fontWeight={700} fontSize={18}>{hopIndex === i ? 'LINKED' : 'WAIT'}</text>
        </g>)}
        <g opacity={radio * Math.sin(hopPhase * Math.PI)}>
          <Packet x={365 + hopPhase * 350} y={hopY} scale={0.38} index={hopIndex} />
        </g>
        <text x={540} y={1190} textAnchor="middle" fill={C.mint} fontWeight={700} fontSize={22} opacity={hop}>SAME HOP PATTERN · LESS INTERFERENCE</text>
      </svg>
    </Scene>

    <Scene t={t} id="receive" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · BLUETOOTH" seconds={52} /><DemoPanel />
      <TitleBlock eyebrow="Rebuild the audio stream" lines={['Check. Decode.', 'Play.']} accentIndex={2} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        {[0, 1, 2].map((i) => <Packet key={i} x={250} y={690 + i * 135} scale={0.48} index={i} checked={check > 0.6} opacity={1 - decode * 0.55} />)}
        <Chip x={535} y={820} scale={0.55} label="DEC" opacity={decode} />
        <path d="M 390 820 L 450 820 M 620 820 L 680 820" stroke={C.teal} strokeWidth={5} strokeDasharray="8 8" opacity={decode} />
        <Headphones x={825} y={820} scale={0.58} active={decode} time={t} />
        <path d={wavePath(670, 1110, 310, 38, 2, t * 3)} fill="none" stroke={C.teal} strokeWidth={6} opacity={decode} />
        <text x={540} y={1230} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={22} opacity={decode}>PACKETS → DECODER → CONVERTER → DRIVER</text>
      </svg>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · BLUETOOTH" seconds={52} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="The complete round trip" lines={['Samples. Packets.', 'Music again.']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO} textAnchor="middle">
        {[['DIGITAL SAMPLES', C.indigo], ['RADIO PACKETS', C.coral], ['DECODE + CONVERT', C.teal], ['MUSIC + DRIVER', C.mint]].map(([label, color], i) => <g key={label} transform={`translate(540 ${620 + i * 165})`}>
          <rect x={-290} y={-57} width={580} height={114} rx={25} fill="rgba(255,255,255,0.06)" stroke={color as string} strokeWidth={3} />
          <text y={10} fill={color as string} fontWeight={700} fontSize={25}>{label}</text>
          {i < 3 && <path d="M 0 65 L 0 100" stroke={C.mint} strokeWidth={4} strokeDasharray="7 7" />}
        </g>)}
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['without a cable', 'digital audio samples', 'compresses', 'small packets', 'control information', 'short-range radio', 'change frequencies', 'arrived correctly', 'decode the audio stream']} />
    <CalmSound narration="voiceovers/bluetooth-audio/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={52} />
  </AbsoluteFill>;
};
export default Short26BluetoothAudio;
