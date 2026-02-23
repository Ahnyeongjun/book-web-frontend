import { revalidateTag } from "next/cache";
import getConfig from "next/config";
import { NextResponse } from "next/server";

// 새 정보를 얻도록 캐시태그를 무효화시키는 cron job용 api
// 기존에 웜업함수가 unstable_cache를 다시 실행시켜서 캐시를 최신화하는 방법은 버셀이 Revalidation 요청임을 인지하지 못하고 Function Invocation로 인지해서 캐싱정보를 사용하지 못한 문제였음 revalidateTag로 캐시를 무효화 시키는경우 반드시 라우트로 접근해서 Revalidation요청으로 인식하도록 해야함)
export async function GET(req: Request) {
  if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    console.log("인증되지 않은 요청");
    return NextResponse.json({ message: "인증되지 않은 요청" }, { status: 401 });
  }
  try {
    // 태그 무효화
    revalidateTag("birth-day-book-data");
    console.log("태그 무효화 성공");
    const { publicRuntimeConfig } = getConfig();
    const baseUrl = publicRuntimeConfig.VERCEL_PROJECT_PRODUCTION_URL;
    //웜업 요청
    fetch(`${baseUrl}`, { cache: "no-cache" });
    console.log("태그 무효화 성공, 워밍업 요청 성공(완료 성공 아님)");
    return NextResponse.json({ message: "태그 무효화 성공, 워밍업 요청 성공(완료 성공 아님)" });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : "오류 발생";
    console.log("오류 발생", errMessage);
    return NextResponse.json({ message: "오류 발생", error: errMessage }, { status: 500 });
  }
}
