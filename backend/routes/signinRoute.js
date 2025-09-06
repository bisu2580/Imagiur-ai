import { db } from "../config/firebaseAdmin.js";
import verifyToken from "../middleware/verifyToken.js";
import express from "express";

const router = express.Router();

router.post("/signin", verifyToken, async (req, res) => {
  const { uid, email } = req.user;
  const { displayName = "New User", photoURL = "" } = req.body;
  if (!uid || !email) {
    return res.status(400).send({ error: "User ID and Email are required." });
  }
  try {
    const userRef = db.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      await userRef.set({
        fullname: displayName,
        email: email,
        imageUrl: photoURL,
        credits: 10,
        plan: "Free",
        createdAt: new Date(),
      });
      res.status(201).send({
        message: `Welcome, ${displayName}! Your account has been created.`,
      });
    } else res.status(200).send({ message: `Welcome Back ${displayName}` });
  } catch (error) {
    console.error("Error processing user sign-in:", error);
    res.status(500).send({ err: "Failed to process User" });
  }
});
export default router;
