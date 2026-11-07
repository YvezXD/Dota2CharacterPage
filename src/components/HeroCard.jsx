import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Sparkles,
  Sword,
  Target,
  Shield,
  Zap,
  Flame,
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

  // Determine Attribute Theme
  const attrInfo = PRIMARY_ATTRIBUTES.find((a) => a.id === hero.primary_attr) || {
    label: hero.primary_attr?.toUpperCase() || 'HERO',
    short: (hero.primary_attr || 'ALL').toUpperCase(),
    color: '#e2b76b',
    bg: 'rgba(226, 183, 107, 0.15)',
  };

  // Win rate calculation
  const winRate = hero.pubWinRate || 0;
  const isHighWinRate = winRate >= 51.5;
  const isLowWinRate = winRate < 48.0;

  const winRateColor = isHighWinRate
    ? 'text-[#2ecc71]'
    : isLowWinRate
    ? 'text-[#ff4b4b]'
    : 'text-[#e2b76b]';

  const winRateBg = isHighWinRate
    ? 'bg-[#2ecc71]'
    : isLowWinRate
    ? 'bg-[#ff4b4b]'
    : 'bg-[#e2b76b]';

  return (
    <div className="group rounded-xl overflow-hidden bg-[#131722] border border-[#232a3b] hover:border-[#e2b76b]/70 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(226,183,107,0.15)] transition-all duration-300 flex flex-col justify-between relative">
      {/* Top Banner Image with Overlay */}
      <div className="relative h-48 w-full bg-[#0a0d13] overflow-hidden">
        {!imageFailed && hero.avatarUrl ? (
          <img
            src={hero.avatarUrl}
            alt={hero.localized_name}
            onError={() => setImageFailed(true)}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          /* Clean Fallback UI if Steam CDN fails or image is missing */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#161d2d] to-[#0c1017] p-4 text-center">
            <Shield className="w-12 h-12 text-[#e2b76b]/40 mb-1" />
            <span className="text-sm font-bold text-slate-200">
              {hero.localized_name}
            </span>
            <span className="text-[10px] text-slate-400 font-mono">Dota 2 Hero</span>
          </div>
        )}

        {/* Gradient shadow overlay for readable text */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#131722] via-transparent to-black/60 pointer-events-none" />

        {/* Primary Attribute Pill */}
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider font-mono flex items-center space-x-1.5 backdrop-blur-md shadow-md border"
          style={{
            backgroundColor: 'rgba(11, 14, 20, 0.85)',
            borderColor: `${attrInfo.color}66`,
            color: attrInfo.color,
          }}
        >
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: attrInfo.color }}
          />
          <span>{attrInfo.short}</span>
        </div>

        {/* Favorite Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(hero.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-md transition-all shadow-md ${
            favorited
              ? 'bg-[#e2b76b] text-black shadow-[0_0_15px_rgba(226,183,107,0.5)]'
              : 'bg-black/60 text-slate-300 hover:text-[#e2b76b] hover:bg-black/80'
          }`}
          title={favorited ? 'Remove from Codex Roster' : 'Bookmark to Codex Roster'}
        >
          <Star className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
        </button>

        {/* Attack Type Badge */}
        <div className="absolute bottom-2 left-3 flex items-center space-x-1 px-2 py-0.5 rounded bg-black/70 border border-slate-700/60 text-[10px] text-slate-300 font-medium backdrop-blur-sm">
          {hero.attack_type === 'Melee' ? (
            <Sword className="w-3 h-3 text-[#ff4b4b]" />
          ) : (
            <Target className="w-3 h-3 text-[#00d2ff]" />
          )}
          <span>{hero.attack_type}</span>
        </div>

        {/* Base Move Speed */}
        <div className="absolute bottom-2 right-3 text-[11px] font-mono text-slate-300 bg-black/70 px-2 py-0.5 rounded border border-slate-700/60">
          👟 {hero.move_speed} ms
        </div>
      </div>

      {/* Hero Info Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between">
            <h3 className="font-serif font-black text-lg text-white group-hover:text-[#e2b76b] transition-colors line-clamp-1">
              {hero.localized_name}
            </h3>
          </div>

          {/* Roles Tags */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {hero.roles?.slice(0, 3).map((role) => (
              <span
                key={role}
                className="text-[10px] px-2 py-0.5 rounded bg-[#1c2230] text-slate-300 border border-[#2e374d]"
              >
                {role}
              </span>
            ))}
            {hero.roles?.length > 3 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1c2230] text-slate-400">
                +{hero.roles.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Win Rate & Pick Rate Stats */}
        <div className="space-y-1.5 pt-2 border-t border-[#1c2230]">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 flex items-center space-x-1">
              <Activity className="w-3.5 h-3.5 text-slate-500" />
              <span>Public Win Rate</span>
            </span>
            <span className={`font-mono font-bold ${winRateColor}`}>
              {winRate > 0 ? `${winRate}%` : 'N/A'}
            </span>
          </div>

          {/* Win Rate Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-700 ${winRateBg}`}
              style={{ width: `${Math.min(Math.max(winRate, 5), 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
            <span>Pro Picks: <strong className="text-slate-200">{hero.pro_pick || 0}</strong></span>
            <span>Turbo Win: <strong className="text-slate-200">{hero.turboWinRate}%</strong></span>
          </div>
        </div>

        {/* Action Buttons: Codex Specs & AI Prompt Forge */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1c2230]">
          <Link
            to={`/hero/${hero.id}`}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-[#1c2230] hover:bg-[#252f44] text-slate-200 border border-[#2e374d] hover:border-slate-400 transition-all text-center"
          >
            <span>Specs</span>
            <ArrowRight className="w-3 h-3 text-slate-400" />
          </Link>

          <button
            onClick={() => navigate(`/prompt-forge?hero=${hero.id}`)}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#e2b76b]/20 to-[#ff4b4b]/20 hover:from-[#e2b76b]/30 hover:to-[#ff4b4b]/30 text-[#e2b76b] border border-[#e2b76b]/40 hover:border-[#e2b76b] transition-all"
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
