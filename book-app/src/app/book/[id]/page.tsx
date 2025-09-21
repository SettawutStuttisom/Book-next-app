"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BooksPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) {
      router.push("/login");
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [router]);

  if (!user) return <p>กำลังตรวจสอบการเข้าสู่ระบบ...</p>;

  // สมมุติข้อมูลหนังสือ
  const books = [
    { title: "Book A", author: "Author A", year: 2023, price: 250 },
    { title: "Book B", author: "Author B", year: 2024, price: 350 },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">ยินดีต้อนรับ {user.username}</h1>
      <p>Email: {user.email}</p>
      <h2 className="text-xl mt-4">รายการหนังสือ</h2>
      <ul className="list-disc pl-6">
        {books.map((book, idx) => (
          <li key={idx} className="mt-2">
            <strong>{book.title}</strong> — {book.author} ({book.year}) ราคา {book.price} บาท
          </li>
        ))}
      </ul>
    </div>
  );
}
