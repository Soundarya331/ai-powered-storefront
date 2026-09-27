import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CurlJourneySectionProps {
  frameSrc?: string;
  onExploreClick?: (guideType: string) => void;
  className?: string;
}

export const CurlJourneySection: React.FC<CurlJourneySectionProps> = ({
  frameSrc = '/assets/Group 12173.jpg',
  onExploreClick,
  className = '',
}) => {
  const handleExplore = (guideType: string) => {
    if (onExploreClick) {
      onExploreClick(guideType);
    } else {
      const el = document.getElementById('cgm') || document.getElementById('lineup');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="journey" className={`relative w-full bg-[#f4fcfe] overflow-hidden pb-0 mb-0 leading-none ${className}`}>
      
      {/* Top Header Section */}
      <div className="max-w-4xl mx-auto text-center py-10 sm:py-16 px-4 space-y-3">
        <div className="space-y-1">
          <span className="font-serif italic text-2xl sm:text-3xl text-slate-800 font-bold block">
            Learn & Grow
          </span>
          <img
            src="/assets/Line 33.svg"
            alt="Wavy accent line"
            className="w-24 sm:w-32 h-auto object-contain mx-auto opacity-80"
          />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900">
          Your Curly Hair <span className="text-[#00d2ff]">Journey Starts Here</span>
        </h2>

        <p className="font-serif italic text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Access expert guides, styling tips, and a community of women who celebrate their natural curls.
        </p>
      </div>

      {/* Desktop View: Full High-Res Figma Frame (Group 12173.jpg) with Clickable Overlays */}
      <div className="hidden lg:block relative w-full max-w-[1920px] mx-auto shadow-2xl">
        <img
          src={frameSrc}
          alt="Your Curly Hair Journey Starts Here - 3 Expert Guides"
          className="w-full h-auto object-cover block select-none"
        />

        {/* Interactive Clickable Hotspots for all 3 Guides */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between py-12">
          
          {/* Row 1 Hotspot (Top Right Card) */}
          <div className="w-full max-w-7xl mx-auto px-12 grid grid-cols-12 h-1/3 items-center">
            <div className="col-start-7 col-span-5 pointer-events-auto text-white space-y-2 pt-16">
              <button
                onClick={() => handleExplore('CGM Guide 1')}
                className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-white hover:text-[#00d2ff] transition-colors cursor-pointer group"
              >
                <span>EXPLORE NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Row 2 Hotspot (Middle Left Card) */}
          <div className="w-full max-w-7xl mx-auto px-12 grid grid-cols-12 h-1/3 items-center">
            <div className="col-span-5 pointer-events-auto text-white space-y-2 pt-8">
              <button
                onClick={() => handleExplore('CGM Guide 2')}
                className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-white hover:text-[#00d2ff] transition-colors cursor-pointer group"
              >
                <span>EXPLORE NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Row 3 Hotspot (Bottom Right Card) */}
          <div className="w-full max-w-7xl mx-auto px-12 grid grid-cols-12 h-1/3 items-center">
            <div className="col-start-7 col-span-5 pointer-events-auto text-white space-y-2 pt-4">
              <button
                onClick={() => handleExplore('CGM Guide 3')}
                className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-white hover:text-[#00d2ff] transition-colors cursor-pointer group"
              >
                <span>EXPLORE NOW</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Tablet & Mobile Code Layout with exact matching colors */}
      <div className="lg:hidden w-full space-y-0">
        
        {/* ROW 1: Cyan Model + Periwinkle Blue Card (#5260b8) */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-[#2cd5d0] p-6 flex items-center justify-center min-h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
              alt="Curly Hair Girl with Sunglasses"
              className="h-64 object-contain filter drop-shadow-xl"
            />
          </div>
          <div className="bg-[#5260b8] text-white p-8 sm:p-12 flex flex-col justify-center space-y-4">
            <span className="font-serif italic text-lg text-purple-200 block">Expert Guide</span>
            <h3 className="text-2xl font-bold">Curly Girl Method Guide</h3>
            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
              Complete guide to the CGM with moodboards, tips, and step-by-step instructions designed specifically for Arab hair.
            </p>
            <button
              onClick={() => handleExplore('CGM Guide 1')}
              className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-white hover:text-[#00d2ff] transition-colors pt-2 cursor-pointer"
            >
              <span>EXPLORE NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ROW 2: Rich Purple Card (#78448e) + Soft Pink Model */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-[#78448e] text-white p-8 sm:p-12 flex flex-col justify-center space-y-4 order-2 md:order-1">
            <span className="font-serif italic text-lg text-purple-200 block">Expert Guide</span>
            <h3 className="text-2xl font-bold">Curly Girl Method Guide</h3>
            <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
              Complete guide to the CGM with moodboards, tips, and step-by-step instructions designed specifically for Arab hair.
            </p>
            <button
              onClick={() => handleExplore('CGM Guide 2')}
              className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-white hover:text-[#00d2ff] transition-colors pt-2 cursor-pointer"
            >
              <span>EXPLORE NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="bg-[#f5b8b8] p-6 flex items-center justify-center min-h-[300px] order-1 md:order-2">
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80"
              alt="Curly Hair Model in White Coat"
              className="h-64 object-contain filter drop-shadow-xl"
            />
          </div>
        </div>

        {/* ROW 3: Warm Yellow Model + Dark Cyan Card (#0099b8) */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="bg-[#fca311] p-6 flex items-center justify-center min-h-[300px]">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
              alt="Curly Girl with Straw Hat"
              className="h-64 object-contain filter drop-shadow-xl"
            />
          </div>
          <div className="bg-[#0099b8] text-white p-8 sm:p-12 flex flex-col justify-center space-y-4">
            <span className="font-serif italic text-lg text-cyan-200 block">Expert Guide</span>
            <h3 className="text-2xl font-bold">Curly Girl Method Guide</h3>
            <p className="text-xs sm:text-sm text-cyan-100 leading-relaxed">
              Complete guide to the CGM with moodboards, tips, and step-by-step instructions designed specifically for Arab hair.
            </p>
            <button
              onClick={() => handleExplore('CGM Guide 3')}
              className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-white hover:text-[#00d2ff] transition-colors pt-2 cursor-pointer"
            >
              <span>EXPLORE NOW</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};
