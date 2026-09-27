import React from 'react';
import { Star, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface LineupSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const LineupSection: React.FC<LineupSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  return (
    <section id="lineup" className="relative w-full bg-[#3d0f5e] py-12 sm:py-20 overflow-hidden text-white">
      
      {/* Background ambient glowing shapes */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#00d2ff]/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative max-w-[1720px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00d2ff]/20 border border-[#00d2ff]/50 rounded-full text-[#00d2ff] text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete 5-Step Hydration Routine</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            48-Hour Hydration <span className="text-[#00d2ff]">Full Lineup</span>
          </h2>

          <p className="text-purple-200 text-sm sm:text-base leading-relaxed">
            Every step is synergistically formulated to cleanse, detangle, nourish, define, and lock in moisture for bouncy, healthy Arab curls.
          </p>
        </div>

        {/* Responsive Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-5 flex flex-col justify-between hover:border-[#00d2ff] hover:shadow-[0_10px_30px_rgba(0,210,255,0.3)] transition-all transform hover:-translate-y-1.5 group relative"
            >
              {/* Top Step Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-extrabold bg-[#00d2ff] text-slate-950 px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {product.step}
                </span>
                <span className="text-xs font-semibold text-purple-200">
                  {product.size}
                </span>
              </div>

              {/* Product Image Container */}
              <div 
                onClick={() => onSelectProduct(product)}
                className="relative w-full h-48 sm:h-52 bg-white/5 rounded-2xl p-4 flex items-center justify-center cursor-pointer overflow-hidden group/img mb-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full object-contain filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)] group-hover/img:scale-110 transition-transform duration-300"
                />

                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(product);
                  }}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center text-white gap-1.5 text-xs font-bold transition-opacity backdrop-blur-xs"
                >
                  <Eye className="w-4 h-4 text-[#00d2ff]" />
                  <span>Quick View</span>
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-purple-300 font-normal">({product.reviewsCount})</span>
                  </div>

                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="text-base font-bold text-white group-hover:text-[#00d2ff] transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-purple-200 line-clamp-2 mt-1">
                    {product.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-lg font-black text-[#00d2ff]">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-purple-300 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#00d2ff]" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="w-full py-2 px-3 bg-[#00d2ff] hover:bg-[#00bee8] text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer transform active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
