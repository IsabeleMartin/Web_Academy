"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  emailUsuario: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [emailUsuario, setEmailUsuario] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const usuarioSalvo = localStorage.getItem("user");
    if (usuarioSalvo) {
      setEmailUsuario(usuarioSalvo);
    }
  }, []);

  const login = (email: string) => {
    setEmailUsuario(email);
    localStorage.setItem("user", email);
    router.push("/");
  };

  const logout = () => {
    setEmailUsuario(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ emailUsuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
