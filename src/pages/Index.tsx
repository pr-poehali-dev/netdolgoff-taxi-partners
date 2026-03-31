import { useState } from "react";
import HomePage from "@/components/pages/HomePage";
import ReferralPage from "@/components/pages/ReferralPage";
import FinancePage from "@/components/pages/FinancePage";
import WithdrawPage from "@/components/pages/WithdrawPage";
import KnowledgePage from "@/components/pages/KnowledgePage";
import AiAssistantPage from "@/components/pages/AiAssistantPage";
import ChatPage from "@/components/pages/ChatPage";
import ProfilePage from "@/components/pages/ProfilePage";
import BottomNav from "@/components/BottomNav";

export type TabId = "home" | "referral" | "finance" | "withdraw" | "knowledge" | "ai" | "chat" | "profile";

export default function Index() {
  const [activeTab, setActiveTab] = useState<TabId>("home");

  const navigateTo = (tab: TabId) => setActiveTab(tab);

  const renderPage = () => {
    switch (activeTab) {
      case "home": return <HomePage onNavigate={navigateTo} />;
      case "referral": return <ReferralPage />;
      case "finance": return <FinancePage onNavigate={navigateTo} />;
      case "withdraw": return <WithdrawPage />;
      case "knowledge": return <KnowledgePage />;
      case "ai": return <AiAssistantPage />;
      case "chat": return <ChatPage />;
      case "profile": return <ProfilePage />;
      default: return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto relative shadow-2xl">
      <div className="flex-1 overflow-y-auto pb-20">
        <div key={activeTab} className="animate-fade-in">
          {renderPage()}
        </div>
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
