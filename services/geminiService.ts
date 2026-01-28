
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeKeywordIntelligence = async (keyword: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze the Etsy search term "${keyword}". Provide estimated volume, difficulty (0-100), buyer intent, seasonality data (12 months), and related long-tail keywords.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          volume: { type: Type.NUMBER },
          difficulty: { type: Type.NUMBER },
          intent: { type: Type.STRING },
          seasonality: { type: Type.ARRAY, items: { type: Type.NUMBER } },
          clusters: { type: Type.ARRAY, items: { type: Type.STRING } },
          longTails: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["volume", "difficulty", "intent", "seasonality", "clusters", "longTails"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const generateListingOptimization = async (productInfo: string, tone: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate an SEO-optimized Etsy listing for: "${productInfo}". Tone: ${tone}. Include a title (max 140 chars), 13 high-performing tags, and a conversion-focused description.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } },
          description: { type: Type.STRING },
          seoScore: { type: Type.NUMBER }
        },
        required: ["title", "tags", "description", "seoScore"]
      }
    }
  });
  return JSON.parse(response.text);
};

export const reverseEngineerListing = async (url: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Simulate reverse analysis for the Etsy listing at: "${url}". Extract simulated title, tags, and find SEO gaps or "Steal-Smart" opportunities.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          tags: { type: Type.ARRAY, items: { type: Type.STRING } },
          gaps: { type: Type.ARRAY, items: { type: Type.STRING } },
          weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ["title", "tags", "gaps", "weaknesses"]
      }
    }
  });
  return JSON.parse(response.text);
};
