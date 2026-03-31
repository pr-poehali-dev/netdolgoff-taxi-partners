import Icon from "@/components/ui/icon";
import { TabId } from "@/pages/Index";

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs = [
  { id: "home" as TabId, label: "Главная", icon: "Home" },
  { id: "referral" as TabId, label: "Рефералы", icon: "Share2" },
  { id: "finance" as TabId, label: "Финансы", icon: "Wallet" },
  { id: "knowledge" as TabId, label: "Обучение", icon: "BookOpen" },
  { id: "ai" as TabId, label: "ИИ", icon: "Bot" },
  { id: "chat" as TabId, label: "Куратор", icon: "MessageCircle" },
  { id: "profile" as TabId, label: "Профиль", icon: "User" },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-nd-border z-50 shadow-lg">
      <div className="flex items-center justify-around px-1 py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-0.5 px-1 py-1 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                isActive ? "text-nd-dark" : "text-nd-muted hover:text-nd-dark"
              }`}
            >
              <div className={`p-1.5 rounded-xl transition-all duration-200 ${isActive ? "bg-nd-yellow" : ""}`}>
                <Icon name={tab.icon} size={18} className={isActive ? "text-nd-dark" : "text-nd-muted"} />
              </div>
              <span className="text-[10px] font-semibold truncate w-full text-center leading-none">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
