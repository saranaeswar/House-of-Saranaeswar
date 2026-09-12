# THE LAST WYRM — Chronicles of Veyrath

> An interactive, immersive 3D fantasy dragon showcase and lore experience, centered around the ancient mountain wyrm of Mount Veyr.

**Created By House Of Saranaeswar**

---

## Overview

"THE LAST WYRM — Chronicles of Veyrath" is a dark, cinematic medieval-fantasy web experience combining ancient dragon mythology, royal bloodlines, political intrigue, and a lost kingdom.

The uploaded dragon image serves as the central character and visual identity: an ancient mountain titan with black volcanic armor, ragged wings, amber eye, and a royal horn crown perched atop the jagged peaks of Mount Veyr.

---

## Key Features

1. **Top Centerpiece Banner**
   - Centered heraldic banner: **"Created By House Of Saranaeswar"** with options menu, atmospheric audio toggle, and JSON data exporter.

2. **Cinematic Awakening Sequence**
   - Atmospheric loading screen featuring `"THE CHRONICLES AWAKEN"` with rune pulse and ember effects.

3. **Hero Section: "The Last Wyrm"**
   - Full-screen cinematic presentation with mouse-reactive parallax, drifting mist, glowing volcanic backlight, and responsive entry.

4. **Interactive 3D Dragon Showcase: "The Beast Beyond the Mountains"**
   - Dedicated 3D-inspired turntable stage with degree markings (0°–360°).
   - Drag-to-rotate interaction (mouse and touch).
   - Rotation step controls (Left/Right 30°), Auto-Rotate toggle, and Fullscreen mode.
   - Multi-perspective mode (Sovereign Perch, Relic Pedestal, Crowned Visage).
   - Comprehensive lore metrics: Species (Ancient Mountain Wyrm), Length (82 ft), Wingspan (140 ft), Element (Primordial Fire), Status (Last Known Survivor), Threat Level (Cataclysmic).

5. **Dragon Profile: "Anatomy of a Legend"**
   - Interactive anatomy diagram with hotspot pins directly positioned across the dragon's body:
     - **Scales**: Squama Vulcanica — black volcanic armor that absorbs light.
     - **Eyes**: Oculus Regalis — amber, recognizing ancient royal blood.
     - **Wings**: Alae Tempestatis — torn membranes shaped by centuries of gales.
     - **Horns**: Corona Draconis — crown-like spines of the old dynasty.
     - **Breath**: Ignis Primordialis — rare white-gold flame.
     - **Temperament**: Animus Inconcessus — intelligent, territorial, and fiercely loyal.

6. **Lore Timeline: "The Age of Ash"**
   - Vertical timeline covering all five canonical chapters:
     - **I. The First Ember** (Hatching in Mount Veyr)
     - **II. The Oath of Blood** (House Veyr and the First Throne)
     - **III. The War of Cinders** (Succession crisis and burning valleys)
     - **IV. The Fall of Veyrath** (Prince Caelan's assassination and the beast's grief)
     - **V. The Last Flight** (The solitary wyrm circling the ruins during storms)

7. **Royal Bloodline: "The Blood of the Dragon"**
   - Dynastic tree of House Veyr exploring royal legitimacy, family betrayal, and dragon-rider covenants:
     - King Aerion Veyr — *The Dragonbinder*
     - Queen Maelyra Veyr — *The Ashen Crown*
     - Prince Caelan Veyr — *The Broken Heir*
     - The Last Wyrm — *The Unclaimed Throne*

8. **Political Intrigue: "The Dance of Crowns"**
   - *"When blood inherits fire, the throne becomes a battlefield."*
   - Interactive allegiance pledging to three rival factions:
     - **The Ember Crown**: Eldest bloodline legitimacy.
     - **The Blackwing Council**: Dragons serving the realm, not the throne.
     - **The Ashen Heir**: Hidden northern exile claimant.

9. **Dragon Rider Profile & Hidden Chronicle**
   - Lord Vaelor Veyr (*The Last Dragonbinder*), missing since the burning of Veyrath.
   - Interactive **"Reveal the Lost Chronicle"** modal unveiling the recovered northern parchment.

10. **Final Closing Section: "The Fire Still Remembers"**
    - Dramatic silhouette with "Read the Chronicles Again" and an interactive **Dragon Archive Vault** featuring categorized historical entries.

11. **User Data Export (JSON)**
    - Comprehensive modal to view exploration progress, custom scholar notes, chosen allegiance, and export as `veyrath_chronicles_user_data.json`.

12. **Procedural Web Audio Synthesizer**
    - 100% client-side, royalty-free soundscape generating mountain winds, low draconic resonance, and interactive crystal chimes without external audio dependencies.

---

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS v4
- **3D & Particles**: Three.js (dynamic ember point cloud) + CSS 3D Perspective Transforms
- **Icons**: Lucide React
- **Audio**: Web Audio API (procedural synthesis)
- **State & Storage**: React Hooks + LocalStorage persistence

---

## Local Development & Setup

To run this project on your local machine:

### 1. Prerequisites
- Node.js (version 18 or higher recommended)
- npm or yarn

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The application will launch locally at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```
This bundles the optimized static assets into the `dist/` directory.

### 5. Preview Production Build
```bash
npm run preview
```
