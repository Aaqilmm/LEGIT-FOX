import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FoxMascot } from '@/components/branding/FoxMascot';

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('legit-welcome-seen');
    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('legit-welcome-seen', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-300">
        <CardHeader className="relative pb-0">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="flex justify-center pt-6">
            <FoxMascot variant="welcome" size="xl" />
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-4 pt-6">
          <div>
            <CardTitle className="text-2xl mb-2 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 dark:from-amber-400 dark:via-amber-300 dark:to-amber-400 bg-clip-text text-transparent">
              Welcome to Legit Fox! 🦊
            </CardTitle>
            <p className="text-foreground/80">
              Your intelligent companion for navigating the grievance resolution process with ease
              and confidence.
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 space-y-3">
            <p className="font-medium text-amber-900 dark:text-amber-400 text-base">
              How Legit Fox Can Help You:
            </p>
            <div className="space-y-2 text-sm text-left text-foreground">
              <div className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 mt-0.5 font-bold">•</span>
                <span>
                  <strong className="text-amber-900 dark:text-amber-300">Get Instant Answers</strong> - Ask any questions about complaint
                  categories, required documents, and official procedures
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 mt-0.5 font-bold">•</span>
                <span>
                  <strong className="text-amber-900 dark:text-amber-300">Rephrase & Clarify</strong> - Help articulate your concerns clearly and
                  professionally
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 mt-0.5 font-bold">•</span>
                <span>
                  <strong className="text-amber-900 dark:text-amber-300">Check Completeness</strong> - Ensure you have all necessary information
                  before filing
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 mt-0.5 font-bold">•</span>
                <span>
                  <strong className="text-amber-900 dark:text-amber-300">Learn from Examples</strong> - Understand how similar cases were resolved
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-foreground/70">
              Find the chatbot in the bottom-right corner whenever you need assistance!
            </p>
            <Button onClick={handleClose} className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white" size="lg">
              Get Started
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
