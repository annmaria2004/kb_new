import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

export async function generateProductDetails(productName: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Provide a detailed description, benefits, and uses of ${productName}.`;

    const result = await model.generateContent(prompt);
    return result.response.text() || "No additional details available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to fetch AI-generated details.";
  }
}
