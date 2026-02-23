"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Props = {
  className?: string;
  imageUrl?: string;
};
const PublisherPortrait = ({
  className,
  imageUrl,
  ...props
}: Readonly<Props>) => {
  const [hasError, setHasError] = useState(false);

  const isValidUrl = useMemo(() => {
    if (!imageUrl) return false;
    try {
      new URL(imageUrl);
      return true;
    } catch {
      return false;
    }
  }, [imageUrl]);

  const shouldShowImage = isValidUrl && !hasError;

  return (
    <div
      className={`relative aspect-square w-full overflow-hidden rounded-full ${
        className || ""
      }`}
      {...props}
    >
      {shouldShowImage ? (
        <Image
          alt="publisher"
          src={imageUrl!}
          fill
          onError={() => setHasError(true)}
        />
      ) : (
        <Image
          src="/images/ProfileImageDefault.png"
          alt={"profile_null"}
          fill
        />
        // <EmptyImage />
      )}
    </div>
  );
};

export default PublisherPortrait;
