import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import * as chatService from "../utils/chatService";

export const useChat = () => {
  const [chats, setChats] = useState([]);
  const [conversation, setConversation] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [isLoadingChats, setIsLoadingChats] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    loadRecentChats();
  }, []);

  const loadRecentChats = async (showLoader = true) => {
    if (showLoader) setIsLoadingChats(true);
    try {
      const recentChats = await chatService.fetchRecentChats();
      setChats(recentChats);
    } catch (error) {
      toast.error(error.message);
    } finally {
      if (showLoader) setIsLoadingChats(false);
    }
  };
  const loadChat = async (chatId) => {
    try {
      const chatData = await chatService.fetchChatById(chatId);
      setConversation(chatData.messages);
      setCurrentChatId(chatData.id);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const sendMessage = async (prompt) => {
    if (!prompt.trim()) return;
    const userMessage = { role: "user", content: prompt };
    setConversation((prev) => [...prev, userMessage]);
    setIsGenerating(true);
    try {
      const result = await chatService.generateResponse(
        prompt,
        conversation,
        currentChatId
      );
      const aiMessage = { role: "ai", content: result.content };
      setConversation((prev) => [...prev, aiMessage]);
      setCurrentChatId(result.chatId);
      if (!currentChatId) loadRecentChats(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const startNewChat = () => {
    setConversation([]);
    setCurrentChatId(null);
  };

  return {
    chats,
    conversation,
    isLoadingChats,
    isGenerating,
    loadChat,
    sendMessage,
    startNewChat,
  };
};
