import { HTMLAttributes } from "react";

type Props = { className?: string; content?: string } & HTMLAttributes<HTMLDivElement>;
const EmptyImage = ({ className, content = "사진 미제공", ...props }: Readonly<Props>) => {
  return (
    <div
      className={`relative flex size-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#B0B5DF] to-[#EEDBE0] ${
        className || ""
      }`}
      {...props}
    >
      <p className="line-clamp-3 text-ellipsis break-words text-center text-lg font-bold text-white">{content}</p>
    </div>
  );
};

export default EmptyImage;
