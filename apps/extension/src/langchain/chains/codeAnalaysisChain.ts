// src/langchain/chains/codeAnalysisChain.ts
import { ChatGroq } from "@langchain/groq";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";
import { memory } from "../memory/chatMemory";
import { createLeetCoachPrompt, createInitialMessagePrompt } from "../prompts/systemPrompts";
import { cleanProblemData, extractProblemData, extractUserCode, waitForEditor } from "../../content/scrape";

// Configure your LLM
const llm = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    apiKey: ""
  });



const outputParser = new StringOutputParser();

interface ProblemContext {
  problemData: string;
  userCode: string;
}

// Function to wait for editor and return cleaned problem data and user code
export const getProblemContext = async (): Promise<ProblemContext> => {
  return new Promise((resolve) => {
    waitForEditor(async () => {
      const rawProblemData = extractProblemData();
      const cleanedProblemData = cleanProblemData(rawProblemData);
      const userCode = await extractUserCode();
      resolve({
        problemData: cleanedProblemData,
        userCode,
      });
    });
  });
};

// Initial AI message based on problem + code
export const createInitialMessage = async (
  problemData: string,
  userCode: string
): Promise<string> => {
  const chatPrompt = createInitialMessagePrompt();
  const chain = RunnableSequence.from([chatPrompt, llm, outputParser]);
  return await chain.invoke({ problemData, userCode });
};

// Analyze code and user query
export const analyzeProblemAndCode = async (
  problemData: string,
  userCode: string,
  userQuestion: string
): Promise<string> => {
  const chatHistory = await memory.getChatHistory();
  const chatPrompt = createLeetCoachPrompt();
  const chain = RunnableSequence.from([chatPrompt, llm, outputParser]);

  const result = await chain.invoke({
    problemData,
    userCode,
    chatHistory,
    userQuestion,
  });

  await memory.saveMessage(userQuestion, result);
  return result;
};
