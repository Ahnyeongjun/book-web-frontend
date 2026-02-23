"use client";
import CommonCalendar from "@/components/common/CommonCalendar";
import CommonDropDown from "@/components/common/CommonDropDown";
import CommonInputField from "@/components/common/CommonInputField";
import CommonLabel from "@/components/common/CommonLabel";
import CommonSelectBox from "@/components/common/CommonSelectBox";
import CommonToggleSwitch from "@/components/common/CommonToggleSwitch";
import { usePreventEnterSubmit } from "@/components/hooks/usePreventEnterSubmit";
import { usePopupAction } from "@/context/popupStore";
import { validateOptionalIsbnLength } from "@/function/common";
import { postEvents } from "@/function/post/admin";
import CancleIcon from "@/public/icons/cancleIcon.svg";
import { EventCreateRequest, EventPostRequest } from "@/types/dto";
import { useRouter } from "next/navigation";
import {
  forwardRef,
  HTMLAttributes,
  useEffect,
  useImperativeHandle,
} from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

type Props = {
  className?: string;
  defaultValues?: EventCreateRequest;
} & HTMLAttributes<HTMLDivElement>;

export type AdminEventFormRef = {
  handleSubmit: () => void;
};
const AdminEventForm = forwardRef<AdminEventFormRef, Props>(
  ({ className, defaultValues, ...props }, ref) => {
    const router = useRouter();
    const { register, handleSubmit, control, setValue, watch } =
      useForm<EventCreateRequest>({
        mode: "onSubmit",
        defaultValues: defaultValues
          ? {
              ...defaultValues,
            }
          : {
              isPosting: false,
              location: "ONLINE",
              userId: 1,
              urls: [{ url: "", type: "Link" }],
              bookIsbnList: [{ value: 0 }],
            },
      });
    const { closePopup } = usePopupAction();

    const { fields, append, remove } = useFieldArray({
      control,
      name: "urls",
    });

    const {
      fields: isbnFields,
      append: appendIsbn,
      remove: removeIsbn,
    } = useFieldArray({
      control,
      name: "bookIsbnList",
    });

    const onSubmitHandler = async (data: EventCreateRequest) => {
      const { dateRange, ...rest } = data;
      const payload: EventPostRequest = {
        ...rest,
        bookIsbnList: data.bookIsbnList?.map((b) => b.value),
        tagList: data.tagList
          ? data.tagList.split(",").map((tag) => tag.trim())
          : [],
        startDate: dateRange?.start || "",
        endDate: dateRange?.end || "",
      };
      await postEvents(payload);
      router.refresh();
      closePopup();
    };

    const startDate = watch("startDate");
    const handlePreventEnterSubmit = usePreventEnterSubmit();

    useEffect(() => {
      if (startDate) {
        setValue("endDate", startDate);
      }
    }, [startDate, setValue]);

    useImperativeHandle(
      ref,
      () => ({
        handleSubmit: () =>
          handleSubmit(onSubmitHandler, (errors) => {
            console.warn("❌ 유효성 검사 실패", errors);
          })(),
      }),
      [handleSubmit] // eslint-disable-line
    );

    return (
      <div
        className={`relative flex size-full flex-col ${className || ""}`}
        {...props}
      >
        <h2 className="flex justify-center text-sm font-semibold text-[var(--sub-color)]">
          Add Event
        </h2>
        <form
          className="relative flex size-full max-h-[80vh] flex-col gap-6 overflow-auto py-6"
          onSubmit={handleSubmit(onSubmitHandler)}
          onKeyDown={handlePreventEnterSubmit}
        >
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel>URL*</CommonLabel>
            {fields.map((_field, index) => (
              <div
                className="relative flex h-fit w-full flex-row gap-1"
                key={index}
              >
                <CommonInputField
                  placeholder="https://example.com"
                  type="urls"
                  className="flex-[2]"
                  id={`urls${index}`}
                  {...register(`urls.${index}.url`, {
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
                      className="flex-1"
                      optionItems={["Link", "Form"]}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-1 text-sm font-semibold text-[var(--highlight-color)]"
                >
                  <CancleIcon className="size-5" />
                </button>
              </div>
            ))}
            <div className="relative flex size-full gap-2">
              <button
                type="button"
                onClick={() => append({ url: "", type: "Link" })}
                className="text-sm font-semibold text-[var(--sub-color)]"
              >
                + Add
              </button>
            </div>
          </div>
          <div className="relative flex size-full flex-col gap-2">
            <CommonLabel htmlFor="title">Event Title*</CommonLabel>
            <CommonInputField
              id="title"
              {...register("title", { required: "입력이 필요합니다" })}
            />
          </div>
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel htmlFor="host">Event Host*</CommonLabel>
            <CommonInputField
              id="host"
              {...register("host", { required: "입력이 필요합니다" })}
            />
          </div>
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel className="font-semibold">Date/Duration*</CommonLabel>
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
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel
              htmlFor="location"
              className="text-[var(--highlight-color)]"
            >
              Location*
            </CommonLabel>
            <Controller
              name={`location`}
              control={control}
              rules={{ required: "입력이 필요합니다" }}
              render={({ field }) => (
                <CommonDropDown
                  {...field}
                  className="flex-1 text-sm font-medium"
                  optionItems={["ONLINE", "OFFLINE", "ONLINE/OFFLINE"]}
                />
              )}
            />
          </div>
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel
              htmlFor="eventType"
              className="text-[var(--highlight-color)]"
            >
              Event Type*
            </CommonLabel>
            <CommonInputField id="eventType" {...register("eventType")} />
          </div>
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel
              htmlFor="eventFlag"
              className="text-[var(--highlight-color)]"
            >
              Event Flag*
            </CommonLabel>
            <CommonSelectBox
              optionItems={["SOLO", "GROUP", "ETC"]}
              className="flex-1"
              {...register(`eventFlag`, { required: "입력이 필요합니다" })}
            />
          </div>
          <div className="relative flex size-full flex-row">
            <CommonLabel
              htmlFor="isPosting"
              className="text-[var(--highlight-color)]"
            >
              Posting on/off*
            </CommonLabel>
            <Controller
              name="isPosting"
              control={control}
              rules={{ required: "입력이 필요합니다" }}
              render={({ field: { value, onChange } }) => (
                <CommonToggleSwitch
                  className="h-5 w-10"
                  checked={value}
                  onChange={onChange}
                />
              )}
            />
          </div>
          <div className="relative flex size-full flex-row border-b-[1px]"></div>

          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel htmlFor="isbn" className="text-[var(--sub-color)]">
              Book ISBN Number
            </CommonLabel>
            {isbnFields.map((field, index) => (
              <div
                className="relative flex h-fit w-full flex-row gap-1"
                key={field + String(index)}
              >
                <CommonInputField
                  type="number"
                  id={`isbn${index}`}
                  {...register(`bookIsbnList.${index}.value`, {
                    validate: validateOptionalIsbnLength,
                  })}
                />
                <button
                  type="button"
                  onClick={() => removeIsbn(index)}
                  className="p-1 text-sm font-semibold text-[var(--highlight-color)]"
                >
                  <CancleIcon className="size-5" />
                </button>
              </div>
            ))}
            <div className="relative flex size-full gap-2">
              <button
                type="button"
                onClick={() => appendIsbn({ value: 0 })}
                className="text-sm font-semibold text-[var(--sub-color)]"
              >
                + Add
              </button>
            </div>
          </div>
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel
              htmlFor="bookTitle"
              className="text-[var(--sub-color)]"
            >
              Book Name
            </CommonLabel>
            <CommonInputField id="bookTitle" {...register("bookTitle")} />
          </div>
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel
              htmlFor="senderName"
              className="text-[var(--sub-color)]"
            >
              Sender Name
            </CommonLabel>
            <CommonInputField id="senderName" {...register("senderName")} />
          </div>
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel
              htmlFor="senderEmail"
              className="text-[var(--sub-color)]"
            >
              Sender Email
            </CommonLabel>
            <CommonInputField id="senderEmail" {...register("senderEmail")} />
          </div>
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel
              htmlFor="senderMessage"
              className="text-[var(--sub-color)]"
            >
              Sender Message
            </CommonLabel>
            <CommonInputField
              id="senderMessage"
              {...register("senderMessage")}
            />
          </div>
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel htmlFor="memo" className="text-[var(--sub-color)]">
              Memo
            </CommonLabel>
            <CommonInputField id="memo" {...register("memo")} />
          </div>
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel htmlFor="tagList" className="text-[var(--sub-color)]">
              Tag
            </CommonLabel>
            <CommonInputField id="tagList" {...register("tagList")} />
          </div>
        </form>
      </div>
    );
  }
);

AdminEventForm.displayName = "AdminContentForm";
export default AdminEventForm;
