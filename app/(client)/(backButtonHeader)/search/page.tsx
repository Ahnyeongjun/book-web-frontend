import { Suspense } from "react";
import SearchBookGridContainer from "./components/SearchBookGridContainer";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import SearchHeaderHelper from "./components/SearchHeaderHelper";

const SearchPage = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
  const { query } = await searchParams;
  return (
    <main className="relative flex size-full flex-col items-center">
      <Suspense fallback={<LoadingSpinner />}>
        {query && (
          <>
            <SearchBookGridContainer query={query} />
            <SearchHeaderHelper query={query} />
          </>
        )}
      </Suspense>
    </main>
  );
};

export default SearchPage;
