/**
 * ==============================================================================
 * HERO ARMORY VIEW - HOME PAGE (src/views/HeroArmoryView.jsx)
 * ==============================================================================
 * WHAT THIS PAGE DOES:
 * Displays the main dashboard at route `/` with:
 * - Hero banner header
 * - SearchBar (with clickable Recent Searches)
 * - FilterBar (Attributes, Attack Type, Role, Sort dropdown)
 * - CardGrid (12 HeroCards per page) or SkeletonGrid / ErrorState
 * - Pagination controls
 *
 * THEME: Black and Red with a little bit of Gold
 * ==============================================================================
 */

import React, { useState, useMemo } from 'react';
import { useDota } from '../context/DotaContext';
import { APP_CONFIG } from '../config/appConfig';
import { filterAndSortHeroes } from '../utils/heroFilters';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import CardGrid from '../components/CardGrid';
import Pagination from '../components/Pagination';
import SkeletonGrid from '../components/SkeletonGrid';
import ErrorState from '../components/ErrorState';
import { Swords, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

const ITEMS_PER_PAGE = APP_CONFIG.pagination.heroesPerPage;

export default function HeroArmoryView() {
  const { heroes, loading, error, loadHeroes } = useDota();

  // ---------------------------------------------------------------------------
  // 1. LOCAL FILTER & PAGINATION STATES
  // ---------------------------------------------------------------------------
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAttr, setSelectedAttr] = useState('all');
  const [selectedAttackType, setSelectedAttackType] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedSort, setSelectedSort] = useState('name_asc');
  const [currentPage, setCurrentPage] = useState(1);

  // ---------------------------------------------------------------------------
  // 2. FILTER & SORT HEROES (Uses helper in src/utils/heroFilters.js)
  // ---------------------------------------------------------------------------
  const filteredHeroes = useMemo(() => {
    return filterAndSortHeroes(heroes, {
      searchQuery,
      selectedAttr,
      selectedAttackType,
      selectedRole,
      selectedSort,
    });
  }, [heroes, searchQuery, selectedAttr, selectedAttackType, selectedRole, selectedSort]);

  // ---------------------------------------------------------------------------
  // 3. EVENT HANDLERS
  // ---------------------------------------------------------------------------
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1); // Return to page 1 whenever search changes
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedAttr('all');
    setSelectedAttackType('All');
    setSelectedRole('All');
    setSelectedSort('name_asc');
    setCurrentPage(1);
  };

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedAttr !== 'all' ||
    selectedAttackType !== 'All' ||
    selectedRole !== 'All' ||
    selectedSort !== 'name_asc';

  // ---------------------------------------------------------------------------
  // 4. CALCULATE PAGINATION SLICE
  // ---------------------------------------------------------------------------
  const totalPages = Math.ceil(filteredHeroes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentHeroes = filteredHeroes.slice(startIndex, endIndex);

  return (
    <div className="space-y-8">
      {/* SECTION A: Hero Armory Top Banner (Black & Red with Gold Sparkle) */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#170a0e] via-[#10070a] to-[#070406] border border-[#2e141a] p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1c0a0f] border border-[#e61e38]/40 text-xs font-mono text-[#ff2a44] shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#e2b76b]" />
            <span>OpenDota Live Statistics & AI Codex</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-wide leading-tight">
            Dota 2 Hero Armory & Analytics
          </h1>

          <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-2xl">
            Explore complete competitive attributes, base stats, pro pick frequencies, and public win rates for all 127 heroes. Select any hero to forge deep tactical AI coaching and lore prompts.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-stone-400">
            <div className="flex items-center space-x-1.5 bg-[#0a0507]/80 px-3 py-1.5 rounded-lg border border-[#2a1318]">
              <Swords className="w-4 h-4 text-[#e61e38]" />
              <span>Total Heroes: <strong className="text-[#e2b76b] font-bold">{heroes?.length || 127}</strong></span>
            </div>
            <div className="flex items-center space-x-1.5 bg-[#0a0507]/80 px-3 py-1.5 rounded-lg border border-[#2a1318]">
              <TrendingUp className="w-4 h-4 text-[#ff2a44]" />
              <span>Real-Time Win Rates</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-[#0a0507]/80 px-3 py-1.5 rounded-lg border border-[#2a1318]">
              <ShieldCheck className="w-4 h-4 text-[#ff3b53]" />
              <span>Steam CDN Accelerated</span>
            </div>
          </div>
        </div>

        {/* Decorative Background Crimson Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e61e38]/12 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#ff2a44]/10 blur-3xl rounded-full pointer-events-none" />
      </section>

      {/* SECTION B: Search Bar & Filter Controls */}
      <section className="space-y-4">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onClear={handleClearSearch}
          totalMatches={filteredHeroes.length}
          totalHeroes={heroes.length}
        />

        <FilterBar
          selectedAttr={selectedAttr}
          onSelectAttr={(attr) => {
            setSelectedAttr(attr);
            setCurrentPage(1);
          }}
          selectedAttackType={selectedAttackType}
          onSelectAttackType={(type) => {
            setSelectedAttackType(type);
            setCurrentPage(1);
          }}
          selectedRole={selectedRole}
          onSelectRole={(role) => {
            setSelectedRole(role);
            setCurrentPage(1);
          }}
          selectedSort={selectedSort}
          onSelectSort={(sort) => {
            setSelectedSort(sort);
            setCurrentPage(1);
          }}
          onReset={handleResetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </section>

      {/* SECTION C: Main Content Area (Loading Skeleton, Error Banner, or Hero Grid) */}
      <section>
        {loading ? (
          <SkeletonGrid count={ITEMS_PER_PAGE} />
        ) : error ? (
          <ErrorState message={error} onRetry={() => loadHeroes(false)} />
        ) : (
          <>
            <CardGrid
              heroes={currentHeroes}
              onResetFilters={handleResetFilters}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 350, behavior: 'smooth' });
              }}
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={filteredHeroes.length}
            />
          </>
        )}
      </section>
    </div>
  );
}
