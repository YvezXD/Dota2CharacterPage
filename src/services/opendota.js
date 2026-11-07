import { STEAM_CDN_BASE } from '../constants/dotaConstants';

const BASE_URL = 'https://api.opendota.com/api/heroStats';

/**
 * Constructs the complete Steam CDN image URL for a Dota hero.
 * @param {string} path - Relative image path from OpenDota (e.g. /apps/dota2/images/dota_react/heroes/antimage.png?)
 * @returns {string} Fully qualified CDN image URL
 */
export function getHeroImageUrl(path) {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  return `${STEAM_CDN_BASE}${path}`;
}

/**
 * Calculates win rate percentage safely.
 * @param {number} wins
 * @param {number} picks
 * @returns {number} Win rate rounded to 1 decimal place
 */
export function calculateWinRate(wins, picks) {
  if (!picks || picks <= 0) return 0;
  return Number(((wins / picks) * 100).toFixed(1));
}

/**
 * Fetches Dota 2 hero statistics from OpenDota API.
 * Supports optional API key via Vite env variable and manual error simulation.
 * @param {boolean} simulateError - If true, throws an error to test the Error UI
 * @returns {Promise<Array>} Array of parsed hero stats
 */
export async function fetchHeroStats(simulateError = false) {
  if (simulateError) {
    // Artificial delay to simulate network attempt before failure
    await new Promise((resolve) => setTimeout(resolve, 600));
    throw new Error('Simulated OpenDota Network Error: Connection refused by Ancient ward sentinel (HTTP 503). Toggle off "Simulate API Error" to restore normal connection.');
  }

  const apiKey = import.meta.env.VITE_OPENDOTA_API_KEY;
  const url = apiKey ? `${BASE_URL}?api_key=${encodeURIComponent(apiKey)}` : BASE_URL;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`OpenDota API responded with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('OpenDota returned empty hero statistics dataset.');
    }

    // Enrich heroes with calculated win rates and normalized attributes
    return data.map((hero) => {
      const pubWinRate = calculateWinRate(hero.pub_win, hero.pub_pick);
      const proWinRate = calculateWinRate(hero.pro_win, hero.pro_pick);
      const turboWinRate = calculateWinRate(hero.turbo_wins, hero.turbo_picks);

      return {
        ...hero,
        pubWinRate,
        proWinRate,
        turboWinRate,
        avatarUrl: getHeroImageUrl(hero.img),
        iconUrl: getHeroImageUrl(hero.icon),
      };
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      throw new Error('OpenDota request timed out after 12 seconds. Please check your internet connection and retry.');
    }
    throw err;
  }
}
