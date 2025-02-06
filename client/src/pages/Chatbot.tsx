import React, { useState, useRef, useEffect } from "react";
import { Send, Plus, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { api } from "../api/api";
import MessageList from "../components/MessageComponent";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Symptom {
  id: string;
  text: string;
}

const MedicalChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [currentSymptom, setCurrentSymptom] = useState("");
  const [additionalMessage, setAdditionalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addSymptom = () => {
    if (currentSymptom.trim()) {
      setSymptoms((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          text: currentSymptom.trim(),
        },
      ]);
      setCurrentSymptom("");
    }
  };

  const removeSymptom = (id: string) => {
    setSymptoms((prev) => prev.filter((symptom) => symptom.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addSymptom();
    }
  };

  const sendMessage = async () => {
    const symptomsText =
      symptoms.length > 0
        ? `I have the following symptoms: ${symptoms
            .map((s) => s.text)
            .join(", ")}. `
        : "";

    const fullMessage = `${symptomsText}${additionalMessage}`.trim();

    if (!fullMessage) return;

    const newMessage: Message = { role: "user", content: fullMessage };
    setMessages((prev) => [...prev, newMessage]);
    setSymptoms([]);
    setAdditionalMessage("");
    setIsLoading(true);

    try {
      const { data } = await api.post("/chat/chat", {
        message: fullMessage,
        context: messages,
      });

      if (data.message) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.message,
          },
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[90vh] md:h-[93vh] max-w-2xl mx-auto p-4 -mt-5">
      <Card className="flex-grow flex flex-col h-full overflow-hidden">
        <CardHeader className="shrink-0 p-3">
          <CardTitle className="text-2xl text-secondary text-center font-samarkan">
            Umeed
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow flex flex-col gap-4 p-0 overflow-hidden">
          {messages.length === 0 && (
            <div className="text-center text-sm text-gray-500 dark:text-dark-text/60 p-8 pt-16">
              <p className="mb-2">
                Add your symptoms using the input field below, or type your
                health-related questions directly.
              </p>
              <p>
                Umeed will try to provide relevant information and
                guidance.
              </p>
            </div>
          )}
          <MessageList
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />

          <div className="space-y-4 p-4 border-t shrink-0">
            <div className="flex flex-wrap gap-2 min-h-[32px]">
              {symptoms.map((symptom) => (
                <div
                  key={symptom.id}
                  className="flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-sm"
                >
                  <span>{symptom.text}</span>
                  <button
                    onClick={() => removeSymptom(symptom.id)}
                    className="hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Input
                value={currentSymptom}
                onChange={(e) => setCurrentSymptom(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a symptom..."
                className="flex-grow"
              />
              <Button
                onClick={addSymptom}
                variant="outline"
                size="icon"
                disabled={!currentSymptom.trim()}
                className="bg-secondary dark:bg-secondary dark:text-dark-text hover:bg-secondary/90"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Input
                value={additionalMessage}
                onChange={(e) => setAdditionalMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Additional details or questions... (optional)"
                className="flex-grow"
              />
              <Button
                onClick={sendMessage}
                disabled={
                  isLoading || (!symptoms.length && !additionalMessage.trim())
                }
                className="bg-secondary dark:bg-secondary dark:text-dark-text hover:bg-secondary/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MedicalChatbot;
