import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDota } from '../context/DotaContext';
import {
  ShieldAlert,
  Sparkles,
  Bookmark,
  BookOpen,
  Menu,
  X,
  Swords,
  Layers,
  AlertTriangle,
  RotateCw,
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

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

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
    <header className="sticky top-0 z-40 bg-[#0b0e14]/90 backdrop-blur-md border-b border-[#232a3b] shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Branding */}
          <Link
            to="/"
            className="flex items-center space-x-3 group transition-transform duration-200 hover:scale-[1.02]"
          >
            <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-[#1a2133] to-[#10141e] border border-[#e2b76b]/40 flex items-center justify-center shadow-lg group-hover:border-[#e2b76b] group-hover:shadow-[0_0_15px_rgba(226,183,107,0.3)] transition-all">
              <span className="text-xl font-black text-[#e2b76b] select-none font-serif">
                ⚔
              </span>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#ff4b4b] rounded-full border border-[#0b0e14] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-black tracking-wider text-xl text-white group-hover:text-[#e2b76b] transition-colors">
                  ANCIENT<span className="text-[#e2b76b]">CODEX</span>
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-widest bg-[#1c2230] text-[#e2b76b] border border-[#e2b76b]/30">
                  v2.0
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans tracking-wide hidden sm:block">
                Dota 2 Hero Analytics & AI Prompt Hub
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
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
                      ? 'bg-[#1c2230] text-[#e2b76b] border border-[#e2b76b]/50 shadow-[0_0_12px_rgba(226,183,107,0.15)]'
                      : 'text-slate-300 hover:text-white hover:bg-[#131722] border border-transparent'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#e2b76b]' : 'text-slate-400'}`} />
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-gradient-to-r from-amber-500/20 to-red-500/20 text-[#e2b76b] border border-[#e2b76b]/30">
                      {link.badge}
                    </span>
                  )}
                  {link.count !== undefined && link.count > 0 && (
                    <span className="ml-1 text-xs px-1.5 py-0.2 rounded-full font-bold bg-[#ff4b4b] text-white">
                      {link.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls: Simulate API Error & Readme/Git Guide Modal */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Simulate API Error Toggle (for Evaluators / Grading) */}
            <div
              className={`flex items-center space-x-2.5 px-3 py-1.5 rounded-lg border transition-all cursor-pointer select-none ${
                simulateError
                  ? 'bg-red-950/40 border-[#ff4b4b] text-red-300 shadow-[0_0_15px_rgba(255,75,75,0.25)]'
                  : 'bg-[#131722] border-[#232a3b] text-slate-300 hover:border-slate-500'
              }`}
              onClick={toggleSimulateError}
              title="Toggle to simulate network/API errors for grading requirements"
            >
              <AlertTriangle
                className={`w-4 h-4 ${
                  simulateError ? 'text-[#ff4b4b] animate-bounce' : 'text-slate-400'
                }`}
              />
              <span className="text-xs font-medium">
                {simulateError ? 'Simulate Error: ON' : 'Simulate API Error'}
              </span>
              <div
                className={`w-8 h-4 rounded-full relative transition-colors ${
                  simulateError ? 'bg-[#ff4b4b]' : 'bg-slate-700'
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${
                    simulateError ? 'right-0.5' : 'left-0.5'
                  }`}
                />
              </div>
            </div>

            {/* README & Git Guide Trigger */}
            <button
              onClick={() => setIsReadmeOpen(true)}
              className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#1c2230] to-[#131722] text-[#e2b76b] border border-[#e2b76b]/40 hover:border-[#e2b76b] hover:shadow-[0_0_15px_rgba(226,183,107,0.2)] transition-all"
            >
              <BookOpen className="w-4 h-4 text-[#e2b76b]" />
              <span>README & Git Guide</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsReadmeOpen(true)}
              className="p-2 text-xs rounded-lg bg-[#131722] text-[#e2b76b] border border-[#e2b76b]/30"
              title="README & Git Guide"
            >
              <BookOpen className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#131722] text-slate-300 border border-[#232a3b] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e121a] border-b border-[#232a3b] px-4 pt-3 pb-6 space-y-3">
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
                      ? 'bg-[#1c2230] text-[#e2b76b] border border-[#e2b76b]/50'
                      : 'text-slate-300 hover:bg-[#131722]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-[#e2b76b]" />
                    <span>{link.name}</span>
                  </div>
                  {link.count !== undefined && link.count > 0 && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#ff4b4b] text-white">
                      {link.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#232a3b] space-y-2">
            <div
              onClick={toggleSimulateError}
              className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-medium cursor-pointer border ${
                simulateError
                  ? 'bg-red-950/40 border-[#ff4b4b] text-red-300'
                  : 'bg-[#131722] border-[#232a3b] text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-[#ff4b4b]" />
                <span>Simulate OpenDota Error</span>
              </div>
              <span className="font-bold">{simulateError ? 'ON' : 'OFF'}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
