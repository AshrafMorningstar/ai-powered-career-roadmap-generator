
import { GoogleGenAI } from "@google/genai";

const MODEL_NAME = 'gemini-3-pro-preview';

export const getGeminiResponse = async (prompt: string, history: { role: string, content: string }[] = []) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Convert history format if needed, but for simplicity we'll construct a rich prompt
    const systemInstruction = `
      You are a world-class Cloud Architect and DevOps Mentor. 
      Your goal is to help a motivated learner build a portfolio for cloud engineering roles.
      When explaining concepts, use the 'ELI5' (Explain Like I'm 5) approach followed by technical depth.
      Encourage best practices like Infrastructure as Code (IaC), Least Privilege Security, and High Availability.
      If asked about code, provide clear, documented snippets in Terraform, Python, or YAML (K8s).
    `;

    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: [
        { role: 'user', parts: [{ text: systemInstruction }] },
        ...history.map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        temperature: 0.7,
        topP: 0.95,
        thinkingConfig: { thinkingBudget: 4000 }
      }
    });

    return response.text || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to the AI Tutor. Please ensure your API key is valid and check your network connection.";
  }
};
