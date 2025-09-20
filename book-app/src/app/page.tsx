"use client";
import { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import type { BookResponse, Book } from "@/types/book";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthService from "@/libs/AuthService";

export default function Home() {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  /** ✅ โหลด user จาก localStorage หลังจาก mounted */
  useEffect(() => {
    setUser(AuthService.getUser());
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/api/books`);
      if (response.ok) {
        const data: BookResponse = await response.json();
        setBooksData(data.books);
      }
    } catch (err) {
      console.error("Error fetching books:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container sx={{ marginTop: 4 }}>
      {user ? (
        <>
          <Typography variant="h4" gutterBottom>👋 สวัสดี {user.username}</Typography>
          <Typography variant="body1" gutterBottom>อีเมล: {user.email}</Typography>
          <Button
            variant="contained"
            color="error"
            onClick={() => { AuthService.logout(); router.push("/login"); }}
            sx={{ marginBottom: 3 }}
          >
            ออกจากระบบ
          </Button>
        </>
      ) : (
        <>
          <Typography variant="h5" gutterBottom>ยังไม่ได้เข้าสู่ระบบ</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push("/login")}
            sx={{ marginBottom: 3 }}
          >
            ไปที่หน้าเข้าสู่ระบบ
          </Button>
        </>
      )}

      <Typography variant="h4" gutterBottom>📚 รายการหนังสือ</Typography>
      {isLoading && <Typography>Loading...</Typography>}
      {booksData.map((book) => (
        <Link href={`/book/${book._id}`} key={book._id} style={{ display: "block", marginBottom: 10 }}>
          <Typography variant="body1">{book.title}</Typography>
        </Link>
      ))}
    </Container>
  );
}
