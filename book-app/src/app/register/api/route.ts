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

function saveUsers(users: User[]) {
  fs.writeFileSync(dataFile, JSON.stringify(users, null, 2));
}

export async function POST(req: Request) {
  const { username, email, password } = await req.json();
  const users: User[] = readUsers();

  const exists = users.find((u: User) => u.email === email);
  if (exists) {
    return NextResponse.json({ message: "อีเมลนี้ถูกใช้แล้ว" }, { status: 400 });
  }

  const newUser: User = { id: Date.now(), username, email, password };
  users.push(newUser);
  saveUsers(users);

  return NextResponse.json({ message: "สมัครสมาชิกสำเร็จ", user: newUser });
}
