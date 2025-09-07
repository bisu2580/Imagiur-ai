import { auth } from "../config/firebase";
// const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const getAuthHeaders = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated.");
  const idToken = await user.getIdToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${idToken}`,
  };
};

export const fetchRecentChats = async () => {
  const headers = await getAuthHeaders();
  const response = await fetch(`/api/recent-chats`, { headers });
  if (!response.ok) throw new Error("Failed to fetch recent chats.");
  return response.json();
};

export const fetchChatById = async (chatId) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`/api/chat/${chatId}`, {
    headers,
  });
  if (!response.ok) throw new Error("Failed to load chat history.");
  return response.json();
};

export const generateResponse = async (prompt, history, chatId) => {
  const headers = await getAuthHeaders();
  const response = await fetch(`/api/generate-text`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      prompt: { role: "user", content: prompt },
      history: history,
      chatId: chatId,
    }),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || "An unknown server error occurred.");
  }
  return result;
};
