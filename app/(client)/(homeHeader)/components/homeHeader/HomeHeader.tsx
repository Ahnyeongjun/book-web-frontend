import { HTMLAttributes } from "react";
import Logo from "@/components/logo/Logo";
import Link from "next/link";

type Props = { className?: string } & HTMLAttributes<HTMLDivElement>;
const HomeHeader = ({ className, ...etc }: Readonly<Props>) => {
  return (
    <header
      className={`sticky top-0 z-40 w-full bg-[#FFFFFFD9] bg-opacity-85 p-[var(--client-layout-margin)] text-lg font-semibold backdrop-blur-[5px] ${
        className || ""
      }`}
      {...etc}
    >
      <Link href={"/"}>
        <Logo />
      </Link>
    </header>
  );
};

export default HomeHeader;
