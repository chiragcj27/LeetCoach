import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@workspace/ui/components/button';
import { Card } from '@workspace/ui/components/card';
import { ScrollArea } from '@workspace/ui/components/scroll-area';
import { Input } from '@workspace/ui/components/input';
import { Send, Lightbulb, Code, CheckCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  type: 'chat' | 'help' | 'hint' | 'pseudocode' | 'solution';
  buttons?: {
    text: string;
    action: () => void;
    icon?: React.ReactNode;
  }[];
}

interface HelpData {
  userSituation: string;
  progressiveHints: string[];
  pseudoCode: string;
  solution: string;
  bruteForce?: {
    userSituation: string;
    progressiveHints: string[];
    pseudoCode: string;
    solution: string;
  };
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

interface ChatInterfaceProps {
  onTakeHelp: () => Promise<ApiResponse<HelpData>>;
  onSendMessage: (message: string) => Promise<ApiResponse<string>>;
  isLoading: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  onTakeHelp,
  onSendMessage,
  isLoading
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [helpData, setHelpData] = useState<HelpData | null>(null);
  const [chatEnabled, setChatEnabled] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleTakeHelp = async () => {
    setMessages(prev => [...prev, { role: 'user', content: 'Take Help', type: 'help' }]);
    try {
      const response = await onTakeHelp();
      if (response.success) {
        setHelpData(response.data);
        // Add user situation message
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.data.userSituation,
          type: 'help',
          buttons: [{
            text: 'Get First Hint',
            action: () => handleShowHint(0),
            icon: <Lightbulb className="h-4 w-4 mr-2" /> as unknown as React.ReactNode
          }]
        }]);
      }
    } catch (error) {
      console.error('Error getting help:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error while trying to help. Please try again.',
        type: 'help'
      }]);
    }
  };

  const handleShowHint = (index: number) => {
    if (!helpData || !helpData.progressiveHints) return;

    const hint = helpData.progressiveHints[index];

    const buttons: Message['buttons'] = [];
    
    // Add next hint button if there are more hints
    if (index < helpData.progressiveHints.length - 1) {
      buttons.push({
        text: 'Next Hint',
        action: () => handleShowHint(index + 1),
        icon: <Lightbulb className="h-4 w-4 mr-2" /> as unknown as React.ReactNode
      });
    } else {
      // If this is the last hint, show pseudocode button
      buttons.push({
        text: 'Show Pseudocode',
        action: handleShowPseudocode,
        icon: <Code className="h-4 w-4 mr-2" /> as unknown as React.ReactNode
      });
    }

    setMessages(prev => [...prev, {
      role: 'assistant',
      content: hint,
      type: 'hint',
      buttons
    }]);
  };

  const handleShowPseudocode = () => {
    if (!helpData) return;

    setMessages(prev => [...prev, {
      role: 'assistant',
      content: helpData.pseudoCode,
      type: 'pseudocode',
      buttons: [{
        text: 'Show Solution',
        action: handleShowSolution,
        icon: <CheckCircle className="h-4 w-4 mr-2" /> as unknown as React.ReactNode
      }]
    }]);
  };

  const handleShowSolution = () => {
    if (!helpData) return;

    setMessages(prev => [...prev, {
      role: 'assistant',
      content: helpData.solution,
      type: 'solution'
    }]);

    // Enable chat after showing solution
    setChatEnabled(true);
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: "Now that you've seen the solution, feel free to ask any questions about it or the problem in general!",
      type: 'chat'
    }]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || !chatEnabled) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage, type: 'chat' }]);

    try {
      const response = await onSendMessage(userMessage);
      if (response.success) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: response.data,
          type: 'chat'
        }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        type: 'chat'
      }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="w-[400px] h-[600px] flex flex-col bg-background border rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">LeetCoach AI Assistant</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'assistant' ? 'text-blue-600' : 'text-gray-800'
            }`}
          >
            <div className="font-semibold mb-1">
              {message.role === 'assistant' ? 'LeetCoach' : 'You'}
            </div>
            <div className="whitespace-pre-wrap">{message.content}</div>
            {message.buttons && (
              <div className="mt-2 space-y-2">
                {message.buttons.map((button, btnIndex) => (
                  <Button
                    key={btnIndex}
                    onClick={button.action}
                    disabled={isLoading}
                    variant="secondary"
                    className="w-full"
                  >
                    {button.icon as unknown as React.ReactNode}
                    {button.text}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </ScrollArea>

      <div className="p-4 border-t space-y-2">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={chatEnabled ? "Ask a question..." : "Chat will be enabled after solution..."}
            disabled={isLoading || !chatEnabled}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputMessage.trim() || !chatEnabled}
            size="icon"
          >
            <Send className="h-4 w-4" /> as unknown as React.ReactNode
          </Button>
        </div>
        {!chatEnabled && (
          <Button
            onClick={handleTakeHelp}
            disabled={isLoading}
            className="w-full"
            variant="secondary"
          >
            {isLoading ? 'Processing...' : 'Take Help'}
          </Button>
        )}
      </div>
    </Card>
  );
}; 