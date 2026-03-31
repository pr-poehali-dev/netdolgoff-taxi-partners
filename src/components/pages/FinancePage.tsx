import Icon from "@/components/ui/icon";
import { TabId } from "@/pages/Index";

interface FinancePageProps {
  onNavigate: (tab: TabId) => void;
}

const transactions = [
  { id: 1, client: "Клиент #3", date: "28 марта 2026", amount: 12000, status: "paid", num: 3 },
  { id: 2, client: "Клиент #2", date: "15 марта 2026", amount: 11000, status: "paid", num: 2 },
  { id: 3, client: "Клиент #1", date: "3 марта 2026", amount: 10000, status: "withdrawn", num: 1 },
];

const statusLabels: Record<string, { label: string; color: string }> = {
  paid: { label: "Начислено", color: "text-nd-green bg-nd-green/10" },
  pending: { label: "В обработке", color: "text-nd-yellow bg-nd-yellow/10" },
  withdrawn: { label: "Выведено", color: "text-nd-muted bg-nd-border/30" },
};

export default function FinancePage({ onNavigate }: FinancePageProps) {
  const available = 21000;
  const total = 33000;
  const withdrawn = 10000;
  const nextBonus = 12000;
  const clientsCount = 3;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-4 pt-10 pb-5">
        <h1 className="text-2xl font-black text-foreground">Финансы</h1>
        <p className="text-nd-muted text-sm mt-1">История начислений и баланс</p>
      </div>

      {/* Balance card */}
      <div className="px-4 mb-4">
        <div className="nd-gradient rounded-2xl p-5 relative overflow-hidden nd-red-glow">
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/5" />
          <div className="relative z-10">
            <p className="text-white/70 text-sm font-medium">Доступно к выводу</p>
            <p className="text-white text-4xl font-black mt-1">{available.toLocaleString("ru-RU")} ₽</p>
            <div className="flex gap-4 mt-4">
              <div>
                <p className="text-white/60 text-xs">Заработано</p>
                <p className="text-white font-bold">{total.toLocaleString("ru-RU")} ₽</p>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <p className="text-white/60 text-xs">Выведено</p>
                <p className="text-white font-bold">{withdrawn.toLocaleString("ru-RU")} ₽</p>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <p className="text-white/60 text-xs">Клиентов</p>
                <p className="text-white font-bold">{clientsCount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Withdraw button */}
      <div className="px-4 mb-4">
        <button
          onClick={() => onNavigate("withdraw")}
          className="w-full py-4 rounded-2xl bg-nd-card nd-card-glow border border-nd-border text-foreground font-bold flex items-center justify-center gap-2 hover-scale"
        >
          <Icon name="CreditCard" size={18} className="text-nd-red" />
          Вывести {available.toLocaleString("ru-RU")} ₽ на карту
          <Icon name="ChevronRight" size={16} className="text-nd-muted" />
        </button>
      </div>

      {/* Monthly bonus progress */}
      <div className="px-4 mb-4">
        <div className="bg-nd-card nd-card-glow rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="Trophy" size={16} className="text-nd-yellow" />
              <p className="text-foreground font-semibold text-sm">Бонус месяца</p>
            </div>
            <span className="status-badge text-nd-green bg-nd-green/10">3/3 клиента</span>
          </div>
          <div className="bg-nd-card2 rounded-lg h-2.5 overflow-hidden mb-2">
            <div className="h-full nd-gradient rounded-lg" style={{ width: "100%" }} />
          </div>
          <p className="text-nd-muted text-xs">
            🎉 Условие выполнено! Вам начислено <span className="text-nd-yellow font-bold">50 000 ₽</span> — бонус за 3 клиента в марте
          </p>
        </div>
      </div>

      {/* Next client bonus */}
      <div className="px-4 mb-4">
        <div className="bg-nd-card nd-card-glow rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-nd-red/10 flex items-center justify-center flex-shrink-0">
            <Icon name="Zap" size={18} className="text-nd-red" />
          </div>
          <div className="flex-1">
            <p className="text-foreground font-semibold text-sm">Следующий клиент</p>
            <p className="text-nd-muted text-xs">4-й клиент принесёт</p>
          </div>
          <p className="text-nd-red font-black text-xl">+{nextBonus.toLocaleString("ru-RU")} ₽</p>
        </div>
      </div>

      {/* Transactions */}
      <div className="px-4 mb-6">
        <h2 className="text-foreground font-bold mb-3 flex items-center gap-2">
          <Icon name="Receipt" size={16} className="text-nd-muted" />
          История начислений
        </h2>
        <div className="space-y-2">
          {transactions.map((t) => {
            const st = statusLabels[t.status];
            return (
              <div key={t.id} className="bg-nd-card nd-card-glow rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-nd-card2 flex items-center justify-center flex-shrink-0">
                  <span className="text-nd-muted text-xs font-bold">#{t.num}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-semibold text-sm">{t.client}</p>
                  <p className="text-nd-muted text-xs">{t.date}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-sm ${t.status === "withdrawn" ? "text-nd-muted" : "text-nd-green"}`}>
                    +{t.amount.toLocaleString("ru-RU")} ₽
                  </p>
                  <span className={`status-badge ${st.color}`}>{st.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
