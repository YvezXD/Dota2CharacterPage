import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useDota } from '../context/DotaContext';
import {
  Sparkles,
  BrainCircuit,
  Swords,
  Scroll,
  Palette,
  Copy,
  Check,
  BookmarkPlus,
  ArrowRight,
  ShieldAlert,
  Loader2,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import {
  PROMPT_TYPES,
  LANES_AND_ROLES,
  PLAYSTYLES,
} from '../constants/dotaConstants';

export default function PromptForgeView() {
  const [searchParams] = useSearchParams();
  const heroParam = searchParams.get('hero');

  const { heroes, loading, savePrompt, isFavorite } = useDota();

  // State
  const [selectedHeroId, setSelectedHeroId] = useState('');
  const [selectedLane, setSelectedLane] = useState(LANES_AND_ROLES[0]);
  const [selectedPlaystyle, setSelectedPlaystyle] = useState(PLAYSTYLES[0]);
  const [selectedType, setSelectedType] = useState('coaching');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync hero from URL search param once heroes load
  useEffect(() => {
    if (heroes && heroes.length > 0) {
      if (heroParam) {
        const found = heroes.find((h) => String(h.id) === String(heroParam));
        if (found) {
          setSelectedHeroId(String(found.id));
          return;
        }
      }
      // Default to first hero if none selected yet
      if (!selectedHeroId) {
        setSelectedHeroId(String(heroes[0].id));
      }
    }
  }, [heroes, heroParam]);

  const currentHero = useMemo(() => {
    return heroes.find((h) => String(h.id) === String(selectedHeroId)) || heroes[0] || null;
  }, [heroes, selectedHeroId]);

  // Dynamic Prompt Generation Engine
  const generatedPrompt = useMemo(() => {
    if (!currentHero) return '';

    const heroName = currentHero.localized_name;
    const attr = currentHero.primary_attr?.toUpperCase() || 'HERO';
    const attackType = currentHero.attack_type;
    const roles = currentHero.roles?.join(', ') || 'Core';
    const pubWinRate = currentHero.pubWinRate || 50;
    const proPicks = currentHero.pro_pick || 0;
    const baseDamage = `${currentHero.base_attack_min}-${currentHero.base_attack_max}`;
    const speed = currentHero.move_speed;

    switch (selectedType) {
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

      case 'art':
        return `cinematic full-body battle portrait of Dota 2 hero ${heroName}, ${attackType} combat stance, radiating mystical ${attr.toLowerCase()} energies, epic battle scene amidst the glowing radiant world tree ruins and fractured dire obsidian crystals, intricate ornate armor, hyper-detailed facial expression of determination, volumetric mist, dramatic rim lighting, particles of glowing embers, cinematic composition, Octane Render, 8k resolution, Unreal Engine 5 aesthetic, photorealistic fantasy concept art, art direction inspired by Valve Dota 2 key art --ar 16:9 --style raw --v 6.0`;

      default:
        return '';
    }
  }, [currentHero, selectedType, selectedLane, selectedPlaystyle]);

  // Copy handler
  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Save Prompt to LocalStorage collection
  const handleSavePrompt = () => {
    if (!currentHero || !generatedPrompt) return;

    const promptObj = {
      heroId: currentHero.id,
      heroName: currentHero.localized_name,
      heroAvatar: currentHero.avatarUrl,
      promptType: selectedType,
      promptTypeName: PROMPT_TYPES.find((t) => t.id === selectedType)?.name || selectedType,
      lane: selectedLane,
      playstyle: selectedPlaystyle,
      content: generatedPrompt,
    };

    savePrompt(promptObj);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#131722] via-[#1a2133] to-[#0e121a] border border-[#e2b76b]/30 p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1c2230] border border-[#e2b76b]/40 text-xs font-mono text-[#e2b76b]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Prompt Generator Hub</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-wide">
            Dota 2 AI Prompt Forge
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Engineer customized, high-precision AI prompts for LLMs (Claude, ChatGPT, Gemini) and image synthesis models (Midjourney, DALL-E) dynamically tailored with live OpenDota analytics.
          </p>
        </div>

        <div className="absolute top-0 right-0 w-80 h-80 bg-[#e2b76b]/15 blur-3xl rounded-full pointer-events-none" />
      </section>

      {/* Main Forge Interface: Configuration Left & Output Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Controls (5 columns) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card: Configuration Controls */}
          <div className="p-6 rounded-2xl bg-[#131722] border border-[#232a3b] space-y-5">
            <h2 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center space-x-2 border-b border-[#232a3b] pb-3">
              <Sparkles className="w-4 h-4 text-[#e2b76b]" />
              <span>1. Choose Hero & Parameters</span>
            </h2>

            {/* Hero Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">
                Select Dota 2 Hero:
              </label>
              {loading ? (
                <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 p-2.5 bg-[#1c2230] rounded-xl">
                  <Loader2 className="w-4 h-4 animate-spin text-[#e2b76b]" />
                  <span>Loading heroes from OpenDota...</span>
                </div>
              ) : (
                <select
                  value={selectedHeroId}
                  onChange={(e) => setSelectedHeroId(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#1c2230] border border-[#2e374d] text-white text-sm focus:outline-none focus:border-[#e2b76b]"
                >
                  {heroes.map((hero) => (
                    <option key={hero.id} value={hero.id}>
                      {hero.localized_name} ({hero.primary_attr?.toUpperCase()} - {hero.attack_type})
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Selected Hero Quick Card */}
            {currentHero && (
              <div className="flex items-center space-x-3 p-3 rounded-xl bg-[#0b0e14] border border-[#232a3b]">
                <img
                  src={currentHero.avatarUrl}
                  alt={currentHero.localized_name}
                  className="w-14 h-14 rounded-lg object-cover border border-[#2e374d]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white truncate">
                      {currentHero.localized_name}
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1c2230] text-[#e2b76b]">
                      Win: {currentHero.pubWinRate}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {currentHero.roles?.join(', ')}
                  </p>
                  <Link
                    to={`/hero/${currentHero.id}`}
                    className="inline-flex items-center space-x-1 text-[11px] text-[#00d2ff] hover:underline mt-1"
                  >
                    <span>View full hero codex</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </div>
            )}

            {/* Position / Lane Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">
                Position & Lane Assignment:
              </label>
              <select
                value={selectedLane}
                onChange={(e) => setSelectedLane(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#1c2230] border border-[#2e374d] text-white text-sm focus:outline-none focus:border-[#e2b76b]"
              >
                {LANES_AND_ROLES.map((lane) => (
                  <option key={lane} value={lane}>
                    {lane}
                  </option>
                ))}
              </select>
            </div>

            {/* Playstyle Selector */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider">
                Strategic Win Condition / Playstyle:
              </label>
              <select
                value={selectedPlaystyle}
                onChange={(e) => setSelectedPlaystyle(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#1c2230] border border-[#2e374d] text-white text-sm focus:outline-none focus:border-[#e2b76b]"
              >
                {PLAYSTYLES.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Prompt Type Cards */}
          <div className="p-6 rounded-2xl bg-[#131722] border border-[#232a3b] space-y-4">
            <h2 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center space-x-2 border-b border-[#232a3b] pb-3">
              <BrainCircuit className="w-4 h-4 text-[#e2b76b]" />
              <span>2. Select AI Prompt Archetype</span>
            </h2>

            <div className="grid grid-cols-1 gap-2.5">
              {PROMPT_TYPES.map((type) => {
                const isSelected = selectedType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-3.5 rounded-xl text-left border transition-all ${
                      isSelected
                        ? 'bg-[#1c2230] border-[#e2b76b] shadow-[0_0_15px_rgba(226,183,107,0.15)] ring-1 ring-[#e2b76b]'
                        : 'bg-[#0f121a] border-[#232a3b] hover:border-slate-500 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-white">
                        {type.name}
                      </span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#131722] text-[#e2b76b] border border-[#e2b76b]/30">
                        {type.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {type.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Output Area (7 columns) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-[#131722] border border-[#232a3b] flex flex-col h-full shadow-xl">
            {/* Output Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#232a3b]">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-serif font-bold text-white uppercase tracking-wider">
                    Generated Prompt Output
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800 font-mono">
                    Ready for AI
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  Formatted for ChatGPT, Claude 3.7, DeepSeek, or Midjourney v6
                </p>
              </div>

              {/* Action Buttons: Copy & Save */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#1c2230] hover:bg-[#252f44] text-white border border-[#2e374d] hover:border-[#e2b76b] transition-all shadow-sm"
                  title="Copy prompt text to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#e2b76b]" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleSavePrompt}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#e2b76b] to-[#ff4b4b] text-black hover:brightness-110 shadow-[0_0_15px_rgba(226,183,107,0.3)] transition-all"
                  title="Save prompt to your Codex Roster in localStorage"
                >
                  <BookmarkPlus className="w-3.5 h-3.5 text-black" />
                  <span>{savedSuccess ? 'Saved to Codex!' : 'Save to Codex'}</span>
                </button>
              </div>
            </div>

            {/* Prompt Text Box */}
            <div className="mt-4 flex-1">
              <div className="relative h-full">
                <textarea
                  readOnly
                  value={generatedPrompt}
                  rows={16}
                  className="w-full h-full p-4 rounded-xl bg-[#090b10] border border-[#232a3b] text-slate-200 font-mono text-xs sm:text-sm leading-relaxed resize-none focus:outline-none focus:border-[#e2b76b]"
                />
              </div>
            </div>

            {/* Quick Helper Tips */}
            <div className="mt-4 pt-3 border-t border-[#1c2230] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-2">
              <span className="flex items-center space-x-1">
                <span>💡 Tip:</span>
                <span className="text-slate-300">
                  Paste directly into any LLM or image generator for instant output.
                </span>
              </span>

              <Link
                to="/favorites"
                className="text-[#e2b76b] hover:underline font-mono text-[11px]"
              >
                View Saved Collection →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
