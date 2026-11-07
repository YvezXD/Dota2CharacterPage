import React from 'react';
import { Search, X, History, Trash2, Sparkles } from 'lucide-react';
import { useDota } from '../context/DotaContext';

export default function SearchBar({
  value,
  onChange,
  onClear,
  totalMatches,
  totalHeroes,
}) {
  const {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  } = useDota();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && value.trim()) {
      addRecentSearch(value.trim());
    }
  };

  const handleSelectRecent = (term) => {
    onChange(term);
    addRecentSearch(term);
  };

  return (
    <div className="space-y-3">
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <div className="absolute left-4 pointer-events-none text-slate-400">
          <Search className="w-5 h-5 text-[#e2b76b]" />
        </div>

        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (value.trim()) addRecentSearch(value.trim());
          }}
          placeholder="Search Dota 2 heroes by name or role (e.g. 'Invoker', 'Carry', 'Support', 'Axe')..."
          className="w-full pl-12 pr-28 py-3.5 rounded-xl bg-[#131722] border border-[#232a3b] text-white placeholder-slate-500 focus:outline-none focus:border-[#e2b76b] focus:ring-1 focus:ring-[#e2b76b] shadow-inner text-sm transition-all"
        />

        <div className="absolute right-3 flex items-center space-x-2">
          {value && (
            <button
              onClick={onClear}
              className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <div className="hidden sm:block text-xs font-mono px-2 py-1 rounded bg-[#1c2230] border border-[#2e374d] text-[#e2b76b]">
            {totalMatches} / {totalHeroes}
          </div>
        </div>
      </div>

      {/* Clickable Recent Searches Persisted in localStorage */}
      {recentSearches && recentSearches.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-mono shrink-0">
            <History className="w-3.5 h-3.5 text-[#e2b76b]" />
            <span>Recent:</span>
          </div>

          {recentSearches.map((term) => (
            <div
              key={term}
              className="inline-flex items-center rounded-lg bg-[#131722] border border-[#232a3b] hover:border-[#e2b76b]/60 transition-all group overflow-hidden"
            >
              <button
                type="button"
                onClick={() => handleSelectRecent(term)}
                className={`px-2.5 py-1 text-xs transition-colors ${
                  value.toLowerCase() === term.toLowerCase()
                    ? 'text-[#e2b76b] font-bold bg-[#1c2230]'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {term}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeRecentSearch(term);
                }}
                className="px-1.5 py-1 text-slate-500 hover:text-[#ff4b4b] hover:bg-red-950/30 transition-colors border-l border-[#232a3b]"
                title={`Remove "${term}"`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          <button
            onClick={clearRecentSearches}
            className="text-[11px] text-slate-500 hover:text-red-400 flex items-center space-x-1 ml-auto transition-colors"
            title="Clear all recent searches"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear History</span>
          </button>
        </div>
      )}
    </div>
  );
}
