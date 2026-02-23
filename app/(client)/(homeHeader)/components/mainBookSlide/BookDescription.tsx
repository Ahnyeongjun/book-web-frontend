import Link from "next/link";
import { HTMLAttributes } from "react";

type Props = { className?: string; createdAt: Date } & HTMLAttributes<HTMLDivElement>;
const BookDescription = ({ className, createdAt, ...props }: Readonly<Props>) => {
  const month = createdAt.getMonth() + 1;
  const day = createdAt.getDate();

  return (
    <div className={`mb-7 flex w-full items-end justify-between ${className || ""}`} {...props}>
      <div className="flex flex-col items-start gap-2">
        <h2 className="text-2xl font-bold">Happy Books Day!</h2>
        <p className="text-sm text-[var(--sub-color)]">
          {month}월 {day}일 태어난 책
        </p>
      </div>
      <Link
        href={{ pathname: `/birth-day`, query: { day, month } }}
        className="flex h-fit items-center rounded-full bg-[#FFFFFFD9] px-6 py-2 text-sm shadow-[0_0_var(--client-layout-margin)_rgba(0,0,0,0.12)] backdrop-blur-[5px]"
      >
        view all
      </Link>
    </div>
  );
};

export default BookDescription;
