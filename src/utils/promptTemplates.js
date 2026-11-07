/**
 * ==============================================================================
 * AI PROMPT TEMPLATES GENERATOR (src/utils/promptTemplates.js)
 * ==============================================================================
 * WHAT THIS FILE DOES:
 * Builds the text for the 4 AI Prompt types in the "AI Prompt Forge" page.
 *
 * HOW TO EDIT FOR NOVICE DEVELOPERS:
 * - You can freely edit the text inside the backticks (`...`) below!
 * - Use `${heroName}`, `${selectedLane}`, or `${selectedPlaystyle}` to insert
 *   dynamic values chosen by the user.
 * - If you add a new prompt type in `src/constants/dotaConstants.js`, just add
 *   a matching `case 'your_id':` block in `generateHeroPrompt` below.
 * ==============================================================================
 */

export function generateHeroPrompt({
  hero,
  promptType,
  selectedLane,
  selectedPlaystyle,
}) {
  if (!hero) return '';

  // Extract convenient variables from the hero object
  const heroName = hero.localized_name;
  const attr = hero.primary_attr?.toUpperCase() || 'HERO';
  const attackType = hero.attack_type;
  const roles = hero.roles?.join(', ') || 'Core';
  const pubWinRate = hero.pubWinRate || 50;
  const proPicks = hero.pro_pick || 0;
  const baseDamage = `${hero.base_attack_min}-${hero.base_attack_max}`;
  const speed = hero.move_speed;

  switch (promptType) {
    // -------------------------------------------------------------------------
    // TEMPLATE 1: AI COACHING ANALYSIS
    // -------------------------------------------------------------------------
    case 'coaching':
      return `Act as an Immortal-rank Dota 2 Coach and Tactical Analyst (10,000+ MMR). Provide a comprehensive, high-level mastery guide for ${heroName} under the current patch meta.

Target Configuration:
- Hero: ${heroName} (${attr} attribute, ${attackType}, Base Speed: ${speed} ms, Roles: ${roles})
- Position / Lane Assignment: ${selectedLane}
- Primary Strategic Win Condition: ${selectedPlaystyle}
- Current Public Win Rate: ${pubWinRate}% | Pro Matches Sample: ${proPicks} games

Please structure your coaching session with the following exact sections:
1. Laning Phase Execution: Creep aggro, trading mechanics, level 1-3 power spikes, and spell usage relative to base damage (${baseDamage}).
2. Core Itemization Timings: Specific benchmark timings (Minutes 12, 20, 30) tailored to "${selectedPlaystyle}". Include situational defensive vs offensive adaptations.
3. Mid-Game Macro Decisiveness: Map rotations, tormentor/Roshan priority, vision placement, and smoke gank trigger conditions.
4. Teamfight Positioning & Target Priority: How to initiate or counter-initiate safely, cooldown tracking, and high-priority enemy pickoffs.
5. Immortal Mindset Tip: One non-obvious mechanical nuance or animation cancel specific to ${heroName} that separates Divine players from top Immortals.`;

    // -------------------------------------------------------------------------
    // TEMPLATE 2: DRAFT COUNTER-PICK STRATEGY
    // -------------------------------------------------------------------------
    case 'counterpick':
      return `You are the Head Draft Analyst for a premier Dota 2 The International championship esports team. Deliver an exhaustive counter-pick and drafting synthesis centering on ${heroName}.

Hero Profile:
- Hero: ${heroName} (${attr} Attribute | ${attackType} | Primary Roles: ${roles})
- Lane Orientation: ${selectedLane}
- Desired Team Archetype: ${selectedPlaystyle}

Provide an analytical draft breakdown:
1. Hard Counter Picks (Heroes that dismantle ${heroName}): Identify 3 heroes that shut down ${heroName}'s passive scaling or mobility, detailing the exact spell interactions.
2. Favorable Matchups (Heroes that ${heroName} obliterates): Detail 3 heroes that cannot survive against ${heroName}'s power spikes.
3. Premier Team Synergies: Identify the 2 best ally heroes who amplify ${heroName}'s ${selectedPlaystyle} (e.g. stun setup, aura stacking, save mechanisms).
4. Drafting Ban Priorities: When captaining against or drafting ${heroName}, which situational item counters (e.g. Silver Edge, Spirit Vessel, Nullifier) must be anticipated?`;

    // -------------------------------------------------------------------------
    // TEMPLATE 3: HERO LORE & STORY
    // -------------------------------------------------------------------------
    case 'lore':
      return `You are the Ancient Chronicler of the Mad Moon and the Archronic Archives. Compose an atmospheric, dark-fantasy epic lore story and cinematic monologue spotlighting ${heroName}.

Narrative Lore Profile:
- Protagonist: ${heroName}
- Allegiance: Clashing between the radiant light of the World Tree and the corrupting resonance of the Dire stone.
- Combat Persona: ${attackType} champion embodying ${roles}.
- Setting Tone: Atmospheric, grim, mythic, and philosophical.

Story Elements to Include:
1. The Ancient Origin: How ${heroName} was forged, cursed, or summoned during the shattering of the Mad Moon and the primordial schism.
2. The Crucible of Battle: A high-stakes duel in the shadowed river between Radiant and Dire, illustrating ${heroName}'s relentless mastery of their powers.
3. Spoken Monologue: A haunting 4-line battle vow or dialogue addressed to fallen rivals upon the battlefield.
4. The Eternal Truth: Reflections on why the war of the Ancients can never truly end until both stones crumble into cosmic oblivion.`;

    // -------------------------------------------------------------------------
    // TEMPLATE 4: MIDJOURNEY / DALL-E CHARACTER ART PROMPT
    // -------------------------------------------------------------------------
    case 'art':
      return `cinematic full-body battle portrait of Dota 2 hero ${heroName}, ${attackType} combat stance, radiating mystical ${attr.toLowerCase()} energies, epic battle scene amidst the glowing radiant world tree ruins and fractured dire obsidian crystals, intricate ornate armor, hyper-detailed facial expression of determination, volumetric mist, dramatic rim lighting, particles of glowing embers, cinematic composition, Octane Render, 8k resolution, Unreal Engine 5 aesthetic, photorealistic fantasy concept art, art direction inspired by Valve Dota 2 key art --ar 16:9 --style raw --v 6.0`;

    default:
      return '';
  }
}
