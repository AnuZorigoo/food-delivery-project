"use client";

import { api } from "@/lib/axios";
import { useRouter } from "next/navigation";
import {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { toast } from "sonner";

type User = {
  _id: string;
  username: string;
  email: string;
  role: string;
  address?: string;
};

type LoginResponse = {
  user: User;
  accessToken: string;
};

type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;

  refetchMe: () => Promise<void>;
  updateAddress: (address: string) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  const refetchMe = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    try {
      const { data } = await api.get<{ user: User }>("/auth/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setUser(data.user);
    } catch {
      localStorage.removeItem("accessToken");
      setUser(null);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const { data } = await api.post<LoginResponse>("/auth/login", {
        username,
        password,
      });

      const { user, accessToken } = data;

      localStorage.setItem("accessToken", accessToken);
      setUser(user);

      router.push(user.role === "admin" ? "/admin" : "/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
  ) => {
    try {
      await api.post("/auth/register", {
        username,
        email,
        password,
      });

      router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Register failed");
    }
  };

  const updateAddress = async (address: string) => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      toast.error("Please login first");
      return;
    }

    const trimmed = address.trim();
    if (!trimmed) {
      toast.error("Address is empty");
      return;
    }

    try {
      const { data } = await api.patch<{ user: User }>(
        "/auth/address",
        { address: trimmed },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setUser(data.user);
      toast.success("Location saved");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to save location");
    }
  };

  useEffect(() => {
    refetchMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        refetchMe,
        updateAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
