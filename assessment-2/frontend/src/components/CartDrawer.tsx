import React, { useState, useEffect } from 'react';
import { X, Trash2, Plus, Minus, CreditCard, AlertCircle, ShoppingBag, ArrowRight, LogIn } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { GoogleSignIn } from './GoogleSignIn';

export const CartDrawer: React.FC<{ loginRequested: boolean; onDismissLogin: () => void }> = ({ loginRequested, onDismissLogin }) => {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, cartTotalCents, clearCart } =
    useCart();
  const { user, token, isLoading } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  useEffect(() => {
    if (!isCartOpen || user) setShowLoginPrompt(false);
    if (!isCartOpen || user) onDismissLogin();
    if (!isCartOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [isCartOpen, user, setIsCartOpen]);

  if (!isCartOpen) return null;

  const handleCheckout = async () => {
    setErrorMsg(null);

    // Require authentication
    if (!token || !user) {
      setShowLoginPrompt(true);
      return;
    }

    if (items.length === 0) return;

    setIsCheckingOut(true);
    try {
      const payload = items.map((i) => ({
        product_id: i.product.id,
        quantity: i.quantity,
      }));

      const res = await api.createCheckoutSession(payload, token);

      window.location.assign(res.checkout_url);
    } catch (err: any) {
      setErrorMsg(err.message || 'Checkout failed. Please check stock availability.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Shopping cart" className="fixed inset-0 z-[60] overflow-hidden bg-slate-900/60 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col overflow-y-auto border-l border-slate-200 relative">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              <h2 className="text-base font-bold text-slate-900">Your Cart</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {items.length} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3 mx-4 mt-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-500 mt-0.5" />
              <div className="flex-1">
                <p>{errorMsg}</p>

              </div>
            </div>
          )}

          {/* Item List */}
          <div className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 custom-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <ShoppingBag className="w-12 h-12 mb-3 stroke-[1.5] text-slate-300" />
                <p className="text-sm font-semibold text-slate-700">Your cart is empty</p>
                <p className="text-xs text-slate-400 mt-1">
                  Discover tech & accessories in the store and add them to your cart.
                </p>
              </div>
            ) : (
              items.map(({ product, quantity }) => {
                const isMax = quantity >= Math.min(100, product.stock_quantity);
                return (
                  <div
                    key={product.id}
                    className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-3 hover:border-slate-300 transition-colors"
                  >
                    <img
                      src={product.image_url || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100'}
                      alt={product.title}
                      className="w-10 h-10 sm:w-16 sm:h-16 rounded-xl object-cover bg-white p-1 border border-slate-200 flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-slate-900 truncate">{product.title}</h4>
                      <p className="text-xs font-semibold text-emerald-600 mt-0.5">
                        ${(product.price_cents / 100).toFixed(2)}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <div className="flex items-center border border-slate-300 bg-white rounded-lg">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            aria-label={`Decrease ${product.title} quantity`}
                            className="min-h-11 min-w-9 p-2 text-slate-600 hover:bg-slate-100 rounded-l-lg"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-800">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            disabled={isMax}
                            aria-label={`Increase ${product.title} quantity`}
                            className="min-h-11 min-w-9 p-2 text-slate-600 hover:bg-slate-100 rounded-r-lg disabled:opacity-30"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        {isMax && (
                          <span className="text-[10px] text-amber-600 font-semibold">Max stock</span>
                        )}
                      </div>
                      <p aria-live="polite" className="mt-1 text-[11px] text-slate-500">{Math.max(0, Math.min(100, product.stock_quantity) - quantity)} available to add</p>
                    </div>

                    <div className="text-right flex flex-col justify-between items-end h-16">
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <p className="text-xs font-bold text-slate-900">
                        ${((product.price_cents * quantity) / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="shrink-0 p-4 sm:p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span>${(cartTotalCents / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Estimated Shipping</span>
                  <span className="text-emerald-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Taxes (Calculated at Stripe)</span>
                  <span>$0.00</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                  <span>Total</span>
                  <span className="text-base text-emerald-600">
                    ${(cartTotalCents / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || isLoading}
                className="w-full py-3 px-4 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>Preparing Stripe Checkout...</span>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Proceed to Stripe Checkout</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>

              <div className="flex flex-wrap gap-2 justify-between text-[11px] text-slate-400">
                <button
                  onClick={clearCart}
                  className="hover:text-rose-600 underline decoration-slate-300"
                >
                  Clear Cart
                </button>
                <span>Encrypted 256-bit Stripe Test Mode</span>
              </div>
            </div>
          )}

          {/* Login Prompt Overlay */}
          {(showLoginPrompt || loginRequested) && !user && (
            <div className="absolute inset-0 overflow-y-auto bg-white/95 backdrop-blur-sm z-10 flex p-4 sm:p-6">
              <div className="m-auto w-full text-center space-y-4 max-w-xs">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Sign in or create an account</h3>
                <p className="text-sm text-slate-500">Continue with Google to buy your items. New customers get an account automatically. Your cart will be saved.</p>
                <div className="flex justify-center">
                  <GoogleSignIn />
                </div>
                <button
                  onClick={() => { setShowLoginPrompt(false); onDismissLogin(); setIsCartOpen(false); }}
                  className="text-xs text-slate-400 hover:text-slate-600 underline transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
