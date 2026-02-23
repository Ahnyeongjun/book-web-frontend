import { useCallback } from "react";

export const usePreventEnterSubmit = () => {
  return useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const tagName = (e.target as HTMLElement).tagName;
      if (tagName === "INPUT") {
        e.preventDefault();
      }
    }
  }, []);
};
