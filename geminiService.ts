import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";


// Initialize the GoogleGenAI client lazily to prevent startup crashes
let ai: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!ai) {
    const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY; // Support both naming conventions
    if (apiKey && apiKey !== 'PLACEHOLDER_API_KEY') {
      ai = new GoogleGenAI({ apiKey });
    }
  }
  return ai;
};

export const generateSocaResponse = async (userMessage: string, history: { role: string; content: string }[]) => {
  try {
    const client = getAiClient();

    if (!client) {
      console.error("Gemini API Key is missing or invalid.");
      return "ERROR_API_KEY_RESET";
    }

    // Calling generateContent with the gemini-3-flash-preview model and necessary configs
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    // Access the generated text directly via the .text property
    return response.text || "Mohon maaf, terjadi kendala saat memproses permintaan Bapak/Ibu.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error instanceof Error && error.message.includes("Requested entity was not found")) {
      return "ERROR_API_KEY_RESET";
    }
    return "Terjadi kesalahan sistem. Mohon coba lagi nanti.";
  }
};
