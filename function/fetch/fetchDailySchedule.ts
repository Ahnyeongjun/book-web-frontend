import { PageResponseEventDto } from "@/types/dto";
import { BACKEND_URL } from "../config";
import fetchWithTimeout from "./fetchWithTimeout";

//캐싱 정책에따른 분리
const fetchDailySchedule = async () => {
  try {
    const response = await fetchWithTimeout(
      `${BACKEND_URL}/events`,
      {
        cache: "no-store",
      }
    );
    if (response.ok) {
      const result: PageResponseEventDto = await response.json();
      return result.items;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      const { mockEvents } = await import("@/mocks/data");
      return mockEvents;
    }
    return [];
  }
};

export default fetchDailySchedule;
