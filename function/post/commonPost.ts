import { LoginProps, LoginResType } from "@/types/admin";
import { BACKEND_URL, ADMIN_URL } from "../config";

export const postRequest = async <T>(
  endpoint: string,
  bodyData: T
): Promise<unknown> => {
  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `Request failed with status ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error POST ${endpoint}:`, error);
    throw error;
  }
};

export const adminPostRequest = async <T>(
  endpoint: string,
  bodyData: T
): Promise<unknown> => {
  try {
    const response = await fetch(`${ADMIN_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      throw new Error(`Failed to POST to ${endpoint}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error POST ${endpoint}:`, error);
    throw error;
  }
};

export const postLogin = async (
  bodyData: LoginProps
): Promise<LoginResType> => {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });

    if (!response.ok) {
      throw new Error(`Failed to POST to login`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error POST login:`, error);
    throw error;
  }
};
