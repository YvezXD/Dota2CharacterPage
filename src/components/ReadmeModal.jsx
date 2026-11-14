import React, { useState } from 'react';
import {
  X,
  BookOpen,
  GitBranch,
  Terminal,
  Server,
  CheckCircle2,
  Copy,
  Check,
} from 'lucide-react';
import { useDota } from '../context/DotaContext';

export default function ReadmeModal() {
  const { isReadmeOpen, setIsReadmeOpen } = useDota();
  const [activeTab, setActiveTab] = useState('setup');
  const [copiedKey, setCopiedKey] = useState(null);

  if (!isReadmeOpen) return null;

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const tabs = [
    { id: 'setup', label: '1. Setup & .env Guide', icon: Terminal },
    { id: 'git', label: '2. Git Workflow & Branches', icon: GitBranch },
    { id: 'api', label: '3. API & CDN Specs', icon: Server },
    { id: 'checklist', label: '4. Project Checklist', icon: CheckCircle2 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0709] border border-[#e61e38]/50 rounded-2xl shadow-[0_0_60px_rgba(0,0,0,0.95),0_0_30px_rgba(230,30,56,0.25)] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#261015] bg-[#12080b]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#1a0a0f] border border-[#e61e38]/40 text-[#e2b76b]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-black text-white tracking-wide">
                AncientCodex: Project Guide & Documentation
              </h2>
              <p className="text-xs text-stone-400 font-sans">
                University Final Project Capstone • Single-Page Application (SPA)
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsReadmeOpen(false)}
            className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-[#1a0a0f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#261015] bg-[#080406] px-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-4 text-xs font-mono font-medium border-b-2 transition-all whitespace-nowrap ${
                  active
                    ? 'border-[#e61e38] text-[#ff3b53] bg-[#1a0a0f]'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-stone-300">
          {/* TAB 1: SETUP & .ENV GUIDE */}
          {activeTab === 'setup' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  1. Environment Configuration (`.env.example`)
                </h3>
                <p className="text-xs text-stone-400">
                  OpenDota API provides a generous free tier of 60 calls/minute without an API key. For production keys, configure your environment variables:
                </p>
              </div>

              <div className="relative rounded-xl bg-[#060304] border border-[#2a1318] p-4 font-mono text-xs text-[#e2b76b]">
                <button
                  onClick={() =>
                    copyToClipboard(
                      '# OpenDota API Key (Optional)\nVITE_OPENDOTA_API_KEY=',
                      'env_sample'
                    )
                  }
                  className="absolute top-3 right-3 p-1.5 rounded bg-[#160a0e] text-stone-400 hover:text-white border border-[#2e141a]"
                  title="Copy .env template"
                >
                  {copiedKey === 'env_sample' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <div className="text-stone-500"># .env.example / .env</div>
                <div className="mt-1 text-white">VITE_OPENDOTA_API_KEY=</div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-stone-400 font-bold">
                  Quick Start Commands:
                </h4>
                <div className="rounded-xl bg-[#060304] border border-[#2a1318] p-3 font-mono text-xs space-y-2">
                  <div className="text-stone-400"># 1. Install dependencies</div>
                  <div className="text-[#ff3b53]">npm install</div>
                  <div className="text-stone-400 mt-2"># 2. Run local development server</div>
                  <div className="text-[#ff3b53]">npm run dev</div>
                  <div className="text-stone-400 mt-2"># 3. Production build</div>
                  <div className="text-[#ff3b53]">npm run build</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GIT WORKFLOW & FEATURE BRANCHES */}
          {activeTab === 'git' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  2. Conventional Commit & Git Branch Workflow
                </h3>
                <p className="text-xs text-stone-400">
                  Following strict industry Git branching and Conventional Commits standard:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-[#10070a] border border-[#2a1318] space-y-1">
                  <div className="text-[#e61e38] font-bold flex items-center space-x-1.5">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>feature/api-fetch</span>
                  </div>
                  <p className="text-stone-400 font-sans text-xs">
                    Integration with OpenDota REST API, error handling UI, Steam CDN image loader, and skeleton grid.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#10070a] border border-[#2a1318] space-y-1">
                  <div className="text-[#ff2a44] font-bold flex items-center space-x-1.5">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>feature/search-bar</span>
                  </div>
                  <p className="text-stone-400 font-sans text-xs">
                    Real-time keyword search, role filters, sorting, and persistent recent search history in localStorage.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#10070a] border border-[#2a1318] space-y-1">
                  <div className="text-[#e2b76b] font-bold flex items-center space-x-1.5">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>feature/favorites</span>
                  </div>
                  <p className="text-stone-400 font-sans text-xs">
                    Hero bookmarking and prompt collection roster persisted via `localStorage` keys.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#10070a] border border-[#2a1318] space-y-1">
                  <div className="text-[#ff3344] font-bold flex items-center space-x-1.5">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>feature/prompt-forge</span>
                  </div>
                  <p className="text-stone-400 font-sans text-xs">
                    Interactive AI prompt engineer with 4 prompt archetypes, copyable markdown, and export capabilities.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#060304] border border-[#2a1318] text-xs font-mono space-y-2">
                <span className="text-stone-500">Sample Conventional Commits:</span>
                <div className="text-stone-300">
                  <span className="text-[#ff2a44]">feat(api):</span> connect OpenDota heroStats with Steam CDN portraits
                </div>
                <div className="text-stone-300">
                  <span className="text-[#ff3b53]">feat(search):</span> add real-time filtering with persistent recent search chips
                </div>
                <div className="text-stone-300">
                  <span className="text-[#e2b76b]">feat(storage):</span> implement favorites roster with localStorage persistence
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: API & CDN SPECS */}
          {activeTab === 'api' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  3. OpenDota REST API & Steam CDN Specification
                </h3>
                <p className="text-xs text-stone-400">
                  Data sources utilized across the client-side SPA:
                </p>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-[#10070a] border border-[#2a1318] space-y-1">
                  <div className="flex items-center justify-between text-[#e2b76b] font-bold">
                    <span>GET https://api.opendota.com/api/heroStats</span>
                    <span className="text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-800">200 OK</span>
                  </div>
                  <p className="text-stone-400 font-sans text-xs">
                    Provides 127 Dota 2 heroes with base stats (STR, AGI, INT, Armor, Speed), primary roles, and competitive win/pick rates.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#10070a] border border-[#2a1318] space-y-1">
                  <div className="text-[#ff2a44] font-bold">
                    Steam CDN: https://cdn.cloudflare.steamstatic.com + hero.img
                  </div>
                  <p className="text-stone-400 font-sans text-xs">
                    High-resolution official Valve portraits directly rendered with custom fallback shields if network fails.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PROJECT CHECKLIST */}
          {activeTab === 'checklist' && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-white mb-1">
                4. University Requirements Verification
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#10070a] border border-[#e61e38]/50 space-y-1">
                  <div className="flex items-center space-x-2 text-[#ff2a44] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>1. External REST API Integration</span>
                  </div>
                  <p className="text-stone-400">
                    OpenDota API integration, .env.example, Steam CDN fallback UI, Skeleton loader, Error banner, and Header error simulator toggle.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#10070a] border border-[#e61e38]/50 space-y-1">
                  <div className="flex items-center space-x-2 text-[#ff2a44] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>2. Client-Side Routing (React Router)</span>
                  </div>
                  <p className="text-stone-400">
                    4 routes: Home Armory (`/`), Hero Codex (`/hero/:id`), Prompt Forge (`/prompt-forge`), and Favorites (`/favorites`).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#10070a] border border-[#e61e38]/50 space-y-1">
                  <div className="flex items-center space-x-2 text-[#ff2a44] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>3. All 4 Interactive Features</span>
                  </div>
                  <p className="text-stone-400">
                    Search with recent searches in localStorage, Attribute & Role filters with sorting, 12-per-page Pagination, and persistent bookmarked favorites & prompts.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#10070a] border border-[#e61e38]/50 space-y-1">
                  <div className="flex items-center space-x-2 text-[#ff2a44] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>4. Component Architecture & Design</span>
                  </div>
                  <p className="text-stone-400">
                    Black & Red theme with subtle gold highlights, lucide-react icons, and modular component hierarchy.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#261015] bg-[#12080b] flex items-center justify-between text-xs text-stone-400">
          <span>AncientCodex Academic Submission</span>
          <button
            onClick={() => setIsReadmeOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#e61e38] to-[#991b1b] text-white font-bold hover:brightness-110 shadow-[0_0_12px_rgba(230,30,56,0.4)] transition-all"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
