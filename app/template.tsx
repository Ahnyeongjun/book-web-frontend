"use client";

import { useUserStoreAction } from "@/context/userStore";
import { useEffect } from "react";

const RootTemplate = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { loadUserId } = useUserStoreAction();
  useEffect(() => {
    loadUserId();
  }, [loadUserId]);
  return <>{children}</>;
};

export default RootTemplate;
