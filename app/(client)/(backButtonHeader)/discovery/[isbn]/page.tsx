import LoadingSpinner from "@/components/common/LoadingSpinner";
import React, { Suspense } from "react";

const DiscoveryDetailpage = () => {
  return (
    <main className="flex size-full flex-1 items-center gap-8">
      <Suspense fallback={<LoadingSpinner className="h-[50vw] w-full" />}></Suspense>
    </main>
  );
};

export default DiscoveryDetailpage;
