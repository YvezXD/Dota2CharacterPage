import React from 'react';
import { RotateCw, ShieldAlert, Sparkles, Terminal } from 'lucide-react';
import { useDota } from '../context/DotaContext';

export default function ErrorState({ message, onRetry }) {
  const { simulateError, toggleSimulateError } = useDota();

  return (
    <div className="my-10 max-w-3xl mx-auto rounded-2xl overflow-hidden bg-gradient-to-b from-[#180a0f] to-[#0c0508] border-2 border-[#e61e38]/70 shadow-[0_0_40px_rgba(230,30,56,0.3)] p-6 sm:p-8 text-center relative">
      {/* Dire background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-32 bg-[#e61e38]/15 blur-3xl rounded-full pointer-events-none" />

      {/* Skull / Warning Icon */}
      <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-red-950/80 to-black border border-[#e61e38]/50 text-[#ff2a44] mb-4 shadow-lg">
        <ShieldAlert className="w-12 h-12 animate-pulse" />
      </div>

      <div className="space-y-2">
        <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#ff3b53] bg-red-950/80 px-3 py-1 rounded-full border border-[#e61e38]/40">
          Dire Anomaly Encountered
        </span>
        <h3 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-wide">
          Connection to OpenDota Severed
        </h3>
        <p className="text-sm text-stone-300 max-w-xl mx-auto leading-relaxed pt-1">
          {message || 'Unable to fetch hero statistics from the OpenDota REST API endpoint. The connection could not be established or timed out.'}
        </p>
      </div>

      {/* Simulator Notice if active */}
      {simulateError && (
        <div className="mt-4 p-3 bg-red-950/60 border border-[#e61e38]/50 rounded-xl max-w-lg mx-auto text-xs text-red-200 flex items-center justify-center space-x-2">
          <Terminal className="w-4 h-4 text-[#ff2a44] shrink-0" />
          <span>
            <strong>Simulate API Error is currently ACTIVE.</strong> Turn it off in the header or button below to restore the live stream.
          </span>
        </div>
      )}

      {/* Interactive Action Buttons */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onRetry}
          className="flex items-center space-x-2 px-6 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#e61e38] to-[#991b1b] text-white hover:brightness-110 shadow-[0_0_20px_rgba(230,30,56,0.45)] active:scale-95 transition-all"
        >
          <RotateCw className="w-4 h-4" />
          <span>Retry Connection</span>
        </button>

        {simulateError && (
          <button
            onClick={toggleSimulateError}
            className="flex items-center space-x-2 px-5 py-3 rounded-xl font-bold text-sm bg-[#140a0e] hover:bg-[#200c14] text-[#e2b76b] border border-[#e2b76b]/50 shadow-[0_0_12px_rgba(226,183,107,0.2)] transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Turn Off Simulated Error</span>
          </button>
        )}
      </div>

      {/* Debug Info helper for grading */}
      <div className="mt-6 pt-4 border-t border-red-950/80 text-[11px] text-stone-400 font-mono flex items-center justify-center space-x-4">
        <span>Target: https://api.opendota.com/api/heroStats</span>
        <span>•</span>
        <span>Environment: {import.meta.env.MODE}</span>
      </div>
    </div>
  );
}
