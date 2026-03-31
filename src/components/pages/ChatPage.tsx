import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

type Message = { id: number; role: "user" | "curator"; text: string; time: string; };

const now = () => new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });

const curatorReplies = [
  "Добрый день! Готов помочь. Уточните ваш вопрос.",
  "Понял вас. Процедура банкротства — это абсолютно законный способ решить долговую проблему.",
  "Минимальный долг для обращения в Нетдолгофф — от 50 000 ₽. Работаем по всей России.",
  "Консультация для ваших пассажиров всегда бесплатная. Пусть звонят — специалисты всё объяснят.",
  "Если у клиента есть сомнения — порекомендуйте прочитать отзывы. Более 10 000 довольных клиентов!",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "curator", text: "Добрый день! Я Дмитрий, ваш куратор-юрист. Помогу с любыми вопросами по партнёрской программе и процедуре банкротства. Чем могу помочь?", time: "09:15" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [replyIdx, setReplyIdx] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { id: Date.now(), role: "user", text: input, time: now() }]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: Date.now() + 1, role: "curator", text: curatorReplies[replyIdx % curatorReplies.length], time: now() }]);
      setReplyIdx((i) => i + 1);
    }, 1500 + Math.random() * 1000);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="px-4 pt-10 pb-4 nd-gradient flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-nd-dark flex items-center justify-center">
                <span className="text-nd-yellow font-bold text-base">Д</span>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-nd-green border-2 border-nd-yellow" />
            </div>
            <div>
              <p className="text-nd-dark font-bold">Дмитрий</p>
              <p className="text-nd-dark/60 text-xs">Куратор-юрист · онлайн</p>
            </div>
          </div>
          <button className="w-9 h-9 rounded-xl bg-black/10 flex items-center justify-center">
            <Icon name="Phone" size={16} className="text-nd-dark" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-background">
        <div className="text-center">
          <span className="text-nd-muted text-xs bg-white nd-card-glow px-3 py-1 rounded-full">Сегодня</span>
        </div>

        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-2 animate-slide-up ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
            {msg.role === "curator" && (
              <div className="w-7 h-7 rounded-full bg-nd-dark flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-nd-yellow text-xs font-bold">Д</span>
              </div>
            )}
            <div className={`max-w-[80%] flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "nd-gradient text-nd-dark rounded-tr-sm"
                  : "bg-white nd-card-glow text-nd-dark rounded-tl-sm"
              }`}>
                {msg.text}
              </div>
              <div className={`flex items-center gap-1 mt-1 px-1 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                <p className="text-nd-muted text-[10px]">{msg.time}</p>
                {msg.role === "user" && <Icon name="CheckCheck" size={12} className="text-nd-yellow-dark" />}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 animate-fade-in">
            <div className="w-7 h-7 rounded-full bg-nd-dark flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-nd-yellow text-xs font-bold">Д</span>
            </div>
            <div className="bg-white nd-card-glow rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="text-nd-muted text-xs mr-1">Дмитрий печатает</span>
                {[0, 150, 300].map((delay) => (
                  <div key={delay} className="w-1.5 h-1.5 rounded-full bg-nd-muted animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      <div className="px-4 pt-2 bg-background flex-shrink-0">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["Когда выплатят бонус?", "Как работает промокод?", "Что говорить пассажиру?"].map((q) => (
            <button
              key={q}
              onClick={() => setInput(q)}
              className="px-3 py-1.5 bg-white nd-card-glow rounded-xl text-xs font-medium text-nd-dark whitespace-nowrap flex-shrink-0 border border-nd-border"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-nd-border flex-shrink-0" style={{ paddingBottom: "calc(0.75rem + 80px)" }}>
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
              className="w-full bg-transparent text-nd-dark text-sm outline-none placeholder:text-nd-muted"
            />
          </div>
          <button
            onClick={sendMessage}
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
