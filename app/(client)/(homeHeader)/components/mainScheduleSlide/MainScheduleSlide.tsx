import LoadingSpinner from "@/components/common/LoadingSpinner";
import fetchDailySchedule from "@/function/fetch/fetchDailySchedule";
import BackArrowIcon from "@/public/icons/backArrowIcon.svg";
import Link from "next/link";
import { HTMLAttributes, Suspense } from "react";
import PromotionContract from "../promotionContract/PromotionContract";
import MainScheduleSlideContainer from "./MainScheduleSlideContainer";

type Props = { className?: string } & HTMLAttributes<HTMLDivElement>;
const MainScheduleSlide = async ({ className, ...props }: Readonly<Props>) => {
  const dailySchedule = await fetchDailySchedule();
  return (
    <section
      className={`relative flex size-full flex-col pl-[var(--client-layout-margin)] pt-[var(--content-section-margin)] ${
        className || ""
      }`}
      {...props}
    >
      <div className="relative flex size-full flex-row items-center justify-between pr-[var(--client-layout-margin)]">
        <div>
          <h2 className="section-title mb-1">다가오는 일정</h2>
          <p className="section-sub-title mb-4">
            책을 좋아하는 당신을 위한 이벤트
          </p>
        </div>
        <Link
          className="flex size-fit items-center justify-center border-none bg-white px-4 text-sm text-[var(--sub-color)]"
          href="/schedule"
        >
          <p>view all</p> <BackArrowIcon className="size-5 rotate-180" />
        </Link>
      </div>
      <Suspense fallback={<LoadingSpinner className="w-full" />}>
        {dailySchedule && (
          <MainScheduleSlideContainer scheduleItems={dailySchedule} />
        )}
      </Suspense>
      <Link href="/schedule/contactUs" className="contents">
        <PromotionContract className="pr-[var(--client-layout-margin)]" />
      </Link>
    </section>
  );
};

export default MainScheduleSlide;
