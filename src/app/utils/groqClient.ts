import Groq from 'groq-sdk';
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function getGroqResponse(message: string): Promise<string> {
  const messages: ChatMessage[] = [
    { role: "system", content: "You are an academic expert..." },
    { role: "user", content: message },
  ];

  try {
    const response = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
      messages,
    });

    if (!response || !response.choices || response.choices.length === 0) {
      throw new Error(`Invalid response from Groq API: ${JSON.stringify(response)}`);
    }

    return response.choices[0]?.message.content || "No content received.";
  } catch (error) {
    console.error("Error while calling Groq API:", error);
    throw new Error("Failed to fetch Groq API response");
  }
}


