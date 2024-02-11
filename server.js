const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection string
const mongoURI = "mongodb+srv://vinodhini:vino9943@cluster0.zhrjjee.mongodb.net/";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// MongoDB schema and model definition
const chatSchema = new mongoose.Schema({
  messages: [
    {
      text: String,
      isUser: Boolean,
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

// API route to fetch chat history
app.get("/api/chat-history", async (req, res) => {
  try {
    const chatHistory = await Chat.find();
    res.json(chatHistory);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// API route to save chat history
app.post("/api/chat-history", async (req, res) => {
  console.log('VV::HI')
  try {
    const { messages } = req.body;

    // Create a new ChatHistory document
    const chat = new Chat({ messages });

    // Save the chat history to MongoDB
    await chat.save();

    res.status(200).json({ success: true, message: "Chat history saved successfully" });
  } catch (error) {
    console.error("Error saving chat history:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// API route to interact with your chatbot
app.post("/api/bot", async (req, res) => {
  const userQuestion = req.body.text;
  console.log('Test:', userQuestion);
  try {
    // Example: Fetching response from a chatbot service
    const response = {test:'Vino test', response:'Hlo user'};
    console.log('VV:', response);
    res.json({ text: 'Hlo user' });
  } catch (error) {
    console.error("Error fetching response:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
