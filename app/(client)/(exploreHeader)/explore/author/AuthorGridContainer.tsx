"use client";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { fetchAuthors } from "@/function/fetch/fetchAuthors";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import AuthorGrid from "./AuthorGrid";

const AuthorGridContainer = () => {
  const nextPageButtonRef = useRef<HTMLButtonElement>(null);
  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["Authors", new Date().getUTCDate()], //UTC날짜를 기준으로 쿼리키 유효
    queryFn: fetchAuthors,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
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
          {data?.pages[0].data.map((data, index) => (
            <AuthorGrid key={index} authorData={data} />
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

export default AuthorGridContainer;
