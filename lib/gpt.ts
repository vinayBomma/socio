import OpenAI from "openai";
import Constants from "expo-constants";

const getGPTResponse = async (prompt: string) => {
  const openAIKey = Constants.expoConfig?.extra?.envKeys.OPEN_AI_KEY;
  const openai = new OpenAI({
    apiKey: openAIKey,
  });
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You need to give quirky and funny responses.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });
  return response.choices[0].message.content;
};

export default getGPTResponse;
