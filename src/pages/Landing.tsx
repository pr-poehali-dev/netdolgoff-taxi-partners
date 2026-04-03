import { useState } from "react";
import Icon from "@/components/ui/icon";

const PHONE = "8 800 707-36-99";
const LOGO = "https://cdn.poehali.dev/projects/0e854e39-e393-4f2c-ac74-76b049136ae4/bucket/db33e181-898d-4e44-b7f6-424703639b7b.png";
const DRIVER_IMAGE = "https://cdn.poehali.dev/projects/0e854e39-e393-4f2c-ac74-76b049136ae4/files/57e7b534-2a4c-4ce9-993c-fe714fb66750.jpg";

const howItWorks = [
  { n: "01", title: "Регистрируетесь", desc: "Получаете личный промокод, QR-код и реферальную ссылку за 2 минуты" },
  { n: "02", title: "Рассказываете пассажирам", desc: "Во время поездки упоминаете Нетдолгофф. Готовые скрипты прямо в приложении" },
  { n: "03", title: "Пассажир консультируется", desc: "Бесплатная консультация юриста. Никакого давления на клиента" },
  { n: "04", title: "Получаете деньги на карту", desc: "После подписания договора бонус зачисляется автоматически. Вывод в 1–3 дня" },
];

const appScreens = [
  {
    title: "Главный экран",
    desc: "Ваш баланс, статистика и быстрые действия — всё на одном экране",
    icon: "Home",
    steps: ["Открываете приложение", "Видите баланс и статистику", "Нажимаете QR — показываете пассажиру"],
  },
  {
    title: "QR-код и промокод",
    desc: "Два способа привлечь клиента — QR для сканирования или промокод устно",
    icon: "QrCode",
    steps: ["Вкладка «Рефералы»", "Показываете QR пассажиру", "Он сканирует и записывается на консультацию"],
  },
  {
    title: "Вывод на карту",
    desc: "Деньги на карту в 2 нажатия — без звонков и заявок",
    icon: "CreditCard",
    steps: ["Открываете «Финансы»", "Нажимаете «Вывести на карту»", "Вводите сумму → деньги придут за 1–3 дня"],
  },
  {
    title: "Статус клиентов",
    desc: "Видите каждого пассажира: думает, подписал договор или отказался",
    icon: "Users",
    steps: ["Вкладка «Рефералы»", "Список всех ваших клиентов", "Статус обновляется автоматически"],
  },
];

