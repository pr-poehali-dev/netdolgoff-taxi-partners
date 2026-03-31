import { useState } from "react";
import Icon from "@/components/ui/icon";

const articles = [
  {
    id: 1,
    category: "Основы",
    title: "Что такое банкротство физического лица?",
    description: "Процедура законного списания долгов по ФЗ-127",
    readTime: "5 мин",
    icon: "BookOpen",
    content: `Банкротство физического лица — это законная процедура, позволяющая гражданину полностью или частично списать долги при невозможности их погашения.

**Кто может подать на банкротство?**
• Долг от 50 000 ₽ (через МФЦ) или от 500 000 ₽ (через суд)
• Просрочка платежей более 3 месяцев
• Нет возможности погасить долг

**Что можно списать?**
✓ Кредиты и займы
✓ Микрозаймы (МФО)
✓ Долги по ЖКХ
✓ Налоговые задолженности

**Что нельзя списать?**
✗ Алименты
✗ Штрафы за уголовные преступления
✗ Долги по возмещению вреда здоровью`,
  },
  {
    id: 2,
    category: "Процедура",
    title: "Этапы процедуры банкротства",
    description: "Пошаговый процесс от заявления до завершения",
    readTime: "7 мин",
    icon: "List",
    content: `**Этап 1: Консультация и анализ (бесплатно)**
Юристы Нетдолгофф изучают вашу ситуацию и подбирают оптимальную стратегию.

**Этап 2: Подача заявления**
Сбор документов и подача заявления в арбитражный суд.

**Этап 3: Реструктуризация (до 3 лет)**
Суд назначает финансового управляющего. Разрабатывается план погашения.

**Этап 4: Реализация имущества (6–12 месяцев)**
Если реструктуризация невозможна — продажа имущества (единственное жильё НЕ продаётся).

**Этап 5: Списание долгов**
Суд выносит решение о списании оставшихся долгов. Вы финансово свободны!`,
  },
  {
    id: 3,
    category: "Для водителей",
    title: "Скрипты для разговора с пассажиром",
    description: "Как правильно предложить услугу и не быть навязчивым",
    readTime: "4 мин",
    icon: "MessageSquare",
    content: `**Открывающий вопрос:**
«Как дела с долгами? Многие сейчас попали в сложную ситуацию...»

**Если пассажир проявил интерес:**
«Есть компания — Нетдолгофф. Они помогают людям законно избавиться от долгов. По специальному закону ФЗ-127 можно списать до 95% задолженности. Консультация — бесплатно.»

**Если спрашивают про цену:**
«Стоимость рассчитывается индивидуально. На консультации всё объяснят. Она бесплатная.»

**Передача контакта:**
«Вот моя ссылка — там можно оставить заявку. Или скажите промокод: [ваш промокод]»

**Важно:** Не давите. Просто предложите и дайте выбор.`,
  },
  {
    id: 4,
    category: "Частые вопросы",
    title: "Что будет с имуществом при банкротстве?",
    description: "Мифы и реальность о потере имущества",
    readTime: "6 мин",
    icon: "Home",
    content: `**МИФ: Заберут квартиру**
РЕАЛЬНОСТЬ: Единственное жильё НЕ подлежит продаже. Если квартира — ваш единственный дом, она защищена законом.

**МИФ: Нельзя будет работать**
РЕАЛЬНОСТЬ: Вы можете продолжать работать. Ограничения только на занятие руководящих должностей (3 года).

**МИФ: Испортится кредитная история навсегда**
РЕАЛЬНОСТЬ: Кредитная история обновляется. Через 5–7 лет можно снова получать кредиты.

**МИФ: Это очень долго**
РЕАЛЬНОСТЬ: Внесудебное банкротство через МФЦ — всего 6 месяцев.

**МИФ: Это дорого**
РЕАЛЬНОСТЬ: В Нетдолгофф есть рассрочка на оплату услуг.`,
  },
  {
    id: 5,
    category: "Основы",
    title: "Признаки банкротства у пассажира",
    description: "Как понять, что человеку нужна помощь",
    readTime: "3 мин",
    icon: "AlertCircle",
    content: `**Разговор о деньгах — ваш шанс помочь:**

Если пассажир упоминает:
• «Замучили коллекторы»
• «Не могу платить кредит»
• «Долги висят уже несколько лет»
• «Приставы заблокировали карту»
• «Не знаю как выбраться из долгов»

Это прямые сигналы, что человеку нужна помощь.

**Что НЕ нужно:**
✗ Не давите на человека
✗ Не спрашивайте конкретные суммы долга
✗ Не обещайте результат (только юристы могут это делать)

**Что НУЖНО:**
✓ Проявить сочувствие
✓ Поделиться информацией о компании
✓ Дать ссылку и промокод
✓ Сказать, что консультация бесплатная`,
  },
];

