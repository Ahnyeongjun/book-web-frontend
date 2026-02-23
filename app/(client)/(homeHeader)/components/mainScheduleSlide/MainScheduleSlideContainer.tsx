"use client";
import ScheduleItem from "@/components/scheduleItem/ScheduleItem";
import ArrowHeadIcon from "@/public/icons/arrowHeadIcon.svg";
import { EventDto } from "@/types/dto";
import { HTMLAttributes, useRef } from "react";

type Props = {
  className?: string;
  scheduleItems: EventDto[];
} & HTMLAttributes<HTMLDivElement>;

const MainScheduleSlideContainer = ({
  className,
  scheduleItems,
  ...props
}: Readonly<Props>) => {
  const SliderRef = useRef<HTMLDivElement>(null);

  return (
    <div className={`group relative size-full ${className || ""}`} {...props}>
      <ArrowHeadIcon
        className="absolute left-0 top-1/2 z-10 size-5 -translate-y-1/2 cursor-pointer text-[var(--sub-color)] opacity-0 transition-opacity group-hover:opacity-100"
        onClick={() =>
          SliderRef.current?.scrollBy({
            left: -SliderRef.current.offsetWidth / scheduleItems.length,
            behavior: "smooth",
          })
        }
      />
      <div
        className="scrollbar-hide relative flex size-full snap-x snap-mandatory flex-row gap-2 overflow-x-scroll pr-[var(--client-layout-margin)]"
        ref={SliderRef}
      >
        {scheduleItems.map((item, index) => (
          <ScheduleItem
            key={index}
            className="snap-center"
            typeName={item.eventType}
            title={item.title}
            host={item.host}
            startDate={new Date(item.startDate)}
            endDate={new Date(item.endDate)}
          />
        ))}
      </div>
      <ArrowHeadIcon
        className="absolute right-0 top-1/2 z-10 mr-[var(--client-layout-margin)] size-5 -translate-y-1/2 rotate-180 cursor-pointer text-[var(--sub-color)] opacity-0 transition-opacity group-hover:opacity-100"
        onClick={() =>
          SliderRef.current?.scrollBy({
            left: SliderRef.current.offsetWidth / scheduleItems.length,
            behavior: "smooth",
          })
        }
      />
    </div>
  );
};

export default MainScheduleSlideContainer;
