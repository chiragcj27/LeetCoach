import { ChatOpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";

// Define the output schema for help responses
const helpOutputSchema = z.object({
  userSituation: z.string().describe("Analysis of user's current code situation"),
  progressiveHints: z.array(z.string()).describe("Progressive hints to solve the problem"),
  pseudoCode: z.string().describe("Pseudo code in layman's terms"),
  solution: z.string().describe("Complete solution in user's language"),
  bruteForce: z.object({
    userSituation: z.string(),
    progressiveHints: z.array(z.string()),
    pseudoCode: z.string(),
    solution: z.string(),
  }).optional(),
});

export type LeetCoachHelpResponse = z.infer<typeof helpOutputSchema>;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  type: 'chat' | 'help' | 'hint' | 'pseudocode' | 'solution';
}

export class LeetCoachService {
  private model: ChatOpenAI;
  private helpParser: StructuredOutputParser<typeof helpOutputSchema>;
  private context: {
    problemData: string;
    userCode: string;
    chatHistory: ChatMessage[];
  } | null = null;

  constructor(apiKey: string) {
    this.model = new ChatOpenAI({
      modelName: "gpt-4-turbo-preview",
      temperature: 0.7,
      openAIApiKey: apiKey,
    });

    this.helpParser = StructuredOutputParser.fromZodSchema(helpOutputSchema);
  }

  setContext(problemData: string, userCode: string) {
    this.context = {
      problemData,
      userCode,
      chatHistory: []
    };
  }

  addToChatHistory(message: ChatMessage) {
    if (this.context) {
      this.context.chatHistory.push(message);
    }
  }

  private createHelpPrompt(problemData: string, userCode: string): string {
    return `You are LeetCoach, an AI assistant helping users learn DSA problem-solving approaches.
    
Problem Description:
${problemData}

User's Current Code:
${userCode}

Analyze the user's code and provide guidance in the following format:
1. Analyze the user's current situation and approach
2. Provide progressive hints to help them solve the problem
3. Give pseudo code in simple terms
4. Provide a complete solution

If the user hasn't implemented a brute force solution, also provide guidance for both brute force and optimized approaches.

${this.helpParser.getFormatInstructions()}`;
  }

  private createChatPrompt(userMessage: string): string {
    if (!this.context) {
      throw new Error("Context not set. Please set problem data and user code first.");
    }

    // Format chat history
    const chatHistory = this.context.chatHistory
      .map(msg => `${msg.role === 'user' ? 'User' : 'LeetCoach'}: ${msg.content}`)
      .join('\n');

    return `You are LeetCoach, an AI assistant helping users learn DSA problem-solving approaches.
    
Current Problem Context:
Problem Description: ${this.context.problemData}
User's Current Code: ${this.context.userCode}

Previous Conversation:
${chatHistory}

User's New Question: ${userMessage}

Please provide a helpful response that:
1. Directly addresses the user's question
2. Uses the context of their current problem and code
3. Takes into account the previous conversation
4. Provides clear, concise explanations
5. Includes relevant examples or analogies when helpful
6. Maintains a supportive and encouraging tone

Your response should be in plain text format, focusing on being helpful and educational.`;
  }

  async getHelp(problemData: string, userCode: string): Promise<LeetCoachHelpResponse> {
    this.setContext(problemData, userCode);
    const prompt = this.createHelpPrompt(problemData, userCode);
    
    const response = await this.model.invoke(prompt);
    const parsedResponse = await this.helpParser.parse(response.content.toString());
    
    return parsedResponse;
  }

  async chat(userMessage: string): Promise<string> {
    if (!this.context) {
      throw new Error("Context not set. Please set problem data and user code first.");
    }

    // Add user message to chat history
    this.addToChatHistory({
      role: 'user',
      content: userMessage,
      type: 'chat'
    });

    const prompt = this.createChatPrompt(userMessage);
    const response = await this.model.invoke(prompt);
    
    // Add assistant response to chat history
    this.addToChatHistory({
      role: 'assistant',
      content: response.content.toString(),
      type: 'chat'
    });
    
    return response.content.toString();
  }
} 