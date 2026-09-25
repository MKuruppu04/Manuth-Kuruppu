import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, Layers, Activity, Stethoscope, Droplets, Orbit, CheckCircle2, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  // Simulator States based on project
  // 1. IV Drip state
  const [ivRate, setIvRate] = useState(30); // gtt/min
  const [isOccluded, setIsOccluded] = useState(false);
  const [dropCount, setDropCount] = useState(142);
  const [ivAlarm, setIvAlarm] = useState(false);

  // 2. Heart sound state
  const [heartMode, setHeartMode] = useState<'normal' | 'murmur' | 'lowpass' | 'highpass'>('normal');
  const [heartBpm, setHeartBpm] = useState(72);

  // 3. Blood flow state
  const [perfusionIndex, setPerfusionIndex] = useState(4.5); // %
  const [flowVelocity, setFlowVelocity] = useState(24); // cm/s

  // 4. Clinostat state
  const [outerRpm, setOuterRpm] = useState(3.0);
  const [innerRpm, setInnerRpm] = useState(2.2);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scrolling while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Real-time canvas simulation for the specific project
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const width = canvas.width;
    const height = canvas.height;
    const buffer: number[] = new Array(width).fill(height / 2);

    const render = () => {
      time += 0.05;
      let sampleVal = height / 2;

      if (project.simulationType === 'iv_drip') {
        if (isOccluded) {
          // Flat line occlusion
          sampleVal = height / 2;
        } else {
          // Drop pulses based on rate
          const interval = (60 / ivRate) * 12;
          const phase = (time * 10) % interval;
          if (phase < 1.2) {
            // Optical droplet dip & comparator transition
            sampleVal = (height / 2) - Math.sin(phase * Math.PI / 1.2) * 28;
          } else {
            sampleVal = height / 2;
          }
        }
      } else if (project.simulationType === 'phonocardiogram') {
        // Acoustic cardiac sound wave (S1, S2, murmur)
        const period = (60 / heartBpm) * 3;
        const phase = time % period;
        let s = 0;
        
        // S1 sound (mitral & tricuspid closure, ~50-100Hz damp)
        if (phase > 0.2 && phase < 0.6) {
          const decay = Math.exp(-(phase - 0.2) * 8);
          s += Math.sin((phase - 0.2) * 45) * 24 * decay;
        }
        
        // Murmur (systolic turbulent whoosh between S1 and S2)
        if (heartMode === 'murmur' && phase >= 0.55 && phase <= 1.1) {
          s += (Math.random() - 0.5) * 14 * Math.sin((phase - 0.55) * Math.PI / 0.55);
        }

        // S2 sound (aortic & pulmonary closure, ~100-200Hz damp)
        if (phase > 1.1 && phase < 1.4) {
          const decay = Math.exp(-(phase - 1.1) * 12);
          s += Math.sin((phase - 1.1) * 60) * 18 * decay;
        }

        // Apply filter simulation
        if (heartMode === 'lowpass') s *= 0.5;
        if (heartMode === 'highpass') s *= 1.2;

        sampleVal = (height / 2) - s;
      } else if (project.simulationType === 'blood_flow') {
        // Photoplethysmography & Doppler flow pulse
        const phase = (time * 1.4) % (2 * Math.PI);
        // Systolic peak
        let s = Math.pow(Math.sin(phase / 2), 4) * (perfusionIndex * 5);
        // Dicrotic notch
        if (phase > 1.8 && phase < 3.2) {
          s += Math.sin((phase - 1.8) * Math.PI / 1.4) * (perfusionIndex * 1.5);
        }
        // Small microvascular turbulence
        s += (Math.random() - 0.5) * (flowVelocity * 0.08);

        sampleVal = (height / 2) + 15 - s;
      } else if (project.simulationType === 'clinostat') {
        // Gravity vector averaging simulation: gx and gy oscillation
        const gx = Math.cos(time * outerRpm * 0.5) * 20;
        const gy = Math.sin(time * innerRpm * 0.6) * 18;
        sampleVal = height / 2 + (gx + gy) * 0.6;
      }

      buffer.shift();
      buffer.push(sampleVal);

      ctx.clearRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.07)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw Trace
      ctx.beginPath();
      ctx.strokeStyle = isOccluded && project.simulationType === 'iv_drip' ? '#f43f5e' : '#10b981';
      ctx.lineWidth = 2;
      ctx.shadowColor = isOccluded && project.simulationType === 'iv_drip' ? '#f43f5e' : '#10b981';
      ctx.shadowBlur = 4;

      for (let i = 0; i < buffer.length; i++) {
        if (i === 0) ctx.moveTo(i, buffer[i]);
        else ctx.lineTo(i, buffer[i]);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [project.simulationType, ivRate, isOccluded, heartMode, heartBpm, perfusionIndex, flowVelocity, outerRpm, innerRpm]);

  // Drop count increment for IV drop
  useEffect(() => {
    if (project.simulationType !== 'iv_drip' || isOccluded) return;
    const intervalMs = (60 / ivRate) * 1000;
    const interval = setInterval(() => {
      setDropCount((prev) => prev + 1);
    }, Math.max(intervalMs, 500));
    return () => clearInterval(interval);
  }, [project.simulationType, ivRate, isOccluded]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative w-full max-w-4xl bg-obsidian-900 border border-obsidian-750 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-obsidian-800 bg-obsidian-950/80">
          <div className="flex items-center gap-3 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="uppercase">{project.category}</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-400">{project.status}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-obsidian-800 transition-colors"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Header Title & Subtitle */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white mb-2 tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-emerald-400/90 font-medium">
              {project.subtitle}
            </p>
          </div>

          {/* Media & Key Highlights Bento */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Visual Frame */}
            <div className="lg:col-span-7 rounded-xl overflow-hidden border border-obsidian-800 bg-obsidian-950 aspect-[4/3] relative">
              <img
                src={project.image}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 text-[11px] font-mono text-slate-400 bg-obsidian-950/80 px-2.5 py-1 rounded border border-obsidian-750">
                Role: {project.role}
              </div>
            </div>

            {/* Quick Specs / Key Features */}
            <div className="lg:col-span-5 bg-obsidian-850 border border-obsidian-750 rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                  Key System Innovations
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  {project.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools Used */}
              <div className="mt-6 pt-4 border-t border-obsidian-800">
                <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Engineering Software &amp; EDA
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.toolsUsed.map((tool) => (
                    <span
                      key={tool}
                      className="px-2.5 py-1 text-xs font-mono text-emerald-300 bg-emerald-950/40 border border-emerald-500/25 rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Hardware Signal Sandbox for this Project */}
          <div className="bg-obsidian-950 border border-obsidian-750 rounded-xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-obsidian-800">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-xs sm:text-sm font-semibold text-white">
                  Real-Time Bench Signal Simulation
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  (Simulated LTspice / Circuit Response)
                </span>
              </div>
              <div className="text-xs font-mono text-emerald-400">
                CHANNEL 1 · LIVE ANALOG CAPTURE
              </div>
            </div>

            {/* Dynamic Controls based on project */}
            {project.simulationType === 'iv_drip' && (
              <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">
                    Infusion Rate: <span className="text-emerald-400 font-bold">{ivRate} gtt/min</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={ivRate}
                    onChange={(e) => setIvRate(Number(e.target.value))}
                    disabled={isOccluded}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <button
                    onClick={() => {
                      setIsOccluded(!isOccluded);
                      setIvAlarm(!isOccluded);
                    }}
                    className={`px-3 py-2 text-xs font-medium rounded border transition-colors ${
                      isOccluded
                        ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                        : 'bg-obsidian-800 border-obsidian-700 text-slate-300 hover:text-white'
                    }`}
                  >
                    {isOccluded ? '⚠ Chamber Occluded (Active Alert)' : 'Simulate Tubing Occlusion'}
                  </button>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 text-slate-300">
                  <div className="text-right">
                    <span className="text-slate-400 block text-[10px]">TOTAL DROPS INFUSED</span>
                    <span className="text-base font-bold text-white tabular-nums">{dropCount} drops</span>
                  </div>
                </div>
              </div>
            )}

            {project.simulationType === 'phonocardiogram' && (
              <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">
                    Heart Rate: <span className="text-emerald-400 font-bold">{heartBpm} BPM</span>
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="130"
                    value={heartBpm}
                    onChange={(e) => setHeartBpm(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
                <div className="sm:col-span-2 flex items-center gap-2">
                  <span className="text-slate-400 mr-1">Filter/Pathology:</span>
                  {(['normal', 'murmur', 'lowpass', 'highpass'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setHeartMode(mode)}
                      className={`px-2.5 py-1.5 text-xs rounded border capitalize transition-colors ${
                        heartMode === mode
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-obsidian-850 border-obsidian-700 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {project.simulationType === 'blood_flow' && (
              <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">
                    Perfusion Index (PI): <span className="text-emerald-400 font-bold">{perfusionIndex.toFixed(1)}%</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={perfusionIndex}
                    onChange={(e) => setPerfusionIndex(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">
                    Estimated Velocity: <span className="text-emerald-400 font-bold">{flowVelocity} cm/s</span>
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={flowVelocity}
                    onChange={(e) => setFlowVelocity(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
              </div>
            )}

            {project.simulationType === 'clinostat' && (
              <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                <div>
                  <label className="text-slate-400 block mb-1">
                    Outer Gimbal: <span className="text-emerald-400 font-bold">{outerRpm.toFixed(1)} RPM</span>
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="8.0"
                    step="0.1"
                    value={outerRpm}
                    onChange={(e) => setOuterRpm(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">
                    Inner Gimbal: <span className="text-emerald-400 font-bold">{innerRpm.toFixed(1)} RPM</span>
                  </label>
                  <input
                    type="range"
                    min="0.5"
                    max="8.0"
                    step="0.1"
                    value={innerRpm}
                    onChange={(e) => setInnerRpm(Number(e.target.value))}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
                <div className="flex flex-col justify-end text-right">
                  <span className="text-slate-400 text-[10px]">TIME-AVERAGED GRAVITY VECTOR</span>
                  <span className="text-emerald-400 font-bold text-sm tabular-nums">
                    |g_avg| ≈ {(0.002 + Math.abs(outerRpm - innerRpm) * 0.001).toFixed(4)} g
                  </span>
                </div>
              </div>
            )}

            {/* Canvas Oscilloscope */}
            <div className="rounded border border-obsidian-800 bg-obsidian-950 overflow-hidden">
              <canvas
                ref={canvasRef}
                width={700}
                height={120}
                className="w-full h-[120px] block"
              />
            </div>
          </div>

          {/* Full Narrative */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white">Project Overview &amp; Clinical Context</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.fullDescription}
            </p>
          </div>

          {/* Technical Engineering Breakdown Accordions/Grid */}
          <div>
            <h3 className="text-base font-semibold text-white mb-4">Engineering Architecture Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              
              <div className="p-4 rounded-xl border border-obsidian-800 bg-obsidian-850">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <Cpu className="w-4 h-4" />
                  <span>Circuitry &amp; Analog Conditioning</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {project.engineeringDetails.circuitry}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-obsidian-800 bg-obsidian-850">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <Layers className="w-4 h-4" />
                  <span>Sensors &amp; Embedded Hardware</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {project.engineeringDetails.sensorsAndHardware}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-obsidian-800 bg-obsidian-850">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <Activity className="w-4 h-4" />
                  <span>Simulation &amp; Algorithmic Modeling</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {project.engineeringDetails.simulationAndModeling}
                </p>
              </div>

              <div className="p-4 rounded-xl border border-obsidian-800 bg-obsidian-850">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-2">
                  <Stethoscope className="w-4 h-4" />
                  <span>Clinical &amp; Research Application</span>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {project.engineeringDetails.clinicalApplication}
                </p>
              </div>

            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-obsidian-800 bg-obsidian-950/80 flex items-center justify-between">
          <div className="text-xs font-mono text-slate-400">
            Hardware Engineering · University of Moratuwa
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-200 hover:text-white bg-obsidian-800 hover:bg-obsidian-750 border border-obsidian-700 rounded-md transition-colors"
          >
            Close Inspector
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
