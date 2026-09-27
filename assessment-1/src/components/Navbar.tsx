import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  logoSrc?: string;
  navItems?: NavItem[];
  activeTab?: string;
  onTabChange?: (label: string) => void;
  className?: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'Hair Care Blog', href: '#blog' },
  { label: 'Curly Girl Method', href: '#cgm' },
];

export const Navbar: React.FC<NavbarProps> = ({
  logoSrc = '/assets/logo-header-dark.png',
  navItems = DEFAULT_NAV_ITEMS,
  activeTab = 'Home',
  onTabChange,
  className = '',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentActive, setCurrentActive] = useState(activeTab);

  const handleNavClick = (label: string, href: string) => {
    setCurrentActive(label);
    if (onTabChange) {
      onTabChange(label);
    }
    setMobileMenuOpen(false);

    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`sticky top-0 z-50 bg-[#060b1e] text-white border-b border-[#00d2ff]/30 shadow-xl ${className}`}>
      <div className="w-full px-4 sm:px-8 lg:px-16 h-[72px] sm:h-[100px] flex items-center justify-between relative max-w-[1920px] mx-auto">
        
        {/* Brand Logo on Left */}
        <div className="flex items-center gap-3 z-10">
          <a href="#home" onClick={(e) => { e.preventDefault(); handleNavClick('Home', '#home'); }} className="block cursor-pointer">
            <img
              src={logoSrc}
              alt="Parachute Advansed Hydra Curls"
              className="h-8 sm:h-10 lg:h-12 w-auto object-contain transition-transform hover:scale-105"
            />
          </a>
        </div>

        {/* Centered Desktop Navigation Links */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-6 lg:gap-10 text-sm font-semibold tracking-wide">
          {navItems.map((item) => {
            const isActive = currentActive === item.label;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label, item.href)}
                className={`py-1 text-sm sm:text-base tracking-wide transition-all relative cursor-pointer ${
                  isActive
                    ? 'text-[#00d2ff] font-bold drop-shadow-[0_0_8px_rgba(0,210,255,0.7)]'
                    : 'text-[#38bdf8]/90 hover:text-[#00d2ff]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00d2ff] rounded-full shadow-[0_0_8px_#00d2ff]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#00d2ff] hover:text-white z-10 cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#060b1e]/98 border-b border-[#00d2ff]/40 p-5 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col space-y-2 text-sm font-semibold">
            {navItems.map((item) => {
              const isActive = currentActive === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.label, item.href)}
                  className={`text-left py-2.5 px-4 rounded-xl transition-colors cursor-pointer ${
                    isActive
                      ? 'text-[#00d2ff] bg-white/10 font-bold border-l-4 border-[#00d2ff]'
                      : 'text-[#38bdf8]/80 hover:text-[#00d2ff] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};
