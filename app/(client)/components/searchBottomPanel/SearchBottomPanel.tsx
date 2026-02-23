"use client";
import { Dispatch, HTMLAttributes, SetStateAction, useLayoutEffect, useRef } from "react";
import SearchBar from "./SearchBar";

type Props = {
  className?: string;
  setIsSearchOpen: Dispatch<SetStateAction<boolean>>;
} & HTMLAttributes<HTMLDivElement>;
const SearchBottomPanel = ({ className, setIsSearchOpen, ...props }: Readonly<Props>) => {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const bodyElement = document.body.getBoundingClientRect();
    if (ref.current) {
      ref.current.style.width = bodyElement.width + "px";
    }
  }, []);
  return (
    <section
      className={`fixed bottom-0 z-[40] size-full bg-[#FFFFFFD9] backdrop-blur-[5px] ${className || ""}`}
      ref={ref}
      {...props}
    >
      <SearchBar setIsSearchOpen={setIsSearchOpen} />
    </section>
  );
};

export default SearchBottomPanel;
