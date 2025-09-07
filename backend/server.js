import express from "express";
import admin from "firebase-admin";
import dotenv from "dotenv";
import generateText from "./routes/generateText.js";
import imageRoutes from "./routes/imageRoutes.js";
import signinRoute from "./routes/signinRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import { fileURLToPath } from "url";
import cors from "cors";
import path from "path";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", signinRoute);
app.use("/api/auth", authRoutes);
app.use("/api", imageRoutes);
app.use("/api", generateText);
app.use("/api/payments", paymentRoutes);

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend 🚀" });
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendDistPath = path.resolve(__dirname, "dist");

app.use(express.static(frontendDistPath));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(frontendDistPath, "index.html"));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
