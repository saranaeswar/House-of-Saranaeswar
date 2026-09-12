import React, { useState } from 'react';
import { Download, Copy, Check, X, Shield, BookOpen, Volume2, VolumeX, Sparkles, RefreshCw, FileCode } from 'lucide-react';
import { UserPreferences } from '../types';
import { audioEngine } from '../utils/audioSynthesizer';

interface UserDataExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onUpdatePreferences: (updated: Partial<UserPreferences>) => void;
  onResetPreferences: () => void;
}

export const UserDataExportModal: React.FC<UserDataExportModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onUpdatePreferences,
  onResetPreferences,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'export' | 'settings'>('export');
  const [notesInput, setNotesInput] = useState(preferences.userNotes || '');

  if (!isOpen) return null;

  const exportPayload = {
    creatorHeraldry: 'Created By House Of Saranaeswar',
    project: 'THE LAST WYRM — Chronicles of Veyrath',
    exportTimestamp: new Date().toISOString(),
    userPreferences: {
      allegiance: preferences.allegiance || 'Unaligned Wanderer',
      soundEnabled: preferences.soundEnabled,
      reducedMotion: preferences.reducedMotion,
    },
    chronicleProgress: {
      readChapters: preferences.readChapters,
      totalChapters: 5,
      completionPercentage: `${Math.round((preferences.readChapters.length / 5) * 100)}%`,
      discoveredAnatomyPoints: preferences.discoveredAnatomy,
      totalAnatomyPoints: 6,
      unlockedSecretChronicles: preferences.unlockedChronicles,
    },
    scholarNotes: notesInput,
    version: preferences.exportVersion || '1.0.0',
  };

  const jsonString = JSON.stringify(exportPayload, null, 2);

  const handleDownloadJSON = () => {
    audioEngine.playChime(640);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `veyrath_chronicles_user_data_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyJSON = () => {
    audioEngine.playChime(520);
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNotes = () => {
    onUpdatePreferences({ userNotes: notesInput });
    audioEngine.playChime(500);
  };

  return (
    <div
      id="user-data-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0c0a08] border border-amber-600/40 p-6 sm:p-8 shadow-2xl parchment-border max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white border border-stone-800 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400 tracking-widest uppercase mb-1">
          <Shield className="w-4 h-4" />
          <span>HOUSE OF SARANAESWAR ARCHIVAL SYSTEM</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-cinzel font-bold text-gold-gradient mb-4">
          User Preferences & Data Export
        </h3>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-stone-800 mb-6 pb-2">
          <button
            onClick={() => setActiveTab('export')}
            className={`px-4 py-1.5 rounded-t-lg font-cinzel text-xs uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'export'
                ? 'bg-amber-600/30 text-amber-200 border-b-2 border-amber-500 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Export JSON Data
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-1.5 rounded-t-lg font-cinzel text-xs uppercase tracking-wider transition-colors cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-amber-600/30 text-amber-200 border-b-2 border-amber-500 font-bold'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            Preferences & Notes
          </button>
        </div>

        {/* Tab 1: Export JSON View */}
        {activeTab === 'export' && (
          <div className="space-y-4">
            <p className="text-xs text-stone-300 font-sans">
              Export your current exploration log, chosen political allegiance, unlocked chronicles, and scholar notes as a structured JSON file.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/50 border border-stone-800 text-center font-mono text-xs">
              <div>
                <span className="text-stone-500 block">ALLEGIANCE</span>
                <span className="text-amber-400 font-bold uppercase">{preferences.allegiance || 'Unaligned'}</span>
              </div>
              <div>
                <span className="text-stone-500 block">CHAPTERS READ</span>
                <span className="text-amber-400 font-bold">{preferences.readChapters.length} / 5</span>
              </div>
              <div>
                <span className="text-stone-500 block">ANATOMY FOUND</span>
                <span className="text-amber-400 font-bold">{preferences.discoveredAnatomy.length} / 6</span>
              </div>
            </div>

            {/* JSON Code Preview */}
            <div className="relative rounded-xl overflow-hidden border border-stone-800 bg-[#070605]">
              <div className="flex items-center justify-between px-3 py-2 bg-stone-900 border-b border-stone-800 text-[11px] font-mono text-stone-400">
                <span className="flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-amber-500" />
                  veyrath_chronicles_user_data.json
                </span>
                <span>UTF-8 JSON</span>
              </div>
              <pre className="p-4 text-xs font-mono text-amber-200/90 overflow-x-auto max-h-56 leading-relaxed">
                {jsonString}
              </pre>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                id="download-json-btn"
                onClick={handleDownloadJSON}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-stone-950 font-cinzel font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.4)] cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download JSON File</span>
              </button>

              <button
                id="copy-json-btn"
                onClick={handleCopyJSON}
                className="py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 font-cinzel text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Preferences & Notes */}
        {activeTab === 'settings' && (
          <div className="space-y-5">
            {/* Audio Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-stone-900/60 border border-stone-800">
              <div>
                <span className="text-sm font-cinzel font-bold text-amber-200 block">
                  Atmospheric Soundscape
                </span>
                <span className="text-xs text-stone-400">
                  Procedural wind and low mountain embers (100% royalty-free Web Audio).
                </span>
              </div>
              <button
                onClick={() => {
                  const active = audioEngine.toggle();
                  onUpdatePreferences({ soundEnabled: active });
                }}
                className={`p-2.5 rounded-lg border flex items-center gap-2 text-xs font-mono transition-colors cursor-pointer ${
                  preferences.soundEnabled
                    ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                    : 'bg-stone-800 border-stone-700 text-stone-400'
                }`}
              >
                {preferences.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{preferences.soundEnabled ? 'ACTIVE' : 'MUTED'}</span>
              </button>
            </div>

            {/* Scholar Notes Field */}
            <div className="space-y-2">
              <label className="block text-xs font-mono text-amber-400 uppercase">
                Personal Scholar Notes (Exported in JSON)
              </label>
              <textarea
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Write your research notes, theories on Lord Vaelor, or allegiance oaths..."
                rows={4}
                className="w-full p-3 rounded-xl bg-black/60 border border-stone-800 text-sm font-sans text-stone-200 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <button
                onClick={handleSaveNotes}
                className="px-4 py-1.5 rounded bg-amber-600/30 text-amber-200 border border-amber-500/40 text-xs font-cinzel uppercase hover:bg-amber-600/50 cursor-pointer"
              >
                Save Scholar Notes
              </button>
            </div>

            {/* Reset Progress */}
            <div className="pt-4 border-t border-stone-800 flex justify-between items-center">
              <span className="text-xs text-stone-500">Reset all unlocked records & allegiance</span>
              <button
                onClick={() => {
                  onResetPreferences();
                  setNotesInput('');
                }}
                className="px-3 py-1.5 rounded bg-red-950/40 hover:bg-red-900/60 border border-red-900/60 text-red-300 text-xs font-mono uppercase flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Local Data</span>
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-stone-800 text-center text-[11px] font-mono text-stone-500">
          Created By House Of Saranaeswar • Encrypted Archive Protocol
        </div>
      </div>
    </div>
  );
};
