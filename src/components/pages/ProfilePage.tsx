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
      {/* Yellow header */}
      <div className="px-4 pt-10 pb-6 nd-gradient relative overflow-hidden">
        <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-black/5" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-nd-dark flex items-center justify-center">
              <span className="text-nd-yellow text-2xl font-black">А</span>
            </div>
            <button className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-white border border-nd-border flex items-center justify-center">
              <Icon name="Camera" size={12} className="text-nd-muted" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className="text-nd-dark text-xl font-black">Алексей Петров</h2>
            <p className="text-nd-dark/60 text-sm">+7 (916) 234-56-78</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Icon name="MapPin" size={12} className="text-nd-dark/50" />
              <p className="text-nd-dark/50 text-xs">Москва · ID: #AP2847</p>
            </div>
          </div>
        </div>
      </div>

      {/* Partner level */}
      <div className="px-4 -mt-2 mb-4 relative z-10">
        <div className="bg-white nd-card-glow rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-nd-yellow-light flex items-center justify-center">
            <span className="text-xl">⭐</span>
          </div>
          <div className="flex-1">
            <p className="text-nd-dark text-sm font-bold">Партнёр Серебро</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 bg-nd-card2 rounded-full h-1.5 overflow-hidden">
                <div className="h-full nd-gradient rounded-full" style={{ width: "60%" }} />
              </div>
              <span className="text-nd-muted text-[10px]">3/5 до Золото</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Клиентов", value: "3", icon: "Users" },
            { label: "Заработано", value: "33К ₽", icon: "TrendingUp" },
            { label: "Место в топе", value: "47", icon: "Trophy" },
          ].map((s) => (
            <div key={s.label} className="bg-white nd-card-glow rounded-2xl p-3 text-center">
              <Icon name={s.icon} size={16} className="text-nd-yellow-dark mx-auto mb-1.5" />
              <p className="text-nd-dark font-black text-base">{s.value}</p>
              <p className="text-nd-muted text-[10px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-4 mb-4">
        <h3 className="text-nd-dark font-bold mb-3">Достижения</h3>
        <div className="grid grid-cols-2 gap-2">
          {achievements.map((a) => (
            <div
              key={a.title}
              className={`bg-white nd-card-glow rounded-2xl p-3 flex items-center gap-2 ${!a.done ? "opacity-40" : ""}`}
            >
              <span className="text-2xl">{a.icon}</span>
              <div>
                <p className="text-nd-dark text-xs font-bold">{a.title}</p>
                <p className="text-nd-muted text-[10px] leading-tight">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="px-4 mb-4">
        <h3 className="text-nd-dark font-bold mb-3">Настройки</h3>
        <div className="bg-white nd-card-glow rounded-2xl overflow-hidden">
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
              <span className="flex-1 text-nd-dark text-sm font-medium">{item.label}</span>
              {item.badge && (
                <span className="w-5 h-5 rounded-full bg-nd-yellow text-nd-dark text-[10px] font-bold flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              <Icon name="ChevronRight" size={14} className="text-nd-border" />
            </button>
          ))}
        </div>
      </div>

      {/* Push toggle */}
      <div className="px-4 mb-4">
        <div className="bg-white nd-card-glow rounded-2xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-nd-card2 flex items-center justify-center">
              <Icon name="Bell" size={15} className="text-nd-muted" />
            </div>
            <div>
              <p className="text-nd-dark text-sm font-medium">Push-уведомления</p>
              <p className="text-nd-muted text-xs">О начислениях и новостях</p>
            </div>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition-all relative ${notifications ? "nd-gradient" : "bg-nd-border"}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all shadow ${notifications ? "left-6" : "left-0.5"}`} />
          </button>
        </div>
      </div>

      {/* Company info */}
      <div className="px-4 mb-4">
        <div className="nd-dark-gradient rounded-2xl p-4 text-center">
          <p className="text-nd-yellow font-bold text-sm">НЕТДОЛГОФФ</p>
          <p className="text-white/50 text-xs mt-1">Партнёрская программа · Версия 1.0</p>
          <p className="text-white/30 text-[10px] mt-1">Работаем с 2015 года · ФЗ №127</p>
        </div>
      </div>

      <div className="px-4 mb-8">
        <button className="w-full py-3.5 rounded-2xl border-2 border-nd-border text-nd-muted font-semibold text-sm flex items-center justify-center gap-2 hover:border-nd-yellow hover:text-nd-dark transition-all">
          <Icon name="LogOut" size={16} />
          Выйти из аккаунта
        </button>
      </div>
    </div>
  );
}
