import React, { useState } from 'react';
import { ARCHIVE_LORE_ENTRIES } from '../data/loreData';
import { BookOpen, Flame, RotateCcw, X, Sparkles, Scroll } from 'lucide-react';
import { audioEngine } from '../utils/audioSynthesizer';

interface FinalArchiveSectionProps {
  onReadAgain: () => void;
}

export const FinalArchiveSection: React.FC<FinalArchiveSectionProps> = ({ onReadAgain }) => {
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Creature Biology', 'Ancient Relics', 'Dynastic Law', 'Lost Geography'];

  const filteredEntries =
    selectedCategory === 'All'
      ? ARCHIVE_LORE_ENTRIES
      : ARCHIVE_LORE_ENTRIES.filter((e) => e.category === selectedCategory);

  const handleOpenArchive = () => {
    audioEngine.playChime(600);
    setIsArchiveModalOpen(true);
  };

  const handleScrollTop = () => {
    audioEngine.playChime(440);
    onReadAgain();
  };

  return (
    <section id="archive" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#060504] py-24 px-4 sm:px-6 lg:px-8">
      {/* Background Dragon Artwork with Dramatic Silhouette & Embers */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/the_last_wyrm.jpg"
          alt="The Last Wyrm Silhouette"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-25 filter grayscale contrast-150 brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060504] via-[#060504]/80 to-[#060504]" />
        <div className="absolute inset-0 bg-radial-ember opacity-40 animate-pulse-glow" />
      </div>

      {/* Main Closing Dramatic Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/50 border border-amber-600/30 text-amber-400 text-xs font-mono tracking-widest uppercase mb-6">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span>FINIS CHRONICAE • VEYRATH ENDURES</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-cinzel font-black tracking-widest text-gold-gradient uppercase mb-6 leading-tight drop-shadow-2xl">
          THE FIRE STILL REMEMBERS
        </h2>

        <p className="text-xl sm:text-3xl font-garamond italic text-amber-100/90 max-w-2xl mx-auto mb-10 leading-snug">
          "Kingdoms crumble. Bloodlines fade. But fire remembers."
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="read-again-btn"
            onClick={handleScrollTop}
            className="w-full sm:w-auto px-7 py-3.5 rounded bg-stone-900/90 hover:bg-stone-800 text-amber-200 border border-amber-600/40 hover:border-amber-400 font-cinzel font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span>Read the Chronicles Again</span>
          </button>

          <button
            id="open-archive-modal-btn"
            onClick={handleOpenArchive}
            className="w-full sm:w-auto px-7 py-3.5 rounded bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-stone-950 font-cinzel font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.6)] hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-stone-950" />
            <span>Enter the Dragon Archive</span>
          </button>
        </div>

        {/* Closing Footer Inscription */}
        <div className="mt-16 pt-8 border-t border-stone-800/80 text-stone-500 text-xs font-mono tracking-widest">
          <p className="text-amber-500/80 mb-1">CHRONICLES OF VEYRATH — VOLUME I</p>
          <p>AN ARCHIVAL PRESERVATION BY HOUSE OF SARANAESWAR</p>
        </div>
      </div>

      {/* Archive Modal */}
      {isArchiveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl rounded-2xl bg-[#0d0b09] border border-amber-600/40 p-6 sm:p-8 shadow-2xl parchment-border max-h-[85vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsArchiveModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white border border-stone-800 cursor-pointer"
              aria-label="Close archive"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-amber-400 tracking-widest uppercase mb-1">
              <Scroll className="w-4 h-4" />
              <span>THE GRAND VAULT OF VEYRATH</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-100 mb-4">
              The Dragon Archive
            </h3>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer border ${
                    selectedCategory === cat
                      ? 'bg-amber-600/30 text-amber-200 border-amber-500/60'
                      : 'bg-stone-900/60 text-stone-400 border-stone-800 hover:border-stone-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Archive Entries Grid */}
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-5 rounded-xl bg-stone-900/60 border border-stone-800 hover:border-amber-600/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">
                      {entry.category}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500/50" />
                  </div>
                  <h4 className="text-lg font-cinzel font-bold text-amber-200 mb-2">
                    {entry.title}
                  </h4>
                  <p className="text-stone-300 font-garamond text-base leading-relaxed italic">
                    "{entry.excerpt}"
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800 flex justify-between items-center text-xs font-mono text-stone-400">
              <span>CANONICAL ENTRIES INDEXED: {filteredEntries.length}</span>
              <button
                onClick={() => setIsArchiveModalOpen(false)}
                className="px-4 py-1.5 rounded bg-amber-600/20 text-amber-300 border border-amber-600/40 text-xs font-cinzel uppercase hover:bg-amber-600/40 cursor-pointer"
              >
                Close Vault
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
