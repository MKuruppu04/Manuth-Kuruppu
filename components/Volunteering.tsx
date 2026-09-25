import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Users, Calendar, CheckCircle2, ChevronRight, Globe, Database, Radio } from 'lucide-react';
import { VOLUNTEERING_ROLES } from '../constants';

export const Volunteering: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'IEEE' | 'Department' | 'Community & Database'>('all');

  const filteredRoles = activeFilter === 'all'
    ? VOLUNTEERING_ROLES
    : VOLUNTEERING_ROLES.filter(r => r.category === activeFilter);

  return (
    <section id="volunteering" className="py-24 border-t border-obsidian-800 bg-obsidian-900 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-obsidian-800 gap-6"
        >
          <div>
            <div className="text-xs font-mono text-emerald-400 mb-2 uppercase tracking-wider">
              Leadership &amp; Institutional Service
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
              Volunteering &amp; Technical Public Relations
            </h2>
          </div>

          {/* Segmented Filter Controls */}
          <div className="flex items-center gap-1.5 p-1 bg-obsidian-950 border border-obsidian-800 rounded-lg overflow-x-auto max-w-full">
            {(['all', 'IEEE', 'Department', 'Community & Database'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeFilter === cat
                    ? 'bg-obsidian-800 text-emerald-300 shadow-sm border border-obsidian-700'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Roles' : cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Roles Grid (3-column layout) with Motion */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredRoles.map((role, idx) => (
              <motion.div
                key={role.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ 
                  duration: 0.55, 
                  delay: idx * 0.08, 
                  ease: [0.21, 0.47, 0.32, 0.98] 
                }}
                className="bg-obsidian-850/80 border border-obsidian-750/90 hover:border-emerald-500/40 rounded-xl p-6 transition-colors duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  {/* Unboxed Metadata Line (NO PILLS) */}
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-3 pb-3 border-b border-obsidian-800">
                    <span className="text-emerald-400 font-medium">{role.category}</span>
                    <span className="text-slate-500" aria-hidden="true">·</span>
                    <span>{role.period}</span>
                  </div>

                  {/* Organization & Initiative */}
                  <div className="text-xs text-slate-400 mb-1">
                    {role.organization}
                  </div>
                  
                  <h3 className="text-lg font-bold font-display text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {role.initiative}
                  </h3>

                  {/* Role Designation */}
                  <div className="text-xs font-semibold text-emerald-400 mb-4">
                    {role.role}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-5">
                    {role.description}
                  </p>
                </div>

                {/* Highlights List */}
                <div className="pt-4 border-t border-obsidian-800">
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2.5">
                    Key Responsibilities &amp; Impact
                  </div>
                  <ul className="space-y-2 text-xs text-slate-400">
                    {role.highlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5">•</span>
                        <span className="leading-snug text-slate-300">{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Volunteering;
