import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Activity, Orbit, Megaphone, GraduationCap, MapPin, Award } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Activity,
      title: 'Biomedical Instrumentation',
      description: 'Engineering clinical sensing hardware that captures physiological signals non-invasively—including optical droplet monitoring, acoustic phonocardiography, and microvascular blood flow detection.'
    },
    {
      icon: Cpu,
      title: 'Analog Circuitry & EDA',
      description: 'Designing low-noise analog signal conditioning circuits in LTspice and routing high-reliability multi-layer PCBs in Altium Designer with disciplined grounding, shielding, and CMRR optimization.'
    },
    {
      icon: Orbit,
      title: 'Microgravity Bio-Simulation',
      description: 'Modeling continuous multi-axis rotational kinematics in MATLAB and developing custom dual-gimbal 3D clinostat hardware to neutralize gravitational vectors for space biology research.'
    },
    {
      icon: Megaphone,
      title: 'Technical Leadership & PR',
      description: 'Heading public relations, media campaigns, and database architectures for IEEE EMBS (Scholarverse Co-chair), Spectra 2026 (PR Head), MedEx 2026, Brainstorm, and Sasnaka Sansada.'
    }
  ];

  return (
    <section id="about" className="py-24 border-t border-obsidian-800 bg-obsidian-950/60 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header with Fade & Slide */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-obsidian-800"
        >
          <div>
            <div className="text-xs font-mono text-emerald-400 mb-2 uppercase tracking-wider">
              Profile &amp; Engineering Focus
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
              Bridging Clinical Healthcare with Hardware Precision
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-mono text-slate-400">
            <span>UoM Faculty of Engineering</span>
            <span className="mx-2" aria-hidden="true">·</span>
            <span className="text-slate-200">24th Batch</span>
          </div>
        </motion.div>

        {/* Narrative & Academic Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 items-start">
          
          <motion.div 
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 space-y-5 text-slate-300 text-base leading-relaxed"
          >
            <p>
              I am a second-year <strong className="text-white font-semibold">Biomedical Engineering undergraduate (24th batch)</strong> at the{' '}
              <strong className="text-emerald-400 font-semibold">University of Moratuwa</strong>, Sri Lanka’s premier technological institution. My academic and practical work centers on designing real-world biomedical devices that address clinical monitoring deficiencies, physiological signal extraction, and bio-rotational mechanics.
            </p>
            <p className="text-slate-400">
              Through rigorous coursework and hands-on laboratory development, I have developed competencies in analog circuit simulation (<span className="text-slate-200">LTspice</span>), multi-layer PCB design (<span className="text-slate-200">Altium Designer</span>), biomedical signal processing (<span className="text-slate-200">MATLAB</span>), and digital logic simulation (<span className="text-slate-200">Logisim</span>, with foundational exposure to <span className="text-slate-200">Vivado</span> and <span className="text-slate-200">Quartus Prime</span>).
            </p>
            <p className="text-slate-400">
              Beyond engineering design, I actively lead student initiatives across IEEE societies and university organizations. Serving as <strong className="text-white">Co-chair of Scholarverse</strong> (IEEE EMBS), <strong className="text-white">PR Head for Spectra 2026</strong>, and <strong className="text-white">Database Project Coordinator for Sasnaka Sansada</strong>, I channel technical insights into clear public communication, media management, and community impact.
            </p>
          </motion.div>

          {/* Quick Academic Card */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 bg-obsidian-850 border border-obsidian-750 rounded-xl p-6 shadow-xl"
          >
            <div className="text-xs font-mono text-emerald-400 mb-4 uppercase tracking-wider flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Credentials</span>
            </div>

            <div className="space-y-4 text-sm">
              <div className="pb-3 border-b border-obsidian-800">
                <div className="text-xs text-slate-400">Formal Name</div>
                <div className="text-slate-100 font-medium">{PERSONAL_INFO.name}</div>
                <div className="text-xs text-emerald-400 mt-0.5">Known as {PERSONAL_INFO.preferredName}</div>
              </div>

              <div className="pb-3 border-b border-obsidian-800">
                <div className="text-xs text-slate-400">Degree Program</div>
                <div className="text-slate-100 font-medium">B.Sc. (Hons) in Biomedical Engineering</div>
                <div className="text-xs text-slate-400 mt-0.5">Undergraduate Year 2 · 24th Batch</div>
              </div>

              <div className="pb-3 border-b border-obsidian-800">
                <div className="text-xs text-slate-400">Institution &amp; Faculty</div>
                <div className="text-slate-100 font-medium">University of Moratuwa</div>
                <div className="text-xs text-slate-400 mt-0.5">Dept. of Electronic &amp; Telecommunication / Biomedical Eng.</div>
              </div>

              <div>
                <div className="text-xs text-slate-400">Location &amp; Nationality</div>
                <div className="text-slate-100 font-medium flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Moratuwa / Colombo, Sri Lanka</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 4 Pillars Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div 
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: 0.1 + idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="bg-obsidian-850/70 border border-obsidian-750/90 rounded-xl p-6 hover:border-emerald-500/40 hover:bg-obsidian-850 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-obsidian-800 border border-obsidian-700 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2.5 group-hover:text-emerald-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-400">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default About;
