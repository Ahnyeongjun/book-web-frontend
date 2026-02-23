import React from "react";
import ScheduleHeaderHelper from "./components/ScheduleHeaderHelper";
import SchedulePageDataProvider from "./components/SchedulePageDataProvider";
import ScheduleItem from "@/components/scheduleItem/ScheduleItem";
import ScheduleFilterController from "./components/scheduleFilterController/ScheduleFilterController";

const SchedulePage = () => {
  return (
    <main className="relative flex flex-1 flex-col overflow-hidden">
      <SchedulePageDataProvider initialData={{}}>
        <ScheduleHeaderHelper />
        <ScheduleFilterController />
        <div className="mt-14 flex flex-col gap-3 p-[--client-layout-margin] pt-0">
          <ScheduleDataContainer />
        </div>
      </SchedulePageDataProvider>
    </main>
  );
};

export default SchedulePage;

const ScheduleDataContainer = () => {
  return [...new Array(12)].map((_item, index) => <ScheduleItem key={index} className="h-fit w-full"></ScheduleItem>);
};
