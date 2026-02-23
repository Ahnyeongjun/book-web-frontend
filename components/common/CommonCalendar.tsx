import DropdownArrow from "@/public/icons/dropdownArrow.svg";
import { format } from "date-fns";
import { useState } from "react";
interface CommonCalendarProps {
  onDateChange?: (range: { start: Date; end: Date }) => void;
}

const CommonCalendar = ({ onDateChange }: CommonCalendarProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [viewYear, setViewYear] = useState<number>(2025);
  const [viewMonth, setViewMonth] = useState<number>(5); // 0-indexed (9월은 8)

  const initDate = () => {
    setStartDate(null);
    setEndDate(null);
  };
  const setSameDate = (date: Date | null) => {
    setStartDate(date);
    setEndDate(date);
  };

  const sameDay = (a: Date | null, b: Date | null) =>
    !!a &&
    !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const handleDateClick = (date: Date | null) => {
    if (!date) return;
    if (!startDate && !endDate) {
      setSameDate(date);
    } else if (startDate && endDate) {
      if (sameDay(date, endDate)) setEndDate(null);
      else if (sameDay(date, startDate)) initDate();
      else if (date < startDate) setSameDate(date);
      else {
        setEndDate(date);
      }
    } else if (startDate && !endDate) {
      if (date < startDate) setSameDate(date);
      else if (sameDay(date, startDate)) initDate();
      else {
        setEndDate(date);
      }
    }
    // After updating state, call onDateChange if both startDate and endDate are set
    setTimeout(() => {
      if (startDate && endDate && onDateChange) {
        onDateChange({ start: startDate, end: endDate });
      }
    }, 0);
  };

  function isSelected(date: Date | null) {
    if (!date || !startDate) return false;
    if (!endDate) return sameDay(date, startDate);
    return date >= startDate && date <= endDate;
  }

  return (
    <div className="flex size-full flex-col gap-2.5 text-sm text-zinc-500">
      <div className="flex items-center gap-2">
        <input
          className="h-[52px] w-full rounded-[10px] border px-4 py-[5px] text-base focus:border-[#5F69BE] focus:outline-none"
          readOnly
          value={
            startDate === null ? "YYYY/MM/DD" : format(startDate, "yyyy/MM/dd")
          }
        />
        <span className="text-sm font-semibold text-[#5F69BE]">~</span>
        <input
          className="h-[52px] w-full rounded-[10px] border px-4 py-[5px] text-base focus:border-[#5F69BE] focus:outline-none"
          readOnly
          value={
            endDate === null ? "YYYY/MM/DD" : format(endDate, "yyyy/MM/dd")
          }
        />
      </div>

      <div className="mb-5 flex size-full items-center gap-2">
        <div className="relative h-[54px] w-full flex-1">
          <select
            value={viewYear}
            className="size-full appearance-none rounded-[10px] border pl-4 pr-2 focus:outline-none"
            onChange={(e) => setViewYear(Number(e.target.value))}
          >
            {Array.from({ length: 11 }, (_, i) => 2020 + i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-6">
            <DropdownArrow />
          </div>
        </div>
        <div className="relative h-[54px] w-full flex-1 ">
          <select
            value={viewMonth}
            className="size-full appearance-none rounded-[10px] border pl-4 pr-2 focus:outline-none"
            onChange={(e) => setViewMonth(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {String(i + 1).padStart(2, "0")}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-6">
            <DropdownArrow />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-7 ">
        {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
          <div key={day} className="h-5 text-center text-sm font-medium">
            {day}
          </div>
        ))}
        {getCalendarDays(viewYear, viewMonth).map((date, idx) => (
          <div
            className="px-auto flex h-[46px] items-center justify-center"
            key={idx}
            onClick={() => handleDateClick(date)}
          >
            <div
              className={`flex size-8 cursor-pointer items-center justify-center ${
                isSelected(date) ? "rounded-full bg-[#5F69BE] text-white" : ""
              }`}
            >
              {date ? date.getDate() : ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonCalendar;

export const getCalendarDays = (
  year: number,
  month: number
): (Date | null)[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days = [];
  const start = firstDay.getDay();
  const totalDays = lastDay.getDate();

  for (let i = 0; i < start; i++) days.push(null);
  for (let i = 1; i <= totalDays; i++) {
    days.push(new Date(year, month, i));
  }

  return days;
};
