import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../constants';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 border-t border-obsidian-800 bg-obsidian-950 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand & Academic Affiliation */}
        <div className="text-center sm:text-left">
          <div className="text-sm font-bold font-display text-white mb-1">
            {PERSONAL_INFO.preferredName}
          </div>
          <div className="font-mono text-slate-400">
            {PERSONAL_INFO.name} · BME Undergraduate (24th Batch), University of Moratuwa
          </div>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex items-center gap-5">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="hover:text-emerald-400 transition-colors"
            aria-label="Email Address"
          >
            <Mail className="w-4 h-4" />
          </a>

          <span className="text-obsidian-750" aria-hidden="true">|</span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
