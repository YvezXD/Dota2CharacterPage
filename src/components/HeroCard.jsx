/**
 * ==============================================================================
 * HERO CARD COMPONENT (src/components/HeroCard.jsx)
 * ==============================================================================
 * WHAT THIS COMPONENT DOES:
 * Displays a single Dota 2 hero card inside the Armory or Favorites grid:
 * - Official portrait loaded from Steam CDN (`hero.avatarUrl`) with a fallback UI
 * - Primary Attribute badge (STR, AGI, INT, UNI)
 * - Bookmark / Favorite Star button (Gold accent, saves to `localStorage`)
 * - Attack Type (Melee / Ranged) and Base Movement Speed
 * - Localized Name and Role tags
 * - Public Win Rate progress bar, Pro Picks, and Turbo Win Rate
 * - Two action buttons: "Specs" (`/hero/:id`) and "AI Forge" (`/prompt-forge?hero=:id`)
 *
 * THEME: Black and Red with subtle Gold accents
 * ==============================================================================
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Sparkles,
  Sword,
  Target,
  Shield,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { useDota } from '../context/DotaContext';
import { PRIMARY_ATTRIBUTES } from '../constants/dotaConstants';

export default function HeroCard({ hero }) {
  const { isFavorite, toggleFavorite } = useDota();
  const navigate = useNavigate();
  const [imageFailed, setImageFailed] = useState(false);

  const favorited = isFavorite(hero.id);

  // 1. Find the color theme for the hero's primary attribute ('str', 'agi', 'int', 'all')
  const attrInfo = PRIMARY_ATTRIBUTES.find((a) => a.id === hero.primary_attr) || {
    label: hero.primary_attr?.toUpperCase() || 'HERO',
    short: (hero.primary_attr || 'ALL').toUpperCase(),
    color: '#e61e38',
    bg: 'rgba(230, 30, 56, 0.15)',
  };

  // 2. Determine Win Rate color coding (High: #ff2a44 Crimson, Medium: #e2b76b Gold, Low: #991b1b Dark Red)
  // Switch between hero.turboWinRate or hero.pubWinRate
  const winRate = hero.turboWinRate || 0;
  const isHighWinRate = winRate >= 51.5;
  const isLowWinRate = winRate < 48.0;


  const winRateColor = isHighWinRate
    ? 'text-[#ff2a44]'
    : isLowWinRate
      ? 'text-red-400'
      : 'text-[#e2b76b]';

  const winRateBg = isHighWinRate
    ? 'bg-[#ff2a44]'
    : isLowWinRate
      ? 'bg-[#991b1b]'
      : 'bg-[#e2b76b]';

  return (
    <div className="group rounded-xl overflow-hidden bg-[#0e0d12] border border-[#2a1419] hover:border-[#e61e38] hover:shadow-[0_12px_32px_rgba(0,0,0,0.9),0_0_22px_rgba(230,30,56,0.3)] transition-all duration-300 flex flex-col justify-between relative">
      {/* SECTION A: Top Portrait Image & Badges */}
      <div className="relative h-48 w-full bg-[#070507] overflow-hidden">
        {!imageFailed && hero.avatarUrl ? (
          <img
            src={hero.avatarUrl}
            alt={hero.localized_name}
            onError={() => setImageFailed(true)}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Clean Fallback UI if Steam CDN fails to load */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1a0a0f] to-[#0a0507] p-4 text-center">
            <Shield className="w-12 h-12 text-[#e61e38]/50 mb-1" />
            <span className="text-sm font-bold text-stone-200">
              {hero.localized_name}
            </span>
            <span className="text-[10px] text-stone-400 font-mono">Dota 2 Hero</span>
          </div>
        )}

        {/* Dark gradient overlay for readable text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d12] via-transparent to-black/70 pointer-events-none" />

        {/* Primary Attribute Pill (Top-Left) */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider font-mono flex items-center space-x-1.5 backdrop-blur-md shadow-md border"
          style={{
            backgroundColor: 'rgba(10, 6, 8, 0.9)',
            borderColor: `${attrInfo.color}88`,
            color: attrInfo.color,
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: attrInfo.color }}
          />
          <span>{attrInfo.short}</span>
        </div>

        {/* Favorite Bookmark Star Button (Top-Right, Gold Accent) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(hero.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all shadow-md ${favorited
              ? 'bg-[#e2b76b] text-black shadow-[0_0_15px_rgba(226,183,107,0.6)] scale-105'
              : 'bg-black/70 text-stone-300 hover:text-[#e2b76b] hover:bg-black/90'
            }`}
          title={favorited ? 'Remove from Codex Roster' : 'Bookmark to Codex Roster'}
        >
          <Star className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
        </button>

        {/* Attack Type Badge (Bottom-Left) */}
        <div className="absolute bottom-2 left-3 flex items-center space-x-1 px-2 py-0.5 rounded bg-black/80 border border-stone-800 text-[10px] text-stone-300 font-medium backdrop-blur-sm">
          {hero.attack_type === 'Melee' ? (
            <Sword className="w-3 h-3 text-[#ff2a44]" />
          ) : (
            <Target className="w-3 h-3 text-[#00d2ff]" />
          )}
          <span>{hero.attack_type}</span>
        </div>

        {/* Base Movement Speed (Bottom-Right) */}
        <div className="absolute bottom-2 right-3 text-[11px] font-mono text-stone-300 bg-black/80 px-2 py-0.5 rounded border border-stone-800">
          👟 {hero.move_speed} ms
        </div>
      </div>

      {/* SECTION B: Hero Name, Roles, Win Rate & Action Buttons */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-serif font-black text-lg text-white group-hover:text-[#ff2a44] transition-colors line-clamp-1">
            {hero.localized_name}
          </h3>

          {/* Role Tags */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {hero.roles?.slice(0, 3).map((role) => (
              <span
                key={role}
                className="text-[10px] px-2 py-0.5 rounded bg-[#160b0f] text-stone-300 border border-[#30161d]"
              >
                {role}
              </span>
            ))}
            {hero.roles?.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#160b0f] text-stone-400">
                +{hero.roles.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Win Rate & Pick Rate Meter */}
        <div className="space-y-1.5 pt-2 border-t border-[#1c0d12]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-stone-400 flex items-center space-x-1">
              <Activity className="w-3.5 h-3.5 text-stone-500" />
              <span>Turbo Win Rate</span>
            </span>
            <span className={`font-mono font-bold ${winRateColor}`}>
              {winRate > 0 ? `${winRate}%` : 'N/A'}
            </span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-stone-900 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${winRateBg}`}
              style={{ width: `${Math.min(Math.max(winRate, 5), 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-stone-400 pt-0.5">
            <span>Pro Picks: <strong className="text-stone-200">{hero.pro_pick || 0}</strong></span>
            <span>Pub Win: <strong className="text-stone-200">{hero.pubWinRate}%</strong></span>
          </div>
        </div>

        {/* Action Buttons: Specs & AI Forge (Crimson & Gold Accent) */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1c0d12]">
          <Link
            to={`/hero/${hero.id}`}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-[#150a0e] hover:bg-[#200c14] text-stone-200 border border-[#2e141a] hover:border-[#e61e38] transition-all text-center"
          >
            <span>Specs</span>
            <ArrowRight className="w-3 h-3 text-stone-400" />
          </Link>

          <button
            onClick={() => navigate(`/prompt-forge?hero=${hero.id}`)}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#e61e38] to-[#991b1b] text-white hover:brightness-110 shadow-[0_0_14px_rgba(230,30,56,0.35)] border border-[#ff3b53]/50 transition-all"
            title="Generate custom AI prompts for this hero"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e2b76b]" />
            <span>AI Forge</span>
          </button>
        </div>
      </div>
    </div>
  );
}
