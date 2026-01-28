
import { GoogleGenAI, Type } from "@google/genai";

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
      contents: `Generate an SEO-optimized product listing for a ${platform} product in the ${niche} niche. Tone: ${tone}. Include high-converting title, 5-paragraph description, and 13 tags.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["title", "description", "tags"]
        }
      }
    });
    return JSON.parse(response.text);
  },

  async analyzeDemand(product: string, niche: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze POD market demand for ${product} in the ${niche} niche. Provide price ranges, top platforms, and trending colors.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            demandScore: { type: Type.NUMBER },
            priceRange: { type: Type.STRING },
            bestColors: { type: Type.ARRAY, items: { type: Type.STRING } },
            topPlatform: { type: Type.STRING },
            competitionLevel: { type: Type.STRING }
          },
          required: ["demandScore", "priceRange", "bestColors", "topPlatform", "competitionLevel"]
        }
      }
    });
    return JSON.parse(response.text);
  },

  async checkSaturation(phrase: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Check market saturation for the POD slogan: "${phrase}". Assess risk of over-used designs and suggest 3 unique twists.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            saturationScore: { type: Type.NUMBER },
            riskLevel: { type: Type.STRING },
            uniqueTwists: { type: Type.ARRAY, items: { type: Type.STRING } },
            advice: { type: Type.STRING }
          },
          required: ["saturationScore", "riskLevel", "uniqueTwists", "advice"]
        }
      }
    });
    return JSON.parse(response.text);
  },

  async getTrends() {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Identify 6 current viral POD trends for 2025. Return as JSON.`,
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
  },

  async generateMockup(prompt: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `High resolution, professional studio photography of a person wearing a white t-shirt mockup with the design concept: ${prompt}. Clean background, cinematic lighting.` }]
      },
      config: {
        imageConfig: { aspectRatio: "1:1" }
      }
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  }
};
