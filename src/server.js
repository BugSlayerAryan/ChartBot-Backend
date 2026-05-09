const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const chatRoute = require("./routes/chat");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Gemini chatbot backend is running" });
});

app.use("/chat", chatRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});