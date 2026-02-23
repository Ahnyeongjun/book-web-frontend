import { ContentsDto, ListResponseContentsDto } from "@/types/dto";
import fetchWithTimeout from "./fetchWithTimeout";

const fetchDailyDiscovery = async (): Promise<ContentsDto[]> => {
  try {
    const response = await fetchWithTimeout(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/contents/discovery",
      {
        next: { revalidate: 86400, tags: ["daily-discovery"] },
      }
    );
    if (response.ok) {
      const result: ListResponseContentsDto = await response.json();
      return result.items || [];
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
export default fetchDailyDiscovery;
