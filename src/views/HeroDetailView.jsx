import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDota } from '../context/DotaContext';
import {
  ArrowLeft,
  Star,
  Sparkles,
  Sword,
  Target,
  Shield,
  Zap,
  Gauge,
  Heart,
  Droplet,
} from 'lucide-react';
import { PRIMARY_ATTRIBUTES } from '../constants/dotaConstants';

export default function HeroDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { heroes, loading, error, isFavorite, toggleFavorite } = useDota();
  const [imageFailed, setImageFailed] = useState(false);

  const hero = heroes.find((h) => String(h.id) === String(id));
  const favorited = hero ? isFavorite(hero.id) : false;

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="w-12 h-12 border-4 border-[#e61e38] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-mono text-stone-300">Summoning Hero Codex Archives...</p>
      </div>
    );
  }

  if (error || !hero) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto rounded-2xl bg-[#0e0a0d] border border-[#e61e38]/50 p-8 shadow-2xl">
        <Shield className="w-12 h-12 text-[#ff2a44] mx-auto mb-3" />
        <h2 className="text-2xl font-serif font-bold text-white mb-2">Hero Not Found</h2>
        <p className="text-sm text-stone-400 mb-6">
          The requested hero id ({id}) does not exist in the current OpenDota archive.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#e61e38] to-[#991b1b] text-white font-bold text-sm shadow-[0_0_15px_rgba(230,30,56,0.4)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Armory</span>
        </Link>
      </div>
    );
  }

  // Attribute styling
  const attrInfo = PRIMARY_ATTRIBUTES.find((a) => a.id === hero.primary_attr) || {
    label: (hero.primary_attr || 'ALL').toUpperCase(),
    short: (hero.primary_attr || 'ALL').toUpperCase(),
    color: '#e61e38',
  };

  // Stat calculations
  const totalBaseHp = (hero.base_health || 120) + (hero.base_str || 0) * 22;
  const totalBaseMana = (hero.base_mana || 75) + (hero.base_int || 0) * 12;
  const avgDamage = Math.round(((hero.base_attack_min || 0) + (hero.base_attack_max || 0)) / 2);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-[#0e0a0d] border border-[#2a1318] text-stone-300 hover:text-white hover:border-[#e61e38] transition-all text-xs font-mono"
        >
          <ArrowLeft className="w-4 h-4 text-[#e61e38]" />
          <span>Back to Hero Armory</span>
        </button>

        <div className="flex items-center space-x-3">
          {/* Favorite Bookmark Button (Gold Accent) */}
          <button
            onClick={() => toggleFavorite(hero.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
              favorited
                ? 'bg-[#e2b76b] text-black shadow-[0_0_15px_rgba(226,183,107,0.5)]'
                : 'bg-[#0e0a0d] border border-[#2a1318] text-stone-300 hover:text-white hover:border-red-900/60'
            }`}
          >
            <Star className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
            <span>{favorited ? 'Bookmarked in Codex' : 'Bookmark Hero'}</span>
          </button>

          {/* Forge AI Prompt Button (Crimson & Gold Accent) */}
          <button
            onClick={() => navigate(`/prompt-forge?hero=${hero.id}`)}
            className="flex items-center space-x-2 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#e61e38] to-[#991b1b] text-white hover:brightness-110 shadow-[0_0_20px_rgba(230,30,56,0.4)] border border-[#ff3b53]/50 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#e2b76b]" />
            <span>Forge AI Prompt for {hero.localized_name}</span>
          </button>
        </div>
      </div>

      {/* Hero Showcase Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#170a0e] via-[#10070a] to-[#070406] border border-[#2e141a] shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 relative z-10">
          {/* Hero Portrait */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md h-72 sm:h-80 rounded-2xl overflow-hidden border-2 border-[#36151f] shadow-[0_0_30px_rgba(0,0,0,0.9)] group">
              {!imageFailed && hero.avatarUrl ? (
                <img
                  src={hero.avatarUrl}
                  alt={hero.localized_name}
                  onError={() => setImageFailed(true)}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-[#0e0a0d] p-6 text-center">
                  <Shield className="w-16 h-16 text-[#e61e38]/40 mb-2" />
                  <span className="text-xl font-bold text-white">{hero.localized_name}</span>
                </div>
              )}

              {/* Gradient edge */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />

              {/* Primary Attribute badge */}
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-lg text-xs font-bold font-mono tracking-wider backdrop-blur-md border shadow-lg flex items-center space-x-2"
                style={{
                  backgroundColor: 'rgba(10, 5, 7, 0.92)',
                  borderColor: `${attrInfo.color}88`,
                  color: attrInfo.color,
                }}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: attrInfo.color }}
                />
                <span>{attrInfo.label} HERO</span>
              </div>

              {/* Hero Name overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-stone-400 font-mono">Dota 2 Hero # {hero.id}</div>
                  <h2 className="text-2xl font-serif font-black text-white">{hero.localized_name}</h2>
                </div>
                <div className="flex items-center space-x-1.5 text-xs font-mono bg-black/85 px-2.5 py-1 rounded-lg border border-stone-800">
                  {hero.attack_type === 'Melee' ? (
                    <Sword className="w-3.5 h-3.5 text-[#ff2a44]" />
                  ) : (
                    <Target className="w-3.5 h-3.5 text-[#00d2ff]" />
                  )}
                  <span>{hero.attack_type}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Core Overview & Roles */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-mono text-stone-400 uppercase tracking-wider">
                  Hero Specializations:
                </span>
                {hero.roles?.map((role) => (
                  <span
                    key={role}
                    className="text-xs font-mono px-3 py-1 rounded-md bg-[#180a0f] text-[#ff3b53] border border-[#e61e38]/35"
                  >
                    {role}
                  </span>
                ))}
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-black text-white mb-2">
                {hero.localized_name}
              </h1>

              <p className="text-sm text-stone-300 leading-relaxed max-w-xl">
                A formidable {hero.attack_type.toLowerCase()} {attrInfo.label.toLowerCase()} fighter in the defense of the Ancients. Master their attribute scaling, tactical power spikes, and counter-draft synergy below.
              </p>
            </div>

            {/* Quick Health & Mana Bar Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Health Pool */}
              <div className="p-4 rounded-xl bg-[#0e0a0d] border border-[#2ecc71]/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-400 flex items-center space-x-1.5">
                    <Heart className="w-4 h-4 text-[#2ecc71]" />
                    <span>Base Health Pool</span>
                  </span>
                  <span className="text-[#2ecc71] font-bold text-sm">{totalBaseHp}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-900 overflow-hidden">
                  <div className="h-full bg-[#2ecc71] rounded-full" style={{ width: '85%' }} />
                </div>
                <div className="text-[11px] font-mono text-stone-400 flex justify-between">
                  <span>Regen: +{hero.base_health_regen || 0} hp/s</span>
                  <span>Armor: {hero.base_armor || 0}</span>
                </div>
              </div>

              {/* Mana Pool */}
              <div className="p-4 rounded-xl bg-[#0e0a0d] border border-[#00d2ff]/30 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-stone-400 flex items-center space-x-1.5">
                    <Droplet className="w-4 h-4 text-[#00d2ff]" />
                    <span>Base Mana Pool</span>
                  </span>
                  <span className="text-[#00d2ff] font-bold text-sm">{totalBaseMana}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-stone-900 overflow-hidden">
                  <div className="h-full bg-[#00d2ff] rounded-full" style={{ width: '70%' }} />
                </div>
                <div className="text-[11px] font-mono text-stone-400 flex justify-between">
                  <span>Regen: +{hero.base_mana_regen || 0} mp/s</span>
                  <span>Magic Resist: {hero.base_mr || 25}%</span>
                </div>
              </div>
            </div>

            {/* Competitive Win Rate Snapshot (Red & Gold Highlights) */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-[#080406]/85 border border-[#2a1318] text-center">
                <span className="text-[11px] font-mono text-stone-400 block mb-1">Public Win Rate</span>
                <span className="text-lg font-mono font-black text-[#ff3b53]">
                  {hero.pubWinRate}%
                </span>
                <span className="text-[10px] text-stone-500 block">{(hero.pub_pick || 0).toLocaleString()} matches</span>
              </div>

              <div className="p-3 rounded-xl bg-[#080406]/85 border border-[#2a1318] text-center">
                <span className="text-[11px] font-mono text-stone-400 block mb-1">Turbo Win Rate</span>
                <span className="text-lg font-mono font-black text-[#2ecc71]">
                  {hero.turboWinRate}%
                </span>
                <span className="text-[10px] text-stone-500 block">{(hero.turbo_picks || 0).toLocaleString()} turbos</span>
              </div>

              <div className="p-3 rounded-xl bg-[#080406]/85 border border-[#2a1318] text-center">
                <span className="text-[11px] font-mono text-stone-400 block mb-1">Pro Matches</span>
                <span className="text-lg font-mono font-black text-[#e2b76b]">
                  {hero.proWinRate}%
                </span>
                <span className="text-[10px] text-stone-500 block">{hero.pro_pick || 0} picks / {hero.pro_ban || 0} bans</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Attribute Breakdown & Combat Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Attribute Triad: STR, AGI, INT */}
        <div className="p-6 rounded-2xl bg-[#0e0d12] border border-[#2a1419] space-y-4">
          <div className="flex items-center space-x-2 text-sm font-serif font-bold text-white border-b border-[#2a1419] pb-3">
            <Zap className="w-4 h-4 text-[#e61e38]" />
            <span>Attributes & Growth Rates</span>
          </div>

          {/* Strength */}
          <div className="p-3.5 rounded-xl bg-[#140a0e]/70 border border-red-500/25 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-red-400 font-bold flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span>Strength (STR)</span>
              </span>
              <span className="text-white font-bold">{hero.base_str}</span>
            </div>
            <div className="flex justify-between text-[11px] text-stone-400 font-mono">
              <span>Gain per Level:</span>
              <span className="text-red-300 font-bold">+{hero.str_gain} / lvl</span>
            </div>
          </div>

          {/* Agility */}
          <div className="p-3.5 rounded-xl bg-[#140a0e]/70 border border-emerald-500/20 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-emerald-400 font-bold flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Agility (AGI)</span>
              </span>
              <span className="text-white font-bold">{hero.base_agi}</span>
            </div>
            <div className="flex justify-between text-[11px] text-stone-400 font-mono">
              <span>Gain per Level:</span>
              <span className="text-emerald-300 font-bold">+{hero.agi_gain} / lvl</span>
            </div>
          </div>

          {/* Intelligence */}
          <div className="p-3.5 rounded-xl bg-[#140a0e]/70 border border-cyan-500/20 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-cyan-400 font-bold flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                <span>Intelligence (INT)</span>
              </span>
              <span className="text-white font-bold">{hero.base_int}</span>
            </div>
            <div className="flex justify-between text-[11px] text-stone-400 font-mono">
              <span>Gain per Level:</span>
              <span className="text-cyan-300 font-bold">+{hero.int_gain} / lvl</span>
            </div>
          </div>
        </div>

        {/* Combat & Attack Specifications */}
        <div className="p-6 rounded-2xl bg-[#0e0d12] border border-[#2a1419] space-y-4">
          <div className="flex items-center space-x-2 text-sm font-serif font-bold text-white border-b border-[#2a1419] pb-3">
            <Sword className="w-4 h-4 text-[#ff2a44]" />
            <span>Combat & Offense Specs</span>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#140a0e]/60 border border-[#2e141a]">
              <span className="text-stone-400">Attack Damage:</span>
              <span className="text-white font-bold">
                {hero.base_attack_min} - {hero.base_attack_max} (avg {avgDamage})
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#140a0e]/60 border border-[#2e141a]">
              <span className="text-stone-400">Attack Range:</span>
              <span className="text-[#00d2ff] font-bold">{hero.attack_range} range</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#140a0e]/60 border border-[#2e141a]">
              <span className="text-stone-400">Base Attack Time:</span>
              <span className="text-white font-bold">{hero.attack_rate || 1.7}s</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#140a0e]/60 border border-[#2e141a]">
              <span className="text-stone-400">Projectile Speed:</span>
              <span className="text-white font-bold">
                {hero.projectile_speed > 0 ? `${hero.projectile_speed} units/s` : 'Instant (Melee)'}
              </span>
            </div>
          </div>
        </div>

        {/* Mobility & Defense Specifications */}
        <div className="p-6 rounded-2xl bg-[#0e0d12] border border-[#2a1419] space-y-4">
          <div className="flex items-center space-x-2 text-sm font-serif font-bold text-white border-b border-[#2a1419] pb-3">
            <Gauge className="w-4 h-4 text-[#ff3b53]" />
            <span>Mobility & Vision Specs</span>
          </div>

          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#140a0e]/60 border border-[#2e141a]">
              <span className="text-stone-400">Movement Speed:</span>
              <span className="text-[#2ecc71] font-bold">{hero.move_speed} ms</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#140a0e]/60 border border-[#2e141a]">
              <span className="text-stone-400">Turn Rate:</span>
              <span className="text-white font-bold">{hero.turn_rate || '0.6'}</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#140a0e]/60 border border-[#2e141a]">
              <span className="text-stone-400">Day / Night Vision:</span>
              <span className="text-white font-bold">
                {hero.day_vision || 1800} / {hero.night_vision || 800}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#140a0e]/60 border border-[#2e141a]">
              <span className="text-stone-400">Captains Mode:</span>
              <span className={hero.cm_enabled ? 'text-emerald-400 font-bold' : 'text-stone-500'}>
                {hero.cm_enabled ? 'Enabled in CM' : 'Disabled in CM'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Prompt Forge Call to Action Banner (Black & Crimson with Gold Sparkles) */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-[#1a0a0f] via-[#12070a] to-[#080406] border border-[#e61e38]/50 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#0d0709] text-[#ff3b53] text-xs font-mono border border-[#e61e38]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#e2b76b]" />
            <span>AI Prompt Engine</span>
          </div>
          <h3 className="text-2xl font-serif font-black text-white">
            Generate Tactical AI Prompts for {hero.localized_name}
          </h3>
          <p className="text-sm text-stone-300 max-w-xl">
            Synthesize high-tier coaching guides, counter-draft logic, rich dark fantasy lore, or 4K Midjourney character concept art prompts pre-configured with {hero.localized_name}'s live stats.
          </p>
        </div>

        <button
          onClick={() => navigate(`/prompt-forge?hero=${hero.id}`)}
          className="shrink-0 px-8 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-[#e61e38] to-[#991b1b] text-white hover:brightness-110 shadow-[0_0_25px_rgba(230,30,56,0.45)] border border-[#ff3b53]/50 transition-all flex items-center space-x-2"
        >
          <Sparkles className="w-4 h-4 text-[#e2b76b]" />
          <span>Launch AI Prompt Forge</span>
        </button>
      </div>
    </div>
  );
}
