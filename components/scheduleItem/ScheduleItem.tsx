import React, { HTMLAttributes } from "react";
import CalendarIcon from "@/public/icons/calendarIcon.svg";
import { formatDateToKorean } from "@/function/common";

export type ScheduleItemProps = {
  className?: string;
  typeName?: string;
  title?: string;
  host?: string;
  startDate?: Date;
  endDate?: Date;
} & HTMLAttributes<HTMLDivElement>;
const ScheduleItem = ({
  className,
  typeName,
  title,
  host,
  startDate,
  endDate,
  ...props
}: Readonly<ScheduleItemProps>) => {
  return (
    <aside className={`relative flex min-w-fit flex-col gap-1 rounded-2xl border p-6 ${className || ""}`} {...props}>
      <p className="text-sm font-bold text-[var(--highlight-color)]">{typeName ?? "타입"}</p>
      <h3 className="font-semibold">{title ?? "제목"}</h3>
      <p className="text-xs text-[var(--sub-color)]">{host ?? "출판사"}</p>
      <span className="flex size-full flex-row gap-1">
        <CalendarIcon className="w-3" />
        <p className="relative size-fit text-xs">
          {formatDateToKorean(startDate ?? new Date())}-{formatDateToKorean(endDate ?? new Date())}
        </p>
      </span>
    </aside>
  );
};

export default ScheduleItem;
