
import { GoogleGenAI } from "@google/genai";
import { Mood, Message } from "../types";
import { SYSTEM_INSTRUCTION } from "../constants";

export const generateComfortResponse = async (mood: Mood, text?: string): Promise<string> => {
  // Always use the API key directly from process.env.API_KEY
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    The user has selected the mood: "${mood}".
    ${text ? `They shared the following thoughts: "${text}"` : "They haven't shared specific words yet, just their mood."}
    
    Please provide a comforting, gentle response following your core instructions.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    // Directly access the .text property of GenerateContentResponse
    return response.text || "I'm here for you, even when words fail. Just know you're not alone.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I am here, breathing with you. My words might be shy right now, but my heart is open to whatever you're feeling.";
  }
};
