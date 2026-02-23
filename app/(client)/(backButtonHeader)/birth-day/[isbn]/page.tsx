import LoadingSpinner from "@/components/common/LoadingSpinner";
import { getBookDetail } from "@/function/get/client";
import { Suspense } from "react";
import BookHeaderHelper from "../../book/[isbn]/BookHeaderHelper";
import BookDetail from "@/components/bookDetail/BookDetail";

const BirthDayBookDetailpage = async ({
  params,
}: {
  params: Promise<{ isbn?: number }>;
}) => {
  const { isbn } = await params;
  const bookData = await getBookDetail(isbn || 0);

  return (
    <>
      <BookHeaderHelper bookData={undefined} isbn={isbn!} />
      <main className="flex size-full flex-1 items-center gap-8">
        <Suspense fallback={<LoadingSpinner className="h-[50vw] w-full" />}>
          <BookDetail bookData={bookData} />
        </Suspense>
      </main>
    </>
  );
};

export default BirthDayBookDetailpage;
