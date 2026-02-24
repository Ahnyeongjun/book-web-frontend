const isServer = typeof window === "undefined";

// 클라이언트: 프록시 경로 (Next.js rewrite가 백엔드로 프록시)
// 서버: 환경변수로 직접 호출
export const BACKEND_URL = isServer
  ? process.env.BACKEND_URL || "http://localhost:8080"
  : "/proxy";

export const ADMIN_URL = isServer
  ? process.env.BACKEND_ADMIN_URL || "http://localhost:8081"
  : "/proxy-admin";

export const KAKAO_API_URL = isServer
  ? process.env.KAKAO_SEARCH_API_URL || "https://dapi.kakao.com/v3/search"
  : "/proxy-kakao";

export const KAKAO_API_KEY = process.env.KAKAO_SEARCH_API_KEY || "";
