import React, { useState } from 'react';
import { ArrowRight, X, Droplet } from 'lucide-react';

export const FeatureCardsSection: React.FC = () => {
  const [scienceModalOpen, setScienceModalOpen] = useState(false);

  return (
    <section className="relative w-full bg-white pt-6 pb-12 overflow-hidden">

      {/* Background Soft Cloud Top Divider */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-0">
        <svg
          className="relative block w-full h-10 sm:h-16 text-[#f4fcfe]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,110 350,-20 500,70 C650,160 900,0 1200,60 L1200,0 L0,0 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="w-full max-w-[1920px] mx-auto px-0 relative z-10">

        {/* Two Side-by-Side Responsive Cards - Flush Layout with Zero Margin Gaps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-stretch">

          {/* LEFT CARD: Science Card */}
          <div className="relative overflow-hidden bg-[#e0f7fc] p-8 sm:p-14 lg:p-16 flex flex-col justify-between min-h-[520px] sm:min-h-[580px] shadow-sm">

            {/* Top White Wavy Border (4 Deep Waves) */}
            <div className="absolute top-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none z-10">
              <svg
                className="w-full h-16 sm:h-24 text-white"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 C150,90 150,-10 300,50 C450,110 450,-10 600,50 C750,110 750,-10 900,50 C1050,110 1050,-10 1200,50 L1200,0 L0,0 Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Pattern Backdrop */}
            <div className="absolute inset-0 opacity-15 mix-blend-multiply pointer-events-none bg-[radial-gradient(#00a8cc_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Content */}
            <div className="relative z-20 space-y-6 pt-10 sm:pt-12">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Lorem Ipsum
              </h3>

              <p className="text-slate-800 text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-2xl">
                Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand. Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand. Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand.
              </p>

              <div className="pt-3">
                <button
                  onClick={() => setScienceModalOpen(true)}
                  className="px-8 py-4 bg-[#00d2ff] hover:bg-[#00bee8] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg transition-all flex items-center gap-2.5 cursor-pointer transform hover:scale-105"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT CARD: Products Lineup Card (Increased Image & Deeper Waves) */}
          <div className="relative overflow-hidden bg-[#e0f7fc] pt-8 sm:pt-14 lg:pt-16 px-8 sm:px-14 lg:px-16 pb-0 flex flex-col justify-between min-h-[520px] sm:min-h-[580px] shadow-sm">

            {/* Top White Wavy Border (4 Deep Waves) */}
            <div className="absolute top-0 inset-x-0 w-full overflow-hidden leading-none pointer-events-none z-10">
              <svg
                className="w-full h-16 sm:h-24 text-white"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M0,0 C150,90 150,-10 300,50 C450,110 450,-10 600,50 C750,110 750,-10 900,50 C1050,110 1050,-10 1200,50 L1200,0 L0,0 Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Pattern Backdrop */}
            <div className="absolute inset-0 opacity-15 mix-blend-multiply pointer-events-none bg-[radial-gradient(#00a8cc_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Content */}
            <div className="relative z-20 space-y-6 pt-10 sm:pt-12">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Lorem Ipsum
              </h3>

              <p className="text-slate-800 text-base sm:text-lg lg:text-xl leading-relaxed font-normal max-w-2xl">
                Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand. Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand. Hyaluronic Acid acts like a magnet for moisture, drawing hydration into each strand.
              </p>

              <div className="pt-3">
                <button
                  onClick={() => {
                    const el = document.getElementById('collection');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-[#00d2ff] hover:bg-[#00bee8] text-white font-extrabold text-sm sm:text-base rounded-2xl shadow-lg transition-all flex items-center gap-2.5 cursor-pointer transform hover:scale-105"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Larger Bottom Product Showcase (No Padding Gap at Bottom) */}
            <div className="relative z-20 pt-6 mt-auto flex justify-center leading-none">
              <img
                src="/assets/products.png"
                alt="Hydra Curls Product Range"
                className="w-full max-w-[560px] sm:max-w-[620px] lg:max-w-[680px] h-auto object-contain block  -mb-1"
              />
            </div>

          </div>

        </div>

      </div>

      {/* Science Info Modal */}
      {scienceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setScienceModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3 bg-cyan-50 text-[#00a8cc] rounded-2xl">
                <Droplet className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">How Hyaluronic Acid Works</h4>
                <p className="text-xs text-slate-500">Advanced Bio-Hydration Technology</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              Micro-encapsulated Hyaluronic Acid penetrates deep into dry, porous curls, creating a long-lasting hydration seal.
            </p>

            <button
              onClick={() => setScienceModalOpen(false)}
              className="w-full py-3 bg-[#00d2ff] hover:bg-[#00bee8] text-white font-bold rounded-xl shadow-md transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </section>
  );
};