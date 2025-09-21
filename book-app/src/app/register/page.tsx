"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthService from "@/libs/AuthService";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    }
    try {
      await AuthService.Register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "เกิดข้อผิดพลาดในการลงทะเบียน");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl mb-4">ลงทะเบียน</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="username" placeholder="Username" onChange={handleChange} className="w-full border p-2" />
        <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full border p-2" />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="w-full border p-2" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Register</button>
      </form>
    </div>
  );
}
