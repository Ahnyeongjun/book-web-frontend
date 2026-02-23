import { http, HttpResponse } from "msw";
import {
  mockPageResponseBookDto,
  mockBookDetail,
  mockListResponseRecommendedBookDto,
  mockListResponseContentsDto,
  mockPageResponseContentsDto,
  mockContentsDetail,
  mockPageResponsePublisherDto,
  mockPublisherDetail,
  mockPageResponseEventDto,
  mockAuthors,
  mockPageResponseAuthorDto,
  mockContacts,
  mockLoginResponse,
  mockKakaoBookResponse,
  mockBookViewLogs,
  mockBookSearchLogs,
  mockAdminKakaoBooks,
  mockBooks,
  mockContents,
  mockEvents,
} from "./data";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
const ADMIN_URL = process.env.NEXT_PUBLIC_BACKEND_ADMIN_URL || "http://localhost:8081";
const KAKAO_API_URL = process.env.NEXT_PUBLIC_KAKAO_SEARCH_API_URL || "https://dapi.kakao.com/v3/search";

export const handlers = [
  // ════════════════════════════════════════
  // Books
  // ════════════════════════════════════════

  // GET /books - 도서 목록 (keyword, page, limit, orderBy, direction)
  http.get(`${BACKEND_URL}/books`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "0");
    const limit = Number(url.searchParams.get("limit") || "10");
    const items = mockBooks.slice(page * limit, (page + 1) * limit);

    return HttpResponse.json({
      items,
      totalCount: mockBooks.length,
      totalPages: Math.ceil(mockBooks.length / limit),
      hasNext: (page + 1) * limit < mockBooks.length,
      hasPrevious: page > 0,
    });
  }),

  // GET /books/recommended - 추천 도서
  http.get(`${BACKEND_URL}/books/recommended`, () => {
    return HttpResponse.json(mockListResponseRecommendedBookDto);
  }),

  // GET /books/birthday - 생일 도서
  http.get(`${BACKEND_URL}/books/birthday`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "0");
    const limit = Number(url.searchParams.get("limit") || "10");
    const items = mockBooks.slice(page * limit, (page + 1) * limit);

    return HttpResponse.json({
      items,
      totalCount: mockBooks.length,
      totalPages: Math.ceil(mockBooks.length / limit),
      hasNext: (page + 1) * limit < mockBooks.length,
      hasPrevious: page > 0,
    });
  }),

  // GET /books/:isbn/contents - 도서 콘텐츠
  http.get(`${BACKEND_URL}/books/:isbn/contents`, () => {
    return HttpResponse.json(mockListResponseContentsDto);
  }),

  // GET /books/:isbn - 도서 상세 (also handles /books/{isbn}?isbn=xxx pattern)
  http.get(`${BACKEND_URL}/books/:isbn`, ({ params }) => {
    const isbn = params.isbn as string;
    // /books/{isbn}?isbn=xxx 패턴 처리
    if (isbn === "{isbn}") {
      return HttpResponse.json(mockBookDetail);
    }
    return HttpResponse.json({
      ...mockBookDetail,
      isbn,
    });
  }),

  // ════════════════════════════════════════
  // Events
  // ════════════════════════════════════════

  // GET /events - 이벤트 목록
  http.get(`${BACKEND_URL}/events`, ({ request }) => {
    const url = new URL(request.url);
    const eventFlag = url.searchParams.get("eventFlag");
    const location = url.searchParams.get("location");

    let filtered = [...mockEvents];
    if (eventFlag) {
      filtered = filtered.filter((e) => e.eventFlag === eventFlag);
    }
    if (location) {
      filtered = filtered.filter((e) => e.location === location);
    }

    return HttpResponse.json({
      items: filtered,
      totalCount: filtered.length,
      totalPages: 1,
      hasNext: false,
      hasPrevious: false,
    });
  }),

  // POST /events - 이벤트 생성
  http.post(`${BACKEND_URL}/events`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      { id: Date.now(), ...body },
      { status: 201 }
    );
  }),

  // ════════════════════════════════════════
  // Contents
  // ════════════════════════════════════════

  // GET /contents/discovery - 디스커버리 콘텐츠
  http.get(`${BACKEND_URL}/contents/discovery`, () => {
    return HttpResponse.json(mockListResponseContentsDto);
  }),

  // GET /contents (with pagination) - 콘텐츠 목록
  http.get(`${BACKEND_URL}/contents`, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "0");
    const limit = Number(url.searchParams.get("limit") || "10");

    return HttpResponse.json(mockPageResponseContentsDto);
  }),

  // GET /contents/:id - 콘텐츠 상세
  http.get(`${BACKEND_URL}/contents/:id`, ({ params }) => {
    return HttpResponse.json({
      ...mockContentsDetail,
      id: Number(params.id),
    });
  }),

  // POST /contents - 콘텐츠 생성
  http.post(`${BACKEND_URL}/contents`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      { id: Date.now(), ...body },
      { status: 201 }
    );
  }),

  // ════════════════════════════════════════
  // Publishers
  // ════════════════════════════════════════

  // GET /publishers - 출판사 목록
  http.get(`${BACKEND_URL}/publishers`, () => {
    return HttpResponse.json(mockPageResponsePublisherDto);
  }),

  // GET /publishers/:id - 출판사 상세
  http.get(`${BACKEND_URL}/publishers/:id`, ({ params }) => {
    return HttpResponse.json({
      ...mockPublisherDetail,
      id: Number(params.id),
    });
  }),

  // POST /publishers - 출판사 생성
  http.post(`${BACKEND_URL}/publishers`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      { id: Date.now(), ...body },
      { status: 201 }
    );
  }),

  // ════════════════════════════════════════
  // Contacts
  // ════════════════════════════════════════

  // POST /contacts - 문의 생성
  http.post(`${BACKEND_URL}/contacts`, async ({ request }) => {
    const body = (await request.json()) as Record<string, unknown>;
    return HttpResponse.json(
      { id: Date.now(), ...body },
      { status: 201 }
    );
  }),

  // ════════════════════════════════════════
  // Auth
  // ════════════════════════════════════════

  // POST /auth/login - 로그인
  http.post(`${BACKEND_URL}/auth/login`, async ({ request }) => {
    const body = (await request.json()) as { username: string; password: string };
    if (body.username && body.password) {
      return HttpResponse.json(mockLoginResponse);
    }
    return HttpResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }),

  // ════════════════════════════════════════
  // Admin (BACKEND_ADMIN_URL)
  // ════════════════════════════════════════

  // GET /kakao-books (admin)
  http.get(`${ADMIN_URL}/kakao-books`, () => {
    return HttpResponse.json(mockAdminKakaoBooks);
  }),

  // GET /book-view-logs (admin)
  http.get(`${ADMIN_URL}/book-view-logs`, () => {
    return HttpResponse.json(mockBookViewLogs);
  }),

  // GET /book-search-logs (admin)
  http.get(`${ADMIN_URL}/book-search-logs`, () => {
    return HttpResponse.json(mockBookSearchLogs);
  }),

  // ════════════════════════════════════════
  // Kakao Book Search API (External)
  // ════════════════════════════════════════

  // GET /book - 카카오 도서 검색
  http.get(`${KAKAO_API_URL}/book`, ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("query") || "";

    const filtered = mockKakaoBookResponse.documents.filter(
      (doc) =>
        doc.title.includes(query) ||
        doc.authors.some((a) => a.includes(query)) ||
        doc.isbn.includes(query) ||
        doc.publisher.includes(query)
    );

    return HttpResponse.json({
      documents: filtered.length > 0 ? filtered : mockKakaoBookResponse.documents,
      meta: {
        is_end: true,
        pageable_count: filtered.length || mockKakaoBookResponse.documents.length,
        total_count: filtered.length || mockKakaoBookResponse.documents.length,
      },
    });
  }),

  // ════════════════════════════════════════
  // Next.js Internal API Routes
  // ════════════════════════════════════════

  // GET /api/authors - 작가 목록 (Next.js route)
  http.get("*/api/authors", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "0");
    const limit = Number(url.searchParams.get("limit") || "6");
    const start = page * limit;
    const end = start + limit;
    const items = mockAuthors.slice(start, end);
    const hasNext = end < mockAuthors.length;

    return HttpResponse.json({
      items,
      totalCount: mockAuthors.length,
      totalPages: Math.ceil(mockAuthors.length / limit),
      hasNext,
      hasPrevious: page > 0,
    });
  }),

  // GET /api/book - CSV 도서 조회 (Next.js route)
  http.get("*/api/book", ({ request }) => {
    const url = new URL(request.url);
    const isbns = url.searchParams.getAll("isbn");

    const data: Record<string, unknown> = {};
    isbns.forEach((isbn) => {
      data[isbn] = {
        SEQ_NO: "1",
        ISBN_THIRTEEN_NO: isbn,
        TITLE_NM: "Mock Book",
        AUTHR_NM: "Mock Author",
        PUBLISHER_NM: "Mock Publisher",
        PBLICTE_DE: "2025-01-01",
        PRC_VALUE: "15000",
        IMAGE_URL: "",
        BOOK_INTRCN_CN: "Mock description",
      };
    });

    return HttpResponse.json({ data });
  }),

  // GET /api/refresh/revalidate - 캐시 갱신 (Next.js route)
  http.get("*/api/refresh/revalidate", ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return HttpResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    return HttpResponse.json({ revalidated: true, now: Date.now() });
  }),
];
