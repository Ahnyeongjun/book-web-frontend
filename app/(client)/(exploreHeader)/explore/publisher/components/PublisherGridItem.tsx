import PublisherPortrait from "@/components/publisherProfile/PublisherPortrait";

type Props = {
  className?: string;
  publisherName: string;
  imageUrl?: string;
  instagramId: string;
};
const PublisherGridItem = ({
  className,
  publisherName,
  imageUrl,
  instagramId,
  ...props
}: Readonly<Props>) => {
  return (
    <div
      className={`relative flex size-full flex-col overflow-hidden ${
        className || ""
      }`}
      {...props}
    >
      <PublisherPortrait className="mb-3" imageUrl={imageUrl} />
      <p className="line-clamp-1 text-center text-sm">
        {publisherName || "출판사 이름"}
      </p>
      <p className="line-clamp-1 text-center text-xs text-[var(--sub-color)]">
        {instagramId || "인스타그램 아이디"}
      </p>
    </div>
  );
};

export default PublisherGridItem;
