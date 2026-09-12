import React, { useEffect, useState } from 'react';
import { Flame, Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setFadeOut(true), 300);
          setTimeout(() => onComplete(), 900);
          return 100;
        }
        return prev + Math.floor(Math.random() * 18) + 8;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      id="chronicles-loading-screen"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070605] text-[#e8ded1] transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background dark radial glow */}
      <div className="absolute inset-0 bg-radial-ember pointer-events-none opacity-40 animate-pulse-glow" />

      <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full border border-amber-500/40 flex items-center justify-center bg-amber-950/40 shadow-[0_0_25px_rgba(245,158,11,0.4)] animate-pulse">
            <Flame className="w-8 h-8 text-amber-400" />
          </div>
          <Sparkles className="w-4 h-4 text-amber-300 absolute -top-1 -right-1 animate-ping" />
        </div>

        <p className="text-xs font-mono tracking-[0.3em] text-amber-500/70 uppercase mb-2">
          House of Saranaeswar Presents
        </p>

        <h1 className="text-2xl sm:text-3xl font-cinzel font-bold tracking-[0.25em] text-gold-gradient uppercase mb-4">
          THE CHRONICLES AWAKEN
        </h1>

        <p className="text-xs font-garamond italic text-stone-400 max-w-xs mb-8">
          Rekindling ancient records of Mount Veyr and the Black Titan...
        </p>

        {/* Progress bar with glowing ember thumb */}
        <div className="w-64 h-1.5 bg-stone-900 rounded-full overflow-hidden border border-amber-900/30 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-amber-700 via-amber-500 to-yellow-400 rounded-full transition-all duration-200 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between w-64 text-[10px] font-mono text-stone-500 tracking-wider">
          <span>CODEX INITIALIZATION</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </div>
  );
};
