import Icon from "@/components/ui/icon";
import { TabId } from "@/pages/Index";

interface HomePageProps {
  onNavigate: (tab: TabId) => void;
}

const steps = [
  { num: "1", text: "Рассказываешь пассажиру о списании долгов" },
  { num: "2", text: "Делишься реферальной ссылкой или QR-кодом" },
  { num: "3", text: "Клиент подписывает договор с Нетдолгофф" },
  { num: "4", text: "Ты получаешь от 10 000 ₽ на карту" },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="flex flex-col">
      {/* Header yellow */}
      <div className="px-4 pt-10 pb-6 nd-gradient relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-44 h-44 rounded-full bg-black/5" />
        <div className="absolute -bottom-10 -left-8 w-56 h-56 rounded-full bg-black/5" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-nd-dark/60 text-sm font-medium">Добро пожаловать,</p>
              <h1 className="text-nd-dark text-2xl font-black leading-tight">Алексей Петров</h1>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center">
              <span className="text-nd-dark text-xl font-black">А</span>
            </div>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 border border-white/70">
            <p className="text-nd-dark/60 text-xs font-medium mb-1">Доступно к выводу</p>
            <p className="text-nd-dark text-3xl font-black">21 000 ₽</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-nd-green animate-pulse" />
              <span className="text-nd-dark/70 text-xs font-medium">Следующий клиент принесёт +12 000 ₽</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Клиентов", value: "3", icon: "Users" },
            { label: "Заработано", value: "33К ₽", icon: "TrendingUp" },
            { label: "К выводу", value: "21К ₽", icon: "Wallet" },
          ].map((s) => (
            <div key={s.label} className="bg-white nd-card-glow rounded-2xl p-3 text-center">
              <div className="w-8 h-8 rounded-xl bg-nd-yellow-light flex items-center justify-center mx-auto mb-2">
                <Icon name={s.icon} size={15} className="text-nd-yellow-dark" />
              </div>
              <p className="text-nd-dark text-base font-black">{s.value}</p>
              <p className="text-nd-muted text-[10px] mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reward scale */}
      <div className="px-4 mb-4">
        <div className="bg-white nd-card-glow rounded-2xl p-4">
          <h2 className="text-nd-dark font-bold mb-3 flex items-center gap-2">
            <Icon name="Award" size={18} className="text-nd-yellow-dark" />
            Шкала вознаграждений
          </h2>
          <div className="space-y-2">
            {[10, 11, 12, 13, 14, 15].map((amount, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0 ${
                  i < 3 ? "bg-nd-yellow text-nd-dark" : "bg-nd-card2 text-nd-muted"
                }`}>
                  {i + 1}
                </div>
                <div className="flex-1 bg-nd-card2 rounded-lg h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-lg ${i < 3 ? "nd-gradient" : ""}`}
                    style={{ width: i < 3 ? "100%" : "0%" }}
                  />
                </div>
                <span className={`text-sm font-bold w-20 text-right ${i < 3 ? "text-nd-yellow-dark" : "text-nd-muted"}`}>
                  {amount} 000 ₽
                </span>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 bg-nd-yellow-light rounded-xl border border-nd-yellow/40">
            <p className="text-nd-yellow-dark text-xs font-semibold">
              🏆 Бонус месяца: 3+ клиента за месяц = +50 000 ₽
            </p>
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 mb-4">
        <h2 className="text-nd-dark font-bold mb-3">Быстрые действия</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { tab: "referral" as TabId, icon: "QrCode", label: "Мой QR-код", sub: "Поделиться с пассажиром", bg: "bg-nd-yellow-light", ic: "text-nd-yellow-dark" },
            { tab: "finance" as TabId, icon: "CreditCard", label: "Вывести деньги", sub: "На вашу карту", bg: "bg-green-50", ic: "text-nd-green" },
            { tab: "ai" as TabId, icon: "Bot", label: "ИИ-ассистент", sub: "Ответы на вопросы", bg: "bg-blue-50", ic: "text-blue-500" },
            { tab: "chat" as TabId, icon: "MessageCircle", label: "Чат с куратором", sub: "Живой юрист", bg: "bg-purple-50", ic: "text-purple-500" },
          ].map((item) => (
            <button
              key={item.tab}
              onClick={() => onNavigate(item.tab)}
              className="bg-white nd-card-glow rounded-2xl p-4 text-left hover-scale"
            >
              <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                <Icon name={item.icon} size={20} className={item.ic} />
              </div>
              <p className="text-nd-dark font-semibold text-sm">{item.label}</p>
              <p className="text-nd-muted text-xs mt-0.5">{item.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="px-4 mb-4">
        <h2 className="text-nd-dark font-bold mb-3">Как это работает</h2>
        <div className="space-y-2">
          {steps.map((s) => (
            <div key={s.num} className="flex items-start gap-3 bg-white nd-card-glow rounded-xl p-3">
              <div className="w-7 h-7 rounded-lg bg-nd-yellow flex items-center justify-center flex-shrink-0">
                <span className="text-nd-dark text-xs font-black">{s.num}</span>
              </div>
              <p className="text-nd-dark text-sm leading-snug pt-0.5">{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* About company dark block */}
      <div className="px-4 mb-6">
        <div className="nd-dark-gradient rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-nd-yellow flex items-center justify-center">
              <Icon name="Shield" size={18} className="text-nd-dark" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">О компании Нетдолгофф</p>
              <p className="text-white/50 text-xs">Работаем с 2015 года · ФЗ №127</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { v: "10 000+", l: "закрытых дел" },
              { v: "150+", l: "юристов" },
              { v: "РФ", l: "Работаем по всей России" },
            ].map((s) => (
              <div key={s.l} className="bg-white/10 rounded-xl py-3">
                <p className="text-nd-yellow font-black text-xl">{s.v}</p>
                <p className="text-white/50 text-[10px] mt-0.5">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}