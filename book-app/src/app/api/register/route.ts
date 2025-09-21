import { NextResponse } from "next/server";
import { users } from "@/libs/users"; // 👈 import users จากไฟล์กลาง

export async function POST(req: Request) {
  const body = await req.json();
  const { username, email, password } = body;

  if (!username || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (users.find((u) => u.email === email)) {
    return NextResponse.json({ error: "Email already exists" }, { status: 400 });
  }

  users.push({ username, email, password });

  return NextResponse.json({ message: "Register success" }, { status: 200 });
}
