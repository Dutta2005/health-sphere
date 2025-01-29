// MedicalChatbot.tsx
import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { api } from '../api/api';

// Lazy loaded components
const MessageList = lazy(() => import('../components/MessageComponent'));
const QuickAddSection = lazy(() => import('../components/QuickAddSection'));

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

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <Card className="flex-grow flex flex-col h-full overflow-hidden">
        <CardHeader className="shrink-0">
          <CardTitle>Medical Assistant</CardTitle>
        </CardHeader>
        
        <CardContent className="flex-grow flex flex-col gap-4 overflow-hidden">
          <Suspense fallback={<div className="text-center p-2">Loading conditions...</div>}>
            <QuickAddSection conditions={conditions} onQuickAdd={sendMessage} />
          </Suspense>

          <Suspense fallback={<div className="text-center p-2">Loading messages...</div>}>
            <MessageList 
              messages={messages}
              isLoading={isLoading}
              messagesEndRef={messagesEndRef}
            />
          </Suspense>

          <div className="flex gap-2 mt-auto pt-4 shrink-0">
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