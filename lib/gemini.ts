import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import Constants from "expo-constants";

const getGeminiResponse = async (prompt: string) => {
  const geminiKey = Constants.expoConfig?.extra?.envKeys.GEMINI_KEY;
  const genAI = new GoogleGenerativeAI(geminiKey);
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
    },
  ];
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    safetySettings,
    systemInstruction:
      "Give a short and humourous response. You can use a pop culture reference, but not every time. Suggest smart actionable steps to the user. Remind the user of the habit. Be positive. Never use slang. Don't mention the number of days every time.",
  });
  const result = await model.generateContent(prompt);
  const text = await result.response.text();
  return text;
};

export default getGeminiResponse;
