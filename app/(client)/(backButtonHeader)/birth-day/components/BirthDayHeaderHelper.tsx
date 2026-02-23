"use client";
import { useBackHeader } from "@/context/backHeaderStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
const BirthDayHeaderHelper = () => {
  const params = useSearchParams();
  const { setTitle } = useBackHeader();
  const month = params.get("month");
  const day = params.get("day");

  useEffect(() => {
    setTitle(
      <>
        <h1 className="text-lg font-semibold">Happy Books Day!</h1>
        <h2 className="text-sm font-normal text-[var(--sub-color)]">
          {month}월 {day}일 태어난 책
        </h2>
      </>
    );
    return () => {
      setTitle("");
    };
  }, [setTitle, month, day]);
  return null;
};

export default BirthDayHeaderHelper;
