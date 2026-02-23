import React, { Fragment } from "react";
import DiscoveryHeaderHelper from "./components/DiscoveryHeaderHelper";
import DiscoveryPageDataProvider from "./components/DiscoveryPageDataProvider";
import DiscoveryFilterController from "./components/discoveryFilterController/DiscoveryFilterController";
import DiscoveryItem from "@/components/discovery/DiscoveryItem";

const discoveryPage = () => {
  return (
    <main className="relative flex flex-col items-center overflow-hidden">
      <DiscoveryHeaderHelper />
      <DiscoveryPageDataProvider initialData={{}}>
        <DiscoveryFilterController />
        <ul className="mt-14 w-full px-[var(--client-layout-margin)]">
          <DiscoveryDataContainer />
        </ul>
      </DiscoveryPageDataProvider>
    </main>
  );
};

export default discoveryPage;

const DiscoveryDataContainer = () => {
  return [...new Array(12)].map((_item, index) => (
    <Fragment key={index}>
      <DiscoveryItem key={index} className="h-fit w-full" contentType="타입" title="제목" imageUrl="" />
      {index < [...new Array(12)].length - 1 && <div className="border-b" />}
    </Fragment>
  ));
};
