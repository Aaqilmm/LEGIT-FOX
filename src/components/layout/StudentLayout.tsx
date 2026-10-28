import { Outlet } from 'react-router-dom';
import { TopNavbar } from './TopNavbar';
import { FloatingChatbot } from '@/components/chatbot/FloatingChatbot';
import { ChatbotHelpBubble } from '@/components/chatbot/ChatbotHelpBubble';
import { WelcomeModal } from '@/components/common/WelcomeModal';

export function StudentLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopNavbar variant="student" />
      <main className="flex-1">
        <Outlet />
      </main>
      <FloatingChatbot />
      <ChatbotHelpBubble />
      <WelcomeModal />
    </div>
  );
}
