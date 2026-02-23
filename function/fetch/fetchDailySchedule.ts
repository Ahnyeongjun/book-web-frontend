import { PageResponseEventDto } from "@/types/dto";
import fetchWithTimeout from "./fetchWithTimeout";

//캐싱 정책에따른 분리
const fetchDailySchedule = async () => {
  try {
    const response = await fetchWithTimeout(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/events`,
      {
        next: { revalidate: 86400, tags: ["daily-schedule"] },
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
    return [];
  }
};

export default fetchDailySchedule;
