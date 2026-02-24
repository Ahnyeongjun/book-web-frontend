import { BACKEND_URL, ADMIN_URL } from "../config";

async function getServerMockData<T>(endpoint: string): Promise<T | null> {
  if (process.env.NEXT_PUBLIC_API_MOCKING !== "enabled") return null;
  const data = await import("@/mocks/data");
  const mockMap: Record<string, unknown> = {
    "/contents": data.mockPageResponseContentsDto,
    "/contents/discovery": data.mockListResponseContentsDto,
    "/books": data.mockPageResponseBookDto,
    "/books/recommended": data.mockListResponseRecommendedBookDto,
    "/events": data.mockPageResponseEventDto,
    "/publishers": data.mockPageResponsePublisherDto,
  };
  return (mockMap[endpoint] as T) ?? null;
}

export const getRequest = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`);
    if (!response.ok) throw new Error(`Failed to GET from ${endpoint}`);
    return (await response.json()) as T;
  } catch (error) {
    console.error(`Error GET ${endpoint}:`, error);
    const mockData = await getServerMockData<T>(endpoint);
    if (mockData) return mockData;
    throw error;
  }
};

export const getRequestForAdmin = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${ADMIN_URL}${endpoint}`);
    if (!response.ok) throw new Error(`Failed to GET from ${endpoint}`);
    return (await response.json()) as T;
  } catch (error) {
    console.error(`Error GET ${endpoint}:`, error);
    throw error;
  }
};
