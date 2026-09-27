import React, { useState } from 'react';
import { CheckCircle2, X } from 'lucide-react';

interface HairTypeGuideProps {
  onOpenQuiz?: () => void;
}

export const HairTypeGuideSection: React.FC<HairTypeGuideProps> = ({ onOpenQuiz }) => {
  const [selectedType, setSelectedType] = useState<'wavy' | 'curly' | 'coily' | null>(null);

  const typeDetails = {
    wavy: {
      title: 'Wavy Hair (Type 2A - 2C)',
      subtitle: 'Loose S-shapes needing lightweight moisture & frizz control',
      routine: [
        'Step 1: Hydrating Shampoo - Light scalp cleanse',
        'Step 2: Hydrating Conditioner - Weightless detangle',
        'Step 4: Leave-In Cream - Scrunch for S-wave clumps',
        'Step 5: Hydra Hold Gel - Seal waves against humidity'
      ],
      tip: 'Avoid heavy butter products; focus on micro-emulsion formulas like Hyaluronic Acid.'
    },
    curly: {
      title: 'Curly Hair (Type 3A - 3C)',
      subtitle: 'Defined spiral ringlets requiring deep moisture & cast definition',
      routine: [
        'Step 1: Hydrating Shampoo - Low-lather moisture wash',
        'Step 2: Hydrating Conditioner - Deep slip detangling',
        'Step 3: Deep Mask (Weekly) - 15-minute hydration soak',
        'Step 4: Leave-In Cream - Rake & pray-hand application',
        'Step 5: Hydra Hold Gel - Scrunched gel cast builder'
      ],
      tip: 'Apply styling cream to soaking wet hair for maximum curl clumping.'
    },
    coily: {
      title: 'Coily Hair (Type 4A - 4C)',
      subtitle: 'Tight zig-zag or corkscrew coils seeking maximum elasticity & shrinkage control',
      routine: [
        'Step 1: Hydrating Shampoo - Scalp cleansing without stripping',
        'Step 2: Hydrating Conditioner - High-slip knot release',
        'Step 3: Deep Mask (Bi-weekly) - Intense lipid restoration',
        'Step 4: Leave-In Cream - Layered moisture seal',
        'Step 5: Hydra Hold Gel - Lock coil definition'
      ],
      tip: 'LOC/LCO method recommended; pair leave-in with natural oils.'
    }
  };

  return (
    <section id="cgm" className="relative w-full bg-[#dcf4fa] overflow-hidden">
      
      {/* 1. TOP CLOUD BANK GRAPHIC BACKDROP */}
      <div className="relative w-full overflow-hidden min-h-[140px] sm:min-h-[220px] lg:min-h-[260px] bg-[#dcf4fa]">
        <img
          src="/assets/fb450438-a5c3-4f1f-8684-943c13acfeaf 1.jpg"
          alt="Cloud Bank Header Background"
          className="w-full h-44 sm:h-64 lg:h-80 object-cover object-bottom opacity-95 select-none pointer-events-none block"
        />

        {/* Centered Circular Stamp Logo (logo-center.png) overlapping clouds */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20">
          <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full shadow-2xl p-1 bg-white border-2 border-cyan-100 flex items-center justify-center animate-spin-slow">
            <img
              src="/assets/logo-center.png"
              alt="Hydra Curls Circular Brand Seal"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>
      </div>

      {/* 2. SKY BLUE CONTENT AREA (#dcf4fa) WITH WHITE CURL FLOURISH DECORATION */}
      <div className="relative w-full max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-16 sm:pb-24 space-y-12">
        
        {/* Subtle White Decorative Curly Loop Flourish on Top-Left Background matching screenshot */}
        <div className="absolute top-8 left-4 sm:left-16 opacity-40 pointer-events-none select-none z-0">
          <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 70 C 10 30, 50 10, 70 40 C 85 65, 45 85, 30 50 C 20 25, 60 25, 75 45" stroke="white" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Header matching screenshot */}
        <div className="relative z-10 text-center max-w-3xl mx-auto space-y-3">
          
          <div className="space-y-1">
            <span className="font-serif italic text-2xl sm:text-3xl text-slate-800 font-bold block">
              Designed for You
            </span>
            <img
              src="/assets/Line 33.svg"
              alt="Wavy underline accent"
              className="w-24 sm:w-32 h-auto object-contain mx-auto opacity-80"
            />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
            Perfect for Arab <span className="text-[#00d2ff]">Curly, Coily & Wavy Hair</span>
          </h2>

          <p className="font-serif italic text-slate-700 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            One range is specifically formulated to meet the unique needs of Arab hair textures, providing targeted care for types 2, 3, and 4.
          </p>
        </div>

        {/* 3 Hair Type Cards Grid (Component 15, Component 16, Component 17) */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          
          {/* Card 1: Wavy */}
          <div
            onClick={() => setSelectedType('wavy')}
            className="group rounded-3xl overflow-hidden shadow-2xl border-2 border-white relative cursor-pointer transform hover:-translate-y-2 transition-all bg-white"
          >
            <div className="relative overflow-hidden">
              <img
                src="/assets/Component 15.jpg"
                alt="Wavy Hair Type - Component 15"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="px-4 py-2 bg-[#00d2ff] text-slate-950 font-extrabold text-xs rounded-xl shadow-md">
                  View Wavy Regimen
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Curly */}
          <div
            onClick={() => setSelectedType('curly')}
            className="group rounded-3xl overflow-hidden shadow-2xl border-2 border-white relative cursor-pointer transform hover:-translate-y-2 transition-all bg-white"
          >
            <div className="relative overflow-hidden">
              <img
                src="/assets/Component 16.jpg"
                alt="Curly Hair Type - Component 16"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="px-4 py-2 bg-[#00d2ff] text-slate-950 font-extrabold text-xs rounded-xl shadow-md">
                  View Curly Regimen
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Coily */}
          <div
            onClick={() => setSelectedType('coily')}
            className="group rounded-3xl overflow-hidden shadow-2xl border-2 border-white relative cursor-pointer transform hover:-translate-y-2 transition-all bg-white"
          >
            <div className="relative overflow-hidden">
              <img
                src="/assets/Component 17.jpg"
                alt="Coily Hair Type - Component 17"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500 block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <span className="px-4 py-2 bg-[#00d2ff] text-slate-950 font-extrabold text-xs rounded-xl shadow-md">
                  View Coily Regimen
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 3. BOTTOM CYAN WAVE TRANSITION DIVIDER */}
      <div className="w-full overflow-hidden leading-none select-none pointer-events-none -mb-1 shrink-0">
        <img
          src="/assets/Rectangle 140.jpg"
          alt="Bottom Wave Transition"
          className="w-full h-auto object-cover rotate-180 opacity-90 min-h-[35px] sm:min-h-[55px]"
        />
      </div>

      {/* Hair Type Regimen Modal */}
      {selectedType && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedType(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold text-[#0088cc] uppercase tracking-wider">Recommended Regimen</span>
              <h4 className="text-2xl font-bold text-slate-900">{typeDetails[selectedType].title}</h4>
              <p className="text-xs text-slate-500">{typeDetails[selectedType].subtitle}</p>
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">Step-by-Step Instructions:</span>
              <ul className="space-y-2 text-xs text-slate-700">
                {typeDetails[selectedType].routine.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 p-2 bg-slate-50 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-[#00d2ff] shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
              <strong>Stylist Tip:</strong> {typeDetails[selectedType].tip}
            </div>

            <button
              onClick={() => setSelectedType(null)}
              className="w-full py-3 bg-[#00d2ff] hover:bg-[#00bee8] text-white font-bold rounded-xl shadow-md"
            >
              Close Routine
            </button>
          </div>
        </div>
      )}

    </section>
  );
};

