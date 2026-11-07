/**
 * ==============================================================================
 * GLOBAL DOTA CONTEXT & STATE PROVIDER (src/context/DotaContext.jsx)
 * ==============================================================================
 * WHAT THIS FILE DOES:
 * Manages shared application state so any component can access:
 * 1. `heroes` - The list of 127 Dota 2 heroes fetched from OpenDota API.
 * 2. `loading` & `error` - Network loading spinner and error states.
 * 3. `favorites` - Bookmarked hero IDs saved in browser `localStorage`.
 * 4. `savedPrompts` - Custom AI prompts saved in browser `localStorage`.
 * 5. `recentSearches` - Clickable recent search terms saved in `localStorage`.
 *
 * HOW TO USE IN ANY COMPONENT:
 * import { useDota } from '../context/DotaContext';
 * const { heroes, favorites, toggleFavorite } = useDota();
 * ==============================================================================
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchHeroStats } from '../services/opendota';
import { STORAGE_KEYS } from '../constants/dotaConstants';
import { APP_CONFIG } from '../config/appConfig';

const DotaContext = createContext(null);

export function DotaProvider({ children }) {
  // ---------------------------------------------------------------------------
  // 1. API & UI STATES
  // ---------------------------------------------------------------------------
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [simulateError, setSimulateError] = useState(false);
  const [isReadmeOpen, setIsReadmeOpen] = useState(false);

  // ---------------------------------------------------------------------------
  // 2. LOCALSTORAGE STATE: FAVORITE HEROES
  // ---------------------------------------------------------------------------
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // ---------------------------------------------------------------------------
  // 3. LOCALSTORAGE STATE: SAVED AI PROMPTS
  // ---------------------------------------------------------------------------
  const [savedPrompts, setSavedPrompts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SAVED_PROMPTS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // ---------------------------------------------------------------------------
  // 4. LOCALSTORAGE STATE: RECENT SEARCHES
  // ---------------------------------------------------------------------------
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
      return stored ? JSON.parse(stored) : APP_CONFIG.defaultSearchSuggestions;
    } catch {
      return APP_CONFIG.defaultSearchSuggestions;
    }
  });

  // ---------------------------------------------------------------------------
  // 5. AUTOMATICALLY SYNC STATES TO LOCALSTORAGE WHENEVER THEY CHANGE
  // ---------------------------------------------------------------------------
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_PROMPTS, JSON.stringify(savedPrompts));
    } catch (e) {
      console.warn('Failed to save prompts to localStorage', e);
    }
  }, [savedPrompts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(recentSearches));
    } catch (e) {
      console.warn('Failed to save recent searches to localStorage', e);
    }
  }, [recentSearches]);

  // ---------------------------------------------------------------------------
  // 6. FETCH HERO DATA FROM OPENDOTA REST API
  // ---------------------------------------------------------------------------
  const loadHeroes = useCallback(async (forceSimulate = simulateError) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchHeroStats(forceSimulate);
      setHeroes(data);
    } catch (err) {
      setError(err.message || 'Failed to communicate with OpenDota API.');
    } finally {
      setLoading(false);
    }
  }, [simulateError]);

  useEffect(() => {
    loadHeroes(simulateError);
  }, [simulateError, loadHeroes]);

  // Toggle the "Simulate API Error" button in the Header
  const handleToggleSimulateError = () => {
    setSimulateError((prev) => !prev);
  };

  // ---------------------------------------------------------------------------
  // 7. HELPER FUNCTIONS FOR FAVORITES, PROMPTS, AND SEARCH HISTORY
  // ---------------------------------------------------------------------------
  const toggleFavorite = (heroId) => {
    setFavorites((prev) =>
      prev.includes(heroId) ? prev.filter((id) => id !== heroId) : [...prev, heroId]
    );
  };

  const isFavorite = (heroId) => favorites.includes(heroId);

  const savePrompt = (promptItem) => {
    const newEntry = {
      id: `prompt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
      ...promptItem,
    };
    setSavedPrompts((prev) => [newEntry, ...prev]);
    return newEntry;
  };

  const deletePrompt = (promptId) => {
    setSavedPrompts((prev) => prev.filter((p) => p.id !== promptId));
  };

  const clearAllPrompts = () => {
    setSavedPrompts([]);
  };

  const addRecentSearch = (term) => {
    if (!term || !term.trim()) return;
    const cleanTerm = term.trim();
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== cleanTerm.toLowerCase());
      return [cleanTerm, ...filtered].slice(0, 8); // Keep up to 8 recent searches
    });
  };

  const removeRecentSearch = (term) => {
    setRecentSearches((prev) => prev.filter((s) => s.toLowerCase() !== term.toLowerCase()));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const value = {
    heroes,
    loading,
    error,
    simulateError,
    setSimulateError,
    toggleSimulateError: handleToggleSimulateError,
    loadHeroes,
    favorites,
    toggleFavorite,
    isFavorite,
    savedPrompts,
    savePrompt,
    deletePrompt,
    clearAllPrompts,
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
    isReadmeOpen,
    setIsReadmeOpen,
  };

  return <DotaContext.Provider value={value}>{children}</DotaContext.Provider>;
}

export function useDota() {
  const context = useContext(DotaContext);
  if (!context) {
    throw new Error('useDota must be used within a DotaProvider');
  }
  return context;
}
