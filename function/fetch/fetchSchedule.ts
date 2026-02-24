import { PageResponseEventDto } from "@/types/dto";
import { BACKEND_URL } from "../config";

type Arguments = {
  limit: number;
  page: number;
  eventFlag: string;
  eventType: string;
  location: string;
  startDate: string;
  endDate: string;
};

const fetchSchedule = async ({
  limit,
  page,
  eventFlag,
  eventType,
  location,
  startDate,
  endDate,
}: Arguments) => {
  try {
    const queryParams = new URLSearchParams();

    if (limit) queryParams.append("limit", limit.toString());
    if (page) queryParams.append("page", page.toString());
    if (eventFlag) queryParams.append("eventFlag", eventFlag);
    if (eventType) queryParams.append("eventType", eventType);
    if (location) queryParams.append("location", location);
    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);

    const response = await fetch(
      `${BACKEND_URL}/events?${queryParams.toString()}`
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
  }
};

export default fetchSchedule;
