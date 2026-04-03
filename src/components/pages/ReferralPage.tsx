import { useState } from "react";
import Icon from "@/components/ui/icon";

const PROMO = "TAXI-AP2847";
const LINK = "https://netdolgoff.ru/ref/TAXI-AP2847";

type LeadStatus = "thinking" | "signed" | "declined" | "no_match";

interface Lead {
  id: number;
  name: string;
  date: string;
  source: "qr" | "promo" | "link";
  status: LeadStatus;
  debt?: string;
}

const statusConfig: Record<LeadStatus, { label: string; color: string; bg: string; icon: string }> = {
  signed:   { label: "Договор заключён",        color: "text-nd-green",        bg: "bg-nd-green/10",   icon: "CheckCircle" },
  thinking: { label: "Думает",                  color: "text-nd-yellow-dark",  bg: "bg-nd-yellow-light", icon: "Clock" },
  declined: { label: "Отказался",               color: "text-nd-muted",        bg: "bg-nd-card2",       icon: "XCircle" },
  no_match: { label: "Не подошёл под банкротство", color: "text-blue-500",     bg: "bg-blue-500/10",   icon: "AlertCircle" },
};

const sourceConfig: Record<Lead["source"], { label: string; icon: string }> = {
  qr:    { label: "QR-код",  icon: "QrCode" },
  promo: { label: "Промокод", icon: "Tag" },
  link:  { label: "Ссылка",  icon: "Link" },
};

const leads: Lead[] = [
  { id: 1, name: "Иван К.",    date: "28 мар",  source: "qr",    status: "signed",   debt: "450 000 ₽" },
  { id: 2, name: "Марина Д.",  date: "25 мар",  source: "link",  status: "signed",   debt: "320 000 ₽" },
  { id: 3, name: "Сергей П.",  date: "22 мар",  source: "promo", status: "signed",   debt: "580 000 ₽" },
  { id: 4, name: "Ольга Р.",   date: "18 мар",  source: "qr",    status: "thinking", debt: "210 000 ₽" },
  { id: 5, name: "Антон М.",   date: "15 мар",  source: "link",  status: "thinking", debt: "390 000 ₽" },
  { id: 6, name: "Лариса В.",  date: "12 мар",  source: "promo", status: "declined" },
  { id: 7, name: "Дмитрий Н.", date: "10 мар",  source: "qr",    status: "no_match" },
  { id: 8, name: "Елена С.",   date: "5 мар",   source: "link",  status: "declined" },
  { id: 9, name: "Николай Ф.", date: "1 мар",   source: "qr",    status: "thinking", debt: "145 000 ₽" },
];

