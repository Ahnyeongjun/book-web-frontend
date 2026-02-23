"use client";
import { useBackHeader } from "@/context/backHeaderStore";
import { useEffect } from "react";
const SearchHeaderHelper = ({ query }: { query: string }) => {
  const { setTitle } = useBackHeader();

  useEffect(() => {
    setTitle(<h1 className="text-lg font-semibold">{query}</h1>);
    return () => {
      setTitle("");
    };
  }, [setTitle, query]);
  return null;
};

export default SearchHeaderHelper;
