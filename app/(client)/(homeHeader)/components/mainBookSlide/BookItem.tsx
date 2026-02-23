import EmptyImage from "@/components/common/EmptyImage";
import Image from "next/image";
import Link from "next/link";
import { HTMLAttributes } from "react";

type Props = {
  className?: string;
  isbn: string;
  imageUrl?: string;
  ind: number;
  bookLength: number;
} & HTMLAttributes<HTMLAnchorElement>;
const BookItem = ({
  className,
  isbn,
  imageUrl,
  ind,
  bookLength,
  ...props
}: Readonly<Props>) => {
  return (
    <Link
      href={`/birth-day/${isbn}`}
      className={`relative flex items-end justify-end ${className || ""}`}
      {...props}
    >
      <div
        className={`absolute aspect-[3/4] ${
          ind !== bookLength - 1 ? "h-[293px] w-[194px]" : "h-[341px] w-[235px]"
        }`}
      >
        {imageUrl ? (
          <Image
            alt="book"
            src={imageUrl}
            className={`absolute rounded-2xl shadow-[5px_0_8px_3px_rgba(0,0,0,0.08)]`}
            style={{ zIndex: ind + 1 }}
            sizes="235px"
            fill
          />
        ) : (
          <EmptyImage />
        )}
        {ind !== bookLength - 1 && (
          <div
            className="pointer-events-none absolute size-full rounded-2xl bg-[#FFFFFF99]"
            style={{ zIndex: ind + 1 }}
          ></div>
        )}
      </div>
    </Link>
  );
};

export default BookItem;
