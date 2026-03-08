import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "analyst" | "viewer";
  organization: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, organization: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: { email: string; password: string; user: User }[] = [
  {
    email: "admin@aiguardian.ai",
    password: "admin123",
    user: {
      id: "usr_001",
      email: "admin@aiguardian.ai",
      name: "Yashashvi Nandanwar",
      role: "admin",
      organization: "NeuralGuardians",
    },
  },
  {
    email: "analyst@aiguardian.ai",
    password: "analyst123",
    user: {
      id: "usr_002",
      email: "analyst@aiguardian.ai",
      name: "Shreyash Kulkarni",
      role: "analyst",
      organization: "NeuralGuardians",
    },
  },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ai_guardian_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("ai_guardian_user");
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const found = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      setUser(found.user);
      localStorage.setItem("ai_guardian_user", JSON.stringify(found.user));
      return true;
    }
    // Allow any signup'd user
    const signups = JSON.parse(localStorage.getItem("ai_guardian_signups") || "[]");
    const signedUp = signups.find(
      (u: any) => u.email === email && u.password === password
    );
    if (signedUp) {
      const usr: User = {
        id: signedUp.id,
        email: signedUp.email,
        name: signedUp.name,
        role: "viewer",
        organization: signedUp.organization,
      };
      setUser(usr);
      localStorage.setItem("ai_guardian_user", JSON.stringify(usr));
      return true;
    }
    return false;
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    organization: string
  ): Promise<boolean> => {
    const signups = JSON.parse(localStorage.getItem("ai_guardian_signups") || "[]");
    if (signups.some((u: any) => u.email === email) || DEMO_USERS.some((u) => u.email === email)) {
      return false;
    }
    const newUser = {
      id: `usr_${Date.now()}`,
      email,
      name,
      password,
      organization,
    };
    signups.push(newUser);
    localStorage.setItem("ai_guardian_signups", JSON.stringify(signups));
    const usr: User = {
      id: newUser.id,
      email,
      name,
      role: "viewer" as const,
      organization,
    };
    setUser(usr);
    localStorage.setItem("ai_guardian_user", JSON.stringify(usr));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ai_guardian_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
