import { useState } from "react";
import Icon from "@/components/ui/icon";

const menuItems = [
  { icon: "Bell", label: "Уведомления", badge: "2" },
  { icon: "Shield", label: "Безопасность", badge: null },
  { icon: "CreditCard", label: "Мои карты", badge: null },
  { icon: "FileText", label: "Документы и договор", badge: null },
  { icon: "HelpCircle", label: "FAQ и поддержка", badge: null },
  { icon: "MessageCircle", label: "Написать в поддержку", badge: null },
];

const achievements = [
  { icon: "🏅", title: "Первый клиент", desc: "Вы привлекли первого клиента", done: true },
  { icon: "🎯", title: "Тройка!", desc: "3 клиента в одном месяце", done: true },
  { icon: "🚀", title: "5 клиентов", desc: "Привлекли 5 клиентов", done: false },
  { icon: "💎", title: "Топ партнёр", desc: "10+ клиентов всего", done: false },
];

export default function ProfilePage() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex flex-col">
      {/* Header + Avatar */}
      <div className="px-4 pt-10 pb-6 bg-nd-card border-b border-nd-border">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-nd-red to-red-900 flex items-center justify-center">
              <span className="text-white text-2xl font-black">А</span>
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-nd-card2 border border-nd-border flex items-center justify-center">
              <Icon name="Camera" size={12} className="text-nd-muted" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-foreground text-xl font-black">Алексей Петров</h2>
            <p className="text-nd-muted text-sm">+7 (916) 234-56-78</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Icon name="MapPin" size={12} className="text-nd-muted" />
              <p className="text-nd-muted text-xs">Москва • ID: #AP2847</p>
            </div>
          </div>
        </div>

        {/* Partner level */}
        <div className="mt-4 bg-background rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-nd-yellow/20 flex items-center justify-center">
            <span className="text-lg">⭐</span>
          </div>
          <div className="flex-1">
            <p className="text-foreground text-sm font-semibold">Партнёр Серебро</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 bg-nd-border rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-nd-yellow rounded-full" style={{ width: "60%" }} />
              </div>
              <span className="text-nd-muted text-[10px]">3/5 до Золото</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Клиентов", value: "3", icon: "Users" },
            { label: "Заработано", value: "33К ₽", icon: "TrendingUp" },
            { label: "Место в топе", value: "47", icon: "Trophy" },
          ].map((s) => (
            <div key={s.label} className="bg-nd-card nd-card-glow rounded-2xl p-3 text-center">
              <Icon name={s.icon} size={16} className="text-nd-red mx-auto mb-1.5" />
              <p className="text-foreground font-black text-base">{s.value}</p>
              <p className="text-nd-muted text-[10px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4 mb-4">
        <h3 className="text-foreground font-bold mb-3">Достижения</h3>
        <div className="grid grid-cols-2 gap-2">
          {achievements.map((a) => (
            <div
              key={a.title}
              className={`bg-nd-card nd-card-glow rounded-2xl p-3 flex items-center gap-2 ${
                !a.done ? "opacity-40" : ""
              }`}
            >
              <span className="text-2xl">{a.icon}</span>
              <div>
                <p className="text-foreground text-xs font-bold">{a.title}</p>
                <p className="text-nd-muted text-[10px] leading-tight">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="px-4 mb-4">
        <h3 className="text-foreground font-bold mb-3">Настройки</h3>
        <div className="bg-nd-card nd-card-glow rounded-2xl overflow-hidden">
          {menuItems.map((item, i) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-nd-card2 transition-colors ${
                i < menuItems.length - 1 ? "border-b border-nd-border" : ""
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-nd-card2 flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} size={15} className="text-nd-muted" />
              </div>
              <span className="flex-1 text-foreground text-sm font-medium">{item.label}</span>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-nd-red text-white text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              <Icon name="ChevronRight" size={14} className="text-nd-border" />
            </button>
          ))}
        </div>
      </div>

      {/* Notification toggle */}
      <div className="px-4 mb-4">
        <div className="bg-nd-card nd-card-glow rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-nd-card2 flex items-center justify-center">
              <Icon name="Bell" size={15} className="text-nd-muted" />
            </div>
            <div>
              <p className="text-foreground text-sm font-medium">Push-уведомления</p>
              <p className="text-nd-muted text-xs">О начислениях и новостях</p>
            </div>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-all relative ${notifications ? "bg-nd-red" : "bg-nd-border"}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all ${notifications ? "left-6" : "left-0.5"}`} />
          </button>
        </div>
      </div>

      {/* About company */}
      <div className="px-4 mb-4">
        <div className="bg-nd-card nd-card-glow rounded-2xl p-4">
          <p className="text-nd-muted text-xs text-center">
            ООО «Нетдолгофф» • Партнёрская программа
          </p>
          <p className="text-nd-border text-[10px] text-center mt-1">
            Версия 1.0 • Работаем с 2015 года
          </p>
        </div>
      </div>

      {/* Logout */}
      <div className="px-4 mb-8">
        <button className="w-full py-3.5 rounded-2xl border border-nd-border text-nd-muted font-semibold text-sm flex items-center justify-center gap-2 hover:border-nd-red/50 hover:text-nd-red transition-all">
          <Icon name="LogOut" size={16} />
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
