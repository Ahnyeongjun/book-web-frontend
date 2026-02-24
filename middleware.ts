import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // 카카오 API 프록시 요청에 Authorization 헤더 주입
  if (request.nextUrl.pathname.startsWith("/proxy-kakao")) {
    const apiKey = process.env.KAKAO_SEARCH_API_KEY || "";
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("Authorization", `KakaoAK ${apiKey}`);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/proxy-kakao/:path*",
};
