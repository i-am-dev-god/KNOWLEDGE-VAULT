import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { FONT_MONO } from '../../fonts';
import { Background, C, CalmCaptions, CalmSound, Chip, DemoPanel, Header, Scene, TitleBlock, line, wavePath } from '../../lib/next-calm';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short30WifiData', durationInSeconds: 55, fps: 30, width: 1080, height: 1920 };
const W = 1080;
const H = 1920;

const Photo: React.FC<{ x: number; y: number; scale?: number; opacity?: number }> = ({ x, y, scale = 1, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
    <rect x={-180} y={-125} width={360} height={250} rx={25} fill="#dceaff" stroke={C.ink} strokeWidth={5} />
    <circle cx={95} cy={-65} r={30} fill={C.amber} />
    <path d="M -180 65 L -65 -45 L 15 25 L 85 -35 L 180 60 L 180 125 L -180 125 Z" fill={C.indigo} opacity={0.8} />
    <path d="M -180 90 L -80 25 L 0 85 L 95 15 L 180 85 L 180 125 L -180 125 Z" fill={C.teal} opacity={0.85} />
  </g>
);

const Router: React.FC<{ x: number; y: number; active?: number }> = ({ x, y, active = 1 }) => (
  <g transform={`translate(${x} ${y})`} fontFamily={FONT_MONO}>
    <path d="M -85 -45 L -115 -160 M 85 -45 L 115 -160" stroke={C.ink} strokeWidth={12} strokeLinecap="round" />
    <rect x={-150} y={-55} width={300} height={110} rx={35} fill={C.paper} stroke={C.ink} strokeWidth={6} />
    <circle cx={80} cy={0} r={12} fill={C.mint} opacity={0.25 + active * 0.75} />
    <text x={-20} y={9} textAnchor="middle" fill={C.ink} fontWeight={700} fontSize={22}>Wi-Fi</text>
    {[0, 1, 2].map((i) => <path key={i} d={`M ${-65 - i * 28} ${-105 - i * 30} Q 0 ${-190 - i * 30} ${65 + i * 28} ${-105 - i * 30}`} fill="none" stroke={C.teal} strokeWidth={5} opacity={active * (0.8 - i * 0.18)} />)}
  </g>
);

const WifiPacket: React.FC<{ x: number; y: number; scale?: number; opacity?: number; bad?: boolean; label?: string }> = ({ x, y, scale = 1, opacity = 1, bad = false, label }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} fontFamily={FONT_MONO}>
    <rect x={-190} y={-55} width={380} height={110} rx={22} fill={C.paper} stroke={bad ? C.coral : C.teal} strokeWidth={4} />
    <rect x={-175} y={-40} width={90} height={80} rx={12} fill={bad ? C.coral : C.indigo} />
    <text x={-130} y={5} textAnchor="middle" fill={C.paper} fontWeight={700} fontSize={16}>{bad ? 'ERROR' : 'ADDR'}</text>
    {Array.from({ length: 4 }, (_, i) => <rect key={i} x={-65 + i * 55} y={-27 + (i % 2) * 8} width={40} height={54 - (i % 2) * 16} rx={7} fill={C.teal} opacity={0.75} />)}
    <text x={155} y={7} textAnchor="middle" fill={bad ? C.coral : C.ink} fontWeight={700} fontSize={16}>{label || 'CHECK'}</text>
  </g>
);

