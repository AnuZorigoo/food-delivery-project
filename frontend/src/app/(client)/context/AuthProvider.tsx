"use client";

import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  useState,
  PropsWithChildren,
  use,
  useContext,
  useEffect,
} from "react";
import { toast } from "sonner";
import { set } from "zod";

type AuthContextType = {
  user: User | null;
  logout: () => void;
  login: (username: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
};

type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
};
type LoginResponse = {
  user: User;
  accessToken: string;
};
export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = async (username: string, password: string) => {
    try {
      const { data } = await api.post<LoginResponse>("/auth/login", {
        username,
        password,
      });
      const { user, accessToken } = data;

      localStorage.setItem("accessToken", accessToken);

      setUser(user);

      router.push("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };
  const register = async (name: string, email: string, password: string) => {
    const { data } = await api.post("/auth/register", {
      name,
      email,
      password,
    });

    router.push("/login");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    const fetchMe = async () => {
      try {
        const { data } = await api.get<{ user: User }>("/auth/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(data.user);
      } catch {
        localStorage.removeItem("accessToken");
      }
    };

    fetchMe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
