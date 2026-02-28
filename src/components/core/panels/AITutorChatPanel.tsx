"use client";

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

export function AITutorChatPanel() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "ai"; content: string }>>([
    {
      role: "ai",
      content: "Hello! I'm your AI learning tutor. Click on floating knowledge crystals, and I can explain related knowledge content for you."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const responses = [
        'That\'s a great question! Let me explain...',
        'I understand your question. This involves core concepts of machine learning...',
        'From a technical perspective, this question involves...',
        'Let me explain in a simple way...'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: "ai", content: randomResponse + '\n\n(This is a demo response, actual AI API integration can be added)' }]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 scroll-thin pb-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`animate-message-in ${
              message.role === "user" 
                ? "ml-auto bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl rounded-br-sm" 
                : "bg-indigo-500/20 border border-indigo-500/30 text-gray-200 rounded-2xl rounded-bl-sm"
            }`}
            style={{
              maxWidth: '85%',
              padding: '12px 16px',
              marginBottom: '12px'
            }}
          >
            <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
          </div>
        ))}
        
        {isLoading && (
          <div 
            className="animate-message-in bg-indigo-500/20 border border-indigo-500/30 rounded-2xl rounded-bl-sm"
            style={{
              maxWidth: '85%',
              padding: '12px 16px',
              marginBottom: '12px'
            }}
          >
            <span className="text-gray-300 text-sm typing-cursor">Thinking</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question..."
            rows={1}
            className="flex-1 chat-input resize-none"
            style={{
              background: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '12px 16px',
              color: '#e2e8f0',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '14px'
            }}
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="px-4 py-3 rounded-xl text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
            }}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
