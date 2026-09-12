import { DragonStat, AnatomyPoint, TimelineChapter, RoyalMember, Faction, LostChronicle } from '../types';

export const DRAGON_STATS: DragonStat[] = [
  { label: 'Species', value: 'Ancient Mountain Wyrm', detail: 'The elder branch of primordial serpents, born of molten deep-strata.', iconName: 'ShieldAlert' },
  { label: 'Length', value: '82 Feet', detail: 'From horned snout to barbed tail-scythe, measured at maturity.', iconName: 'Ruler' },
  { label: 'Wingspan', value: '140 Feet', detail: 'Capable of riding storm thermals higher than eagle or falcon.', iconName: 'Wind' },
  { label: 'Element', value: 'Primordial Fire', detail: 'White-gold flame that calcifies granite and consumes raw iron.', iconName: 'Flame' },
  { label: 'Status', value: 'Last Known Survivor', detail: 'Unseen in the low valleys since the catastrophic Sack of Veyrath.', iconName: 'Eye' },
  { label: 'Threat Level', value: 'Cataclysmic', detail: 'A singular beast capable of levelling fortresses and shifting wars.', iconName: 'Skull' }
];

export const ANATOMY_POINTS: AnatomyPoint[] = [
  {
    id: 'scales',
    name: 'Scales',
    latinName: 'Squama Vulcanica',
    summary: 'Black volcanic armor that absorbs the light around it.',
    scholarNote: 'Arch-Scholar Melissar notes that arrows of hardened steel shatter upon impact like dried clay. Each scale is interlaced with basalt and cooled magma, deflecting both mortal blades and lower-order incendiaries.',
    xPercent: 48,
    yPercent: 55
  },
  {
    id: 'eyes',
    name: 'Eyes',
    latinName: 'Oculus Regalis',
    summary: 'Amber, said to recognize the blood of ancient rulers.',
    scholarNote: 'Unlike common beasts of prey, the Wyrm possesses a dual nictitating membrane of crystalline clarity. In ancient scrolls, it is written that looking directly into its amber pupil will either command reverence or bring instant madness.',
    xPercent: 72,
    yPercent: 18
  },
  {
    id: 'wings',
    name: 'Wings',
    latinName: 'Alae Tempestatis',
    summary: 'Torn membranes shaped by centuries of mountain storms.',
    scholarNote: 'Though tattered from uncounted clashes and jagged mountain gales, the wing-struts are hollow obsidian bone, possessing extraordinary tensile endurance. The wind screaming through the ragged tears sounds like the wailing of a dead empire.',
    xPercent: 25,
    yPercent: 24
  },
  {
    id: 'horns',
    name: 'Horns',
    latinName: 'Corona Draconis',
    summary: 'Crown-like spines associated with the old wyrm dynasty.',
    scholarNote: 'Eight rearward serrated horns form a majestic diadem upon the skull. Ancient kings of House Veyr fashioned their iron coronation helms to mirror this exact curvature, signifying their covenant with the skies.',
    xPercent: 62,
    yPercent: 12
  },
  {
    id: 'breath',
    name: 'Breath',
    latinName: 'Ignis Primordialis',
    summary: 'A rare white-gold flame that purges rather than burns.',
    scholarNote: 'Formed deep within dual chemical organs adjacent to the rib cage. When discharged, the breath burns with silent blinding brilliance, reaching temperatures high enough to liquefy siege walls in seconds.',
    xPercent: 78,
    yPercent: 24
  },
  {
    id: 'temperament',
    name: 'Temperament',
    latinName: 'Animus Inconcessus',
    summary: 'Intelligent, territorial, and fiercely loyal to its chosen rider.',
    scholarNote: 'Not a savage brute, but a sentient elder consciousness. It will refuse commands given in fear or greed, acknowledging only those who bear the unyielding iron will of the true Veyrian bloodline.',
    xPercent: 40,
    yPercent: 40
  }
];

