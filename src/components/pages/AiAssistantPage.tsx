import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  time: string;
};

const quickQuestions = [
  "Что такое банкротство?",
  "Какой долг нужен для банкротства?",
  "Заберут ли квартиру?",
  "Сколько длится процедура?",
  "Что нельзя списать?",
  "Как мне убедить пассажира?",
];

const faqAnswers: Record<string, string> = {
  "Что такое банкротство?": "Банкротство физического лица — законная процедура списания долгов по ФЗ №127. Позволяет избавиться до 95% задолженности: кредиты, МФО, ЖКХ, налоги. Единственное жильё сохраняется. Консультация в Нетдолгофф — бесплатная.",
  "Какой долг нужен для банкротства?": "Минимальный долг зависит от способа:\n• Через МФЦ (внесудебное) — от 25 000 до 1 000 000 ₽, просрочка от 1 года\n• Через суд — от 50 000 ₽ (фактически от 300 000 ₽ для эффективности)\nГлавное — невозможность погашения долга.",
  "Заберут ли квартиру?": "Единственное жильё — под защитой закона! Его не могут продать. Исключение: ипотечная квартира (она в залоге у банка). Автомобиль, используемый для работы (например такси), тоже может быть защищён — уточните у юриста.",
  "Сколько длится процедура?": "Зависит от способа:\n• Внесудебное (МФЦ) — 6 месяцев, бесплатно\n• Судебное банкротство — 6–18 месяцев\nПосле завершения долги списываются полностью. Нетдолгофф ведёт клиента на каждом этапе.",
  "Что нельзя списать?": "Нельзя списать:\n✗ Алименты на детей\n✗ Ущерб здоровью и жизни\n✗ Долги по уголовным делам\n✗ Штрафы ГИБДД (иногда)\n\nВсё остальное — кредиты, МФО, ЖКХ, налоги — списываются!",
  "Как мне убедить пассажира?": "Не надо убеждать — просто информируйте! Скажите: «Есть компания, которая помогает законно избавиться от долгов. Консультация бесплатная.» Дайте ссылку или промокод. Решение — за пассажиром. Ваша задача — посеять семя 🌱",
};

const getResponse = (msg: string): string => {
  const lower = msg.toLowerCase();
  for (const [key, answer] of Object.entries(faqAnswers)) {
    if (lower.includes(key.toLowerCase().slice(0, 8))) {
      return answer;
    }
  }
  if (lower.includes("долг") || lower.includes("банкрот")) {
    return "По вопросам банкротства и долгов могу рассказать подробнее. Уточните: вас интересует процедура банкротства, требования или что говорить пассажирам?";
  }
  if (lower.includes("заработ") || lower.includes("бонус") || lower.includes("деньг")) {
    return "За каждого привлечённого клиента вы получаете:\n• 1-й клиент: 10 000 ₽\n• 2-й: 11 000 ₽\n• 3-й: 12 000 ₽\n• 6-й и далее: 15 000 ₽\n\nПлюс бонус 50 000 ₽ за 3 клиента в месяц с долгом от 300 000 ₽ каждый!";
  }
  return "Хороший вопрос! По этой теме я рекомендую обратиться к куратору — живому юристу в разделе «Чат с куратором». Они знают все нюансы и ответят быстро.";
};

const now = () => new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

export default function AiAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      text: "Привет! Я ИИ-ассистент программы НЕТДОЛГОФФ. Помогу ответить на вопросы о банкротстве физических лиц и партнёрской программе. Спрашивайте — я готов!",
      time: now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now(), role: "user", text, time: now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: getResponse(text),
        time: now(),
      };
      setMessages((prev) => [...prev, reply]);
    }, 1000 + Math.random() * 800);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="px-4 pt-10 pb-4 bg-nd-card border-b border-nd-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
            <Icon name="Bot" size={20} className="text-white" />
          </div>
          <div>
            <p className="text-foreground font-bold">ИИ-ассистент</p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-nd-green animate-pulse" />
              <p className="text-nd-green text-xs">Онлайн • отвечу за секунды</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick questions */}
      <div className="px-4 py-3 border-b border-nd-border flex-shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="px-3 py-1.5 bg-nd-card nd-card-glow rounded-xl text-xs font-medium text-nd-muted whitespace-nowrap flex-shrink-0 hover:text-foreground hover:border-nd-red/30 border border-transparent transition-all"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 animate-slide-up ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 mt-1">
                <Icon name="Bot" size={13} className="text-white" />
              </div>
            )}
            <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
              <div
                className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                  msg.role === "user"
                    ? "nd-gradient text-white rounded-tr-sm"
                    : "bg-nd-card nd-card-glow text-foreground rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
              <p className="text-nd-muted text-[10px] mt-1 px-1">{msg.time}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 animate-fade-in">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center flex-shrink-0 mt-1">
              <Icon name="Bot" size={13} className="text-white" />
            </div>
            <div className="bg-nd-card nd-card-glow rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1 items-center">
                <div className="w-2 h-2 rounded-full bg-nd-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-nd-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-nd-muted animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-nd-card border-t border-nd-border flex-shrink-0" style={{ paddingBottom: "calc(0.75rem + 80px)" }}>
        <div className="flex gap-2 items-end">
          <div className="flex-1 bg-nd-card2 rounded-2xl border border-nd-border px-4 py-2.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              placeholder="Задайте вопрос..."
              className="w-full bg-transparent text-foreground text-sm outline-none placeholder:text-nd-muted"
            />
          </div>
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl bg-nd-red nd-red-glow flex items-center justify-center flex-shrink-0 disabled:opacity-50 transition-all"
          >
            <Icon name="Send" size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}
