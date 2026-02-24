"use client";

import { useEffect, ReactNode } from "react";

export default function MSWProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    async function init() {
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        try {
          const { initMocks } = await import("./index");
          await initMocks();
        } catch (e) {
          console.warn("MSW client init failed:", e);
        }
      }
    }
    init();
  }, []);

  return <>{children}</>;
}
