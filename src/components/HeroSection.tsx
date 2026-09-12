import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Compass, Eye, Flame, Shield, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioSynthesizer';

interface HeroSectionProps {
  onExploreLegend: () => void;
  onViewDragon: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreLegend, onViewDragon }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  // Mouse perspective parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 16;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // High-performance scroll parallax via requestAnimationFrame
  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current) return;
      rafIdRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
        rafIdRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const handleAction = (cb: () => void) => {
    audioEngine.playChime(440);
    cb();
  };

  // Parallax offsets at distinct depth velocities
  const glowY = scrollY * 0.18; // Far background glow
  const mistFarY = scrollY * 0.25; // Far mist layer
  const textY = scrollY * 0.32; // Middle content
  const dragonY = scrollY * 0.48; // Main dragon subject
  const mistNearY = scrollY * 0.68; // Foreground atmospheric drift

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[95vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#070605] py-16 sm:py-24"
    >
      {/* Layer 0: Far Volcanic Background Glow (Moves at 0.18x) */}
      <div
        className="absolute w-[600px] sm:w-[900px] h-[600px] sm:h-[900px] rounded-full pointer-events-none transition-transform duration-300 ease-out opacity-60"
        style={{
          background: 'radial-gradient(circle, rgba(234, 88, 12, 0.28) 0%, rgba(180, 83, 9, 0.12) 40%, rgba(0, 0, 0, 0) 70%)',
          transform: `translate3d(${mousePos.x * -1.5}px, ${mousePos.y * -1.5 + glowY}px, 0)`,
          top: '12%',
          left: '50%',
          marginLeft: '-300px',
          willChange: 'transform',
        }}
      />

      {/* Layer 1: Mid-Depth Fog / Cloud Scrim (Moves at 0.25x) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 bg-radial-vignette z-0"
        style={{
          transform: `translate3d(0, ${mistFarY}px, 0)`,
          willChange: 'transform',
        }}
      />

      {/* Layer 2: Subtle Mountain Ridge Silhouette Gradients */}
      <div
        className="absolute bottom-0 left-0 right-0 h-96 pointer-events-none opacity-25"
        style={{
          background: 'linear-gradient(to top, #090807 0%, rgba(15, 12, 10, 0.4) 60%, transparent 100%)',
          transform: `translate3d(0, ${scrollY * 0.15}px, 0)`,
        }}
      />

      {/* Hero Content & Image Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Left: Lore & Typography (Moves at 0.32x) */}
        <div
          className="flex-1 text-center lg:text-left pt-6 lg:pt-0 transition-transform duration-100 ease-out"
          style={{
            transform: `translate3d(0, ${textY}px, 0)`,
            willChange: 'transform',
          }}
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 text-xs font-mono tracking-[0.25em] uppercase mb-4 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>THE CHRONICLES OF VEYRATH</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-cinzel font-black tracking-[0.15em] text-gold-gradient uppercase leading-[1.05] drop-shadow-2xl mb-4">
            THE LAST WYRM
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-2xl font-garamond italic text-amber-200/90 max-w-xl mx-auto lg:mx-0 mb-4 leading-snug">
            Born beneath a dying sun. Forged in the fire of forgotten kings.
          </p>

          {/* Short Description */}
          <p className="text-sm sm:text-base text-stone-300 font-sans max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
            Before the kingdoms divided the skies, one dragon ruled the mountains beyond the known world. A living monument to an empire turned to ash, waiting atop the frozen needles of Mount Veyr.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              id="hero-view-dragon-btn"
              onClick={() => handleAction(onViewDragon)}
              className="w-full sm:w-auto px-7 py-3.5 rounded bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-stone-950 font-cinzel font-bold text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-stone-950" />
              <span>View the Dragon</span>
            </button>

            <button
              id="hero-explore-legend-btn"
              onClick={() => handleAction(onExploreLegend)}
              className="w-full sm:w-auto px-7 py-3.5 rounded bg-stone-900/80 hover:bg-stone-800/90 text-amber-200 border border-amber-600/40 hover:border-amber-400 font-cinzel font-semibold text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Explore the Legend</span>
            </button>
          </div>

          {/* Quick Lore Facts Pill */}
          <div className="mt-8 pt-6 border-t border-stone-800/80 grid grid-cols-3 gap-3 max-w-md mx-auto lg:mx-0 text-left">
            <div>
              <span className="block text-[11px] font-mono text-stone-400 uppercase">SPECIES</span>
              <span className="text-xs sm:text-sm font-cinzel text-amber-300 font-semibold">Mountain Wyrm</span>
            </div>
            <div>
              <span className="block text-[11px] font-mono text-stone-400 uppercase">WINGSPAN</span>
              <span className="text-xs sm:text-sm font-cinzel text-amber-300 font-semibold">140 Feet</span>
            </div>
            <div>
              <span className="block text-[11px] font-mono text-stone-400 uppercase">STATUS</span>
              <span className="text-xs sm:text-sm font-cinzel text-amber-400 font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                Sole Survivor
              </span>
            </div>
          </div>
        </div>

        {/* Right: Master Dragon Showcase with Scroll Parallax (0.48x) & Mouse 3D Depth */}
        <div
          className="flex-1 relative w-full max-w-xl lg:max-w-2xl transition-transform duration-100 ease-out"
          style={{
            transform: `translate3d(0, ${dragonY}px, 0)`,
            willChange: 'transform',
          }}
        >
          <div
            className="relative rounded-2xl p-1 bg-gradient-to-b from-amber-500/30 via-stone-800/40 to-amber-950/20 shadow-2xl transition-transform duration-500 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${mousePos.x * 0.4}deg) rotateX(${-mousePos.y * 0.4}deg)`,
            }}
          >
            {/* Outer Relic Border Frame */}
            <div className="relative rounded-xl overflow-hidden bg-[#0a0908] border border-amber-900/50 group">
              {/* Primary Uploaded Dragon Image */}
              <img
                src="/images/the_last_wyrm.jpg"
                alt="The Last Wyrm - Ancient Mountain Dragon of Veyrath"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover max-h-[560px] transform group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Seamless atmospheric vignette overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-transparent opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#080706]/40 via-transparent to-[#080706]/40 pointer-events-none" />

              {/* Glowing Corner Accents */}
              <div className="absolute top-3 left-3 flex items-center gap-2 bg-stone-950/80 px-2.5 py-1 rounded border border-amber-500/40 text-[10px] font-mono tracking-widest text-amber-300">
                <Shield className="w-3 h-3 text-amber-400" />
                <span>RELIC NO. 01 — RECORDED AT HIGH DAWN</span>
              </div>

              <div className="absolute bottom-3 right-3 bg-stone-950/80 px-2.5 py-1 rounded border border-stone-700 text-[10px] font-mono text-stone-400">
                <span>COORD: 68°N • MOUNT VEYR PEAK</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 4: Foreground Floating Atmospheric Mist Wisps (Moves at 0.68x) */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none opacity-30 z-30"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(245, 158, 11, 0.15), transparent 70%)',
          transform: `translate3d(0, ${mistNearY}px, 0)`,
          willChange: 'transform',
        }}
      />

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-stone-500 hover:text-amber-400 transition-colors">
        <div className="flex items-center gap-1 text-[9px] font-mono tracking-widest uppercase text-amber-500/70">
          <Sparkles className="w-2.5 h-2.5" />
          <span>PARALLAX DEPTH ACTIVE</span>
        </div>
        <button
          onClick={() => handleAction(onViewDragon)}
          className="p-1 rounded-full hover:bg-stone-900/60 transition-colors cursor-pointer"
          aria-label="Scroll Down"
        >
          <ChevronDown className="w-5 h-5 text-amber-500 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

