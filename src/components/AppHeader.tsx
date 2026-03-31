import { useTheme } from "@/contexts/ThemeContext";
import Icon from "@/components/ui/icon";

const LOGO_URL =
  "https://cdn.poehali.dev/projects/0e854e39-e393-4f2c-ac74-76b049136ae4/bucket/c16bc285-a108-436c-a4df-1df04c3121ce.png";

export default function AppHeader() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-background/90 backdrop-blur-md border-b border-nd-border">
      <div className="flex items-center justify-between px-4 py-2.5">
        <img
          src={LOGO_URL}
          alt="Нетдолгофф"
          className="h-9 w-auto object-contain dark:brightness-0 dark:invert"
        />

        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover-scale
            bg-nd-card2 border border-nd-border text-nd-muted hover:text-nd-dark dark:hover:text-foreground"
          aria-label="Переключить тему"
        >
          {theme === "light" ? (
            <Icon name="Moon" size={17} />
          ) : (
            <Icon name="Sun" size={17} className="text-nd-yellow" />
          )}
        </button>
      </div>
    </header>
  );
}
