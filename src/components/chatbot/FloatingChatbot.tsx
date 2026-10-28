import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { FoxMascot } from '@/components/branding/FoxMascot';
import { cn } from '@/utils/cn';

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { role: 'user', content: input }]);

    // Demo response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'This is a demo assistant response. In the production version, this will connect to the Gemini API through the backend to provide intelligent responses based on verified regulatory sources and historical cases. How else can I help you?',
        },
      ]);
    }, 500);

    setInput('');
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 h-16 w-16 rounded-full bg-primary shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center border-4 border-background p-1"
        >
          <img
            src="/mascot/legit-fox-avatar.png"
            alt="Chat with Legit Fox"
            className="h-full w-full object-contain rounded-full"
          />
        </button>
      )}

      {/* Chat Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-full sm:w-96 bg-background border-l shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-3">
            <FoxMascot variant="avatar" size="sm" />
            <div>
              <div className="font-semibold">Legit Fox Assistant</div>
              <div className="text-xs text-muted-foreground">Ask me anything</div>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <FoxMascot variant="full" size="lg" className="mx-auto" />
              <div>
                <p className="font-medium">Hello! I'm Legit Fox 🦊</p>
                <p className="text-sm text-muted-foreground mt-2">
                  I can help you with understanding complaint categories, required documents, and
                  procedures. What would you like to know?
                </p>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p>Try asking:</p>
                <div className="space-y-1">
                  <button
                    onClick={() =>
                      setInput('What documents do I need for a document retention complaint?')
                    }
                    className="block w-full p-2 text-left bg-muted rounded hover:bg-muted/80 transition-colors"
                  >
                    "What documents do I need?"
                  </button>
                  <button
                    onClick={() => setInput('How do I file a complaint?')}
                    className="block w-full p-2 text-left bg-muted rounded hover:bg-muted/80 transition-colors"
                  >
                    "How do I file a complaint?"
                  </button>
                  <button
                    onClick={() => setInput('What are the different complaint categories?')}
                    className="block w-full p-2 text-left bg-muted rounded hover:bg-muted/80 transition-colors"
                  >
                    "What are complaint categories?"
                  </button>
                </div>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && <FoxMascot variant="avatar" size="sm" />}
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t bg-card">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="flex-1"
            />
            <Button onClick={handleSend} size="icon" disabled={!input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            This assistant provides guidance only. Not legal advice.
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 sm:hidden"
        />
      )}
    </>
  );
}
