# AncientCodex: Dota 2 Hero Analytics & AI Prompt Hub

> **University Final Project Capstone Submission**  
> **Course:** Web Systems & Advanced Front-End Architecture  
> **Application Type:** Production-Ready Client-Side React Single-Page Application (SPA)

---

## 🏛️ Executive Summary

**AncientCodex** is an immersive, competitive Dota 2 analytics dashboard and generative AI prompt engineering suite. It integrates directly with the public **OpenDota REST API** and Valve's **Steam Cloudflare CDN** to provide real-time competitive statistics, role attributes, and win-rate analytics across all 127 Dota 2 heroes.

The platform bridges real-time esports data with LLM prompt engineering, allowing players, coaches, and content creators to dynamically synthesize:
1. **AI Coaching Playbooks** (Immortal-tier macro decision making & item timings)
2. **Draft Counter-Pick Strategies** (Hard counter synergies and ban priorities)
3. **Dark-Fantasy Hero Lore Narratives** (Atmospheric storytelling rooted in the Archronic Archives)
4. **Cinematic Midjourney / DALL-E Art Prompts** (Photorealistic character concept art)

All user roster bookmarks, AI prompt collections, and search histories are persisted in browser `localStorage`.

---

## 🚀 Live Demo & Quick Start

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (Tested on Node v24 LTS)
- **Package Manager**: npm v9+

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/ancientcodex-dota2-hub.git
cd ancientcodex-dota2-hub
npm install
```

### 3. Environment Variables Setup
Copy the example environment template:
```bash
cp .env.example .env
```
Contents of `.env.example`:
```env
# OpenDota API Key (Optional)
# Leave blank to use OpenDota's free public tier (60 calls/minute limit)
# If you possess an OpenDota premium tier key, provide it below:
VITE_OPENDOTA_API_KEY=
```

### 4. Running the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:5173/` in your browser.

### 5. Building for Production
```bash
npm run build
npm run preview
```

---

## 🧭 Multi-View Routing Architecture (React Router)

The application implements client-side multi-view routing across **4 distinct routes**:

| Route | View Name | Primary Functionality |
|---|---|---|
| `/` | **Hero Armory** (Home) | Real-time hero dashboard, multi-attribute filter bar, role selector, sorting, pagination, search with persistent recent history chips. |
| `/hero/:id` | **Hero Codex Details** | In-depth breakdown of selected hero: STR/AGI/INT growth rates, base stats, combat & mobility metrics, Pro vs Turbo vs Pub win rates, bookmark button, and direct link to forge AI prompts. |
| `/prompt-forge` | **Dota 2 AI Prompt Generator** | Interactive prompt engineer where users select Hero (from API), Lane/Position, Playstyle, and 1 of 4 Prompt Archetypes. Supports copying and saving to collection. |
| `/favorites` | **Saved Codex Roster & Prompts** | Dual-tab roster view displaying user-bookmarked heroes and saved AI prompt templates stored in `localStorage` with copy and deletion controls. |

---

## ⚡ Technical Requirements Fulfillment

### 1. External REST API Integration
- **REST Endpoint**: Fetches hero dataset from `https://api.opendota.com/api/heroStats`.
- **API Key Configuration**: Reads `import.meta.env.VITE_OPENDOTA_API_KEY` and appends `?api_key=` parameter if present.
- **Steam CDN Integration**: Constructs portrait URLs via `https://cdn.cloudflare.steamstatic.com${hero.img}` with graceful `onError` fallback shields.
- **Asynchronous Fetching**: Implemented via `useEffect` with `async/await` and an `AbortController` timeout safeguard.
- **Skeleton Pulse Loader**: Custom `SkeletonGrid` component displaying 12 dark Dota slate skeleton cards while network responses are pending.
- **Explicit Error Handling & Simulator**: Dota-themed alert banner with Dire crimson glow, detailed error messaging, and a functional **"Retry Connection"** button.
- **Instructor Error Simulator**: Toggle switch in the header (`Simulate API Error`) allowing evaluators to simulate network failures on demand.

### 2. All 4 Required Interactive Features
1. **Search & Keyword Filter**:
   - Real-time search by localized hero name or roles (e.g., "Carry", "Support", "Invoker", "Axe").
   - Clickable **Recent Searches** chips saved in `localStorage` (`ancientcodex_recent_searches`) with individual removal and "Clear History".
2. **Category / Attribute Filtering & Sorting**:
   - Primary Attribute buttons: **All**, **STR** (Strength), **AGI** (Agility), **INT** (Intelligence), **UNI** (Universal).
   - Attack Type filter: **All**, **Melee**, **Ranged**.
   - Role filter: **Carry**, **Support**, **Nuker**, **Initiator**, **Disabler**, **Durable**, etc.
   - Sorting dropdown: Name (A-Z, Z-A), Win Rate (High to Low, Low to High), Pro Pick Count, Movement Speed, Base Strength.
   - One-click **"Reset All Filters"** action button.
