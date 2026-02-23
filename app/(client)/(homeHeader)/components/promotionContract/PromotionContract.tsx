import React from "react";
import MailIcon from "@/public/icons/mailIcon.svg";

type Props = {
  className?: string;
};
const PromotionContract = ({ className, ...props }: Readonly<Props>) => {
  return (
    <aside className={`relative mt-4 flex size-full flex-col ${className || ""}`} {...props}>
      <div className="relative flex size-full flex-row justify-between rounded-2xl bg-[var(--sub-highlight-color)]  p-5">
        <span className="flex flex-col justify-center text-sm">
          <p className="text-[var(--sub-color)]">내 이벤트를 알리고 싶으신가요?</p>
          <p className="font-semibold text-[var(--highlight-color)]">홍보 문의하러 가기</p>
        </span>
        <button className="flex aspect-square w-12 items-center justify-center rounded-full border">
          <MailIcon className="w-6 text-[var(--sub-color)]" />
        </button>
      </div>
    </aside>
  );
};

export default PromotionContract;
