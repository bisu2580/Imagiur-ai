import express from "express";
import admin from "firebase-admin";
import dotenv from "dotenv";
import generateText from "./routes/generateText.js";
import imageRoutes from "./routes/imageRoutes.js";
import signinRoute from "./routes/signinRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import summerizeRoutes from "./routes/summerizeRoute.js";
import { fileURLToPath } from "url";
import cors from "cors";
import path from "path";
dotenv.config();
const app = express();

const corsOptions = {
  origin: "https://imagiur-ai.vercel.app", // Your Frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.options('/*path', (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://imagiur-ai.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

app.use(cors());
app.use("/api/users", signinRoute);
app.use("/api/auth", authRoutes);
app.use("/api", summerizeRoutes);
app.use("/api", imageRoutes);
app.use("/api", generateText);
app.use("/api/payments", paymentRoutes);

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend 🚀" });
});
// app.all('*', (req, res) => {
//   res.redirect(301, 'https://imagiur-ai.vercel.app' + req.url);
// });

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const frontendDistPath = path.resolve(__dirname, "dist");

// app.use(express.static(frontendDistPath));

// app.get(/.*/, (req, res) => {
//   res.sendFile(path.join(frontendDistPath, "index.html"));
// });

// Replace your old app.all('*', ...) with this:
// app.all(/.*/, (req, res) => {
//   res.redirect(301, "https://imagiur-ai.vercel.app" + req.url);
// });
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});
export default app;
