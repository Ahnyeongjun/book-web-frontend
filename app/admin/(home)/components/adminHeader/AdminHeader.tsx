import { HTMLAttributes } from "react";
import AdminSearchBar from "./AdminSearchBar";
import Link from "next/link";

type Props = { className?: string } & HTMLAttributes<HTMLDivElement>;
const AdminHeader = ({ className, ...props }: Readonly<Props>) => {
  return (
    <header className={`relative flex w-full flex-row py-10 ${className || ""}`} {...props}>
      <div className="relative flex w-1/4 items-center">
        <Link href="/admin" className="ml-[50%]">
          <h1 className="text-2xl font-bold">HBD</h1>
        </Link>
      </div>
      <AdminSearchBar />
    </header>
  );
};

export default AdminHeader;
