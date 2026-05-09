const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const chatRoute = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Jarvice chatbot backend is running" });
});

app.use("/chat", chatRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});