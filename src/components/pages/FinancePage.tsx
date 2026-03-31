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
  paid: { label: "Начислено", color: "text-nd-green bg-green-500/10" },
  pending: { label: "В обработке", color: "text-yellow-600 bg-yellow-50" },
  withdrawn: { label: "Выведено", color: "text-nd-muted bg-nd-card2" },
};

export default function FinancePage({ onNavigate }: FinancePageProps) {
  return (
    <div className="flex flex-col">
      <div className="px-4 pt-5 pb-5 nd-gradient">
        <h1 className="text-2xl font-black text-nd-dark">Финансы</h1>
        <p className="text-nd-dark/60 text-sm mt-1">История начислений и баланс</p>
      </div>

      {/* Balance card */}
      <div className="px-4 mt-4 mb-4">
        <div className="nd-dark-gradient rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-white/5" />
          <div className="relative z-10">
            <p className="text-white/60 text-sm font-medium">Доступно к выводу</p>
            <p className="text-white text-4xl font-black mt-1">21 000 ₽</p>
            <div className="flex gap-5 mt-4">
              <div>
                <p className="text-white/50 text-xs">Заработано</p>
                <p className="text-nd-yellow font-bold text-sm">33 000 ₽</p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p className="text-white/50 text-xs">Выведено</p>
                <p className="text-white font-bold text-sm">10 000 ₽</p>
              </div>
              <div className="w-px bg-white/10" />
              <div>
                <p className="text-white/50 text-xs">Клиентов</p>
                <p className="text-white font-bold text-sm">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Withdraw CTA */}
      <div className="px-4 mb-4">
        <button
          onClick={() => onNavigate("withdraw")}
          className="w-full py-4 rounded-2xl nd-gradient text-nd-dark font-bold nd-yellow-glow flex items-center justify-center gap-2 hover-scale"
        >
          <Icon name="CreditCard" size={18} />
          Вывести 21 000 ₽ на карту
          <Icon name="ChevronRight" size={16} className="text-nd-dark/60" />
        </button>
      </div>

      {/* Monthly bonus */}
      <div className="px-4 mb-4">
        <div className="bg-nd-card nd-card-glow rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="Trophy" size={16} className="text-nd-yellow-dark" />
              <p className="text-foreground font-semibold text-sm">Бонус месяца</p>
            </div>
            <span className="status-badge text-nd-green bg-green-500/10">3/3 клиента</span>
          </div>
          <div className="bg-nd-card2 rounded-lg h-2.5 overflow-hidden mb-2">
            <div className="h-full nd-gradient rounded-lg w-full" />
          </div>
          <p className="text-nd-muted text-xs">
            🎉 Условие выполнено! Начислен бонус <span className="text-nd-yellow-dark font-bold">50 000 ₽</span> за 3 клиента в марте
          </p>
        </div>
      </div>

      {/* Next client */}
      <div className="px-4 mb-4">
        <div className="bg-nd-yellow-light border border-nd-yellow/40 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-nd-yellow flex items-center justify-center flex-shrink-0">
            <Icon name="Zap" size={18} className="text-nd-dark" />
          </div>
          <div className="flex-1">
            <p className="text-nd-dark font-semibold text-sm">Следующий клиент</p>
            <p className="text-nd-dark/60 text-xs">4-й клиент принесёт</p>
          </div>
          <p className="text-nd-yellow-dark dark:text-nd-yellow font-black text-xl">+12 000 ₽</p>
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