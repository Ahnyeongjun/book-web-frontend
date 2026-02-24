import {
  AuthorDto,
  BookDto,
  ContentsDetail,
  ContentsDto,
  ContentsDtoChanged,
  Detail,
  EventDto,
  ContactDto,
  ListResponseContentsDto,
  ListResponseRecommendedBookDto,
  PageResponseBookDto,
  PageResponseContentsDto,
  PageResponseEventDto,
  PageResponsePublisherDto,
  PageResponseAuthorDto,
  PublisherDetail,
  PublisherDto,
  RecommendedBookDto,
} from "@/types/dto";
import { LoginResType } from "@/types/admin";
import { KaKaoBookResponse } from "@/types/api";

// ── Common ──

const mockSimple = (id: number, name: string) => ({ id, name });

// ── Books ──

export const mockBooks: BookDto[] = [
  {
    isbn: "9791191043747",
    title: "불편한 편의점",
    summary: "이 시대 가장 따뜻한 이야기",
    publisher: mockSimple(1, "나무옆의자"),
    publishedDate: "2021-04-20T00:00:00",
    authorList: [mockSimple(1, "김호연")],
    titleImage: "/images/mock/book1.svg",
    price: 14000,
  },
  {
    isbn: "9788936434267",
    title: "채식주의자",
    summary: "한강의 대표 소설",
    publisher: mockSimple(2, "창비"),
    publishedDate: "2007-10-30T00:00:00",
    authorList: [mockSimple(2, "한강")],
    titleImage: "/images/mock/book2.svg",
    price: 12000,
  },
  {
    isbn: "9788937460470",
    title: "데미안",
    summary: "헤르만 헤세의 명작",
    publisher: mockSimple(3, "민음사"),
    publishedDate: "2000-05-01T00:00:00",
    authorList: [mockSimple(3, "헤르만 헤세")],
    translator: "전영애",
    titleImage: "/images/mock/book3.svg",
    price: 8000,
  },
  {
    isbn: "9788954682190",
    title: "아몬드",
    summary: "감정을 느끼지 못하는 소년의 이야기",
    publisher: mockSimple(4, "창비"),
    publishedDate: "2017-03-31T00:00:00",
    authorList: [mockSimple(4, "손원평")],
    titleImage: "/images/mock/book4.svg",
    price: 11800,
  },
  {
    isbn: "9788932917245",
    title: "소년이 온다",
    summary: "한강 장편소설",
    publisher: mockSimple(2, "창비"),
    publishedDate: "2014-05-19T00:00:00",
    authorList: [mockSimple(2, "한강")],
    titleImage: "/images/mock/book5.svg",
    price: 13000,
  },
];

export const mockBookDetail: Detail = {
  isbn: "9791191043747",
  title: "불편한 편의점",
  detailUrl: "https://example.com/book/9791191043747",
  summary: "이 시대 가장 따뜻한 이야기",
  publishedDate: new Date("2021-04-20"),
  titleImage: "/images/mock/book1.svg",
  authorList: [],
  translator: [],
  price: 14000,
  status: "AVAILABLE",
  publisher: { id: 1, name: "나무옆의자" },
  contentsDtoList: [],
  eventDtoList: [],
};

export const mockPageResponseBookDto: PageResponseBookDto = {
  items: mockBooks,
  totalCount: 5,
  totalPages: 1,
  hasNext: false,
  hasPrevious: false,
};

// ── Recommended Books ──

export const mockRecommendedBooks: RecommendedBookDto[] = mockBooks.map((book) => ({
  ...book,
  authorList: [
    {
      id: book.authorList[0].id,
      name: book.authorList[0].name,
      bookList: [],
    },
  ],
  publisher: {
    id: book.publisher.id,
    name: book.publisher.name,
    isOfficial: true,
    urls: [],
  },
  recommendedDate: "2025-07-19",
}));

export const mockListResponseRecommendedBookDto: ListResponseRecommendedBookDto = {
  items: mockRecommendedBooks,
  length: mockRecommendedBooks.length,
};

