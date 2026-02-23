import Image from "next/image";
import EmptyImage from "../common/EmptyImage";

type Props = {
  className?: string;
  imageUrl?: string;
  contentType: string;
  title: string;
};
const DiscoveryItem = ({
  className,
  imageUrl,
  contentType,
  title,
  ...props
}: Readonly<Props>) => {
  return (
    <li
      className={`relative flex w-full flex-row justify-between py-6 ${
        className || ""
      }`}
      {...props}
    >
      <div className="relative flex flex-1 flex-col items-start justify-center gap-2 pr-3">
        <p className="relative text-sm font-bold text-[var(--highlight-color)]">
          {contentType ?? "타입"}
        </p>
        <p className="line-clamp-1 font-medium">{title ?? "제목"}</p>
      </div>
      {imageUrl ? (
        <div className="relative aspect-video h-12 overflow-hidden rounded-xl">
          <Image alt="discovery" src={imageUrl} fill sizes="768px" />
        </div>
      ) : (
        <div className="relative aspect-video h-12 overflow-hidden rounded-xl">
          <EmptyImage />
        </div>
      )}
    </li>
  );
};

export default DiscoveryItem;
