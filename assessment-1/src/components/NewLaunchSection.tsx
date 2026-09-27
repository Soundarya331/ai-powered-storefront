import React from 'react';
import { WaveDivider } from './WaveDivider';
import { ArrowRight, CheckCircle2, Droplet, Sparkles } from 'lucide-react';

interface NewLaunchSectionProps {
  logoSrc?: string;
  bottleTreeSrc?: string;
  clinicallyProvenSrc?: string;
  onExploreClick?: () => void;
  onLearnClick?: () => void;
  className?: string;
}

export const NewLaunchSection: React.FC<NewLaunchSectionProps> = ({
  logoSrc = '/assets/hero-logo-perfect.png',
  bottleTreeSrc = '/assets/bottel-tree.png',
  clinicallyProvenSrc = '/assets/clinically-proven.jpg',
  onExploreClick,
  onLearnClick,
  className = '',
}) => {
  const handleExplore = () => {
    if (onExploreClick) {
      onExploreClick();
    } else {
      const el = document.getElementById('lineup') || document.getElementById('products');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLearn = () => {
    if (onLearnClick) {
      onLearnClick();
    } else {
      const el = document.getElementById('cgm');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="new-launch" className={`relative w-full bg-[#f3fafd] overflow-hidden ${className}`}>

      {/* Top Cyan Wave Divider */}
      {/* <WaveDivider src="/assets/Rectangle 140.jpg" alt="Cyan Wave Divider" /> */}

      {/* Main Grid: Flush Right Alignment without gaps */}
      <div className="relative w-full max-w-[1920px] ml-auto pl-4 sm:pl-8 lg:pl-16 pr-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[500px] lg:min-h-[580px]">

          {/* Left Column: Content Details */}
          <div className="lg:col-span-6 space-y-6 py-8 lg:py-12 flex flex-col justify-center pr-4 sm:pr-8">

            {/* Header Cursive Tag */}
            <div className="space-y-1">
              <span className="font-serif italic text-3xl sm:text-4xl text-slate-900 font-bold block tracking-wide">
                New Launch
              </span>
              <img
                src="/assets/Line 33.svg"
                alt="Wavy underline"
                className="w-28 sm:w-36 h-auto object-contain opacity-90"
              />
            </div>

            {/* Logo */}
            <div className="py-1">
              <img
                src={logoSrc}
                alt="Parachute Advansed Hydra Curls"
                className="h-10 sm:h-14 w-auto object-contain"
              />
            </div>

            {/* Description */}
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-normal">
              Revolutionary hair care range specially designed for Arab curly, coily & wavy hair. Experience{' '}
              <span className="text-[#00a8cc] font-extrabold italic">48-hour hydration</span> with natural ingredients like Hyaluronic Acid, Coconut & Avocado.
            </p>

            {/* Pill Badges */}
            <div className="flex flex-wrap gap-3 py-1">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-cyan-200 text-xs sm:text-sm font-bold text-slate-800 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#00d2ff]" />
                No SLS, Silicones, Parabens
              </span>

              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-cyan-200 text-xs sm:text-sm font-bold text-slate-800 shadow-sm">
                <Droplet className="w-4 h-4 text-[#00d2ff]" />
                48-Hour Hydration
              </span>

              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-cyan-200 text-xs sm:text-sm font-bold text-slate-800 shadow-sm">
                <Sparkles className="w-4 h-4 text-[#00d2ff]" />
                Hair Types 2, 3, 4
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={handleExplore}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#00d2ff] hover:bg-[#00bee8] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-cyan-500/30 transition-all transform hover:scale-105 cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleLearn}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-white hover:bg-cyan-50 text-[#00a8cc] border-2 border-[#00d2ff] font-bold text-sm sm:text-base rounded-xl shadow-md transition-all transform hover:scale-105 cursor-pointer"
              >
                <span>Learn Curly Girl Method</span>
              </button>
            </div>

          </div>

          {/* Right Column: Flush Right Edge Image Asset (No Shadow, Full Container Height) */}
          <div className="lg:col-span-6 flex justify-end items-stretch h-full overflow-hidden pr-0">
            <img
              src={bottleTreeSrc}
              alt="Hydra Curls Shampoo Bottle & Palm Leaves"
              className="w-full h-full object-cover object-right block select-none"
            />
          </div>

        </div>
      </div>

      {/* Clinically Proven Section - Full Width Edge-to-Edge Coverage */}
      <div className="w-full pt-4 pb-0 px-0">
        <img
          src={clinicallyProvenSrc}
          alt="Clinically Proven 48-Hour Hydration Infographic"
          className="w-full h-auto object-cover block select-none"
        />
      </div>

    </section>
  );
};