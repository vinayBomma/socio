import { GoogleGenerativeAI } from "@google/generative-ai";
import Constants from "expo-constants";

const getGeminiResponse = async (prompt: string) => {
  const geminiKey = Constants.expoConfig?.extra?.envKeys.GEMINI_KEY;
  const genAI = new GoogleGenerativeAI(geminiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  return text;
};

export default getGeminiResponse;
