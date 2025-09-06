import express from "express";
import multer from "multer";
import verifyToken from "../middleware/verifyToken.js";
import fetch from "node-fetch";
import cloudinary from "../config/cloudinary.js";
import { db } from "../config/firebaseAdmin.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload an image file."), false);
    }
  },
});
const uploadToCloudinary = async (imageBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadSteram = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "generated_images",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        } else {
          resolve(result);
        }
      }
    );
    uploadSteram.end(imageBuffer);
  });
};
const uploadprofileImage = async (imageBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadSteram = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "profile_images",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary profile image upload error:", error);
          return reject(error);
        } else {
          resolve(result);
        }
      }
    );
    uploadSteram.end(imageBuffer);
  });
};
router.post("/generate-image", verifyToken, async (req, res) => {
  const { prompt, model, resolution } = req.body;
  if (!prompt || !resolution) {
    return res
      .status(400)
      .json({ error: "Prompt and resolution are required." });
  }
  const resolutionParts = resolution.split("x");
  if (
    resolutionParts.length !== 2 ||
    !Number(resolutionParts[0]) ||
    !Number(resolutionParts[1])
  ) {
    return res.status(400).json({
      error: "Invalid resolution format. Expected 'widthxheight'.",
    });
  }
  const [width, height] = resolution.split("x");
  try {
    const userRef = db.collection("users").doc(req.user.uid);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return res.status(404).json({ error: "User not found" });
    }
    const userData = userDoc.data();
    const currentCredits = userData.credits || 0;
    const isUnlimitedPlan = userData.plan === "UNLIMITED";

    if (!isUnlimitedPlan) {
      const amount = 1;
      if (currentCredits < amount)
        return res
          .status(403)
          .json({ error: "Not enough credits to generate an image" });
    }

    const newPrompt = `${prompt} in ${model} style`;
    const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      newPrompt
    )}?width=${width}%20&height=${height}`;

    const pollRes = await fetch(pollinationsUrl);

    if (!pollRes.ok) {
      console.error(`Pollinations API error: ${pollRes.statusText}`);
      return res.status(500).json({
        error: "Failed to generate image from Pollinations API.",
      });
    }
    const imageBuffer = Buffer.from(await pollRes.arrayBuffer());
    const cloudinaryResult = await uploadToCloudinary(imageBuffer);

    const activity = {
      type: "image_generation",
      prompt,
      model,
      resolution,
      timestamp: new Date(),
    };

    //update image activity
    const prevActivities = userData.activities || [];
    const updatedActivities = [...prevActivities, activity].slice(-20);

    const prevImages = userData.generatedImages || [];
    const updatedImages = [...prevImages, cloudinaryResult.secure_url].slice(
      -20
    );
    const updateData = {
      activities: updatedActivities,
      generatedImages: updatedImages,
    };
    let newCreditBalance = currentCredits;
    if (!isUnlimitedPlan) {
      const amount = 1;
      newCreditBalance = currentCredits - amount;
      updateData.credits = newCreditBalance;
    }
    await userRef.update(updateData);

    res.status(200).json({
      imageData: cloudinaryResult.secure_url,
      mimeType: pollRes.headers.get("content-type") || "image/png",
      newCredits: newCreditBalance,
    });
  } catch (error) {
    console.error("Error during image generation:", error);
    res.status(500).json({
      error: "An internal server error occurred while generating the image.",
      details: error.message,
    });
  }
});
router.post(
  "/upload-image",
  verifyToken,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided." });
      }
      const userRef = db.collection("users").doc(req.user.uid);
      const userDoc = await userRef.get();
      if (!userDoc.exists) {
        return res.status(404).json({ error: "User not found" });
      }
      const userData = userDoc.data();
      // --- Step B: Upload the image buffer to Cloudinary ---
      console.log("Uploading image to Cloudinary...");
      const cloudinaryResult = await uploadprofileImage(req.file.buffer);
      const imageUrl = cloudinaryResult.secure_url;
      console.log("Image uploaded successfully:", imageUrl);

      // --- Step C: Update the user's document in Firestore ---
      const activity = {
        type: "profile_photo_upload",
        timestamp: new Date(),
      };
      const prevActivities = userData.activities || [];
      const updatedActivities = [...prevActivities, activity].slice(-20);
      await userRef.update({
        imageUrl: imageUrl,
        activities: updatedActivities,
      });
      // --- Step D: Send a success response back to the client ---
      res.status(200).json({
        message: "Profile image uploaded successfully!",
        imageUrl: imageUrl,
        activities: updatedActivities,
      });
    } catch (err) {
      console.error("Error during profile image upload:", err);
      res.status(500).json({
        error: "An internal server error occurred during the upload.",
        details: err.message,
      });
    }
  }
);
export default router;
