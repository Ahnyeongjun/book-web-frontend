import { ContentsDto, ListResponseContentsDto } from "@/types/dto";
import { BACKEND_URL } from "../config";
import fetchWithTimeout from "./fetchWithTimeout";

const fetchDailyDiscovery = async (): Promise<ContentsDto[]> => {
  try {
    const response = await fetchWithTimeout(
      BACKEND_URL + "/contents/discovery",
      {
        cache: "no-store",
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
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      const { mockListResponseContentsDto } = await import("@/mocks/data");
      return mockListResponseContentsDto.items || [];
    }
    return [];
  }
};
export default fetchDailyDiscovery;