3. **Pagination**:
   - 12 heroes per page grid display.
   - Previous/Next buttons, first/last page quick jump, smart ellipsis page numbers, and real-time results counter (`Showing 1-12 of 127 heroes`).
4. **Local Data Persistence (`localStorage`)**:
   - `ancientcodex_favorite_heroes`: Array of bookmarked hero IDs.
   - `ancientcodex_saved_prompts`: Array of generated AI prompt records.
   - `ancientcodex_recent_searches`: Array of unique user search terms.

---

## 🎨 Component Architecture & Design System

```text
src/
├── components/
│   ├── CardGrid.jsx         # Responsive hero grid & empty states
│   ├── ErrorState.jsx       # Dire crimson error banner with Retry button
│   ├── FilterBar.jsx        # Attribute buttons, attack type, role selector, sorting
│   ├── Footer.jsx           # University credits, OpenDota links, trademark disclaimer
│   ├── Header.jsx           # Global navigation, error simulator toggle, Git guide trigger
│   ├── HeroCard.jsx         # Hero portrait, win rate meter, role tags, favorite star
│   ├── Pagination.jsx       # 12-item pagination controls with smart range ellipsis
│   ├── ReadmeModal.jsx      # Embedded student project guide & Git branch reference
│   ├── SearchBar.jsx        # Real-time search with persistent recent chips
│   └── SkeletonGrid.jsx     # Pulsing dark Dota slate skeleton loading cards
├── constants/
│   └── dotaConstants.js     # CDN endpoints, attributes, roles, sorting, storage keys
├── context/
│   └── DotaContext.jsx      # Global React state for heroes, storage, and error simulator
├── services/
│   └── opendota.js          # REST API client with timeout, API key, & win rate logic
└── views/
    ├── FavoritesView.jsx    # /favorites (Dual-tab saved heroes and AI prompts)
    ├── HeroArmoryView.jsx   # / (Main dashboard with filters and pagination)
    ├── HeroDetailView.jsx   # /hero/:id (Comprehensive hero codex specs)
    └── PromptForgeView.jsx  # /prompt-forge (Generative AI prompt builder)
```

### Visual Palette:
- **Obsidian Dark Background**: `#0b0e14`
- **Slate Card Surfaces**: `#131722`
- **Card Borders & Hover**: `#232a3b` / `#2e374d`
- **Radiant Gold Accents**: `#e2b76b`
- **Dire Crimson Highlights**: `#ff4b4b`
- **Strength Red**: `#ec3d3d`
- **Agility Green**: `#2ecc71`
- **Intelligence Cyan**: `#00d2ff`
- **Universal Purple**: `#df53f3`

---

## 🌿 Git Feature Branch & Conventional Commits Guide

### Branch Workflow
- `main`: Production-ready release branch.
- `feature/api-fetch`: OpenDota REST integration, Steam CDN portrait loader, skeleton grid, error UI.
- `feature/search-bar`: Real-time keyword search, role filters, sorting, persistent recent search chips.
- `feature/favorites`: LocalStorage persistence for hero roster bookmarks and saved AI prompts.
- `feature/prompt-forge`: Interactive AI prompt generator engine with 4 prompt archetypes.
- `feature/hero-details`: Comprehensive `/hero/:id` codex view with base attributes and combat specs.

### Sample Conventional Commits
```bash
git checkout -b feature/api-fetch
git commit -m "feat(api): integrate OpenDota heroStats REST API with AbortController timeout"
git commit -m "feat(cdn): implement Steam Cloudflare CDN image resolver with fallback UI"

git checkout -b feature/search-bar
git commit -m "feat(search): add real-time hero filtering with localStorage recent searches"
git commit -m "feat(filter): implement attribute, attack type, and role multi-filtering"

git checkout -b feature/favorites
git commit -m "feat(storage): persist hero roster bookmarks and prompt history in localStorage"

git checkout -b feature/prompt-forge
git commit -m "feat(ai): build interactive prompt generator with coaching, counter-pick, lore, and art archetypes"
```

---

## 📜 Intellectual Property & Academic Integrity Notice
- **Course Submission**: Developed for University Web Systems Final Project Assessment.
- **Data Source**: Real-time stats powered by [OpenDota API](https://www.opendota.com).
- **Trademark Notice**: Dota 2, Dota logo, and hero portraits are registered trademarks of Valve Corporation. This project is built strictly for non-commercial educational purposes.
