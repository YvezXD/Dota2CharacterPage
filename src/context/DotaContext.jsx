import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchHeroStats } from '../services/opendota';
import { STORAGE_KEYS } from '../constants/dotaConstants';

const DotaContext = createContext(null);

export function DotaProvider({ children }) {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [simulateError, setSimulateError] = useState(false);
  const [isReadmeOpen, setIsReadmeOpen] = useState(false);

  // Local Storage: Favorite Hero IDs
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Local Storage: Saved AI Prompts
  const [savedPrompts, setSavedPrompts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SAVED_PROMPTS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Local Storage: Recent Searches
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
      return stored ? JSON.parse(stored) : ['Anti-Mage', 'Carry', 'Invoker', 'Axe'];
    } catch {
      return ['Anti-Mage', 'Carry', 'Invoker', 'Axe'];
    }
  });

  // Persist Favorites
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.warn('Failed to save favorites to localStorage', e);
    }
  }, [favorites]);

  // Persist Saved Prompts
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_PROMPTS, JSON.stringify(savedPrompts));
    } catch (e) {
      console.warn('Failed to save prompts to localStorage', e);
    }
  }, [savedPrompts]);

  // Persist Recent Searches
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(recentSearches));
    } catch (e) {
      console.warn('Failed to save recent searches to localStorage', e);
    }
  }, [recentSearches]);

  // Fetch Hero Data
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

  // Initial load with useEffect
  useEffect(() => {
    loadHeroes(simulateError);
  }, [simulateError, loadHeroes]);

  // Toggle simulate error state
  const handleToggleSimulateError = () => {
    const nextState = !simulateError;
    setSimulateError(nextState);
  };

  // Favorites helpers
  const toggleFavorite = (heroId) => {
    setFavorites((prev) =>
      prev.includes(heroId) ? prev.filter((id) => id !== heroId) : [...prev, heroId]
    );
  };

  const isFavorite = (heroId) => favorites.includes(heroId);

  // Prompts helpers
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

  // Recent Searches helpers
  const addRecentSearch = (term) => {
    if (!term || !term.trim()) return;
    const cleanTerm = term.trim();
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== cleanTerm.toLowerCase());
      return [cleanTerm, ...filtered].slice(0, 8); // Keep top 8 recent
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
