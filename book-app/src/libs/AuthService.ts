import { RegisterForm } from "@/libs/types/RegisterForm";
import { RegisterRes } from "@/libs/types/RegisterRes";

export default class AuthService {
  static async Register(data: RegisterForm): Promise<RegisterRes> {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }

  static async Login(email: string, password: string) {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  }

  static getUser() {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }

  static logout() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("user");
  }
}
