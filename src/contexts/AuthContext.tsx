import { createContext, useContext, useState } from "react";

interface User {
  name: string;
  phone: string;
}

interface AuthContextValue {
  user: User | null;
  login: (data: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("nd-user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (data: User) => {
    setUser(data);
    localStorage.setItem("nd-user", JSON.stringify(data));
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
