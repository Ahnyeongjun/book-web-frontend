"use client";
import BookGrid from "@/components/bookGrid/BookGrid";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { KaKaoBookResponse } from "@/types/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
const SearchBookGridContainer = ({ query }: { query: string }) => {
  const nextPageButtonRef = useRef<HTMLButtonElement>(null);
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["searchBook", query],
    queryFn: ({ pageParam }) => fetchInfiniteKaKaoData(pageParam, query),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    staleTime: 24 * 60 * 60 * 1000,
  });

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });
    if (nextPageButtonRef.current) {
      observer.observe(nextPageButtonRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      {!isLoading ? (
        <>
          {data?.pages.map((page, index) => (
            <BookGrid
              key={index}
              books={page?.data || []}
              className={`${data?.pages.length > 0 && "py-0 pt-[10px]"}`}
            />
          ))}
          {hasNextPage && (
            <button onClick={() => fetchNextPage()} ref={nextPageButtonRef}>
              더보기
            </button>
          )}
        </>
      ) : (
        <LoadingSpinner className="h-[50vh] w-full" />
      )}
    </>
  );
};

export default SearchBookGridContainer;

const fetchInfiniteKaKaoData = async (pageParam: number, query?: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_KAKAO_SEARCH_API_URL}/book?query=${query}&page=${pageParam}&size=6`,
    {
      method: "GET",
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_SEARCH_API_KEY}`,
      },
      cache: "no-cache",
    }
  );
  const data: KaKaoBookResponse = await response.json();
  if (!response.ok) return;
  return { data: data.documents, nextCursor: data.meta.is_end ? undefined : pageParam + 1 };
};
