/**
 * ==============================================================================
 * HERO FILTERING & SORTING HELPER (src/utils/heroFilters.js)
 * ==============================================================================
 * WHAT THIS FILE DOES:
 * Takes the full list of 127 Dota 2 heroes and filters/sorts them based on the
 * user's active search keyword, attribute button, attack type, role, and sort dropdown.
 *
 * HOW TO EDIT FOR NOVICE DEVELOPERS:
 * - To add a new sort option: First add its name in `src/constants/dotaConstants.js`
 *   under `SORT_OPTIONS`, then add a matching `case` inside the `switch (selectedSort)`
 *   block below.
 * ==============================================================================
 */

export function filterAndSortHeroes(
  heroes,
  { searchQuery, selectedAttr, selectedAttackType, selectedRole, selectedSort }
) {
  if (!heroes || heroes.length === 0) return [];

  // Start with a fresh copy of the array so we don't mutate the original list
  let result = [...heroes];

  // ---------------------------------------------------------------------------
  // STEP 1: Filter by Search Keyword (Matches Hero Name OR Hero Role)
  // ---------------------------------------------------------------------------
  if (searchQuery && searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    result = result.filter(
      (hero) =>
        hero.localized_name?.toLowerCase().includes(query) ||
        hero.roles?.some((role) => role.toLowerCase().includes(query))
    );
  }

  // ---------------------------------------------------------------------------
  // STEP 2: Filter by Primary Attribute ('all', 'str', 'agi', 'int', 'all_attr')
  // ---------------------------------------------------------------------------
  if (selectedAttr && selectedAttr !== 'all') {
    if (selectedAttr === 'all_attr') {
      // 'all_attr' is our button ID for Universal heroes (which OpenDota calls 'all')
      result = result.filter((hero) => hero.primary_attr === 'all');
    } else {
      result = result.filter((hero) => hero.primary_attr === selectedAttr);
    }
  }

  // ---------------------------------------------------------------------------
  // STEP 3: Filter by Attack Type ('All', 'Melee', 'Ranged')
  // ---------------------------------------------------------------------------
  if (selectedAttackType && selectedAttackType !== 'All') {
    result = result.filter((hero) => hero.attack_type === selectedAttackType);
  }

  // ---------------------------------------------------------------------------
  // STEP 4: Filter by Role ('All', 'Carry', 'Support', 'Nuker', etc.)
  // ---------------------------------------------------------------------------
  if (selectedRole && selectedRole !== 'All') {
    result = result.filter((hero) => hero.roles?.includes(selectedRole));
  }

  // ---------------------------------------------------------------------------
  // STEP 5: Sort the Remaining Heroes
  // ---------------------------------------------------------------------------
  result.sort((a, b) => {
    switch (selectedSort) {
      case 'name_asc':
        return (a.localized_name || '').localeCompare(b.localized_name || '');
      case 'name_desc':
        return (b.localized_name || '').localeCompare(a.localized_name || '');
      case 'winrate_desc':
        return (b.pubWinRate || 0) - (a.pubWinRate || 0);
      case 'winrate_asc':
        return (a.pubWinRate || 0) - (b.pubWinRate || 0);
      case 'pro_pick_desc':
        return (b.pro_pick || 0) - (a.pro_pick || 0);
      case 'speed_desc':
        return (b.move_speed || 0) - (a.move_speed || 0);
      case 'str_desc':
        return (b.base_str || 0) - (a.base_str || 0);
      default:
        return 0;
    }
  });

  return result;
}
