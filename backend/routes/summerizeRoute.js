import express from "express";
import dotenv from "dotenv";
import { YoutubeTranscript } from "youtube-transcript";
import { GoogleGenerativeAI } from "@google/generative-ai";
import verifyToken from "../middleware/verifyToken.js";

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-preview-09-2025",
});

const parseCaptionText = (text) => {
  if (!text) return "";
  return text
    .replace(/WEBVTT[\r\n]*/, "") // Remove WEBVTT header
    .replace(/Kind: captions[\r\n]*/, "") // Remove other VTT headers
    .replace(/Language: [a-z\-]+[\r\n]*/, "") // Remove language header
    .replace(
      /\d{2}:\d{2}:\d{2}\.\d{3} --> \d{2}:\d{2}:\d{2}\.\d{3}[\s\S]*?\n/g,
      ""
    ) // Remove timestamp lines
    .replace(/<[^>]+>/g, "") // Remove any other HTML-like tags (e.g., <b>, <i>)
    .replace(/[\r\n]+/g, " ") // Replace newlines with spaces
    .replace(/\s+/g, " ") // Condense multiple spaces
    .trim();
};

const getTranscriptFromApi = async (videoId, apiKey) => {
  try {
    // 1. Find available caption tracks
    const listUrl = `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`;
    const listResponse = await fetch(listUrl);
    const listData = await listResponse.json();

    if (!listData.items || listData.items.length === 0) {
      console.log(`No caption tracks found for video: ${videoId}`);
      return "No transcript available";
    }

    // 2. Find an English caption track (prefer 'en' or 'en-US')
    let trackId = "";
    const englishTrack = listData.items.find(
      (item) =>
        item.snippet.language === "en" || item.snippet.language === "en-US"
    );

    if (englishTrack) {
      trackId = englishTrack.id;
    } else {
      // Fallback: Just grab the first track available if no English one
      trackId = listData.items[0].id;
      console.log(
        `No English track found, falling back to: ${listData.items[0].snippet.language}`
      );
    }

    // 3. Download the caption track (format=tt gives VTT)
    const downloadUrl = `https://www.googleapis.com/youtube/v3/captions/${trackId}?tfmt=tt&key=${apiKey}`;
    const downloadResponse = await fetch(downloadUrl);

    if (!downloadResponse.ok) {
      console.error(
        `Failed to download caption track ${trackId}:`,
        downloadResponse.statusText
      );
      return "No transcript available";
    }

    const captionData = await downloadResponse.text();

    // 4. Parse the raw caption data
    const parsedText = parseCaptionText(captionData);
    if (parsedText.trim() === "") {
      console.log("Caption file was empty after parsing.");
      return "No transcript available";
    }

    return parsedText;
  } catch (err) {
    console.error("YouTube Data API error:", err.message);
    return "No transcript available";
  }
};

router.post("/summerize", verifyToken, async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL required" });

    let videoId = "";
    const urlObj = new URL(url);

    if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.slice(1);
    } else {
      videoId = urlObj.searchParams.get("v");
    }
    if (!videoId) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }
    const youtubeApiKey = process.env.YOUTUBE_API_KEY;
    if (!youtubeApiKey) {
      console.error("YOUTUBE_DATA_API_KEY is not set in .env");
      return res.status(500).json({ error: "YouTube API key not configured" });
    }
    let transcript = "";
    try {
      transcript = await YoutubeTranscript.fetchTranscript(videoId);
    } catch (err) {
      console.error("Transcript fetch error:", err.message || err);
      transcript = "No transcript available";
    }
    const schema = {
      type: "OBJECT",
      properties: {
        title: { type: "STRING" },
        summary: { type: "STRING" },
        bullet_points: {
          type: "ARRAY",
          items: { type: "STRING" },
        },
      },
      required: ["title", "summary", "bullet_points"],
    };
    const systemInstruction = `
      You are a video summarization expert.
      - Output ONLY strict JSON that follows the provided schema.
      - Do NOT output any natural language, explanations, or markdown.
      - The 'title' should be a concise, catchy title for the video.
      - The 'summary' should be a maximum 5-6 sentence overview.
      - If the transcript is 'No transcript available', infer the topic, set the summary to 'Transcript not available for this video.', and add 'Transcript not available' as a bullet point.
    `;
    const userPrompt = `Video ID: ${videoId}\nTranscript: ${transcript}`;
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      systemInstruction: {
        parts: [{ text: systemInstruction }],
      },
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });
    const output = result.response.text();

    const data = JSON.parse(output);
    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    res.json({
      title: data.title,
      transcript:transcript,
      summary: data.summary,
      bullet_points: data.bullet_points,
      thumbnail,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});
export default router;
