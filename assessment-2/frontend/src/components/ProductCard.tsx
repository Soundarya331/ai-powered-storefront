import React, { useState } from 'react';
import { ShoppingCart, Check, Eye, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onBuy: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView, onBuy }) => {
  const { addToCart, updateQuantity, removeFromCart, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const cartItem = items.find((i) => i.product.id === product.id);
  const currentInCart = cartItem?.quantity || 0;
  const remainingStock = Math.max(0, Math.min(100, product.stock_quantity) - currentInCart);
  const isOutOfStock = product.stock_quantity === 0;
  const isCartFullForThis = remainingStock <= 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock || isCartFullForThis) return;
    const ok = addToCart(product, 1);
    if (ok) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1500);
    }
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={product.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500'}
          alt={product.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Floating Category Tag */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-slate-700 rounded-lg shadow-sm border border-slate-200/50">
          {product.category}
        </span>

        {/* Stock Status Pill */}
        <span
          className={`absolute top-3 right-3 px-2.5 py-1 text-[11px] font-bold rounded-lg shadow-sm backdrop-blur-md ${
            isOutOfStock
              ? 'bg-rose-500/90 text-white'
              : remainingStock <= 5
              ? 'bg-amber-500/90 text-white'
              : 'bg-emerald-500/90 text-white'
          }`}
        >
          {isOutOfStock
            ? 'Out of Stock'
            : remainingStock === 0 ? 'All available added' : remainingStock <= 5
            ? `Only ${remainingStock} left!`
            : 'In Stock'}
        </span>

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            type="button"
            className="px-3.5 py-2 bg-white/95 text-slate-800 text-xs font-semibold rounded-xl shadow-lg flex items-center gap-1.5 hover:bg-white transform translate-y-2 group-hover:translate-y-0 transition-all duration-200"
          >
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
          {product.title}
        </h3>

        <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1">
          {product.description}
        </p>

        {/* Price & Action Button */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs text-slate-400 font-medium">Price</span>
            <p className="text-lg font-bold text-slate-900">
              ${(product.price_cents / 100).toFixed(2)}
            </p>
          </div>

          {currentInCart > 0 ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-0.5 bg-slate-100 rounded-xl border border-slate-200/80 shadow-sm"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (currentInCart <= 1) {
                    removeFromCart(product.id);
                  } else {
                    updateQuantity(product.id, currentInCart - 1);
                  }
                }}
                className="min-h-11 min-w-9 p-2 rounded-l-xl text-slate-600 hover:bg-rose-100 hover:text-rose-600 transition-colors active:scale-90"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="min-w-[28px] text-center text-xs font-bold text-slate-800 tabular-nums">
                {currentInCart}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isCartFullForThis) addToCart(product, 1);
                }}
                disabled={isCartFullForThis}
                className={`min-h-11 min-w-9 p-2 rounded-r-xl transition-colors active:scale-90 ${
                  isCartFullForThis
                    ? 'text-slate-300 cursor-not-allowed'
                    : 'text-slate-600 hover:bg-emerald-100 hover:text-emerald-600'
                }`}
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              disabled={isOutOfStock || isCartFullForThis}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                justAdded
                  ? 'bg-emerald-600 text-white'
                  : isOutOfStock || isCartFullForThis
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                  : 'bg-slate-900 hover:bg-emerald-600 text-white active:scale-95'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5" />
                  {isOutOfStock ? 'Sold Out' : isCartFullForThis ? 'Max Added' : 'Add'}
                </>
              )}
            </button>
          )}
        </div>
        <p aria-live="polite" className="mt-3 text-xs text-slate-500">{currentInCart} in cart / {remainingStock} available to add</p>
        <button type="button" disabled={isOutOfStock} onClick={e => { e.stopPropagation(); onBuy(product); }}
          className="mt-3 min-h-11 w-full rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-40">
          Buy now
        </button>
      </div>
    </div>
  );
};
