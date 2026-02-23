import LoadingSpinner from "@/components/common/LoadingSpinner";
import { Suspense } from "react";
import BirthDayBookGridContainer from "./components/BirthDayBookGridContainer";
import BirthDayHeaderHelper from "./components/BirthDayHeaderHelper";
const BirthDayDetail = () => {
  return (
    <main className="relative flex size-full flex-col items-center">
      <Suspense fallback={<LoadingSpinner className="h-[50vh] w-full" />}>
        <BirthDayHeaderHelper />
        <BirthDayBookGridContainer />
      </Suspense>
    </main>
  );
};

export default BirthDayDetail;