const faqs = [
  { q: "Сколько времени нужно тратить?", a: "Ноль дополнительного времени. Вы упоминаете компанию в разговоре с пассажиром — это занимает 20 секунд. Скрипты уже готовы в приложении." },
  { q: "Когда придут деньги на карту?", a: "После того как ваш пассажир подписал договор с Нетдолгофф. Деньги на карту в течение 1–3 рабочих дней через раздел «Финансы» в приложении." },
  { q: "Что если пассажир отказался?", a: "Вы всё равно получите +300 ₽ за его регистрацию в приложении. Следующий пассажир может оказаться более подходящим." },
  { q: "Нужно ли платить за участие?", a: "Нет. Регистрация и участие абсолютно бесплатны." },
  { q: "Можно ли приглашать других водителей?", a: "Да! За каждого водителя, который зарегистрируется по вашей ссылке, вы получаете 300 ₽ автоматически." },
];

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formPhone, setFormPhone] = useState("");
  const [formName, setFormName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Калькулятор
  const [drivers, setDrivers] = useState(5);
  const [clients, setClients] = useState(3);

  const clientBonus = clients >= 1 ? 10000 + (Math.min(clients, 6) - 1) * 1000 : 0;
  const totalClientBonus = clients > 0
    ? Array.from({ length: Math.min(clients, 6) }, (_, i) => 10000 + i * 1000).reduce((a, b) => a + b, 0)
      + Math.max(0, clients - 6) * 15000
    : 0;
  const monthlyBonus = clients >= 3 ? 50000 : 0;
  const driverBonus = drivers * 300;
  const totalBonus = totalClientBonus + monthlyBonus + driverBonus;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formPhone.length >= 10) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>

      {/* === ШАПКА === */}
      <header className="sticky top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <img src={LOGO} alt="Нетдолгофф" className="h-10 w-auto object-contain" />
          <div className="hidden sm:flex items-center gap-6 text-sm text-white/50">
            <a href="#bonuses" className="hover:text-white transition-colors">Бонусы</a>
            <a href="#calculator" className="hover:text-white transition-colors">Калькулятор</a>
            <a href="#app" className="hover:text-white transition-colors">Приложение</a>
          </div>
          <a
            href="tel:88007073699"
            className="bg-[#f5c842] text-[#0f0f0f] text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Icon name="Phone" size={12} />
            <span className="hidden sm:inline">{PHONE}</span>
            <span className="sm:hidden">Позвонить</span>
          </a>
        </div>
      </header>

      {/* === HERO === */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5c842]/8 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 pt-12 pb-14">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#f5c842]/10 border border-[#f5c842]/30 rounded-full px-4 py-1.5 text-[#f5c842] text-xs font-semibold mb-6">
                <Icon name="Zap" size={12} />
                Дополнительный доход для таксистов
              </div>
              <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5">
                Зарабатывай<br />
                <span className="text-[#f5c842]">до 65 000 ₽</span><br />
                в месяц —<br />
                просто разговаривая
              </h1>
              <p className="text-white/60 text-base mb-8 leading-relaxed max-w-md">
                Рекомендуйте пассажирам списание долгов через Нетдолгофф. Бонус зачисляется автоматически — прямо на карту.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#registration"
                  className="bg-[#f5c842] text-[#0f0f0f] font-black text-base px-6 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#f5c842]/90 transition-all">
                  <Icon name="UserPlus" size={18} />
                  Хочу участвовать
                </a>
                <a href="#calculator"
                  className="border border-white/20 text-white font-semibold text-sm px-6 py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
                  <Icon name="Calculator" size={16} />
                  Рассчитать доход
                </a>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute -inset-6 bg-[#f5c842]/15 rounded-3xl blur-3xl pointer-events-none" />
                <img src={DRIVER_IMAGE} alt="Водитель такси"
                  className="relative w-64 h-64 md:w-72 md:h-72 object-cover rounded-3xl border border-white/10" />
                <div className="absolute -bottom-4 -right-4 bg-[#22c55e] text-white text-sm font-bold px-4 py-2 rounded-xl shadow-xl">
                  +10 000 ₽ за клиента
                </div>
                <div className="absolute -top-4 -left-4 bg-[#f5c842] text-[#0f0f0f] text-sm font-bold px-3 py-1.5 rounded-xl shadow-xl">
                  +300 ₽ за водителя
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === ЦИФРЫ === */}
      <section className="bg-[#f5c842] py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-6 text-center">
          {[
            { val: "2015", label: "Год основания" },
            { val: "95%", label: "Долгов списывается" },
            { val: "10 000+", label: "Успешных банкротств" },
          ].map((s) => (
            <div key={s.val}>
              <p className="text-[#0f0f0f] font-black text-2xl md:text-3xl">{s.val}</p>
              <p className="text-[#0f0f0f]/60 text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === ДВА ВИДА БОНУСОВ === */}
      <section id="bonuses" className="py-16 max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-2">Два вида бонусов</h2>
        <p className="text-white/50 text-center text-sm mb-10">Всё начисляется автоматически — вы просто работаете</p>

        <div className="grid md:grid-cols-2 gap-6">

          {/* БОНУС 1 — Водители */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#f5c842]/40 bg-gradient-to-br from-[#f5c842]/10 to-transparent p-7">
            <div className="absolute top-0 right-0 bg-[#f5c842] text-[#0f0f0f] text-xs font-black px-3 py-1.5 rounded-bl-2xl">
              ВИД 1
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#f5c842] rounded-2xl flex items-center justify-center shrink-0">
                <Icon name="Car" size={22} className="text-[#0f0f0f]" />
              </div>
              <div>
                <p className="font-black text-xl text-[#f5c842]">+300 ₽</p>
                <p className="text-white font-bold text-sm">За приглашение водителя</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Приглашайте других водителей такси зарегистрироваться в приложении по вашей реферальной ссылке. За каждого нового водителя — <strong className="text-[#f5c842]">300 ₽ автоматически</strong>.
            </p>
            <div className="bg-white/5 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="CheckCircle" size={14} className="text-[#f5c842] shrink-0" />
                <span className="text-white/80">Поделились ссылкой — водитель зарегистрировался</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="CheckCircle" size={14} className="text-[#f5c842] shrink-0" />
                <span className="text-white/80">300 ₽ зачисляется мгновенно на счёт</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="CheckCircle" size={14} className="text-[#f5c842] shrink-0" />
                <span className="text-white/80">Без лимитов — приглашайте любое количество</span>
              </div>
            </div>
            <div className="mt-4 bg-[#f5c842]/10 border border-[#f5c842]/30 rounded-xl p-3 text-center">
              <p className="text-[#f5c842] text-xs">Пример: 10 водителей в месяц = <strong>3 000 ₽</strong> пассивно</p>
            </div>
          </div>

          {/* БОНУС 2 — Пассажиры */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#22c55e]/40 bg-gradient-to-br from-[#22c55e]/10 to-transparent p-7">
            <div className="absolute top-0 right-0 bg-[#22c55e] text-white text-xs font-black px-3 py-1.5 rounded-bl-2xl">
              ВИД 2
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#22c55e] rounded-2xl flex items-center justify-center shrink-0">
                <Icon name="Users" size={22} className="text-white" />
              </div>
              <div>
                <p className="font-black text-xl text-[#22c55e]">10 000–15 000 ₽</p>
                <p className="text-white font-bold text-sm">За клиента-пассажира</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-5">
              Рекомендуете пассажиру списание долгов. После подписания договора с Нетдолгофф получаете бонус. При 3+ договорах в месяц — <strong className="text-[#22c55e]">+50 000 ₽ сверху</strong>.
            </p>
            <div className="bg-white/5 rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Icon name="CheckCircle" size={14} className="text-[#22c55e] shrink-0" />
                <span className="text-white/80">1-й клиент: 10 000 ₽</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="CheckCircle" size={14} className="text-[#22c55e] shrink-0" />
                <span className="text-white/80">2-й клиент: 11 000 ₽</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Icon name="CheckCircle" size={14} className="text-[#22c55e] shrink-0" />
                <span className="text-white/80">3-й клиент: 12 000 ₽ + бонус 50 000 ₽</span>
              </div>
            </div>
            <div className="mt-4 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-xl p-3 text-center">
              <p className="text-[#22c55e] text-xs">3 клиента в месяц = <strong>10к+11к+12к+50к = 83 000 ₽</strong></p>
            </div>
          </div>
        </div>

        {/* Суммирование */}
        <div className="mt-6 bg-gradient-to-r from-[#f5c842]/10 via-white/5 to-[#22c55e]/10 border border-white/10 rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Icon name="Trophy" size={20} className="text-[#f5c842]" />
            <p className="font-black text-lg text-white">Оба бонуса суммируются!</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="bg-[#f5c842]/10 rounded-2xl p-4">
              <p className="text-[#f5c842] font-black text-lg">10 водителей</p>
              <p className="text-white/60 text-xs mt-1">× 300 ₽ = 3 000 ₽</p>
            </div>
            <div className="bg-[#22c55e]/10 rounded-2xl p-4">
              <p className="text-[#22c55e] font-black text-lg">3 клиента</p>
              <p className="text-white/60 text-xs mt-1">= 33 000 ₽ + 50 000 ₽</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-4">
              <p className="text-white font-black text-lg">Итого</p>
              <p className="text-[#f5c842] font-black text-xl mt-1">86 000 ₽</p>
            </div>
          </div>
        </div>
      </section>

      {/* === КАЛЬКУЛЯТОР === */}
      <section id="calculator" className="py-16 bg-white/3 border-y border-white/5">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-2">Калькулятор бонусов</h2>
          <p className="text-white/50 text-center text-sm mb-10">Посчитайте свой доход за месяц</p>

          <div className="bg-[#1a1a1a] rounded-3xl p-6 md:p-8 border border-white/10">

            {/* Слайдер водителей */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#f5c842]/20 rounded-lg flex items-center justify-center">
                    <Icon name="Car" size={14} className="text-[#f5c842]" />
                  </div>
                  <span className="text-white font-semibold text-sm">Водителей приглашу в приложение</span>
                </div>
                <span className="text-[#f5c842] font-black text-2xl">{drivers}</span>
              </div>
              <input
                type="range" min={0} max={30} value={drivers}
                onChange={e => setDrivers(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #f5c842 ${(drivers/30)*100}%, #333 ${(drivers/30)*100}%)` }}
              />
              <div className="flex justify-between text-white/30 text-xs mt-1">
                <span>0</span><span>30</span>
              </div>
              <div className="mt-3 bg-[#f5c842]/10 border border-[#f5c842]/20 rounded-xl px-4 py-2.5 flex items-center justify-between">
                <span className="text-white/60 text-sm">Бонус за водителей (× 300 ₽)</span>
                <span className="text-[#f5c842] font-black text-lg">{driverBonus.toLocaleString("ru")} ₽</span>
              </div>
            </div>

            {/* Слайдер клиентов */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#22c55e]/20 rounded-lg flex items-center justify-center">
                    <Icon name="Users" size={14} className="text-[#22c55e]" />
                  </div>
                  <span className="text-white font-semibold text-sm">Клиентов заключат договор</span>
                </div>
                <span className="text-[#22c55e] font-black text-2xl">{clients}</span>
              </div>
              <input
                type="range" min={0} max={10} value={clients}
                onChange={e => setClients(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{ background: `linear-gradient(to right, #22c55e ${(clients/10)*100}%, #333 ${(clients/10)*100}%)` }}
              />
              <div className="flex justify-between text-white/30 text-xs mt-1">
                <span>0</span><span>10</span>
              </div>

              {/* Разбивка по клиентам */}
              {clients > 0 && (
                <div className="mt-3 space-y-2">
                  {Array.from({ length: Math.min(clients, 10) }, (_, i) => {
                    const bonus = i < 6 ? 10000 + i * 1000 : 15000;
                    return (
                      <div key={i} className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-2">
                        <span className="text-white/60 text-xs">{i + 1}-й клиент</span>
                        <span className="text-[#22c55e] font-bold text-sm">{bonus.toLocaleString("ru")} ₽</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Бонус за 3 клиентов */}
              <div className={`mt-3 border rounded-xl px-4 py-2.5 flex items-center justify-between transition-all ${
                clients >= 3 ? "bg-[#22c55e]/15 border-[#22c55e]/40" : "bg-white/3 border-white/10 opacity-50"
              }`}>
                <div className="flex items-center gap-2">
                  <Icon name="Trophy" size={14} className={clients >= 3 ? "text-[#22c55e]" : "text-white/30"} />
                  <span className="text-white/60 text-sm">Бонус «3 клиента в месяц»</span>
                </div>
                <span className={`font-black text-lg ${clients >= 3 ? "text-[#22c55e]" : "text-white/30"}`}>
                  {clients >= 3 ? "+50 000 ₽" : "нужно 3+"}
                </span>
              </div>
            </div>

            {/* ИТОГО */}
            <div className="border-t border-white/10 pt-6">
              <div className="space-y-2 mb-4 text-sm">
                <div className="flex justify-between text-white/50">
                  <span>За водителей ({drivers} × 300 ₽)</span>
                  <span>{driverBonus.toLocaleString("ru")} ₽</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>За клиентов ({clients} чел.)</span>
                  <span>{totalClientBonus.toLocaleString("ru")} ₽</span>
                </div>
                {monthlyBonus > 0 && (
                  <div className="flex justify-between text-[#22c55e]">
                    <span>Бонус месяца</span>
                    <span>+{monthlyBonus.toLocaleString("ru")} ₽</span>
                  </div>
                )}
              </div>
              <div className="bg-gradient-to-r from-[#f5c842]/20 to-[#22c55e]/20 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Итого за месяц</p>
                  {clients >= 3 && (
                    <p className="text-[#22c55e] text-xs mt-0.5">Включая бонус 50 000 ₽</p>
                  )}
                </div>
                <p className="text-white font-black text-4xl">{totalBonus.toLocaleString("ru")} ₽</p>
              </div>
              <a href="#registration"
                className="mt-4 w-full bg-[#f5c842] text-[#0f0f0f] font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#f5c842]/90 transition-all">
                <Icon name="UserPlus" size={18} />
                Начать зарабатывать
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === КАК ЭТО РАБОТАЕТ === */}
      <section id="how-it-works" className="py-16 max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-2">Как это работает</h2>
        <p className="text-white/50 text-center text-sm mb-12">4 простых шага к стабильному доходу</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {howItWorks.map((step) => (
            <div key={step.n} className="relative">
              <div className="text-[#f5c842]/15 font-black text-7xl absolute -top-4 -left-2 select-none leading-none">{step.n}</div>
              <div className="relative pt-8 pl-1">
                <p className="font-bold text-white text-base mb-2">{step.title}</p>
                <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === СКРОЛЛ ПРИЛОЖЕНИЯ === */}
      <section id="app" className="py-16 bg-white/3 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-2">Всё в 2 нажатия</h2>
          <p className="text-white/50 text-center text-sm mb-12">Простое приложение — без заморочек и лишних шагов</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {appScreens.map((screen) => (
              <div key={screen.title} className="bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden hover:border-[#f5c842]/30 transition-all">
                {/* Макет экрана телефона */}
                <div className="bg-[#0f0f0f] px-4 pt-5 pb-4 border-b border-white/5">
                  <div className="bg-[#1a1a1a] rounded-2xl p-4 min-h-[120px] flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-[#f5c842] rounded-lg flex items-center justify-center">
                        <Icon name={screen.icon} size={12} className="text-[#0f0f0f]" />
                      </div>
                      <p className="text-white text-xs font-bold">{screen.title}</p>
                    </div>
                    {/* Имитация контента */}
                    <div className="space-y-1.5">
                      <div className="h-2 bg-white/10 rounded-full w-full" />
                      <div className="h-2 bg-white/10 rounded-full w-4/5" />
                      <div className="h-2 bg-[#f5c842]/30 rounded-full w-3/5" />
                    </div>
                    <div className="mt-3 bg-[#f5c842]/20 rounded-xl px-3 py-2 flex items-center justify-center gap-1">
                      <div className="w-2 h-2 bg-[#f5c842] rounded-full" />
                      <div className="h-1.5 bg-[#f5c842]/60 rounded-full w-16" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-white font-bold text-sm mb-2">{screen.title}</p>
                  <p className="text-white/50 text-xs mb-3 leading-relaxed">{screen.desc}</p>
                  <div className="space-y-1.5">
                    {screen.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="w-4 h-4 rounded-full bg-[#f5c842] text-[#0f0f0f] text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <p className="text-white/60 text-xs">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === ВЫВОД НА КАРТУ === */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-full px-4 py-1.5 text-[#22c55e] text-xs font-semibold mb-5">
              <Icon name="CreditCard" size={12} />
              Вывод денег
            </div>
            <h2 className="text-2xl md:text-3xl font-black mb-4">Деньги на карту за 1–3 дня</h2>
            <p className="text-white/60 text-base leading-relaxed mb-6">
              Никаких звонков и заявок. Всё через приложение — открыл раздел «Финансы», ввёл сумму, нажал кнопку.
            </p>
            <div className="space-y-4">
              {[
                { n: "1", text: "Открываете раздел «Финансы» в приложении", icon: "Wallet" },
                { n: "2", text: "Нажимаете «Вывести на карту»", icon: "CreditCard" },
                { n: "3", text: "Вводите сумму (от 1 000 ₽) и подтверждаете", icon: "Check" },
                { n: "4", text: "Деньги приходят за 1–3 рабочих дня", icon: "Banknote" },
              ].map((step) => (
                <div key={step.n} className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#22c55e] rounded-xl flex items-center justify-center shrink-0">
                    <Icon name={step.icon} size={18} className="text-white" />
                  </div>
                  <p className="text-white/80 text-sm">{step.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Имитация экрана вывода */}
          <div className="flex justify-center">
            <div className="w-64 bg-[#1a1a1a] border border-white/10 rounded-3xl overflow-hidden">
              <div className="bg-[#f5c842] px-5 py-4">
                <p className="text-[#0f0f0f] font-black text-sm">Финансы</p>
                <p className="text-[#0f0f0f]/60 text-xs mt-0.5">Доступно к выводу</p>
                <p className="text-[#0f0f0f] font-black text-3xl mt-1">47 000 ₽</p>
              </div>
              <div className="p-5 space-y-3">
                <div className="bg-white/5 rounded-2xl p-3">
                  <p className="text-white/40 text-xs mb-1">Сумма вывода</p>
                  <p className="text-white font-bold text-lg">47 000 ₽</p>
                </div>
                <div className="bg-white/5 rounded-2xl p-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#f5c842]/20 rounded-xl flex items-center justify-center">
                    <Icon name="CreditCard" size={14} className="text-[#f5c842]" />
                  </div>
                  <div>
                    <p className="text-white text-xs font-semibold">•••• 4521</p>
                    <p className="text-white/40 text-[10px]">Сбербанк</p>
                  </div>
                </div>
                <div className="bg-[#22c55e] rounded-2xl p-3 text-center">
                  <p className="text-white font-black text-sm">Вывести на карту</p>
                </div>
                <p className="text-white/30 text-[10px] text-center">Зачисление за 1–3 рабочих дня</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === О КОМПАНИИ === */}
      <section className="py-14 bg-white/3 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2">
            <img src={LOGO} alt="Нетдолгофф" className="h-14 w-auto object-contain mb-6" />
            <p className="text-white/60 leading-relaxed mb-5">
              Юридический центр «Нетдолгофф» с 2015 года помогает людям законно избавиться от долгов по ФЗ №127 «О несостоятельности». Более 10 000 успешных банкротств по всей России.
            </p>
            <ul className="space-y-2">
              {["Консультация — всегда бесплатно","Без предоплат и скрытых платежей","Коллекторы, документы, суды — берём на себя","Единственное жильё не продаётся"].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                  <div className="w-4 h-4 bg-[#f5c842] rounded flex items-center justify-center shrink-0">
                    <Icon name="Check" size={10} className="text-[#0f0f0f]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            {[
              { val: "2015", label: "Год основания", color: "text-[#f5c842]" },
              { val: "95%", label: "Долгов списывается", color: "text-[#22c55e]" },
              { val: "10 000+", label: "Успешных банкротств", color: "text-[#f5c842]" },
              { val: "8 800", label: "Бесплатный звонок", color: "text-[#22c55e]" },
            ].map(s => (
              <div key={s.val} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <p className={`font-black text-2xl ${s.color}`}>{s.val}</p>
                <p className="text-white/50 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === FAQ === */}
      <section className="py-14 max-w-3xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-10">Частые вопросы</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between text-left gap-4">
                <span className="font-semibold text-sm text-white">{faq.q}</span>
                <Icon name={openFaq === i ? "ChevronUp" : "ChevronDown"} size={16} className="text-white/40 shrink-0" />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* === ФОРМА === */}
      <section id="registration" className="py-16 bg-gradient-to-b from-[#f5c842]/5 to-transparent">
        <div className="max-w-md mx-auto px-4 text-center">
          <img src={LOGO} alt="Нетдолгофф" className="h-12 w-auto object-contain mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-black mb-3">Хотите участвовать?</h2>
          <p className="text-white/50 text-sm mb-8">Оставьте контакт — свяжемся и поможем зарегистрироваться за 5 минут</p>
          {submitted ? (
            <div className="bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-2xl p-8">
              <div className="w-16 h-16 bg-[#22c55e]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="CheckCircle" size={32} className="text-[#22c55e]" />
              </div>
              <p className="font-black text-xl mb-2">Отлично!</p>
              <p className="text-white/60 text-sm">Наш менеджер свяжется с вами в течение 30 минут в рабочее время.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" value={formName} onChange={e => setFormName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white placeholder:text-white/30 outline-none focus:border-[#f5c842]/50 transition-all text-sm" />
              <input type="tel" value={formPhone} onChange={e => setFormPhone(e.target.value)}
                placeholder="Телефон +7..." required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-white placeholder:text-white/30 outline-none focus:border-[#f5c842]/50 transition-all text-sm" />
              <button type="submit"
                className="w-full bg-[#f5c842] text-[#0f0f0f] font-black py-4 rounded-2xl text-base hover:bg-[#f5c842]/90 transition-all flex items-center justify-center gap-2">
                <Icon name="ArrowRight" size={18} />
                Оставить заявку
              </button>
              <p className="text-white/20 text-xs">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных</p>
            </form>
          )}
        </div>
      </section>

      {/* === ФУТЕР === */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={LOGO} alt="Нетдолгофф" className="h-8 w-auto object-contain opacity-60" />
          <div className="flex items-center gap-4 text-white/30 text-xs">
            <a href="https://netdolgoff.ru" className="hover:text-white/60 transition-colors">netdolgoff.ru</a>
            <span>·</span>
            <a href="tel:88007073699" className="hover:text-white/60 transition-colors">{PHONE}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
