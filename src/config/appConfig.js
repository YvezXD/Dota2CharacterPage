/**
 * ==============================================================================
 * ANCIENTCODEX - CENTRAL APPLICATION CONFIGURATION (src/config/appConfig.js)
 * ==============================================================================
 * WHAT THIS FILE DOES:
 * Acts as the central control panel for the entire application.
 *
 * HOW TO EDIT FOR NOVICE DEVELOPERS:
 * You can safely change any text, numbers, URLs, or default search chips below
 * without needing to dig into React components!
 * ==============================================================================
 */

export const APP_CONFIG = {
  // 1. Application Branding (Shown in Header, Footer, and Browser Title)
  appName: 'AncientCodex',
  appSubtitle: 'Dota 2 Hero Analytics & AI Prompt Hub',
  appVersion: '2.0',
  academicCourse: 'University Final Project Capstone',

  // 2. Pagination Settings (Change `heroesPerPage` to show 8, 12, 16, or 24 cards)
  pagination: {
    heroesPerPage: 12,
    maxVisiblePageButtons: 5,
  },

  // 3. Network & REST API Endpoints
  api: {
    openDotaBaseUrl: 'https://api.opendota.com/api/heroStats',
    steamCdnBaseUrl: 'https://cdn.cloudflare.steamstatic.com',
    requestTimeoutMs: 12000, // 12 seconds before showing timeout message
  },

  // 4. Default "Recent Searches" shown under the Search Bar on first visit
  defaultSearchSuggestions: [
    'Anti-Mage',
    'Carry',
    'Invoker',
    'Axe',
    'Support',
    'Juggernaut',
  ],

  // 5. Browser LocalStorage Keys (where bookmarks and prompts are saved)
  storageKeys: {
    favorites: 'ancientcodex_favorite_heroes',
    savedPrompts: 'ancientcodex_saved_prompts',
    recentSearches: 'ancientcodex_recent_searches',
  },

  // 6. Color Theme Reference (Dota 2 Aesthetic)
  themeColors: {
    backgroundObsidian: '#0b0e14',
    cardSlate: '#131722',
    radiantGold: '#e2b76b',
    direCrimson: '#ff4b4b',
    attributeStrength: '#ec3d3d',
    attributeAgility: '#2ecc71',
    attributeIntelligence: '#00d2ff',
    attributeUniversal: '#df53f3',
  },
};

export default APP_CONFIG;
