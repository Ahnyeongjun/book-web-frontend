import LoadingSpinner from "@/components/common/LoadingSpinner";

const BirthDayBookGridContainer = () => {
  // const nextPageButtonRef = useRef<HTMLButtonElement>(null);
  // const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
  //   queryKey: ["birthDayBook", new Date().getUTCDate()], //UTC날짜를 기준으로 쿼리키 유효
  //   queryFn: fetchBirthdayBooks,
  //   initialPageParam: false,
  //   getNextPageParam: (lastPage) => lastPage?.hasNext,
  //   staleTime: 24 * 60 * 60 * 1000,
  // });

  // useEffect(() => {
  //   const observer = new IntersectionObserver((entries) => {
  //     const target = entries[0];
  //     if (target.isIntersecting && hasNextPage) {
  //       fetchNextPage();
  //     }
  //   });
  //   if (nextPageButtonRef.current) {
  //     observer.observe(nextPageButtonRef.current);
  //   }
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, [fetchNextPage, hasNextPage]);

  return (
    <>
      {/* {!isLoading ? (
        <>
          {data?.pages.map((page, index) => (
            <BookGrid
              key={index}
              books={page?.items || []}
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
      )} */}
      <LoadingSpinner className="h-[50vh] w-full" />
    </>
  );
};

export default BirthDayBookGridContainer;
