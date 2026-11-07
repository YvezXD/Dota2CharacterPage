import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DotaProvider } from './context/DotaContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ReadmeModal from './components/ReadmeModal';

// Route Views
import HeroArmoryView from './views/HeroArmoryView';
import HeroDetailView from './views/HeroDetailView';
import PromptForgeView from './views/PromptForgeView';
import FavoritesView from './views/FavoritesView';

export default function App() {
  return (
    <BrowserRouter>
      <DotaProvider>
        <div className="min-h-screen flex flex-col bg-[#0b0e14] text-slate-100 selection:bg-[#e2b76b] selection:text-black font-sans">
          {/* Global Navigation Header */}
          <Header />

          {/* Main App Routed Views */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              {/* 1. Hero Armory / Home */}
              <Route path="/" element={<HeroArmoryView />} />

              {/* 2. Hero Codex Details */}
              <Route path="/hero/:id" element={<HeroDetailView />} />

              {/* 3. Dota 2 AI Prompt Generator */}
              <Route path="/prompt-forge" element={<PromptForgeView />} />

              {/* 4. Saved Roster & Prompts */}
              <Route path="/favorites" element={<FavoritesView />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Submission / Git Guide Modal */}
          <ReadmeModal />

          {/* Global Footer */}
          <Footer />
        </div>
      </DotaProvider>
    </BrowserRouter>
  );
}