const Short30WifiData: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const invisible = prog(t, line(VO, 'hook-invisible').start - 0.1, line(VO, 'hook-invisible').start + 0.7);
  const chop = prog(t, line(VO, 'prepare-chop').start - 0.1, line(VO, 'prepare-chop').start + 0.8);
  const protect = prog(t, line(VO, 'prepare-check').start - 0.1, line(VO, 'prepare-check').start + 0.6);
  const bits = prog(t, line(VO, 'modulate-bits').start - 0.1, line(VO, 'modulate-bits').start + 0.7);
  const ofdm = prog(t, line(VO, 'modulate-ofdm').start - 0.1, line(VO, 'modulate-ofdm').start + 0.9);
  const share = prog(t, line(VO, 'air-share').start - 0.1, line(VO, 'air-share').start + 0.6);
  const listen = prog(t, line(VO, 'air-listen').start - 0.1, line(VO, 'air-listen').start + 0.6);
  const check = prog(t, line(VO, 'receive-check').start - 0.1, line(VO, 'receive-check').start + 0.8);
  const rebuild = prog(t, line(VO, 'receive-rebuild').start - 0.1, line(VO, 'receive-rebuild').start + 0.9);
  const listenElapsed = Math.max(0, t - line(VO, 'air-listen').start);
  const channelBusy = listenElapsed < 1.8;

  return <AbsoluteFill style={{ background: C.bg }}>
    <Scene t={t} id="hook" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · Wi-Fi" seconds={55} /><DemoPanel />
      <TitleBlock eyebrow="A photo becomes a radio transmission" lines={['Send a photo', 'through air']} accentIndex={1} size={64} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <Photo x={250} y={850} scale={0.72} />
        <Router x={785} y={890} active={invisible} />
        <g opacity={invisible} fill="none" stroke={C.teal} strokeWidth={6} strokeDasharray="10 10" strokeDashoffset={-t * 35}>
          <path d="M 430 800 Q 565 690 680 800" /><path d="M 440 900 Q 565 805 670 900" opacity={0.6} />
        </g>
        <text x={540} y={1190} textAnchor="middle" fill={C.teal} fontFamily={FONT_MONO} fontWeight={700} fontSize={22} opacity={invisible}>DATA AS RADIO SIGNALS</text>
      </svg>
    </Scene>

    <Scene t={t} id="prepare" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · Wi-Fi" seconds={55} /><DemoPanel />
      <TitleBlock eyebrow="Divide and protect the file" lines={['Photo becomes', 'checked packets']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <Photo x={250} y={800} scale={0.55} opacity={1 - chop * 0.6} />
        <path d="M 420 800 L 505 800" stroke={C.teal} strokeWidth={5} strokeDasharray="8 8" opacity={chop} />
        {[0, 1, 2].map((i) => <WifiPacket key={i} x={735} y={665 + i * 185} scale={0.72} opacity={prog(t, line(VO, 'prepare-chop').start + i * 0.2, line(VO, 'prepare-chop').start + i * 0.2 + 0.5)} label="CRC" />)}
        <g opacity={protect} fontFamily={FONT_MONO} fontWeight={700} fontSize={20}>
          <text x={250} y={1120} textAnchor="middle" fill={C.indigo}>ADDRESS: WHERE?</text>
          <text x={750} y={1190} textAnchor="middle" fill={C.teal}>CHECK: DID IT ARRIVE INTACT?</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="modulate" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · Wi-Fi" seconds={55} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Map data onto radio waves" lines={['Bits onto', 'subcarriers']} accentIndex={1} size={66} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        <g opacity={bits * (1 - ofdm * 0.7)}>
          <text x={540} y={590} textAnchor="middle" fill={C.paper} fontWeight={700} fontSize={23}>00 · 01 · 10 · 11 → CARRIER STATES</text>
          <path d={wavePath(150, 790, 780, 115, 3, t * 2)} fill="none" stroke={C.mint} strokeWidth={7} />
          {['00', '01', '10', '11'].map((label, i) => <text key={label} x={250 + i * 195} y={1040} textAnchor="middle" fill={i % 2 ? C.coral : C.mint} fontWeight={700} fontSize={23}>{label}</text>)}
          <text x={540} y={1140} textAnchor="middle" fill={C.muted} fontSize={20}>PHASE + AMPLITUDE CARRY BIT GROUPS</text>
        </g>
        <g opacity={ofdm}>
          {[0, 1, 2, 3].map((i) => <g key={i}>
            <rect x={130} y={620 + i * 145} width={820} height={115} rx={22} fill="rgba(255,255,255,0.045)" stroke={i % 2 ? C.indigo : C.mint} strokeWidth={2} />
            <text x={180} y={690 + i * 145} fill={i % 2 ? C.coral : C.mint} fontWeight={700} fontSize={18}>SC {i + 1}</text>
            <path d={wavePath(280, 680 + i * 145, 590, 32 + i * 6, 1.5 + i * 0.5, t * (2 + i * 0.3))} fill="none" stroke={i % 2 ? C.coral : C.mint} strokeWidth={5} />
          </g>)}
          <text x={540} y={1240} textAnchor="middle" fill={C.mint} fontWeight={700} fontSize={22}>OFDM: MANY ORTHOGONAL SUBCARRIERS</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="air" scenes={SCENES}>
      <Background t={t} /><Header label="TECH EXPLAINED · Wi-Fi" seconds={55} /><DemoPanel />
      <TitleBlock eyebrow="A shared radio channel" lines={['Listen first.', 'Then transmit.']} accentIndex={1} size={65} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO}>
        {[250, 540, 830].map((x, i) => <g key={x} opacity={0.3 + share * 0.7}>
          <rect x={x - 80} y={650} width={160} height={120} rx={25} fill={C.paper} stroke={i === 1 ? C.teal : C.muted} strokeWidth={4} />
          <text x={x} y={720} textAnchor="middle" fill={C.ink} fontWeight={700} fontSize={20}>{['DEVICE A', 'SENDER', 'DEVICE B'][i]}</text>
        </g>)}
        <rect x={150} y={870} width={780} height={170} rx={28} fill={C.pale} stroke={C.line} strokeWidth={3} />
        <text x={190} y={915} fill={C.muted} fontWeight={700} fontSize={19}>SHARED CHANNEL</text>
        <rect x={200} y={950} width={listen > 0.2 && !channelBusy ? 260 : 520} height={55} rx={14} fill={listen > 0.2 && channelBusy ? C.coral : C.mint} opacity={0.25 + listen * 0.75} />
        <text x={540} y={1110} textAnchor="middle" fill={listen > 0.2 ? (channelBusy ? C.coral : C.teal) : C.muted} fontWeight={700} fontSize={23}>
          {listen <= 0.2 ? 'OTHER DEVICES SHARE THE CHANNEL' : channelBusy ? 'BUSY → WAIT' : 'CLEAR → SEND'}
        </text>
        {!channelBusy && <WifiPacket x={300 + (listenElapsed - 1.8) * 180} y={980} scale={0.35} label="DATA" />}
        <text x={540} y={1210} textAnchor="middle" fill={C.teal} fontWeight={700} fontSize={21} opacity={listen}>LISTENING HELPS AVOID COLLISIONS</text>
      </svg>
    </Scene>

    <Scene t={t} id="receive" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · Wi-Fi" seconds={55} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Recover before rebuilding" lines={['Check. Retry.', 'Rebuild.']} accentIndex={2} size={66} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }}>
        <g opacity={1 - rebuild * 0.75}>
          {[0, 1, 2].map((i) => <WifiPacket key={i} x={275} y={675 + i * 155} scale={0.55} bad={i === 1 && check > 0.25} label={i === 1 && check > 0.25 ? 'RETRY' : 'OK'} />)}
          <Chip x={650} y={820} scale={0.55} label="RX" opacity={check} />
          <path d="M 520 830 Q 440 1060 285 960" fill="none" stroke={C.coral} strokeWidth={5} strokeDasharray="8 8" opacity={check} />
          <WifiPacket x={650 - prog(check, 0.55, 1) * 375} y={830} scale={0.55} label="RESENT" opacity={prog(check, 0.55, 0.8)} />
          <text x={720} y={1100} textAnchor="middle" fill={C.coral} fontFamily={FONT_MONO} fontWeight={700} fontSize={21} opacity={check}>BAD PACKET → REQUEST AGAIN</text>
        </g>
        <g opacity={rebuild}>
          <Photo x={740} y={830} scale={0.65} />
          {Array.from({ length: 4 }, (_, i) => <rect key={i} x={623 + (i % 2) * 117} y={749 + Math.floor(i / 2) * 81} width={117} height={81} fill="none" stroke={C.mint} strokeWidth={2} opacity={prog(t, line(VO, 'receive-rebuild').start + i * 0.2, line(VO, 'receive-rebuild').start + i * 0.2 + 0.5)} />)}
          <text x={740} y={1100} textAnchor="middle" fill={C.mint} fontFamily={FONT_MONO} fontWeight={700} fontSize={22}>ORIGINAL PHOTO RESTORED</text>
        </g>
      </svg>
    </Scene>

    <Scene t={t} id="closing" scenes={SCENES}>
      <Background t={t} dark /><Header label="TECH EXPLAINED · Wi-Fi" seconds={55} dark /><DemoPanel dark />
      <TitleBlock dark eyebrow="Organized radio, verified data" lines={['Data to radio.', 'Radio to data.']} accentIndex={1} size={62} />
      <svg width={W} height={H} style={{ position: 'absolute', inset: 0 }} fontFamily={FONT_MONO} textAnchor="middle">
        {[['DATA + CHECKS', C.indigo], ['OFDM SUBCARRIERS', C.coral], ['RADIO CHANNEL', C.mint], ['VERIFY + REBUILD', C.teal]].map(([label, color], i) => <g key={label} transform={`translate(540 ${640 + i * 165})`}>
          <rect x={-300} y={-57} width={600} height={114} rx={25} fill="rgba(255,255,255,0.06)" stroke={color as string} strokeWidth={3} />
          <text y={10} fill={color as string} fontWeight={700} fontSize={24}>{label}</text>
          {i < 3 && <path d="M 0 65 L 0 100" stroke={C.mint} strokeWidth={4} strokeDasharray="7 7" />}
        </g>)}
      </svg>
    </Scene>
    <CalmCaptions lines={VO} accentWords={['through air as radio signals', 'divides the data into packets', 'error-checking information', 'carrier wave', 'subcarriers', 'OFDM', 'channel is busy', 'requests retransmission', 'original photo']} />
    <CalmSound narration="voiceovers/wifi-data/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO, 'closing-summary').end} duration={55} />
  </AbsoluteFill>;
};
export default Short30WifiData;
