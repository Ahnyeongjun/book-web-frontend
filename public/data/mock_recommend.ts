import { RecommendedBookDto } from "@/types/dto";

export const MOCK_RECOMMENDS: RecommendedBookDto[] = [
  {
    isbn: "9791191114560",
    title: "헬로 뷰티풀",
    summary:
      "김영하의 신작 소설로, 인간의 아름다움과 불완전함을 탐구하는 이야기입니다.",
    titleImage:
      "https://i.ytimg.com/vi/Al8jzVsjM3k/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDrJW7cnpOuhGG1i6nhQsv61JFXFg",
    publishedDate: "2025-03-01",
    authorList: [{ name: "김영하", id: 2, bookList: [] }],
    publisher: {
      name: "은행나무",
      id: 2,
      isOfficial: true,
      urls: [
        { url: "https://www.youtube.com/watch?v=Al8jzVsjM3k", type: "Youtube" },
      ],
    },
    recommendedDate: "2025-03-01",
  },
  {
    isbn: "9791191114560",
    title: "백합의 지옥",
    summary:
      "최재원의 신작으로, 인간의 내면과 사회의 어두운 면을 조명하는 소설입니다.",
    titleImage:
      "https://i0.wp.com/whenmal.club/wp-content/uploads/2025/01/Wide-Cover.jpeg?resize=1024%2C576&ssl=1",
    publishedDate: "2025-03-01",
    authorList: [{ name: "김영하", id: 2, bookList: [] }],
    publisher: {
      name: "은행나무",
      id: 2,
      isOfficial: true,
      urls: [
        { url: "https://www.youtube.com/watch?v=Al8jzVsjM3k", type: "Youtube" },
      ],
    },
    recommendedDate: "2025-03-01",
  },
  {
    isbn: "9791191114560",
    title: "우리가 처음 사피엔스였을 때",
    summary: "김상태의 신작으로, 인류의 기원과 진화를 탐구하는 책입니다.",
    titleImage:
      "https://image.yes24.com/images/chyes24/article/froala/image/2025/02/20250212-8a85ffc8.jpg",
    publishedDate: "2025-03-01",
    authorList: [{ name: "김영하", id: 2, bookList: [] }],
    publisher: {
      name: "은행나무",
      id: 2,
      isOfficial: true,
      urls: [
        { url: "https://www.youtube.com/watch?v=Al8jzVsjM3k", type: "Youtube" },
      ],
    },
    recommendedDate: "2025-03-01",
  },
  {
    isbn: "9788937480045",
    title: "데미안",
    summary: "헤르만 헤세의 대표작으로, 자아 발견과 성장에 관한 이야기입니다.",
    titleImage:
      "https://minumsa.minumsa.com/wp-content/blogs.dir/2/files/bookclub-shop/%EB%8C%80%EC%A7%80-105-1-500x500.png",
    publishedDate: "2025-03-01",
    authorList: [{ name: "헤르만헤세", id: 5, bookList: [] }],
    publisher: {
      name: "민음사",
      id: 4,
      isOfficial: true,
      urls: [
        {
          url: "https://minumsa.minumsa.com/bookclub_shop/30623/",
          type: "Link",
        },
      ],
    },
    recommendedDate: "2025-03-01",
  },
  {
    isbn: "9788937480052",
    title: "마드리드 일기",
    summary: "최민석 작가의 여행과 사색이 담긴 에세이.",
    titleImage: "",
    publishedDate: "2025-03-01",
    authorList: [{ name: "최민석", id: 6, bookList: [] }],
    publisher: {
      name: "예스24",
      id: 5,
      isOfficial: true,
      urls: [
        {
          url: "https://sarak.yes24.com/blog/qburie/review-view/20983029",
          type: "Blog",
        },
      ],
    },
    recommendedDate: "2025-03-01",
  },
  {
    isbn: "9788937480069",
    title: "나와 함께 모든 노래가 사라진다면",
    summary: "김영하 작가가 전하는 음악과 삶에 대한 성찰.",
    titleImage: "",
    publishedDate: "2025-03-01",
    authorList: [{ name: "김영하", id: 2, bookList: [] }],
    publisher: {
      name: "알라딘",
      id: 6,
      isOfficial: true,
      urls: [
        {
          url: "http://bookple.aladin.co.kr/bp/hbooks/799034943",
          type: "Link",
        },
      ],
    },
    recommendedDate: "2025-03-01",
  },
  {
    isbn: "9788937480076",
    title: "완벽에 관하여",
    summary: "완벽함을 추구하는 인간의 욕망과 그 이면을 탐구하는 책.",
    titleImage: "",
    publishedDate: "2025-03-01",
    authorList: [{ name: "조선비즈", id: 7, bookList: [] }],
    publisher: {
      name: "조선비즈",
      id: 7,
      isOfficial: true,
      urls: [
        {
          url: "https://biz.chosun.com/topics/kjs_interstellar/2025/01/18/LV6WJUVM5JAY5EVEIW6CXJW2I4/?utm_source=naver&utm_medium=original&utm_campaign=biz&fbclid=PAZXh0bgNhZW0CMTEAAaY2ffRNcXoXPR4mE-RyqAX_XW_kmeo0R9up2bjnwKQdC6VpjyBEaP_e3jY_aem_uN9ufaft4bPtwpl4U4KIew",
          type: "Link",
        },
      ],
    },
    recommendedDate: "2025-03-01",
  },
];
