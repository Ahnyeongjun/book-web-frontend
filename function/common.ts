import { KaKaoBookResponse } from "@/types/api";

export const formatDateToKorean = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const handleFetchKaKaoData = async (
  query: string | undefined,
  target: "title" | "isbn" | "publisher" | "person"
) => {
  if (!query) return;
  const response = await fetch(`${process.env.NEXT_PUBLIC_KAKAO_SEARCH_API_URL}/book?target=${target}&query=${query}`, {
    method: "GET",
    headers: {
      Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_SEARCH_API_KEY}`,
    },
    cache: "force-cache", //정적인 정보라 카카오가 수정하지 않을것임을 감안하고 캐싱
    next: { revalidate: 86400, tags: [query, target] },
  });
  if (!response.ok) return;
  const data: KaKaoBookResponse = await response.json();
  return data;
};


export const validateOptionalIsbnLength = (value: string | number) => {
  const stringValue = String(value).trim();
  if (stringValue === "") return true;
  if (stringValue.length < 10) return "10자리 이상 입력해야 합니다";
  if (stringValue.length > 13) return "13자리 이하로 입력해야 합니다";
  return true;
};