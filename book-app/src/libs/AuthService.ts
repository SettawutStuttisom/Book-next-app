import { RegisterForm } from "@/libs/types/RegisterForm";

export default class AuthService {
  static async Register(data: RegisterForm): Promise<any> {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Register failed: ${text}`);
    }
    return response.json();
  }

  static async Login(data: { email: string; password: string }): Promise<any> {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Login failed: ${text}`);
    }
    return response.json();
  }
}
