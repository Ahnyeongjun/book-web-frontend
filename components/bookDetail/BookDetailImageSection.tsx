import Image from "next/image";
import birthDayCake from "@/public/birthDayCake.png";
import { HTMLAttributes } from "react";
import EmptyImage from "../common/EmptyImage";

type Props = { className?: string; imageUrl?: string; birthDay?: Date } & HTMLAttributes<HTMLDivElement>;
const BookDetailImageSection = ({ className, imageUrl, birthDay, ...props }: Readonly<Props>) => {
  const birthdayDate = new Date(birthDay || "");

  const isBirthday = birthdayDate?.getDate() === new Date().getDate() && birthdayDate.getMonth() === new Date().getMonth();
  return (
    <section
      className={`relative mx-auto flex aspect-[3/4] size-full max-w-[163px] items-center justify-center ${
        className || ""
      }`}
      {...props}
    >
      {imageUrl ? (
        <Image alt="book" src={imageUrl} className={`relative size-full rounded-2xl`} fill sizes="163px" />
      ) : (
        <EmptyImage />
      )}
      {isBirthday && (
        <Image alt="bithDayCake" src={birthDayCake} width={40} height={40} className="absolute -bottom-2 -right-2" />
      )}
    </section>
  );
};

export default BookDetailImageSection;
