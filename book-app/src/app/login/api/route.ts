import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

const dataFile = path.join(process.cwd(), "users.json");

function readUsers(): User[] {
  if (!fs.existsSync(dataFile)) return [];
  return JSON.parse(fs.readFileSync(dataFile, "utf-8"));
}

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const users: User[] = readUsers();

  const user = users.find((u: User) => u.email === email && u.password === password);
  if (!user) {
    return NextResponse.json({ message: "อีเมลหรือรหัสไม่ถูกต้อง" }, { status: 400 });
  }

  return NextResponse.json({ message: "เข้าสู่ระบบสำเร็จ", user });
}
