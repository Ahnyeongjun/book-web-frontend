"use client";
import { PageResponseBookDto } from "@/types/dto";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetBirthDayBooks = () => {
  const { data, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ["books"],
    queryFn: ({ pageParam }) => fetchBirthDayBooks({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.totalPages + 1 : undefined,
  });

  return { data, fetchNextPage, hasNextPage, status };
};

export default useGetBirthDayBooks;

const fetchBirthDayBooks = async ({ pageParam = 0 }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/books?keyword=string&page=${pageParam}&limit=10&orderBy=publishedDate&direction=desc`
  );
  console.log(response, "response");

  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  const result: PageResponseBookDto = await response.json();
  return result;
};
