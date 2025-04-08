import React from "react";
import { LeetCoachProvider } from "../contexts/LeetCoachContext";
import { ChatInterface } from "../components/ChatInterface";

export const ContentPage: React.FC = () => {
  return (
    <LeetCoachProvider>
      <div className="fixed bottom-4 right-4 w-80 z-50">
        <ChatInterface />
      </div>
    </LeetCoachProvider>
  );
};