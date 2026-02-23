import { MOCK_RECOMMENDS } from "@/public/data/mock_recommend";
import { HTMLAttributes } from "react";
import SlideContainer from "./SlideContainer";

type Props = {
  className?: string;
} & HTMLAttributes<HTMLElement>;
const TodayLibraryDemo = async ({ className, ...props }: Props) => {
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
      <SlideContainer
        todayLibrary={{ length: 7, items: MOCK_RECOMMENDS }}
      ></SlideContainer>
    </section>
  );
};

export default TodayLibraryDemo;
