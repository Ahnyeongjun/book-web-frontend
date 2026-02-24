import { ListResponseRecommendedBookDto } from "@/types/dto";
import { BACKEND_URL } from "../config";
import fetchWithTimeout from "./fetchWithTimeout";

const fetchTodayLibrary = async (): Promise<
  ListResponseRecommendedBookDto | undefined
> => {
  try {
    const response = await fetchWithTimeout(
      BACKEND_URL + "/books/recommended",
      {
        cache: "no-store",
      }
    );
    if (response.ok) {
      const result: ListResponseRecommendedBookDto = await response.json();
      return result;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      const { mockListResponseRecommendedBookDto } = await import("@/mocks/data");
      return mockListResponseRecommendedBookDto;
    }
    return { items: [], length: 0 };
  }
};

export default fetchTodayLibrary;
