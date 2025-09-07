import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

export const signOutUser = () => {
  return signOut(auth);
};

export const uploadProfileImage = async (file) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not authenticated.");
  }
  const formData = new FormData();
  formData.append("profileImage", file);
  const idToken = await user.getIdToken();
  const response = await fetch(`/api/upload-image`, {
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
};
