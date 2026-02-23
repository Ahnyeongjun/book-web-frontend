"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const PUBLISHER = /\/publisher$/;
const AUTHOR = /\/author$/;
const READER = /\/reader$/;
const PLACE = /\/place$/;
const ExploreHeader = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-30 flex w-full flex-col bg-[#FFFFFFD9] backdrop-blur-[5px]">
      <div className="flex flex-row items-center justify-start gap-4 overflow-x-auto py-6 pl-5 text-xl font-bold scrollbar-hide">
        <Link href={"./publisher"} className="shrink-0">
          <p
            className={`p-2 ${
              !PUBLISHER.test(pathname) && "text-[var(--sub-color)]"
            }`}
          >
            출판사
          </p>
          {PUBLISHER.test(pathname) && (
            <motion.div
              className="pointer-events-none relative size-full border-0 border-b-2 border-black"
              layoutId="exploreHighlight"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </Link>
        <Link href={"./author"} className="shrink-0">
          <p
            className={`p-2 ${
              !AUTHOR.test(pathname) && "text-[var(--sub-color)]"
            }`}
          >
            작가
          </p>
          {AUTHOR.test(pathname) && (
            <motion.div
              className="pointer-events-none relative size-full border-0 border-b-2 border-black"
              layoutId="exploreHighlight"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </Link>
        <Link href={"./reader"} className="shrink-0">
          <p
            className={`p-2 ${
              !READER.test(pathname) && "text-[var(--sub-color)]"
            }`}
          >
            독자
          </p>
          {READER.test(pathname) && (
            <motion.div
              className="pointer-events-none relative size-full border-0 border-b-2 border-black"
              layoutId="exploreHighlight"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </Link>
        <Link href={"./place"} className="shrink-0">
          <p
            className={`p-2 ${
              !PLACE.test(pathname) && "text-[var(--sub-color)]"
            }`}
          >
            공간
          </p>
          {PLACE.test(pathname) && (
            <motion.div
              className="pointer-events-none relative size-full border-0 border-b-2 border-black"
              layoutId="exploreHighlight"
              initial={false}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
        </Link>
      </div>
    </header>
  );
};

export default ExploreHeader;
