import Image from "next/image";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import EmptyImage from "../common/EmptyImage";

type Props = {
  className?: string;
  imageUrl: string;
  sourceName: string;
  sourceUrl: string;
  title: string;
} & HTMLAttributes<HTMLDivElement>;
const RecommandedItem = ({ className, imageUrl, sourceName, sourceUrl, title, ...props }: Readonly<Props>) => {
  return (
    <Link className="contents" href={sourceUrl}>
      <aside
        className={`relative my-5 flex size-full flex-col items-start justify-start ${className || ""}`}
        {...props}
      >
        <div className="relative mb-6 aspect-video w-full">
          {imageUrl ? <Image alt="recommandContents" src={imageUrl} fill className="rounded-2xl" /> : <EmptyImage />}
        </div>
        <p className="mb-2 text-sm font-bold text-[var(--highlight-color)]">{sourceName}</p>
        <h3 className="relative line-clamp-2 size-full break-words font-medium">{title}</h3>
      </aside>
    </Link>
  );
};

export default RecommandedItem;