export const TIMELINE_CHAPTERS: TimelineChapter[] = [
  {
    numeral: 'I',
    title: 'The First Ember',
    era: 'c. 1,420 Before the Division',
    summary: 'Long before the kingdoms were mapped, the dragon hatched inside a volcanic mountain known as Mount Veyr.',
    fullChronicle: 'The volcanic cradle of Mount Veyr burned with primordial heat. Deep in the subterranean caverns, an egg of dark crystalline stone rested untouched for a thousand years. When the tectonic crest fractured under the celestial convergence, the beast cracked its shell. It fed on rivers of pure molten brimstone, its wings stretching into the obsidian night sky before humanity had ever raised a single stone tower in the valley below.',
    quote: 'The mountain did not give birth to a creature; it gave flesh to the ancient flame of the world.',
    speaker: 'Chronicles of the Deep Basin'
  },
  {
    numeral: 'II',
    title: 'The Oath of Blood',
    era: 'c. 890 Before the Division',
    summary: 'An ancient royal family discovered the dragon and formed a bond with it. The relationship between dragon and dynasty shaped the first Veyrian throne.',
    fullChronicle: 'High King Aerion ascended the treacherous cliffs of the Northern Spine alone, armed not with a spear, but with an ancient bronze brazier burning with his own spilled blood. The great wyrm descended. In that sacred twilight between life and ash, the dragon bowed its crowned head. From that hour, House Veyr rose above all warring clans, founding the High Citadel of Veyrath under the shadow of invulnerable wings.',
    quote: 'No crown of gold could ever equal the shadow of wings cast across our enemies.',
    speaker: 'King Aerion I'
  },
  {
    numeral: 'III',
    title: 'The War of Cinders',
    era: 'c. 310 Before the Division',
    summary: 'A succession crisis divided the royal house. Rival heirs claimed the throne, and dragons became symbols of competing bloodlines. The conflict devastated entire valleys.',
    fullChronicle: 'When the line of succession was contested by Queen Maelyra and her brother Lord Daeron, the sky turned to furnace ash. The lesser drakes of the mountain were unleashed in brutal territorial war. Fields of wheat became plains of black glass. Sibling fought sibling with dragonfire; the great wyrm refused to strike his kin until compelled by ancient sorceries, weeping tears of molten gold as the high valleys burned.',
    quote: 'When brothers quarrel with swords, men bleed. When royals quarrel with dragons, dynasties drown.',
    speaker: 'Archivist Valerius'
  },
  {
    numeral: 'IV',
    title: 'The Fall of Veyrath',
    era: 'The Night of Broken Seals',
    summary: 'The capital was consumed by betrayal, fire, and civil war. The dragon vanished into the northern mountains after witnessing the destruction of its riders.',
    fullChronicle: 'Treachery from within cracked the city gates. In the desperate final hours of the siege, Prince Caelan attempted to unleash the wyrm upon the invading armies. But assassins struck the Prince with poison-tipped ballistas before the saddle was buckled. As Caelan collapsed into his blood, the enraged wyrm incinerated the palace spires in sheer grief, took to the tempestuous northern gale, and vanished beyond the storm horizon.',
    quote: 'The city died not from the siege engines of our foes, but from the broken heart of a beast.',
    speaker: 'Anonymous Survivor of Veyrath'
  },
  {
    numeral: 'V',
    title: 'The Last Flight',
    era: 'The Present Storm',
    summary: 'Centuries later, rumors spread that a black-winged wyrm still circles the ruined fortress during storms. Some believe it guards the last surviving heir. Others believe it is waiting for the return of the old bloodline.',
    fullChronicle: 'Shepherds and high mountain watchmen speak in hushed whispers of an immense silhouette passing before the moon during violent lightning storms. The high pinnacles of the ruined capital still glow with faint thermal embers in the dead of winter. Ancient prophecies predict the Wyrm will not descend again until the true blood of House Veyr returns to claim the throne.',
    quote: 'The dragon does not sleep; it waits. And fire never forgets its makers.',
    speaker: 'Folklore of the Northern Passes'
  }
];

export const ROYAL_MEMBERS: RoyalMember[] = [
  {
    id: 'aerion',
    name: 'King Aerion Veyr',
    title: 'The First Sovereign',
    epithet: 'The Dragonbinder',
    dragonBond: 'Bound to the Last Wyrm in the First Century',
    reignYears: '920 – 860 B.D.',
    description: 'The legendary warlord who dared to climb the Crag of Veyr without armor. He forged the First Concordat, unifying seven warring northern realms under the iron banner of dragon sovereignty.',
    legacy: 'Constructed the High Citadel of Veyrath, designed with perches to accommodate titans of flame.',
    sigilColor: 'from-amber-600 to-yellow-500'
  },
  {
    id: 'maelyra',
    name: 'Queen Maelyra Veyr',
    title: 'The Sovereign of Cinders',
    epithet: 'The Ashen Crown',
    dragonBond: 'Rider during the Great Southern Pacification',
    reignYears: '412 – 370 B.D.',
    description: 'A queen of unyielding steel and supreme tactical intellect. When rival lords sought to depose her during the Winter of Whispers, she flew alone at midnight, turning three rebel garrisons to glass in an hour.',
    legacy: 'Penned the Codex Draconis, detailing the biological rites and bloodlines required to tame primordial wyrms.',
    sigilColor: 'from-red-600 to-amber-700'
  },
  {
    id: 'caelan',
    name: 'Prince Caelan Veyr',
    title: 'The Lost Prince',
    epithet: 'The Broken Heir',
    dragonBond: 'Final acknowledged rider before the Cataclysm',
    reignYears: 'Slain in 12 B.D.',
    description: 'The youngest prince of the pure royal branch. Kindred to the wyrm since his childhood days in the roost, his untimely assassination shattered the fragile peace and precipitated the Fall of Veyrath.',
    legacy: 'His dragon saddle, inlaid with star-iron runes, was never recovered from the northern precipice.',
    sigilColor: 'from-stone-600 to-amber-900'
  },
  {
    id: 'the_wyrm',
    name: 'The Last Wyrm',
    title: 'Living Sovereign of the Clouds',
    epithet: 'The Unclaimed Throne',
    dragonBond: 'Immortal Titan of the Mountain',
    reignYears: 'Ancient Era – Present',
    description: 'Not merely a mount, but the living soul of the dynasty itself. Surviving all mortal kings and queens, it circles the high aerie, sovereign over stone and storm, beholden to no mortal decree.',
    legacy: 'Prophesied to burn the False Kings when the authentic royal lineage reclaims the Citadel.',
    sigilColor: 'from-amber-500 to-orange-600'
  }
];

