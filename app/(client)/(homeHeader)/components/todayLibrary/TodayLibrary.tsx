import fetchTodayLibrary from "@/function/fetch/fetchTodayLibrary";
import { HTMLAttributes } from "react";
import SlideContainer from "./SlideContainer";

type Props = {
  className?: string;
} & HTMLAttributes<HTMLElement>;
const TodayLibrary = async ({ className, ...props }: Props) => {
  const todayLibrary = await fetchTodayLibrary();
  return (
    <section
      className={`relative h-fit w-full bg-gradient-to-r from-[#B0B5DF40] to-[#EEDBE040] px-[var(--client-layout-margin)] py-8 ${
        className || ""
      }`}
      {...props}
    >
      <div className="relative flex size-full flex-row items-center justify-between">
        <div>
          <h2 className="section-title mb-1">오늘의 서재</h2>
          <p className="section-sub-title mb-4">
            관심있는 책이나 출판사를 찾아보세요
          </p>
        </div>
      </div>
      {todayLibrary && (
        <SlideContainer todayLibrary={todayLibrary}></SlideContainer>
      )}
    </section>
  );
};

export default TodayLibrary;
