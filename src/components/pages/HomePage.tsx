import Icon from "@/components/ui/icon";
import { TabId } from "@/pages/Index";

interface HomePageProps {
  onNavigate: (tab: TabId) => void;
}

const stats = [
  { label: "Привлечено клиентов", value: "3", icon: "Users" },
  { label: "Заработано всего", value: "33 000 ₽", icon: "TrendingUp" },
  { label: "Доступно к выводу", value: "21 000 ₽", icon: "Wallet" },
];

const steps = [
  { num: "1", text: "Рассказываешь пассажиру о процедуре списания долгов" },
  { num: "2", text: "Делишься реферальной ссылкой или QR-кодом" },
  { num: "3", text: "Клиент подписывает договор с Нетдолгофф" },
  { num: "4", text: "Ты получаешь от 10 000 ₽ на карту" },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-4 pt-10 pb-6 nd-gradient relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute -bottom-12 -left-8 w-52 h-52 rounded-full bg-white/5" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-white/70 text-sm font-medium">Добро пожаловать</p>
              <h1 className="text-white text-2xl font-bold leading-tight">Алексей Петров</h1>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <span className="text-white text-xl font-bold">А</span>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <p className="text-white/70 text-xs font-medium mb-1">Баланс доступен к выводу</p>
            <p className="text-white text-3xl font-black">21 000 ₽</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-nd-green animate-pulse" />
              <span className="text-white/80 text-xs">Следующий клиент: +12 000 ₽</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 -mt-1">
        <div className="grid grid-cols-3 gap-2 py-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-nd-card nd-card-glow rounded-2xl p-3 text-center">
              <div className="w-8 h-8 rounded-xl bg-nd-red/10 flex items-center justify-center mx-auto mb-2">
                <Icon name={s.icon} size={16} className="text-nd-red" />
              </div>
              <p className="text-foreground text-base font-bold">{s.value}</p>
              <p className="text-nd-muted text-[10px] leading-tight mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reward scale */}
      <div className="px-4 mb-4">
        <div className="bg-nd-card nd-card-glow rounded-2xl p-4">
          <h2 className="text-foreground font-bold mb-3 flex items-center gap-2">
            <Icon name="Award" size={18} className="text-nd-yellow" />
            Шкала вознаграждений
          </h2>
          <div className="space-y-2">
            {[10,11,12,13,14,15].map((amount, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  i < 3 ? "bg-nd-red text-white" : "bg-nd-card2 text-nd-muted"
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1 bg-nd-card2 rounded-lg h-2 relative overflow-hidden">
                  <div
                    className={`h-full rounded-lg transition-all ${i < 3 ? "bg-nd-red" : "bg-nd-border"}`}
                    style={{ width: i < 3 ? "100%" : "0%" }}
                  />
                </div>
                <span className={`text-sm font-bold w-20 text-right ${i < 3 ? "text-nd-red" : "text-nd-muted"}`}>
                  {amount} 000 ₽
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 bg-nd-yellow/10 rounded-xl border border-nd-yellow/20">
            <p className="text-nd-yellow text-xs font-semibold">🏆 Бонус месяца: 3+ клиента за месяц = +50 000 ₽</p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 mb-4">
        <h2 className="text-foreground font-bold mb-3">Быстрые действия</h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onNavigate("referral")}
            className="bg-nd-card nd-card-glow rounded-2xl p-4 text-left hover-scale active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-nd-red/10 flex items-center justify-center mb-3">
              <Icon name="QrCode" size={20} className="text-nd-red" />
            </div>
            <p className="text-foreground font-semibold text-sm">Мой QR-код</p>
            <p className="text-nd-muted text-xs mt-0.5">Поделиться с пассажиром</p>
          </button>
          <button
            onClick={() => onNavigate("finance")}
            className="bg-nd-card nd-card-glow rounded-2xl p-4 text-left hover-scale active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-nd-green/10 flex items-center justify-center mb-3">
              <Icon name="CreditCard" size={20} className="text-nd-green" />
            </div>
            <p className="text-foreground font-semibold text-sm">Вывести деньги</p>
            <p className="text-nd-muted text-xs mt-0.5">На вашу карту</p>
          </button>
          <button
            onClick={() => onNavigate("ai")}
            className="bg-nd-card nd-card-glow rounded-2xl p-4 text-left hover-scale active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
              <Icon name="Bot" size={20} className="text-blue-400" />
            </div>
            <p className="text-foreground font-semibold text-sm">ИИ-ассистент</p>
            <p className="text-nd-muted text-xs mt-0.5">Ответы на вопросы</p>
          </button>
          <button
            onClick={() => onNavigate("chat")}
            className="bg-nd-card nd-card-glow rounded-2xl p-4 text-left hover-scale active:scale-95 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center mb-3">
              <Icon name="MessageCircle" size={20} className="text-purple-400" />
            </div>
            <p className="text-foreground font-semibold text-sm">Чат с куратором</p>
            <p className="text-nd-muted text-xs mt-0.5">Живой юрист</p>
          </button>
        </div>
      </div>

      {/* How it works */}
      <div className="px-4 mb-6">
        <h2 className="text-foreground font-bold mb-3">Как это работает</h2>
        <div className="space-y-2">
          {steps.map((s) => (
            <div key={s.num} className="flex items-start gap-3 bg-nd-card nd-card-glow rounded-xl p-3">
              <div className="w-7 h-7 rounded-lg bg-nd-red flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">{s.num}</span>
              </div>
              <p className="text-foreground text-sm leading-snug pt-0.5">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="px-4 mb-6">
        <div className="bg-nd-card nd-card-glow rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-nd-red flex items-center justify-center">
              <Icon name="Shield" size={18} className="text-white" />
            </div>
            <div>
              <p className="text-foreground font-bold text-sm">О компании Нетдолгофф</p>
              <p className="text-nd-muted text-xs">Работаем с 2015 года</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-nd-red font-black text-lg">10 000+</p>
              <p className="text-nd-muted text-[10px]">закрытых дел</p>
            </div>
            <div>
              <p className="text-nd-red font-black text-lg">150+</p>
              <p className="text-nd-muted text-[10px]">юристов</p>
            </div>
            <div>
              <p className="text-nd-red font-black text-lg">95%</p>
              <p className="text-nd-muted text-[10px]">долгов списывают</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
