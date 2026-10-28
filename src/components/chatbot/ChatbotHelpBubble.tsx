import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function ChatbotHelpBubble() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen the bubble before
    const hasSeenBubble = localStorage.getItem('hasSeenChatbotBubble');

    if (!hasSeenBubble) {
      // Show bubble after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleClick = () => {
      setIsVisible(false);
      localStorage.setItem('hasSeenChatbotBubble', 'true');
    };

    // Add click listener to entire document
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="relative bg-gradient-to-r from-primary to-primary/90 dark:from-amber-600 dark:to-amber-500 text-white rounded-2xl shadow-2xl p-4 max-w-xs">
        {/* Arrow pointing to chatbot */}
        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-primary dark:bg-amber-500 rotate-45" />

        <div className="flex items-start gap-3">
          <div className="text-2xl">🦊</div>
          <div className="flex-1">
            <p className="text-sm font-medium leading-relaxed">
              Need help? Use the chatbot for any questions or guidance while filing your case!
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
              localStorage.setItem('hasSeenChatbotBubble', 'true');
            }}
            className="flex-shrink-0 hover:bg-white/20 rounded p-1 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-2 text-xs opacity-90">
          Click anywhere to dismiss
        </div>
      </div>
    </div>
  );
}
