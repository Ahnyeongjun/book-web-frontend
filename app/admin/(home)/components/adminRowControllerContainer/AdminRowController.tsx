"use client";

import CommonPillButton from "@/components/common/CommonPillButton";
import AdminContentForm, {
  AdminContentFormRef,
} from "@/components/popupProvider/adminForm/AdminContentForm";
import AdminDeleteForm, {
  AdminDeleteFormRef,
} from "@/components/popupProvider/adminForm/AdminDeleteForm";
import AdminEventForm, {
  AdminEventFormRef,
} from "@/components/popupProvider/adminForm/AdminEventForm";
import AdminInquiryForm from "@/components/popupProvider/adminForm/AdminInquiryForm";
import AdminPublisherForm, {
  AdminPublisherFormRef,
} from "@/components/popupProvider/adminForm/AdminPublisherForm";
import AdminPopupModal from "@/components/popupProvider/AdminPopupModal";
import AlertPopupModal from "@/components/popupProvider/AlertPopupModal";
import { usePopupAction } from "@/context/popupStore";
import { fetchDetail } from "@/function/fetch/fetchDetail";
import { DefaultValueTypes } from "@/types/admin";
import {
  ContactDto,
  ContentsCreateRequest,
  EventCreateRequest,
  PublisherCreateRequest,
} from "@/types/dto";
import { usePathname } from "next/navigation";
import { HTMLAttributes, useRef } from "react";

type Props = {
  className?: string;
  resultLength?: string;
  selectRow: number | undefined;
  defaultValues?: DefaultValueTypes;
} & HTMLAttributes<HTMLDivElement>;

const AdminRowController = ({
  className,
  resultLength,
  selectRow,
  defaultValues,
  ...props
}: Readonly<Props>) => {
  const { openPopup, closePopup } = usePopupAction();
  const adminDeleteFormRef = useRef<AdminDeleteFormRef>(null);
  const AltFormComponentRef = useRef<
    AdminContentFormRef | AdminEventFormRef | AdminPublisherFormRef
  >(null);
  const pathName = usePathname();
  const editData = async (id: number, pathName: string) => {
    const data = await fetchDetail(id, pathName);
    setRow(pathName, data);
  };
  console.log(defaultValues);

  const setRow = (pathName: string, defaultValues?: DefaultValueTypes) => {
    openPopup(
      <AdminPopupModal>
        {pathName === "/admin/content" ? (
          <AdminContentForm
            ref={AltFormComponentRef}
            defaultValues={defaultValues as ContentsCreateRequest}
          />
        ) : pathName === "/admin/event" ? (
          <AdminEventForm
            ref={AltFormComponentRef}
            defaultValues={defaultValues as EventCreateRequest}
          />
        ) : pathName === "/admin/inquiry" ? (
          <AdminInquiryForm
            ref={AltFormComponentRef}
            defaultValues={defaultValues as ContactDto}
          />
        ) : (
          <AdminPublisherForm
            ref={AltFormComponentRef}
            defaultValues={defaultValues as PublisherCreateRequest}
          />
        )}
      </AdminPopupModal>,
      closePopup,
      () => {
        AltFormComponentRef.current?.handleSubmit();
      }
    );
  };
  const deleteRow = () => {
    openPopup(
      <AlertPopupModal>
        <AdminDeleteForm rowKey={selectRow} ref={adminDeleteFormRef} />
      </AlertPopupModal>,
      closePopup,
      () => {
        adminDeleteFormRef.current?.handleSubmit();
      }
    );
  };
  return (
    <div
      className={`relative flex h-16 w-full flex-row items-center justify-between pl-[60px] !text-sm font-semibold ${
        className || ""
      }`}
      {...props}
    >
      <span className="flex flex-row items-center justify-center gap-7">
        <p className="text-sm font-semibold text-[var(--highlight-color)]">
          All {resultLength || "0"}
        </p>
        <CommonPillButton
          onClick={() => setRow(pathName)}
          className="h-8 w-20 !bg-[var(--highlight-color)] text-white"
        >
          Add row
        </CommonPillButton>
      </span>
      <span className="flex flex-row gap-2">
        <CommonPillButton
          onClick={selectRow !== undefined ? deleteRow : undefined}
          className="h-8 w-20 border-red-600 text-red-600"
        >
          Delete
        </CommonPillButton>
        <CommonPillButton
          onClick={() =>
            selectRow !== undefined && editData(selectRow, pathName)
          }
          className="h-8 w-20 border-gray-200 text-[var(--sub-color)]"
        >
          Edit
        </CommonPillButton>
      </span>
    </div>
  );
};

export default AdminRowController;
