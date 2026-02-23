import EmptyImage from "@/components/common/EmptyImage";
import Image from "next/image";

type Props = {
  className?: string;
  imageUrl?: string;
  publisher: string;
};
const TodayLibraryItem = ({
  className,
  imageUrl,
  publisher,
  ...props
}: Readonly<Props>) => {
  return (
    <div
      className={`relative flex aspect-[3/4] size-full items-end justify-end overflow-hidden rounded-lg ${
        className || ""
      }`}
      {...props}
    >
      {imageUrl ? (
        <Image
          alt="book"
          src={imageUrl}
          className={`shadow-[5px_0_8px_3px_rgba(0,0,0,0.08)]`}
          fill
          sizes="130px"
        />
      ) : (
        <EmptyImage />
      )}
      <div className="pointer-events-none absolute size-full bg-gradient-to-b from-black/0 to-black/90">
        <div className="relative bottom-0 flex size-full flex-col justify-end px-2 pb-3 text-white">
          <div className="flex flex-row items-center">
            <div className="mr-2 size-5 shrink-0 rounded-full bg-white"></div>
            <p className="relative line-clamp-1 min-w-0 break-words">
              {publisher || "출판사"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayLibraryItem;
