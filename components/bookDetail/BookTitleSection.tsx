import { formatDateToKorean } from "@/function/common";
import BirthDayCakeIcon from "@/public/icons/birthDayCakeIcon.svg";
import { HTMLAttributes } from "react";

type Props = {
  className?: string;
  bookName: string;
  birthDayDate?: Date;
  author?: string;
  url?: string;
} & HTMLAttributes<HTMLDivElement>;
const BookTitleSection = ({
  className,
  bookName,
  birthDayDate,
  author,
  ...props
}: Readonly<Props>) => {
  const birthday = new Date(birthDayDate || "");
  
  return (
    <section
      className={`relative flex size-full flex-col gap-1 ${className || ""}`}
      {...props}
    >
      <span className="flex items-center gap-2">
        <p className="text-lg font-semibold">{bookName}</p>
        <p className="text-sm text-[--sub-color]">{author && author}</p>
      </span>
      <p className="flex flex-row items-start gap-1 text-xs text-[var(--highlight-color)]">
        <BirthDayCakeIcon className="w-3" />
        {birthday
          ? formatDateToKorean(birthday)
          : "정보가 제공되지 않았습니다"}
      </p>
      {/* <div className="flex flex-row gap-2 text-sm text-[var(--sub-color)]">
        <Link className="relative flex items-center justify-center rounded-full border px-6 py-2" href={`${url}`}>
          구매 정보
        </Link>
        <Link className="relative flex items-center justify-center gap-2 rounded-full border px-6 py-2" href={`${url}`}>
          <BookMarkIcon className="w-3" />
          서재에 담기
        </Link>
      </div> */}
    </section>
  );
};

export default BookTitleSection;
