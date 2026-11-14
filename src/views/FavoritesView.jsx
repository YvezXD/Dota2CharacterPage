import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDota } from '../context/DotaContext';
import HeroCard from '../components/HeroCard';
import {
  Bookmark,
  Sparkles,
  Swords,
  Trash2,
  Copy,
  Check,
  ArrowRight,
  Clock,
} from 'lucide-react';

export default function FavoritesView() {
  const {
    heroes,
    favorites,
    savedPrompts,
    deletePrompt,
    clearAllPrompts,
  } = useDota();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('heroes'); // 'heroes' | 'prompts'
  const [copiedPromptId, setCopiedPromptId] = useState(null);

  // Filter bookmarked heroes
  const favoritedHeroList = useMemo(() => {
    if (!heroes || heroes.length === 0) return [];
    return heroes.filter((hero) => favorites.includes(hero.id));
  }, [heroes, favorites]);

  // Copy prompt handler
  const handleCopyPrompt = (prompt) => {
    navigator.clipboard.writeText(prompt.content);
    setCopiedPromptId(prompt.id);
    setTimeout(() => setCopiedPromptId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header (Black & Red with Gold Accent) */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#170a0e] via-[#10070a] to-[#070406] border border-[#2e141a] p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1c0a0f] border border-[#e61e38]/40 text-xs font-mono text-[#ff2a44] shadow-sm">
            <Bookmark className="w-3.5 h-3.5 text-[#e2b76b]" />
            <span>Local Storage Persistence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-wide">
            Saved Codex Roster & Prompts
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
            Access your bookmarked hero roster and library of generated AI prompts. All records are automatically persisted in your browser's <code className="text-[#ff3b53]">localStorage</code>.
          </p>
        </div>

        <div className="absolute top-0 right-0 w-80 h-80 bg-[#e61e38]/12 blur-3xl rounded-full pointer-events-none" />
      </section>

      {/* Tabs Switcher: Heroes vs Prompts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#261015] pb-4">
        <div className="flex space-x-2">
          {/* Tab 1: Bookmarked Heroes */}
          <button
            onClick={() => setActiveTab('heroes')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'heroes'
                ? 'bg-gradient-to-r from-[#e61e38] to-[#991b1b] text-white shadow-[0_0_15px_rgba(230,30,56,0.4)] border border-[#ff3b53]/50'
                : 'bg-[#0e0a0d] text-stone-300 border border-[#2a1318] hover:text-white'
            }`}
          >
            <Swords className="w-4 h-4" />
            <span>Bookmarked Heroes ({favoritedHeroList.length})</span>
          </button>

          {/* Tab 2: Saved AI Prompts */}
          <button
            onClick={() => setActiveTab('prompts')}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all ${
              activeTab === 'prompts'
                ? 'bg-gradient-to-r from-[#e61e38] to-[#991b1b] text-white shadow-[0_0_15px_rgba(230,30,56,0.4)] border border-[#ff3b53]/50'
                : 'bg-[#0e0a0d] text-stone-300 border border-[#2a1318] hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#e2b76b]" />
            <span>Saved AI Prompts ({savedPrompts.length})</span>
          </button>
        </div>

        {/* Clear Actions */}
        {activeTab === 'prompts' && savedPrompts.length > 0 && (
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to delete all saved AI prompts?')) {
                clearAllPrompts();
              }
            }}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-red-400 hover:text-white bg-red-950/40 hover:bg-red-900/60 border border-red-900/60 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All Prompts</span>
          </button>
        )}
      </div>

      {/* TAB 1 CONTENT: BOOKMARKED HEROES */}
      {activeTab === 'heroes' && (
        <div>
          {favoritedHeroList.length === 0 ? (
            <div className="py-20 text-center rounded-2xl bg-[#0e0a0d] border border-[#2a1318] max-w-xl mx-auto my-8 p-8 shadow-xl">
              <div className="inline-flex p-4 rounded-2xl bg-[#160a0e] border border-[#36151f] text-stone-400 mb-4">
                <Bookmark className="w-10 h-10 text-[#e2b76b]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                Your Hero Roster is Empty
              </h3>
              <p className="text-sm text-stone-400 max-w-md mx-auto mb-6">
                You haven't bookmarked any heroes yet. Browse the Hero Armory and click the star icon on any hero card to add them to your roster.
              </p>
              <Link
                to="/"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#e61e38] to-[#991b1b] text-white hover:brightness-110 shadow-[0_0_15px_rgba(230,30,56,0.35)] transition-all"
              >
                <span>Browse Hero Armory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favoritedHeroList.map((hero) => (
                <HeroCard key={hero.id} hero={hero} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2 CONTENT: SAVED AI PROMPTS */}
      {activeTab === 'prompts' && (
        <div>
          {savedPrompts.length === 0 ? (
            <div className="py-20 text-center rounded-2xl bg-[#0e0a0d] border border-[#2a1318] max-w-xl mx-auto my-8 p-8 shadow-xl">
              <div className="inline-flex p-4 rounded-2xl bg-[#160a0e] border border-[#36151f] text-stone-400 mb-4">
                <Sparkles className="w-10 h-10 text-[#e2b76b]" />
              </div>
              <h3 className="text-xl font-serif font-bold text-white mb-2">
                No AI Prompts Saved Yet
              </h3>
              <p className="text-sm text-stone-400 max-w-md mx-auto mb-6">
                Use the Dota 2 AI Prompt Forge to generate coaching playbooks, counter-pick tactics, lore stories, or character art prompts, then save them here.
              </p>
              <Link
                to="/prompt-forge"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#e61e38] to-[#991b1b] text-white hover:brightness-110 shadow-[0_0_15px_rgba(230,30,56,0.35)] transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#e2b76b]" />
                <span>Launch AI Prompt Forge</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedPrompts.map((item) => {
                const isCopied = copiedPromptId === item.id;
                return (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-[#0e0d12] border border-[#2a1419] hover:border-[#e61e38]/70 transition-all p-5 flex flex-col justify-between space-y-4 shadow-xl group"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {item.heroAvatar && (
                          <img
                            src={item.heroAvatar}
                            alt={item.heroName}
                            className="w-12 h-12 rounded-lg object-cover border border-[#36151f]"
                          />
                        )}
                        <div>
                          <h4 className="font-serif font-bold text-base text-white">
                            {item.heroName}
                          </h4>
                          <div className="flex items-center space-x-2 text-[11px] font-mono text-[#ff3b53] mt-0.5">
                            <span>{item.promptTypeName}</span>
                            <span>•</span>
                            <span className="text-stone-400 flex items-center space-x-1">
                              <Clock className="w-3 h-3 text-stone-500" />
                              <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Delete button */}
                      <button
                        onClick={() => deletePrompt(item.id)}
                        className="p-1.5 rounded-lg text-stone-500 hover:text-[#ff2a44] hover:bg-red-950/40 transition-colors"
                        title="Delete prompt"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Metadata Badges */}
                    <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-[#160a0e] text-stone-300 border border-[#2e141a]">
                        {item.lane}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#160a0e] text-stone-400 border border-[#2e141a]">
                        {item.playstyle}
                      </span>
                    </div>

                    {/* Prompt Content Preview */}
                    <div className="relative">
                      <textarea
                        readOnly
                        value={item.content}
                        rows={6}
                        className="w-full p-3 rounded-xl bg-[#060304] border border-[#2a1419] text-stone-300 font-mono text-xs leading-relaxed resize-none focus:outline-none"
                      />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-[#1c0d12]">
                      <button
                        onClick={() => handleCopyPrompt(item)}
                        className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#160a0e] hover:bg-[#220d14] text-white border border-[#2e141a] hover:border-[#e61e38] transition-all"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-[#e2b76b]" />
                            <span>Copy Full Prompt</span>
                          </>
                        )}
                      </button>

                      <Link
                        to={`/prompt-forge?hero=${item.heroId}`}
                        className="text-xs font-mono text-[#e2b76b] hover:underline flex items-center space-x-1"
                      >
                        <span>Re-forge Hero Prompt</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
