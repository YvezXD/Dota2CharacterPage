import React, { useState, useMemo } from 'react';
import { useDota } from '../context/DotaContext';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import CardGrid from '../components/CardGrid';
import Pagination from '../components/Pagination';
import SkeletonGrid from '../components/SkeletonGrid';
import ErrorState from '../components/ErrorState';
import { Swords, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

export default function HeroArmoryView() {
  const { heroes, loading, error, loadHeroes } = useDota();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAttr, setSelectedAttr] = useState('all');
  const [selectedAttackType, setSelectedAttackType] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedSort, setSelectedSort] = useState('name_asc');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter & Sort Logic
  const filteredHeroes = useMemo(() => {
    if (!heroes || heroes.length === 0) return [];

    let result = [...heroes];

    // 1. Search Query Filter (name or roles)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (hero) =>
          hero.localized_name?.toLowerCase().includes(q) ||
          hero.roles?.some((role) => role.toLowerCase().includes(q))
      );
    }

    // 2. Primary Attribute Filter
    if (selectedAttr !== 'all') {
      if (selectedAttr === 'all_attr') {
        result = result.filter((h) => h.primary_attr === 'all');
      } else {
        result = result.filter((h) => h.primary_attr === selectedAttr);
      }
    }

    // 3. Attack Type Filter
    if (selectedAttackType !== 'All') {
      result = result.filter((h) => h.attack_type === selectedAttackType);
    }

    // 4. Role Filter
    if (selectedRole !== 'All') {
      result = result.filter((h) => h.roles?.includes(selectedRole));
    }

    // 5. Sorting
    result.sort((a, b) => {
      switch (selectedSort) {
        case 'name_asc':
          return (a.localized_name || '').localeCompare(b.localized_name || '');
        case 'name_desc':
          return (b.localized_name || '').localeCompare(a.localized_name || '');
        case 'winrate_desc':
          return (b.pubWinRate || 0) - (a.pubWinRate || 0);
        case 'winrate_asc':
          return (a.pubWinRate || 0) - (b.pubWinRate || 0);
        case 'pro_pick_desc':
          return (b.pro_pick || 0) - (a.pro_pick || 0);
        case 'speed_desc':
          return (b.move_speed || 0) - (a.move_speed || 0);
        case 'str_desc':
          return (b.base_str || 0) - (a.base_str || 0);
        default:
          return 0;
      }
    });

    return result;
  }, [heroes, searchQuery, selectedAttr, selectedAttackType, selectedRole, selectedSort]);

  // Handle Search Input Change
  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setCurrentPage(1);
  };

  // Reset all filters
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

  // Pagination slicing
  const totalPages = Math.ceil(filteredHeroes.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentHeroes = filteredHeroes.slice(startIndex, endIndex);

  return (
    <div className="space-y-8">
      {/* Hero Armory Hero Header Banner */}
      <section className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#131722] via-[#1a2133] to-[#0e121a] border border-[#232a3b] p-6 sm:p-10 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#1c2230] border border-[#e2b76b]/30 text-xs font-mono text-[#e2b76b]">
            <Sparkles className="w-3.5 h-3.5 text-[#e2b76b]" />
            <span>OpenDota Live Statistics & AI Codex</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black text-white tracking-wide leading-tight">
            Dota 2 Hero Armory & Analytics
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Explore complete competitive attributes, base stats, pro pick frequencies, and public win rates for all 127 heroes. Select any hero to forge deep tactical AI coaching and lore prompts.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-xs font-mono text-slate-400">
            <div className="flex items-center space-x-1.5 bg-[#0b0e14]/60 px-3 py-1.5 rounded-lg border border-[#232a3b]">
              <Swords className="w-4 h-4 text-[#e2b76b]" />
              <span>Total Heroes: <strong className="text-white">{heroes?.length || 127}</strong></span>
            </div>
            <div className="flex items-center space-x-1.5 bg-[#0b0e14]/60 px-3 py-1.5 rounded-lg border border-[#232a3b]">
              <TrendingUp className="w-4 h-4 text-[#2ecc71]" />
              <span>Real-Time Win Rates</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-[#0b0e14]/60 px-3 py-1.5 rounded-lg border border-[#232a3b]">
              <ShieldCheck className="w-4 h-4 text-[#00d2ff]" />
              <span>Steam CDN CDN-Accelerated</span>
            </div>
          </div>
        </div>

        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#e2b76b]/10 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#ff4b4b]/10 blur-3xl rounded-full pointer-events-none" />
      </section>

      {/* Search & Filter Controls */}
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

      {/* Main Grid View Area: Loading Skeleton, Error State, or Hero Cards */}
      <section>
        {loading ? (
          <SkeletonGrid count={12} />
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
