import React from 'react';
import HeroCard from './HeroCard';
import { SearchX, RotateCcw } from 'lucide-react';

export default function CardGrid({ heroes, onResetFilters }) {
  if (!heroes || heroes.length === 0) {
    return (
      <div className="py-16 px-4 text-center rounded-2xl bg-[#0e0a0d] border border-[#2a1318] max-w-xl mx-auto my-8 shadow-xl">
        <div className="inline-flex p-4 rounded-2xl bg-[#180a0f] border border-[#36151f] text-stone-400 mb-4">
          <SearchX className="w-10 h-10 text-[#e61e38]" />
        </div>
        <h3 className="text-xl font-serif font-bold text-white mb-2">
          No Ancient Heroes Found
        </h3>
        <p className="text-sm text-stone-400 max-w-md mx-auto mb-6">
          No heroes match your active combination of search query, attribute filter, attack type, or role.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#1a0a0f] hover:bg-[#280c16] text-[#ff3b53] border border-[#e61e38]/60 hover:border-[#ff2a44] shadow-[0_0_12px_rgba(230,30,56,0.25)] transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear Filters & Search</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {heroes.map((hero) => (
        <HeroCard key={hero.id} hero={hero} />
      ))}
    </div>
  );
}
