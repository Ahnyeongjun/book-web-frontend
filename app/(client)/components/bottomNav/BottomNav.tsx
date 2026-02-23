"use client";
import { Dispatch, HTMLAttributes, SetStateAction, useEffect, useState } from "react";
import HomeIcon from "@/public/icons/homeIcon.svg";
import SearchIcon from "@/public/icons/searchIcon.svg";
import ExploreIcon from "@/public/icons/exploreIcon.svg";
import BackArrowIcon from "@/public/icons/backArrowIcon.svg";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Props = {
  isSearchOpen: boolean;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
} & HTMLAttributes<HTMLDivElement>;
type Tab = "home" | "search" | "explore" | null;
const BottomNav = ({ className, isSearchOpen, setSearchOpen, ...props }: Readonly<Props>) => {
  const [tab, setTab] = useState<Tab>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const regex = /^\/explore(\/|$)/;
    if (pathname === "/") {
      setTab("home");
    } else if (regex.test(pathname)) {
      setTab("explore");
    } else if (isSearchOpen) {
      setTab("search");
    } else {
      setTab(null);
      setSearchOpen(false);
    }
  }, [setSearchOpen, isSearchOpen, pathname]);

  const handleHomeClick = () => {
    router.push("/");
    setSearchOpen(false);
  };
  const handleSearchClick = () => {
    setSearchOpen((prev) => !prev);
  };
  const handleExploreClick = () => {
    router.push("/explore");
    setSearchOpen(false);
  };

  return (
    <nav
      className={`sticky bottom-0 z-40 flex size-full items-end pb-[var(--client-layout-margin)] will-change-transform ${
        className || ""
      }`}
      {...props}
    >
      <div className="relative mx-auto flex items-center justify-around gap-[var(--client-layout-margin)] rounded-full bg-[#FFFFFFD9] stroke-2 px-10 py-3 text-[var(--sub-color)] shadow-[0_0_var(--client-layout-margin)_rgba(0,0,0,0.12)] backdrop-blur-[20px]">
        <button onClick={handleHomeClick}>
          {tab === "home" && (
            <motion.div
              className="pointer-events-none absolute z-[40] size-14 rounded-full bg-[#5f69be26]"
              layoutId="highlight"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <HomeIcon className="relative z-[41] w-14" />
        </button>
        <button onClick={handleSearchClick}>
          {isSearchOpen && (
            <motion.div
              className="pointer-events-none absolute size-14 rounded-full bg-[#5f69be26]"
              layoutId="highlight"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}

          {isSearchOpen ? (
            <BackArrowIcon className="relative z-[41] w-14" />
          ) : (
            <SearchIcon className="relative z-[41] w-14" />
          )}
        </button>

        <button onClick={handleExploreClick}>
          {tab === "explore" && (
            <motion.div
              className="pointer-events-none absolute size-14 rounded-full bg-[#5f69be26]"
              layoutId="highlight"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <ExploreIcon className="relative z-[41] w-14" />
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
