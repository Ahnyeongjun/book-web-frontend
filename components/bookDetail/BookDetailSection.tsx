import SearchIcon from "@/public/icons/searchIcon.svg";
import Link from "next/link";
import { HTMLAttributes } from "react";

type Props = {
  className?: string;
  author: string;
  pulisher: string;
  description?: string;
  viewMoreUrl?: string;
} & HTMLAttributes<HTMLDivElement>;
const BookDetailSection = ({
  className,
  pulisher,
  description,
  viewMoreUrl,
  ...props
}: Readonly<Props>) => {
  return (
    <section
      className={`relative flex size-full flex-col items-start justify-start gap-7 text-sm ${
        className || ""
      }`}
      {...props}
    >
      {/* <span className="flex flex-row gap-2">
        <p>작가</p>
        <p className="text-[var(--sub-color)]">{author}</p>
      </span> */}
      {/* <span className="flex flex-row gap-2">
        <p>출판사</p>
        <p className="text-[var(--sub-color)]">{pulisher}</p>
      </span> */}
      <Link
        className="flex size-full items-center justify-between rounded-2xl bg-[#F8F8FE] p-4"
        href={`/publisher/${pulisher}`}
      >
        <div className="flex flex-col gap-1 ">
          <p className="text-xs text-[var(--sub-color)]">
            이 출판사가 궁금하다면?
          </p>
          <p className="text-sm font-semibold text-[var(--highlight-color)]">
            &apos;{pulisher}&apos; 프로필 바로가기
          </p>
        </div>
        <div className="rounded-full border border-[#EDEDED] text-[var(--sub-color)]">
          <SearchIcon className="relative w-12 " />
        </div>
      </Link>
      {description && (
        <div className="flex flex-col gap-2">
          <p className="font-semibold">책 소개말</p>
          <article className="relative size-full w-full text-[var(--sub-color)]">
            <p className="relative line-clamp-3 size-full break-words">
              {description}
            </p>
            {viewMoreUrl && (
              <Link
                href={viewMoreUrl}
                className="relative flex w-full justify-end underline"
              >
                더보기
              </Link>
            )}
          </article>
        </div>
      )}
    </section>
  );
};

export default BookDetailSection;
