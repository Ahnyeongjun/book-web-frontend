"use client";
import CommonInputField from "@/components/common/CommonInputField";
import CommonLabel from "@/components/common/CommonLabel";
import { usePreventEnterSubmit } from "@/components/hooks/usePreventEnterSubmit";
import { usePopupAction } from "@/context/popupStore";
import { postContacts } from "@/function/post/admin";
import { ContactDto } from "@/types/dto";
import { useRouter } from "next/navigation";
import { forwardRef, HTMLAttributes, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";

type Props = {
  className?: string;
  defaultValues?: ContactDto;
} & HTMLAttributes<HTMLDivElement>;

export type AdminInquiryFormRef = {
  handleSubmit: () => void;
};

const AdminInquiryForm = forwardRef<AdminInquiryFormRef, Props>(
  ({ className, defaultValues, ...props }, ref) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<ContactDto>({
      mode: "onSubmit",
      defaultValues: defaultValues,
    });
    const { closePopup } = usePopupAction();

    const onSubmitHandler = async (data: ContactDto) => {
      await postContacts(data);
      closePopup();
      router.refresh();
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
          기타 문의
        </h2>
        <form
          className="relative flex size-full max-h-[80vh] flex-col gap-6 overflow-auto py-6"
          onSubmit={handleSubmit(onSubmitHandler)}
          onKeyDown={handlePreventEnterSubmit}
        >
          <div className="flex flex-col gap-3">
            <CommonLabel
              htmlFor="name"
              className="text-[var(--highlight-color)]"
            >
              문의자 성함
            </CommonLabel>
            <CommonInputField id="name" {...register("name")} />
          </div>
          <div className="flex flex-col gap-3">
            <CommonLabel
              htmlFor="email"
              className="text-[var(--highlight-color)]"
            >
              문의자 이메일
            </CommonLabel>
            <CommonInputField id="email" {...register("email")} />
          </div>
          <div className="flex flex-col gap-3">
            <CommonLabel
              htmlFor="message"
              className="text-[var(--highlight-color)]"
            >
              전하고 싶은 말
            </CommonLabel>
            <CommonInputField id="message" {...register("message")} />
          </div>
        </form>
      </div>
    );
  }
);

AdminInquiryForm.displayName = "AdminInquiryForm";
export default AdminInquiryForm;
