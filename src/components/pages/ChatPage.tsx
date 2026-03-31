import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Message = {
  id: number;
  role: "user" | "curator";
  text: string;
  time: string;
  status?: "sent" | "delivered" | "read";
};

const now = () => new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

const curatorReplies = [
  "Добрый день! Готов помочь. Уточните ваш вопрос.",
  "Понял вас. По этой ситуации могу сказать следующее: процедура банкротства — это абсолютно законный способ решить долговую проблему.",
  "Хороший вопрос! Минимальный долг для обращения в Нетдолгофф — от 50 000 ₽. Мы работаем по всей России.",
  "Да, консультация для ваших пассажиров всегда бесплатная. Пусть звонят: специалисты всё объяснят.",
  "Если у клиента есть сомнения — порекомендуйте прочитать отзывы на нашем сайте. Более 10 000 довольных клиентов!",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "curator",
      text: "Добрый день! Я Дмитрий, ваш куратор. Помогу с любыми вопросами по партнёрской программе, условиям вознаграждений и тому, что отвечать пассажирам. Чем могу помочь?",
      time: "09:15",
    },
  ]);
  const [input, setInput] = useState("");
  const [isOnline] = useState(true);
  const [replyIdx, setReplyIdx] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = {
      id: Date.now(),
      role: "user",
      text: input,
      time: now(),
      status: "sent",
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const reply: Message = {
        id: Date.now() + 1,
        role: "curator",
        text: curatorReplies[replyIdx % curatorReplies.length],
        time: now(),
      };
      setMessages((prev) => [...prev, reply]);
      setReplyIdx((i) => i + 1);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="px-4 pt-10 pb-4 bg-nd-card border-b border-nd-border flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center">
                <span className="text-white font-bold text-base">Д</span>
              </div>
              {isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-nd-green border-2 border-nd-card" />
              )}
            </div>
            <div>
              <p className="text-foreground font-bold">Дмитрий</p>
              <p className="text-nd-green text-xs">Куратор-юрист • онлайн</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-xl bg-nd-card2 border border-nd-border flex items-center justify-center">
              <Icon name="Phone" size={16} className="text-nd-muted" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <div className="text-center">
          <span className="text-nd-muted text-xs bg-nd-card2 px-3 py-1 rounded-full">Сегодня</span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 animate-slide-up ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {msg.role === "curator" && (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-white text-xs font-bold">Д</span>
              </div>
            )}
            <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col`}>
              <div
                className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "nd-gradient text-white rounded-tr-sm"
                    : "bg-nd-card nd-card-glow text-foreground rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
              <div className={`flex items-center gap-1 mt-1 px-1 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <p className="text-nd-muted text-[10px]">{msg.time}</p>
                {msg.role === "user" && (
                  <Icon name="CheckCheck" size={12} className="text-nd-red" />
                )}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 animate-fade-in">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-white text-xs font-bold">Д</span>
            </div>
            <div className="bg-nd-card nd-card-glow rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="text-nd-muted text-xs mr-1">Дмитрий печатает</span>
                <div className="w-1.5 h-1.5 rounded-full bg-nd-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-nd-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-nd-muted animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      <div className="px-4 pt-2 flex-shrink-0 bg-background">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["Когда выплатят бонус?", "Как работает промокод?", "Что говорить пассажиру?"].map((q) => (
            <button
              key={q}
              onClick={() => { setInput(q); }}
              className="px-3 py-1.5 bg-nd-card nd-card-glow rounded-xl text-xs font-medium text-nd-muted whitespace-nowrap flex-shrink-0 border border-nd-border"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-nd-card border-t border-nd-border flex-shrink-0" style={{ paddingBottom: "calc(0.75rem + 80px)" }}>
        <div className="flex gap-2 items-end">
          <button className="w-9 h-9 rounded-xl bg-nd-card2 border border-nd-border flex items-center justify-center flex-shrink-0">
            <Icon name="Paperclip" size={16} className="text-nd-muted" />
          </button>
          <div className="flex-1 bg-nd-card2 rounded-2xl border border-nd-border px-4 py-2.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Написать куратору..."
              className="w-full bg-transparent text-foreground text-sm outline-none placeholder:text-nd-muted"
            />
          </div>
          <button
            onClick={sendMessage}
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
