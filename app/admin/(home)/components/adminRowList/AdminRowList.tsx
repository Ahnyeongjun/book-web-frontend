"use client";
import { useAdminPageData } from "@/app/admin/(home)/components/AdminPageDataProvider";
import { HTMLAttributes } from "react";
import MemoizedAdminRowListItem from "./AdminRowListItem";

type Props = {
  keys: string[];
  className?: string;
} & HTMLAttributes<HTMLDivElement>;
const AdminRowList = <T extends { id: number; },>({ className, keys, ...props }: Readonly<Props>) => {
  const { data, setSelectRow, selectRow, currentPage } = useAdminPageData<T>();
  const PAGE_SIZE = 20;
  const currentItems =
    Array.isArray(data) &&
    data.slice(
      ((currentPage || 1) - 1) * PAGE_SIZE,
      (currentPage || 1) * PAGE_SIZE
    );
  console.log(data);

  return (
    <div
      className={`relative flex flex-1 flex-col overflow-auto ${
        className || ""
      }`}
      {...props}
    >
      <div className="absolute flex size-full flex-col">
        <div className="sticky top-0 z-10 flex flex-row border-b-[1px] bg-white pl-[88px]">
          {keys.map((key, index) => (
            <p
              key={index}
              className="flex-1 truncate px-2 py-1 text-xs font-bold"
            >
              {key}
            </p>
          ))}
        </div>
        {currentItems instanceof Array &&
          currentItems.map((item, rowIndex) => {
            if (typeof item === "object") {
              return (
                <MemoizedAdminRowListItem<T>
                  key={rowIndex}
                  item={item}
                  keys={keys}
                  rowIndex={rowIndex}
                  isSelect={selectRow === item.id}
                  setSelectRow={setSelectRow}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default AdminRowList;
