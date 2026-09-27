import React from 'react';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onBuy: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onBuy }) => {
  const { addToCart, updateQuantity, items } = useCart();
  if (!product) return null;
  const quantity = items.find(item => item.product.id === product.id)?.quantity || 0;
  const available = Math.max(0, Math.min(100, product.stock_quantity) - quantity);
  return (
    <div role="dialog" aria-modal="true" aria-label={product.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-3 sm:p-6 backdrop-blur-sm">
      <div className="relative max-h-[90dvh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <button onClick={onClose} aria-label="Close product details"
          className="absolute right-3 top-3 z-10 rounded-full bg-white p-3 text-slate-700 shadow"><X className="h-5 w-5" /></button>
        <div className="grid md:grid-cols-2">
          <img src={product.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'}
            alt={product.title} className="h-56 w-full bg-slate-100 object-cover sm:h-72 md:h-full md:min-h-96" />
          <div className="min-w-0 p-5 sm:p-7">
            <p className="text-xs font-semibold text-emerald-700">{product.category}</p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">{product.title}</h2>
            <p className="mt-3 text-2xl font-bold text-emerald-600">${(product.price_cents / 100).toFixed(2)}</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">{product.description}</p>
            <p className="mt-5 text-sm text-slate-600">{product.stock_quantity} units in stock</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center rounded-xl border border-slate-200">
                <button aria-label="Decrease quantity" disabled={quantity === 0} onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="min-h-11 min-w-11 rounded-l-xl p-3 hover:bg-slate-100 disabled:opacity-30"><Minus className="h-4 w-4" /></button>
                <span aria-label="Cart quantity" className="min-w-8 text-center font-semibold">{quantity}</span>
                <button aria-label="Increase quantity" disabled={available === 0} onClick={() => addToCart(product)}
                  className="min-h-11 min-w-11 rounded-r-xl p-3 hover:bg-slate-100 disabled:opacity-30"><Plus className="h-4 w-4" /></button>
              </div>
              <p aria-live="polite" className="text-xs text-slate-500">{quantity} in cart / {available} available to add</p>
            </div>
            {quantity === 0 && <button disabled={available === 0} onClick={() => addToCart(product)}
              className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 p-3 text-sm font-semibold disabled:opacity-40">
              <ShoppingCart className="h-4 w-4" />{available === 0 ? 'Sold out' : 'Add to cart'}
            </button>}
            <button disabled={product.stock_quantity === 0} onClick={() => onBuy(product)}
              className="mt-3 min-h-11 w-full rounded-xl bg-emerald-600 p-3 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-40">Buy now</button>
          </div>
        </div>
      </div>
    </div>
  );
};
