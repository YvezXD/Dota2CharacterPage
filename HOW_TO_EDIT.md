# 🛠️ Novice Developer Editing Guide (`HOW_TO_EDIT.md`)

Welcome! This project has been organized so that **even if you are brand new to React**, you can easily customize text, colors, hero filters, pagination, and AI prompts without getting lost.

---

## 🗺️ 1. Quick File Map (Where Everything Lives)

| What You Want to Change | Which File to Open |
| :--- | :--- |
| **App Name, Subtitle, Page Size (12 heroes), Default Search Chips** | [`src/config/appConfig.js`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/config/appConfig.js) |
| **Hero Attributes, Roles, Lanes, Playstyles, Sort Dropdown Options** | [`src/constants/dotaConstants.js`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/constants/dotaConstants.js) |
| **AI Prompt Text (Coaching, Counter-Pick, Lore, Midjourney Art)** | [`src/utils/promptTemplates.js`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/utils/promptTemplates.js) |
| **How Heroes Are Filtered or Sorted** | [`src/utils/heroFilters.js`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/utils/heroFilters.js) |
| **Colors, Backgrounds, Scrollbar, Card Hover Glow** | [`src/index.css`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/index.css) |
| **OpenDota API Fetch URL & Steam CDN Image Logic** | [`src/services/opendota.js`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/services/opendota.js) |
| **Top Navigation Bar & "Simulate API Error" Button** | [`src/components/Header.jsx`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/components/Header.jsx) |
| **Individual Hero Card Appearance** | [`src/components/HeroCard.jsx`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/components/HeroCard.jsx) |
| **Page 1: Hero Armory Dashboard (`/`)** | [`src/views/HeroArmoryView.jsx`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/views/HeroArmoryView.jsx) |
| **Page 2: Hero Codex Details (`/hero/:id`)** | [`src/views/HeroDetailView.jsx`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/views/HeroDetailView.jsx) |
| **Page 3: AI Prompt Forge (`/prompt-forge`)** | [`src/views/PromptForgeView.jsx`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/views/PromptForgeView.jsx) |
| **Page 4: Saved Favorites & Prompts (`/favorites`)** | [`src/views/FavoritesView.jsx`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/views/FavoritesView.jsx) |

---

## ✏️ 2. Step-by-Step Common Edits

### A. Change How Many Heroes Show Per Page
1. Open [`src/config/appConfig.js`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/config/appConfig.js).
2. Find `heroesPerPage: 12` and change `12` to `8`, `16`, or `24`.
3. Save the file—both the hero grid and loading skeleton automatically update!

### B. Edit or Add an AI Prompt Template
1. Open [`src/utils/promptTemplates.js`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/utils/promptTemplates.js).
2. Edit any text inside the backticks (`` `...` ``) under `case 'coaching':`, `case 'counterpick':`, `case 'lore':`, or `case 'art':`.
3. To add a **5th prompt button**:
   - First, add a new item to `PROMPT_TYPES` in [`src/constants/dotaConstants.js`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/constants/dotaConstants.js) (for example, `id: 'itembuild'`).
   - Second, add `case 'itembuild': return ...` inside [`src/utils/promptTemplates.js`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/utils/promptTemplates.js).

### C. Add a New Sorting Option
1. Open [`src/constants/dotaConstants.js`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/constants/dotaConstants.js) and add a new entry to `SORT_OPTIONS`:
   ```js
   { value: 'armor_desc', label: 'Base Armor (Highest First)' }
   ```
2. Open [`src/utils/heroFilters.js`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/utils/heroFilters.js) and add the matching `case` inside `switch (selectedSort)`:
   ```js
   case 'armor_desc':
     return (b.base_armor || 0) - (a.base_armor || 0);
   ```

### D. Change the Theme Colors
1. Open [`src/index.css`](file:///c:/Users/USer/OneDrive/Desktop/Repository/FinalsProject/src/index.css).
2. Edit the CSS variables at the top (`--color-obsidian`, `--color-radiant-gold`, `--color-dire-crimson`, etc.) or adjust the `.dota-card` hover border.

