import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { api } from '../api/api';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

interface CommonCondition {
    id: number;
    name: string;
    prompt: string;
}

const MedicalChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conditions, setConditions] = useState<CommonCondition[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchCommonConditions();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchCommonConditions = async () => {
    try {
        const { data } = await api.get('/chat/conditions');
        setConditions(data);
    } catch (error) {
      console.error('Error fetching conditions:', error);
    }
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const newMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const { data } = await api.post('/chat/chat', {
          message: messageText,
          context: messages
        });
    
        if (data.message) {
          setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
        }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAdd = (prompt: string) => {
    sendMessage(prompt);
  };

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <Card className="flex-grow flex flex-col h-full">
        <CardHeader>
          <CardTitle>Medical Assistant</CardTitle>
        </CardHeader>
        
        <CardContent className="flex-grow flex flex-col gap-4">
          {/* Quick Add Section */}
          <div className="flex flex-wrap gap-2 mb-4">
            {conditions.map((condition) => (
              <Button
                key={condition.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAdd(condition.prompt)}
                className="flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                {condition.name}
              </Button>
            ))}
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === 'user'
                        ? 'bg-primary text-primary-foreground ml-4'
                        : 'bg-muted mr-4'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3 mr-4">
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Section */}
          <div className="flex gap-2 mt-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your medical question..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage(input)}
              className="flex-grow"
            />
            <Button
              onClick={() => sendMessage(input)}
              disabled={isLoading || !input.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalChatbot;