const express = require("express");
const { getLLMReply } = require("../services/llmService");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Use POST /chat with JSON body" });
});

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "message is required and must be a string"
      });
    }

    const reply = await getLLMReply(message);

    return res.json({ reply });
  } catch (error) {
    console.error("Chat route error:");
    console.error("message:", error.message);

    return res.status(500).json({
      error: "Failed to get chatbot response",
      details: error.message
    });
  }
});

module.exports = router;