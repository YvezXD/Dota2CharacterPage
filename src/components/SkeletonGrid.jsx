import React from 'react';
import { Loader2 } from 'lucide-react';

export default function SkeletonGrid({ count = 12 }) {
  return (
    <div className="space-y-6">
      {/* Loading banner message */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-[#0e0a0d] border border-[#2a1318] text-stone-300 shadow-lg">
        <div className="flex items-center space-x-3">
          <Loader2 className="w-5 h-5 text-[#e61e38] animate-spin" />
          <div>
            <p className="text-sm font-semibold text-white">
              Consulting the Ancient Archives...
            </p>
            <p className="text-xs text-stone-400">
              Fetching real-time hero analytics and win rates from OpenDota REST API
            </p>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-2 text-xs font-mono text-[#e2b76b] bg-[#140a0e] px-3 py-1.5 rounded-lg border border-[#e61e38]/30">
          <span>GET /api/heroStats</span>
        </div>
      </div>

      {/* Grid of Skeleton Cards (Deep Black & Crimson Pulse) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl overflow-hidden bg-[#0e0d12] border border-[#2a1318] animate-pulse flex flex-col h-[380px]"
          >
            {/* Image Placeholder */}
            <div className="h-44 w-full bg-[#160b0f] relative">
              <div className="absolute top-3 left-3 w-16 h-5 rounded-full bg-red-950/60" />
              <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-red-950/60" />
            </div>

            {/* Content Placeholder */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="h-5 w-3/4 bg-stone-900 rounded" />
                <div className="flex space-x-2">
                  <div className="h-4 w-12 bg-stone-900 rounded" />
                  <div className="h-4 w-14 bg-stone-900 rounded" />
                  <div className="h-4 w-10 bg-stone-900 rounded" />
                </div>
              </div>

              {/* Dual win rate bars placeholder */}
              <div className="space-y-2">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <div className="h-3 w-16 bg-stone-900 rounded" />
                    <div className="h-3 w-10 bg-stone-900 rounded" />
                  </div>
                  <div className="h-1.5 w-full bg-stone-900 rounded-full" />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <div className="h-3 w-16 bg-stone-900 rounded" />
                    <div className="h-3 w-10 bg-stone-900 rounded" />
                  </div>
                  <div className="h-1.5 w-full bg-stone-900 rounded-full" />
                </div>
              </div>

              {/* Action Buttons Placeholder */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1c0d12]">
                <div className="h-8 bg-stone-900 rounded-lg" />
                <div className="h-8 bg-red-950/50 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
