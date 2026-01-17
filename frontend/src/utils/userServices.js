import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export const signOutUser = () => {
  return signOut(auth);
};

export const uploadProfileImage = async (file) => {
  const user = auth.currentUser;
  if (!user) {
    console.error("Upload attempt failed: User is not authenticated.");
    throw new Error("You must be signed in to upload an image.");
  }
  if (!file) {
    console.error("Upload attempt failed: No file provided.");
    throw new Error("No file selected.");
  }
  const formData = new FormData();
  formData.append("profileImage", file);
  try {
    const idToken = await user.getIdToken();
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/upload-image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      console.log("Upload successful! New URL:", result.imageUrl);
      return result;
    } else {
      throw new Error(result.error || "Upload Failed");
    }
  } catch (error) {
    console.error("An error occurred during image upload:", error);
    throw new Error(
      "Image upload failed. Please check your connection and try again."
    );
  }
};
