import React, { useState, useRef, useEffect } from "react";
import { useLeetCoach } from "../contexts/LeetCoachContext";
import { parseCodeBlocks } from "../utils/codeDetection";
import { SendHorizonal, ChevronDown, ChevronUp } from "lucide-react";

export const ChatInterface: React.FC = () => {
  const { messages, sendMessage, isLoading, initializeChat } = useLeetCoach();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (messages.length === 0) {
      initializeChat();
    }
  }, [initializeChat, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput("");
    await sendMessage(userMessage);
  };

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const createMarkup = (content: string) => {
    const processedContent = parseCodeBlocks(content);
    return { __html: processedContent };
  };

  return (
    <div className="flex flex-col h-[32rem] w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg border transition-all duration-300 ease-in-out overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center bg-yellow-400">
        <span className="text-gray-800 font-semibold text-base">
          LeetCoach Assistant
        </span>
        <button
          onClick={toggleVisibility}
          className="text-gray-500 hover:text-gray-800 transition-colors"
        >
          {isVisible ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </button>
      </div>

      {/* Body */}
      {isVisible && (
        <>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white transition-all">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm break-words whitespace-pre-wrap shadow-sm transition-all duration-300 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                  dangerouslySetInnerHTML={createMarkup(msg.content)}
                />
              </div>
            ))}

            {/* Loading animation */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-4 py-3 bg-gray-100 text-gray-800 rounded-2xl rounded-bl-none text-sm shadow-sm">
                  <div className="flex space-x-1 animate-pulse">
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Ask LeetCoach..."
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition flex items-center gap-1"
            >
              <SendHorizonal size={16} />
            </button>
          </form>
        </>
      )}
    </div>
  );
};
