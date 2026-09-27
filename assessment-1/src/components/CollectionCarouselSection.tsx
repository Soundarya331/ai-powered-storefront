import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';

interface CollectionCarouselSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const CollectionCarouselSection: React.FC<CollectionCarouselSectionProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const currentProduct = products[currentIndex];

  return (
    <section id="collection" className="relative py-16 sm:py-24 bg-gradient-to-b from-[#f4fcfe] via-white to-[#f4fcfe] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="relative bg-gradient-to-b from-[#490d79] to-[#2b0349] text-white rounded-[40px] p-6 sm:p-12 md:p-16 shadow-2xl overflow-hidden text-center border border-purple-800">
          
          {/* Ambient Purple Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00d2ff]/15 rounded-full filter blur-3xl pointer-events-none" />

          {/* Slogan Curved Text Asset (Group.jpg) */}
          <div className="max-w-xl mx-auto mb-6">
            <img
              src="/assets/Group.jpg"
              alt="Experience the power of hydration in every drop."
              className="w-full max-w-sm sm:max-w-md h-auto mx-auto brightness-200 invert filter drop-shadow-[0_0_10px_#00d2ff]"
            />
          </div>

          <div className="max-w-xl mx-auto space-y-2 mb-8">
            <span className="text-xs uppercase tracking-widest text-[#00d2ff] font-bold">
              {currentProduct.tag}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif italic text-white tracking-tight">
              {currentProduct.name}
            </h2>
            <p className="text-xs sm:text-sm text-purple-200 max-w-md mx-auto">
              {currentProduct.subtitle}
            </p>
          </div>

          {/* Carousel Interactive Stage */}
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 my-8 max-w-4xl mx-auto">
            
            {/* Prev Arrow */}
            <button
              onClick={prevProduct}
              className="absolute left-2 sm:left-4 md:-left-6 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-xl transition-all transform hover:scale-110 cursor-pointer"
              aria-label="Previous Product"
            >
              <ChevronLeft className="w-6 h-6 text-[#00d2ff]" />
            </button>

            {/* Product Card Container */}
            <div className="w-64 sm:w-72 bg-white/10 border border-white/20 rounded-3xl p-6 flex flex-col items-center justify-center backdrop-blur-md shadow-2xl relative group">
              <span className="absolute top-3 right-3 text-[10px] bg-[#00d2ff] text-slate-950 font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                {currentProduct.step}
              </span>

              <div 
                onClick={() => onSelectProduct(currentProduct)}
                className="w-full h-52 sm:h-60 flex items-center justify-center cursor-pointer overflow-hidden my-2"
              >
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="h-full object-contain filter drop-shadow-[0_15px_20px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="w-full pt-3 border-t border-white/10 text-center space-y-2">
                <div className="flex items-center justify-center gap-1 text-amber-400 text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{currentProduct.rating}</span>
                  <span className="text-purple-200 font-normal">({currentProduct.reviewsCount})</span>
                </div>
                
                <p className="text-lg font-black text-[#00d2ff]">
                  ${currentProduct.price.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Product Details Highlights side panel on larger screens */}
            <div className="hidden md:flex flex-col text-left space-y-4 max-w-xs bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-sm">
              <h4 className="text-xs font-extrabold uppercase text-[#00d2ff] tracking-wider">Key Benefits</h4>
              <ul className="space-y-2 text-xs text-purple-100">
                {currentProduct.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#00d2ff] shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 flex items-center gap-2">
                <button
                  onClick={() => onSelectProduct(currentProduct)}
                  className="flex-1 py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#00d2ff]" />
                  <span>View Details</span>
                </button>

                <button
                  onClick={() => onAddToCart(currentProduct)}
                  className="flex-1 py-2.5 px-3 bg-[#00d2ff] hover:bg-[#00bee8] text-slate-950 font-extrabold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>

            {/* Next Arrow */}
            <button
              onClick={nextProduct}
              className="absolute right-2 sm:right-4 md:-right-6 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center text-white shadow-xl transition-all transform hover:scale-110 cursor-pointer"
              aria-label="Next Product"
            >
              <ChevronRight className="w-6 h-6 text-[#00d2ff]" />
            </button>
          </div>

          {/* Circular Product Selector Pills */}
          <div className="flex justify-center items-center gap-3 pt-4">
            {products.map((prod, idx) => (
              <button
                key={prod.id}
                onClick={() => setCurrentIndex(idx)}
                className={`w-11 h-11 rounded-full border-2 transition-all overflow-hidden flex items-center justify-center cursor-pointer p-0.5 bg-white/10 ${
                  currentIndex === idx
                    ? 'border-[#00d2ff] ring-4 ring-[#00d2ff]/30 scale-110 shadow-[0_0_15px_#00d2ff]'
                    : 'border-white/30 opacity-60 hover:opacity-100'
                }`}
                title={prod.name}
              >
                <img src={prod.image} alt={prod.name} className="w-full h-full object-contain rounded-full" />
              </button>
            ))}
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center justify-center gap-3 pt-6 max-w-xs mx-auto">
            <button
              onClick={() => onSelectProduct(currentProduct)}
              className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20"
            >
              Details
            </button>
            <button
              onClick={() => onAddToCart(currentProduct)}
              className="flex-1 py-3 bg-[#00d2ff] hover:bg-[#00bee8] text-slate-950 font-extrabold text-xs rounded-xl shadow-lg"
            >
              Add to Bag
            </button>
          </div>

          {/* Cursive Sweeping Slogan */}
          <p className="mt-10 text-xl sm:text-2xl font-serif italic text-purple-200 drop-shadow-sm">
            Experience the power of hydration in every drop.
          </p>
        </div>

      </div>
    </section>
  );
};
