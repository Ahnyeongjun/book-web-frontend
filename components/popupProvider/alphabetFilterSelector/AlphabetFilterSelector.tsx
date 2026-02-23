"use client";
import CommonPillButton from "@/components/common/CommonPillButton";
import { usePopupState } from "@/context/popupStore";
import React, { HTMLAttributes, useEffect, useRef, useState } from "react";

type Props = {
  className?: string;
} & HTMLAttributes<HTMLDivElement>;
const AlphabetFilterSelector = ({ className, ...props }: Readonly<Props>) => {
  const { closeCallback, confirmCallback } = usePopupState();
  const [current, setCurrent] = useState<string>("A-Z");
  const ref = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLUListElement>(null);
  const setFilterHandler = (alphabet: string) => {
    closeCallback();
    if (confirmCallback) {
      confirmCallback(alphabet);
    }
  };

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("!text-[var(--highlight-color)]");
            if (entry.target.textContent) setCurrent(entry.target.textContent);
          } else {
            entry.target.classList.remove("!text-[var(--highlight-color)]");
          }
        });
      },
      {
        root: containerRef.current,
        rootMargin: "-40% 0px -40% 0px",
      }
    );
    ref.current.forEach((element) => {
      intersectionObserver.observe(element);
    });
    return () => {
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`flex size-fit w-full flex-col rounded-t-[40px] bg-white p-6 shadow-[0_0_20px_0_rgba(0,0,0,0.12)] ${
        className || ""
      }`}
      {...props}
    >
      <ul
        className="flex max-h-[30vh] snap-y snap-mandatory flex-col gap-[5vh] overflow-y-scroll py-[10vh]"
        ref={containerRef}
      >
        {alphabetArray.map((alphabet, index) => {
          return (
            <div
              key={index}
              className="flex snap-center items-center justify-center text-2xl text-[#DBE1F1]"
              ref={(element) => {
                if (element) ref.current[index] = element;
              }}
            >
              <p>{alphabet}</p>
            </div>
          );
        })}
      </ul>
      <CommonPillButton
        onClick={() => setFilterHandler(current)}
        className="h-20 border-none bg-[var(--sub-highlight-color)] !text-lg font-bold"
      >
        확인
      </CommonPillButton>
    </div>
  );
};

export default AlphabetFilterSelector;

const alphabetArray = ["A-Z", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(97 + i))];