// ── Publishers ──

export const mockPublishers: PublisherDto[] = [
  {
    id: 1,
    name: "나무옆의자",
    engName: "Beside the Tree",
    logo: "",
    isOfficial: true,
    description: "나무옆의자 출판사",
    urls: [{ url: "https://example.com", type: "Homepage" }],
  },
  {
    id: 2,
    name: "창비",
    engName: "Changbi",
    logo: "",
    isOfficial: true,
    description: "창비 출판사",
    urls: [{ url: "https://changbi.com", type: "Homepage" }],
  },
  {
    id: 3,
    name: "민음사",
    engName: "Minumsa",
    logo: "",
    isOfficial: true,
    description: "민음사 출판사",
    urls: [{ url: "https://minumsa.com", type: "Homepage" }],
  },
];

export const mockPageResponsePublisherDto: PageResponsePublisherDto = {
  items: mockPublishers,
  totalCount: 3,
  totalPages: 1,
  hasNext: false,
  hasPrevious: false,
};

export const mockPublisherDetail: PublisherDetail = {
  id: 1,
  name: "나무옆의자",
  engName: "Beside the Tree",
  isOfficial: true,
  description: "나무옆의자 출판사입니다.",
  urls: [{ url: "https://example.com", type: "Homepage" }],
  books: mockBooks.filter((b) => b.publisher.id === 1),
};

// ── Events ──

export const mockEvents: EventDto[] = [
  {
    id: 1,
    title: "작가와의 만남",
    host: "서울도서관",
    creator: { id: 1, name: "관리자" },
    urls: [{ url: "https://example.com/event/1", type: "Link" }],
    location: "OFFLINE",
    startDate: "2025-08-01",
    endDate: "2025-08-01",
    eventType: "LECTURE",
    eventFlag: "SOLO",
    books: [mockBooks[0]],
    tags: [{ name: "강연" }],
  },
  {
    id: 2,
    title: "온라인 북클럽",
    host: "독서모임",
    creator: { id: 1, name: "관리자" },
    urls: [{ url: "https://example.com/event/2", type: "Link" }],
    location: "ONLINE",
    startDate: "2025-08-15",
    endDate: "2025-08-15",
    eventType: "BOOK_CLUB",
    eventFlag: "GROUP",
    books: [mockBooks[1]],
    tags: [{ name: "북클럽" }],
  },
];

export const mockPageResponseEventDto: PageResponseEventDto = {
  items: mockEvents,
  totalCount: 2,
  totalPages: 1,
  hasNext: false,
  hasPrevious: false,
};

// ── Contents ──

export const mockContents: ContentsDto[] = [
  {
    id: 1,
    urls: [{ url: "https://youtube.com/watch?v=abc", type: "Youtube" }],
    title: "불편한 편의점 리뷰",
    image: "/images/mock/content1.svg",
    creator: { id: 1, name: "관리자" },
  },
  {
    id: 2,
    urls: [{ url: "https://blog.example.com/review", type: "Blog" }],
    title: "채식주의자 서평",
    image: "/images/mock/content1.svg",
    creator: { id: 1, name: "관리자" },
  },
];

export const mockListResponseContentsDto: ListResponseContentsDto = {
  items: mockContents,
  length: mockContents.length,
};

export const mockContentsChanged: ContentsDtoChanged[] = mockContents.map((c) => ({
  ...c,
  books: [mockBooks[0]],
  tags: [{ name: "리뷰" }],
}));

export const mockPageResponseContentsDto: PageResponseContentsDto = {
  items: mockContentsChanged,
  totalCount: 2,
  totalPages: 1,
  hasNext: false,
  hasPrevious: false,
};

export const mockContentsDetail: ContentsDetail = {
  id: 1,
  title: "불편한 편의점 리뷰",
  urls: { url: "https://youtube.com/watch?v=abc", type: "Youtube" },
  image: "/images/mock/content1.svg",
  booksDtoList: [mockBooks[0]],
  tagDtoList: [{ name: "리뷰" }],
  creator: { id: 1, name: "관리자" },
};

