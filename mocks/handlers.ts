import { http, HttpResponse } from "msw";
import {
  mockBookDetail,
  mockListResponseRecommendedBookDto,
  mockListResponseContentsDto,
  mockPageResponseContentsDto,
  mockContentsDetail,
  mockPageResponsePublisherDto,
  mockPublisherDetail,
  mockAuthors,
  mockLoginResponse,
  mockKakaoBookResponse,
  mockBookViewLogs,
  mockBookSearchLogs,
  mockAdminKakaoBooks,
  mockBooks,
  mockEvents,
} from "./data";

// 서버 직접 호출용 URL
const DIRECT_BACKEND = process.env.BACKEND_URL || "http://localhost:8080";
const DIRECT_ADMIN = process.env.BACKEND_ADMIN_URL || "http://localhost:8081";
const DIRECT_KAKAO = process.env.KAKAO_SEARCH_API_URL || "https://dapi.kakao.com/v3/search";

// ── Handler Factory ──

type PaginatedRequest = { request: Request };
type ParamsRequest = { request: Request; params: Record<string, string | readonly string[] | undefined> };

function booksHandler({ request }: PaginatedRequest) {
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
}

function booksRecommendedHandler() {
  return HttpResponse.json(mockListResponseRecommendedBookDto);
}

function booksBirthdayHandler({ request }: PaginatedRequest) {
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
}

function bookContentsHandler() {
  return HttpResponse.json(mockListResponseContentsDto);
}

function bookDetailHandler({ params }: ParamsRequest) {
  const isbn = params.isbn as string;
  if (isbn === "{isbn}") return HttpResponse.json(mockBookDetail);
  return HttpResponse.json({ ...mockBookDetail, isbn });
}

function eventsGetHandler({ request }: PaginatedRequest) {
  const url = new URL(request.url);
  const eventFlag = url.searchParams.get("eventFlag");
  const location = url.searchParams.get("location");
  let filtered = [...mockEvents];
  if (eventFlag) filtered = filtered.filter((e) => e.eventFlag === eventFlag);
  if (location) filtered = filtered.filter((e) => e.location === location);
  return HttpResponse.json({
    items: filtered,
    totalCount: filtered.length,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false,
  });
}

async function postHandler({ request }: PaginatedRequest) {
  const body = (await request.json()) as Record<string, unknown>;
  return HttpResponse.json({ id: Date.now(), ...body }, { status: 201 });
}

async function loginHandler({ request }: PaginatedRequest) {
  const body = (await request.json()) as { username: string; password: string };
  if (body.username && body.password) return HttpResponse.json(mockLoginResponse);
  return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 });
}

function contentsDiscoveryHandler() {
  return HttpResponse.json(mockListResponseContentsDto);
}

function contentsListHandler() {
  return HttpResponse.json(mockPageResponseContentsDto);
}

function contentsDetailHandler({ params }: ParamsRequest) {
  return HttpResponse.json({ ...mockContentsDetail, id: Number(params.id) });
}

function publishersHandler() {
  return HttpResponse.json(mockPageResponsePublisherDto);
}

function publisherDetailHandler({ params }: ParamsRequest) {
  return HttpResponse.json({ ...mockPublisherDetail, id: Number(params.id) });
}

function kakaoBookHandler({ request }: PaginatedRequest) {
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
}

// ── 프록시 경로 (브라우저) + 직접 경로 (서버) 양쪽 핸들러 생성 ──

function createBackendHandlers(base: string) {
  return [
    http.get(`${base}/books`, booksHandler),
    http.get(`${base}/books/recommended`, booksRecommendedHandler),
    http.get(`${base}/books/birthday`, booksBirthdayHandler),
    http.get(`${base}/books/:isbn/contents`, bookContentsHandler),
    http.get(`${base}/books/:isbn`, bookDetailHandler),
    http.get(`${base}/events`, eventsGetHandler),
    http.post(`${base}/events`, postHandler),
    http.get(`${base}/contents/discovery`, contentsDiscoveryHandler),
    http.get(`${base}/contents`, contentsListHandler),
    http.get(`${base}/contents/:id`, contentsDetailHandler),
    http.post(`${base}/contents`, postHandler),
    http.get(`${base}/publishers`, publishersHandler),
    http.get(`${base}/publishers/:id`, publisherDetailHandler),
    http.post(`${base}/publishers`, postHandler),
    http.post(`${base}/contacts`, postHandler),
    http.post(`${base}/auth/login`, loginHandler),
  ];
}

function createAdminHandlers(base: string) {
  return [
    http.get(`${base}/kakao-books`, () => HttpResponse.json(mockAdminKakaoBooks)),
    http.get(`${base}/book-view-logs`, () => HttpResponse.json(mockBookViewLogs)),
    http.get(`${base}/book-search-logs`, () => HttpResponse.json(mockBookSearchLogs)),
  ];
}

function createKakaoHandlers(base: string) {
  return [http.get(`${base}/book`, kakaoBookHandler)];
}

export const handlers = [
  // 브라우저 (프록시 경로)
  ...createBackendHandlers("/proxy"),
  ...createAdminHandlers("/proxy-admin"),
  ...createKakaoHandlers("/proxy-kakao"),

  // 서버 (직접 호출)
  ...createBackendHandlers(DIRECT_BACKEND),
  ...createAdminHandlers(DIRECT_ADMIN),
  ...createKakaoHandlers(DIRECT_KAKAO),

  // Next.js 내부 API Routes
  http.get("*/api/authors", ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") || "0");
    const limit = Number(url.searchParams.get("limit") || "6");
    const start = page * limit;
    const end = start + limit;
    const items = mockAuthors.slice(start, end);
    return HttpResponse.json({
      items,
      totalCount: mockAuthors.length,
      totalPages: Math.ceil(mockAuthors.length / limit),
      hasNext: end < mockAuthors.length,
      hasPrevious: page > 0,
    });
  }),

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

  http.get("*/api/refresh/revalidate", ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return HttpResponse.json({ revalidated: true, now: Date.now() });
  }),
];
