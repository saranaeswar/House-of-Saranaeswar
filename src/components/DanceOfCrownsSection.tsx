import React from 'react';
import { FACTIONS } from '../data/loreData';
import { Shield, Swords, Flame, CheckCircle2 } from 'lucide-react';
import { audioEngine } from '../utils/audioSynthesizer';

interface DanceOfCrownsSectionProps {
  userAllegiance: string | null;
  onPledgeAllegiance: (factionId: string) => void;
}

export const DanceOfCrownsSection: React.FC<DanceOfCrownsSectionProps> = ({
  userAllegiance,
  onPledgeAllegiance,
}) => {
  const handlePledge = (id: string) => {
    audioEngine.playChime(640);
    onPledgeAllegiance(id);
  };

  return (
    <section id="dance" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#070605]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-600/30 text-amber-400 text-xs font-mono tracking-widest uppercase mb-3">
            <Swords className="w-3.5 h-3.5 text-amber-500" />
            <span>FACTIONAL RIVALRIES & CIVIL SCHISM</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-cinzel font-black tracking-widest text-gold-gradient uppercase mb-4">
            THE DANCE OF CROWNS
          </h2>

          <p className="text-xl sm:text-2xl font-cinzel font-bold text-ember-gradient italic max-w-2xl mx-auto mb-4">
            "When blood inherits fire, the throne becomes a battlefield."
          </p>

          <p className="text-stone-300 font-garamond text-base sm:text-lg italic max-w-2xl mx-auto">
            Three factions clash for the ruins of Veyrath. The dragon circles above, oblivious to human decrees, waiting for the true heir of the mountain flame.
          </p>
        </div>

        {/* 3 Faction Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {FACTIONS.map((faction) => {
            const isPledged = userAllegiance === faction.id;

            return (
              <div
                key={faction.id}
                id={`faction-card-${faction.id}`}
                className={`rounded-2xl p-6 bg-stone-900/60 border flex flex-col justify-between transition-all duration-300 relative group overflow-hidden ${
                  isPledged
                    ? `${faction.colorScheme.border} ring-2 ring-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]`
                    : `${faction.colorScheme.border} hover:border-amber-500/50`
                }`}
              >
                {/* Ambient glow accent top edge */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: faction.colorScheme.accent }}
                />

                <div>
                  {/* Faction Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-mono px-2.5 py-1 rounded border uppercase tracking-widest ${faction.colorScheme.badge}`}>
                      {faction.creed}
                    </span>
                    {isPledged && (
                      <span className="flex items-center gap-1 text-xs font-mono text-amber-400 font-semibold bg-amber-950/80 px-2 py-0.5 rounded border border-amber-600/40">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        PLEDGED
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-cinzel font-bold text-amber-100 mb-2">
                    {faction.name}
                  </h3>

                  <div className="text-xs font-mono text-stone-400 mb-4">
                    Leader: <span className="text-stone-200">{faction.leader}</span>
                  </div>

                  {/* Core Belief Callout */}
                  <div className="p-4 rounded-xl bg-black/40 border border-stone-800/80 mb-5">
                    <p className="text-xs font-sans text-stone-300 leading-relaxed">
                      {faction.coreBelief}
                    </p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-xs font-mono text-stone-400 pb-4 mb-4 border-b border-stone-800">
                    <div className="flex justify-between">
                      <span className="text-stone-500">POWER BASE:</span>
                      <span className="text-stone-300 text-right">{faction.powerBase}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">DRAGON DOCTRINE:</span>
                      <span className="text-stone-300 text-right">{faction.dragonAffinity}</span>
                    </div>
                  </div>
                </div>

                {/* Pledge Button */}
                <button
                  id={`pledge-btn-${faction.id}`}
                  onClick={() => handlePledge(faction.id)}
                  className={`w-full py-3 rounded-xl font-cinzel font-bold text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                    isPledged
                      ? 'bg-amber-600 text-stone-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                      : 'bg-stone-800 hover:bg-amber-600/20 text-stone-300 hover:text-amber-300 border border-stone-700 hover:border-amber-500/50'
                  }`}
                >
                  {isPledged ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-stone-950" />
                      <span>Allegiance Sworn</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-4 h-4 text-amber-500" />
                      <span>Pledge Allegiance</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Civil War Warning Footer Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-red-950/40 via-stone-900/70 to-amber-950/40 border border-red-900/30 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-red-400 text-xs font-mono tracking-widest uppercase mb-2">
            <Flame className="w-4 h-4" />
            <span>WARNING OF ARCHIVIST SOLOMON</span>
          </div>
          <p className="text-sm font-garamond italic text-stone-300">
            "Whichever banner you lift, remember: when dragons take wing in anger, no castle wall endures, and no throne remains unburnt."
          </p>
        </div>
      </div>
    </section>
  );
};
