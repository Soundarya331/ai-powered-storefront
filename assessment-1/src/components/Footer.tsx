import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface FooterProps {
  logoSrc?: string;
  onExploreClick?: () => void;
  onLearnClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  logoSrc = '/assets/logo-header-dark.png',
  onExploreClick,
  onLearnClick,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full relative select-none mt-0 pt-0">
      
      {/* 1. NAVY BLUE WAVE DIVIDER (Overlaps directly onto CurlJourneySection with 0px gap) */}
      <div className="relative w-full overflow-hidden leading-none select-none pointer-events-none -mt-16 sm:-mt-24 md:-mt-28 lg:-mt-36 z-30">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-20 sm:h-28 md:h-36 lg:h-40 text-[#0a1738] fill-current"
        >
          <path d="M0,30 C200,80 450,0 700,60 C950,110 1100,20 1200,40 L1200,120 L0,120 Z"></path>
        </svg>
      </div>

      {/* 2. SECTION 1: JOIN THE CURLY HAIR REVOLUTION (Navy Blue Backdrop #0a1738) */}
      <div className="w-full bg-[#0a1738] text-white py-12 sm:py-20 px-4 sm:px-8 lg:px-16 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Title, Cursive Subtitle & Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              Join the Curly Hair Revolution
            </h2>

            <p className="font-serif italic text-purple-200 text-base sm:text-xl font-normal leading-relaxed">
              Transform your curly hair journey with expert guidance, premium products, and a supportive community.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleExplore}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#00d2ff] hover:bg-[#00bee8] text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg shadow-cyan-500/30 transition-all transform hover:scale-105 cursor-pointer"
              >
                <span>Explore Products</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={handleLearn}
                className="inline-flex items-center px-7 py-3.5 bg-transparent hover:bg-white/10 text-[#00d2ff] border border-[#00d2ff] font-bold text-sm sm:text-base rounded-xl transition-all transform hover:scale-105 cursor-pointer"
              >
                <span>Learn Curly Girl Method</span>
              </button>
            </div>
          </div>

          {/* Right Column: 4 Stat Metrics Grid (48h, 05, 3, 0) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-6 text-center sm:text-left">
            
            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-black text-[#00d2ff] tracking-tight block">
                48h
              </span>
              <span className="text-xs sm:text-sm text-purple-200 font-semibold block">
                Hydration
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight block">
                05
              </span>
              <span className="text-xs sm:text-sm text-purple-200 font-semibold block">
                Products
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight block">
                3
              </span>
              <span className="text-xs sm:text-sm text-purple-200 font-semibold block">
                Hair Types
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-4xl sm:text-5xl font-black text-white tracking-tight block">
                0
              </span>
              <span className="text-xs sm:text-sm text-purple-200 font-semibold block">
                Sulfates
              </span>
            </div>

          </div>

        </div>
      </div>

      {/* 3. SECTION 2: PURE BLACK FOOTER (#000000 - Pure Code, No Images Except Logo!) */}
      <div className="w-full bg-[#000000] text-white py-12 sm:py-16 px-4 sm:px-8 lg:px-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* Column 1: Logo & Statement */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-2">
              <img
                src={logoSrc}
                alt="Parachute Advansed Hydra Curls"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-sm">
              Advanced hair care specially designed for Arab curly, coily & wavy hair types 2, 3, and 4.
            </p>
          </div>

          {/* Column 2: Hair care Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">
              Hair care
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              <li>
                <button onClick={() => scrollToSection('cgm')} className="hover:text-[#00d2ff] transition-colors cursor-pointer">
                  Curly Girl Method
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('cgm')} className="hover:text-[#00d2ff] transition-colors cursor-pointer">
                  Hair Type Guide
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('cgm')} className="hover:text-[#00d2ff] transition-colors cursor-pointer">
                  Styling Tips
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('ingredients')} className="hover:text-[#00d2ff] transition-colors cursor-pointer">
                  Ingredient Benefits
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">
              Connect
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xs">
              Follow us for daily hair care tips and inspiration for your curly hair journey.
            </p>
          </div>

          {/* Column 4: Newsletter Input */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wide">
              Newsletter
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Get expert tips and exclusive offers delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="pt-1">
              <div className="flex items-center overflow-hidden rounded-xl border border-slate-800 bg-[#151515] focus-within:border-[#00d2ff]">
                <input
                  type="email"
                  required
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-transparent text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-3 bg-[#00d2ff] hover:bg-[#00bee8] text-slate-950 font-bold flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
              {subscribed && (
                <p className="text-xs text-emerald-400 font-bold mt-2">✓ Subscribed successfully!</p>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Copyright Line */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-slate-900 text-center">
          <p className="text-xs text-slate-400 font-normal">
            © 2026 Parachute Advanced Hydra Curls. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
};
