
import { GoogleGenAI, Type } from "@google/genai";

// Always use the process.env.API_KEY directly for initialization.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async analyzeNiche(keyword: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following POD niche/keyword: "${keyword}". Return metrics for POD sellers including volume (estimated monthly), competition, intent, and long-tail suggestions.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            mainMetric: {
              type: Type.OBJECT,
              properties: {
                volume: { type: Type.NUMBER },
                competition: { type: Type.STRING },
                intent: { type: Type.STRING },
                score: { type: Type.NUMBER }
              },
              required: ["volume", "competition", "intent", "score"]
            },
            longTail: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  keyword: { type: Type.STRING },
                  volume: { type: Type.NUMBER },
                  competition: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });
    // The response.text property directly returns the string output.
    return JSON.parse(response.text);
  },

  async generateDesignIdeas(niche: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate 5 creative design concepts for the POD niche: "${niche}". Include funny, emotional, minimal, and trend-based variations.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              concept: { type: Type.STRING },
              slogan: { type: Type.STRING },
              targetAudience: { type: Type.STRING },
              saturation: { type: Type.NUMBER }
            }
          }
        }
      }
    });
    return JSON.parse(response.text);
  },

  async generateListing(niche: string, platform: string, tone: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate an SEO-optimized product listing for a ${platform} product in the ${niche} niche. Tone should be ${tone}.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            tags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text);
  },

  async getTrends() {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Identify 6 current viral POD trends, rising phrases, or cultural moments that are currently active in late 2024 / early 2025.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              phrase: { type: Type.STRING },
              source: { type: Type.STRING },
              velocity: { type: Type.STRING },
              category: { type: Type.STRING }
            }
          }
        }
      }
    });
    return JSON.parse(response.text);
  }
};
