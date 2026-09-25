import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Copy, Check, Send, MapPin, ArrowUpRight, MessageSquare } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../constants';

export const Contact: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    subjectCategory: 'Biomedical Collaboration',
    message: ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.senderName || !formData.senderEmail || !formData.message) return;

    // Trigger mailto link with encoded message
    const subject = encodeURIComponent(`[Portfolio Contact: ${formData.subjectCategory}] from ${formData.senderName}`);
    const body = encodeURIComponent(
      `Hello Manuth,\n\n${formData.message}\n\nFrom: ${formData.senderName}\nEmail: ${formData.senderEmail}\nInterest: ${formData.subjectCategory}`
    );
    
    setFormSubmitted(true);
    
    // Also open mail client
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-24 border-t border-obsidian-800 bg-obsidian-900 relative">
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
              Communication &amp; Inquiries
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold font-display tracking-tight text-white">
              Get In Touch
            </h2>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-mono text-slate-400">
            Colombo, Sri Lanka · Open for Research &amp; Industry Collaborations
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Affordances */}
          <motion.div 
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 space-y-6"
          >
            <p className="text-sm text-slate-300 leading-relaxed">
              Whether you are looking to collaborate on biomedical instrumentation projects, discuss IEEE EMBS initiatives, or explore research opportunities, I welcome your message.
            </p>

            {/* Email Card with 1-Click Copy */}
            <div className="bg-obsidian-850 border border-obsidian-750 rounded-xl p-5 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Mail className="w-3.5 h-3.5" />
                  <span>DIRECT EMAIL</span>
                </span>
                <span>Fastest Response</span>
              </div>
              
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-sm sm:text-base font-semibold text-slate-100 hover:text-emerald-400 transition-colors truncate"
                >
                  {PERSONAL_INFO.email}
                </a>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 text-slate-400 hover:text-white bg-obsidian-800 hover:bg-obsidian-750 border border-obsidian-700 rounded-lg transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copiedEmail && (
                <div className="text-[11px] font-mono text-emerald-400 mt-2">
                  ✓ Copied {PERSONAL_INFO.email} to clipboard!
                </div>
              )}
            </div>

            {/* Phone Card */}
            <div className="bg-obsidian-850 border border-obsidian-750 rounded-xl p-5 hover:border-emerald-500/40 transition-colors">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <Phone className="w-3.5 h-3.5" />
                  <span>PHONE / WHATSAPP</span>
                </span>
                <span>Voice &amp; Messaging</span>
              </div>
              
              <div className="flex items-center justify-between gap-3">
                <a
                  href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                  className="text-sm sm:text-base font-semibold text-slate-100 hover:text-emerald-400 transition-colors tabular-nums"
                >
                  {PERSONAL_INFO.phone}
                </a>

                <button
                  onClick={handleCopyPhone}
                  className="p-2 text-slate-400 hover:text-white bg-obsidian-800 hover:bg-obsidian-750 border border-obsidian-700 rounded-lg transition-colors shrink-0"
                  title="Copy phone to clipboard"
                  aria-label="Copy phone number"
                >
                  {copiedPhone ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
              {copiedPhone && (
                <div className="text-[11px] font-mono text-emerald-400 mt-2">
                  ✓ Copied {PERSONAL_INFO.phone} to clipboard!
                </div>
              )}
            </div>

            {/* Professional Profiles */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-obsidian-850 border border-obsidian-750 hover:border-emerald-500/50 p-4 rounded-xl flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <LinkedinIcon className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300">
                    LinkedIn
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-obsidian-850 border border-obsidian-750 hover:border-emerald-500/50 p-4 rounded-xl flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <GithubIcon className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300">
                    GitHub
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Location & Academic Base */}
            <div className="p-4 rounded-xl border border-obsidian-800 bg-obsidian-950/70 text-xs font-mono text-slate-400 flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Dept. of Electronic &amp; Telecommunication / BME, University of Moratuwa</span>
            </div>

          </motion.div>

          {/* Right Column: Contact Message Form */}
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 bg-obsidian-850 border border-obsidian-750 rounded-2xl p-6 sm:p-8 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-obsidian-800">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <MessageSquare className="w-4 h-4" />
                <span className="uppercase">Direct Dispatch Message</span>
              </div>
              <span className="text-xs text-slate-400">Response within 24 hrs</span>
            </div>

            {formSubmitted ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display text-white">Message Prepared &amp; Dispatched</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Thank you, {formData.senderName}. Your mail client should be opened with your message to {PERSONAL_INFO.email}. You can also email Manuth directly at {PERSONAL_INFO.email}.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({
                      senderName: '',
                      senderEmail: '',
                      subjectCategory: 'Biomedical Collaboration',
                      message: ''
                    });
                  }}
                  className="mt-4 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white border border-obsidian-700 rounded-md bg-obsidian-800"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Silva / John Doe"
                      value={formData.senderName}
                      onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                      className="w-full bg-obsidian-900 border border-obsidian-750 focus:border-emerald-500 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-2">
                      Your Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. name@organization.com"
                      value={formData.senderEmail}
                      onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                      className="w-full bg-obsidian-900 border border-obsidian-750 focus:border-emerald-500 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    Inquiry Subject Category
                  </label>
                  <select
                    value={formData.subjectCategory}
                    onChange={(e) => setFormData({ ...formData, subjectCategory: e.target.value })}
                    className="w-full bg-obsidian-900 border border-obsidian-750 focus:border-emerald-500 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                  >
                    <option value="Biomedical Hardware Collaboration">Biomedical Hardware &amp; Circuit Collaboration</option>
                    <option value="IEEE EMBS / Scholarverse Discussion">IEEE EMBS / Scholarverse Discussion</option>
                    <option value="Research Internship or Laboratory Project">Research Internship or Laboratory Project</option>
                    <option value="Spectra / MedEx PR Inquiries">Spectra / MedEx PR Inquiries</option>
                    <option value="General Engineering Query">General Engineering Query</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-2">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your inquiry, proposed collaboration, or project scope..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-obsidian-900 border border-obsidian-750 focus:border-emerald-500 rounded-lg p-3.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 text-xs sm:text-sm font-semibold text-obsidian-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-md shadow-emerald-500/15"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Direct Inquiry to Manuth</span>
                </button>
              </form>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Contact;
