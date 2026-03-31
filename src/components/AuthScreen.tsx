import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Icon from "@/components/ui/icon";

const LOGO_URL =
  "https://cdn.poehali.dev/projects/0e854e39-e393-4f2c-ac74-76b049136ae4/bucket/c16bc285-a108-436c-a4df-1df04c3121ce.png";

type Step = "phone" | "code" | "name";

const formatPhone = (raw: string) => {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length === 0) return "";
  let result = "+7";
  if (digits.length > 1) result += " (" + digits.slice(1, 4);
  if (digits.length > 4) result += ") " + digits.slice(4, 7);
  if (digits.length > 7) result += "-" + digits.slice(7, 9);
  if (digits.length > 9) result += "-" + digits.slice(9, 11);
  return result;
};

export default function AuthScreen() {
  const { login } = useAuth();
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [rawPhone, setRawPhone] = useState("");
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    setRawPhone(raw);
    setPhone(formatPhone(raw));
    setError("");
  };

  const handleSendCode = () => {
    if (rawPhone.length < 11) {
      setError("Введите полный номер телефона");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("code");
    }, 1200);
  };

  const handleVerifyCode = () => {
    if (code.length < 4) {
      setError("Введите 4-значный код");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("name");
    }, 800);
  };

  const handleFinish = () => {
    if (name.trim().length < 2) {
      setError("Введите ваше имя");
      return;
    }
    login({ name: name.trim(), phone });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 max-w-md mx-auto">
      {/* Logo */}
      <div className="mb-8 text-center">
        <img src={LOGO_URL} alt="Нетдолгофф" className="h-14 w-auto object-contain mx-auto mb-3" />
        <p className="text-nd-muted text-sm">Партнёрская программа для водителей</p>
      </div>

      {/* Card */}
      <div className="w-full bg-nd-card nd-card-glow rounded-3xl p-6">

        {/* Step: phone */}
        {step === "phone" && (
          <div className="animate-fade-in">
            <h2 className="text-foreground text-xl font-black mb-1">Вход в кабинет</h2>
            <p className="text-nd-muted text-sm mb-6">Введите номер телефона</p>

            <label className="block text-nd-muted text-xs font-semibold uppercase tracking-wider mb-2">
              Номер телефона
            </label>
            <div className={`flex items-center gap-3 bg-nd-card2 border-2 rounded-2xl px-4 py-3 transition-all ${
              error ? "border-nd-red" : "border-nd-border focus-within:border-nd-yellow"
            }`}>
              <Icon name="Phone" size={18} className="text-nd-muted flex-shrink-0" />
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneInput}
                placeholder="+7 (___) ___-__-__"
                className="flex-1 bg-transparent text-foreground text-base outline-none placeholder:text-nd-border font-medium"
                autoFocus
              />
            </div>
            {error && <p className="text-nd-red text-xs mt-2 flex items-center gap-1"><Icon name="AlertCircle" size={12} />{error}</p>}

            <button
              onClick={handleSendCode}
              disabled={loading}
              className="w-full mt-5 py-4 rounded-2xl nd-gradient text-nd-dark font-bold text-base nd-yellow-glow hover-scale disabled:opacity-60 flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <><Icon name="Loader" size={18} className="animate-spin" />Отправляем код...</>
              ) : (
                <>Получить код<Icon name="ArrowRight" size={18} /></>
              )}
            </button>
          </div>
        )}

        {/* Step: code */}
        {step === "code" && (
          <div className="animate-fade-in">
            <button onClick={() => setStep("phone")} className="flex items-center gap-1 text-nd-muted text-sm mb-4 hover:text-foreground transition-colors">
              <Icon name="ChevronLeft" size={16} />Назад
            </button>
            <h2 className="text-foreground text-xl font-black mb-1">Введите код</h2>
            <p className="text-nd-muted text-sm mb-1">Отправили SMS на номер</p>
            <p className="text-foreground font-bold mb-6">{phone}</p>

            <label className="block text-nd-muted text-xs font-semibold uppercase tracking-wider mb-2">
              Код из SMS
            </label>
            <div className={`flex items-center gap-3 bg-nd-card2 border-2 rounded-2xl px-4 py-3 transition-all ${
              error ? "border-nd-red" : "border-nd-border focus-within:border-nd-yellow"
            }`}>
              <Icon name="KeyRound" size={18} className="text-nd-muted flex-shrink-0" />
              <input
                type="number"
                value={code}
                onChange={(e) => { setCode(e.target.value.slice(0, 4)); setError(""); }}
                placeholder="0000"
                className="flex-1 bg-transparent text-foreground text-2xl font-black outline-none placeholder:text-nd-border tracking-widest"
                autoFocus
                maxLength={4}
              />
            </div>
            {error && <p className="text-nd-red text-xs mt-2 flex items-center gap-1"><Icon name="AlertCircle" size={12} />{error}</p>}

            <div className="mt-3 text-center">
              <button onClick={() => setStep("phone")} className="text-nd-muted text-xs hover:text-nd-yellow-dark transition-colors">
                Отправить код повторно
              </button>
            </div>

            <button
              onClick={handleVerifyCode}
              disabled={loading || code.length < 4}
              className="w-full mt-5 py-4 rounded-2xl nd-gradient text-nd-dark font-bold text-base nd-yellow-glow hover-scale disabled:opacity-60 flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <><Icon name="Loader" size={18} className="animate-spin" />Проверяем...</>
              ) : (
                <>Подтвердить<Icon name="ArrowRight" size={18} /></>
              )}
            </button>
          </div>
        )}

        {/* Step: name */}
        {step === "name" && (
          <div className="animate-fade-in">
            <div className="w-14 h-14 rounded-2xl bg-nd-yellow flex items-center justify-center mb-4">
              <Icon name="User" size={26} className="text-nd-dark" />
            </div>
            <h2 className="text-foreground text-xl font-black mb-1">Как вас зовут?</h2>
            <p className="text-nd-muted text-sm mb-6">Введите ваше имя для личного кабинета</p>

            <label className="block text-nd-muted text-xs font-semibold uppercase tracking-wider mb-2">
              Ваше имя
            </label>
            <div className={`flex items-center gap-3 bg-nd-card2 border-2 rounded-2xl px-4 py-3 transition-all ${
              error ? "border-nd-red" : "border-nd-border focus-within:border-nd-yellow"
            }`}>
              <Icon name="UserCircle" size={18} className="text-nd-muted flex-shrink-0" />
              <input
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
                placeholder="Например: Алексей"
                className="flex-1 bg-transparent text-foreground text-base outline-none placeholder:text-nd-border font-medium"
                autoFocus
              />
            </div>
            {error && <p className="text-nd-red text-xs mt-2 flex items-center gap-1"><Icon name="AlertCircle" size={12} />{error}</p>}

            <button
              onClick={handleFinish}
              disabled={name.trim().length < 2}
              className="w-full mt-5 py-4 rounded-2xl nd-gradient text-nd-dark font-bold text-base nd-yellow-glow hover-scale disabled:opacity-60 flex items-center justify-center gap-2 transition-all"
            >
              Начать зарабатывать
              <Icon name="Rocket" size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-nd-muted text-xs leading-relaxed">
          Нажимая «Получить код», вы соглашаетесь<br/>
          с условиями партнёрской программы Нетдолгофф
        </p>
      </div>
    </div>
  );
}
