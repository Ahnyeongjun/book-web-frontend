"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import MSWProvider from "@/mocks/MSWProvider";

const Providers = ({ children }: Readonly<{ children: ReactNode }>) => {
  const queryClient = new QueryClient();
  return (
    <MSWProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MSWProvider>
  );
};

export default Providers;
