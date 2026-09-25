import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Download, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO, PROJECTS, VOLUNTEERING_ROLES, SOFTWARE_SKILLS } from '../constants';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handlePrint = () => {
    window.print();
  };

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
        {/* Header Action Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-obsidian-800 bg-obsidian-950/80">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>CURRICULUM VITAE &amp; ACADEMIC RECORD</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-obsidian-800 hover:bg-obsidian-750 border border-obsidian-700 rounded-md transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-emerald-400" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-obsidian-800 transition-colors"
              aria-label="Close CV preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable / Rendered CV Content */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 text-slate-200">
          
          {/* Header */}
          <div className="border-b border-obsidian-800 pb-6">
            <div className="text-xs font-mono text-emerald-400 mb-1">
              {PERSONAL_INFO.name}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-white mb-2">
              {PERSONAL_INFO.preferredName}
            </h1>
            <p className="text-base text-slate-300 font-medium mb-3">
              Biomedical Engineering Undergraduate (24th Batch) · University of Moratuwa
            </p>
            
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-slate-400">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-emerald-400 flex items-center gap-1">
                <Mail className="w-3 h-3" /> {PERSONAL_INFO.email}
              </a>
              <span>·</span>
              <a href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-emerald-400 flex items-center gap-1">
                <Phone className="w-3 h-3" /> {PERSONAL_INFO.phone}
              </a>
              <span>·</span>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 flex items-center gap-1">
                <LinkedinIcon className="w-3 h-3" /> LinkedIn
              </a>
              <span>·</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 flex items-center gap-1">
                <GithubIcon className="w-3 h-3" /> GitHub
              </a>
              <span>·</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Sri Lanka
              </span>
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-4 pb-1 border-b border-obsidian-800">
              Education &amp; Academic Affiliation
            </h2>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-white">University of Moratuwa, Sri Lanka</h3>
                <div className="text-xs text-slate-300">B.Sc. (Hons) in Biomedical Engineering</div>
                <div className="text-xs text-slate-400 mt-1">
                  Department of Electronic &amp; Telecommunication Engineering / Biomedical Engineering
                </div>
              </div>
              <div className="text-right text-xs font-mono text-slate-400">
                <div>2024 – Present</div>
                <div className="text-emerald-400">24th Batch (Year 2)</div>
              </div>
            </div>
          </div>

          {/* Selected Engineering Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-4 pb-1 border-b border-obsidian-800">
              Selected Biomedical &amp; Engineering Projects
            </h2>
            <div className="space-y-5">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="text-xs">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-white">{proj.title}</h3>
                    <span className="font-mono text-slate-400">{proj.role}</span>
                  </div>
                  <div className="text-slate-400 mb-1.5">{proj.subtitle}</div>
                  <p className="text-slate-300 leading-relaxed mb-1.5">{proj.overview}</p>
                  <div className="font-mono text-slate-400">
                    <span className="text-slate-500">Tools: </span>
                    <span className="text-emerald-400">{proj.toolsUsed.join(' · ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technical & Software Skills */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-4 pb-1 border-b border-obsidian-800">
              Technical &amp; Software Proficiency
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <div className="font-semibold text-slate-200 mb-1">Electronic Design Automation (EDA) &amp; Circuits:</div>
                <div className="text-slate-400">Altium Designer (PCB Design), LTspice (Analog Simulation &amp; Active Filtering)</div>
              </div>
              <div>
                <div className="font-semibold text-slate-200 mb-1">Scientific Computing &amp; Logic:</div>
                <div className="text-slate-400">MATLAB (Biosignal DSP &amp; Kinematics), Logisim (Logic Design)</div>
              </div>
              <div>
                <div className="font-semibold text-slate-200 mb-1">Digital Synthesis (Foundational):</div>
                <div className="text-slate-400">Vivado (FPGA HDL), Quartus Prime (Intel FPGA Synthesis)</div>
              </div>
              <div>
                <div className="font-semibold text-slate-200 mb-1">Media Production &amp; PR:</div>
                <div className="text-slate-400">Adobe Premiere Pro, Adobe After Effects (Foundational), Canva</div>
              </div>
            </div>
          </div>

          {/* Leadership & Volunteering */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-4 pb-1 border-b border-obsidian-800">
              Leadership &amp; Institutional Volunteering
            </h2>
            <div className="space-y-4 text-xs">
              {VOLUNTEERING_ROLES.map((role) => (
                <div key={role.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-white">{role.organization} – {role.initiative}</h3>
                    <span className="font-mono text-slate-400">{role.period}</span>
                  </div>
                  <div className="text-emerald-400 font-medium mb-1">{role.role}</div>
                  <p className="text-slate-300 mb-1">{role.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-obsidian-800 bg-obsidian-950/80 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>Official Academic Summary · Manuth Kuruppu</span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 text-slate-300 hover:text-white bg-obsidian-800 rounded border border-obsidian-700"
          >
            Close
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default ResumeModal;
