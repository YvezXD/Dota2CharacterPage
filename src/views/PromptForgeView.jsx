/**
 * ==============================================================================
 * AI PROMPT FORGE VIEW (src/views/PromptForgeView.jsx)
 * ==============================================================================
 * WHAT THIS PAGE DOES:
 * Interactive Dota 2 AI Prompt Generator at route `/prompt-forge`.
 * Lets users pick a Hero, Role/Lane, Patch Playstyle, and Prompt Type, then
 * dynamically builds a copyable AI prompt and lets users save it to `localStorage`.
 *
 * HOW TO EDIT FOR NOVICE DEVELOPERS:
 * - To edit the generated prompt text, open `src/utils/promptTemplates.js`.
 * - To add/edit lanes, playstyles, or prompt types, open `src/constants/dotaConstants.js`.
 * ==============================================================================
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useDota } from '../context/DotaContext';
import { generateHeroPrompt } from '../utils/promptTemplates';
import {
  Sparkles,
  BrainCircuit,
  Copy,
  Check,
  BookmarkPlus,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import {
  PROMPT_TYPES,
  LANES_AND_ROLES,
  PLAYSTYLES,
} from '../constants/dotaConstants';

export default function PromptForgeView() {
  const [searchParams] = useSearchParams();
  const heroParam = searchParams.get('hero');

  const { heroes, loading, savePrompt } = useDota();

  // ---------------------------------------------------------------------------
  // 1. FORM SELECTION STATES
  // ---------------------------------------------------------------------------
  const [selectedHeroId, setSelectedHeroId] = useState('');
  const [selectedLane, setSelectedLane] = useState(LANES_AND_ROLES[0]);
  const [selectedPlaystyle, setSelectedPlaystyle] = useState(PLAYSTYLES[0]);
  const [selectedType, setSelectedType] = useState('coaching');
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // ---------------------------------------------------------------------------
  // 2. AUTO-SELECT HERO IF PASSED IN URL (e.g. /prompt-forge?hero=1)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (heroes && heroes.length > 0) {
      if (heroParam) {
        const found = heroes.find((h) => String(h.id) === String(heroParam));
        if (found) {
          setSelectedHeroId(String(found.id));
          return;
        }
      }
      if (!selectedHeroId) {
        setSelectedHeroId(String(heroes[0].id));
      }
    }
  }, [heroes, heroParam]);

  const currentHero = useMemo(() => {
    return heroes.find((h) => String(h.id) === String(selectedHeroId)) || heroes[0] || null;
  }, [heroes, selectedHeroId]);

  // ---------------------------------------------------------------------------
  // 3. GENERATE PROMPT TEXT (Uses src/utils/promptTemplates.js)
  // ---------------------------------------------------------------------------
  const generatedPrompt = useMemo(() => {
    return generateHeroPrompt({
      hero: currentHero,
      promptType: selectedType,
      selectedLane,
      selectedPlaystyle,
    });
  }, [currentHero, selectedType, selectedLane, selectedPlaystyle]);

  // ---------------------------------------------------------------------------
  // 4. COPY & SAVE HANDLERS
  // ---------------------------------------------------------------------------
  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
      {/* SECTION A: Top Header Banner */}
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

      {/* SECTION B: Two-Column Builder Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN (5 cols): Hero, Lane, Playstyle & Prompt Type Selectors */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#131722] border border-[#232a3b] space-y-5">
            <h2 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center space-x-2 border-b border-[#232a3b] pb-3">
              <Sparkles className="w-4 h-4 text-[#e2b76b]" />
              <span>1. Choose Hero & Parameters</span>
            </h2>

            {/* Hero Dropdown */}
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

            {/* Selected Hero Mini Summary Card */}
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

            {/* Position / Lane Dropdown */}
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

            {/* Playstyle Dropdown */}
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

          {/* Prompt Archetype Buttons */}
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

        {/* RIGHT COLUMN (7 cols): Live Prompt Output, Copy & Save */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-[#131722] border border-[#232a3b] flex flex-col h-full shadow-xl">
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
                  Formatted for ChatGPT, Claude, Gemini, or Midjourney v6
                </p>
              </div>

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

            <div className="mt-4 flex-1">
              <textarea
                readOnly
                value={generatedPrompt}
                rows={16}
                className="w-full h-full p-4 rounded-xl bg-[#090b10] border border-[#232a3b] text-slate-200 font-mono text-xs sm:text-sm leading-relaxed resize-none focus:outline-none focus:border-[#e2b76b]"
              />
            </div>

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
