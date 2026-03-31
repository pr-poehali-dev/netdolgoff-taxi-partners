import { useState } from "react";
import Icon from "@/components/ui/icon";

const savedCards = [
  { id: 1, mask: "**** **** **** 4521", bank: "Сбербанк", color: "from-green-500 to-green-700" },
  { id: 2, mask: "**** **** **** 7834", bank: "Тинькофф", color: "from-yellow-400 to-yellow-600" },
];

export default function WithdrawPage() {
  const [selectedCard, setSelectedCard] = useState(1);
  const [amount, setAmount] = useState("21000");
  const [success, setSuccess] = useState(false);
  const available = 21000;

  const handleWithdraw = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3500);
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 animate-fade-in bg-background">
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
          <Icon name="CheckCircle" size={40} className="text-nd-green" />
        </div>
        <h2 className="text-2xl font-black text-nd-dark mb-2 text-center">Заявка отправлена!</h2>
        <p className="text-nd-muted text-sm text-center">Деньги поступят на карту в течение 1–3 рабочих дней</p>
        <div className="mt-8 bg-white nd-card-glow rounded-2xl p-4 w-full max-w-xs">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-nd-muted">Сумма</span>
            <span className="text-nd-dark font-bold">{parseInt(amount).toLocaleString("ru-RU")} ₽</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-nd-muted">Карта</span>
            <span className="text-nd-dark font-bold">{savedCards.find(c => c.id === selectedCard)?.mask}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="px-4 pt-5 pb-5 nd-gradient">
        <h1 className="text-2xl font-black text-nd-dark">Вывод средств</h1>
        <p className="text-nd-dark/60 text-sm mt-1">Переводим напрямую на вашу карту</p>
      </div>

      {/* Available */}
      <div className="px-4 mt-4 mb-5">
        <div className="bg-white nd-card-glow rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-nd-muted text-xs">Доступно к выводу</p>
            <p className="text-nd-dark text-2xl font-black">{available.toLocaleString("ru-RU")} ₽</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
            <Icon name="Wallet" size={22} className="text-nd-green" />
          </div>
        </div>
      </div>

      {/* Amount input */}
      <div className="px-4 mb-5">
        <p className="text-nd-muted text-xs font-semibold uppercase tracking-wider mb-2">Сумма вывода</p>
        <div className="bg-white nd-card-glow rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              max={available}
              className="flex-1 bg-transparent text-nd-dark text-3xl font-black outline-none placeholder:text-nd-border"
              placeholder="0"
            />
            <span className="text-nd-muted text-2xl font-bold">₽</span>
          </div>
          <div className="flex gap-2 mt-3">
            {[5000, 10000, available].map((v) => (
              <button
                key={v}
                onClick={() => setAmount(String(v))}
                className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  parseInt(amount) === v
                    ? "nd-gradient text-nd-dark"
                    : "bg-nd-card2 text-nd-muted border border-nd-border"
                }`}
              >
                {v === available ? "Всё" : `${(v / 1000).toFixed(0)} 000`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Card selection */}
      <div className="px-4 mb-5">
        <p className="text-nd-muted text-xs font-semibold uppercase tracking-wider mb-2">Карта для вывода</p>
        <div className="space-y-2">
          {savedCards.map((card) => (
            <button
              key={card.id}
              onClick={() => setSelectedCard(card.id)}
              className={`w-full bg-white nd-card-glow rounded-2xl p-4 flex items-center gap-3 border-2 transition-all ${
                selectedCard === card.id ? "border-nd-yellow" : "border-transparent"
              }`}
            >
              <div className={`w-12 h-8 rounded-lg bg-gradient-to-r ${card.color} flex items-center justify-center`}>
                <Icon name="CreditCard" size={14} className="text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-nd-dark font-semibold text-sm">{card.mask}</p>
                <p className="text-nd-muted text-xs">{card.bank}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                selectedCard === card.id ? "border-nd-yellow bg-nd-yellow" : "border-nd-border"
              }`}>
                {selectedCard === card.id && <Icon name="Check" size={10} className="text-nd-dark" />}
              </div>
            </button>
          ))}
          <button className="w-full bg-white nd-card-glow rounded-2xl p-4 flex items-center gap-3 border-2 border-dashed border-nd-border">
            <div className="w-12 h-8 rounded-lg bg-nd-card2 flex items-center justify-center">
              <Icon name="Plus" size={16} className="text-nd-muted" />
            </div>
            <p className="text-nd-muted text-sm font-medium">Добавить карту</p>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-4 mb-5">
        <div className="bg-nd-yellow-light rounded-xl p-3 border border-nd-yellow/30 flex gap-2">
          <Icon name="Info" size={14} className="text-nd-yellow-dark flex-shrink-0 mt-0.5" />
          <p className="text-nd-dark/70 text-xs leading-relaxed">
            Вывод средств производится в течение 1–3 рабочих дней. Минимальная сумма — 1 000 ₽.
          </p>
        </div>
      </div>

      <div className="px-4 mb-8">
        <button
          onClick={handleWithdraw}
          disabled={!amount || parseInt(amount) < 1000 || parseInt(amount) > available}
          className="w-full py-4 rounded-2xl nd-gradient text-nd-dark font-bold text-base nd-yellow-glow hover-scale disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Вывести {amount ? parseInt(amount).toLocaleString("ru-RU") : 0} ₽
        </button>
      </div>
    </div>
  );
}