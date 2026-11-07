import React from 'react';
import { BookOpen, GitBranch, Terminal, Shield, ExternalLink, Heart } from 'lucide-react';
import { useDota } from '../context/DotaContext';

export default function Footer() {
  const { setIsReadmeOpen } = useDota();

  return (
    <footer className="mt-20 border-t border-[#232a3b] bg-[#080a0f] text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand / Project Info */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-serif font-black tracking-wider text-white">
              ANCIENT<span className="text-[#e2b76b]">CODEX</span>
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#1c2230] text-[#e2b76b] font-mono border border-[#e2b76b]/30">
              FINAL PROJECT SPA
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            Dota 2 Hero Analytics & AI Prompt Hub. Designed and developed as a university client-side React SPA capstone, powered by real-time OpenDota REST API stats and Steam CDN assets.
          </p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="px-2.5 py-1 rounded bg-[#131722] border border-[#232a3b] text-slate-300">
              React 19
            </span>
            <span className="px-2.5 py-1 rounded bg-[#131722] border border-[#232a3b] text-slate-300">
              React Router 7
            </span>
            <span className="px-2.5 py-1 rounded bg-[#131722] border border-[#232a3b] text-slate-300">
              Tailwind CSS
            </span>
            <span className="px-2.5 py-1 rounded bg-[#131722] border border-[#232a3b] text-slate-300">
              OpenDota REST API
            </span>
            <span className="px-2.5 py-1 rounded bg-[#131722] border border-[#232a3b] text-slate-300">
              LocalStorage
            </span>
          </div>
        </div>

        {/* Quick Links & Documentation */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
            Project Navigation
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <button
                onClick={() => setIsReadmeOpen(true)}
                className="flex items-center space-x-1.5 hover:text-[#e2b76b] transition-colors text-left"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#e2b76b]" />
                <span>README & Git Guide</span>
              </button>
            </li>
            <li>
              <a
                href="https://docs.opendota.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 hover:text-[#e2b76b] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                <span>OpenDota API Docs</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.dota2.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-1.5 hover:text-[#e2b76b] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                <span>Official Dota 2 Portal</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Git Workflow Summary */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">
            Git Feature Branches
          </h4>
          <div className="space-y-1.5 text-xs font-mono text-slate-400">
            <div className="flex items-center space-x-2 bg-[#131722] px-2.5 py-1.5 rounded border border-[#232a3b]">
              <GitBranch className="w-3 h-3 text-[#2ecc71]" />
              <span>feature/api-fetch</span>
            </div>
            <div className="flex items-center space-x-2 bg-[#131722] px-2.5 py-1.5 rounded border border-[#232a3b]">
              <GitBranch className="w-3 h-3 text-[#00d2ff]" />
              <span>feature/search-bar</span>
            </div>
            <div className="flex items-center space-x-2 bg-[#131722] px-2.5 py-1.5 rounded border border-[#232a3b]">
              <GitBranch className="w-3 h-3 text-[#e2b76b]" />
              <span>feature/favorites</span>
            </div>
            <div className="flex items-center space-x-2 bg-[#131722] px-2.5 py-1.5 rounded border border-[#232a3b]">
              <GitBranch className="w-3 h-3 text-[#df53f3]" />
              <span>feature/prompt-forge</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#1c2230] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>
          © 2026 AncientCodex. Built for University Final Project Assessment. Dota 2 is a registered trademark of Valve Corporation.
        </p>
        <p className="flex items-center space-x-1">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-[#ff4b4b] fill-current" />
          <span>for Dota 2 Strategists & Prompt Engineers</span>
        </p>
      </div>
    </footer>
  );
}
