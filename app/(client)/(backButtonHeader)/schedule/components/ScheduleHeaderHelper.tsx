"use client";
import { useBackHeader } from "@/context/backHeaderStore";
import { useEffect } from "react";
const ScheduleHeaderHelper = () => {
  const { setTitle } = useBackHeader();

  useEffect(() => {
    setTitle(<h1 className="text-lg font-semibold">다가오는 일정</h1>);
    return () => {
      setTitle("");
    };
  }, [setTitle]);
  return null;
};

export default ScheduleHeaderHelper;