export default function KnowledgePage() {
  const [selectedArticle, setSelectedArticle] = useState<typeof articles[0] | null>(null);
  const [activeCategory, setActiveCategory] = useState("Все");

  const categories = ["Все", ...Array.from(new Set(articles.map(a => a.category)))];
  const filtered = activeCategory === "Все" ? articles : articles.filter(a => a.category === activeCategory);

  if (selectedArticle) {
    return (
      <div className="flex flex-col animate-fade-in">
        <div className="px-4 pt-10 pb-4 flex items-center gap-3">
          <button
            onClick={() => setSelectedArticle(null)}
            className="w-9 h-9 rounded-xl bg-nd-card nd-card-glow flex items-center justify-center"
          >
            <Icon name="ChevronLeft" size={18} className="text-foreground" />
          </button>
          <span className="status-badge bg-nd-red/10 text-nd-red">{selectedArticle.category}</span>
        </div>
        <div className="px-4">
          <h1 className="text-xl font-black text-foreground mb-1">{selectedArticle.title}</h1>
          <p className="text-nd-muted text-xs flex items-center gap-1 mb-6">
            <Icon name="Clock" size={12} />
            {selectedArticle.readTime} чтения
          </p>
          <div className="bg-nd-card nd-card-glow rounded-2xl p-4">
            {selectedArticle.content.split("\n").map((line, i) => {
              if (line.startsWith("**") && line.endsWith("**")) {
                return <p key={i} className="text-foreground font-bold text-sm mt-4 mb-2 first:mt-0">{line.replace(/\*\*/g, "")}</p>;
              }
              if (line.startsWith("✓") || line.startsWith("✗") || line.startsWith("•")) {
                return <p key={i} className={`text-sm mb-1 pl-2 ${line.startsWith("✓") ? "text-nd-green" : line.startsWith("✗") ? "text-nd-muted line-through" : "text-foreground"}`}>{line}</p>;
              }
              if (line.trim() === "") return <div key={i} className="h-2" />;
              return <p key={i} className="text-nd-muted text-sm leading-relaxed mb-1">{line}</p>;
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="px-4 pt-10 pb-5">
        <h1 className="text-2xl font-black text-foreground">База знаний</h1>
        <p className="text-nd-muted text-sm mt-1">Всё о банкротстве и работе с клиентами</p>
      </div>

      {/* Categories */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all ${
                activeCategory === cat
                  ? "bg-nd-red text-white"
                  : "bg-nd-card text-nd-muted border border-nd-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles */}
      <div className="px-4 space-y-3 mb-6">
        {filtered.map((article, idx) => (
          <button
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="w-full bg-nd-card nd-card-glow rounded-2xl p-4 text-left hover-scale"
            style={{ animationDelay: `${idx * 0.05}s` }}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-nd-red/10 flex items-center justify-center flex-shrink-0">
                <Icon name={article.icon} size={18} className="text-nd-red" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="status-badge bg-nd-card2 text-nd-muted">{article.category}</span>
                  <span className="text-nd-muted text-[10px] flex items-center gap-0.5">
                    <Icon name="Clock" size={10} />
                    {article.readTime}
                  </span>
                </div>
                <p className="text-foreground font-semibold text-sm leading-snug">{article.title}</p>
                <p className="text-nd-muted text-xs mt-1 leading-snug">{article.description}</p>
              </div>
              <Icon name="ChevronRight" size={16} className="text-nd-border flex-shrink-0 mt-1" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
