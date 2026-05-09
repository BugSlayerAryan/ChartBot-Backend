const Groq = require("groq-sdk");

async function getLLMReply(userMessage) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new Error("Missing GROQ_API_KEY in environment variables");
  }

  const groq = new Groq({
    apiKey,
  });

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are Jarvice, a helpful chatbot. Reply clearly, briefly, and in a friendly way.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply) {
      throw new Error("Empty response from Groq API");
    }

    return reply;
  } catch (error) {
    console.error("Groq service error:");
    console.error("message:", error.message);
    throw error;
  }
}

module.exports = { getLLMReply };