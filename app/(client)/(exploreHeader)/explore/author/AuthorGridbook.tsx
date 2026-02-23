import EmptyImage from "@/components/common/EmptyImage";
import Image from "next/image";

type Props = {
  imageUrl?: string;
  title: string;
};

const AuthorGridbook = ({ imageUrl, title }: Readonly<Props>) => {
  return (
    <div className="relative w-full rounded-lg bg-gradient-to-b from-black/0 to-black/90">
      {imageUrl ? <Image alt="bookImg" src={imageUrl} fill /> : <EmptyImage />}
      <p className="absolute">{title}</p>
    </div>
  );
};

export default AuthorGridbook;
