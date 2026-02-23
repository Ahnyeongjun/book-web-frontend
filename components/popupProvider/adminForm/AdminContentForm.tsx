"use client";
import CommonDropDown from "@/components/common/CommonDropDown";
import CommonInputField from "@/components/common/CommonInputField";
import CommonLabel from "@/components/common/CommonLabel";
import { usePreventEnterSubmit } from "@/components/hooks/usePreventEnterSubmit";
import { useToast } from "@/components/hooks/useToast";
import { usePopupAction } from "@/context/popupStore";
import { postContents } from "@/function/post/admin";
import CancleIcon from "@/public/icons/cancleIcon.svg";
import { ConentsPostRequest, ContentsCreateRequest } from "@/types/dto";
import { useRouter } from "next/navigation";
import { forwardRef, HTMLAttributes, useImperativeHandle, useRef } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";

type Props = {
  className?: string;
  defaultValues?: ContentsCreateRequest;
} & HTMLAttributes<HTMLDivElement>;

export type AdminContentFormRef = {
  handleSubmit: () => void;
};
const AdminContentForm = forwardRef<AdminContentFormRef, Props>(
  ({ className, defaultValues, ...props }, ref) => {
    const router = useRouter();
    const { showToast } = useToast();
    const isSubmittingRef = useRef(false);
    const { register, handleSubmit, control } = useForm<ContentsCreateRequest>({
      mode: "onSubmit",
      defaultValues: defaultValues || {
        urls: [{ url: "", type: "Video" }],
        bookIsbnList: [{ value: 0 }],
      },
    });
    const { closePopup } = usePopupAction();
    const {
      fields: urlFields,
      append: appendUrl,
      remove: removeUrl,
    } = useFieldArray({
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

    const onSubmitHandler = async (data: ContentsCreateRequest) => {
      if (isSubmittingRef.current) return;
      isSubmittingRef.current = true;
      const payload: ConentsPostRequest = {
        ...data,
        creatorId: 1, // 임시로 1로 설정, 실제 사용자 ID로 변경 필요
        bookIsbnList: data.bookIsbnList?.map((b) => b.value),
        tagList: data.tagList
          ? data.tagList.split(",").map((tag) => tag.trim())
          : [],
      };

      try {
        await postContents(payload);
        closePopup();
        showToast("success", "Successfully saved.");
        router.refresh();
      } catch (e) {
        showToast("error", "Your request failed. Please try again");
        console.log("Error submitting content:", e);
      } finally {
        isSubmittingRef.current = false;
      }
    };
    const handlePreventEnterSubmit = usePreventEnterSubmit();

    useImperativeHandle(
      ref,
      () => ({
        handleSubmit: handleSubmit(onSubmitHandler),
      }),
      [handleSubmit] // eslint-disable-line
    );

    return (
      <div
        className={`relative flex size-full flex-col ${className || ""}`}
        {...props}
      >
        <h2 className="flex justify-center text-sm font-semibold text-[var(--sub-color)]">
          Add Content
        </h2>
        <form
          className="relative flex size-full max-h-[80vh] flex-col gap-6 overflow-auto py-6"
          onSubmit={handleSubmit(onSubmitHandler)}
          onKeyDown={handlePreventEnterSubmit}
        >
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel>URL*</CommonLabel>
            {urlFields.map((field, index) => (
              <div
                className="relative flex h-fit w-full flex-row gap-1"
                key={field + String(index)}
              >
                <CommonInputField
                  placeholder="https://example.com"
                  type="url"
                  className="flex-[2]"
                  id={`url${index}`}
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
                      className="flex-1 text-sm font-medium text-[--sub-color]"
                      optionItems={["Video", "Article", "Podcast", "Link"]}
                    />
                  )}
                />
                <button
                  type="button"
                  onClick={() => removeUrl(index)}
                  className="p-1 text-sm font-semibold text-[var(--highlight-color)]"
                >
                  <CancleIcon className="size-5" />
                </button>
              </div>
            ))}
            <div className="relative flex size-full gap-2">
              <button
                type="button"
                onClick={() => appendUrl({ url: "", type: "Link" })}
                className="text-xs font-semibold text-[var(--sub-color)]"
              >
                + Add
              </button>
            </div>
          </div>
          <div className="relative flex size-full flex-col gap-3">
            <CommonLabel
              htmlFor="isbn"
              className="text-[var(--highlight-color)]"
            >
              Book ISBN Number*
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
                    required: "반드시 입력해야 합니다",
                    minLength: {
                      value: 10,
                      message: "10자리 이상 입력해야 합니다",
                    },
                    maxLength: {
                      value: 13,
                      message: "13자리 이하로 입력해야 합니다",
                    },
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
                onClick={() => appendIsbn({ value: 0 })}
                className="text-sm font-semibold text-[var(--sub-color)]"
              >
                + Add
              </button>
            </div>
          </div>
          <div>
            <CommonLabel htmlFor="title" className="text-[var(--sub-color)]">
              Content Title
            </CommonLabel>
            <CommonInputField id="title" {...register("title")} />
          </div>
          <div>
            <CommonLabel
              htmlFor="description"
              className="text-[var(--sub-color)]"
            >
              Book Name
            </CommonLabel>
            <CommonInputField id="description" {...register("description")} />
          </div>
          <div>
            <CommonLabel htmlFor="memo" className="text-[var(--sub-color)]">
              Memo
            </CommonLabel>
            <CommonInputField id="memo" {...register("memo")} />
          </div>
          <div>
            <CommonLabel htmlFor="tag" className="text-[var(--sub-color)]">
              Tag
            </CommonLabel>
            <CommonInputField id="tag" {...register("tagList")} />
          </div>
        </form>
      </div>
    );
  }
);

AdminContentForm.displayName = "AdminContentForm";
export default AdminContentForm;
