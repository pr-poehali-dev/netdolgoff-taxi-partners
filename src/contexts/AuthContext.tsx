import { createContext, useContext, useState } from "react";

export interface User {
  name: string;
  phone: string;
  promo: string;
  referredBy?: string;
  referredBySource?: "link" | "qr" | "promo";
}

interface AuthContextValue {
  user: User | null;
  login: (data: { name: string; phone: string; referredBy?: string; referredBySource?: "link" | "qr" | "promo" }) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
});

function generatePromo(phone: string): string {
  const digits = phone.replace(/\D/g, "").slice(-4);
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const prefix = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
  return `ND-${prefix}${digits}`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("nd-user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (data: { name: string; phone: string; referredBy?: string; referredBySource?: "link" | "qr" | "promo" }) => {
    const newUser: User = {
      name: data.name,
      phone: data.phone,
      promo: generatePromo(data.phone),
      referredBy: data.referredBy,
      referredBySource: data.referredBySource,
    };
    setUser(newUser);
    localStorage.setItem("nd-user", JSON.stringify(newUser));
    sessionStorage.removeItem("nd-ref-code");
    sessionStorage.removeItem("nd-ref-source");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("nd-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
