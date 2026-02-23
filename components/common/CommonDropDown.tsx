"use client";

import TriangleArrow from "@/public/icons/triangleArrowIcon.svg";
import { AnimatePresence, motion } from "framer-motion";
import { ChangeEvent, forwardRef, HTMLAttributes, useState } from "react";

type Props = {
  className?: string;
  name: string;
  optionItems: string[];
  defaultValue?: string;
  height?: number;
} & HTMLAttributes<HTMLUListElement>;
const CommonDropDown = forwardRef<HTMLInputElement, Readonly<Props>>(
  (
    {
      className,
      name,
      optionItems,
      defaultValue = optionItems[0],
      height = 40,
      ...props
    },
    ref
  ) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedValue(e.target.value);
      setIsOpen(false);
    };
    return (
      <ul
        className={`relative size-full overflow-hidden rounded-xl border text-sm text-[var(--sub-color)] ${
          className || ""
        }`}
        {...props}
      >
        <li
          className={`relative flex w-full cursor-pointer flex-row items-center justify-between py-2 pl-4 pr-2 peer-checked:bg-[var(--sub-highlight-color)]`}
          style={{ height: height + "px" }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {selectedValue}
          <TriangleArrow
            className={`flex size-4 items-center justify-center transition duration-300 ${
              !isOpen ? "rotate-180" : ""
            }`}
          />
        </li>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: height * optionItems.length }}
              exit={{ height: 0 }}
              className="size-full overflow-hidden"
            >
              {optionItems.map((option, index) => (
                <label key={option + index}>
                  <input
                    type="radio"
                    name={name}
                    className="peer sr-only"
                    checked={selectedValue === option}
                    onChange={handleClick}
                    value={option}
                    ref={ref}
                  />
                  <li
                    className={`relative flex w-full cursor-pointer flex-row items-center justify-between px-4 py-2 peer-checked:bg-[var(--sub-highlight-color)]`}
                    style={{ height: height + "px" }}
                  >
                    {option}
                  </li>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </ul>
    );
  }
);

CommonDropDown.displayName = "CommonDropDown";
export default CommonDropDown;
