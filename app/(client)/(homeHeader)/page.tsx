import LoadingSpinner from "@/components/common/LoadingSpinner";
import Discovery from "@/components/discovery/Discovery";
import { Suspense } from "react";
import MainBookSlide from "./components/mainBookSlide/MainBookSlide";
import MainScheduleSlide from "./components/mainScheduleSlide/MainScheduleSlide";
import TodayLibraryDemo from "./components/todayLibrary/TodayLibraryDemo";
export const dynamic = "force-dynamic";

const Home = () => {
  return (
    <main className="relative flex size-full flex-col items-center py-5">
      <MainBookSlide className="mb-12" />
      <Suspense fallback={<LoadingSpinner className="w-full" />}>
        <Discovery />
      </Suspense>
      <Suspense fallback={<LoadingSpinner className="w-full" />}>
        <TodayLibraryDemo />
      </Suspense>
      <MainScheduleSlide />
    </main>
  );
};

export default Home;
