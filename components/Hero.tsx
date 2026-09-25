import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mail, Phone, ExternalLink, Activity } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO, HERO_IMAGE } from '../constants';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live physiological biosignal trace animation (authentic ECG/PPG simulation)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let t = 0;
    const width = canvas.width;
    const height = canvas.height;
    const points: number[] = new Array(width).fill(height / 2);

    const render = () => {
      t += 0.05;

      // Generate ECG-like heartbeat cycle
      const cycle = t % (2 * Math.PI);
      let sample = 0;
      if (cycle > 1.2 && cycle < 1.4) {
        // P-wave
        sample = Math.sin((cycle - 1.2) * Math.PI / 0.2) * 8;
      } else if (cycle > 1.8 && cycle < 1.9) {
        // Q-dip
        sample = -6;
      } else if (cycle > 1.9 && cycle < 2.05) {
        // R-peak
        sample = 36 * Math.sin((cycle - 1.9) * Math.PI / 0.15);
      } else if (cycle > 2.05 && cycle < 2.15) {
        // S-dip
        sample = -12;
      } else if (cycle > 2.5 && cycle < 2.9) {
        // T-wave
        sample = Math.sin((cycle - 2.5) * Math.PI / 0.4) * 14;
      }

      // Add slight baseline physiological drift
      const baseline = height / 2 + Math.sin(t * 0.3) * 2;
      points.shift();
      points.push(baseline - sample);

      ctx.clearRect(0, 0, width, height);

      // Draw faint oscilloscope grid lines
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.08)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 30) {
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

      // Draw biosignal trace
      ctx.beginPath();
      ctx.strokeStyle = '#10b981';
      ctx.lineWidth = 1.8;
      ctx.shadowColor = '#10b981';
      ctx.shadowBlur = 6;

      for (let i = 0; i < points.length; i++) {
        if (i === 0) {
          ctx.moveTo(i, points[i]);
        } else {
          ctx.lineTo(i, points[i]);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw leading probe point
      const lastX = points.length - 1;
      const lastY = points[lastX];
      ctx.fillStyle = '#34d399';
      ctx.beginPath();
      ctx.arc(lastX, lastY, 3, 0, 2 * Math.PI);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="top" className="relative min-h-[92vh] flex items-center pt-28 pb-20 overflow-hidden">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-950/40 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-emerald-950/20 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Academic & Technical Identity */}
          <motion.div 
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            
            {/* Unboxed Editorial Kicker & Formal Registration */}
            <div className="flex items-center gap-3 text-xs md:text-sm font-mono text-emerald-400 mb-4 tracking-wide">
              <span>{PERSONAL_INFO.name}</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-slate-400">Undergraduate 24th Batch</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-slate-400">Dept. of Electronic &amp; Telecommunication / BME</span>
            </div>

            {/* Display Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white leading-[1.08] mb-6">
              {PERSONAL_INFO.preferredName}
            </h1>

            {/* Primary Headline */}
            <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mb-5">
              2nd Year <span className="text-emerald-400">Biomedical Engineering Undergraduate</span> at{' '}
              <span className="text-white font-semibold">University of Moratuwa</span>.
            </p>

            {/* Disciplines Statement */}
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl mb-8">
              Developing precision medical instrumentation, analog biosignal conditioning circuitry,
              and microgravity research systems. Integrating biomedical rigor in Altium, LTspice, and MATLAB with high-impact IEEE EMBS leadership.
            </p>

            {/* Unboxed Metadata Line */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-slate-400 pb-7 border-b border-obsidian-800">
              <span className="flex items-center gap-1.5 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                University of Moratuwa
              </span>
              <span className="text-slate-600" aria-hidden="true">/</span>
              <span>IEEE EMBS Co-Chair</span>
              <span className="text-slate-600" aria-hidden="true">/</span>
              <span>MedEx &amp; Spectra PR Lead</span>
              <span className="text-slate-600" aria-hidden="true">/</span>
              <span>Sri Lanka</span>
            </div>

            {/* Primary Action Buttons & Socials */}
            <div className="pt-7 flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollTo('projects')}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-obsidian-950 bg-emerald-400 hover:bg-emerald-300 rounded-md transition-all shadow-md shadow-emerald-500/15 flex items-center gap-2 whitespace-nowrap"
              >
                <span>Explore Technical Projects</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenResume}
                className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 hover:text-white border border-obsidian-700 hover:border-emerald-500/40 rounded-md transition-colors bg-obsidian-850/80 whitespace-nowrap"
              >
                Academic CV Summary
              </button>

              {/* Direct Social Links */}
              <div className="flex items-center gap-2 sm:ml-2">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-400 hover:text-white hover:bg-obsidian-800 border border-obsidian-750 rounded-md transition-colors"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 text-slate-400 hover:text-emerald-400 hover:bg-obsidian-800 border border-obsidian-750 rounded-md transition-colors"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-2.5 text-slate-400 hover:text-emerald-400 hover:bg-obsidian-800 border border-obsidian-750 rounded-md transition-colors"
                  aria-label="Send Email"
                  title={PERSONAL_INFO.email}
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                  className="p-2.5 text-slate-400 hover:text-emerald-400 hover:bg-obsidian-800 border border-obsidian-750 rounded-md transition-colors"
                  aria-label="Call Mobile"
                  title={PERSONAL_INFO.phone}
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Visual Frame with Oscilloscope HUD */}
          <motion.div 
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-xl overflow-hidden border border-obsidian-750 bg-obsidian-850 shadow-2xl group">
              
              {/* Image Frame */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-obsidian-950">
                <img
                  src={HERO_IMAGE}
                  alt="Biomedical engineering laboratory workstation and prototype circuits"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter contrast-105 group-hover:scale-[1.02] transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/30 to-transparent" />
                
                {/* Status indicator on top corner */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2 px-2.5 py-1 bg-obsidian-950/80 backdrop-blur-md rounded border border-obsidian-700 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>PHYSIOLOGICAL_BENCH: ACTIVE</span>
                </div>
              </div>

              {/* Integrated Oscilloscope Waveform Panel */}
              <div className="p-4 border-t border-obsidian-750 bg-obsidian-900/95">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-slate-200">Real-Time Biosignal Acquisition</span>
                  </div>
                  <span className="text-emerald-400 font-semibold tabular-nums">72 BPM · NOMINAL</span>
                </div>
                
                {/* Canvas Oscilloscope */}
                <div className="rounded border border-obsidian-800 bg-obsidian-950 overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={70}
                    className="w-full h-[70px] block"
                  />
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Front-end: LTspice / Altium</span>
                  <span>Filtered: 0.05 Hz – 150 Hz</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
