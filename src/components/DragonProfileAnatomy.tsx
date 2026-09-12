import React, { useState } from 'react';
import { ANATOMY_POINTS } from '../data/loreData';
import { AnatomyPoint } from '../types';
import { Scroll, Sparkles, Feather } from 'lucide-react';
import { audioEngine } from '../utils/audioSynthesizer';

interface DragonProfileAnatomyProps {
  onDiscoverPoint?: (pointId: string) => void;
  discoveredPoints?: string[];
}

export const DragonProfileAnatomy: React.FC<DragonProfileAnatomyProps> = ({
  onDiscoverPoint,
  discoveredPoints = [],
}) => {
  const [selectedPoint, setSelectedPoint] = useState<AnatomyPoint>(ANATOMY_POINTS[0]);

  const handleSelect = (pt: AnatomyPoint) => {
    audioEngine.playChime(560);
    setSelectedPoint(pt);
    if (onDiscoverPoint) {
      onDiscoverPoint(pt.id);
    }
  };

  return (
    <section id="anatomy" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#080706]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-600/30 text-amber-400 text-xs font-mono tracking-widest uppercase mb-3">
            <Feather className="w-3.5 h-3.5 text-amber-500" />
            <span>ARCHIVAL TRACTATUS • CITADEL RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-black tracking-widest text-gold-gradient uppercase mb-4">
            ANATOMY OF A LEGEND
          </h2>
          <p className="text-stone-300 font-garamond text-base sm:text-lg italic">
            "Excerpts transcribed from the leather-bound treatise of Grand Scholar Maltheor, surviving the sack of the high roosts."
          </p>
        </div>

        {/* Main Interactive Anatomy Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Diagram with Hotspot Pins (7 cols) */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-amber-900/50 bg-[#0c0a08] p-2 shadow-2xl">
            <div className="relative rounded-xl overflow-hidden">
              <img
                src="/images/the_last_wyrm.jpg"
                alt="Dragon Anatomical Chart"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover max-h-[520px]"
              />

              {/* Dark atmospheric scrim */}
              <div className="absolute inset-0 bg-black/40 pointer-events-none" />

              {/* Hotspot Pins */}
              {ANATOMY_POINTS.map((pt) => {
                const isSelected = selectedPoint.id === pt.id;
                const isDiscovered = discoveredPoints.includes(pt.id);

                return (
                  <button
                    key={pt.id}
                    id={`hotspot-${pt.id}`}
                    onClick={() => handleSelect(pt)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none z-20"
                    style={{ left: `${pt.xPercent}%`, top: `${pt.yPercent}%` }}
                    aria-label={`Inspect ${pt.name}`}
                  >
                    {/* Pulsing ring */}
                    <span
                      className={`absolute -inset-2 rounded-full transition-all duration-300 ${
                        isSelected
                          ? 'bg-amber-400/40 animate-ping'
                          : 'bg-stone-500/20 group-hover:bg-amber-500/30'
                      }`}
                    />

                    {/* Core pin */}
                    <div
                      className={`relative w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-300 border ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 border-amber-300 scale-125 shadow-[0_0_20px_rgba(245,158,11,0.8)]'
                          : isDiscovered
                          ? 'bg-amber-950/80 text-amber-300 border-amber-500/60 hover:scale-110'
                          : 'bg-stone-900/80 text-stone-400 border-stone-700 hover:scale-110'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>

                    {/* Tooltip Label */}
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 -top-7 whitespace-nowrap px-2 py-0.5 rounded text-[10px] font-cinzel tracking-wider uppercase transition-opacity ${
                        isSelected ? 'bg-amber-500 text-stone-950 opacity-100 font-bold' : 'bg-stone-900/90 text-stone-300 opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {pt.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="p-3 bg-stone-950/90 border-t border-stone-800 flex items-center justify-between text-xs font-mono text-stone-400">
              <span>DISCOVERED TRAITS: {discoveredPoints.length} / {ANATOMY_POINTS.length}</span>
              <span className="text-amber-400">SELECT A GLYPH OR CARD TO EXAMINE</span>
            </div>
          </div>

          {/* Right: Scholar's Treatise Parchment Panel (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Active Feature Detail Card */}
            <div className="p-6 rounded-2xl bg-stone-900/70 border border-amber-600/40 shadow-xl parchment-border relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <Scroll className="w-28 h-28 text-amber-500" />
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-amber-400/80 tracking-widest uppercase">
                  {selectedPoint.latinName}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-700/40 uppercase">
                  CLASSIFICATION: ROYAL WYRM
                </span>
              </div>

              <h3 className="text-2xl font-cinzel font-bold text-amber-200 mb-2">
                {selectedPoint.name}
              </h3>

              <div className="p-3 rounded bg-black/40 border-l-2 border-amber-500 mb-4">
                <p className="text-sm font-cinzel text-amber-300 font-semibold leading-snug">
                  {selectedPoint.summary}
                </p>
              </div>

              <div className="space-y-3 text-stone-300 font-garamond text-base leading-relaxed">
                <p className="italic text-stone-400">
                  {selectedPoint.scholarNote}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-800 flex items-center justify-between text-xs font-mono text-stone-400">
                <span>SEAL OF HIGH MAESTERS</span>
                <span className="text-amber-500 font-semibold">AUTHENTIC RECORD</span>
              </div>
            </div>

            {/* Quick Grid of all 6 Anatomy cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ANATOMY_POINTS.map((pt) => {
                const isSelected = selectedPoint.id === pt.id;
                return (
                  <button
                    key={pt.id}
                    id={`anatomy-card-${pt.id}`}
                    onClick={() => handleSelect(pt)}
                    className={`p-3 rounded-lg text-left transition-all duration-200 cursor-pointer border ${
                      isSelected
                        ? 'bg-amber-950/60 border-amber-500 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                        : 'bg-stone-900/40 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                    }`}
                  >
                    <div className="text-xs font-cinzel font-bold">{pt.name}</div>
                    <div className="text-[10px] font-mono text-stone-500 truncate mt-0.5">
                      {pt.latinName}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
