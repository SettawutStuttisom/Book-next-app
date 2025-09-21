"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthService from "@/libs/AuthService";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await AuthService.Login({
        email: formData.email,
        password: formData.password,
      });
      // เก็บ user ใน localStorage
      localStorage.setItem("user", JSON.stringify(res));
      router.push("/books");
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">เข้าสู่ระบบ</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full border p-2" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">Login</button>
      </form>
      <p className="mt-3">
        ยังไม่มีบัญชี?{" "}
        <button onClick={() => router.push("/register")} className="text-blue-500 underline">
          ลงทะเบียน
        </button>
      </p>
    </div>
  );
}
