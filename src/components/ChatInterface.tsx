import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Send, Upload, FileText, Image, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import MessageBubble from './MessageBubble';
import FileUpload from './FileUpload';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  files?: { name: string; type: string; url: string }[];
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your Drug Discovery AI Assistant. I can help you with drug development research, molecular analysis, clinical trial design, and more. You can send me text questions, upload documents, or share molecular structure images.",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response - replace with actual RAG API call
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I've analyzed your query about "${input}". Based on the biomedical knowledge graph and recent literature, here are the key insights:\n\n• Molecular interactions and pathways relevant to your research\n• Potential drug targets and compounds\n• Clinical trial considerations\n• Safety and efficacy data\n\nWould you like me to elaborate on any specific aspect or provide more detailed molecular analysis?`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleFileUpload = (files: File[]) => {
    const fileData = files.map(file => ({
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file)
    }));

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: `Uploaded ${files.length} file(s) for analysis`,
      timestamp: new Date(),
      files: fileData
    };

    setMessages(prev => [...prev, userMessage]);
    setShowFileUpload(false);
    setIsLoading(true);

    // Simulate file processing
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I've successfully processed your uploaded files. Here's my analysis:\n\n• Document structure and key findings extracted\n• Relevant molecular data identified\n• Cross-references with knowledge graph completed\n• Insights and recommendations generated\n\nThe files contain valuable information that I've integrated into our research context.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-subtle">
      {/* Chat Messages */}
      <ScrollArea 
        ref={scrollAreaRef}
        className="flex-1 p-4 space-y-4"
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <Card className="bg-gradient-card shadow-card p-4 max-w-xs">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="animate-typing text-sm">Analyzing with RAG AI</span>
              </div>
            </Card>
          </div>
        )}
      </ScrollArea>

      {/* File Upload Modal */}
      {showFileUpload && (
        <div className="p-4 border-t bg-card">
          <FileUpload onUpload={handleFileUpload} onCancel={() => setShowFileUpload(false)} />
        </div>
      )}

      {/* Input Area */}
      <Card className="m-4 p-4 bg-gradient-card shadow-molecular">
        <div className="flex items-end space-x-2">
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFileUpload(!showFileUpload)}
              className={cn(
                "transition-smooth",
                showFileUpload && "bg-primary text-primary-foreground"
              )}
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about drug discovery, molecular analysis, clinical trials..."
              className="pr-12 transition-smooth focus:shadow-glow"
              disabled={isLoading}
            />
          </div>
          
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="bg-gradient-primary hover:shadow-glow transition-bounce"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
          <span>Powered by RAG + Knowledge Graphs</span>
          <Badge variant="secondary" className="text-xs">
            {messages.length - 1} messages
          </Badge>
        </div>
      </Card>
    </div>
  );
};

export default ChatInterface;