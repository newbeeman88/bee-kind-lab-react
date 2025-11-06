import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MessageCircle, Send, X, Minimize2, Bot } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface AIChatBoxProps {
  isLoggedIn: boolean;
  showChat?: boolean;
  onChatToggle?: (isOpen: boolean) => void;
}

const mockResponses = [
  "Great question! For varroa mite treatment, I'd recommend using formic acid strips during late summer. They're effective and don't contaminate honey stores. 🍯",
  "It sounds like your bees might be preparing to swarm. Look for queen cells and consider doing a split if you see multiple capped queen cells. 🐝",
  "For winter preparation, make sure your hive has adequate honey stores (40-60 lbs), proper ventilation, and is protected from wind. Also check for a laying queen. ❄️",
  "That's normal behavior during nectar flow! Bees become more active when there's plenty of food available. Make sure you have enough supers for honey storage. 🌸",
  "Propolis is amazing! You can use it for tinctures, salves, or even natural wood finishes. Just make sure to filter it properly before use. ✨"
];

export function AIChatBox({ isLoggedIn, showChat, onChatToggle }: AIChatBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm the Bee AI 🐝, your friendly beekeeping assistant! Ask me anything about hive management, bee behavior, honey production, or beekeeping techniques. I'm here to help you become a better beekeeper! 🍯",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userCanScroll, setUserCanScroll] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Use showChat prop to control the chat state
  const chatIsOpen = showChat || isOpen;

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Effect to handle auto-scrolling
  useEffect(() => {
    if (userCanScroll) {
      scrollToBottom();
    }
  }, [messages, userCanScroll]);

  // Handle scroll events to detect if user is manually scrolling
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 10; // 10px tolerance
    setUserCanScroll(isAtBottom);
  };

  const handleOpenChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    onChatToggle?.(true);
    // Scroll to bottom when opening
    setTimeout(() => scrollToBottom(), 100);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
    onChatToggle?.(false);
  };

  const handleMinimizeToggle = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      // When expanding, scroll to bottom
      setTimeout(() => scrollToBottom(), 100);
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setUserCanScroll(true); // Enable auto-scroll for new messages

    // Simulate AI response with typing indicator
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: mockResponses[Math.floor(Math.random() * mockResponses.length)],
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!chatIsOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={handleOpenChat}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-2xl transition-all duration-300 hover:scale-110 group relative overflow-hidden"
            size="icon"
          >
            {/* Pulse animation background */}
            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20"></div>
            
            {/* Icon with animation */}
            <div className="relative flex items-center justify-center">
              <Bot className="w-7 h-7 transition-transform duration-300 group-hover:scale-110" />
            </div>
            
            {/* Cute notification badge */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">🐝</span>
            </div>
          </Button>
          
          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-foreground/90 text-background text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Ask the Bee AI! 🍯
          </div>
        </div>
      )}

      {/* Chat Modal - Responsive */}
      {chatIsOpen && (
        <div className={`fixed bottom-4 right-4 shadow-2xl z-50 transition-all duration-300 bg-card/95 backdrop-blur-sm border-2 border-border rounded-lg ${
          isMinimized 
            ? 'h-14 w-72' 
            : 'h-[32rem] w-80 sm:w-96 md:w-[28rem]'
        } max-h-[80vh] max-w-[calc(100vw-2rem)] flex flex-col`}>
          
          {/* Header */}
          <div className="flex flex-row items-center justify-between p-4 pb-2 border-b border-border/50 flex-shrink-0">
            <div className="text-lg flex items-center space-x-3" style={{ fontFamily: 'var(--font-family-heading)' }}>
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-[#FFB300] to-[#FFA000] rounded-full flex items-center justify-center shadow-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-card animate-pulse"></div>
              </div>
              <span className="text-foreground">Ask the Bee AI 🐝</span>
            </div>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 hover:bg-muted/50 transition-colors"
                onClick={handleMinimizeToggle}
              >
                <Minimize2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 hover:bg-destructive/10 hover:text-destructive transition-colors"
                onClick={handleCloseChat}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages Area with Visible Scrollbar */}
              <div className="flex-1 relative overflow-hidden">
                <div 
                  className="h-full px-4 py-2 overflow-y-auto overflow-x-hidden scroll-smooth"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#FFB300 #C8E6C8',
                  }}
                  ref={scrollAreaRef}
                  onScroll={handleScroll}
                >
                  <style dangerouslySetInnerHTML={{
                    __html: `
                      .overflow-y-auto::-webkit-scrollbar {
                        width: 8px;
                      }
                      .overflow-y-auto::-webkit-scrollbar-track {
                        background: #C8E6C8;
                        border-radius: 4px;
                        margin: 4px;
                      }
                      .overflow-y-auto::-webkit-scrollbar-thumb {
                        background: #FFB300;
                        border-radius: 4px;
                      }
                      .overflow-y-auto::-webkit-scrollbar-thumb:hover {
                        background: #E6A200;
                      }
                    `
                  }} />
                  <div className="space-y-3 min-h-full">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex items-start space-x-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        {!message.isUser && (
                          <div className="w-6 h-6 bg-gradient-to-r from-[#FFB300] to-[#FFA000] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div
                          className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${
                            message.isUser
                              ? 'bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-br-md'
                              : 'bg-muted text-muted-foreground rounded-bl-md border border-border/50'
                          }`}
                          style={{ fontFamily: 'var(--font-family-primary)' }}
                        >
                          {message.content}
                          <div className={`text-xs mt-1 opacity-60 ${message.isUser ? 'text-right' : 'text-left'}`}>
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                        {message.isUser && (
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-xs font-bold">U</span>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex items-start space-x-2 justify-start">
                        <div className="w-6 h-6 bg-gradient-to-r from-[#FFB300] to-[#FFA000] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <div className="bg-muted text-muted-foreground p-3 rounded-2xl rounded-bl-md border border-border/50 shadow-sm">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Scroll anchor */}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                
                {/* Scroll to bottom button */}
                {!userCanScroll && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute bottom-2 right-6 h-8 px-3 bg-card/90 backdrop-blur-sm shadow-lg border-primary/20 hover:bg-primary/10"
                    onClick={() => {
                      setUserCanScroll(true);
                      scrollToBottom();
                    }}
                  >
                    ↓ New messages
                  </Button>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-border/50 bg-card/50 backdrop-blur-sm flex-shrink-0">
                <div className="flex space-x-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={isTyping ? "AI is thinking... 🤔" : "Ask about beekeeping... 🍯"}
                    className="flex-1 bg-input-background border-border/50 focus:border-primary/50 transition-colors"
                    disabled={isTyping}
                    autoFocus={!isTyping}
                    style={{ fontFamily: 'var(--font-family-primary)' }}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                {isTyping && (
                  <div className="text-xs text-muted-foreground mt-2 text-center" style={{ fontFamily: 'var(--font-family-primary)' }}>
                    🐝 Bee AI is buzzing with ideas...
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
