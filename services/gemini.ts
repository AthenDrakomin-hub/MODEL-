
import { GoogleGenAI } from "@google/genai";

// Always use the named parameter and direct process.env.API_KEY as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIAdvice = async (userPrompt: string, products: any[]) => {
  const model = "gemini-3-flash-preview";
  
  const productContext = products.map(p => 
    `${p.model} (${p.color}): $${p.price}. Key features: ${p.features.join(', ')}`
  ).join('\n');

  const systemInstruction = `
    You are a Tesla specialized AI Sales Assistant for the new Model π. 
    Help users choose the right model based on their budget, color preference, and technical needs.
    The inventory plan is strict:
    - Pearl White ($299) is the budget-friendly entry.
    - Five colors ($359) are premium standard.
    - Black Silver Foldable AI Edition ($799) is the flagship.
    Be professional, visionary, and concise (Elon Musk-esque style: direct, engineering-focused, future-oriented).
    Current Catalog:
    ${productContext}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });
    // Use .text property instead of .text()
    return response.text || "I'm currently recalibrating my neural net. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "The Starlink connection is temporarily unavailable. Please try again shortly.";
  }
};
