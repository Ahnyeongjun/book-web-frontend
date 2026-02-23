"use client";
import SearchIcon from "@/public/icons/searchIcon.svg";
import { usePathname, useRouter } from "next/navigation";
import { HTMLAttributes, KeyboardEvent, useRef } from "react";

type Props = { className?: string } & HTMLAttributes<HTMLDivElement>;
const AdminSearchBar = ({ className, ...props }: Readonly<Props>) => {
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchHandler = () => {
    router.push(`${pathname}?keyword=${inputRef.current?.value}`);
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      searchHandler();
    }
  };
  const initSearch = () => {
    console.log("검색 초기화");

    router.push(`${pathname}`);
  };
  return (
    <div
      className={`relative flex w-full max-w-[33%] flex-row rounded-2xl border bg-white p-1 ${
        className || ""
      }`}
      {...props}
    >
      <input
        className="w-full pl-4 outline-none"
        placeholder="검색어를 입력하세요"
        type="search"
        ref={inputRef}
        onInput={(e) => {
          if ((e.target as HTMLInputElement).value === "") {
            initSearch();
          }
        }}
        onKeyDown={handleKeyDown}
      ></input>
      <button onClick={searchHandler}>
        <SearchIcon
          className="w-11 text-[var(--sub-color)]"
          onClick={initSearch}
        />
      </button>
    </div>
  );
};

export default AdminSearchBar;
