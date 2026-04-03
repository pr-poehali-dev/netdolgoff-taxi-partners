import { useState } from "react";
import Icon from "@/components/ui/icon";

const PHONE = "8 800 707-36-99";
const DRIVER_IMAGE = "https://cdn.poehali.dev/projects/0e854e39-e393-4f2c-ac74-76b049136ae4/files/57e7b534-2a4c-4ce9-993c-fe714fb66750.jpg";
const NETDOLGOFF_LOGO = "https://cdn.poehali.dev/projects/0e854e39-e393-4f2c-ac74-76b049136ae4/bucket/2fcd19b3-59fe-4bf8-bfde-4d4bfa1bfe09.png";

const benefits = [
  { icon: "Wallet", title: "10 000–15 000 ₽", desc: "за каждого клиента, заключившего договор" },
  { icon: "Gift", title: "+300 ₽", desc: "за каждую регистрацию по вашей ссылке" },
  { icon: "Trophy", title: "+50 000 ₽", desc: "бонус за 3 договора в один месяц" },
  { icon: "Clock", title: "1–3 дня", desc: "срок выплаты на карту после подписания договора" },
];

const howItWorks = [
  { n: "01", title: "Регистрируетесь", desc: "Получаете личный промокод, QR-код и реферальную ссылку" },
  { n: "02", title: "Рассказываете пассажирам", desc: "Во время поездки упоминаете про Нетдолгофф. Готовые скрипты — в приложении" },
  { n: "03", title: "Пассажир консультируется", desc: "Бесплатная консультация юриста. Никакого давления" },
  { n: "04", title: "Получаете деньги", desc: "После подписания договора бонус автоматически зачисляется на ваш счёт" },
];

const faqs = [
  { q: "Сколько времени нужно тратить?", a: "Ноль. Вы просто упоминаете компанию в разговоре с пассажиром. Готовые фразы есть в приложении — не нужно ничего придумывать." },
  { q: "Когда и как получу деньги?", a: "После того как ваш пассажир подписал договор с Нетдолгофф. Деньги на карту в течение 1–3 рабочих дней через приложение." },
  { q: "А если пассажир отказался?", a: "Ничего страшного. Вы уже получили +300 ₽ за его регистрацию. Следующий пассажир может оказаться более подходящим." },
  { q: "Нужно ли платить за участие?", a: "Нет. Регистрация и участие в программе абсолютно бесплатны." },
  { q: "Можно ли участвовать без смартфона?", a: "Приложение нужно для отслеживания клиентов и выплат. Но достаточно любого смартфона с браузером." },
];

