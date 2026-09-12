import React, { useState } from 'react';
import { TIMELINE_CHAPTERS } from '../data/loreData';
import { BookOpen, ChevronDown, ChevronUp, Flame, Quote, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioSynthesizer';

interface TimelineSectionProps {
  onChapterRead?: (chapterNumeral: string) => void;
  readChapters?: string[];
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({
  onChapterRead,
  readChapters = [],
}) => {
  const [expandedChapter, setExpandedChapter] = useState<string>('I');

  const toggleChapter = (numeral: string) => {
    audioEngine.playChime(500);
    const next = expandedChapter === numeral ? '' : numeral;
    setExpandedChapter(next);
    if (onChapterRead && next) {
      onChapterRead(next);
    }
  };

  return (
    <section id="history" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#070605]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-600/30 text-amber-400 text-xs font-mono tracking-widest uppercase mb-3">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>THE AGE OF ASH • FIVE CANONICAL CHAPTERS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-black tracking-widest text-gold-gradient uppercase mb-4">
            HISTORY OF THE WYRM
          </h2>
          <p className="text-stone-300 font-garamond text-base sm:text-lg italic">
            "From the tectonic cradle of Mount Veyr to the solitary sentinel skies above the fallen citadel."
          </p>
        </div>

        {/* Vertical Timeline Structure */}
        <div className="relative">
          {/* Central Vertical Spine Line with amber gradient */}
          <div className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-amber-600 via-amber-800 to-stone-900 -translate-x-1/2" />

          <div className="space-y-12">
            {TIMELINE_CHAPTERS.map((ch, idx) => {
              const isExpanded = expandedChapter === ch.numeral;
              const isEven = idx % 2 === 0;
              const isRead = readChapters.includes(ch.numeral);

              return (
                <div
                  key={ch.numeral}
                  id={`timeline-chapter-${ch.numeral}`}
                  className="relative flex flex-col sm:flex-row items-start gap-6 sm:gap-0 group"
                >
                  {/* Central Node Circle */}
                  <div className="absolute left-6 sm:left-1/2 -translate-x-1/2 top-2 z-10">
                    <button
                      onClick={() => toggleChapter(ch.numeral)}
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-cinzel font-bold text-xs transition-all duration-300 border cursor-pointer ${
                        isExpanded
                          ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.8)] scale-110'
                          : isRead
                          ? 'bg-amber-950 text-amber-300 border-amber-600/60'
                          : 'bg-stone-900 text-stone-400 border-stone-700 hover:border-amber-500'
                      }`}
                      aria-label={`Chapter ${ch.numeral}`}
                    >
                      {ch.numeral}
                    </button>
                  </div>

                  {/* Left Side Content Container */}
                  <div
                    className={`w-full sm:w-1/2 pl-14 sm:pl-0 ${
                      isEven ? 'sm:pr-12 sm:text-right' : 'sm:order-2 sm:pl-12 sm:text-left'
                    }`}
                  >
                    <div
                      className={`p-6 rounded-2xl bg-stone-900/60 border transition-all duration-300 ${
                        isExpanded
                          ? 'border-amber-500/60 bg-stone-900/90 shadow-[0_0_30px_rgba(245,158,11,0.15)]'
                          : 'border-stone-800 hover:border-amber-900/60'
                      }`}
                    >
                      {/* Era Tag */}
                      <div
                        className={`flex items-center gap-2 mb-2 text-xs font-mono text-amber-400/80 tracking-widest uppercase ${
                          isEven ? 'sm:justify-end' : 'sm:justify-start'
                        }`}
                      >
                        <Flame className="w-3 h-3 text-amber-500" />
                        <span>{ch.era}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-amber-200 mb-2">
                        Chapter {ch.numeral}: {ch.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-stone-300 font-sans text-sm leading-relaxed mb-4">
                        {ch.summary}
                      </p>

                      {/* Expand Toggle */}
                      <button
                        onClick={() => toggleChapter(ch.numeral)}
                        className={`inline-flex items-center gap-1.5 text-xs font-cinzel tracking-wider uppercase text-amber-400 hover:text-amber-300 font-semibold cursor-pointer mb-2`}
                      >
                        <span>{isExpanded ? 'Conceal Full Record' : 'Unroll Full Chronicle'}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {/* Expandable Full Chronicle & Ancient Quote */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-stone-800 text-left space-y-4 animate-in fade-in duration-300">
                          <p className="text-stone-300 font-garamond text-base leading-relaxed">
                            {ch.fullChronicle}
                          </p>

                          <div className="p-4 rounded-xl bg-black/50 border-l-2 border-amber-600 italic">
                            <div className="flex items-start gap-2">
                              <Quote className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                              <div className="space-y-1">
                                <p className="text-amber-200 text-sm font-garamond">
                                  "{ch.quote}"
                                </p>
                                <span className="block text-[11px] font-mono text-stone-500 not-italic">
                                  — {ch.speaker}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Empty Spacer Column on Opposite Side */}
                  <div className={`hidden sm:block w-1/2 ${isEven ? 'sm:order-2' : ''}`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Timeline Bottom Lore Footer */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/80 border border-amber-900/40 text-xs font-mono text-stone-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>PROGRESS: {readChapters.length} OF 5 CHRONICLES TRANSCRIBED</span>
          </div>
        </div>
      </div>
    </section>
  );
};
