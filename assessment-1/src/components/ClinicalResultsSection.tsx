import React from 'react';
import { CLINICAL_STATS } from '../data/mockData';
import { Award } from 'lucide-react';

export const ClinicalResultsSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#f4fcfe] py-12 sm:py-18 overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00d2ff]/20 border border-[#00d2ff] rounded-full text-[#0088cc] text-xs font-extrabold uppercase tracking-widest">
            <Award className="w-4 h-4 text-[#00d2ff]" />
            <span>Proven Efficacy</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Clinically Proven <span className="text-[#00a8cc]">48-Hour Hydration</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Rigorously tested under dermatological supervision across diverse Arab hair types in high-humidity climates.
          </p>
        </div>

        {/* Live Interactive Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CLINICAL_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-cyan-100 shadow-xl space-y-3 relative overflow-hidden group hover:border-[#00d2ff] hover:shadow-cyan-500/20 transition-all transform hover:-translate-y-1"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#00d2ff]/10 to-transparent rounded-bl-full pointer-events-none" />

              <span className="text-4xl sm:text-5xl font-black text-[#00a8cc] tracking-tight group-hover:scale-105 transition-transform inline-block">
                {stat.metric}
              </span>

              <h3 className="text-lg font-bold text-slate-900">
                {stat.label}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Original Figma High-Res Visual Frame (Group 12138.jpg) */}
        <div className="bg-white rounded-3xl border border-cyan-100 p-4 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="max-w-5xl mx-auto">
            <img
              src="/assets/Group 12138.jpg"
              alt="Clinically Proven 48-Hour Hydration Visual Infographic"
              className="w-full h-auto object-contain mx-auto rounded-2xl"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
