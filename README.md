# TerraLogic

**AI-powered geospatial intelligence platform.** Upload any image and TerraLogic uses multimodal AI to estimate its real-world location by analyzing landmarks, vegetation, architecture, infrastructure, and climate signals — then visualizes the result on an interactive satellite map.

---

## ✨ Features

- **Multimodal Geolocation** — Identifies coordinates from visual clues like building styles, vegetation biomes, road signage, and terrain profiles.
- **Terrain Analysis** — Returns elevation data, topography descriptions, and notable geographic features for the estimated location.
- **Tactical Route Itinerary** — Generates a 3-step, 2-hour hyper-local micro-itinerary starting from the pinpointed location.
- **Interactive Satellite Map** — Pinpoints the estimated location on Google Maps with pan, zoom, and satellite imagery.
- **3D Globe Visualizer** — A real-time Three.js dot-matrix globe with animated logistics arcs and wireframe overlays as the landing backdrop.
- **Drag & Drop Upload** — Futuristic upload zone with drag-and-drop, file picker, and animated loading states.
- **Export to Google Maps** — One-click deep-link to open the estimated coordinates directly in Google Maps.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 6](https://vite.dev/) |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |
| **3D Graphics** | [Three.js](https://threejs.org/) |
| **AI Model** | [Google Gemini API](https://ai.google.dev/) (`gemini-3-flash-preview`) |
| **Mapping** | [Google Maps Platform](https://developers.google.com/maps) via [`@vis.gl/react-google-maps`](https://github.com/visgl/react-google-maps) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Markdown** | [React Markdown](https://github.com/remarkjs/react-markdown) |

---

## 📁 Project Structure

```
TerraLogic/
├── index.html                    # Entry HTML
├── vite.config.ts                # Vite config (env injection, aliases, Tailwind plugin)
├── tsconfig.json                 # TypeScript configuration
├── package.json                  # Dependencies & scripts
├── .env.example                  # Environment variable template
├── .env                          # Your local API keys (git-ignored)
└── src/
    ├── main.tsx                  # React DOM entry point
    ├── App.tsx                   # Root component — state management, layout, routing
    ├── index.css                 # Global styles & design tokens
    ├── lib/
    │   ├── gemini.ts             # Gemini API integration & structured output schema
    │   └── utils.ts              # Shared utility functions
    └── components/
        ├── UploadZone.tsx        # Drag-and-drop image upload with animated states
        ├── AnalysisPanel.tsx     # Results display — location, terrain, itinerary, clues
        ├── Map.tsx               # Google Maps integration with advanced markers
        ├── GlobalBackground.tsx  # Three.js animated dot-matrix globe with arcs
        └── TerrainWireframe.tsx  # Animated SVG terrain wireframe overlay
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- A **Google Gemini API Key** — [Get one here](https://aistudio.google.com/apikey)
- A **Google Maps Platform API Key** (with *Maps JavaScript API* enabled) — [Get one here](https://console.cloud.google.com/google/maps-apis/credentials)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/sumit2146/TerraLogic.git
cd TerraLogic

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
```

Edit `.env` with your keys:

```env
GEMINI_API_KEY="your_gemini_api_key"
GOOGLE_MAPS_PLATFORM_KEY="your_google_maps_key"
```

### Running Locally

```bash
npm run dev
```

The app starts at **http://localhost:3000**.

### Other Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run lint` | Run TypeScript type checking |
| `npm run preview` | Preview the production build locally |

---

## ⚙️ How It Works

```
┌─────────────┐     Base64      ┌──────────────────┐     Structured JSON     ┌──────────────────┐
│  Image Drop  │ ──────────────► │  Gemini 3 Flash  │ ──────────────────────► │  Results Panel   │
│  (UploadZone)│                 │  (Multimodal AI) │                         │  + Google Maps   │
└─────────────┘                 └──────────────────┘                         └──────────────────┘
```

1. **Upload** — User drops or selects an image via the `UploadZone` component.
2. **Encode** — The image is converted to a Base64 data string on the client.
3. **Analyze** — The Base64 image and a detailed analysis prompt are sent to the Gemini API with a structured JSON response schema.
4. **Parse** — The API returns location name, country, coordinates, confidence score, reasoning, visual clues, terrain analysis, and a micro-itinerary.
5. **Visualize** — Results render in the `AnalysisPanel`, and the coordinates are pinpointed on a Google Maps satellite view with an animated marker.

### AI Prompt Strategy

The Gemini prompt instructs the model to examine:

- **Landmarks** — Mountains, buildings, monuments
- **Vegetation** — Tree species, biome identification
- **Architecture** — Building styles, construction materials
- **Infrastructure** — License plates, road signs, power sockets, driving side
- **Climate** — Lighting conditions, cloud patterns, humidity

The response is enforced via a strict JSON schema (`responseSchema`) to guarantee consistent, parseable output.

---

## 🎨 Design

TerraLogic uses a dark, command-center aesthetic with:

- **Color palette** — Deep blacks (`#050505`, `#080808`) with emerald-500 (`#10b981`) accents
- **Typography** — Monospace labels and tight-tracking uppercase headings
- **Glassmorphism** — Semi-transparent panels with subtle borders and backdrop blur
- **Micro-animations** — Framer Motion page transitions, loading spinners, and hover effects
- **3D Globe** — A dot-matrix Earth rendered with Three.js featuring animated logistics arcs and a wireframe sphere

---

## 📝 License

This project is for educational and prototyping purposes. Refer to the respective API licenses for [Google Gemini](https://ai.google.dev/terms) and [Google Maps Platform](https://cloud.google.com/maps-platform/terms).
