import { ContentsDto } from "@/types/dto";

export const MOCK_CONTENTS: ContentsDto[] = [
  {
    id: 1,
    title: "헬로 뷰티풀",
    urls: [
      { url: "https://www.youtube.com/watch?v=Al8jzVsjM3k", type: "Youtube" },
    ],
    creator: { name: "김영하", id: 2 },
    image:
      "https://i.ytimg.com/vi/Al8jzVsjM3k/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDrJW7cnpOuhGG1i6nhQsv61JFXFg",
  },
  {
    id: 2,
    title: "백합의 지옥",
    urls: [{ url: "https://whenmal.club/ep65/", type: "Youtube" }],
    creator: { name: "최재원", id: 4 },
    image:
      "https://i0.wp.com/whenmal.club/wp-content/uploads/2025/01/Wide-Cover.jpeg?resize=1024%2C576&ssl=1",
  },
  {
    id: 3,
    title: "우리가 처음 사피엔스였을 때",
    urls: [{ url: "https://ch.yes24.com/Article/Details/80818", type: "Link" }],
    creator: { name: "김상태", id: 3 },
    image:
      "https://image.yes24.com/images/chyes24/article/froala/image/2025/02/20250212-8a85ffc8.jpg",
  },
  {
    id: 4,
    title: "데미안",
    urls: [
      { url: "https://minumsa.minumsa.com/bookclub_shop/30623/", type: "Link" },
    ],
    creator: { name: "헤르만헤세", id: 5 },
    image:
      "https://minumsa.minumsa.com/wp-content/blogs.dir/2/files/bookclub-shop/%EB%8C%80%EC%A7%80-105-1-500x500.png",
  },
  {
    id: 5,
    title: "마드리드 일기",
    urls: [
      {
        url: "https://sarak.yes24.com/blog/qburie/review-view/20983029",
        type: "Blog",
      },
    ],
    creator: { name: "최민석", id: 6 },
  },
  {
    id: 6,
    title: "나와 함께 모든 노래가 사라진다면",
    urls: [
      { url: "http://bookple.aladin.co.kr/bp/hbooks/799034943", type: "Link" },
    ],
    creator: { name: "김영하", id: 2 },
  },
  {
    id: 7,
    title: "완벽에 관하여",
    urls: [
      {
        url: "https://biz.chosun.com/topics/kjs_interstellar/2025/01/18/LV6WJUVM5JAY5EVEIW6CXJW2I4/?utm_source=naver&utm_medium=original&utm_campaign=biz&fbclid=PAZXh0bgNhZW0CMTEAAaY2ffRNcXoXPR4mE-RyqAX_XW_kmeo0R9up2bjnwKQdC6VpjyBEaP_e3jY_aem_uN9ufaft4bPtwpl4U4KIew",
        type: "Link",
      },
    ],
    creator: { name: "조선비즈", id: 7 },
  },
];

