
import { GoogleGenAI, Type } from "@google/genai";

export const generateEventStrategy = async (eventType: string, city: string, budget: number, vision: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Plan a ${eventType} in ${city}, India with a budget of ₹${budget}. User Vision: "${vision}". 
      Return: 
      1. A checklist of tasks.
      2. Budget optimization (suggested ₹ amount for Venue, Catering, Decor, Photo, Entertainment).
      3. Risk Analysis (3-4 risks based on date/location/event-type and backup plans).
      4. Smart tips based on the vision.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            checklist: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  task: { type: Type.STRING },
                  category: { type: Type.STRING },
                  priority: { type: Type.STRING },
                  timeline: { type: Type.STRING }
                },
                required: ["task", "category", "priority", "timeline"]
              }
            },
            budgetAllocation: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  amount: { type: Type.NUMBER },
                  label: { type: Type.STRING }
                },
                required: ["category", "amount", "label"]
              }
            },
            risks: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  risk: { type: Type.STRING },
                  impact: { type: Type.STRING },
                  backupStrategy: { type: Type.STRING },
                  likelihood: { type: Type.STRING }
                },
                required: ["risk", "impact", "backupStrategy", "likelihood"]
              }
            },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["checklist", "budgetAllocation", "risks", "tips"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Strategy Error:", error);
    return null;
  }
};

export const getAIAdvice = async (context: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Context: ${context}. As an expert event AI for PlanMyEvent, provide a very concise, professional 2-sentence piece of advice or solution.`,
    });
    return response.text;
  } catch (error) {
    return "I'm currently analyzing that. Please try again in a moment.";
  }
};

export const getTaskHelper = async (task: string, city: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Task: ${task}. City: ${city}. Give me 3 bullet points of "Expert Secrets" for completing this specific task perfectly in this city.`,
    });
    return response.text;
  } catch (error) {
    return "Focus on verified vendors and early booking for the best results.";
  }
};

export const getPricingRecommendation = async (leads: number, revenue: number, currentMultiplier: number) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze vendor performance: Monthly Leads: ${leads}, Revenue: ₹${revenue}, Current Multiplier: ${currentMultiplier}x.
      Provide a dynamic pricing recommendation.
      Return JSON: { "suggestedMultiplier": number, "explanation": string, "peakDateStrategy": string }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            suggestedMultiplier: { type: Type.NUMBER },
            explanation: { type: Type.STRING },
            peakDateStrategy: { type: Type.STRING }
          },
          required: ["suggestedMultiplier", "explanation", "peakDateStrategy"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Pricing AI Error:", error);
    return null;
  }
};
