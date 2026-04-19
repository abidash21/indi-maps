# India Map Visualization Platform — Local Tool

## Context

A local-only React web app to create Instagram-ready data-driven India maps. All 36 states/UTs are pre-loaded. The user edits values directly in the UI (no file upload — avoids spelling errors and storage complexity). Supports 3 map types. Exports a crisp 1080×1080 PNG.

Reference quality: https://iipmaps.com/

---

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Vite + React** | Zero-config local dev |
| Map rendering | **D3.js** | Best SVG projection + path drawing |
| Map data | **India TopoJSON** (DataMeet/udit-001) | Free, high-quality state boundaries |
| Styling | **Tailwind CSS** | Fast utility styling |
| PNG export | **SVG → Canvas API → PNG** | Pure client-side, no deps |

**Cost: $0** — all local, all open source.

---

## Architecture

```
src/
├── App.jsx                    # Root layout: sidebar + map canvas
├── components/
│   ├── MapCanvas.jsx          # D3 SVG India map renderer
│   ├── MapTypeSelector.jsx    # Pick which map type to create
│   ├── StateEditor.jsx        # Edit values for all 36 states/UTs
│   ├── Legend.jsx             # Auto-generated color legend
│   └── ExportButton.jsx       # PNG + SVG download
├── lib/
│   ├── colorScales.js         # Color interpolation logic per type
│   └── exportPng.js           # SVG → 1080x1080 PNG
└── data/
    ├── india-states.json      # India TopoJSON
    └── states.js              # Master list of 36 states/UTs with IDs
```

---

## The 3 Map Types

### Type 1 — Numeric Range (Choropleth)

Two sub-modes, same color logic:

**1a. Percentage (0–100%)**
- User enters a % for each state (e.g., literacy rate)
- Color: linear interpolation `white (0%) → dark green (100%)`

**1b. Absolute Number (population, budget, etc.)**
- User enters a raw number per state
- Normalization: `color_value = (state_value / max_value) * 100`
- Color: same white → dark green gradient applied to normalized value
- Max state automatically gets darkest green; min state gets white

Color scale (both): `d3.scaleSequential(d3.interpolateRgb("#ffffff", "#1a6b2a"))`

---

### Type 2 — Binary + Optional Others

- User defines **2 main categories** (e.g., NDA, UPA) each with a color
- Each state picks: Category A | Category B | Other
- "Other" states → white / light gray
- Examples:
  - NDA (orange) / UPA (blue) / Other (white)
  - Wheat (amber) / Rice (green) / Other (white)

UI: For each state → radio: `[A] [B] [Other]`

---

### Type 3 — Multiple Categories (3–6 options)

- User defines up to 6 categories, each with a name + color
- Each state is assigned exactly one category
- Example: New Year dates → April 15 (yellow), June 15 (purple), Sept 15 (pink), Feb 15 (green)

UI: For each state → dropdown or inline button group

---

## UI Layout

```
┌──────────────────────┬──────────────────────────────────────┐
│  SIDEBAR             │   MAP (square, fills remaining space) │
│                      │                                      │
│  Map Type:           │         [India SVG Map]              │
│  ○ Numeric Range     │                                      │
│  ○ Binary            │   (states colored in real-time)      │
│  ○ Multi-category    │                                      │
│                      │                                      │
│  Map Title: [____]   │                                      │
│                      │                                      │
│  ── State Values ──  │                                      │
│  Andhra Pradesh [__] │                                      │
│  Arunachal Pr.  [__] │                                      │
│  Assam          [__] │                                      │
│  Bihar          [__] │                                      │
│  ...all 36 states    │                                      │
│                      │                                      │
│  [Export PNG 1080px] │                                      │
│  [Export SVG]        │                                      │
└──────────────────────┴──────────────────────────────────────┘
```

Map updates **live** as the user edits any state value — no submit button.

---

## Implementation Phases

### Phase 1 — Project Setup
1. `npm create vite@latest indi-maps -- --template react`
2. Install: `d3`, `topojson-client`, `tailwindcss`
3. Download India state TopoJSON → `src/data/india-states.json`
4. Create `src/data/states.js` — master list of all 36 states with their TopoJSON feature IDs

### Phase 2 — India SVG Map
1. Load TopoJSON, convert to GeoJSON features with `topojson.feature()`
2. `d3.geoMercator()` projection fit to India bounds
3. Render each state as `<path>` with thin white stroke border
4. Accept a `stateColors` prop: `{ "Maharashtra": "#hex", ... }` → fill each path
5. Default: all states render as `#e8e8e8` (light gray)

### Phase 3 — Color Scales (`colorScales.js`)
```js
// Type 1a: percentage
percentageColor(value)  // 0–100 → white to dark green

// Type 1b: absolute number  
absoluteColor(value, allValues)  // normalizes by max, then percentageColor

// Type 2: binary
binaryColor(value, catA, colorA, catB, colorB)  // returns colorA, colorB, or "#f0f0f0"

// Type 3: multi-category
multiColor(value, categories)  // { name, color }[] lookup
```

### Phase 4 — Map Type Selector + State Editor
1. `MapTypeSelector.jsx` — 3 radio options, sets active type
2. `StateEditor.jsx` — renders the correct input per type:
   - Type 1: `<input type="number">` per state
   - Type 2: 3-button toggle per state (A / B / Other)
   - Type 3: dropdown per state (from user-defined categories)
3. Category definition UI for Type 2 & 3: name + color picker inputs at top of sidebar
4. All state values held in React state, passed to `MapCanvas` → live re-render

### Phase 5 — Legend + Title
1. `Legend.jsx` auto-generates from active type:
   - Type 1: gradient bar (white → dark green) with min/max labels
   - Type 2/3: colored swatches with category names
2. Title input → renders as text inside the SVG (part of the exported image)
3. Legend is embedded in the SVG so it's included in export

### Phase 6 — PNG Export
1. `exportPng.js`:
   - Serialize SVG to string
   - Draw to offscreen `<canvas>` at 1080×1080
   - `canvas.toBlob("image/png")` → trigger download
2. Also offer raw SVG download (for Figma/Illustrator editing)

---

## Master State List (`src/data/states.js`)

All 36 entries pre-loaded (28 states + 8 UTs). IDs must match the TopoJSON feature IDs exactly. This is the canonical list — no user input required for state names.

```js
export const STATES = [
  { id: "IN-AP", name: "Andhra Pradesh" },
  { id: "IN-AR", name: "Arunachal Pradesh" },
  // ... all 36
];
```

---

## Verification

1. `npm run dev` → `http://localhost:5173`
2. India map renders with all state borders at startup
3. Select "Numeric Range", enter values for 5–6 states → those states turn green (varying intensity), rest stay gray
4. Select "Binary", define NDA/UPA, assign states → map shows orange/blue/white
5. Export PNG → open downloaded file → 1080×1080, clean, Instagram-ready
