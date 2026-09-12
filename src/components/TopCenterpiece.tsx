import React from 'react';
import { Crown, Download, Settings, Volume2, VolumeX } from 'lucide-react';

interface TopCenterpieceProps {
  onOpenPreferences: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  userAllegiance: string | null;
}

export const TopCenterpiece: React.FC<TopCenterpieceProps> = ({
  onOpenPreferences,
  soundEnabled,
  onToggleSound,
  userAllegiance,
}) => {
  return (
    <div
      id="house-saranaeswar-banner"
      className="w-full bg-[#0d0a08]/90 border-b border-amber-900/40 backdrop-blur-md z-40 py-2 px-4 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left status / allegiance badge */}
        <div className="flex items-center gap-3 text-xs tracking-widest text-amber-500/80 font-mono hidden md:flex">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>REALM: VEYRATH CHRONICLES</span>
          {userAllegiance && (
            <span className="text-amber-300 font-semibold uppercase bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
              {userAllegiance}
            </span>
          )}
        </div>

        {/* Center: MANDATED CREATED BY HOUSE OF SARANAESWAR */}
        <div className="flex items-center justify-center gap-2 text-center mx-auto">
          <Crown className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          <span className="text-xs sm:text-sm font-cinzel font-bold tracking-[0.25em] text-gold-gradient uppercase drop-shadow">
            Created By House Of Saranaeswar
          </span>
          <Crown className="w-4 h-4 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
        </div>

        {/* Right action controls */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            id="audio-toggle-btn"
            onClick={onToggleSound}
            className={`px-2.5 py-1 rounded text-xs font-cinzel flex items-center gap-1.5 transition-all duration-200 border ${
              soundEnabled
                ? 'bg-amber-950/60 border-amber-500/50 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                : 'bg-stone-900/80 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
            title={soundEnabled ? 'Mute Atmosphere' : 'Enable Ambience'}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{soundEnabled ? 'Atmosphere: On' : 'Atmosphere: Off'}</span>
          </button>

          {/* Preferences & Export Data Button */}
          <button
            id="open-preferences-btn"
            onClick={onOpenPreferences}
            className="px-2.5 py-1 rounded text-xs font-cinzel flex items-center gap-1.5 bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-600/40 hover:border-amber-400 transition-all duration-200 shadow-[0_0_10px_rgba(245,158,11,0.15)] cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span className="font-semibold">Options & Export</span>
            <Download className="w-3 h-3 text-amber-400/80 hidden sm:inline" />
          </button>
        </div>
      </div>
    </div>
  );
};
