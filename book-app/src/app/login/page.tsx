"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      setMessage(data.message);

      if (res.ok && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/"); // login สำเร็จ → ไปหน้า Home
      }
    } catch (error) {
      console.error(error);
      setMessage("เกิดข้อผิดพลาด");
    }
  };

  const goToRegister = () => {
    router.push("/register");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow rounded w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

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

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Login
        </button>

        {message && <p className="mt-3 text-sm">{message}</p>}

        <button
          type="button"
          onClick={goToRegister}
          className="mt-3 text-blue-600 underline w-full text-center"
        >
          Register
        </button>
      </form>
    </div>
  );
}