const sourceCounts = leads.reduce((acc, l) => {
  acc[l.source] = (acc[l.source] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const statusCounts = leads.reduce((acc, l) => {
  acc[l.status] = (acc[l.status] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const conversionRate = Math.round((statusCounts.signed || 0) / leads.length * 100);

export default function ReferralPage() {
  const [copied, setCopied] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<LeadStatus | "all">("all");
  const [showLeads, setShowLeads] = useState(false);

  const copy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  const share = () => {
    if (navigator.share) {
      navigator.share({ title: "Списание долгов — Нетдолгофф", text: "Избавься от долгов законно! Списание до 95%.", url: LINK });
    } else {
      copy(LINK, "link");
    }
  };

  const filteredLeads = activeFilter === "all" ? leads : leads.filter(l => l.status === activeFilter);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-4 pt-5 pb-5 nd-gradient">
        <h1 className="text-2xl font-black text-nd-dark">Реферальная программа</h1>
        <p className="text-nd-dark/60 text-sm mt-1">Делитесь и зарабатывайте от 10 000 ₽</p>
      </div>

      {/* === ВОРОНКА КЛИЕНТОВ === */}
      <div className="px-4 mt-4 mb-4">
        <div className="bg-nd-card nd-card-glow rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-foreground font-bold flex items-center gap-2">
              <Icon name="Users" size={16} className="text-nd-yellow-dark" />
              Мои клиенты
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="text-nd-muted text-xs">Конверсия</span>
              <span className="text-nd-green font-black text-sm">{conversionRate}%</span>
            </div>
          </div>

          {/* Статусы — большие плитки */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {(Object.entries(statusConfig) as [LeadStatus, typeof statusConfig[LeadStatus]][]).map(([key, cfg]) => {
              const count = statusCounts[key] || 0;
              const isActive = activeFilter === key;
              return (
                <button
                  key={key}
                  onClick={() => { setActiveFilter(isActive ? "all" : key); setShowLeads(true); }}
                  className={`rounded-xl p-3 text-left transition-all border-2 ${
                    isActive ? "border-nd-yellow" : "border-transparent"
                  } ${cfg.bg}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <Icon name={cfg.icon} size={14} className={cfg.color} />
                    <span className={`text-xl font-black ${cfg.color}`}>{count}</span>
                  </div>
                  <p className={`text-[11px] font-semibold leading-tight ${cfg.color}`}>{cfg.label}</p>
                </button>
              );
            })}
          </div>

          {/* Итого + источники */}
          <div className="bg-nd-card2 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-nd-muted text-xs font-medium">Всего переходов</span>
              <span className="text-foreground font-black">{leads.length}</span>
            </div>
            <div className="flex gap-3">
              {(Object.entries(sourceCounts) as [Lead["source"], number][]).map(([src, cnt]) => {
                const s = sourceConfig[src];
                return (
                  <div key={src} className="flex items-center gap-1">
                    <Icon name={s.icon} size={11} className="text-nd-muted" />
                    <span className="text-nd-muted text-[11px]">{s.label}:</span>
                    <span className="text-foreground text-[11px] font-bold">{cnt}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Кнопка показать/скрыть список */}
          <button
            onClick={() => setShowLeads(!showLeads)}
            className="w-full mt-3 py-2 rounded-xl bg-nd-card2 border border-nd-border text-nd-muted text-xs font-medium flex items-center justify-center gap-1.5 transition-all hover:text-foreground"
          >
            <Icon name={showLeads ? "ChevronUp" : "ChevronDown"} size={13} />
            {showLeads ? "Скрыть список" : "Показать всех клиентов"}
          </button>
        </div>
      </div>

      {/* === СПИСОК КЛИЕНТОВ === */}
      {showLeads && (
        <div className="px-4 mb-4 animate-fade-in">
          {/* Фильтры */}
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all ${
                activeFilter === "all" ? "nd-gradient text-nd-dark" : "bg-nd-card text-nd-muted border border-nd-border"
              }`}
            >
              Все ({leads.length})
            </button>
            {(Object.entries(statusConfig) as [LeadStatus, typeof statusConfig[LeadStatus]][]).map(([key, cfg]) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all ${
                  activeFilter === key
                    ? "nd-gradient text-nd-dark"
                    : `${cfg.bg} ${cfg.color} border border-transparent`
                }`}
              >
                {cfg.label.split(" ")[0]} ({statusCounts[key] || 0})
              </button>
            ))}
          </div>

          {/* Карточки клиентов */}
          <div className="space-y-2">
            {filteredLeads.map((lead, idx) => {
              const st = statusConfig[lead.status];
              const src = sourceConfig[lead.source];
              return (
                <div
                  key={lead.id}
                  className="bg-nd-card nd-card-glow rounded-xl p-3 flex items-center gap-3 animate-slide-up"
                  style={{ animationDelay: `${idx * 0.04}s` }}
                >
                  {/* Аватар */}
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${st.bg}`}>
                    <Icon name={st.icon} size={16} className={st.color} />
                  </div>

                  {/* Инфо */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-foreground font-semibold text-sm">{lead.name}</p>
                      <div className="flex items-center gap-1 text-nd-muted">
                        <Icon name={src.icon} size={10} />
                        <span className="text-[10px]">{src.label}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[11px] font-semibold ${st.color}`}>{st.label}</span>
                      {lead.debt && (
                        <>
                          <span className="text-nd-border text-[10px]">·</span>
                          <span className="text-nd-muted text-[11px]">долг {lead.debt}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Дата + бонус */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-nd-muted text-[10px]">{lead.date}</p>
                    {lead.status === "signed" && (
                      <p className="text-nd-green text-xs font-bold mt-0.5">+{lead.id <= 3 ? (9 + lead.id) : 10} 000 ₽</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* === БОНУСНЫЕ БЛОКИ === */}
      <div className="px-4 mt-4 mb-2 grid grid-cols-2 gap-2">
        {/* Бонус 300р за регистрацию */}
        <div className="bg-nd-card nd-card-glow rounded-2xl p-3 border border-nd-yellow/30">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-nd-yellow-light flex items-center justify-center">
              <Icon name="Gift" size={13} className="text-nd-yellow-dark" />
            </div>
            <span className="text-nd-yellow-dark text-xs font-bold">+300 ₽</span>
          </div>
          <p className="text-foreground font-semibold text-xs leading-tight">За каждую регистрацию</p>
          <p className="text-nd-muted text-[11px] mt-0.5 leading-tight">Автоматически — когда кто-то регистрируется по вашей ссылке, промокоду или QR</p>
        </div>

        {/* Бонус 50к за 3 клиентов */}
        <div className="bg-nd-card nd-card-glow rounded-2xl p-3 border border-nd-green/30">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-6 h-6 rounded-lg bg-nd-green/10 flex items-center justify-center">
              <Icon name="Trophy" size={13} className="text-nd-green" />
            </div>
            <span className="text-nd-green text-xs font-bold">+50 000 ₽</span>
          </div>
          <p className="text-foreground font-semibold text-xs leading-tight">За 3 клиента в месяц</p>
          <p className="text-nd-muted text-[11px] mt-0.5 leading-tight">Автоматически — когда 3-й договор за месяц подписан. Долг каждого от 300 000 ₽</p>
        </div>
      </div>

      {/* Прогресс к бонусу 50к */}
      <div className="px-4 mb-4">
        <div className="bg-nd-card nd-card-glow rounded-2xl p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Icon name="Trophy" size={14} className="text-nd-yellow-dark" />
              <span className="text-foreground text-sm font-semibold">Бонус месяца</span>
            </div>
            <span className="text-nd-muted text-xs">апрель 2026</span>
          </div>
          <div className="flex items-center gap-3">
            {[1, 2, 3].map((n) => {
              const filled = n <= (statusCounts.signed || 0);
              return (
                <div key={n} className="flex-1">
                  <div className={`h-2 rounded-full transition-all ${filled ? "bg-nd-green" : "bg-nd-card2 border border-nd-border"}`} />
                  <p className={`text-center text-[10px] mt-1 font-semibold ${filled ? "text-nd-green" : "text-nd-muted"}`}>{n}</p>
                </div>
              );
            })}
            <div className="flex-shrink-0 text-right">
              <p className="text-nd-green font-black text-sm">50 000 ₽</p>
              <p className="text-nd-muted text-[10px]">цель</p>
            </div>
          </div>
          <p className="text-nd-muted text-[11px] mt-2">
            {(statusCounts.signed || 0) >= 3
              ? "🏆 Бонус начислен! Отличная работа!"
              : `Осталось ${3 - Math.min(statusCounts.signed || 0, 3)} договора до бонуса 50 000 ₽`}
          </p>
        </div>
      </div>

      {/* QR Code */}
      <div className="px-4 mb-4">
        <div className="bg-nd-card nd-card-glow rounded-2xl p-6 flex flex-col items-center">
          <div className="w-44 h-44 bg-nd-dark rounded-2xl flex items-center justify-center mb-4 p-4">
            <div className="w-full h-full grid grid-cols-7 grid-rows-7 gap-0.5">
              {Array.from({ length: 49 }).map((_, i) => {
                const pattern = [0,1,2,3,4,5,6,7,13,14,20,21,27,28,29,30,31,32,33,34,40,41,42,43,44,45,46,47,48,8,9,10,15,16,17,22,23,24];
                const isBlack = pattern.includes(i) || (i % 11 === 0) || (i % 7 === 3 && i > 10);
                return <div key={i} className={`rounded-sm ${isBlack ? "bg-nd-yellow" : "bg-white/10"}`} />;
              })}
            </div>
          </div>
          <p className="text-nd-muted text-xs text-center mb-3">Покажите пассажиру для сканирования</p>
          <div className="bg-nd-yellow-light border border-nd-yellow/40 rounded-xl px-5 py-2">
            <p className="text-nd-yellow-dark text-center font-mono font-black text-sm">{PROMO}</p>
          </div>
        </div>
      </div>

      {/* Promo code */}
      <div className="px-4 mb-3">
        <p className="text-nd-muted text-xs font-semibold uppercase tracking-wider mb-2">Промокод</p>
        <div className="bg-nd-card nd-card-glow rounded-2xl p-4 flex items-center gap-3">
          <div className="flex-1">
            <p className="text-foreground font-mono font-black text-xl">{PROMO}</p>
            <p className="text-nd-muted text-xs mt-0.5">Называйте пассажиру при звонке</p>
          </div>
          <button
            onClick={() => copy(PROMO, "promo")}
            className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              copied === "promo" ? "bg-nd-green text-white" : "nd-gradient text-nd-dark nd-yellow-glow"
            }`}
          >
            {copied === "promo" ? "✓ Скопировано" : "Копировать"}
          </button>
        </div>
      </div>

      {/* Referral link */}
      <div className="px-4 mb-4">
        <p className="text-nd-muted text-xs font-semibold uppercase tracking-wider mb-2">Реферальная ссылка</p>
        <div className="bg-nd-card nd-card-glow rounded-2xl p-4">
          <p className="text-nd-muted text-xs font-mono break-all mb-3 bg-nd-card2 rounded-xl p-2">{LINK}</p>
          <div className="flex gap-2">
            <button
              onClick={() => copy(LINK, "link")}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                copied === "link" ? "bg-nd-green text-white" : "bg-nd-card2 text-foreground border border-nd-border"
              }`}
            >
              <Icon name="Copy" size={14} />
              {copied === "link" ? "Скопировано" : "Копировать"}
            </button>
            <button
              onClick={share}
              className="flex-1 py-2.5 rounded-xl font-semibold text-sm nd-gradient text-nd-dark nd-yellow-glow flex items-center justify-center gap-2"
            >
              <Icon name="Share2" size={14} />
              Поделиться
            </button>
          </div>
        </div>
      </div>

      {/* Share channels */}
      <div className="px-4 mb-4">
        <p className="text-nd-muted text-xs font-semibold uppercase tracking-wider mb-2">Отправить через</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { name: "WhatsApp", icon: "MessageCircle", bg: "bg-green-500/10", ic: "text-green-500" },
            { name: "Telegram", icon: "Send", bg: "bg-blue-500/10", ic: "text-blue-500" },
            { name: "ВКонтакте", icon: "Users", bg: "bg-blue-500/10", ic: "text-blue-400" },
            { name: "СМС", icon: "Smartphone", bg: "bg-nd-yellow-light", ic: "text-nd-yellow-dark" },
          ].map((ch) => (
            <button key={ch.name} onClick={share} className="flex flex-col items-center gap-1.5 p-3 rounded-xl nd-card-glow bg-nd-card hover-scale">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${ch.bg}`}>
                <Icon name={ch.icon} size={18} className={ch.ic} />
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
            <Icon name="Lightbulb" size={16} className="text-nd-yellow-dark" />
            <p className="text-foreground font-semibold text-sm">Скрипт для пассажира</p>
          </div>
          <div className="bg-nd-yellow-light rounded-xl p-3 border border-nd-yellow/30">
            <p className="text-foreground/70 text-sm leading-relaxed italic">
              «Есть долги? Знаю компанию — Нетдолгофф. Помогают законно списать до 95% долгов по ФЗ-127. Консультация бесплатная. Вот моя ссылка — там всё объяснят.»
            </p>
          </div>
          <button
            onClick={() => copy("Есть долги? Знаю компанию — Нетдолгофф. Помогают законно списать до 95% долгов по ФЗ-127. Консультация бесплатная. " + LINK, "script")}
            className="mt-3 w-full py-2 rounded-xl bg-nd-card2 border border-nd-border text-nd-muted text-xs font-medium flex items-center justify-center gap-2"
          >
            <Icon name="Copy" size={12} />
            {copied === "script" ? "✓ Скопировано" : "Скопировать скрипт"}
          </button>
        </div>
      </div>
    </div>
  );
}