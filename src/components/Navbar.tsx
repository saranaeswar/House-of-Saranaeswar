import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, BookOpen, Crown, Flame, Compass } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'The Legend', icon: Flame },
    { id: 'showcase', label: 'Dragon', icon: Shield },
    { id: 'anatomy', label: 'Anatomy', icon: Compass },
    { id: 'history', label: 'History', icon: BookOpen },
    { id: 'bloodline', label: 'Bloodline', icon: Crown },
    { id: 'dance', label: 'The Dance', icon: Shield },
    { id: 'archive', label: 'Archive', icon: BookOpen },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      id="main-navigation"
      className={`sticky top-0 z-30 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080706]/95 border-b border-amber-900/30 backdrop-blur-md shadow-2xl py-3'
          : 'bg-gradient-to-b from-[#080706]/90 via-[#080706]/50 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Crest */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
        >
          <div className="w-9 h-9 rounded border border-amber-500/40 bg-gradient-to-br from-amber-950 to-stone-900 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.25)] group-hover:border-amber-400 transition-colors">
            <Flame className="w-5 h-5 text-amber-400 group-hover:text-amber-300 transition-colors" />
          </div>
          <div>
            <span className="block text-sm sm:text-base font-cinzel font-bold tracking-[0.2em] text-gold-gradient uppercase leading-none">
              The Last Wyrm
            </span>
            <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase">
              Chronicles of Veyrath
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`px-3.5 py-1.5 rounded-md text-xs font-cinzel tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-amber-300 bg-amber-500/15 border border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                    : 'text-stone-300 hover:text-amber-200 hover:bg-stone-900/50 border border-transparent'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Mobile menu hamburger toggle */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded border border-amber-900/40 bg-stone-900/80 text-amber-400 hover:text-amber-300 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#0a0807] border-b border-amber-900/40 px-4 py-4 space-y-1 shadow-2xl backdrop-blur-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm font-cinzel tracking-wider uppercase text-left transition-colors ${
                  isActive
                    ? 'bg-amber-950/60 text-amber-300 border border-amber-600/40'
                    : 'text-stone-300 hover:bg-stone-900 hover:text-amber-200'
                }`}
              >
                <Icon className="w-4 h-4 text-amber-400" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
