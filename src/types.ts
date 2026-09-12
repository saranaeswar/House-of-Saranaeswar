export interface DragonStat {
  label: string;
  value: string;
  detail: string;
  iconName: string;
}

export interface AnatomyPoint {
  id: string;
  name: string;
  latinName: string;
  summary: string;
  scholarNote: string;
  xPercent: number; // For hotspot pin overlay
  yPercent: number;
}

export interface TimelineChapter {
  numeral: string;
  title: string;
  era: string;
  summary: string;
  fullChronicle: string;
  quote: string;
  speaker: string;
}

export interface RoyalMember {
  id: string;
  name: string;
  title: string;
  epithet: string;
  dragonBond: string;
  reignYears: string;
  description: string;
  legacy: string;
  sigilColor: string;
}

export interface Faction {
  id: string;
  name: string;
  creed: string;
  coreBelief: string;
  leader: string;
  powerBase: string;
  dragonAffinity: string;
  colorScheme: {
    border: string;
    badge: string;
    glow: string;
    accent: string;
  };
}

export interface LostChronicle {
  title: string;
  discoveredAt: string;
  archivist: string;
  passage: string[];
}

export interface UserPreferences {
  allegiance: string | null;
  unlockedChronicles: string[];
  soundEnabled: boolean;
  reducedMotion: boolean;
  readChapters: string[];
  discoveredAnatomy: string[];
  userNotes: string;
  lastVisited: string;
  exportVersion: string;
}
