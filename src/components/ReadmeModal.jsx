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
  ExternalLink,
  Code2,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0e121a] border border-[#e2b76b]/40 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9),0_0_30px_rgba(226,183,107,0.15)] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#232a3b] bg-[#131722]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-[#1c2230] border border-[#e2b76b]/30 text-[#e2b76b]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-black text-white tracking-wide">
                AncientCodex: Project Guide & Documentation
              </h2>
              <p className="text-xs text-slate-400 font-sans">
                University Final Project Capstone • Single-Page Application (SPA)
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsReadmeOpen(false)}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-[#1c2230] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#232a3b] bg-[#0b0e14] px-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-3 px-4 text-xs font-mono font-medium border-b-2 transition-all whitespace-nowrap ${
                  active
                    ? 'border-[#e2b76b] text-[#e2b76b] bg-[#131722]/60'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          {/* TAB 1: SETUP & .ENV GUIDE */}
          {activeTab === 'setup' && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white mb-1">
                  1. Environment Configuration (`.env.example`)
                </h3>
                <p className="text-xs text-slate-400">
                  OpenDota API provides a generous free tier of 60 calls/minute without an API key. For production keys, configure your environment variables:
                </p>
              </div>

              <div className="relative rounded-xl bg-[#090b10] border border-[#232a3b] p-4 font-mono text-xs text-[#e2b76b]">
                <button
                  onClick={() =>
                    copyToClipboard(
                      '# OpenDota API Key (Optional)\nVITE_OPENDOTA_API_KEY=',
                      'env_sample'
                    )
                  }
                  className="absolute top-3 right-3 p-1.5 rounded bg-[#1c2230] text-slate-400 hover:text-white border border-[#2e374d]"
                  title="Copy .env template"
                >
                  {copiedKey === 'env_sample' ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
                <div className="text-slate-500"># .env.example / .env</div>
                <div className="mt-1 text-white">VITE_OPENDOTA_API_KEY=</div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">
                  Quick Start Commands:
                </h4>
                <div className="rounded-xl bg-[#090b10] border border-[#232a3b] p-3 font-mono text-xs space-y-2">
                  <div className="text-slate-400"># 1. Install dependencies</div>
                  <div className="text-emerald-400">npm install</div>
                  <div className="text-slate-400 mt-2"># 2. Run local development server</div>
                  <div className="text-emerald-400">npm run dev</div>
                  <div className="text-slate-400 mt-2"># 3. Production build</div>
                  <div className="text-emerald-400">npm run build</div>
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
                <p className="text-xs text-slate-400">
                  Following strict industry Git branching and Conventional Commits standard:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-[#131722] border border-[#232a3b] space-y-1">
                  <div className="text-[#2ecc71] font-bold flex items-center space-x-1.5">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>feature/api-fetch</span>
                  </div>
                  <p className="text-slate-400 font-sans text-xs">
                    Integration with OpenDota REST API, error handling UI, Steam CDN image loader, and skeleton grid.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#131722] border border-[#232a3b] space-y-1">
                  <div className="text-[#00d2ff] font-bold flex items-center space-x-1.5">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>feature/search-bar</span>
                  </div>
                  <p className="text-slate-400 font-sans text-xs">
                    Real-time keyword search, role filters, sorting, and persistent recent search history in localStorage.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#131722] border border-[#232a3b] space-y-1">
                  <div className="text-[#e2b76b] font-bold flex items-center space-x-1.5">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>feature/favorites</span>
                  </div>
                  <p className="text-slate-400 font-sans text-xs">
                    Hero bookmarking and prompt collection roster persisted via `localStorage` keys.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#131722] border border-[#232a3b] space-y-1">
                  <div className="text-[#df53f3] font-bold flex items-center space-x-1.5">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>feature/prompt-forge</span>
                  </div>
                  <p className="text-slate-400 font-sans text-xs">
                    Interactive AI prompt engineer with 4 prompt archetypes, copyable markdown, and export capabilities.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#090b10] border border-[#232a3b] text-xs font-mono space-y-2">
                <span className="text-slate-500">Sample Conventional Commits:</span>
                <div className="text-slate-300">
                  <span className="text-emerald-400">feat(api):</span> connect OpenDota heroStats with Steam CDN portraits
                </div>
                <div className="text-slate-300">
                  <span className="text-cyan-400">feat(search):</span> add real-time filtering with persistent recent search chips
                </div>
                <div className="text-slate-300">
                  <span className="text-amber-400">feat(storage):</span> implement favorites roster with localStorage persistence
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
                <p className="text-xs text-slate-400">
                  Data sources utilized across the client-side SPA:
                </p>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-[#131722] border border-[#232a3b] space-y-1">
                  <div className="flex items-center justify-between text-[#e2b76b] font-bold">
                    <span>GET https://api.opendota.com/api/heroStats</span>
                    <span className="text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800">200 OK</span>
                  </div>
                  <p className="text-slate-400 font-sans text-xs">
                    Provides 127 Dota 2 heroes with base stats (STR, AGI, INT, Armor, Speed), primary roles, and competitive win/pick rates.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#131722] border border-[#232a3b] space-y-1">
                  <div className="text-[#00d2ff] font-bold">
                    Steam CDN: https://cdn.cloudflare.steamstatic.com + hero.img
                  </div>
                  <p className="text-slate-400 font-sans text-xs">
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
                <div className="p-3 rounded-xl bg-[#131722] border border-[#2ecc71]/40 space-y-1">
                  <div className="flex items-center space-x-2 text-[#2ecc71] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>1. External REST API Integration</span>
                  </div>
                  <p className="text-slate-400">
                    OpenDota API integration, .env.example, Steam CDN fallback UI, Skeleton loader, Error banner, and Header error simulator toggle.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#131722] border border-[#2ecc71]/40 space-y-1">
                  <div className="flex items-center space-x-2 text-[#2ecc71] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>2. Client-Side Routing (React Router)</span>
                  </div>
                  <p className="text-slate-400">
                    4 routes: Home Armory (`/`), Hero Codex (`/hero/:id`), Prompt Forge (`/prompt-forge`), and Favorites (`/favorites`).
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#131722] border border-[#2ecc71]/40 space-y-1">
                  <div className="flex items-center space-x-2 text-[#2ecc71] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>3. All 4 Interactive Features</span>
                  </div>
                  <p className="text-slate-400">
                    Search with recent searches in localStorage, Attribute & Role filters with sorting, 12-per-page Pagination, and persistent bookmarked favorites & prompts.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-[#131722] border border-[#2ecc71]/40 space-y-1">
                  <div className="flex items-center space-x-2 text-[#2ecc71] font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>4. Component Architecture & Design</span>
                  </div>
                  <p className="text-slate-400">
                    Tailwind CSS dark Dota 2 aesthetic (#0b0e14, #131722, #e2b76b, #ff4b4b), lucide-react icons, and modular component hierarchy.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#232a3b] bg-[#131722] flex items-center justify-between text-xs text-slate-400">
          <span>AncientCodex Academic Submission</span>
          <button
            onClick={() => setIsReadmeOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-[#e2b76b] text-black font-bold hover:brightness-110 transition-all"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
