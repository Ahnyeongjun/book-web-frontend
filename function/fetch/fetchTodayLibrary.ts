import { ListResponseRecommendedBookDto } from "@/types/dto";
import fetchWithTimeout from "./fetchWithTimeout";

const fetchTodayLibrary = async (): Promise<
  ListResponseRecommendedBookDto | undefined
> => {
  try {
    const response = await fetchWithTimeout(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/books/recommended",
      {
        next: { revalidate: 86400, tags: ["today-library"] },
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
    return { items: [], length: 0 };
  }
};

export default fetchTodayLibrary;
