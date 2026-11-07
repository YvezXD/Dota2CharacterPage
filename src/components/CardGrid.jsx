import React from 'react';
import HeroCard from './HeroCard';
import { SearchX, RotateCcw } from 'lucide-react';

export default function CardGrid({ heroes, onResetFilters }) {
  if (!heroes || heroes.length === 0) {
    return (
      <div className="py-16 px-4 text-center rounded-2xl bg-[#131722]/50 border border-[#232a3b] max-w-xl mx-auto my-8">
        <div className="inline-flex p-4 rounded-2xl bg-[#1c2230] border border-[#2e374d] text-slate-400 mb-4">
          <SearchX className="w-10 h-10 text-[#e2b76b]" />
        </div>
        <h3 className="text-xl font-serif font-bold text-white mb-2">
          No Ancient Heroes Found
        </h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
          No heroes match your active combination of search query, attribute filter, attack type, or role.
        </p>
        {onResetFilters && (
          <button
            onClick={onResetFilters}
            className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-[#1c2230] hover:bg-[#252f44] text-[#e2b76b] border border-[#e2b76b]/40 hover:border-[#e2b76b] transition-all"
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
