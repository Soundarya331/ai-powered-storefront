import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { NewLaunchSection } from './components/NewLaunchSection';
import { LineupSection } from './components/LineupSection';
import { FeatureCardsSection } from './components/FeatureCardsSection';
import { CollectionCarouselSection } from './components/CollectionCarouselSection';
import { ClinicalResultsSection } from './components/ClinicalResultsSection';
import { IngredientsSection } from './components/IngredientsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { HairTypeGuideSection } from './components/HairTypeGuideSection';
import { CurlJourneySection } from './components/CurlJourneySection';
import { CurlQuizModal } from './components/CurlQuizModal';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { ProductCarouselSection } from './components/ProductCarouselSection'

import { PRODUCTS } from './data/mockData';
import { Product, CartItem } from './types';
import { CheckCircle2, ShoppingBag, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quizOpen, setQuizOpen] = useState<boolean>(false);
  const [cartOpen, setCartOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to your routine bag!`);
  };

  const handleAddBundleToCart = (bundleProducts: Product[]) => {
    setCartItems((prev) => {
      let updated = [...prev];
      for (const prod of bundleProducts) {
        const idx = updated.findIndex((i) => i.product.id === prod.id);
        if (idx >= 0) {
          updated[idx] = { ...updated[idx], quantity: updated[idx].quantity + 1 };
        } else {
          updated.push({ product: prod, quantity: 1 });
        }
      }
      return updated;
    });
    showToast(`Added 4-Step Personalized Bundle to your routine bag!`);
    setCartOpen(true);
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#00d2ff] selection:text-slate-950 overflow-x-hidden">

      {/* Top Reusable Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* Floating Action Controls on Bottom Left for Routine Bag & Quiz */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-3">
        <button
          onClick={() => setQuizOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#060b1e] text-[#00d2ff] border border-[#00d2ff] font-bold text-xs rounded-full shadow-2xl hover:bg-[#00d2ff] hover:text-slate-950 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span>Curl Quiz</span>
        </button>

        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 px-4 py-2.5 bg-[#00d2ff] text-slate-950 font-extrabold text-xs rounded-full shadow-2xl hover:bg-[#00bee8] transition-all cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Routine Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})</span>
        </button>
      </div>

      {/* Main Page Content */}
      <main>
        {/* Reusable Hero Section with video-thumbnail.jpg, hero-text-transparent.png, hover video playback, end reset & blue wave divider */}
        <HeroSection />

        {/* Section 1: New Launch Section featuring Shampoo Bottle, Water Splash & Palm Tree */}
        <NewLaunchSection
          onExploreClick={() => {
            const el = document.getElementById('lineup');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onLearnClick={() => {
            const el = document.getElementById('cgm');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section 2: 48-Hour Full Lineup */}
        {/* <LineupSection
          products={PRODUCTS}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product)}
        /> */}

        {/* Section 3: Feature Cards & Cloud Transition */}
        <FeatureCardsSection />

        <ProductCarouselSection />

        {/* Section 4: Signature Purple Curve Carousel */}
        <CollectionCarouselSection
          products={PRODUCTS}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product)}
        />

        {/* Section 5: Clinically Proven 48-Hour Hydration */}
        <ClinicalResultsSection />

        {/* Section 6: Powered by Nature's Best Ingredients */}
        <IngredientsSection />

        {/* Section 7 & 8: Community Reviews & Expert Endorsements */}
        <ReviewsSection />

        {/* Section 9: Designed for You - Hair Type Guide */}
        <HairTypeGuideSection onOpenQuiz={() => setQuizOpen(true)} />

        {/* Section 10: Your Curly Hair Journey Starts Here (Learn & Grow) - BEFORE FOOTER */}
        <CurlJourneySection
          onExploreClick={() => {
            const el = document.getElementById('cgm');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </main>

      {/* Pure Code Footer matching Figma Screenshot (Navy Blue Wave Line + Revolution Stats + 4-Column Pure Black Footer) */}
      <Footer
        onExploreClick={() => {
          const el = document.getElementById('lineup');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onLearnClick={() => {
          const el = document.getElementById('cgm');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Modals & Overlays */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CurlQuizModal
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        products={PRODUCTS}
        onAddBundleToCart={handleAddBundleToCart}
      />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#060b1e] border-2 border-[#00d2ff] text-[#ffffff] px-5 py-3.5 rounded-2xl shadow-[0_0_25px_rgba(0,210,255,0.5)] flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <CheckCircle2 className="w-5 h-5 text-[#00d2ff] shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{toast}</span>
        </div>
      )}

    </div>
  );
};

export default App;
