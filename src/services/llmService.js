const { GoogleGenAI } = require("@google/genai");

async function getLLMReply(userMessage) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GEMINI_API_KEY in environment variables");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are a helpful chatbot.
Reply clearly, briefly, and in a friendly way.

User: ${userMessage}
      `
    });

    const reply = response.text;

    if (!reply) {
      throw new Error("Empty response from Gemini API");
    }

    return reply;
  } catch (error) {
    console.error("Gemini service error:");
    console.error("message:", error.message);
    throw error;
  }
}

module.exports = { getLLMReply };