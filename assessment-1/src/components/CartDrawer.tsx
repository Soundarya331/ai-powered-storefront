import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, delta: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [coupon, setCoupon] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const total = Math.max(0, subtotal - discountAmount);
  const freeShippingThreshold = 50;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const applyCoupon = () => {
    setCouponError('');
    if (coupon.trim().toUpperCase() === 'HYDRA15' || coupon.trim().toUpperCase() === 'QUIZ15' || coupon.trim().toUpperCase() === 'CURL15OFF') {
      setAppliedDiscount(15);
    } else {
      setCouponError('Invalid coupon code. Try HYDRA15');
    }
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutSuccess(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between relative animate-in slide-in-from-right duration-300">
        
        {/* Top Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-[#060b1e] text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#00d2ff]" />
            <h3 className="text-lg font-bold">Your Routine Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free Shipping Bar */}
        <div className="bg-cyan-50 p-3 px-5 border-b border-cyan-100 space-y-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span>
              {subtotal >= freeShippingThreshold ? (
                <span className="text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Free Shipping Unlocked!
                </span>
              ) : (
                `Add $${(freeShippingThreshold - subtotal).toFixed(2)} more for Free Shipping`
              )}
            </span>
            <span className="text-[10px] text-cyan-700 font-semibold">{progressToFreeShipping.toFixed(0)}%</span>
          </div>
          <div className="w-full bg-cyan-200/60 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#00d2ff] h-full rounded-full transition-all duration-300"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-3 py-12">
              <ShoppingBag className="w-16 h-16 text-cyan-200" />
              <p className="text-sm font-semibold text-slate-600">Your routine bag is empty.</p>
              <p className="text-xs text-slate-400 max-w-xs">
                Explore our 5-step collection and add products to build your 48H hydration routine!
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-[#00d2ff] text-slate-950 font-bold text-xs rounded-xl shadow-md"
              >
                Shop Collection
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-contain bg-white rounded-xl p-1 border border-slate-100"
                />

                <div className="flex-1 space-y-1">
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{item.product.name}</h4>
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="text-[10px] text-cyan-600 font-semibold">{item.product.step}</span>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-sm font-black text-slate-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>

                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white text-xs">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 font-bold"
                      >
                        -
                      </button>
                      <span className="px-2.5 font-bold text-slate-900">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Footer Order Summary */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-slate-50 space-y-4">
            
            {/* Promo Code Input */}
            <div className="space-y-1">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo code (e.g. HYDRA15)"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs uppercase font-bold focus:outline-none focus:border-[#00d2ff]"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {appliedDiscount > 0 && (
                <p className="text-[10px] text-emerald-600 font-bold">✓ 15% discount applied!</p>
              )}
              {couponError && (
                <p className="text-[10px] text-red-500 font-bold">{couponError}</p>
              )}
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount (15%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-slate-900">
                  {subtotal >= freeShippingThreshold ? 'FREE' : '$4.99'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total</span>
                <span className="text-[#0088cc]">
                  ${(total + (subtotal >= freeShippingThreshold ? 0 : 4.99)).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            {!checkoutSuccess ? (
              <button
                onClick={handleCheckout}
                className="w-full py-3.5 bg-[#00d2ff] hover:bg-[#00bee8] text-slate-950 font-extrabold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="p-3.5 bg-emerald-500 text-white font-bold text-center rounded-xl animate-in zoom-in flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>Order Placed Successfully!</span>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
