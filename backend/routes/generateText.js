import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { db } from "../config/firebaseAdmin.js";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

router.post("/generate-text", verifyToken, async (req, res) => {
  const { history, prompt, chatId } = req.body;
  const { uid } = req.user;
  if (!prompt) {
    return res.status(400).send({ error: "Prompt is required" });
  }
  const formattedHistory = history.map((msg) => ({
    role: msg.role === "ai" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));
  try {
    const chat = model.startChat({ history: formattedHistory });
    const result = await chat.sendMessage(prompt.content);
    const response = result.response;
    const text = response.text();

    const updatedConversation = [
      ...history,
      prompt,
      { role: "ai", content: text },
    ];

    let currentChatId = chatId;
    if (currentChatId) {
      const chatRef = db.collection("chats").doc(currentChatId);
      await chatRef.update({ messages: updatedConversation });
    } else {
      const chatRef = await db.collection("chats").add({
        userId: uid,
        createdAt: new Date(),
        messages: updatedConversation,
      });
      currentChatId = chatRef.id;
    }
    res.send({ role: "ai", content: text, chatId: currentChatId });
  } catch (err) {
    console.error("Error generating content:", err.message);
    res.status(500).send({ error: "Failed to generate content" });
  }
});

router.get("/recent-chats", verifyToken, async (req, res) => {
  const { uid } = req.user;
  try {
    const chatsSnapshot = await db
      .collection("chats")
      .where("userId", "==", uid)
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();
    const chats = chatsSnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().messages[0]?.content || "New Chat",
    }));
    res.status(200).send(chats);
  } catch (error) {
    console.error("Error fetching recent chats:", error);
    res.status(500).send({ error: "Failed to fetch recent chats." });
  }
});

router.get("/chat/:chatId", verifyToken, async (req, res) => {
  const { uid } = req.user;
  const { chatId } = req.params;
  try {
    const chatRef = db.collection("chats").doc(chatId);
    const doc = await chatRef.get();

    if (!doc.exists || doc.data().userId !== uid) {
      return res.status(404).send({ error: "Chat not found or access denied" });
    }
    res.status(200).send({
      id: doc.id,
      messages: doc.data().messages,
    });
  } catch (error) {
    console.error("Error fetching chat history: ", error);
    res.status(500).send({ error: "Failed to fetch chat history" });
  }
});

router.post("/generate-bio", verifyToken, async (req, res) => {
  const { prompt } = req.body;
  const { uid } = req.user;

  if (!prompt) {
    return res.status(400).send({ error: "Prompt is required" });
  }
  try {
    const chat = model.startChat({ prompt });
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const generatedBio = response.text();

    if (!generatedBio) {
      return res.status(500).send({ error: "Failed to generate bio" });
    }

    const userRef = db.collection("users").doc(uid);
    await userRef.update({ bio: generatedBio });

    res.send({ generatedBio });
  } catch (err) {
    console.error("Error generating bio:", err.message);
    res.status(500).send({ error: "Failed to generate bio" });
  }
});

export default router;
