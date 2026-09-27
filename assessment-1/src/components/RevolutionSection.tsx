import React, { useState } from 'react';
import { Send, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Droplet, Clock } from 'lucide-react';

export const RevolutionSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [discountCode, setDiscountCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setSubscribed(true);
    setDiscountCode('CURL15OFF');
  };

  const scrollToLineup = () => {
    const el = document.getElementById('lineup');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCGM = () => {
    const el = document.getElementById('cgm');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full bg-[#0a1738] text-white overflow-hidden py-12 sm:py-20">
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#00d2ff]/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 space-y-12">
        
        {/* Responsive Live Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 text-center space-y-1 backdrop-blur-md">
            <Clock className="w-5 h-5 text-[#00d2ff] mx-auto" />
            <span className="text-2xl sm:text-3xl font-black text-white">48 Hours</span>
            <p className="text-[11px] text-purple-200 uppercase tracking-wider">Moisture Retention</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 text-center space-y-1 backdrop-blur-md">
            <Sparkles className="w-5 h-5 text-[#00d2ff] mx-auto" />
            <span className="text-2xl sm:text-3xl font-black text-white">05 Products</span>
            <p className="text-[11px] text-purple-200 uppercase tracking-wider">Complete Lineup</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 text-center space-y-1 backdrop-blur-md">
            <Droplet className="w-5 h-5 text-[#00d2ff] mx-auto" />
            <span className="text-2xl sm:text-3xl font-black text-white">3 Hair Types</span>
            <p className="text-[11px] text-purple-200 uppercase tracking-wider">Wavy, Curly, Coily</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 text-center space-y-1 backdrop-blur-md">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
            <span className="text-2xl sm:text-3xl font-black text-white">0% Sulfates</span>
            <p className="text-[11px] text-purple-200 uppercase tracking-wider">100% Clean Formula</p>
          </div>
        </div>

        {/* Desktop View: Frame 76 High-Res visual with clickable buttons */}
        <div className="hidden lg:block relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <img
            src="/assets/Frame 76.jpg"
            alt="Join the Curly Hair Revolution"
            className="w-full h-auto object-cover block select-none"
          />
          <div className="absolute inset-0 z-20 pointer-events-none flex items-center">
            <div className="w-full max-w-7xl mx-auto px-12 lg:px-20 grid grid-cols-12">
              <div className="col-span-7 pt-28 pointer-events-auto">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={scrollToLineup}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00d2ff] hover:bg-[#00bee8] text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-cyan-500/30 transition-all transform hover:scale-105 cursor-pointer"
                  >
                    <span>Explore Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={scrollToCGM}
                    className="inline-flex items-center px-8 py-3.5 bg-transparent hover:bg-white/10 text-white border border-white/40 font-bold text-sm rounded-xl shadow-sm transition-all cursor-pointer"
                  >
                    <span>Learn Curly Girl Method</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Newsletter / VIP Discount Signup Form */}
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#122452] to-[#0a1738] rounded-3xl p-8 sm:p-10 border border-[#00d2ff]/40 shadow-2xl space-y-6 text-center">
          <div className="space-y-2">
            <span className="text-xs uppercase font-extrabold tracking-widest text-[#00d2ff]">Exclusive Access</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Join the Curly Hair Revolution
            </h3>
            <p className="text-xs sm:text-sm text-purple-200">
              Subscribe to get expert curl care routines, VIP launch notifications, and an instant 15% discount code for your first routine order!
            </p>
          </div>

          {!subscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-xl text-white placeholder-purple-300 text-sm focus:outline-none focus:border-[#00d2ff]"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-[#00d2ff] hover:bg-[#00bee8] text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 cursor-pointer transition-all transform active:scale-95 shrink-0"
              >
                <span>Claim 15% Off</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="p-6 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl space-y-3 animate-in zoom-in duration-300">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Welcome to the Revolution!</h4>
              <p className="text-xs text-emerald-200">Use promo code below at checkout for 15% off:</p>
              <div className="inline-block px-6 py-2.5 bg-emerald-400 text-slate-950 font-black text-lg rounded-xl tracking-wider select-all shadow-md">
                {discountCode}
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
