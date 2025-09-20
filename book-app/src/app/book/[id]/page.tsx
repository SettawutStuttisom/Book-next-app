"use client";
import { Book } from "@/types/book";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BookDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 🔹 ใช้ URL backend ตรง ๆ เพื่อเช็ก
        const response = await fetch(`http://localhost:3001/books/${id}`);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setBook(data.book || data); // เผื่อ backend ส่ง { book: {...} } หรือส่ง {...} ตรงๆ
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (loading) {
    return <p>กำลังโหลดข้อมูล...</p>;
  }

  if (!book) {
    return (
      <div>
        <h2>❌ ไม่พบข้อมูลหนังสือ</h2>
        <button onClick={() => router.push("/")}>กลับไปหน้ารายการ</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>✍️ ผู้แต่ง: {book.author}</p>
      <p>{book.description}</p>
      <p>💰 ราคา: {book.price} บาท</p>
      <button onClick={() => router.push("/")}>⬅ กลับไปหน้ารายการ</button>
    </div>
  );
}
