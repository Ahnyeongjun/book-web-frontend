import LoadingSpinner from "@/components/common/LoadingSpinner";
import { CSVBook } from "@/types/api";
import getConfig from "next/config";
import { Suspense } from "react";
import BookHeaderHelper from "../../book/[isbn]/BookHeaderHelper";
import BookDetailCsv from "@/components/bookDetail/BookDetailCsv";

export const dynamic = "force-static";
export const revalidate = 86400; // 캐시를 너무 오래 저장하면 더 중요한 캐시 정보(getBirthdayBook 함수처럼 무거운거)가 제거될 수 있으므로 생일도서가 변경되는 24시간만 유효하도록 설정함

const BirthDayBookDetailpage = async ({
  params,
}: {
  params: Promise<{ isbn?: number }>;
}) => {
  const { isbn } = await params;
  const suspenseResource = fetchCsvBookDataSuspense(isbn);
  return (
    <>
      <BookHeaderHelper bookData={undefined} isbn={isbn!} />
      <main className="flex size-full flex-1 items-center gap-8">
        <Suspense fallback={<LoadingSpinner className="h-[50vw] w-full" />}>
          <BookDetailCsv<CsvSuspenseResource>
            suspenseResource={suspenseResource}
          />
        </Suspense>
      </main>
    </>
  );
};

export default BirthDayBookDetailpage;

export type CsvSuspenseResource = {
  read: () => CSVBook[];
};
const fetchCsvBookDataSuspense = (isbn?: number): CsvSuspenseResource => {
  let data: CSVBook[] | undefined;
  let promise: Promise<CSVBook[] | undefined>;
  return {
    read: () => {
      if (data) return data;
      if (!promise)
        promise = fetchCsvData(isbn).then((result) => (data = result));
      throw promise;
    },
  };
};

const fetchCsvData = async (isbn?: number) => {
  if (!isbn) throw new Error("ISBN is required");
  try {
    const { publicRuntimeConfig } = getConfig();
    const baseUrl = publicRuntimeConfig.VERCEL_PROJECT_PRODUCTION_URL;
    const response = await fetch(`${baseUrl}/api/book?isbn=` + isbn, {
      cache: "force-cache",
      next: { revalidate: 86400, tags: [isbn.toString()] },
    });
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    const keys = Object.keys(data.data);
    const parseData: CSVBook[] = keys.map((key) => data.data[key]);
    return parseData;
  } catch (error) {
    console.error("Error fetching CSV data:", error);
    throw error;
  }
};
