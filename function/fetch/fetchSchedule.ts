import { PageResponseEventDto } from "@/types/dto";

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
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/events?${queryParams.toString()}`
    );
    if (response.ok) {
      const result: PageResponseEventDto = await response.json();
      return result.items;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export default fetchSchedule;
