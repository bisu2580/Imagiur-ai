import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import { db } from "../config/firebaseAdmin.js";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

router.post("/generate-text", verifyToken, async (req, res) => {
  console.log("--- New Request Started ---");
  const { history, prompt, chatId } = req.body;
  const { uid } = req.user;

  console.log("Request Body:", {
    chatId,
    prompt,
    historyLength: history?.length,
  });
  console.log("User UID:", uid);

  if (!prompt || !prompt.content) {
    console.error("Validation Failed: Prompt content missing");
    return res.status(400).send({ error: "Prompt content is required" });
  }

  // Gemini expects roles: "user" and "model"
  const formattedHistory = history.map((msg) => ({
    role: msg.role === "ai" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  console.log(
    "Formatted History for Gemini:",
    JSON.stringify(formattedHistory, null, 2),
  );

  try {
    console.log("Initializing Gemini Chat...");
    const chat = model.startChat({ history: formattedHistory });

    console.log("Sending message to Gemini:", prompt.content);
    const result = await chat.sendMessage(prompt.content);

    const response = result.response;
    const text = response.text();
    console.log("Gemini Response received:", text.substring(0, 50) + "...");

    const updatedConversation = [
      ...history,
      prompt,
      { role: "ai", content: text },
    ];

    let currentChatId = chatId;
    if (currentChatId) {
      console.log("Updating existing chat:", currentChatId);
      const chatRef = db.collection("chats").doc(currentChatId);
      await chatRef.update({ messages: updatedConversation });
    } else {
      console.log("Creating new chat document...");
      const chatRef = await db.collection("chats").add({
        userId: uid,
        createdAt: new Date(),
        messages: updatedConversation,
      });
      currentChatId = chatRef.id;
      console.log("New chat created with ID:", currentChatId);
    }

    console.log("Request successful, sending response back to client.");
    res.send({ role: "ai", content: text, chatId: currentChatId });
  } catch (err) {
    // This will print the actual Gemini error (e.g., "Blocked by safety", "Invalid role")
    console.error("CRITICAL ERROR in /generate-text:", err.message);

    if (err.message.includes("429") || err.message.includes("quota")) {
      return res.status(429).send({
        error:
          "AI Quota exceeded. Please try again in a few minutes or switch models.",
      });
    }

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
