import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Video } from 'lucide-react';
import { SOFTWARE_SKILLS } from '../constants';

export const Skills: React.FC = () => {
  const engineeringSkills = SOFTWARE_SKILLS.filter(s => s.category === 'Engineering & EDA');
  const simulationSkills = SOFTWARE_SKILLS.filter(s => s.category === 'Simulation & Computing');
  const mediaSkills = SOFTWARE_SKILLS.filter(s => s.category === 'Media & PR Tools');

  return (
    <section id="softwares" className="py-24 border-t border-obsidian-800 bg-obsidian-950/70 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-obsidian-800"
        >
          <div>
            <div className="text-xs font-mono text-emerald-400 mb-2 uppercase tracking-wider">
              Technical Stack &amp; Design Suites
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
              Engineering &amp; Creative Softwares
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-mono text-slate-400">
            Hardware EDA · Biosignal Modeling · Media Production
          </div>
        </motion.div>

        {/* 3 Major Software Categories */}
        <div className="space-y-12">
          
          {/* 1. Core Engineering & EDA Suites */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="flex items-center gap-2.5 mb-6 text-sm font-bold text-white uppercase tracking-wider font-mono">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span>Electronic Design Automation (EDA) &amp; FPGA Synthesis</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {engineeringSkills.map((software, idx) => (
                <motion.div
                  key={software.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="bg-obsidian-850 border border-obsidian-750/90 hover:border-emerald-500/40 rounded-xl p-5 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-slate-400 font-semibold">{software.name}</span>
                      <span className={`text-[11px] font-medium ${
                        software.level === 'Skilled' ? 'text-emerald-400' : 'text-amber-400/90'
                      }`}>
                        {software.level}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {software.focus}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-obsidian-800">
                    {software.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-slate-300 bg-obsidian-900 px-2 py-0.5 rounded border border-obsidian-750"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 2. Scientific Simulation & Logic Architecture */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="flex items-center gap-2.5 mb-6 text-sm font-bold text-white uppercase tracking-wider font-mono">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Scientific Computing &amp; Logic Simulation</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {simulationSkills.map((software, idx) => (
                <motion.div
                  key={software.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="bg-obsidian-850 border border-obsidian-750/90 hover:border-emerald-500/40 rounded-xl p-5 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-slate-200 font-semibold text-sm">{software.name}</span>
                      <span className="text-[11px] font-medium text-emerald-400">
                        {software.level}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {software.focus}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-obsidian-800">
                    {software.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-slate-300 bg-obsidian-900 px-2 py-0.5 rounded border border-obsidian-750"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3. Media, Public Relations & Creative Direction */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="flex items-center gap-2.5 mb-6 text-sm font-bold text-white uppercase tracking-wider font-mono">
              <Video className="w-4 h-4 text-emerald-400" />
              <span>Media Production, Public Relations &amp; Motion Design</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {mediaSkills.map((software, idx) => (
                <motion.div
                  key={software.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className="bg-obsidian-850 border border-obsidian-750/90 hover:border-emerald-500/40 rounded-xl p-5 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-2">
                      <span className="text-slate-200 font-semibold">{software.name}</span>
                      <span className={`text-[11px] font-medium ${
                        software.level === 'Skilled' ? 'text-emerald-400' : 'text-amber-400/90'
                      }`}>
                        {software.level}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {software.focus}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-obsidian-800">
                    {software.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono text-slate-300 bg-obsidian-900 px-2 py-0.5 rounded border border-obsidian-750"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Skills;
