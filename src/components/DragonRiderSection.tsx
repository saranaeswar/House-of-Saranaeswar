import React, { useState } from 'react';
import { LOST_CHRONICLE_DATA } from '../data/loreData';
import { Compass, FileText, Lock, Sparkles, User, X } from 'lucide-react';
import { audioEngine } from '../utils/audioSynthesizer';

interface DragonRiderSectionProps {
  onUnlockChronicle?: (chronicleTitle: string) => void;
  unlockedChronicles?: string[];
}

export const DragonRiderSection: React.FC<DragonRiderSectionProps> = ({
  onUnlockChronicle,
  unlockedChronicles = [],
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isUnlocked = unlockedChronicles.includes(LOST_CHRONICLE_DATA.title);

  const handleOpenChronicle = () => {
    audioEngine.playChime(680);
    setIsModalOpen(true);
    if (onUnlockChronicle) {
      onUnlockChronicle(LOST_CHRONICLE_DATA.title);
    }
  };

  return (
    <section id="rider" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#080706]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-600/30 text-amber-400 text-xs font-mono tracking-widest uppercase mb-3">
            <User className="w-3.5 h-3.5 text-amber-500" />
            <span>THE VANISHED BOND • SHADOWS OF THE NORTH</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-black tracking-widest text-gold-gradient uppercase mb-4">
            THE LAST DRAGONBINDER
          </h2>
          <p className="text-stone-300 font-garamond text-base sm:text-lg italic">
            "A rider without an army. A dragon without a master. Lost in the gale of northern glaciers."
          </p>
        </div>

        {/* Mysterious Character Profile Card */}
        <div className="rounded-2xl bg-stone-900/80 border border-amber-600/30 parchment-border shadow-2xl p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Portrait / Visage Silhouette Column (4 cols) */}
            <div className="md:col-span-5 flex flex-col items-center text-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl group mb-4">
                <img
                  src="/images/wyrm_head_detail.jpg"
                  alt="Lord Vaelor Veyr - Bond of the Wyrm"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase bg-black/70 px-2 py-0.5 rounded border border-amber-700/50">
                    BOND: THE LAST WYRM
                  </span>
                </div>
              </div>

              <span className="text-xs font-mono text-stone-500">
                PORTRAIT SKETCH: HIGH AERIE AT MOURNING
              </span>
            </div>

            {/* Profile Information (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-3xl sm:text-4xl font-cinzel font-bold text-amber-100">
                  Lord Vaelor Veyr
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-red-950/80 text-red-400 border border-red-800/60 uppercase">
                  STATUS: MISSING
                </span>
              </div>

              <div className="text-sm font-mono text-amber-500/90 tracking-wider">
                Title: <span className="text-amber-200">The Last Dragonbinder</span>
              </div>

              {/* Biography */}
              <div className="p-4 rounded-xl bg-black/40 border-l-2 border-amber-500">
                <p className="text-stone-300 font-garamond text-lg italic leading-relaxed">
                  "On the night Veyrath burned, Vaelor disappeared beyond the northern pass. The dragon followed him into the storm. No witness saw them return."
                </p>
              </div>

              <p className="text-sm text-stone-400 font-sans leading-relaxed">
                Archival reports suggest Vaelor carried the Star-Iron Codex, containing the sacred formulas that allow mortal souls to commune with elder primordial drakes. If he survived the frost, the covenant lives on.
              </p>

              {/* Action Button: Reveal the Lost Chronicle */}
              <div className="pt-4">
                <button
                  id="reveal-chronicle-btn"
                  onClick={handleOpenChronicle}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-stone-950 font-cinzel font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.5)] hover:brightness-110 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-stone-950" />
                  <span>Reveal the Lost Chronicle</span>
                  {isUnlocked && <Sparkles className="w-3.5 h-3.5 text-stone-950 animate-spin" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: The Lost Chronicle Reveal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="relative w-full max-w-2xl rounded-2xl bg-[#0e0c0a] border border-amber-500/50 p-6 sm:p-8 shadow-2xl parchment-border max-h-[90vh] overflow-y-auto">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white border border-stone-800 cursor-pointer"
                aria-label="Close chronicle"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-amber-500 tracking-widest uppercase mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>AUTHENTIC CODEX DISCOVERY</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold-gradient mb-1">
                {LOST_CHRONICLE_DATA.title}
              </h3>

              <div className="text-xs font-mono text-stone-400 mb-6 pb-3 border-b border-stone-800 flex flex-wrap justify-between gap-2">
                <span>RECOVERED: {LOST_CHRONICLE_DATA.discoveredAt}</span>
                <span>SCRIBE: {LOST_CHRONICLE_DATA.archivist}</span>
              </div>

              {/* Chronicle Passages */}
              <div className="space-y-4 text-stone-300 font-garamond text-base sm:text-lg leading-relaxed italic">
                {LOST_CHRONICLE_DATA.passage.map((para, i) => (
                  <p key={i} className="first-letter:text-3xl first-letter:font-cinzel first-letter:text-amber-400 first-letter:mr-1">
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-stone-800 flex items-center justify-between text-xs font-mono text-stone-500">
                <span>SAVED TO CHRONICLE ARCHIVE</span>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-1.5 rounded bg-amber-600/30 text-amber-300 border border-amber-500/50 text-xs font-cinzel tracking-wider uppercase hover:bg-amber-600/50 cursor-pointer"
                >
                  Seal Chronicle
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
