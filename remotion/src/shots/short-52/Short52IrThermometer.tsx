import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { prog } from '../../lib/shorts';
import { CalmCaptions, CalmSound, Scene, line } from '../../lib/next-calm';
import { CinematicBackground, DeviceStage, SceneHeading, SvgStage, X } from '../../lib/cinematic';
import { ClearLabel, HighlightPart, PanelLabel, StageNote } from '../../lib/clear-device';
import { SCENES, SFX_CUES, VO } from './vo.gen';

export const compositionConfig = { id: 'Short52IrThermometer', durationInSeconds: 40, fps: 30, width: 1080, height: 1920 };

const GunBody: React.FC<{ x: number; y: number; t: number; trigger?: number }> = ({ x, y, t, trigger = 0 }) => (
  <g transform={`translate(${x} ${y})`}>
    {/* Main body - seated alignment */}
    <path d="M -210 -110 H 120 Q 190 -110 190 -40 V 40 Q 190 110 120 110 H -210 Z" fill="#142a3e" stroke={X.steel} strokeWidth={8} />
    <rect x={-90} y={110} width={110} height={140} rx={18} fill="#142a3e" stroke={X.steel} strokeWidth={8} />
    {/* Lens barrel precisely centered on front face - no floating */}
    <rect x={120} y={-62} width={110} height={124} rx={14} fill="#0a1726" stroke={X.cyan} strokeWidth={6} />
    <circle cx={175} cy={0} r={38} fill="#1d3a52" stroke={X.cyan} strokeWidth={4} />
    <circle cx={175} cy={0} r={22} fill={X.cyan} opacity={0.18+trigger*0.22} />
    {/* Trigger seated flush */}
    <rect x={-40} y={96} width={48} height={58} rx={10} fill={trigger>0.05? X.amber: "#2a3b52"} stroke={X.white} strokeWidth={3} />
    {/* Display seated on top face */}
    <rect x={-160} y={-92} width={220} height={78} rx={14} fill={X.night} stroke={X.green} strokeWidth={4} />
    <text x={-50} y={-45} textAnchor="middle" fill={X.green} fontFamily="monospace" fontWeight={800} fontSize={32}>36.6°C</text>
  </g>
);

