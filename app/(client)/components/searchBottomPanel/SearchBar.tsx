"use client";
import { Dispatch, HTMLAttributes, SetStateAction, useEffect, useRef } from "react";
import SearchIcon from "@/public/icons/searchIcon.svg";
import { useRouter } from "next/navigation";
type Props = {
  className?: string;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
} & HTMLAttributes<HTMLDivElement>;
const SearchBar = ({ className, setIsSearchOpen, ...props }: Readonly<Props>) => {
  const searchBarRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const focusTimer = setTimeout(() => {
      searchBarRef.current?.focus();
    }, 500);

    return () => clearTimeout(focusTimer);
  }, []);

  const pushHandler = () => {
    if (!searchBarRef.current?.value) return;
    router.push("/search?query=" + searchBarRef.current?.value);
    setIsSearchOpen(false);
  };

  return (
    <div className={`sticky top-0 w-full px-[var(--client-layout-margin)] py-3 ${className || ""}`} {...props}>
      <div className="relative flex w-full flex-row rounded-2xl border bg-white p-1">
        <SearchIcon className="w-11 cursor-pointer text-[var(--sub-color)]" onClick={pushHandler} />
        <input
          className="w-full outline-none"
          placeholder="제목, 작가, 출판사를 검색하세요"
          type="search"
          ref={searchBarRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              pushHandler();
            }
          }}
        ></input>
      </div>
    </div>
  );
};

export default SearchBar;
