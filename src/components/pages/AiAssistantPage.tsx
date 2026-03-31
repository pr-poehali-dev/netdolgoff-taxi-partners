import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Message = { id: number; role: "user" | "assistant"; text: string; time: string; };

const quickQuestions = [
  "Что такое банкротство?",
  "Какой долг нужен?",
  "Заберут ли квартиру?",
  "Сколько длится процедура?",
  "Что нельзя списать?",
  "Как убедить пассажира?",
];

const faqAnswers: Record<string, string> = {
  "Что такое банкротство?": "Банкротство физического лица — законная процедура списания долгов по ФЗ №127. Позволяет избавиться до 95% задолженности: кредиты, МФО, ЖКХ, налоги. Единственное жильё сохраняется. Консультация в Нетдолгофф — бесплатная.",
  "Какой долг нужен?": "Минимальный долг:\n• Через МФЦ (внесудебное) — от 25 000 до 1 000 000 ₽\n• Через суд — от 50 000 ₽ (эффективно от 300 000 ₽)\nГлавное — невозможность погашения долга.",
  "Заберут ли квартиру?": "Единственное жильё — под защитой закона! Его не могут продать. Исключение: ипотечная квартира (в залоге у банка). Автомобиль для работы (такси) тоже может быть защищён — уточните у юриста.",
  "Сколько длится процедура?": "• Внесудебное (МФЦ) — 6 месяцев, бесплатно\n• Судебное банкротство — 6–18 месяцев\nПосле завершения долги списываются полностью.",
  "Что нельзя списать?": "Нельзя списать:\n✗ Алименты на детей\n✗ Ущерб здоровью и жизни\n✗ Долги по уголовным делам\n\nВсё остальное — кредиты, МФО, ЖКХ, налоги — списываются!",
  "Как убедить пассажира?": "Не надо убеждать — просто информируйте! Скажите: «Есть компания, которая помогает законно избавиться от долгов. Консультация бесплатная.» Дайте ссылку или промокод. Решение — за пассажиром.",
};

const getResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  for (const [key, answer] of Object.entries(faqAnswers)) {
    if (lower.includes(key.toLowerCase().slice(0, 8))) return answer;
  }
  if (lower.includes("долг") || lower.includes("банкрот")) {
    return "По вопросам банкротства могу рассказать подробнее. Уточните: вас интересует процедура, требования или что говорить пассажирам?";
  }
  if (lower.includes("заработ") || lower.includes("бонус") || lower.includes("деньг")) {
    return "За каждого клиента вы получаете:\n• 1-й: 10 000 ₽\n• 2-й: 11 000 ₽\n• 3-й: 12 000 ₽\n• 6-й и далее: 15 000 ₽\n\nПлюс бонус 50 000 ₽ за 3 клиента в месяц с долгом от 300 000 ₽!";
  }
  return "По этому вопросу лучше обратиться к куратору — живому юристу в разделе «Чат с куратором». Они знают все нюансы и ответят быстро.";
};

const now = () => new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", text: "Привет! Я ИИ-ассистент НЕТДОЛГОФФ. Помогу ответить на вопросы о банкротстве физических лиц и партнёрской программе. Спрашивайте!", time: now() },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text, time: now() }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "assistant", text: getResponse(text), time: now() }]);
    }, 900 + Math.random() * 700);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="px-4 pt-10 pb-4 nd-gradient flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-nd-dark flex items-center justify-center">
            <Icon name="Bot" size={20} className="text-nd-yellow" />
          </div>
          <div>
            <p className="text-nd-dark font-bold">ИИ-ассистент</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-nd-green animate-pulse" />
              <p className="text-nd-dark/60 text-xs">Онлайн · отвечу за секунды</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick questions */}
      <div className="px-4 py-3 border-b border-nd-border bg-white flex-shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="px-3 py-1.5 bg-nd-card2 rounded-xl text-xs font-medium text-nd-dark whitespace-nowrap flex-shrink-0 hover:bg-nd-yellow-light transition-all border border-nd-border"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-background">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 animate-slide-up ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-nd-dark flex items-center justify-center flex-shrink-0 mt-1">
                <Icon name="Bot" size={13} className="text-nd-yellow" />
              </div>
            )}
            <div className={`max-w-[80%] flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                msg.role === "user"
                  ? "nd-gradient text-nd-dark rounded-tr-sm"
                  : "bg-white nd-card-glow text-nd-dark rounded-tl-sm"
              }`}>
                {msg.text}
              </div>
              <p className="text-nd-muted text-[10px] mt-1 px-1">{msg.time}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-2 animate-fade-in">
            <div className="w-7 h-7 rounded-full bg-nd-dark flex items-center justify-center flex-shrink-0 mt-1">
              <Icon name="Bot" size={13} className="text-nd-yellow" />
            </div>
            <div className="bg-white nd-card-glow rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1 items-center">
                {[0, 150, 300].map((delay) => (
                  <div key={delay} className="w-2 h-2 rounded-full bg-nd-muted animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-nd-border flex-shrink-0" style={{ paddingBottom: "calc(0.75rem + 80px)" }}>
        <div className="flex gap-2 items-end">
          <div className="flex-1 bg-nd-card2 rounded-2xl border border-nd-border px-4 py-2.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Задайте вопрос..."
              className="w-full bg-transparent text-nd-dark text-sm outline-none placeholder:text-nd-muted"
            />
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl nd-gradient nd-yellow-glow flex items-center justify-center flex-shrink-0 disabled:opacity-40 transition-all"
          >
            <Icon name="Send" size={16} className="text-nd-dark" />
          </button>
        </div>
      </div>
    </div>
  );
}
