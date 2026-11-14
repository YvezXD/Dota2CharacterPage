/**
 * ==============================================================================
 * MAIN APPLICATION ROUTER (src/App.jsx)
 * ==============================================================================
 * WHAT THIS FILE DOES:
 * Wraps the entire app in `<BrowserRouter>` and `<DotaProvider>`, displays the
 * global `<Header />` and `<Footer />`, and defines the 4 client-side routes:
 *   1. `/`             -> HeroArmoryView  (Main Hero Dashboard)
 *   2. `/hero/:id`     -> HeroDetailView  (Hero Codex Details)
 *   3. `/prompt-forge` -> PromptForgeView (Dota 2 AI Prompt Generator)
 *   4. `/favorites`    -> FavoritesView   (Saved Roster & Prompts)
 *
 * THEME: Black & Red with subtle Gold accents
 * ==============================================================================
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DotaProvider } from './context/DotaContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ReadmeModal from './components/ReadmeModal';

// Page Views (Routes)
import HeroArmoryView from './views/HeroArmoryView';
import HeroDetailView from './views/HeroDetailView';
import PromptForgeView from './views/PromptForgeView';
import FavoritesView from './views/FavoritesView';

export default function App() {
  return (
    <BrowserRouter>
      <DotaProvider>
        <div className="min-h-screen flex flex-col bg-[#06070a] text-slate-100 selection:bg-[#e61e38] selection:text-white font-sans">
          {/* Top Navigation Bar */}
          <Header />

          {/* Main Routed Page Content */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              {/* Route 1: Hero Armory / Home */}
              <Route path="/" element={<HeroArmoryView />} />

              {/* Route 2: Hero Codex Details */}
              <Route path="/hero/:id" element={<HeroDetailView />} />

              {/* Route 3: Dota 2 AI Prompt Generator */}
              <Route path="/prompt-forge" element={<PromptForgeView />} />

              {/* Route 4: Saved Roster & Prompts */}
              <Route path="/favorites" element={<FavoritesView />} />

              {/* Catch-all: Redirect unknown URLs back to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* README & Git Guide Popup Modal */}
          <ReadmeModal />

          {/* Bottom Footer */}
          <Footer />
        </div>
      </DotaProvider>
    </BrowserRouter>
  );
}
