import { getAccessToken } from "../util/cookie";

export const apiWithToken = <T>(url: string, body: T, method: string) => {
  const token = getAccessToken();
  const headers = new Headers({
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  });

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if (method.toUpperCase() !== "GET" && body !== undefined) {
    fetchOptions.body = JSON.stringify(body);
  }

  return fetch(url, fetchOptions);
};
