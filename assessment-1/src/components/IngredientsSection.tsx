import React, { useState } from 'react';
import { INGREDIENTS } from '../data/mockData';
import { Ingredient } from '../types';
import { Droplet, Sparkles, ShieldCheck, ArrowRight, Info, X } from 'lucide-react';

export const IngredientsSection: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Droplet':
        return <Droplet className="w-6 h-6 text-[#00d2ff]" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-purple-600" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-emerald-500" />;
    }
  };

  return (
    <section id="ingredients" className="relative w-full bg-[#f4fcfe] py-12 sm:py-20 overflow-hidden">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00d2ff]/20 border border-[#00d2ff] rounded-full text-[#0088cc] text-xs font-extrabold uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-[#00d2ff]" />
            <span>Pure & Effective</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Powered by Nature's <span className="text-[#00a8cc]">Best Ingredients</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Carefully curated active ingredients that nourish dry scalps and revive thirsty curl cuticles without harsh sulfates or silicones.
          </p>
        </div>

        {/* Interactive 3-Card Ingredient Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INGREDIENTS.map((ing) => (
            <div
              key={ing.id}
              className="bg-white rounded-3xl p-8 border border-cyan-100 shadow-xl flex flex-col justify-between hover:border-[#00d2ff] hover:shadow-cyan-500/20 transition-all transform hover:-translate-y-1.5 group"
            >
              <div className="space-y-4">
                <div className="p-3 bg-cyan-50 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                  {getIcon(ing.icon)}
                </div>

                <div>
                  <span className="text-xs font-bold text-[#00a8cc] uppercase tracking-wider">
                    {ing.subtitle}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {ing.name}
                  </h3>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">
                  {ing.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100">
                <button
                  onClick={() => setSelectedIngredient(ing)}
                  className="w-full py-3 px-4 bg-cyan-50 hover:bg-[#00d2ff] text-[#0088cc] hover:text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 group/btn cursor-pointer"
                >
                  <Info className="w-4 h-4" />
                  <span>View Scientific Facts</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Original High-Res Figma Artwork (Frame 12.jpg) */}
        <div className="rounded-3xl overflow-hidden shadow-xl border border-cyan-100 bg-white">
          <img
            src="/assets/Frame 12.jpg"
            alt="Powered by Nature's Best Ingredients - Visual Overview"
            className="w-full h-auto object-cover block"
          />
        </div>

      </div>

      {/* Ingredient Scientific Fact Modal */}
      {selectedIngredient && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedIngredient(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center gap-3">
              <div className="p-3.5 bg-cyan-50 rounded-2xl">
                {getIcon(selectedIngredient.icon)}
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">{selectedIngredient.name}</h4>
                <p className="text-xs text-[#0088cc] font-semibold">{selectedIngredient.subtitle}</p>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedIngredient.description}
            </p>

            <div className="p-4 bg-cyan-50 rounded-2xl border border-cyan-100 space-y-2">
              <span className="text-xs font-bold text-[#0088cc] uppercase tracking-wider block">Clinical Benefits:</span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {selectedIngredient.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00d2ff]" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 bg-purple-50 rounded-2xl border border-purple-100 flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <p className="text-xs text-purple-900 leading-normal italic font-medium">
                <strong className="not-italic">Scientific Fact:</strong> {selectedIngredient.scientificFact}
              </p>
            </div>

            <button
              onClick={() => setSelectedIngredient(null)}
              className="w-full py-3 bg-[#00d2ff] hover:bg-[#00bee8] text-white font-bold rounded-xl shadow-md"
            >
              Close Explorer
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
