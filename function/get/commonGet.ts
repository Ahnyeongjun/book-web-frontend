export const getRequest = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}${endpoint}`
    );
    if (!response.ok) throw new Error(`Failed to GET from ${endpoint}`);
    return (await response.json()) as T;
  } catch (error) {
    console.error(`Error GET ${endpoint}:`, error);
    throw error;
  }
};

export const getRequestForAdmin = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_ADMIN_URL}${endpoint}`
    );
    if (!response.ok) throw new Error(`Failed to GET from ${endpoint}`);
    return (await response.json()) as T;
  } catch (error) {
    console.error(`Error GET ${endpoint}:`, error);
    throw error;
  }
};
