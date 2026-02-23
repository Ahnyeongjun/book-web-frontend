"use client";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";
type Props = {
  className?: string;
  pageCount: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};
const SlideIndicator = ({
  className,
  pageCount,
  currentPage,
  setCurrentPage,
  ...props
}: Readonly<Props>) => {
  return (
    <div
      className={`relative flex w-full flex-row items-center justify-center gap-1 ${
        className || ""
      }`}
      {...props}
    >
      {[...Array(Math.ceil(pageCount))].map((_, index) => (
        <motion.button
          key={index}
          layoutId="slide-indicator"
          className={`h-2 rounded-full transition-colors duration-700 ${
            currentPage === index
              ? "bg-[var(--highlight-color)]"
              : "bg-white shadow-[inset_0px_1px_1px_rgba(0,0,0,0.3)]"
          }`}
          onClick={() => setCurrentPage(index)}
          initial={{ width: 8 }}
          animate={{
            width: currentPage === index ? 16 : 8,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

export default SlideIndicator;
