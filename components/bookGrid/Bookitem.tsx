import Image from "next/image";
import { HTMLAttributes } from "react";
import EmptyImage from "../common/EmptyImage";

type Props = {
  className?: string;
  imageUrl: string;
  bookName?: string;
  author?: string;
  publisher?: string;
} & HTMLAttributes<HTMLDivElement>;
const BookItem = ({ className, imageUrl, bookName, author, publisher, ...props }: Readonly<Props>) => {
  return (
    <div className={`relative flex aspect-[3/4] size-full items-end justify-end ${className || ""}`} {...props}>
      {imageUrl ? (
        <Image
          alt="book"
          src={imageUrl}
          className={`rounded-2xl shadow-[5px_0_8px_3px_rgba(0,0,0,0.08)]`}
          fill
          sizes="295px"
        />
      ) : (
        <EmptyImage />
      )}
      <div className="pointer-events-none absolute size-full rounded-2xl bg-gradient-to-t from-black to-transparent">
        <div className="relative bottom-0 flex size-full flex-col justify-end px-4 pb-6 text-white">
          <h3 className="relative mb-5 line-clamp-2 h-fit w-full break-words font-bold">{bookName || "책이름"}</h3>
          <div className="flex flex-row">
            <p className="relative line-clamp-1 min-w-0 break-words font-semibold">{author || "저자"}</p>·
            <p className="relative line-clamp-1 min-w-0 break-words text-[var(--sub-color)]">{publisher || "출판사"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
