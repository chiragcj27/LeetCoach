// src/langchain/memory/chatMemory.ts
import { BaseMessage, HumanMessage, AIMessage } from "@langchain/core/messages";

export class LeetCoachMemory {
  private messages: BaseMessage[];
  
  constructor() {
    this.messages = [];
  }

  async saveMessage(userMessage: string, aiResponse: string): Promise<void> {
    if (userMessage) {
      this.messages.push(new HumanMessage(userMessage));
    }
    this.messages.push(new AIMessage(aiResponse));
  }

  async getChatHistory(): Promise<string> {
    return this.messages
      .map((msg: BaseMessage) => {
        if (msg.getType() === "human") {
          return `User: ${msg.content}`;
        } else if (msg.getType() === "ai") {
          return `LeetCoach: ${msg.content}`;
        }
        return "";
      })
      .join("\n\n");
  }

  async getMessages(): Promise<BaseMessage[]> {
    return this.messages;
  }

  async clearMemory(): Promise<void> {
    this.messages = [];
  }
}

export const memory = new LeetCoachMemory();