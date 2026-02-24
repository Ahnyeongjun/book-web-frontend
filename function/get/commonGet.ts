import { BACKEND_URL, ADMIN_URL } from "../config";

export const getRequest = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`);
    if (!response.ok) throw new Error(`Failed to GET from ${endpoint}`);
    return (await response.json()) as T;
  } catch (error) {
    console.error(`Error GET ${endpoint}:`, error);
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
