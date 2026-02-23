import { AuthorDto } from "@/types/dto";
import { NextResponse } from "next/server";

const mockAuthors: AuthorDto[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `작가 ${i + 1}`,
  description: `이 작가는 ${i + 1}번째 작가입니다.`,
  profile: "/birthDayCake.png",
  bookList: [
    {
      isbn: `978-00000000${i + 1}`,
      title: `책 제목 ${i + 1}`,
      summary: `책 ${i + 1}의 요약입니다.`,
      publishedDate: new Date(2024, i % 12, 1).toISOString(),
      titleImage: "/birthDayCake.png",
      authorList: [{ id: i + 1, name: `작가 ${i + 1}` }],
      translator: "홍길동",
      price: 15000 + i * 100,
      publisher: { id: 1, name: "모킹출판사" },
    },
  ],
}));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "0", 10);
  const limit = parseInt(searchParams.get("limit") || "6", 10);

  const start = page * limit;
  const end = start + limit;
  const items = mockAuthors.slice(start, end);

  const totalCount = mockAuthors.length;
  const totalPages = Math.ceil(totalCount / limit);
  const hasNext = page < totalPages - 1;
  const hasPrevious = page > 0;

  return NextResponse.json({
    items,
    totalCount,
    totalPages,
    hasNext,
    hasPrevious,
  });
}