// ── Authors ──

export const mockAuthors: AuthorDto[] = [
  {
    id: 1,
    name: "김호연",
    description: "불편한 편의점 작가",
    profile: "/images/mock/profile.svg?u=1",
    bookList: [mockBooks[0]],
  },
  {
    id: 2,
    name: "한강",
    description: "노벨문학상 수상 작가",
    profile: "/images/mock/profile.svg?u=2",
    bookList: [mockBooks[1], mockBooks[4]],
  },
  {
    id: 3,
    name: "헤르만 헤세",
    description: "독일 소설가",
    profile: "/images/mock/profile.svg?u=3",
    bookList: [mockBooks[2]],
  },
  {
    id: 4,
    name: "손원평",
    description: "아몬드 작가",
    profile: "/images/mock/profile.svg?u=4",
    bookList: [mockBooks[3]],
  },
  {
    id: 5,
    name: "무라카미 하루키",
    description: "일본 소설가",
    profile: "/images/mock/profile.svg?u=5",
    bookList: [],
  },
  {
    id: 6,
    name: "김영하",
    description: "한국 소설가",
    profile: "/images/mock/profile.svg?u=6",
    bookList: [],
  },
];

export const mockPageResponseAuthorDto: PageResponseAuthorDto = {
  items: mockAuthors,
  totalCount: 6,
  totalPages: 1,
  hasNext: false,
  hasPrevious: false,
};

// ── Contacts ──

export const mockContacts: ContactDto[] = [
  {
    id: 1,
    email: "test@example.com",
    message: "테스트 문의입니다.",
    name: "테스터",
  },
];

// ── Auth ──

export const mockLoginResponse: LoginResType = {
  accessToken: "mock-access-token-abc123",
  refreshToken: "mock-refresh-token-xyz789",
  tokenType: "Bearer",
  expiresIn: 3600,
  user: {
    id: 1,
    username: "admin",
    role: "ADMIN",
  },
};

// ── Kakao Book Search ──

export const mockKakaoBookResponse: KaKaoBookResponse = {
  documents: [
    {
      authors: ["김호연"],
      contents: "이 시대 가장 따뜻한 이야기...",
      datetime: "2021-04-20T00:00:00.000+09:00",
      isbn: "9791191043747",
      price: 14000,
      publisher: "나무옆의자",
      sale_price: 12600,
      status: "정상판매",
      thumbnail: "/images/mock/book1.svg",
      title: "불편한 편의점",
      translators: [],
      url: "https://search.daum.net/search?w=bookpage&bookId=5765818",
    },
    {
      authors: ["한강"],
      contents: "한강의 대표 소설...",
      datetime: "2007-10-30T00:00:00.000+09:00",
      isbn: "9788936434267",
      price: 12000,
      publisher: "창비",
      sale_price: 10800,
      status: "정상판매",
      thumbnail: "/images/mock/book2.svg",
      title: "채식주의자",
      translators: [],
      url: "https://search.daum.net/search?w=bookpage&bookId=493466",
    },
  ],
  meta: {
    is_end: true,
    pageable_count: 2,
    total_count: 2,
  },
};

// ── Admin Logs ──

export const mockBookViewLogs = [
  { id: 1, isbn: "9791191043747", viewCount: 150, date: "2025-07-19" },
  { id: 2, isbn: "9788936434267", viewCount: 120, date: "2025-07-19" },
];

export const mockBookSearchLogs = [
  { id: 1, keyword: "불편한 편의점", searchCount: 80, date: "2025-07-19" },
  { id: 2, keyword: "한강", searchCount: 65, date: "2025-07-19" },
];

export const mockAdminKakaoBooks = {
  items: mockKakaoBookResponse.documents.slice(0, 2),
  length: 2,
};
