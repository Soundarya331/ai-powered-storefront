import React, { useState } from 'react';
import { Star, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  modelImage: string;
}

const COMMUNITY_REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Aisha K',
    location: 'Dubai, UAE',
    rating: 5,
    comment: 'I\'ve struggled with frizz my whole life. Hydra Curls is the first range that actually tamed my hair for more than a day! The 48-hour claim is real.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    modelImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    name: 'Fatima H',
    location: 'Riyadh, KSA',
    rating: 5,
    comment: 'Most masks weigh down my coily pattern or leave a greasy film. This mask melts right into my hair and washes clean while leaving insane hydration.',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=200&q=80',
    modelImage: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    name: 'Layan M',
    location: 'Amman, Jordan',
    rating: 5,
    comment: 'Finally a range made specifically for Arab hair textures. My waves look defined, shiny, and bouncy without needing heat tools anymore.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    modelImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80',
  },
];

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);

  const activeReview = COMMUNITY_REVIEWS[currentIndex];
  const nextReview = COMMUNITY_REVIEWS[(currentIndex + 1) % COMMUNITY_REVIEWS.length];

  const handleNext = () => {
    if (isFlipping) return;
    setFlipDirection('next');
    setIsFlipping(true);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % COMMUNITY_REVIEWS.length);
      setIsFlipping(false);
      setFlipDirection(null);
    }, 600);
  };

  const handlePrev = () => {
    if (isFlipping) return;
    setFlipDirection('prev');
    setIsFlipping(true);

    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + COMMUNITY_REVIEWS.length) % COMMUNITY_REVIEWS.length);
      setIsFlipping(false);
      setFlipDirection(null);
    }, 600);
  };

  return (
    <section className="relative w-full py-16 px-4 sm:px-8 bg-[#6cd2f0] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center [perspective:2000px]">

          {/* LEFT SIDE: Cutout Model Image */}
          <div className="lg:col-span-6 relative h-[580px] sm:h-[640px] flex items-end justify-center">
            <img
              src={activeReview.modelImage}
              alt="Model transformation"
              className="w-full h-full object-cover object-top scale-105 drop-shadow-2xl mix-blend-multiply"
            />

            {/* Center Split Handle */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/70 -translate-x-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#fca5a5] rounded-full flex items-center justify-center shadow-2xl border-2 border-white cursor-pointer hover:scale-110 transition-transform">
              <div className="flex items-center gap-0.5 text-white">
                <ChevronLeft className="w-4 h-4 stroke-[3]" />
                <ChevronRight className="w-4 h-4 stroke-[3]" />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Single Column Cards with Diagonal Gap */}
          <div className="lg:col-span-6 flex items-center gap-5 relative">

            <div className="flex-1 max-w-[460px] space-y-6">

              {/* Header Title */}
              <div className="space-y-1">
                <p className="text-white/90 font-serif italic text-base">Real Women, Real Results</p>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
                  Hear from Our <span className="text-white">Community</span>
                </h2>
              </div>

              {/* SINGLE COLUMN REVIEW CARDS CONTAINER */}
              <div className="flex flex-col gap-3">

                {/* TOP CARD: Slanted bottom edge via clip-path */}
                <div
                  className="bg-[#050B1A] text-white p-6 sm:p-7 rounded-t-2xl shadow-2xl relative"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)',
                    paddingBottom: '2.5rem'
                  }}
                >
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(activeReview.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal mb-6">
                    "{activeReview.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={activeReview.avatar}
                      alt={activeReview.name}
                      className="w-9 h-9 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white leading-none">{activeReview.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-1">{activeReview.location}</p>
                    </div>
                  </div>
                </div>

                {/* BOTTOM CARD: Slanted top edge matching top card gap */}
                <div
                  className="bg-[#050B1A] text-white p-6 sm:p-7 rounded-b-2xl shadow-2xl relative"
                  style={{
                    clipPath: 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)',
                    paddingTop: '2.5rem'
                  }}
                >
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(nextReview.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal mb-6">
                    "{nextReview.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={nextReview.avatar}
                      alt={nextReview.name}
                      className="w-9 h-9 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-white leading-none">{nextReview.name}</h4>
                      <p className="text-[10px] text-slate-400 mt-1">{nextReview.location}</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* STACKED NAVIGATION BUTTONS */}
            <div className="flex flex-col gap-3 shrink-0">
              <button
                onClick={handlePrev}
                disabled={isFlipping}
                aria-label="Previous Review"
                className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl hover:bg-slate-100 active:scale-95 transition-all disabled:opacity-50"
              >
                <ChevronUp className="w-5 h-5 stroke-[3]" />
              </button>
              <button
                onClick={handleNext}
                disabled={isFlipping}
                aria-label="Next Review"
                className="w-11 h-11 bg-white rounded-full flex items-center justify-center text-slate-900 shadow-xl hover:bg-slate-100 active:scale-95 transition-all disabled:opacity-50"
              >
                <ChevronDown className="w-5 h-5 stroke-[3]" />
              </button>
            </div>

          </div>

          {/* 3D BOOK PAGE FLIP OVERLAY */}
          {isFlipping && (
            <div
              className={`absolute inset-0 bg-[#050B1A] text-white rounded-2xl shadow-2xl z-40 pointer-events-none ${flipDirection === 'next'
                  ? 'origin-left animate-paper-flip-next'
                  : 'origin-right animate-paper-flip-prev'
                }`}
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              <div className="w-full h-full flex items-center justify-center opacity-70">
                <span className="text-sm font-semibold tracking-widest uppercase">Flipping Page...</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};