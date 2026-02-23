"use client";
import { useBackHeader } from "@/context/backHeaderStore";
import { useEffect } from "react";
const DiscoveryHeaderHelper = () => {
  const { setTitle } = useBackHeader();

  useEffect(() => {
    setTitle(<h1 className="text-lg font-semibold">디스커버리</h1>);
    return () => {
      setTitle("");
    };
  }, [setTitle]);
  return null;
};

export default DiscoveryHeaderHelper;
