"use client";
import CommonPillButton from "@/components/common/CommonPillButton";
import { usePopupState } from "@/context/popupStore";
import { HTMLAttributes, useEffect, useRef, useState } from "react";

type Props = {
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const YearMonthFilterSelector = ({ className, ...props }: Readonly<Props>) => {
  const { closeCallback, confirmCallback } = usePopupState();
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - 5 + i
  );
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const yearRefs = useRef<HTMLDivElement[]>([]);
  const monthRefs = useRef<HTMLDivElement[]>([]);
  const yearContainerRef = useRef<HTMLUListElement>(null);
  const monthContainerRef = useRef<HTMLUListElement>(null);

  const setFilterHandler = (value: { year: number; month: number }) => {
    closeCallback();
    if (confirmCallback) {
      confirmCallback(value);
    }
  };

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "!text-[var(--highlight-color)]",
              "border-y-[0.4px]",
              "border-[var(--sub-color)]"
            );
            if (entry.target.textContent) {
              const num = parseInt(entry.target.textContent);
              if (!isNaN(num)) setSelectedYear(num);
            }
          } else {
            entry.target.classList.remove(
              "!text-[var(--highlight-color)]",
              "border-y-[0.4px]",
              "border-[var(--sub-color)]"
            );
          }
        });
      },
      {
        root: yearContainerRef.current,
        rootMargin: "-40% 0px -40% 0px",
      }
    );
    yearRefs.current.forEach((element) => {
      if (element) intersectionObserver.observe(element);
    });
    return () => {
      intersectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "!text-[var(--highlight-color)]",
              "border-y-[0.4px]",
              "border-[var(--sub-color)]"
            );
            if (entry.target.textContent) {
              const num = parseInt(entry.target.textContent);
              if (!isNaN(num)) setSelectedMonth(num);
            }
          } else {
            entry.target.classList.remove(
              "!text-[var(--highlight-color)]",
              "border-y-[0.4px]",
              "border-[var(--sub-color)]"
            );
          }
        });
      },
      {
        root: monthContainerRef.current,
        rootMargin: "-40% 0px -40% 0px",
      }
    );
    monthRefs.current.forEach((element) => {
      if (element) intersectionObserver.observe(element);
    });
    return () => {
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <div
      className={`flex size-fit w-full flex-col items-center rounded-t-[40px] bg-white p-6 shadow-[0_0_20px_0_rgba(0,0,0,0.12)] ${
        className || ""
      }`}
      {...props}
    >
      <div className="flex gap-5 font-semibold">
        <ul
          className="flex max-h-[30vh] snap-y snap-mandatory flex-col gap-[1vh] overflow-y-scroll py-[10vh] scrollbar-hide"
          ref={yearContainerRef}
        >
          {years.map((year, index) => (
            <div
              ref={(el) => {
                if (el) yearRefs.current[index] = el;
              }}
              key={index}
              className="flex snap-center items-center justify-center py-5 text-2xl text-[#DBE1F1]"
            >
              <p>{year}년</p>
            </div>
          ))}
        </ul>
        <ul
          className="flex max-h-[30vh] snap-y snap-mandatory flex-col gap-[1vh] overflow-y-scroll py-[10vh] scrollbar-hide"
          ref={monthContainerRef}
        >
          {months.map((month, index) => (
            <div
              ref={(el) => {
                if (el) monthRefs.current[index] = el;
              }}
              key={index}
              className="flex snap-center items-center justify-center py-5 text-2xl text-[#DBE1F1]"
            >
              <p>{month}월</p>
            </div>
          ))}
        </ul>
      </div>
      <CommonPillButton
        onClick={() =>
          setFilterHandler({ year: selectedYear, month: selectedMonth })
        }
        className="h-20 border-none bg-[var(--sub-highlight-color)] !text-lg font-bold"
      >
        확인
      </CommonPillButton>
    </div>
  );
};

export default YearMonthFilterSelector;
