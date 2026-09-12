import React, { useState, useEffect } from 'react';
import { TopCenterpiece } from './components/TopCenterpiece';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { EmberCanvas } from './components/EmberCanvas';
import { HeroSection } from './components/HeroSection';
import { DragonShowcase3D } from './components/DragonShowcase3D';
import { DragonProfileAnatomy } from './components/DragonProfileAnatomy';
import { TimelineSection } from './components/TimelineSection';
import { BloodlineSection } from './components/BloodlineSection';
import { DanceOfCrownsSection } from './components/DanceOfCrownsSection';
import { DragonRiderSection } from './components/DragonRiderSection';
import { FinalArchiveSection } from './components/FinalArchiveSection';
import { UserDataExportModal } from './components/UserDataExportModal';
import { UserPreferences } from './types';
import { audioEngine } from './utils/audioSynthesizer';

const STORAGE_KEY = 'veyrath_chronicles_user_prefs';

const DEFAULT_PREFERENCES: UserPreferences = {
  allegiance: null,
  unlockedChronicles: [],
  soundEnabled: false,
  reducedMotion: false,
  readChapters: ['I'],
  discoveredAnatomy: ['scales'],
  userNotes: '',
  lastVisited: new Date().toISOString(),
  exportVersion: '1.2.0',
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...DEFAULT_PREFERENCES, ...JSON.parse(saved) };
    } catch {
      // Fallback
    }
    return DEFAULT_PREFERENCES;
  });

  // Persist preferences to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      // Storage unavailable
    }
  }, [preferences]);

  // Section observer for active navbar highlighting
  useEffect(() => {
    const sectionIds = ['hero', 'showcase', 'anatomy', 'history', 'bloodline', 'dance', 'archive'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const updatePreferences = (updated: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updated }));
  };

  const handleResetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const handleNavigate = (sectionId: string) => {
    audioEngine.playChime(460);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const isNowPlaying = audioEngine.toggle();
    updatePreferences({ soundEnabled: isNowPlaying });
  };

  const handlePledgeAllegiance = (factionId: string) => {
    updatePreferences({ allegiance: factionId });
  };

  const handleUnlockChronicle = (title: string) => {
    if (!preferences.unlockedChronicles.includes(title)) {
      updatePreferences({
        unlockedChronicles: [...preferences.unlockedChronicles, title],
      });
    }
  };

  const handleChapterRead = (numeral: string) => {
    if (!preferences.readChapters.includes(numeral)) {
      updatePreferences({
        readChapters: [...preferences.readChapters, numeral],
      });
    }
  };

  const handleDiscoverAnatomy = (pointId: string) => {
    if (!preferences.discoveredAnatomy.includes(pointId)) {
      updatePreferences({
        discoveredAnatomy: [...preferences.discoveredAnatomy, pointId],
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070605] text-[#e4dbce] selection:bg-amber-600/30 selection:text-amber-200 overflow-x-hidden font-sans">
      {/* 1. Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 2. Three.js Ember Atmosphere Canvas */}
      <EmberCanvas intensity={1} interactive={!preferences.reducedMotion} />

      {/* 3. Top Banner: Centered "Created By House Of Saranaeswar" */}
      <TopCenterpiece
        onOpenPreferences={() => setIsPreferencesModalOpen(true)}
        soundEnabled={preferences.soundEnabled}
        onToggleSound={handleToggleSound}
        userAllegiance={preferences.allegiance}
      />

      {/* 4. Sticky Navbar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* 5. Main Content Sections */}
      <main className="relative z-20">
        {/* Hero Section */}
        <HeroSection
          onExploreLegend={() => handleNavigate('history')}
          onViewDragon={() => handleNavigate('showcase')}
        />

        {/* 3D-style Turntable Dragon Showcase */}
        <DragonShowcase3D />

        {/* Dragon Profile & Anatomy */}
        <DragonProfileAnatomy
          onDiscoverPoint={handleDiscoverAnatomy}
          discoveredPoints={preferences.discoveredAnatomy}
        />

        {/* Timeline: The Age of Ash */}
        <TimelineSection
          onChapterRead={handleChapterRead}
          readChapters={preferences.readChapters}
        />

        {/* Royal Dynasty / Bloodline Section */}
        <BloodlineSection />

        {/* Political Intrigue: The Dance of Crowns */}
        <DanceOfCrownsSection
          userAllegiance={preferences.allegiance}
          onPledgeAllegiance={handlePledgeAllegiance}
        />

        {/* Dragon Rider: Lord Vaelor Veyr */}
        <DragonRiderSection
          onUnlockChronicle={handleUnlockChronicle}
          unlockedChronicles={preferences.unlockedChronicles}
        />

        {/* Final Dramatic Closing Section & Lore Archive */}
        <FinalArchiveSection onReadAgain={() => handleNavigate('hero')} />
      </main>

      {/* 6. User Preferences & JSON Export Modal */}
      <UserDataExportModal
        isOpen={isPreferencesModalOpen}
        onClose={() => setIsPreferencesModalOpen(false)}
        preferences={preferences}
        onUpdatePreferences={updatePreferences}
        onResetPreferences={handleResetPreferences}
      />
    </div>
  );
}