export const FACTIONS: Faction[] = [
  {
    id: 'ember-crown',
    name: 'The Ember Crown',
    creed: 'Blood First, Blood Always',
    coreBelief: 'Believes the eldest unbroken bloodline must rule the realm and command the dragons. Compromise is weakness; the throne belongs solely to the legitimate heir of King Aerion.',
    leader: 'High Loyalist Lady Valerica Veyr',
    powerBase: 'The High Keeps of the Eastern Coast',
    dragonAffinity: 'Traditional Dragonbinder Rites & Iron Saddles',
    colorScheme: {
      border: 'border-amber-500/40',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      glow: 'group-hover:border-amber-400/70',
      accent: '#f59e0b'
    }
  },
  {
    id: 'blackwing-council',
    name: 'The Blackwing Council',
    creed: 'The Realm Before The Crown',
    coreBelief: 'Believes dragons should serve the protection of the common realm, not the vanity of a despotic throne. They argue the beast was given as a guardian, not a weapon of dynasty.',
    leader: 'Archon Solaen of the Obsidian Tower',
    powerBase: 'The Scholar Academies & Merchant Guilds',
    dragonAffinity: 'Restraint, Sanctuary Enclaves & Ancient Treatises',
    colorScheme: {
      border: 'border-cyan-700/40',
      badge: 'bg-cyan-900/30 text-cyan-300 border-cyan-500/40',
      glow: 'group-hover:border-cyan-400/70',
      accent: '#06b6d4'
    }
  },
  {
    id: 'ashen-heir',
    name: 'The Ashen Heir',
    creed: 'From The Ruins, Rebirth',
    coreBelief: 'A hidden faction rallying around a rumored bastard descendant living in northern exile. They claim the old kingdom fell due to decadent arrogance and only a child of trial can awaken the dragon.',
    leader: 'The Veiled Pretender of Frostcrag',
    powerBase: 'The Northern Border Clans & Outcasts',
    dragonAffinity: 'Instinctual Blood Call without Saddles or Chains',
    colorScheme: {
      border: 'border-red-600/40',
      badge: 'bg-red-900/30 text-red-300 border-red-500/40',
      glow: 'group-hover:border-red-400/70',
      accent: '#ef4444'
    }
  }
];

export const LOST_CHRONICLE_DATA: LostChronicle = {
  title: 'The Northern Fragment: Codex Vaelor',
  discoveredAt: 'Glacier of Mourning, Year 248 After the Fall',
  archivist: 'Brother Mael of the Silent Watch',
  passage: [
    'We rode into the teeth of the blinding blizzard as the bells of Veyrath tolled their final dirge behind us. The smoke of the burning towers rose like pillars of judgment into the heavens.',
    'My dragon did not falter. Even as the freezing mist frosted its scales and the winds tore at our cloaks, I felt the deep furnace thrumming inside its chest. It carried me above the jagged needle-spires where no man has ever walked.',
    'There is a sanctuary beyond the world map. An ancient valley of black basalt where warm geysers flow amidst the permafrost. Here the wyrm has laid me to rest. To whoever reads this parchment: do not seek the beast with armies or chains. It will only come when blood calls to blood, when the sky turns dark and the rightful flame is kindled once more.'
  ]
};

export const ARCHIVE_LORE_ENTRIES = [
  {
    id: 'dragon-origin',
    category: 'Creature Biology',
    title: 'The Hatching of Primordial Wyrms',
    excerpt: 'Unlike domestic lizards or drakes, primordial wyrms require sustained geothermal pressures exceeding six hundred atmospheres to trigger egg rupture.'
  },
  {
    id: 'iron-saddles',
    category: 'Ancient Relics',
    title: 'The Forging of Sky-Iron Harnesses',
    excerpt: 'Forged from meteorite ore found in the crater of Mount Veyr, these harnesses were fitted with enchanted damping springs to withstand supersonic dives.'
  },
  {
    id: 'blood-covenant',
    category: 'Dynastic Law',
    title: 'The Rite of the First Ember',
    excerpt: 'Every child of House Veyr was presented to the wyrm on their seventh name-day. If the dragon nudged the child with its snout, the bond was sealed for life.'
  },
  {
    id: 'valkyrie-ruins',
    category: 'Lost Geography',
    title: 'The Sunken Crypts of Veyrath',
    excerpt: 'Beneath the shattered pillars of the palace lie the royal vaults, sealed by molten obsidian doors that only dragonfire can unseal.'
  }
];
