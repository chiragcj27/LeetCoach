import React, { createContext, useContext, useState, useEffect } from "react";
import { memory, createInitialMessage, analyzeProblemAndCode } from "../langchain/chains/langchainService";

interface LeetCoachContextType {
  problemData: string;
  userCode: string;
  messages: Array<{ role: "user" | "assistant"; content: string }>;
  isLoading: boolean;
  sendMessage: (message: string) => Promise<void>;
  initializeChat: () => Promise<void>;
}

const LeetCoachContext = createContext<LeetCoachContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useLeetCoach = () => {
  const context = useContext(LeetCoachContext);
  if (!context) {
    throw new Error("useLeetCoach must be used within a LeetCoachProvider");
  }
  return context;
};

export const LeetCoachProvider: React.FC<React.PropsWithChildren<object>> = ({ children }) => {
  const [problemData, setProblemData] = useState<string>("");
  const [userCode, setUserCode] = useState<string>("");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadScrapingLogic = async () => {
      const {
        extractProblemData,
        cleanProblemData,
        extractUserCode,
        waitForEditor,
      } = await import("../content/scrape");

      waitForEditor(async () => {
        console.log("[LeetCoachContext] Editor ready. Extracting data...");

        const rawProblem = extractProblemData();
        const cleaned = cleanProblemData(rawProblem);
        setProblemData(cleaned);

        try {
          const code = await extractUserCode();
          setUserCode(code);
        } catch (error) {
          console.error("[LeetCoachContext] Failed to extract code:", error);
        }
      });
    };

    loadScrapingLogic();

    const editorModel = (window as unknown as { monaco?: { editor?: { getModels?: () => { getValue: () => string; onDidChangeContent: (cb: () => void) => void }[] } } }).monaco?.editor?.getModels?.()[0];
    if (editorModel) {
      editorModel.onDidChangeContent(() => {
        const updatedCode = editorModel.getValue();
        setUserCode(updatedCode);
      });
    }

    return () => {
      memory.clearMemory();
    };
  }, []);

  const initializeChat = async () => {
    setIsLoading(true);
    try {
      const initialMessage = await createInitialMessage(problemData, userCode);
      setMessages([{ role: "assistant", content: initialMessage }]);
      await memory.saveMessage("", initialMessage);
    } catch (error) {
      console.error("Error initializing chat:", error);
      setMessages([{
        role: "assistant",
        content:
          "Hello! I'm LeetCoach. I can help you with this problem, but I couldn't analyze it automatically. Would you like me to help you understand the problem or review your code?",
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setIsLoading(true);

    try {
      const response = await analyzeProblemAndCode(problemData, userCode, message);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Error processing message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I encountered an error processing your request. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const value: LeetCoachContextType = {
    problemData,
    userCode,
    messages,
    isLoading,
    sendMessage,
    initializeChat,
  };

  return <LeetCoachContext.Provider value={value}>{children}</LeetCoachContext.Provider>;
};
