"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthService from "@/libs/AuthService";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [form, setForm] = useState<RegisterForm>({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await AuthService.Register(form);
      setMessage(res.message || "สมัครสมาชิกสำเร็จ");
      if (res.user) {
        setTimeout(() => router.push("/login"), 1500);
      }
    } catch (error) {
      console.error(error);
      setMessage("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleRegister} className="p-6 bg-white shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="border p-2 w-full mb-3"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border p-2 w-full mb-3"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
          Register
        </button>

        {message && <p className="mt-3 text-sm">{message}</p>}
      </form>
    </div>
  );
}
