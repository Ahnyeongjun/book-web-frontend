import LoadingSpinner from "@/components/common/LoadingSpinner";
import { handleFetchKaKaoData } from "@/function/common";
import { KaKaoBookResponse } from "@/types/api";
import { Suspense } from "react";
import BookHeaderHelper from "./BookHeaderHelper";
import BookDetailCsv from "@/components/bookDetail/BookDetailCsv";

export const dynamic = "force-static";
export const revalidate = 86400; // 24시간 동안 캐시 유지

const BookDetailpage = async ({
  params,
}: {
  params: Promise<{ isbn: number }>;
}) => {
  const { isbn } = await params;
  const suspenseResource = fetchKaKaoBookSuspense(isbn);

  return (
    <>
      <BookHeaderHelperContainer
        suspenseResource={suspenseResource}
        isbn={isbn}
      />
      <main className="flex size-full flex-1 items-center gap-8">
        <Suspense fallback={<LoadingSpinner className="h-[80vw] w-full" />}>
          <BookDetailCsv<KakaoSuspenseResource>
            suspenseResource={suspenseResource}
          />
        </Suspense>
      </main>
    </>
  );
};
export default BookDetailpage;

export type KakaoSuspenseResource = {
  read: () => KaKaoBookResponse;
};
/**
 * handleFetchKaKaoData 통신이 끝날때까지 렌더링을 중지하면
 * 멈춘것처럼 이전화면에서 대기 해야하므로 통신을 Promise로 저장해서 전달
 */
const fetchKaKaoBookSuspense = (isbn?: number): KakaoSuspenseResource => {
  let data: KaKaoBookResponse | undefined;
  let promise: Promise<KaKaoBookResponse | undefined>;
  return {
    read: () => {
      if (data) return data;
      if (!promise)
        promise = handleFetchKaKaoData(isbn?.toString(), "isbn").then(
          (result) => (data = result)
        );
      throw promise;
    },
  };
};

//클라이언트 컴포넌트인 BookHeaderHelper에게 suspenseResource를 전달하기위한 컨테이너
const BookHeaderHelperContainer = ({
  suspenseResource,
  isbn,
}: {
  suspenseResource: KakaoSuspenseResource;
  isbn?: number;
}) => {
  const resource = suspenseResource.read().documents[0];
  return <BookHeaderHelper bookData={resource} isbn={isbn!} />;
};
