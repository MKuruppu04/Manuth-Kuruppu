import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Activity, Sliders, Waves, Zap, ShieldCheck } from 'lucide-react';

export const SignalSandbox: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<'iv' | 'pcg' | 'ppg' | 'clinostat'>('pcg');
  const [isPlaying, setIsPlaying] = useState(true);
  const [signalRate, setSignalRate] = useState(72); // BPM or gtt/min or RPM
  const [noiseLevel, setNoiseLevel] = useState(15); // %
  const [filterEnabled, setFilterEnabled] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const channels = [
    {
      id: 'pcg',
      name: 'Heart Sound Phonocardiogram',
      subtitle: 'Acoustic cardiac auscultation & active bandpass filter (20 Hz - 2 kHz)',
      unit: 'BPM',
      minRate: 40,
      maxRate: 140,
      defaultRate: 72,
    },
    {
      id: 'iv',
      name: 'Optical IV Drip Photodiode',
      subtitle: 'Infrared transimpedance pulse & comparator trigger edge',
      unit: 'gtt/min',
      minRate: 15,
      maxRate: 80,
      defaultRate: 35,
    },
    {
      id: 'ppg',
      name: 'Microvascular Blood Flow (PPG)',
      subtitle: 'Dual-wavelength optical pulsatile absorption & perfusion index',
      unit: 'PR (BPM)',
      minRate: 45,
      maxRate: 130,
      defaultRate: 75,
    },
    {
      id: 'clinostat',
      name: '3D Clinostat Gravitational Vector',
      subtitle: 'Dual-axis kinematic gravity vector cancellation simulation',
      unit: 'RPM',
      minRate: 1,
      maxRate: 10,
      defaultRate: 4,
    }
  ];

  // When switching channels, adjust default rate
  const handleChannelSwitch = (chId: 'iv' | 'pcg' | 'ppg' | 'clinostat') => {
    setActiveChannel(chId);
    const ch = channels.find(c => c.id === chId);
    if (ch) setSignalRate(ch.defaultRate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;
    const width = canvas.width;
    const height = canvas.height;
    const buffer: number[] = new Array(width).fill(height / 2);

    const render = () => {
      if (isPlaying) {
        t += 0.04;
      }

      let signal = 0;
      const noise = (noiseLevel / 100) * (Math.random() - 0.5) * 25;
      const mainsHum = (noiseLevel / 100) * Math.sin(t * 50) * 8; // 50Hz mains power line hum

      if (activeChannel === 'pcg') {
        // Phonocardiogram (S1 and S2 heart sounds)
        const period = (60 / signalRate) * 2.8;
        const phase = t % period;

        // S1 sound (~70Hz damped wave)
        if (phase >= 0.1 && phase <= 0.45) {
          const env = Math.sin((phase - 0.1) * Math.PI / 0.35);
          signal += Math.sin((phase - 0.1) * 38) * 32 * env;
        }

        // S2 sound (~140Hz sharper damped wave)
        if (phase >= 0.8 && phase <= 1.05) {
          const env = Math.sin((phase - 0.8) * Math.PI / 0.25);
          signal += Math.sin((phase - 0.8) * 58) * 24 * env;
        }
      } else if (activeChannel === 'iv') {
        // IV Droplet optical trigger pulse
        const interval = (60 / signalRate) * 10;
        const phase = (t * 8) % interval;
        if (phase < 0.9) {
          // Sharp comparator falling/rising edge
          signal = Math.sin(phase * Math.PI / 0.9) * 38;
        } else {
          signal = 0;
        }
      } else if (activeChannel === 'ppg') {
        // Photoplethysmogram pulsatile pulse with dicrotic notch
        const period = (60 / signalRate) * 2.5;
        const phase = (t % period) / period; // 0 to 1
        
        // Systolic peak
        const systolic = Math.exp(-Math.pow((phase - 0.2) / 0.08, 2)) * 34;
        // Dicrotic notch and diastolic wave
        const diastolic = Math.exp(-Math.pow((phase - 0.45) / 0.12, 2)) * 14;
        signal = systolic + diastolic;
      } else if (activeChannel === 'clinostat') {
        // 3D Clinostat vector projection
        const gx = Math.cos(t * signalRate * 0.4) * 24;
        const gy = Math.sin(t * (signalRate * 0.7 + 0.3) * 0.4) * 20;
        signal = (gx + gy) * 0.6;
      }

      // Add noise and filter
      let composite = signal;
      if (!filterEnabled) {
        composite += noise + mainsHum;
      } else {
        // Active filter suppresses 50Hz hum and reduces high-freq noise by 85%
        composite += noise * 0.18;
      }

      const yVal = (height / 2) - composite;
      buffer.shift();
      buffer.push(yVal);

      // Canvas Rendering
      ctx.clearRect(0, 0, width, height);

      // Oscilloscope background grid
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.09)';
      ctx.lineWidth = 1;
      const gridStep = 32;
      for (let x = 0; x < width; x += gridStep) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridStep) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center reference zero-line
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.2)';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw biosignal line
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 6;

      for (let i = 0; i < buffer.length; i++) {
        if (i === 0) ctx.moveTo(i, buffer[i]);
        else ctx.lineTo(i, buffer[i]);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Glow probe marker at the head
      const leadX = buffer.length - 1;
      const leadY = buffer[leadX];
      ctx.fillStyle = '#6ee7b7';
      ctx.beginPath();
      ctx.arc(leadX, leadY, 3.5, 0, 2 * Math.PI);
      ctx.fill();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, activeChannel, signalRate, noiseLevel, filterEnabled]);

  const currentChannel = channels.find(c => c.id === activeChannel)!;

  return (
    <section id="signals" className="py-24 border-t border-obsidian-800 bg-obsidian-950 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-obsidian-800 gap-4"
        >
          <div>
            <div className="text-xs font-mono text-emerald-400 mb-2 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" />
              <span>Interactive Biomedical Instrumentation Lab</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
              Biosignal Acquisition &amp; Filter Simulation
            </h2>
          </div>
          <div className="text-xs font-mono text-slate-400">
            Simulating Front-End Conditioning (LTspice &amp; MATLAB)
          </div>
        </motion.div>

        {/* Main Console Box */}
        <motion.div 
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="bg-obsidian-900 border border-obsidian-750 rounded-2xl overflow-hidden shadow-2xl"
        >
          
          {/* Top Channel Tabs Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 border-b border-obsidian-800 bg-obsidian-950/80">
            {channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => handleChannelSwitch(ch.id as any)}
                className={`p-4 text-left border-r last:border-r-0 border-obsidian-800 transition-colors ${
                  activeChannel === ch.id
                    ? 'bg-obsidian-850 border-b-2 border-b-emerald-400 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-obsidian-900/60'
                }`}
              >
                <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider mb-1">
                  Channel 0{channels.indexOf(ch) + 1}
                </div>
                <div className="text-sm font-semibold truncate text-slate-200">
                  {ch.name}
                </div>
              </button>
            ))}
          </div>

          {/* Oscilloscope Stage */}
          <div className="p-6 lg:p-8">
            
            {/* HUD Status Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-obsidian-800 text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className={`w-2 h-2 rounded-full bg-emerald-400 ${isPlaying ? 'animate-pulse' : ''}`} />
                  {isPlaying ? 'RUNNING' : 'PAUSED'}
                </span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-300">{currentChannel.subtitle}</span>
              </div>

              <div className="flex items-center gap-4 text-slate-400">
                <span>
                  SAMPLING: <strong className="text-slate-200 tabular-nums">2.4 kS/s</strong>
                </span>
                <span className="text-slate-600">|</span>
                <span>
                  CMRR: <strong className="text-emerald-400 tabular-nums">&gt;86 dB</strong>
                </span>
              </div>
            </div>

            {/* Canvas Screen */}
            <div className="rounded-xl border border-obsidian-750 bg-obsidian-950 overflow-hidden relative shadow-inner">
              <canvas
                ref={canvasRef}
                width={1000}
                height={260}
                className="w-full h-[220px] sm:h-[260px] block"
              />

              {/* Watermark-free corner indicator */}
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-emerald-500/70 bg-obsidian-900/80 px-2.5 py-1 rounded border border-obsidian-800">
                TIMEBASE: 50 ms/div · 500 mV/div
              </div>
            </div>

            {/* Interactive Hardware & Filter Controls */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Play / Pause & Reset */}
              <div className="md:col-span-3 flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-mono text-xs font-semibold transition-colors border ${
                    isPlaying 
                      ? 'bg-obsidian-800 border-obsidian-700 text-slate-200 hover:text-white' 
                      : 'bg-emerald-400 text-obsidian-950 border-emerald-300 hover:bg-emerald-300'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Freeze Stream</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Resume Stream</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    const ch = channels.find(c => c.id === activeChannel);
                    if (ch) setSignalRate(ch.defaultRate);
                    setNoiseLevel(15);
                    setFilterEnabled(true);
                  }}
                  className="p-2.5 text-slate-400 hover:text-white rounded-lg border border-obsidian-700 bg-obsidian-850 hover:bg-obsidian-800 transition-colors"
                  title="Reset to Calibrated Defaults"
                  aria-label="Reset sliders"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Rate Slider */}
              <div className="md:col-span-3 font-mono text-xs">
                <div className="flex justify-between text-slate-300 mb-1.5">
                  <span className="text-slate-400">Pulsatile Rate:</span>
                  <span className="text-emerald-400 font-bold tabular-nums">
                    {signalRate} {currentChannel.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={currentChannel.minRate}
                  max={currentChannel.maxRate}
                  value={signalRate}
                  onChange={(e) => setSignalRate(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Noise Artifact Slider */}
              <div className="md:col-span-3 font-mono text-xs">
                <div className="flex justify-between text-slate-300 mb-1.5">
                  <span className="text-slate-400">50Hz / Thermal Noise:</span>
                  <span className="text-slate-200 font-bold tabular-nums">
                    {noiseLevel}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
              </div>

              {/* Active Filter Mode Toggle */}
              <div className="md:col-span-3">
                <button
                  onClick={() => setFilterEnabled(!filterEnabled)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-mono text-xs font-semibold transition-all border ${
                    filterEnabled
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-700/60 text-rose-300'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{filterEnabled ? 'Active Filter: ENGAGED' : 'Filter: BYPASSED (Raw Signal)'}</span>
                </button>
              </div>

            </div>

          </div>

          {/* Bottom Technical Note */}
          <div className="px-6 lg:px-8 py-3.5 bg-obsidian-950 border-t border-obsidian-800 text-[11px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <span>Circuit topology tested in LTspice XVII with active Butterworth op-amp stages.</span>
            <span className="text-emerald-400">Design Verification: Zero Phase Distortion in Passband</span>
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default SignalSandbox;
