"use client";
import CommonLabel from "@/components/common/CommonLabel";
import CommonPillButton from "@/components/common/CommonPillButton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";

type Props = {
  className?: string;
} & HTMLAttributes<HTMLDivElement>;
const AdminSideNav = ({ className, ...props }: Readonly<Props>) => {
  const pathname = usePathname();

  return (
    <nav className={`sticky left-0 top-0 flex w-1/4 ${className || ""}`} {...props}>
      <div className="relative flex size-full flex-col gap-5 pb-12 pl-[50%] font-semibold">
        <CommonLabel className="flex h-16 items-center justify-start">menu</CommonLabel>
        <Link href="/admin/publisher" className={`${pathname === "/admin/publisher" ? "" : "text-[var(--sub-color)]"}`}>
          Publisher
        </Link>
        <Link href="/admin/content" className={`${pathname === "/admin/content" ? "" : "text-[var(--sub-color)]"}`}>
          Content
        </Link>
        <Link href="/admin/event" className={`${pathname === "/admin/event" ? "" : "text-[var(--sub-color)]"}`}>
          Event
        </Link>
        <Link href="/admin/inquiry" className={`${pathname === "/admin/inquiry" ? "" : "text-[var(--sub-color)]"}`}>
          기타 문의
        </Link>
        <Link href="/admin/kakaoInquiry" className={`${pathname === "/admin/publikakaoInquirysher" ? "" : "text-[var(--sub-color)]"}`}>
          카카오 요청
        </Link>
        <CommonPillButton className="mt-auto h-8 w-20 border-gray-200 text-[var(--sub-color)]">Logout</CommonPillButton>
      </div>
    </nav>
  );
};

export default AdminSideNav;