const Short52IrThermometer: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30;
  const lensFocus = prog(t, line(VO, 'lens-focus').start - 0.08, line(VO, 'lens-focus').start + 0.55);
  const filterBand = prog(t, line(VO, 'filter-band').start - 0.08, line(VO, 'filter-band').start + 0.55);
  const sensorVolt = prog(t, line(VO, 'sensor-voltage').start - 0.08, line(VO, 'sensor-voltage').start + 0.55);
  const processTable = prog(t, line(VO, 'process-table').start - 0.08, line(VO, 'process-table').start + 0.55);
  const displayEmi = prog(t, line(VO, 'display-emissivity').start - 0.08, line(VO, 'display-emissivity').start + 0.5);

  return (
    <AbsoluteFill style={{ background: X.night }}>
      <Scene t={t} id="hook" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.cyan} />
        <DeviceStage accent={X.cyan} />
        <SceneHeading eyebrow="Point, press, read" lines={['No touch,', 'still temperature']} accent={X.cyan} size={60} />
        <SvgStage>
          <PanelLabel text="HAND → INFRARED → DISPLAY" color={X.cyan} />
          <GunBody x={520} y={860} t={t} trigger={lensFocus} />
          {/* Hand seated gripping handle - no gap */}
          <g transform="translate(430 980)">
            <rect x={-26} y={-30} width={74} height={110} rx={16} fill="#c9b8a6" stroke="#8d7e6e" strokeWidth={4} />
            <circle cx={12} cy={-58} r={18} fill="#c9b8a6" />
          </g>
          {/* Forehead surface precisely aligned to infrared beam */}
          <g transform="translate(860 520)">
            <rect x={-100} y={-140} width={200} height={280} rx={80} fill="#debd9b" stroke="#a6866a" strokeWidth={5} />
            <text x={0} y={12} textAnchor="middle" fill={X.night} fontFamily="monospace" fontSize={20} fontWeight={700}>36.6°C</text>
          </g>
          {/* Steady dashed beam - no dancing, just opacity */}
          <g opacity={0.18+lensFocus*0.72}>
            <path d="M 350 860 H 760" stroke={X.coral} strokeWidth={10} strokeDasharray="12 12" />
            <circle cx={460} cy={860} r={8} fill={X.coral} />
            <circle cx={560} cy={860} r={8} fill={X.coral} />
            <circle cx={660} cy={860} r={8} fill={X.coral} />
          </g>
          <ClearLabel x={540} y={500} text="Infrared from skin" color={X.coral} targetX={760} targetY={560} />
          <ClearLabel x={520} y={1160} text="Lens gathers the radiation" color={X.cyan} opacity={lensFocus} />
          <StageNote text="Every warm surface glows with infrared" color={X.coral} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="lens" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.cyan} />
        <DeviceStage accent={X.cyan} />
        <SceneHeading eyebrow="Lens gathers the invisible light" lines={['Collect,', 'focus']} accent={X.cyan} size={62} />
        <SvgStage>
          <PanelLabel text="LENS · SEATED ON BARREL" color={X.cyan} />
          <g transform="translate(540 860)">
            {/* Lens assembly - all parts snap to common center line y=0 */}
            <rect x={-360} y={-90} width={200} height={180} rx={20} fill="#0a1726" stroke={X.cyan} strokeWidth={6} />
            <circle cx={-260} cy={0} r={58} fill="#1d3a52" stroke={X.cyan} strokeWidth={4} />
            <path d="M -160 0 H 60" stroke={X.cyan} strokeWidth={6} opacity={0.35+lensFocus*0.65} />
            <rect x={60} y={-70} width={280} height={140} rx={18} fill="#12263a" stroke={X.amber} strokeWidth={5} />
            <text x={200} y={-20} textAnchor="middle" fill={X.amber} fontFamily="monospace" fontWeight={700} fontSize={20}>DETECTOR</text>
            <text x={200} y={8} textAnchor="middle" fill={X.white} fontFamily="monospace" fontSize={16}>thermopile</text>
            {/* Rays - symmetric, seated */}
            <path d="M -420 -52 L -260 -18" stroke={X.coral} strokeWidth={4} opacity={lensFocus} />
            <path d="M -420 52 L -260 18" stroke={X.coral} strokeWidth={4} opacity={lensFocus} />
            <path d="M -200 -12 H 60" stroke={X.coral} strokeWidth={5} opacity={lensFocus} />
            <ClearLabel x={-260} y={-130} text="Lens" color={X.cyan} />
            <ClearLabel x={200} y={120} text="Focused spot" color={X.amber} />
          </g>
          {lensFocus>0.05 && <HighlightPart x={180} y={770} width={520} height={180} color={X.cyan} opacity={lensFocus*0.5} />}
          <StageNote text="Lens collects weak infrared into a strong spot" color={X.cyan} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="filter" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.violet} />
        <DeviceStage accent={X.violet} />
        <SceneHeading eyebrow="Keep only heat wavelengths" lines={['Filter', 'cleans the signal']} accent={X.violet} size={60} />
        <SvgStage>
          <PanelLabel text="FILTER KEEPS 8–14 μm" color={X.violet} />
          <g transform="translate(540 860)">
            <rect x={-400} y={-90} width={240} height={180} rx={18} fill="#12263a" stroke={X.steel} strokeWidth={5} />
            <text x={-280} y={-30} textAnchor="middle" fill={X.white} fontFamily="monospace" fontSize={18} fontWeight={700}>MIXED LIGHT</text>
            <text x={-280} y={0} textAnchor="middle" fill={X.steel} fontFamily="monospace" fontSize={16}>visible + IR</text>
            <rect x={-80} y={-74} width={160} height={148} rx={16} fill="#2a1e3a" stroke={X.violet} strokeWidth={5} opacity={0.45+filterBand*0.55} />
            <text x={0} y={-20} textAnchor="middle" fill={X.violet} fontFamily="monospace" fontWeight={800} fontSize={18}>FILTER</text>
            <path d="M 80 0 H 320" stroke={X.coral} strokeWidth={7} opacity={filterBand} />
            <rect x={200} y={-90} width={240} height={180} rx={18} fill="#2e2138" stroke={X.coral} strokeWidth={5} opacity={0.35+filterBand*0.65} />
            <text x={320} y={-10} textAnchor="middle" fill={X.coral} fontFamily="monospace" fontSize={18} fontWeight={700}>HEAT IR ONLY</text>
            <path d="M -160 0 H -80" stroke={X.coral} strokeWidth={4} strokeDasharray="8 8" opacity={0.7} />
            <path d="M -280 30 H -80" stroke={X.steel} strokeWidth={4} opacity={0.25} />
            {/* Blocked visible */}
            <path d="M -80 30 L -40 70" stroke={X.steel} strokeWidth={5} strokeLinecap="round" opacity={filterBand} />
            <path d="M -40 30 L -80 70" stroke={X.steel} strokeWidth={5} strokeLinecap="round" opacity={filterBand} />
          </g>
          <ClearLabel x={0} y={700} text="Filter blocks visible light" color={X.violet} />
          <ClearLabel x={320} y={700} text="Only heat IR passes" color={X.coral} />
          <StageNote text="Filter keeps the heat signal, rejects the rest" color={X.violet} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="sensor" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.amber} />
        <DeviceStage accent={X.amber} />
        <SceneHeading eyebrow="Heat becomes electricity" lines={['Infrared →', 'tiny voltage']} accent={X.amber} size={60} />
        <SvgStage>
          <PanelLabel text="THERMOPILE · VOLTAGE OUT" color={X.amber} />
          <g transform="translate(540 870)">
            <rect x={-380} y={-110} width={340} height={220} rx={20} fill="#12263a" stroke={X.amber} strokeWidth={5} />
            <text x={-210} y={-40} textAnchor="middle" fill={X.amber} fontFamily="monospace" fontWeight={700} fontSize={26}>{sensorVolt>0.1?"2.4 mV":"0.0 mV"}</text>
            <text x={-210} y={0} textAnchor="middle" fill={X.white} fontFamily="monospace" fontSize={16}>THERMOPILE</text>
            <ClearLabel x={-210} y={-150} text="Detector" color={X.amber} />
            <path d="M 40 0 H 180" stroke={X.amber} strokeWidth={6} opacity={sensorVolt} />
            <rect x={180} y={-70} width={200} height={140} rx={18} fill="#1a3d2f" stroke={X.green} strokeWidth={5} opacity={0.35+sensorVolt*0.65} />
            <text x={280} y={-10} textAnchor="middle" fill={X.green} fontFamily="monospace" fontWeight={700} fontSize={20}>AMP</text>
            <text x={280} y={18} textAnchor="middle" fill={X.white} fontFamily="monospace" fontSize={14}>×1200</text>
          </g>
          {sensorVolt>0.05 && <HighlightPart x={160} y={760} width={340} height={220} color={X.amber} opacity={sensorVolt*0.5} />}
          <StageNote text={sensorVolt>0.2? "Thermopile turns focused heat into millivolts":"More heat → larger voltage"} color={X.amber} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="process" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.green} />
        <DeviceStage accent={X.green} />
        <SceneHeading eyebrow="Voltage looked up in a table" lines={['Compare,', 'get temperature']} accent={X.green} size={58} />
        <SvgStage>
          <PanelLabel text="CALIBRATION TABLE · 36–42°C" color={X.green} />
          <g transform="translate(540 860)">
            <rect x={-420} y={-180} width={420} height={320} rx={18} fill="#07101d" stroke={X.steel} strokeWidth={4} />
            {[
              ["1.8 mV → 34.0°C",0.2],
              ["2.1 mV → 35.5°C",0.35],
              ["2.4 mV → 36.6°C",1],
              ["2.7 mV → 38.0°C",0.35],
              ["3.1 mV → 40.2°C",0.2],
            ].map(([label,op],i)=>(
              <g key={label} opacity={op as number} transform={`translate(0 ${-120+i*60})`}>
                <rect x={-180} y={-22} width={360} height={44} rx={10} fill={(op as number)>0.8? X.green:"#12263a"} stroke={X.steel} strokeWidth={2} />
                <text x={0} y={8} textAnchor="middle" fill={(op as number)>0.8? X.night:X.white} fontFamily="monospace" fontSize={16} fontWeight={700}>{label as string}</text>
              </g>
            ))}
            <path d="M -30 20 L 140 20" stroke={X.green} strokeWidth={5} opacity={processTable} />
            <rect x={140} y={-40} width={260} height={120} rx={18} fill={X.green} stroke={X.white} strokeWidth={4} opacity={0.9} />
            <text x={270} y={-5} textAnchor="middle" fill={X.night} fontFamily="monospace" fontWeight={800} fontSize={30}>36.6°C</text>
            <text x={270} y={24} textAnchor="middle" fill={X.night} fontFamily="monospace" fontSize={16}>DISPLAY</text>
          </g>
          <StageNote text="Electronics match voltage to its calibrated temperature" color={X.green} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="display" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.steel} />
        <DeviceStage accent={X.steel} />
        <SceneHeading eyebrow="Different surfaces need adjustment" lines={['Shiny needs', 'correction']} accent={X.steel} size={58} />
        <SvgStage>
          <PanelLabel text="EMISSIVITY 0.95 vs 0.30" color={X.steel} />
          <g transform="translate(320 860)">
            <circle cx={0} cy={0} r={110} fill="#d8c8b0" stroke={X.steel} strokeWidth={6} />
            <text x={0} y={140} textAnchor="middle" fill={X.white} fontFamily="monospace" fontSize={18}>Skin ε=0.95</text>
            <text x={0} y={170} textAnchor="middle" fill={X.green} fontFamily="monospace" fontWeight={700} fontSize={20}>36.6°C ✓</text>
          </g>
          <g transform="translate(760 860)">
            <circle cx={0} cy={0} r={110} fill="#8a96a8" stroke={X.steel} strokeWidth={6} />
            <text x={0} y={140} textAnchor="middle" fill={X.white} fontFamily="monospace" fontSize={18}>Metal ε=0.30</text>
            <text x={0} y={170} textAnchor="middle" fill={X.coral} fontFamily="monospace" fontWeight={700} fontSize={20}>29.1°C ✗ low</text>
          </g>
          <ClearLabel x={540} y={700} text="Same heat, different reading if ε wrong" color={X.steel} />
          {displayEmi>0.05 && <HighlightPart x={430} y={750} width={220} height={220} color={X.green} opacity={displayEmi*0.4} />}
          <StageNote text="Set emissivity so temperature matches the material" color={X.steel} />
        </SvgStage>
      </Scene>

      <Scene t={t} id="closing" scenes={SCENES}>
        <CinematicBackground t={t} accent={X.cyan} />
        <DeviceStage accent={X.cyan} />
        <SceneHeading eyebrow="Whole chain" lines={['Infrared', 'becomes number']} accent={X.cyan} size={64} />
        <SvgStage>
          <PanelLabel text="LENS → FILTER → THERMOPILE → TABLE" color={X.cyan} />
          <g transform="translate(540 860)">
            {[
              {x:-360,label:"Lens"},
              {x:-120,label:"Filter"},
              {x:120,label:"2.4 mV"},
              {x:360,label:"36.6°C"},
            ].map((s)=><g key={s.label} transform={`translate(${s.x} 0)`}>
              <rect x={-88} y={-64} width={176} height={128} rx={18} fill="#12263a" stroke={X.cyan} strokeWidth={4} />
              <text x={0} y={10} textAnchor="middle" fill={X.white} fontFamily="monospace" fontWeight={700} fontSize={18}>{s.label}</text>
              {s.x!==360 && <line x1={88} y1={0} x2={152} y2={0} stroke={X.steel} strokeWidth={4} strokeDasharray="7 7" />}
            </g>)}
          </g>
          <StageNote text="Focused infrared → voltage → temperature" color={X.cyan} />
        </SvgStage>
      </Scene>
      <CalmCaptions lines={VO} accentWords={['point this thermometer','invisible infrared light','lens gathers','filter keeps','heat-related wavelengths','small voltage','calibration table','emissivity','voltage becomes temperature']} />
      <CalmSound narration="voiceovers/ir-thermometer/narration.wav" music="ambient-pad" cues={SFX_CUES} narrationEnd={line(VO,'closing-summary').end} duration={40} />
    </AbsoluteFill>
  );
};
export default Short52IrThermometer;
