import { KakaoSuspenseResource } from "@/app/(client)/(backButtonHeader)/book/[isbn]/page";
import { HTMLAttributes } from "react";
import BookDetailImageSection from "./BookDetailImageSection";
import BookDetailSection from "./BookDetailSection";
import BookTitleSection from "./BookTitleSection";
import ReadersReview from "./ReadersReview";
import RecommandedItem from "./RecommandedItem";
import { CsvSuspenseResource } from "@/app/(client)/(backButtonHeader)/birth-day/[isbn]/Before";

type Props<T extends CsvSuspenseResource | KakaoSuspenseResource> = {
  className?: string;
  suspenseResource: T;
} & HTMLAttributes<HTMLDivElement>;
const BookDetailCsv = async <
  T extends CsvSuspenseResource | KakaoSuspenseResource
>({
  className,
  suspenseResource,
  ...props
}: Readonly<Props<T>>) => {
  const result = suspenseResource.read();
  const bookData = Array.isArray(result)
    ? {
        thumbnail: result[0].IMAGE_URL,
        datetime: result[0].TWO_PBLICTE_DE,
        title: result[0].TITLE_NM,
        url: "",
        authors: result[0].AUTHR_NM.split(", "),
        publisher: result[0].PUBLISHER_NM,
        contents: result[0].BOOK_INTRCN_CN,
      }
    : result.documents[0];

  const kstBirthDay = new Date(
    new Date(bookData?.datetime).getTime() + 9 * 60 * 60 * 1000
  );

  return (
    <div
      className={`relative flex size-full flex-col gap-7 px-[var(--client-layout-margin)] ${
        className || ""
      }`}
      {...props}
    >
      <BookDetailImageSection
        imageUrl={bookData?.thumbnail}
        birthDay={kstBirthDay}
        className="mt-6"
      />
      <BookTitleSection
        bookName={bookData?.title || "책 이름(정보 미제공)"}
        birthDayDate={kstBirthDay}
        url={bookData?.url}
        author={bookData?.authors.join(", ") || "저자 이름(정보 미제공)"}
      />
      <BookDetailSection
        author={bookData?.authors.join(", ") || "저자 이름(정보 미제공)"}
        pulisher={bookData?.publisher || "출판사(정보 미제공)"}
        description={bookData?.contents || "책 소개(정보 미제공)"}
        viewMoreUrl={bookData?.url}
        className="mb-10"
      />
      <section>
        <h2 className="text-lg font-bold">추천 콘텐츠</h2>
        <RecommandedItem
          imageUrl="/images/mock/content1.svg"
          sourceName="유튜브"
          sourceUrl="https://www.youtube.com/watch?v=example"
          title="fasdfasdfasdfasdsdfasdfasdfasdfasdfasdfasdfaasdsdfasdfasdfasdfasdfasdfasdfassdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfafasd"
        />
      </section>
      <ReadersReview />
    </div>
  );
};

export default BookDetailCsv;
