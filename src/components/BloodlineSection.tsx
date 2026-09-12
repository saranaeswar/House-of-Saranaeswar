import React, { useState } from 'react';
import { ROYAL_MEMBERS } from '../data/loreData';
import { Crown, Flame, Shield, ArrowDown, UserCheck, AlertTriangle } from 'lucide-react';
import { audioEngine } from '../utils/audioSynthesizer';

export const BloodlineSection: React.FC = () => {
  const [selectedMemberId, setSelectedMemberId] = useState<string>('aerion');

  const selectedMember = ROYAL_MEMBERS.find((m) => m.id === selectedMemberId) || ROYAL_MEMBERS[0];

  const handleSelect = (id: string) => {
    audioEngine.playChime(530);
    setSelectedMemberId(id);
  };

  return (
    <section id="bloodline" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#090807]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-600/30 text-amber-400 text-xs font-mono tracking-widest uppercase mb-3">
            <Crown className="w-3.5 h-3.5 text-amber-500" />
            <span>GENEALOGIA REGALIS • HOUSE VEYR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-cinzel font-black tracking-widest text-gold-gradient uppercase mb-4">
            THE BLOOD OF THE DRAGON
          </h2>
          <p className="text-stone-300 font-garamond text-base sm:text-lg italic">
            "Those who bind fire to crowns must remember: iron melts, blood spills, and wings owe allegiance only to the storm."
          </p>
        </div>

        {/* Thematic Pillars Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {[
            { title: 'Dynastic Succession', desc: 'The eldest child alone may approach the brooding crag.' },
            { title: 'Sacred Legitimacy', desc: 'A monarch unchosen by dragonfire rules only in shadow.' },
            { title: 'The Rider Covenant', desc: 'A soul-bond severed only when the rider’s heart ceases.' },
            { title: 'The Weapon of Kings', desc: 'Dragons turn disputes of gold into deserts of black glass.' },
          ].map((pillar) => (
            <div
              key={pillar.title}
              className="p-4 rounded-xl bg-stone-900/40 border border-stone-800 text-center"
            >
              <h4 className="text-xs font-cinzel font-bold text-amber-300 uppercase mb-1">
                {pillar.title}
              </h4>
              <p className="text-[11px] text-stone-400 font-sans leading-snug">{pillar.desc}</p>
            </div>
          ))}
        </div>

        {/* Royal Lineage Tree Nodes */}
        <div className="relative mb-12">
          {/* Top Dynasty House Banner */}
          <div className="max-w-sm mx-auto text-center p-4 rounded-xl bg-gradient-to-b from-amber-950/60 to-stone-900/80 border border-amber-600/40 shadow-xl mb-8">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full border border-amber-500 flex items-center justify-center bg-black/40">
              <Flame className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-lg font-cinzel font-bold text-amber-200">HOUSE VEYR</h3>
            <span className="text-xs font-mono text-amber-500/80 tracking-widest uppercase">
              The First Flame • Founders of Veyrath
            </span>
          </div>

          <div className="flex justify-center mb-6">
            <ArrowDown className="w-5 h-5 text-amber-600 animate-bounce" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {ROYAL_MEMBERS.map((member) => {
              const isSelected = member.id === selectedMemberId;

              return (
                <button
                  key={member.id}
                  id={`royal-card-${member.id}`}
                  onClick={() => handleSelect(member.id)}
                  className={`p-5 rounded-2xl text-left transition-all duration-300 cursor-pointer border relative overflow-hidden group ${
                    isSelected
                      ? 'bg-stone-900/90 border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.25)] ring-1 ring-amber-400/40'
                      : 'bg-stone-900/40 border-stone-800 hover:border-amber-700/60 hover:bg-stone-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">
                      {member.reignYears}
                    </span>
                    {isSelected && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-700">
                        <UserCheck className="w-3 h-3 text-amber-400" />
                        ACTIVE RECORD
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-cinzel font-bold text-amber-100 group-hover:text-amber-300 transition-colors">
                    {member.name}
                  </h4>
                  <div className="text-xs font-garamond italic text-amber-400/90 mb-3">
                    {member.title} • "{member.epithet}"
                  </div>

                  <p className="text-xs text-stone-400 font-sans line-clamp-2 leading-relaxed">
                    {member.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-[11px] font-mono text-stone-500">
                    <span className="truncate">{member.dragonBond.split(' ')[0]} Bond</span>
                    <span className="text-amber-500/80 group-hover:text-amber-300">Examine →</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Royal Focus Showcase Box */}
        <div className="p-8 rounded-2xl bg-stone-900/80 border border-amber-600/30 parchment-border shadow-2xl relative">
          <div className="flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="space-y-3 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded bg-amber-950/60 border border-amber-700/40 text-amber-300 text-xs font-mono uppercase">
                <Crown className="w-3 h-3 text-amber-400" />
                <span>EPITAPH & LEGACY ARCHIVE</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-amber-200">
                {selectedMember.name} — {selectedMember.epithet}
              </h3>

              <div className="text-sm font-mono text-amber-500">
                Bond Status: <span className="text-amber-300">{selectedMember.dragonBond}</span>
              </div>

              <p className="text-base text-stone-300 font-sans leading-relaxed">
                {selectedMember.description}
              </p>

              <div className="p-4 rounded-xl bg-black/40 border border-amber-900/40">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs font-mono text-amber-400 uppercase tracking-wider mb-1">
                      Historical Legacy & Sovereign Precedent
                    </span>
                    <p className="text-sm font-garamond italic text-stone-300">
                      {selectedMember.legacy}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emblem Seal Column */}
            <div className="w-full md:w-64 shrink-0 p-5 rounded-xl bg-black/50 border border-stone-800 text-center flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-amber-500/60 flex items-center justify-center bg-gradient-to-b from-amber-950 to-stone-900 shadow-[0_0_20px_rgba(245,158,11,0.3)] mb-3">
                <Shield className="w-9 h-9 text-amber-400" />
              </div>
              <span className="text-xs font-cinzel font-bold text-amber-300 uppercase tracking-wider">
                {selectedMember.title}
              </span>
              <span className="text-[11px] font-mono text-stone-500 mt-1">
                SEAL OF THE VEYR COVENANT
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
