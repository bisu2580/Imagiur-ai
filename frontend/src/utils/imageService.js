import { auth } from "../config/firebase";

export const generateImage = async (prompt, model, resolution = "512x512") => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("User is not authenticated.");
  }
  const idToken = await user.getIdToken();
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/generate-image`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({ prompt, model, resolution }),
  });
  const result = await response.json();
  if (response.ok) {
    return result;
  } else {
    throw new Error(result.error || "An unknown server error occurred.");
  }
};
