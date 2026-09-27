import React, { useState } from 'react';
import { X, Sparkles, RefreshCw, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface CurlQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddBundleToCart: (products: Product[]) => void;
}

export const CurlQuizModal: React.FC<CurlQuizModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddBundleToCart,
}) => {
  const [step, setStep] = useState(1);
  const [porosity, setPorosity] = useState<string>('');
  const [curlPattern, setCurlPattern] = useState<string>('');
  const [concern, setConcern] = useState<string>('');
  const [completed, setCompleted] = useState(false);

  if (!isOpen) return null;

  const handleSelectPorosity = (val: string) => {
    setPorosity(val);
    setStep(2);
  };

  const handleSelectCurlPattern = (val: string) => {
    setCurlPattern(val);
    setStep(3);
  };

  const handleSelectConcern = (val: string) => {
    setConcern(val);
    setCompleted(true);
  };

  const resetQuiz = () => {
    setStep(1);
    setPorosity('');
    setCurlPattern('');
    setConcern('');
    setCompleted(false);
  };

  const recommendedProducts = completed
    ? products.slice(0, 4)
    : [];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl overflow-hidden border border-cyan-100">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full transition-colors z-10"
        >
          <X className="w-6 h-6" />
        </button>

        {!completed ? (
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-50 rounded-full text-[#0088cc] text-xs font-extrabold uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Step {step} of 3</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {step === 1 && 'What is your hair porosity level?'}
                {step === 2 && 'What is your natural curl pattern?'}
                {step === 3 && 'What is your primary hair goal?'}
              </h3>
              <p className="text-xs text-slate-500">
                {step === 1 && 'Does your hair absorb water instantly or take hours to get fully wet?'}
                {step === 2 && 'Select the pattern that best matches your unstyled hair.'}
                {step === 3 && 'Choose your top focus for healthy, beautiful curls.'}
              </p>
            </div>

            {/* Step 1 Options */}
            {step === 1 && (
              <div className="space-y-3">
                {[
                  { title: 'High Porosity', desc: 'Absorbs water fast, loses moisture quickly, gets frizzy in humidity' },
                  { title: 'Medium Porosity', desc: 'Balanced moisture absorption, defined curls with moderate bounce' },
                  { title: 'Low Porosity', desc: 'Repels water initially, products float on top, takes long to dry' }
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleSelectPorosity(item.title)}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-[#00d2ff] hover:bg-cyan-50/50 transition-all space-y-1 group cursor-pointer"
                  >
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0088cc]">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2 Options */}
            {step === 2 && (
              <div className="space-y-3">
                {[
                  { title: 'Type 2 Wavy (2A - 2C)', desc: 'Loose S-shapes, easily weighed down by heavy oils' },
                  { title: 'Type 3 Curly (3A - 3C)', desc: 'Springy spiral ringlets, prone to dryness & frizz' },
                  { title: 'Type 4 Coily (4A - 4C)', desc: 'Tight zig-zag or corkscrew coils, seeking high elasticity' }
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleSelectCurlPattern(item.title)}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-[#00d2ff] hover:bg-cyan-50/50 transition-all space-y-1 group cursor-pointer"
                  >
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0088cc]">{item.title}</h4>
                    <p className="text-xs text-slate-500">{item.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Step 3 Options */}
            {step === 3 && (
              <div className="space-y-3">
                {[
                  'Eliminate Humidity Frizz & Flyaways',
                  '48-Hour Continuous Moisture Lock',
                  'Scalp Cleansing & Knot-Free Detangling',
                  'Long-Lasting Curl Definition & Bounce'
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => handleSelectConcern(item)}
                    className="w-full text-left p-4 rounded-2xl border border-slate-200 hover:border-[#00d2ff] hover:bg-cyan-50/50 transition-all group cursor-pointer"
                  >
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0088cc]">{item}</h4>
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Quiz Results Screen */
          <div className="space-y-6 animate-in zoom-in duration-300">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-cyan-100 text-[#00a8cc] rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Your Personalized Routine</h3>
              <p className="text-xs text-slate-500">
                Based on your {porosity} & {curlPattern} profile, we formulated your 4-step routine:
              </p>
            </div>

            {/* Routine Products List */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {recommendedProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="w-10 h-10 object-contain" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{p.name}</h4>
                      <p className="text-[10px] text-cyan-600 font-semibold">{p.step}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">${p.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-2xl border border-emerald-200 text-center">
              <span className="text-xs text-emerald-800 font-bold block">Quiz Reward Unlocked:</span>
              <p className="text-xs text-slate-600">Use promo code <strong className="text-emerald-700 font-black">QUIZ15</strong> for 15% off!</p>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  onAddBundleToCart(recommendedProducts);
                  onClose();
                }}
                className="w-full py-3.5 bg-[#00d2ff] hover:bg-[#00bee8] text-slate-950 font-extrabold text-sm rounded-xl shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Complete Routine Bundle to Bag</span>
              </button>

              <button
                onClick={resetQuiz}
                className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
