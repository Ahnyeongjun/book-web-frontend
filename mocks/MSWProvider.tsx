"use client";

import { useEffect, useState, ReactNode } from "react";

export default function MSWProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function init() {
      if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
        const { initMocks } = await import("./index");
        await initMocks();
      }
      setIsReady(true);
    }
    init();
  }, []);

  if (!isReady) return null;

  return <>{children}</>;
}
