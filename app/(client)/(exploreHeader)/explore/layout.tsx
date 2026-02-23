import ExploreHeader from "@/app/(client)/(exploreHeader)/explore/components/exploreHeader/ExploreHeader";
import React, { ReactNode } from "react";

const layout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <ExploreHeader />
      <div className="overflow-hidden">{children}</div>
    </>
  );
};

export default layout;
