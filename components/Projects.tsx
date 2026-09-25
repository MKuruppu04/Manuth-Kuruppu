import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sliders } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../constants';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'Biomedical Devices', label: 'Biomedical Devices' },
    { id: 'Analog & Sensors', label: 'Analog & Sensors' },
    { id: 'Microgravity & Research', label: 'Microgravity & Research' },
  ];

  const filteredProjects = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 border-t border-obsidian-800 bg-obsidian-900 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header with Segmented Filter Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-obsidian-800 gap-6"
        >
          <div>
            <div className="text-xs font-mono text-emerald-400 mb-2 uppercase tracking-wider">
              Engineering Projects &amp; Prototypes
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
              Selected Biomedical &amp; Research Systems
            </h2>
          </div>

          {/* Functional Segmented Filter Buttons */}
          <div className="flex items-center gap-1.5 p-1 bg-obsidian-950 border border-obsidian-800 rounded-lg overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  filter === cat.id
                    ? 'bg-obsidian-800 text-emerald-300 shadow-sm border border-obsidian-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Project Cards Grid with Animated Stagger & Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ 
                  duration: 0.6, 
                  delay: idx * 0.12, 
                  ease: [0.21, 0.47, 0.32, 0.98] 
                }}
                className="bg-obsidian-850 border border-obsidian-750/80 hover:border-emerald-500/50 rounded-2xl overflow-hidden transition-colors duration-300 flex flex-col group shadow-xl"
              >
                {/* Media Slot */}
                <div className="relative aspect-[16/10] overflow-hidden bg-obsidian-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian-900 via-obsidian-900/30 to-transparent" />
                  
                  {/* Floating Category & Status */}
                  <div className="absolute top-4 left-4 flex items-center gap-2 text-[11px] font-mono bg-obsidian-950/85 backdrop-blur-md px-3 py-1 rounded border border-obsidian-700 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400">{project.category}</span>
                    <span className="text-slate-600" aria-hidden="true">·</span>
                    <span className="text-slate-400">{project.status}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white mb-2 group-hover:text-emerald-300 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm font-medium text-emerald-400/90 mb-4">
                      {project.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                      {project.overview}
                    </p>

                    {/* Unboxed Metadata Discipline */}
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-xs font-mono text-slate-400 mb-6 pb-6 border-b border-obsidian-800">
                      <span className="text-slate-300">{project.role}</span>
                      <span className="text-slate-600" aria-hidden="true">·</span>
                      <span>{project.keyFeatures[0]}</span>
                    </div>
                  </div>

                  {/* Footer with Tools & Interactive Inspector CTA */}
                  <div>
                    <div className="flex flex-wrap items-center gap-1.5 mb-5">
                      {project.toolsUsed.map((tool) => (
                        <span
                          key={tool}
                          className="px-2 py-0.5 text-[11px] font-mono text-slate-300 bg-obsidian-900 border border-obsidian-750 rounded"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => onSelectProject(project)}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-slate-200 hover:text-white bg-obsidian-900 hover:bg-emerald-500/15 border border-obsidian-700 hover:border-emerald-500/40 rounded-lg transition-all group/btn"
                    >
                      <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Inspect Architecture &amp; Simulate Signal</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
