"use client";
import { useAdminPageData } from "@/app/admin/(home)/components/AdminPageDataProvider";
import React, { HTMLAttributes, ReactNode } from "react";
import ArrowHeadIcon from "@/public/icons/arrowHeadIcon.svg";

type Props = { className?: string; children?: ReactNode } & HTMLAttributes<HTMLDivElement>;
const AdminPaginationController = ({ className, ...props }: Readonly<Props>) => {
  const { data, currentPage, setCurrentPage } = useAdminPageData();
  const resultLength = Array.isArray(data) ? data.length : 0;
  const pageLength = Math.ceil(resultLength / 20);
  return (
    <nav className={`flex w-full flex-row items-center justify-between gap-2 pb-12 pt-8 ${className}`} {...props}>
      <label className="relative flex h-8 cursor-pointer items-center rounded-full border border-gray-200 px-4 text-sm font-semibold text-[var(--sub-color)]">
        Import CSV File
        <input type="file" accept=".csv" className="hidden"></input>
      </label>
      <span className="flex flex-row gap-5 text-sm text-[var(--sub-color)]">
        <p>
          Showing {(currentPage || 1) * 20 - 19}-{(currentPage || 1) * 20 - 19 + 19} of All
        </p>
        <div className="flex flex-row items-center justify-center gap-2">
          <button
            className="flex size-3 items-center justify-center"
            onClick={() => currentPage && currentPage > 1 && setCurrentPage((prev) => prev - 1)}
          >
            <ArrowHeadIcon />
          </button>
          {[...new Array(pageLength)].map((_, index) => (
            <button key={index} onClick={() => setCurrentPage(index + 1)} className="font-semibold">
              {index + 1}
            </button>
          ))}
          <button
            className="flex size-3 rotate-180 items-center justify-center"
            onClick={() => currentPage && currentPage < pageLength && setCurrentPage((prev) => prev + 1)}
          >
            <ArrowHeadIcon />
          </button>
        </div>
      </span>
    </nav>
  );
};

export default AdminPaginationController;
