"use client";
import CommonDropDown from "@/components/common/CommonDropDown";
import CommonInputField from "@/components/common/CommonInputField";
import CommonLabel from "@/components/common/CommonLabel";
import CancleIcon from "@/public/icons/cancleIcon.svg";

import CommonCalendar from "@/components/common/CommonCalendar";
import CommonSubmitButton from "@/components/common/CommonSubmitButton";
import { usePopupAction } from "@/context/popupStore";
import {
  forwardRef,
  HTMLAttributes,
  useEffect,
  useImperativeHandle,
} from "react";
import {
  Controller,
  FieldValues,
  useFieldArray,
  useForm,
} from "react-hook-form";

type Props = {
  className?: string;
  defaultValues?: EventPromotionFormTypes;
} & HTMLAttributes<HTMLDivElement>;

export type EventPromotionFormTypes = {
  urls: { value: string; type: "링크" | "구글폼" }[];
  eventTitle: string;
  eventHost?: string;
  startDate: Date | string;
  endDate: Date | string;
  location?: "Online" | "Offline" | "Online/Offline";
  eventType?: string;
  bookName?: string;
  senderName?: string;
  senderEmail?: string;
  senderMessage?: string;
  dateRange?: { start: string; end: string };
};
export type AdminEventFormRef = {
  handleSubmit: () => void;
};
const EventPromotionForm = forwardRef<AdminEventFormRef, Props>(
  ({ className, defaultValues, ...props }, ref) => {
    console.log(defaultValues?.startDate);
    const { register, handleSubmit, control, setValue, watch } =
      useForm<EventPromotionFormTypes>({
        mode: "onSubmit",
        defaultValues: defaultValues
          ? {
              ...defaultValues,
              startDate: new Date(defaultValues.startDate)
                .toISOString()
                .split("T")[0],
              endDate: new Date(defaultValues.endDate)
                .toISOString()
                .split("T")[0],
            }
          : {
              urls: [{ value: "", type: "링크" }],
            },
      });
    const {
      fields: urlFields,
      append: appendUrl,
      remove: removeUrl,
    } = useFieldArray({
      control,
      name: "urls",
    });
    const { closePopup } = usePopupAction();

    const onSubmitHandler = (data: FieldValues) => {
      console.log(data);
      closePopup();
    };
    const onErrorHandler = (data: FieldValues) => {
      console.log(data);
    };

    //시작일 설정시 자동으로 종료일이 설정되도록
    const startDate = watch("startDate");
    useEffect(() => {
      if (startDate) {
        setValue("endDate", startDate);
      }
    }, [startDate, setValue]);

    useImperativeHandle(
      ref,
      () => ({
        handleSubmit: handleSubmit(onSubmitHandler, onErrorHandler),
      }),
      [handleSubmit] // eslint-disable-line
    );

    return (
      <div
        className={`relative flex size-full flex-col ${className || ""}`}
        {...props}
      >
        <form
          className="relative flex size-full max-h-[80vh] flex-col gap-9 overflow-auto px-[var(--client-layout-margin)] py-6"
          onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}
        >
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel htmlFor="eventTitle">
              <div className="flex gap-0.5 font-bold">
                이벤트 명 <div className="text-[#FF2C6CFF]">*</div>{" "}
              </div>
            </CommonLabel>
            <CommonInputField
              placeholder="ex) 아름드리 서평단 모집"
              type="url"
              className="flex-[2] py-3"
              id="eventTitle"
              {...register("eventTitle", { required: "입력이 필요합니다" })}
            />
          </div>
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel htmlFor="eventLink">
              <div className="flex gap-0.5 font-bold">
                링크 첨부 <div className="text-[#FF2C6CFF]">*</div>{" "}
              </div>
            </CommonLabel>
            {urlFields.map((_field, index) => (
              <div
                className="relative flex h-fit w-full flex-row gap-1"
                key={index}
              >
                <CommonInputField
                  placeholder="https://example.com"
                  type="url"
                  className="flex-[2] py-3"
                  id={`url${index}`}
                  {...register(`urls.${index}.value`, {
                    required: "입력이 필요합니다",
                  })}
                />
                <Controller
                  name={`urls.${index}.type`}
                  control={control}
                  rules={{ required: "입력이 필요합니다" }}
                  render={({ field }) => (
                    <CommonDropDown
                      {...field}
                      className="flex-1 py-0.5"
                      optionItems={["링크", "구글폼"]}
                    />
                  )}
                />
                <div
                  onClick={() => removeUrl(index)}
                  className="p-1 font-semibold text-[var(--highlight-color)]"
                >
                  <CancleIcon className="size-5" />
                </div>
              </div>
            ))}
            <div className="relative flex size-full flex-row gap-2">
              <button
                onClick={() => appendUrl({ value: "", type: "링크" })}
                className="text-[13px] font-bold text-[var(--highlight-color)]"
              >
                + 링크 추가
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <CommonLabel
              htmlFor="eventHost"
              className="text-[var(--sub-color)]"
            >
              이벤트 주최 측
            </CommonLabel>
            <CommonInputField
              id="eventHost"
              className="py-3"
              {...register("eventHost", { required: "입력이 필요합니다" })}
            />
          </div>
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel
              htmlFor="startDate"
              className="text-[var(--sub-color)]"
            >
              참여자 모집 기간
            </CommonLabel>
            <Controller
              name="dateRange"
              control={control}
              rules={{ required: "날짜를 선택하세요" }}
              render={({ field: { onChange } }) => (
                <CommonCalendar
                  onDateChange={({ start, end }) => {
                    const startStr = start.toISOString().split("T")[0];
                    const endStr = end.toISOString().split("T")[0];
                    onChange({ start: startStr, end: endStr });
                    setValue("startDate", startStr);
                    setValue("endDate", endStr);
                  }}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-3">
            <CommonLabel
              htmlFor="eventType"
              className="text-[var(--sub-color)]"
            >
              이벤트 타입
            </CommonLabel>
            <CommonInputField
              id="eventType"
              className="py-3"
              {...register("eventType", { required: "입력이 필요합니다" })}
            />
          </div>
          <div className="flex flex-col gap-3">
            <CommonLabel htmlFor="location" className="text-[var(--sub-color)]">
              온라인/오프라인
            </CommonLabel>
            <Controller
              name={`location`}
              control={control}
              rules={{ required: "입력이 필요합니다" }}
              render={({ field }) => (
                <CommonDropDown
                  {...field}
                  className="flex-1 py-1"
                  optionItems={["온라인", "오프라인", "온라인/오프라인"]}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-3">
            <CommonLabel htmlFor="bookName" className="text-[var(--sub-color)]">
              이벤트 도서명
            </CommonLabel>
            <CommonInputField
              id="bookName"
              {...register("bookName")}
              className="py-3"
            />
          </div>
          <div className="flex flex-col gap-3">
            <CommonLabel
              htmlFor="senderName"
              className="text-[var(--sub-color)]"
            >
              문의자 성함
            </CommonLabel>
            <CommonInputField
              id="senderName"
              className="py-3"
              {...register("senderName")}
            />
          </div>
          <div className="flex flex-col gap-3">
            <CommonLabel
              htmlFor="senderEmail"
              className="text-[var(--sub-color)]"
            >
              문의자 이메일
            </CommonLabel>
            <CommonInputField
              id="senderEmail"
              className="py-3"
              {...register("senderEmail")}
            />
          </div>
          <div className="flex flex-col gap-3">
            <CommonLabel
              htmlFor="senderMessage"
              className="text-[var(--sub-color)]"
            >
              전하고 싶은 말
            </CommonLabel>
            <CommonInputField
              className="py-3"
              id="senderMessage"
              {...register("senderMessage")}
            />
          </div>
          <CommonSubmitButton>제출하기</CommonSubmitButton>
        </form>
      </div>
    );
  }
);

EventPromotionForm.displayName = "EventPromotionForm";
export default EventPromotionForm;
