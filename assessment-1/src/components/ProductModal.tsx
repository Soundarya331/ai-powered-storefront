import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, Droplet } from 'lucide-react';
import { Product } from '../types';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Image */}
          <div className="bg-cyan-50/50 rounded-2xl p-6 flex items-center justify-center border border-cyan-100 min-h-[260px]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-64 object-contain filter drop-shadow-xl"
            />
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div>
              <span className="text-xs font-extrabold bg-[#00d2ff] text-slate-950 px-2.5 py-1 rounded-full uppercase tracking-wider inline-block mb-2">
                {product.step}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {product.name}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{product.subtitle}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-black text-[#0088cc]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs font-semibold text-slate-400">| {product.size}</span>
            </div>

            <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{product.rating}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount} verified reviews)</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

        </div>

        {/* Benefits & Key Ingredients */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
            <span className="font-bold text-slate-900 uppercase tracking-wider block">Key Benefits</span>
            <ul className="space-y-1.5 text-slate-600">
              {product.benefits.map((b, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#00d2ff] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-cyan-50/50 rounded-2xl border border-cyan-100 space-y-2">
            <span className="font-bold text-[#0088cc] uppercase tracking-wider block">Key Active Ingredients</span>
            <ul className="space-y-1.5 text-slate-700 font-medium">
              {product.keyIngredients.map((ing, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Droplet className="w-3.5 h-3.5 text-[#00d2ff] shrink-0" />
                  <span>{ing}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quantity & Add to Cart Controls */}
        <div className="flex items-center gap-4 pt-2">
          <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3.5 py-2.5 text-slate-600 hover:bg-slate-200 font-bold"
            >
              -
            </button>
            <span className="px-4 py-2.5 font-bold text-slate-900 text-sm">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3.5 py-2.5 text-slate-600 hover:bg-slate-200 font-bold"
            >
              +
            </button>
          </div>

          <button
            onClick={() => {
              onAddToCart(product, quantity);
              onClose();
            }}
            className="flex-1 py-3.5 bg-[#00d2ff] hover:bg-[#00bee8] text-slate-950 font-extrabold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
