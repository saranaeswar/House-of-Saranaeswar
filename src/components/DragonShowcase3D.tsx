import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, Play, Pause, Maximize2, Minimize2, ChevronLeft, ChevronRight, ShieldAlert, Sparkles, Flame, Eye, Skull, Ruler, Wind } from 'lucide-react';
import { DRAGON_STATS } from '../data/loreData';
import { audioEngine } from '../utils/audioSynthesizer';

export const DragonShowcase3D: React.FC = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeViewMode, setActiveViewMode] = useState<'master' | 'turntable' | 'portrait'>('master');
  const showcaseContainerRef = useRef<HTMLDivElement>(null);

  // Drag-to-rotate state
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startAngleRef = useRef(0);

  // Auto-rotation interval
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.5) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    audioEngine.playChime(600);
    if (!showcaseContainerRef.current) return;
    if (!isFullscreen) {
      if (showcaseContainerRef.current.requestFullscreen) {
        showcaseContainerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Pointer drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    startAngleRef.current = rotationAngle;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    const newAngle = (startAngleRef.current + deltaX * 0.5) % 360;
    setRotationAngle(newAngle < 0 ? newAngle + 360 : newAngle);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Ignore pointer release error
      }
    }
  };

  const stepRotation = (delta: number) => {
    audioEngine.playChime(480);
    setRotationAngle((prev) => {
      const next = (prev + delta) % 360;
      return next < 0 ? next + 360 : next;
    });
  };

  const getStatIcon = (name: string) => {
    switch (name) {
      case 'ShieldAlert': return <ShieldAlert className="w-4 h-4 text-amber-400" />;
      case 'Ruler': return <Ruler className="w-4 h-4 text-amber-400" />;
      case 'Wind': return <Wind className="w-4 h-4 text-amber-400" />;
      case 'Flame': return <Flame className="w-4 h-4 text-amber-400" />;
      case 'Eye': return <Eye className="w-4 h-4 text-amber-400" />;
      case 'Skull': return <Skull className="w-4 h-4 text-red-400" />;
      default: return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  // Image selection based on view mode
  const currentImageSrc =
    activeViewMode === 'turntable'
      ? '/images/wyrm_showcase.jpg'
      : activeViewMode === 'portrait'
      ? '/images/wyrm_head_detail.jpg'
      : '/images/the_last_wyrm.jpg';

  // Dynamic 3D lighting reflection calculation based on rotation angle
  const lightPositionX = Math.cos((rotationAngle * Math.PI) / 180) * 100;
  const lightPositionY = Math.sin((rotationAngle * Math.PI) / 180) * 50;
  // Calculate subtle tilt angle between -18deg and 18deg for layered depth
  const tiltY = Math.sin((rotationAngle * Math.PI) / 180) * 16;
  const tiltX = Math.cos((rotationAngle * Math.PI) / 180) * 6;

  return (
    <section
      id="showcase"
      ref={showcaseContainerRef}
      className={`relative py-20 px-4 sm:px-6 lg:px-8 bg-[#090807] transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 overflow-y-auto p-6 bg-[#050403]' : ''
      }`}
    >
      {/* Background ambient elements */}
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-600/30 text-amber-400 text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>INTERACTIVE 3D RELIC STAGE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-black tracking-widest text-gold-gradient uppercase mb-4">
            THE BEAST BEYOND THE MOUNTAINS
          </h2>
          <p className="text-stone-300 font-garamond text-base sm:text-lg italic">
            "Weighing upon the highest jagged pinnacle of Mount Veyr, ancient volcanic armor defying mortal centuries."
          </p>
          <div className="mt-2 text-[11px] font-mono text-stone-500">
            [NOTE: Interactive spatial turntable and multi-perspective presentation preserving authentic visual master]
          </div>
        </div>

        {/* 3D Showcase & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Stats Column (3 cols) */}
          <div className="lg:col-span-3 space-y-4 order-2 lg:order-1">
            <h3 className="text-xs font-mono tracking-widest text-amber-500 uppercase pb-2 border-b border-stone-800">
              PHYSICAL METRICS & COVENANT
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {DRAGON_STATS.slice(0, 3).map((stat) => (
                <div
                  key={stat.label}
                  className="p-3.5 rounded-lg bg-stone-900/60 border border-stone-800 hover:border-amber-600/40 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {getStatIcon(stat.iconName)}
                    <span className="text-xs font-mono text-stone-400 uppercase">{stat.label}</span>
                  </div>
                  <div className="text-lg font-cinzel font-bold text-amber-200 group-hover:text-amber-300">
                    {stat.value}
                  </div>
                  <p className="text-xs text-stone-400 font-sans mt-1 leading-snug">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Center: 3D-style Turntable Stage (6 cols) */}
          <div className="lg:col-span-6 flex flex-col items-center order-1 lg:order-2">
            {/* View Angle Mode Selector */}
            <div className="flex items-center gap-2 mb-4 bg-stone-900/80 p-1 rounded-lg border border-amber-900/40">
              <button
                onClick={() => {
                  audioEngine.playChime(500);
                  setActiveViewMode('master');
                }}
                className={`px-3 py-1 rounded text-xs font-cinzel tracking-wider uppercase transition-all cursor-pointer ${
                  activeViewMode === 'master'
                    ? 'bg-amber-600/30 text-amber-200 border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Sovereign Perch
              </button>
              <button
                onClick={() => {
                  audioEngine.playChime(500);
                  setActiveViewMode('turntable');
                }}
                className={`px-3 py-1 rounded text-xs font-cinzel tracking-wider uppercase transition-all cursor-pointer ${
                  activeViewMode === 'turntable'
                    ? 'bg-amber-600/30 text-amber-200 border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Relic Pedestal
              </button>
              <button
                onClick={() => {
                  audioEngine.playChime(500);
                  setActiveViewMode('portrait');
                }}
                className={`px-3 py-1 rounded text-xs font-cinzel tracking-wider uppercase transition-all cursor-pointer ${
                  activeViewMode === 'portrait'
                    ? 'bg-amber-600/30 text-amber-200 border border-amber-500/50 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                Crowned Visage
              </button>
            </div>

            {/* Turntable Vessel with 3D Depth Transforms */}
            <div
              className="relative w-full max-w-lg aspect-[4/3] sm:aspect-square flex items-center justify-center p-4 select-none touch-none cursor-grab active:cursor-grabbing group"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              {/* Circular Altar / Turntable Ring */}
              <div
                className="absolute inset-4 rounded-full border-2 border-dashed border-amber-600/30 pointer-events-none transition-transform duration-300"
                style={{
                  transform: `perspective(600px) rotateX(65deg) rotateZ(${rotationAngle}deg)`,
                  boxShadow: '0 0 35px rgba(245, 158, 11, 0.15)',
                }}
              >
                {/* Degree indicators around the altar rim */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-[9px] font-mono text-amber-500 font-bold">
                  0° NORTH
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 text-[9px] font-mono text-amber-500 font-bold">
                  180° SOUTH
                </div>
                <div className="absolute right-0 top-1/2 translate-x-2 -translate-y-1/2 text-[9px] font-mono text-amber-500 font-bold">
                  90° EAST
                </div>
                <div className="absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 text-[9px] font-mono text-amber-500 font-bold">
                  270° WEST
                </div>
              </div>

              {/* Pedestal Base Shadow */}
              <div
                className="absolute bottom-6 w-3/4 h-16 rounded-full bg-black/80 blur-xl pointer-events-none"
                style={{
                  transform: `scale(${1 + Math.abs(tiltY) * 0.02})`,
                }}
              />

              {/* Dynamic 3D Dragon Visual Card with realistic perspective tilt & lighting */}
              <div
                className="relative z-10 w-full h-full max-w-[420px] max-h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-amber-900/50 bg-[#0d0a08] transition-transform ease-out duration-100"
                style={{
                  transform: `perspective(1000px) rotateY(${tiltY}deg) rotateX(${tiltX}deg) scale(${isDraggingRef.current ? 1.02 : 1})`,
                }}
              >
                <img
                  src={currentImageSrc}
                  alt="The Last Wyrm - Interactive 3D Turntable"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />

                {/* Dynamic Specular / Ember Flare Overlay driven by rotation angle */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-40 mix-blend-screen"
                  style={{
                    background: `radial-gradient(circle at ${50 + lightPositionX * 0.3}% ${50 + lightPositionY * 0.3}%, rgba(254, 215, 170, 0.45) 0%, rgba(245, 158, 11, 0.15) 30%, transparent 70%)`,
                  }}
                />

                {/* Bottom dark vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Drag hint pill */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm border border-amber-500/30 text-amber-300 text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
                  Drag to rotate • {Math.round(rotationAngle)}°
                </div>
              </div>
            </div>

            {/* Turntable Control Bar */}
            <div className="flex items-center gap-3 mt-4 bg-stone-900/90 border border-amber-900/40 px-4 py-2 rounded-full shadow-lg">
              {/* Step Left */}
              <button
                id="rotate-step-left"
                onClick={() => stepRotation(-30)}
                className="p-2 rounded-full hover:bg-stone-800 text-stone-300 hover:text-amber-400 transition-colors cursor-pointer"
                title="Rotate Left 30°"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Auto-Rotate Play/Pause */}
              <button
                id="auto-rotate-toggle"
                onClick={() => {
                  audioEngine.playChime(520);
                  setIsAutoRotating(!isAutoRotating);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-cinzel font-semibold transition-colors cursor-pointer ${
                  isAutoRotating
                    ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50'
                    : 'bg-stone-800 text-stone-300 hover:text-white'
                }`}
              >
                {isAutoRotating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isAutoRotating ? 'Pause Turntable' : 'Rotate Dragon'}</span>
              </button>

              {/* Step Right */}
              <button
                id="rotate-step-right"
                onClick={() => stepRotation(30)}
                className="p-2 rounded-full hover:bg-stone-800 text-stone-300 hover:text-amber-400 transition-colors cursor-pointer"
                title="Rotate Right 30°"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="w-[1px] h-4 bg-stone-800 mx-1" />

              {/* Fullscreen Button */}
              <button
                id="toggle-fullscreen-btn"
                onClick={toggleFullscreen}
                className="p-2 rounded-full hover:bg-stone-800 text-stone-300 hover:text-amber-400 transition-colors cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Right Stats Column (3 cols) */}
          <div className="lg:col-span-3 space-y-4 order-3">
            <h3 className="text-xs font-mono tracking-widest text-amber-500 uppercase pb-2 border-b border-stone-800">
              ELEMENTAL THREAT RATING
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3">
              {DRAGON_STATS.slice(3, 6).map((stat) => (
                <div
                  key={stat.label}
                  className="p-3.5 rounded-lg bg-stone-900/60 border border-stone-800 hover:border-amber-600/40 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    {getStatIcon(stat.iconName)}
                    <span className="text-xs font-mono text-stone-400 uppercase">{stat.label}</span>
                  </div>
                  <div className="text-lg font-cinzel font-bold text-amber-200 group-hover:text-amber-300">
                    {stat.value}
                  </div>
                  <p className="text-xs text-stone-400 font-sans mt-1 leading-snug">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
