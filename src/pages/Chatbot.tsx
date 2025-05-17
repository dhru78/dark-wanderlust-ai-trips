
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Example pre-defined responses for the AI chatbot
const responses = [
  {
    triggers: ["hello", "hi", "hey"],
    response: "Hello! I'm your AI travel assistant. How can I help you plan your next adventure?"
  },
  {
    triggers: ["paris", "france"],
    response: "Paris is a beautiful destination! For a 3-day itinerary, I recommend: Day 1: Visit the Eiffel Tower, Louvre Museum, and take a Seine river cruise. Day 2: Explore Montmartre, Sacré-Cœur, and the Champs-Élysées. Day 3: Visit Notre Dame Cathedral, the Latin Quarter, and enjoy some shopping at Le Marais."
  },
  {
    triggers: ["tokyo", "japan"],
    response: "Tokyo is amazing! Here's a suggested itinerary: Day 1: Visit Senso-ji Temple, Tokyo Skytree, and explore Asakusa. Day 2: Check out Shibuya Crossing, Harajuku, and Meiji Shrine. Day 3: Experience Tsukiji Fish Market, the Imperial Palace, and Akihabara."
  },
  {
    triggers: ["new york", "nyc", "usa"],
    response: "New York City has so much to offer! Try this itinerary: Day 1: Visit Times Square, Empire State Building, and Central Park. Day 2: Explore the Metropolitan Museum of Art, the Statue of Liberty, and Brooklyn Bridge. Day 3: Check out One World Trade Center, the High Line, and enjoy shopping in SoHo."
  },
  {
    triggers: ["fly", "flight", "cheap flight", "booking"],
    response: "To find the best flight deals, I recommend checking our Flight Finder tool. You can access it from the navigation menu. It compares prices across multiple airlines and even suggests the best time to book!"
  },
  {
    triggers: ["thank", "thanks"],
    response: "You're welcome! Is there anything else I can help you with for your trip planning?"
  },
];

// Sample suggested questions
const suggestedQuestions = [
  "What's a good 3-day itinerary for Paris?",
  "Can you recommend places to visit in Tokyo?",
  "How do I find cheap flights to New York?",
  "What should I pack for a tropical vacation?",
  "What are the best neighborhoods to stay in Barcelona?",
];

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      content: "Hi there! I'm your AI travel assistant. Ask me anything about destinations, itineraries, or travel tips!",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const findAIResponse = (message: string) => {
    const lowerCase = message.toLowerCase();
    for (const item of responses) {
      if (item.triggers.some(trigger => lowerCase.includes(trigger))) {
        return item.response;
      }
    }
    return "I'm not sure how to help with that yet. You could ask me about popular destinations like Paris, Tokyo, or New York, or about finding flights.";
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date(),
    } as Message;

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const botResponse = {
        id: `bot-${Date.now()}`,
        content: findAIResponse(userMessage.content),
        sender: "bot",
        timestamp: new Date(),
      } as Message;

      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  };

  return (
    <div className="container max-w-4xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">AI Travel Assistant</h1>
      
      <Card className="border shadow-lg bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Bot className="mr-2 h-5 w-5 text-primary" />
            Chat with TravelAI
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Ask about destinations, itineraries, travel tips, and more
          </p>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <ScrollArea className="h-[500px] p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-3 max-w-[80%] ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Avatar className="h-8 w-8">
                      {message.sender === "user" ? (
                        <User className="h-5 w-5" />
                      ) : (
                        <Bot className="h-5 w-5" />
                      )}
                      <AvatarFallback>
                        {message.sender === "user" ? "U" : "AI"}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs opacity-50 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8">
                      <Bot className="h-5 w-5" />
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg px-4 py-2 bg-muted">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 bg-current rounded-full animate-pulse"></div>
                        <div className="h-2 w-2 bg-current rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                        <div className="h-2 w-2 bg-current rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          </ScrollArea>

          <div className="p-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {suggestedQuestions.map((question) => (
                <Button
                  key={question}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-xs"
                >
                  {question}
                </Button>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your travel question here..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chatbot;
