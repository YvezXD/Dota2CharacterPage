import React from 'react';
import {
  Filter,
  ArrowUpDown,
  RotateCcw,
  Shield,
  Zap,
  Target,
  Sparkles,
  Sword,
} from 'lucide-react';
import {
  PRIMARY_ATTRIBUTES,
  ATTACK_TYPES,
  DOTA_ROLES,
  SORT_OPTIONS,
} from '../constants/dotaConstants';

export default function FilterBar({
  selectedAttr,
  onSelectAttr,
  selectedAttackType,
  onSelectAttackType,
  selectedRole,
  onSelectRole,
  selectedSort,
  onSelectSort,
  onReset,
  hasActiveFilters,
}) {
  return (
    <div className="p-4 rounded-xl bg-[#131722] border border-[#232a3b] space-y-4">
      {/* Top Row: Primary Attribute Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
          <Filter className="w-4 h-4 text-[#e2b76b]" />
          <span className="uppercase tracking-wider font-semibold">Primary Attribute:</span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {PRIMARY_ATTRIBUTES.map((attr) => {
            const isSelected = selectedAttr === attr.id;
            return (
              <button
                key={attr.id}
                onClick={() => onSelectAttr(attr.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium font-mono flex items-center space-x-2 border transition-all ${
                  isSelected
                    ? 'shadow-md border-transparent text-black font-bold'
                    : 'bg-[#1c2230] text-slate-300 border-[#2e374d] hover:border-slate-400'
                }`}
                style={{
                  backgroundColor: isSelected ? attr.color : undefined,
                  boxShadow: isSelected ? `0 0 15px ${attr.color}66` : undefined,
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: isSelected ? '#000' : attr.color }}
                />
                <span>{attr.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Controls: Attack Type, Role Selector, Sorting Dropdown & Reset */}
      <div className="pt-3 border-t border-[#1c2230] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Attack Type Filter */}
        <div>
          <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
            Attack Type
          </label>
          <div className="grid grid-cols-3 gap-1 bg-[#1c2230] p-1 rounded-lg border border-[#2e374d]">
            {ATTACK_TYPES.map((type) => {
              const active = selectedAttackType === type;
              return (
                <button
                  key={type}
                  onClick={() => onSelectAttackType(type)}
                  className={`py-1 text-xs rounded font-medium transition-all ${
                    active
                      ? 'bg-[#e2b76b] text-black font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Role Selector */}
        <div>
          <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1">
            Role Specialization
          </label>
          <select
            value={selectedRole}
            onChange={(e) => onSelectRole(e.target.value)}
            className="w-full py-1.5 px-3 rounded-lg bg-[#1c2230] border border-[#2e374d] text-white text-xs focus:outline-none focus:border-[#e2b76b]"
          >
            <option value="All">All Hero Roles</option>
            {DOTA_ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting Dropdown */}
        <div>
          <label className="block text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center space-x-1">
            <ArrowUpDown className="w-3 h-3 text-[#e2b76b]" />
            <span>Sort Roster By</span>
          </label>
          <select
            value={selectedSort}
            onChange={(e) => onSelectSort(e.target.value)}
            className="w-full py-1.5 px-3 rounded-lg bg-[#1c2230] border border-[#2e374d] text-white text-xs focus:outline-none focus:border-[#e2b76b]"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Filter Button */}
        <div className="flex items-end">
          <button
            onClick={onReset}
            disabled={!hasActiveFilters}
            className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center space-x-2 border transition-all ${
              hasActiveFilters
                ? 'bg-red-950/40 text-red-300 border-[#ff4b4b]/50 hover:bg-red-900/40 hover:border-[#ff4b4b]'
                : 'bg-[#1c2230]/40 text-slate-500 border-[#2e374d]/40 cursor-not-allowed'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
}

