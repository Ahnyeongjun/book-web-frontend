import { usePopupState } from "@/context/popupStore";
import { HTMLAttributes, ReactNode } from "react";
import CommonPillButton from "../common/CommonPillButton";
type Props = {
  className?: string;
  children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

const AlertPopupModal = ({ className, children, ...props }: Readonly<Props>) => {
  const { closeCallback, confirmCallback } = usePopupState();

  return (
    <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-[#FFFFFF99] backdrop-blur-[20px]">
      <div
        className={`pointer-events-auto flex size-fit w-[400px] flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-[0_0_20px_0_rgba(0,0,0,0.12)] ${
          className || ""
        }`}
        {...props}
      >
        {children}
        <div className="flex size-full flex-row justify-center gap-2">
          <CommonPillButton
            onClick={confirmCallback}
            className="h-10 w-20 border-red-600 bg-red-600 font-bold text-white"
          >
            Ok
          </CommonPillButton>
          <CommonPillButton
            onClick={closeCallback}
            className="h-10 w-20 border-gray-200 font-bold text-[var(--sub-color)]"
          >
            Cancle
          </CommonPillButton>
        </div>
      </div>
    </div>
  );
};

export default AlertPopupModal;
