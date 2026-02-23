"use client";
import { useBackHeader } from "@/context/backHeaderStore";
import { HTMLAttributes } from "react";
import BackArrow from "@/public/icons/backArrowIcon.svg";
import { useRouter } from "next/navigation";

type Props = { className?: string } & HTMLAttributes<HTMLDivElement>;
const BackbuttonHeader = ({ className, ...etc }: Readonly<Props>) => {
  const { title, etcButton } = useBackHeader();
  const router = useRouter();
  return (
    <header
      className={`sticky top-0 z-40 flex w-full flex-row justify-between bg-[#FFFFFFD9] p-[var(--client-layout-margin)] backdrop-blur-[5px] ${
        className || ""
      }`}
      {...etc}
    >
      <button
        onClick={() => {
          router.back();
        }}
      >
        <BackArrow className="w-12 text-[var(--sub-color)]" />
      </button>
      <div className="flex flex-col items-start justify-center gap-2 overflow-hidden">{title}</div>
      <button className="min-w-12">{etcButton && etcButton}</button>
    </header>
  );
};

export default BackbuttonHeader;
