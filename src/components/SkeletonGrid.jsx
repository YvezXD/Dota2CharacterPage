import React from 'react';
import { Loader2 } from 'lucide-react';

export default function SkeletonGrid({ count = 12 }) {
  return (
    <div className="space-y-6">
      {/* Loading banner message */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#131722]/80 border border-[#232a3b] text-slate-300">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-5 h-5 text-[#e2b76b] animate-spin" />
          <div>
            <p className="text-sm font-semibold text-white">
              Consulting the Ancient Archives...
            </p>
            <p className="text-xs text-slate-400">
              Fetching real-time hero analytics and win rates from OpenDota REST API
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-[#e2b76b] bg-[#1c2230] px-3 py-1.5 rounded-lg border border-[#e2b76b]/20">
          <span>GET /api/heroStats</span>
        </div>
      </div>

      {/* Grid of Skeleton Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden bg-[#131722] border border-[#232a3b] animate-pulse flex flex-col h-[380px]"
          >
            {/* Image Placeholder */}
            <div className="h-44 w-full bg-slate-800/60 relative">
              <div className="absolute top-3 left-3 w-16 h-5 rounded-full bg-slate-700/70" />
              <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-slate-700/70" />
            </div>

            {/* Content Placeholder */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="h-5 w-3/4 bg-slate-700/70 rounded" />
                <div className="flex space-x-2">
                  <div className="h-4 w-12 bg-slate-800 rounded" />
                  <div className="h-4 w-14 bg-slate-800 rounded" />
                  <div className="h-4 w-10 bg-slate-800 rounded" />
                </div>
              </div>

              {/* Win rate bar placeholder */}
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <div className="h-3 w-16 bg-slate-800 rounded" />
                  <div className="h-3 w-10 bg-slate-800 rounded" />
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full" />
              </div>

              {/* Action Buttons Placeholder */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1c2230]">
                <div className="h-8 bg-slate-800 rounded-lg" />
                <div className="h-8 bg-slate-800 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

