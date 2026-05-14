import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ItineraryStep {
  time: string;
  activity: string;
  description: string;
}

export interface GeolocationResult {
  locationName: string;
  country: string;
  latitude: number;
  longitude: number;
  confidence: number;
  reasoning: string;
  visualClues: string[];
  terrainAnalysis: {
    elevation: string;
    topography: string;
    features: string[];
  };
  itinerary: ItineraryStep[];
}

export async function estimateLocation(imageBase64: string, mimeType: string): Promise<GeolocationResult> {
  const prompt = `Analyze this image to determine its geographic location and surrounding environment. 
  Look for:
  - Landmarks (mountains, buildings, monuments)
  - Vegetation (tree species, biome)
  - Architecture (building styles, materials)
  - Infrastructure (license plates, road signs, power sockets, side of the road)
  - Climate/Weather (lighting, clouds, humidity)
  
  Additionally:
  1. Describe the terrain/topography in detail (elevations, slopes, landforms).
  2. Create a 3-step, 2-hour "Hyper-Local Micro-Itinerary" starting from this exact spot.
  
  Provide your best estimate of the coordinates and name of the place. 
  Be specific. If you are unsure, provide your best reasoned guess based on the evidence.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview", 
    contents: {
      parts: [
        { inlineData: { data: imageBase64, mimeType } },
        { text: prompt }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          locationName: { type: Type.STRING },
          country: { type: Type.STRING },
          latitude: { type: Type.NUMBER },
          longitude: { type: Type.NUMBER },
          confidence: { type: Type.NUMBER },
          reasoning: { type: Type.STRING },
          visualClues: { type: Type.ARRAY, items: { type: Type.STRING } },
          terrainAnalysis: {
            type: Type.OBJECT,
            properties: {
              elevation: { type: Type.STRING },
              topography: { type: Type.STRING },
              features: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["elevation", "topography", "features"]
          },
          itinerary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING, description: "e.g., '0-30 mins'" },
                activity: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["time", "activity", "description"]
            }
          }
        },
        required: ["locationName", "country", "latitude", "longitude", "confidence", "reasoning", "visualClues", "terrainAnalysis", "itinerary"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    if (response.candidates?.[0]?.finishReason) {
      throw new Error(`Analysis halted: ${response.candidates[0].finishReason}. Try a clearer image.`);
    }
    throw new Error("Geospatial analysis failed. No visual data could be extracted.");
  }
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse Gemini response:", text);
    throw new Error("Could not analyze image location precisely. Try another image.");
  }
}
