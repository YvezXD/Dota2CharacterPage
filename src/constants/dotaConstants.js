export const STEAM_CDN_BASE = 'https://cdn.cloudflare.steamstatic.com';

export const PRIMARY_ATTRIBUTES = [
  { id: 'all', label: 'All Attributes', short: 'ALL', color: '#e2b76b', bg: 'rgba(226, 183, 107, 0.15)' },
  { id: 'str', label: 'Strength', short: 'STR', color: '#ec3d3d', bg: 'rgba(236, 61, 61, 0.15)' },
  { id: 'agi', label: 'Agility', short: 'AGI', color: '#2ecc71', bg: 'rgba(46, 204, 113, 0.15)' },
  { id: 'int', label: 'Intelligence', short: 'INT', color: '#00d2ff', bg: 'rgba(0, 210, 255, 0.15)' },
  { id: 'all_attr', label: 'Universal', key: 'all', short: 'UNI', color: '#df53f3', bg: 'rgba(223, 83, 243, 0.15)' },
];

export const ATTACK_TYPES = ['All', 'Melee', 'Ranged'];

export const DOTA_ROLES = [
  'Carry',
  'Support',
  'Nuker',
  'Initiator',
  'Disabler',
  'Durable',
  'Escape',
  'Pusher',
];

export const SORT_OPTIONS = [
  { value: 'name_asc', label: 'Name (A to Z)' },
  { value: 'name_desc', label: 'Name (Z to A)' },
  { value: 'winrate_desc', label: 'Win Rate (Highest First)' },
  { value: 'winrate_asc', label: 'Win Rate (Lowest First)' },
  { value: 'pro_pick_desc', label: 'Pro Pick Count (Highest First)' },
  { value: 'speed_desc', label: 'Movement Speed (Fastest First)' },
  { value: 'str_desc', label: 'Base Strength (Highest First)' },
];

export const LANES_AND_ROLES = [
  'Safe Lane Carry (Pos 1)',
  'Mid Lane Tempo / Playmaker (Pos 2)',
  'Offlane Initiator / Frontliner (Pos 3)',
  'Soft Support Roamer (Pos 4)',
  'Hard Support Lane Protector (Pos 5)',
];

export const PLAYSTYLES = [
  'Early Tower Pressure & Fast Aggression',
  'Late-Game Hypercarry 6-Slot Scaling',
  'Teamfight Wiping Combo Execution',
  'Defensive Counter-Gank & Healing Saves',
  'Rat Dota Split Push & Map Control',
  'Pickoff Assassin & Smoke Roaming',
];

export const PROMPT_TYPES = [
  {
    id: 'coaching',
    name: 'AI Coaching Analysis',
    badge: 'Gameplay & Meta',
    desc: 'Deep tactical breakdown, laning mechanics, power spikes, skill build order, and core item timings for current patch.',
    icon: 'BrainCircuit',
  },
  {
    id: 'counterpick',
    name: 'Draft Counter-Pick Strategy',
    badge: 'Drafting & Synergy',
    desc: 'Analyzes which heroes this pick demolishes, hard counter matchups to avoid, and ideal drafting synergies.',
    icon: 'Swords',
  },
  {
    id: 'lore',
    name: 'Hero Lore & Story',
    badge: 'Narrative & Worldbuilding',
    desc: 'Generates rich dark fantasy backstory, rivalry dialogue, and an atmospheric lore narrative rooted in the Dota multiverse.',
    icon: 'Scroll',
  },
  {
    id: 'art',
    name: 'Midjourney / DALL-E Art Prompt',
    badge: 'Generative AI Art',
    desc: 'Cinematic, hyper-detailed visual prompt engineered for Midjourney v6 and DALL-E 3 with lighting, angle, and art direction.',
    icon: 'Palette',
  },
];

export const STORAGE_KEYS = {
  FAVORITES: 'ancientcodex_favorite_heroes',
  SAVED_PROMPTS: 'ancientcodex_saved_prompts',
  RECENT_SEARCHES: 'ancientcodex_recent_searches',
};