export default function Landing() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formPhone, setFormPhone] = useState("");
  const [formName, setFormName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formPhone.length >= 10) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans">

      {/* === ШАПКА === */}
      <header className="sticky top-0 z-50 bg-[#0f0f0f]/95 backdrop-blur border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#f5c842] flex items-center justify-center">
              <Icon name="Car" size={16} className="text-[#0f0f0f]" />
            </div>
            <div>
              <p className="font-black text-sm text-white leading-none">Нетдолгофф</p>
              <p className="text-[10px] text-white/40 leading-none">для водителей такси</p>
            </div>
          </div>
          <a
            href="tel:88007073699"
            className="bg-[#f5c842] text-[#0f0f0f] text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5"
          >
            <Icon name="Phone" size={12} />
            {PHONE}
          </a>
        </div>
      </header>

      {/* === HERO === */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5c842]/10 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto px-4 pt-14 pb-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-[#f5c842]/10 border border-[#f5c842]/30 rounded-full px-4 py-1.5 text-[#f5c842] text-xs font-semibold mb-5">
              <Icon name="Zap" size={12} />
              Дополнительный доход для таксистов
            </div>
            <h1 className="text-3xl md:text-5xl font-black leading-tight mb-4">
              Зарабатывай<br />
              <span className="text-[#f5c842]">до 65 000 ₽</span><br />
              в месяц —<br />
              просто разговаривая
            </h1>
            <p className="text-white/60 text-base mb-6 leading-relaxed">
              Рекомендуйте пассажирам юридическую помощь по списанию долгов. Получайте бонус за каждого клиента — автоматически на карту.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#registration"
                className="bg-[#f5c842] text-[#0f0f0f] font-black text-base px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#f5c842]/90 transition-all"
              >
                <Icon name="UserPlus" size={18} />
                Хочу участвовать
              </a>
              <a
                href="#how-it-works"
                className="border border-white/20 text-white font-semibold text-sm px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
              >
                Как это работает
                <Icon name="ChevronDown" size={16} />
              </a>
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#f5c842]/20 rounded-3xl blur-2xl" />
              <img
                src={DRIVER_IMAGE}
                alt="Водитель такси"
                className="relative w-72 h-72 object-cover rounded-3xl border border-white/10"
              />
              <div className="absolute -bottom-3 -right-3 bg-[#22c55e] text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg">
                +10 000 ₽ за клиента
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === ЦИФРЫ === */}
      <section className="bg-[#f5c842] py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-3 gap-4 text-center">
          {[
            { val: "2 015", label: "Год основания\nНетдолгофф" },
            { val: "95%", label: "Долгов списывается\nсредний результат" },
            { val: "10 000+", label: "Успешных\nбанкротств" },
          ].map((s) => (
            <div key={s.val}>
              <p className="text-[#0f0f0f] font-black text-2xl md:text-3xl">{s.val}</p>
              <p className="text-[#0f0f0f]/60 text-xs mt-1 whitespace-pre-line leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === БОНУСЫ === */}
      <section className="py-14 max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-2">Ваш заработок</h2>
        <p className="text-white/50 text-center text-sm mb-8">Все бонусы начисляются автоматически</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {benefits.map((b) => (
            <div key={b.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-[#f5c842]/40 transition-all">
              <div className="w-10 h-10 bg-[#f5c842]/10 rounded-xl flex items-center justify-center mb-3">
                <Icon name={b.icon} size={20} className="text-[#f5c842]" />
              </div>
              <p className="text-[#f5c842] font-black text-xl mb-1">{b.title}</p>
              <p className="text-white/50 text-xs leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* === КАК ЭТО РАБОТАЕТ === */}
      <section id="how-it-works" className="py-14 bg-white/3 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-black text-center mb-2">Как это работает</h2>
          <p className="text-white/50 text-center text-sm mb-10">4 шага к стабильному доходу</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {howItWorks.map((step) => (
              <div key={step.n} className="relative">
                <div className="text-[#f5c842]/20 font-black text-5xl absolute -top-3 -left-1 select-none">{step.n}</div>
                <div className="relative pt-6 pl-2">
                  <p className="font-bold text-white text-base mb-1">{step.title}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* === ИНСТРУМЕНТЫ === */}
      <section className="py-14 max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-2">Всё для работы — в одном приложении</h2>
        <p className="text-white/50 text-center text-sm mb-10">Не нужно ничего придумывать — всё готово</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: "QrCode", title: "QR-код и промокод", desc: "Покажите пассажиру — он сам отсканирует или запишет. Никаких бумажек." },
            { icon: "Bot", title: "ИИ-ассистент", desc: "Готовые скрипты для разговора, ответы на возражения, тренировочные диалоги." },
            { icon: "Users", title: "Воронка клиентов", desc: "Видите статус каждого пассажира: думает, отказался, договор заключён." },
            { icon: "Wallet", title: "Вывод на карту", desc: "Баланс, история, вывод в 1–3 дня. Минимальная сумма — 1 000 ₽." },
            { icon: "Trophy", title: "Бонусы", desc: "Автоматический расчёт: 300 ₽ за регистрацию, 50 000 ₽ за 3 клиента в месяц." },
            { icon: "BookOpen", title: "База знаний", desc: "Статьи о банкротстве — чтобы уверенно отвечать на вопросы пассажиров." },
          ].map((t) => (
            <div key={t.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex gap-3 items-start">
              <div className="w-9 h-9 bg-[#f5c842]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon name={t.icon} size={17} className="text-[#f5c842]" />
              </div>
              <div>
                <p className="font-semibold text-white text-sm mb-1">{t.title}</p>
                <p className="text-white/40 text-xs leading-relaxed">{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* === О НЕТДОЛГОФФ === */}
      <section className="py-14 bg-white/3 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-black mb-4">О компании Нетдолгофф</h2>
            <p className="text-white/60 leading-relaxed mb-4">
              Юридический центр «Нетдолгофф» с 2015 года помогает людям законно избавиться от долгов по кредитам, МФО, ЖКХ и налогам по ФЗ №127 «О несостоятельности».
            </p>
            <ul className="space-y-2">
              {[
                "Консультация — всегда бесплатно",
                "Без предоплат и скрытых платежей",
                "Коллекторы, документы, суды — берём на себя",
                "Единственное жильё защищено",
                "Работаем по всей России",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                  <div className="w-4 h-4 bg-[#f5c842] rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={10} className="text-[#0f0f0f]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center max-w-xs">
              <div className="w-16 h-16 bg-[#f5c842] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={28} className="text-[#0f0f0f]" />
              </div>
              <p className="font-black text-xl mb-1">netdolgoff.ru</p>
              <p className="text-white/40 text-sm mb-4">Официальный сайт</p>
              <a href="https://netdolgoff.ru" target="_blank" rel="noreferrer"
                className="text-[#f5c842] text-sm font-semibold flex items-center justify-center gap-1.5 hover:opacity-80">
                Перейти на сайт <Icon name="ExternalLink" size={13} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* === FAQ === */}
      <section className="py-14 max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-10">Частые вопросы</h2>
        <div className="space-y-3 max-w-2xl mx-auto">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full px-5 py-4 flex items-center justify-between text-left"
              >
                <span className="font-semibold text-sm text-white pr-4">{faq.q}</span>
                <Icon
                  name={openFaq === i ? "ChevronUp" : "ChevronDown"}
                  size={16}
                  className="text-white/40 flex-shrink-0 transition-transform"
                />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* === ФОРМА РЕГИСТРАЦИИ === */}
      <section id="registration" className="py-16 bg-gradient-to-b from-[#f5c842]/5 to-transparent">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-[#f5c842]/10 border border-[#f5c842]/30 rounded-full px-4 py-1.5 text-[#f5c842] text-xs font-semibold mb-5">
            <Icon name="UserPlus" size={12} />
            Участвуют уже 200+ водителей Москвы
          </div>
          <h2 className="text-2xl md:text-3xl font-black mb-3">Хотите участвовать?</h2>
          <p className="text-white/50 text-sm mb-8">
            Оставьте контакт — мы свяжемся, расскажем подробности и поможем зарегистрироваться в 5 минут
          </p>

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
              <input
                type="text"
                value={formName}
                onChange={e => setFormName(e.target.value)}
                placeholder="Ваше имя"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none focus:border-[#f5c842]/50 transition-all text-sm"
              />
              <input
                type="tel"
                value={formPhone}
                onChange={e => setFormPhone(e.target.value)}
                placeholder="Телефон +7 ..."
                required
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder:text-white/30 outline-none focus:border-[#f5c842]/50 transition-all text-sm"
              />
              <button
                type="submit"
                className="w-full bg-[#f5c842] text-[#0f0f0f] font-black py-3.5 rounded-2xl text-base hover:bg-[#f5c842]/90 transition-all flex items-center justify-center gap-2"
              >
                <Icon name="ArrowRight" size={18} />
                Оставить заявку
              </button>
              <p className="text-white/20 text-xs">
                Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
              </p>
            </form>
          )}
        </div>
      </section>

      {/* === ФУТЕР === */}
      <footer className="border-t border-white/5 py-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#f5c842] flex items-center justify-center">
              <Icon name="Car" size={13} className="text-[#0f0f0f]" />
            </div>
            <p className="text-white/60 text-sm">Нетдолгофф · Партнёрская программа для водителей</p>
          </div>
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
