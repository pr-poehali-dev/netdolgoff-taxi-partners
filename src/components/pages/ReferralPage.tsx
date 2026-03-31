import { useState } from "react";
import Icon from "@/components/ui/icon";

const PROMO = "TAXI-AP2847";
const LINK = "https://netdolgoff.ru/ref/TAXI-AP2847";

export default function ReferralPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const share = () => {
    if (navigator.share) {
      navigator.share({
        title: "Списание долгов — Нетдолгофф",
        text: "Избавься от долгов законно! Списание до 95% задолженности.",
        url: LINK,
      });
    } else {
      copy(LINK, "link");
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-4 pt-10 pb-5">
        <h1 className="text-2xl font-black text-foreground">Реферальная программа</h1>
        <p className="text-nd-muted text-sm mt-1">Делитесь и зарабатывайте от 10 000 ₽</p>
      </div>

      {/* QR Code */}
      <div className="px-4 mb-4">
        <div className="bg-nd-card nd-card-glow rounded-2xl p-6 flex flex-col items-center">
          <div className="w-48 h-48 bg-white rounded-2xl flex items-center justify-center mb-4 p-3">
            <div className="w-full h-full grid grid-cols-7 grid-rows-7 gap-0.5">
              {Array.from({ length: 49 }).map((_, i) => {
                const corners = [0,1,2,3,4,5,6,7,13,14,20,21,27,28,29,30,31,32,33,34,40,41,42,43,44,45,46,47,48];
                const inner = [8,9,10,15,16,17,22,23,24];
                const isBlack = corners.includes(i) || inner.includes(i) || (i % 7 === 3 && i > 6 && i < 42) || Math.random() > 0.6;
                return (
                  <div
                    key={i}
                    className={`rounded-sm ${isBlack ? "bg-gray-900" : "bg-white"}`}
                  />
                );
              })}
            </div>
          </div>
          <p className="text-nd-muted text-xs text-center mb-2">Покажите пассажиру для сканирования</p>
          <div className="bg-nd-red/10 border border-nd-red/30 rounded-xl px-4 py-2">
            <p className="text-nd-red text-center font-mono font-bold text-sm">{PROMO}</p>
          </div>
        </div>
      </div>

      {/* Promo code */}
      <div className="px-4 mb-3">
        <p className="text-nd-muted text-xs font-medium uppercase tracking-wider mb-2">Промокод</p>
        <div className="bg-nd-card nd-card-glow rounded-2xl p-4 flex items-center gap-3">
          <div className="flex-1">
            <p className="text-foreground font-mono font-black text-xl">{PROMO}</p>
            <p className="text-nd-muted text-xs mt-0.5">Называйте пассажиру при звонке</p>
          </div>
          <button
            onClick={() => copy(PROMO, "promo")}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              copied === "promo"
                ? "bg-nd-green text-white"
                : "bg-nd-red text-white nd-red-glow"
            }`}
          >
            {copied === "promo" ? "✓ Скопировано" : "Копировать"}
          </button>
        </div>
      </div>

      {/* Referral link */}
      <div className="px-4 mb-4">
        <p className="text-nd-muted text-xs font-medium uppercase tracking-wider mb-2">Реферальная ссылка</p>
        <div className="bg-nd-card nd-card-glow rounded-2xl p-4">
          <p className="text-nd-muted text-xs font-mono break-all mb-3">{LINK}</p>
          <div className="flex gap-2">
            <button
              onClick={() => copy(LINK, "link")}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                copied === "link"
                  ? "bg-nd-green text-white"
                  : "bg-nd-card2 text-foreground border border-nd-border"
              }`}
            >
              <Icon name="Copy" size={14} />
              {copied === "link" ? "Скопировано" : "Копировать"}
            </button>
            <button
              onClick={share}
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm bg-nd-red text-white nd-red-glow transition-all flex items-center justify-center gap-2"
            >
              <Icon name="Share2" size={14} />
              Поделиться
            </button>
          </div>
        </div>
      </div>

      {/* Share channels */}
      <div className="px-4 mb-4">
        <p className="text-nd-muted text-xs font-medium uppercase tracking-wider mb-2">Отправить через</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { name: "WhatsApp", icon: "MessageCircle", color: "bg-green-500/10 text-green-400" },
            { name: "Telegram", icon: "Send", color: "bg-blue-500/10 text-blue-400" },
            { name: "ВКонтакте", icon: "Users", color: "bg-blue-600/10 text-blue-300" },
            { name: "СМС", icon: "Smartphone", color: "bg-nd-red/10 text-nd-red" },
          ].map((ch) => (
            <button
              key={ch.name}
              onClick={share}
              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl nd-card-glow bg-nd-card hover-scale`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${ch.color.split(" ")[0]}`}>
                <Icon name={ch.icon} size={18} className={ch.color.split(" ")[1]} />
              </div>
              <span className="text-nd-muted text-[10px] font-medium">{ch.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Script hint */}
      <div className="px-4 mb-6">
        <div className="bg-nd-card nd-card-glow rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Lightbulb" size={16} className="text-nd-yellow" />
            <p className="text-foreground font-semibold text-sm">Скрипт для пассажира</p>
          </div>
          <div className="bg-nd-card2 rounded-xl p-3">
            <p className="text-nd-muted text-sm leading-relaxed italic">
              «Есть долги? Знаю компанию — Нетдолгофф. Они помогают законно списать до 95% долгов по ФЗ-127.
              Консультация бесплатная. Вот моя ссылка — там всё объяснят.»
            </p>
          </div>
          <button className="mt-3 w-full py-2 rounded-xl bg-nd-card2 border border-nd-border text-nd-muted text-xs font-medium flex items-center justify-center gap-2">
            <Icon name="Copy" size={12} />
            Скопировать скрипт
          </button>
        </div>
      </div>
    </div>
  );
}
