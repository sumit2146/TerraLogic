# 🌍 TerraLogic

### **AI-Powered Geospatial Intelligence & Visual Analysis Platform**

TerraLogic is a high-performance, multimodal intelligence platform that decodes geographic locations from visual data. By leveraging the **Google Gemini 3 Flash** model, it analyzes landscape, architecture, vegetation, and infrastructure signals to pinpoint real-world coordinates and generate tactical terrain insights.

---

## ⚡ Key Features

*   **Multimodal Geolocation:** Instant coordinate estimation from building styles, flora, road signage, and terrain profiles.
*   **Tactical Terrain Analysis:** Detailed breakdowns of elevation, topography, and geographic features.
*   **Hyper-Local Micro-Itineraries:** Generates automated 3-step, 2-hour itineraries starting from the identified location.
*   **Interactive Satellite Visualizer:** Integrated Google Maps with high-resolution satellite imagery and custom animated markers.
*   **Dot-Matrix Global Backdrop:** Real-time Three.js 3D globe with animated logistics arcs and wireframe overlays.
*   **Futuristic UI/UX:** Dark-mode command-center aesthetic built with Tailwind CSS 4 and Framer Motion.

---

## 🛠️ Technical Stack

| Category | Technologies |
| :--- | :--- |
| **Frontend** | React 18, TypeScript, Vite 6 |
| **Styling** | Tailwind CSS 4, Framer Motion |
| **Intelligence** | Google Gemini API (`gemini-3-flash-preview`) |
| **Mapping** | Google Maps JavaScript API, `@vis.gl/react-google-maps` |
| **Graphics** | Three.js (React Three Fiber principles) |
| **Icons** | Lucide React |

---

## 🚀 Getting Started

### 1. Prerequisites
*   **Node.js** (v18.0.0 or higher)
*   **Google Gemini API Key** — [Get it here](https://aistudio.google.com/apikey)
*   **Google Maps API Key** — [Get it here](https://console.cloud.google.com/google/maps-apis/credentials) (Ensure **Maps JavaScript API** is enabled)

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/sumit2146/TerraLogic.git
cd TerraLogic

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY="your_gemini_api_key_here"
GOOGLE_MAPS_PLATFORM_KEY="your_google_maps_key_here"
```

### 4. Launch Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

---

## 🧬 Architecture & Logic

TerraLogic operates on a deterministic pipeline for visual processing:

1.  **Ingestion:** Images are processed via the `UploadZone` and converted to Base64 strings.
2.  **Analysis:** Data is dispatched to Gemini with a structured prompt focusing on five key vectors:
    *   **Landmarks:** Identifying peaks, monuments, or distinct urban patterns.
    *   **Vegetation:** Biome-specific plant life and agricultural indicators.
    *   **Infrastructure:** Power grids, road markings, and regional architectural signatures.
    *   **Climatology:** Lighting angles and atmospheric conditions.
3.  **Synthesis:** The model returns a structured JSON object (enforced by schema) containing coordinates, reasoning, and local data.
4.  **Visualization:** The UI synchronizes the 3D globe, the 2D satellite map, and the analysis panel in real-time.

---

## 📂 Directory Structure

```text
src/
├── components/          # UI modules (Map, AnalysisPanel, UploadZone, etc.)
├── lib/                 # Core logic (Gemini API integration, utils)
├── App.tsx              # Main application controller & state management
├── index.css            # Tailwind 4 global styles & design tokens
└── main.tsx             # Application entry point
```

---

## 🔮 Roadmap

- [ ] **Batch Analysis:** Upload multiple images to triangulate location more accurately.
- [ ] **Historical Comparison:** Compare current imagery with historical satellite data.
- [ ] **Offline Mode:** Local caching of previously analyzed locations.
- [ ] **Mobile Integration:** Specialized PWA views for field use.

---

## ⚖️ License

This project is for educational and prototyping purposes. Refer to the respective API licenses for [Google Gemini](https://ai.google.dev/terms) and [Google Maps Platform](https://cloud.google.com/maps-platform/terms).

---

**Developed for the next generation of geospatial exploration.**
