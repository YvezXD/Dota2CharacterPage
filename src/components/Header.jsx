/**
 * ==============================================================================
 * GLOBAL NAVIGATION HEADER (src/components/Header.jsx)
 * ==============================================================================
 * WHAT THIS COMPONENT DOES:
 * Renders the top navigation bar across all pages:
 * - App Logo & Title (Black & Red with Gold crest)
 * - Navigation Links (Hero Armory, AI Prompt Forge, Codex Roster)
 * - "Simulate API Error" toggle switch (for testing error states)
 * - "README & Git Guide" modal button
 * - Responsive mobile menu drawer
 *
 * THEME: Black and Red with a little bit of Gold
 * ==============================================================================
 */

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDota } from '../context/DotaContext';
import { APP_CONFIG } from '../config/appConfig';
import {
  Sparkles,
  Bookmark,
  BookOpen,
  Menu,
  X,
  Swords,
  AlertTriangle,
} from 'lucide-react';

export default function Header() {
  const {
    favorites,
    savedPrompts,
    simulateError,
    toggleSimulateError,
    setIsReadmeOpen,
  } = useDota();

  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper to check if a nav link is currently active
  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Navigation items displayed in the top bar
  const navLinks = [
    { name: 'Hero Armory', path: '/', icon: Swords },
    { name: 'AI Prompt Forge', path: '/prompt-forge', icon: Sparkles, badge: 'AI Hub' },
    {
      name: 'Codex Roster',
      path: '/favorites',
      icon: Bookmark,
      count: favorites.length + savedPrompts.length,
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#06070a]/95 backdrop-blur-md border-b border-[#261015] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* 1. Logo & Branding (Black & Red with Gold Accent) */}
          <Link
            to="/"
            className="flex items-center space-x-3 group transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-[#1a0a0e] via-[#0f0709] to-[#080406] border border-[#e61e38]/50 flex items-center justify-center shadow-lg group-hover:border-[#e2b76b] group-hover:shadow-[0_0_18px_rgba(230,30,56,0.35)] transition-all">
              <span className="text-xl font-black text-[#e2b76b] select-none font-serif">
                ⚔
              </span>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#e61e38] rounded-full border border-[#06070a] shadow-[0_0_8px_#e61e38] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-black tracking-wider text-xl text-white group-hover:text-[#ff2a44] transition-colors">
                  ANCIENT<span className="text-[#e61e38]">CODEX</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-widest bg-[#150a0d] text-[#e2b76b] border border-[#e2b76b]/35 shadow-sm">
                  v{APP_CONFIG.appVersion}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans tracking-wide hidden sm:block">
                {APP_CONFIG.appSubtitle}
              </p>
            </div>
          </Link>

          {/* 2. Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative flex items-center space-x-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-gradient-to-r from-[#220a0f] to-[#160609] text-[#ff3b53] border border-[#e61e38]/70 shadow-[0_0_14px_rgba(230,30,56,0.25)] font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-[#14080b] border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#e61e38]' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-red-950/60 text-[#e2b76b] border border-[#e2b76b]/40">
                      {link.badge}
                    </span>
                  )}
                  {link.count !== undefined && link.count > 0 && (
                    <span className="ml-1 text-xs px-1.5 py-0.2 rounded-full font-bold bg-[#e61e38] text-white shadow-[0_0_8px_rgba(230,30,56,0.5)]">
                      {link.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3. Right Action Controls: Simulate API Error & README Modal */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Simulate API Error Toggle */}
            <div
              className={`flex items-center space-x-2.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer select-none ${
                simulateError
                  ? 'bg-red-950/70 border-[#ff2a44] text-red-200 shadow-[0_0_18px_rgba(255,42,68,0.4)]'
                  : 'bg-[#10080a] border-[#2a1318] text-slate-300 hover:border-red-900/60'
              }`}
              onClick={toggleSimulateError}
              title="Toggle to simulate network/API errors for grading requirements"
            >
              <AlertTriangle
                className={`w-4 h-4 ${
                  simulateError ? 'text-[#ff2a44] animate-bounce' : 'text-slate-400'
                }`}
              />
              <span className="text-xs font-medium">
                {simulateError ? 'Simulate Error: ON' : 'Simulate API Error'}
              </span>
              <div
                className={`w-8 h-4 rounded-full relative transition-colors ${
                  simulateError ? 'bg-[#e61e38]' : 'bg-stone-800'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${
                    simulateError ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </div>
            </div>

            {/* README & Git Guide Trigger (Black & Red with Gold Icon & Text) */}
            <button
              onClick={() => setIsReadmeOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#170a0d] to-[#100608] text-[#e2b76b] border border-[#e61e38]/40 hover:border-[#e2b76b] hover:shadow-[0_0_16px_rgba(230,30,56,0.3)] transition-all"
            >
              <BookOpen className="w-4 h-4 text-[#e2b76b]" />
              <span>README & Git Guide</span>
            </button>
          </div>

          {/* 4. Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsReadmeOpen(true)}
              className="p-2 text-xs rounded-lg bg-[#14080b] text-[#e2b76b] border border-[#e61e38]/40"
              title="README & Git Guide"
            >
              <BookOpen className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#14080b] text-slate-300 border border-[#2a1318] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 5. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#090507] border-b border-[#261015] px-4 pt-3 pb-6 space-y-3">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium ${
                    active
                      ? 'bg-[#1f0d12] text-[#ff3b53] border border-[#e61e38]/60 font-semibold'
                      : 'text-slate-300 hover:bg-[#14080b]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-[#e61e38]" />
                    <span>{link.name}</span>
                  </div>
                  {link.count !== undefined && link.count > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#e61e38] text-white">
                      {link.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#261015] space-y-2">
            <div
              onClick={toggleSimulateError}
              className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-medium cursor-pointer border ${
                simulateError
                  ? 'bg-red-950/70 border-[#ff2a44] text-red-200'
                  : 'bg-[#10080a] border-[#2a1318] text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-[#ff2a44]" />
                <span>Simulate OpenDota Error</span>
              </div>
              <span className="font-bold text-[#ff2a44]">{simulateError ? 'ON' : 'OFF'}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
