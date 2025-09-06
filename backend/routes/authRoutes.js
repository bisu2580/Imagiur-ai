import express from "express";
import { db } from "../config/firebaseAdmin.js";
import verifyToken from "../middleware/verifyToken.js";
const router = express.Router();

router.post("/verify-email", verifyToken, async (req, res) => {
  const { uid, email, name, picture, email_verified } = req.user;
  const { displayName = "New User", photoURL = "" } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ error: "User ID and Email are required." });
  }

  if (!email_verified) {
    return res.status(400).json({ error: "Email not verified yet." });
  }

  try {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      await userRef.set({
        fullname: displayName || name,
        email,
        imageUrl: photoURL,
        credits: 10,
        plan: "Free",
        createdAt: new Date(),
      });

      return res.status(201).json({
        success: true,
        message: `Welcome, ${
          displayName || name || "New User"
        }! Your account has been created.`,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: `Welcome back, ${userDoc.data().fullname || "User"}!`,
      });
    }
  } catch (error) {
    console.error("Error processing user sign-in:", error);
    return res.status(500).json({ error: "Failed to process user." });
  }
});

export default router;
