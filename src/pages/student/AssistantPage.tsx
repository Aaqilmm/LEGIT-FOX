import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FoxMascot } from '@/components/branding/FoxMascot';
import { DemoModeAlert } from '@/components/common/DemoModeBadge';

export function AssistantPage() {
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
            'This is a demo assistant response. In the production version, this will connect to the Gemini API through the backend to provide intelligent responses based on verified regulatory sources and historical cases. The assistant will help you understand complaint categories, required information, and relevant procedures.',
        },
      ]);
    }, 500);

    setInput('');
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Grievance Assistant</h1>
        <p className="text-muted-foreground mt-2">
          Ask questions about complaint procedures and requirements
        </p>
      </div>

      <DemoModeAlert />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <FoxMascot variant="avatar" size="sm" />
            <div>
              <CardTitle>Legit Fox Assistant</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Here to help you understand the complaint process
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Chat Messages */}
            <div className="min-h-[400px] max-h-[500px] overflow-y-auto space-y-4 p-4 border rounded-lg bg-muted/30">
              {messages.length === 0 ? (
                <div className="text-center py-12 space-y-4">
                  <FoxMascot variant="full" size="lg" className="mx-auto" />
                  <div>
                    <p className="font-medium">Hello! How can I help you today?</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Try asking about complaint categories, required documents, or procedures.
                    </p>
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
                      className={`max-w-[80%] p-3 rounded-lg ${
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
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>

            <div className="text-xs text-muted-foreground">
              <strong>Note:</strong> This assistant provides guidance only. Always verify official
              requirements through authorized AICTE channels. Responses are not legal advice.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
