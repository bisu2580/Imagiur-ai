import { auth, db } from "../config/firebase.js";
import { doc, updateDoc } from "firebase/firestore";

// const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const generateBio = async (fullname) => {
  if (!fullname) {
    throw new Error("Full name is required to generate a bio.");
  }
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User must be authenticated.");
  }

  const idToken = await user.getIdToken();
  const prompt = `Generate a short, creative, and professional bio (around 20-30 words) for a person named ${fullname}.`;

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/generate-bio`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ prompt }),
  });

  const result = await response.json();
  if (!response.ok || !result.generatedBio) {
    throw new Error(
      result.error || "Failed to get a valid response from the bio generator."
    );
  }

  return result.generatedBio;
};

export const updateUserProfile = async (userId, profileData) => {
  if (!userId || !profileData) {
    throw new Error("User ID and profile data are required.");
  }
  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, profileData);
};
