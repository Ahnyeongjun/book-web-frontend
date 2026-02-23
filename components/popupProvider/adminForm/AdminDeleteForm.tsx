import React, { forwardRef, HTMLAttributes, useImperativeHandle } from "react";
type Props = {
  className?: string;
  rowKey?: string | number;
} & HTMLAttributes<HTMLDivElement>;
export type AdminDeleteFormRef = {
  handleSubmit: () => void;
};
const AdminDeleteForm = forwardRef<AdminDeleteFormRef, Props>(({ className, rowKey, ...props }, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      handleSubmit: () => {},
    }),
    []
  );
  return (
    <div className={`relative flex size-full flex-col ${className || ""}`} {...props}>
      <h2 className="flex justify-center text-sm font-semibold text-red-600">Delete Content</h2>
      <p className="flex justify-center py-6 text-sm text-[var(--sub-color)]">{rowKey}행을 삭제하시겠습니까?</p>
    </div>
  );
});

AdminDeleteForm.displayName = "AdminDeleteForm";
export default AdminDeleteForm;
