import { HTMLAttributes } from "react";
import BookItem from "./Bookitem";
import { Book, CSVBook } from "@/types/api";
import Link from "next/link";
import Image from "next/image";
import birthDayCake from "@/public/birthDayCake.png";

type Props<T extends CSVBook[] | Book[]> = { className?: string; books: T } & HTMLAttributes<HTMLDivElement>;
const BookGrid = <T extends CSVBook[] | Book[]>({ className, books, ...props }: Readonly<Props<T>>) => {
  return (
    <section
      className={`relative grid w-full grid-cols-2 gap-[10px] p-[var(--client-layout-margin)] ${className || ""}`}
      {...props}
    >
      {books?.map((item) =>
        isCSVBook(item) ? (
          <Link key={item.ISBN_THIRTEEN_NO} href={`/birth-day/${item.ISBN_THIRTEEN_NO}`} className="relative size-full">
            <BookItem
              imageUrl={item.IMAGE_URL}
              bookName={item.TITLE_NM}
              publisher={item.PUBLISHER_NM}
              author={item.AUTHR_NM}
            />
          </Link>
        ) : isBook(item) ? (
          <Link key={item.isbn} href={`/book/${item.isbn.split(" ")[1]}`} className="relative size-full">
            <BookItem
              imageUrl={item.thumbnail}
              bookName={item.title}
              publisher={item.publisher}
              author={item.authors.join(", ")}
            />

            {item.datetime &&
              new Date(item.datetime).getDate() + 9 * 60 * 60 * 1000 === new Date().getDate() + 9 * 60 * 60 * 1000 &&
              new Date(item.datetime).getMonth() + 9 * 60 * 60 * 1000 ===
                new Date().getMonth() + 9 * 60 * 60 * 1000 && (
                <div className="absolute -bottom-1 -right-1 aspect-square w-[30%]">
                  <Image alt="bithDayCake" src={birthDayCake} fill sizes="100px" />
                </div>
              )}
          </Link>
        ) : null
      )}
    </section>
  );
};

export default BookGrid;

const isCSVBook = (book: CSVBook | Book): book is CSVBook => {
  return "ISBN_THIRTEEN_NO" in book;
};

const isBook = (book: CSVBook | Book): book is Book => {
  return "isbn" in book;
};
