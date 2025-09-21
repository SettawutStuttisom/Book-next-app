import { NextResponse } from "next/server";
import { users } from "@/libs/users"; // 👈 import users จากไฟล์กลาง

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json({
    username: user.username,
    email: user.email,
    token: "fake-jwt-token",
  });
}
