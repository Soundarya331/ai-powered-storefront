import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => boolean;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => boolean;
  clearCart: () => void;
  cartTotalCents: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('novastore_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemsRef = useRef(items);
  const commitItems = (next: CartItem[]) => {
    itemsRef.current = next;
    setItems(next);
  };

  useEffect(() => {
    try { localStorage.setItem('novastore_cart', JSON.stringify(items)); } catch { /* Storage may be disabled. */ }
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1): boolean => {
    const previous = itemsRef.current;
    const existing = previous.find(i => i.product.id === product.id);
    const nextQuantity = (existing?.quantity || 0) + quantity;
    if (!Number.isInteger(quantity) || quantity <= 0 || nextQuantity > Math.min(100, product.stock_quantity)) return false;
    commitItems(existing
      ? previous.map(i => i.product.id === product.id ? { product, quantity: nextQuantity } : i)
      : [...previous, { product, quantity }]);
    return true;
  };

  const removeFromCart = (productId: number) => {
    commitItems(itemsRef.current.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number): boolean => {
    if (!Number.isInteger(quantity) || quantity < 0) return false;
    if (quantity === 0) {
      removeFromCart(productId);
      return true;
    }

    const item = itemsRef.current.find(i => i.product.id === productId);
    if (!item || quantity > Math.min(100, item.product.stock_quantity)) return false;
    commitItems(itemsRef.current.map(i => i.product.id === productId ? { ...i, quantity } : i));
    return true;
  };

  const clearCart = () => commitItems([]);

  const cartTotalCents = items.reduce(
    (sum, item) => sum + item.product.price_cents * item.quantity,
    0
  );

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotalCents,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
