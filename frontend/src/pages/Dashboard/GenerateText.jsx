import { useRef, useState } from "react";
import Card from "./Card";
import "./dashboard.css";
import logo from "../../assets/gemini-color.svg";
import {
  Plus,
  SendHorizontal,
  MessageSquare,
  Bot,
  PanelLeftOpen,
  PanelLeftClose,
} from "lucide-react";
import "./dashboard.css";
import { useAuth } from "../../hooks/useAuth";
import { useChat } from "../../hooks/useChat";
import { ChatListItemSkeleton } from "../../utils/animations";
import { GeminiAvatar, GeminiFormattedResponse } from "../../helpers/helpers";

const GenerateText = () => {
  const { user } = useAuth();
  const {
    chats,
    conversation,
    isLoadingChats,
    isGenerating,
    loadChat,
    sendMessage,
    startNewChat,
  } = useChat();
  const [isChatsSectionOpen, setIsChatsSectionOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const chatEndRef = useRef(null);

  const handleSend = () => {
    sendMessage(prompt);
    setPrompt("");
  };

  const handleNewChat = () => {
    startNewChat();
    setIsChatsSectionOpen(false);
  };

  const handleRecentChatClick = (chatId) => {
    loadChat(chatId);
    setIsChatsSectionOpen(false);
  };

  return (
    <div className="space-y-6 overflow-x-hidden text-gray-100">
      <Card className="bg-black/30 backdrop-blur-xl border border-white/10 shadow-xl rounded-2xl overflow-hidden relative md:p-1">
        <div className="flex flex-row-reverse h-screen w-full">
          <button
            className="absolute top-3 right-3 p-2 rounded-lg hover:bg-white/10 transition-colors z-50 md:hidden"
            onClick={() => setIsChatsSectionOpen((prev) => !prev)}
          >
            {isChatsSectionOpen ? <PanelLeftOpen /> : <PanelLeftClose />}
          </button>
          <aside
            className={`fixed right-0 md:top-0 top-12 md:static z-40 h-full flex flex-col w-64 p-3
            bg-gradient-to-b from-black/40 to-black/80 backdrop-blur-xl border-l border-white/10 shadow-2xl transition-transform duration-300 ease-in-out
            ${
              isChatsSectionOpen ? "translate-x-0" : "translate-x-full"
            } md:translate-x-0`}
          >
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 
              bg-gradient-to-r from-purple-500/40 to-blue-500/40 
              rounded-lg border border-white/10
              hover:scale-105 transition-transform shadow-md"
              onClick={handleNewChat}
            >
              <Plus size={18} />
              New Chat
            </button>

            <div className="flex flex-col gap-2 mt-6 overflow-y-auto custom-scrollbar">
              <p className="text-xs font-semibold text-gray-400 px-2">Recent</p>
              {isLoadingChats ? (
                <>
                  <ChatListItemSkeleton />
                  <ChatListItemSkeleton />
                </>
              ) : (
                chats?.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => handleRecentChatClick(chat.id)}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-300 
                    rounded-lg hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-blue-500/10
                    transition-colors"
                  >
                    <MessageSquare size={16} />
                    <span className="truncate">{chat.title}</span>
                  </button>
                ))
              )}
            </div>
          </aside>

          {/* Backdrop for mobile when sidebar is open */}
          {isChatsSectionOpen && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
              onClick={() => setIsChatsSectionOpen(false)}
            />
          )}

          {/* Main Content Area */}
          <main className="flex flex-col flex-1 h-full p-4 md:p-6 relative">
            <div className="flex-1 min-h-0 overflow-y-auto p-2 sm:p-4 flex flex-col gap-4 custom-scrollbar w-full">
              {conversation?.length === 0 && !isGenerating ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="flex items-center justify-center size-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mb-6">
                    <Bot size={40} className="text-white" />
                  </div>
                  <h1 className="text-2xl md:text-4xl font-bold text-gray-100">
                    Welcome, How can I help you today?
                  </h1>
                </div>
              ) : (
                <>
                  {conversation?.map((message, i) => (
                    <div
                      key={i}
                      className={`flex gap-3 ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.role !== "user" && (
                        <GeminiAvatar className="size-7" />
                      )}
                      <div
                        className={`max-w-lg px-4 py-3 rounded-2xl text-sm md:text-base shadow-md ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white animate-slideRight"
                            : "bg-white/10 text-gray-200 border border-white/10 animate-slideLeft"
                        }`}
                      >
                        <GeminiFormattedResponse text={message.content} />
                      </div>
                      {message.role === "user" && (
                        <img
                          src={user?.imageUrl || logo}
                          alt="User Avatar"
                          crossOrigin="anonymous"
                          referrerPolicy="no-referrer"
                          className="size-10 md:size-12 rounded-full object-cover border border-white/20"
                        />
                      )}
                    </div>
                  ))}
                </>
              )}

              {isGenerating && (
                <div className="flex items-center gap-3 animate-pulse text-gray-300">
                  <GeminiAvatar className="size-7" />
                  <p className="text-sm md:text-base">Generating...</p>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Bar */}
            <div className="w-full max-w-3xl mx-auto px-1 sm:px-3 pb-3">
              <div className="relative flex items-center bg-black/30 border border-white/10 rounded-2xl shadow-lg backdrop-blur-xl">
                <textarea
                  className="w-full py-3 px-4 pr-12 text-sm md:text-base text-gray-200 bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-2xl hide-scrollbar"
                  placeholder="Message Imagiur..."
                  rows="1"
                  disabled={isGenerating}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <button
                  className="absolute right-2 p-1.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:scale-110 transition-transform disabled:opacity-50"
                  onClick={handleSend}
                  disabled={isGenerating || !prompt.trim()}
                >
                  <SendHorizontal size={22} className="text-white" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </Card>
    </div>
  );
};
export default GenerateText;
