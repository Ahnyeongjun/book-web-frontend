import { Detail } from "@/types/dto";
import BookDetailImageSection from "./BookDetailImageSection";
import BookDetailSection from "./BookDetailSection";
import BookTitleSection from "./BookTitleSection";
import ReadersReview from "./ReadersReview";

interface BookDetailProps {
  bookData: Detail;
  className?: string;
}
const BookDetail = ({ bookData, className }: BookDetailProps) => {
  return (
    <div
      className={`relative flex size-full flex-col gap-7 px-[var(--client-layout-margin)] ${
        className || ""
      }`}
    >
      <BookDetailImageSection
        imageUrl={bookData.titleImage}
        birthDay={bookData.publishedDate}
        className="mt-6"
      />
      <BookTitleSection
        bookName={bookData?.title || "책 이름(정보 미제공)"}
        birthDayDate={bookData.publishedDate}
        url={bookData.detailUrl}
        author={bookData?.authorList.join(", ") || "저자 이름(정보 미제공)"}
      />
      <BookDetailSection
        author={bookData?.authorList.join(", ") || "저자 이름(정보 미제공)"}
        pulisher={bookData?.publisher.name || "출판사(정보 미제공)"}
        description={bookData?.summary || "책 소개(정보 미제공)"}
        viewMoreUrl={bookData?.detailUrl}
        className="mb-10"
      />
      {/* <section>
        <h2 className="text-lg font-bold">추천 콘텐츠</h2>
        <RecommandedItem
          imageUrl="https://s3-alpha-sig.figma.com/img/8d4f/4b13/868fb4811d7171eef83e5a8d8988ba13?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ORxF1blpY9piMcDNWkmkCr~abQC~WhkmoV7bR8-1ZScEsgdDOEC~8K-fqVZWqkV9CCAm9yq5kkVK41L-FC8CaWHMeg6-jXLoMccBB0h3L1UDZNW94CxQGXq5eaniifhL65J3yI-yzkLhNthlH7kj2vrEZSg3GNDkOdnznkIaG6VqGoOfiPwqKIsJpo0oDNGmYpaFecaKCtQwvXD43jaZXmvwL1jIXwFuNrG7wTJkvnEYNf8CkWfCTxBExvqEiqwaj94XxeOpGA1wWWAmyPVGqG1Ngm2sifZWw3XkNGnZs0FDqd25Wo0eZHpTRAG7nFIzAq81iB2WBEz~prRFDvoNnw__"
          sourceName="유튜브"
          sourceUrl="https://www.youtube.com/watch?v=example"
          title="fasdfasdfasdfasdsdfasdfasdfasdfasdfasdfasdfaasdsdfasdfasdfasdfasdfasdfasdfassdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfafasd"
        />
      </section> */}
      <ReadersReview />
    </div>
  );
};

export default BookDetail;
