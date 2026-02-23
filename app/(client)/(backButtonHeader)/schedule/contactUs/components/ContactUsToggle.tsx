"use client";

interface ContactUsToggleProps {
  isEvent: boolean;
  setIsEvent: (index: boolean) => void;
}

const ContactUsToggle = ({ isEvent, setIsEvent }: ContactUsToggleProps) => {
  return (
    <div className="relative flex size-full justify-center border-b border-b-[#EDEDED] px-[var(--client-layout-margin)]">
      <div
        className={`flex w-[145px] cursor-pointer justify-center pb-3.5 transition-colors ${
          isEvent
            ? "border-b-2 border-[#5F69BE] font-bold text-[#5F69BE]"
            : "text-[--sub-color]"
        }`}
        onClick={() => setIsEvent(true)}
      >
        이벤트 홍보
      </div>
      <div
        className={`flex w-[145px] cursor-pointer justify-center pb-3.5 transition-colors  ${
          isEvent
            ? "text-[--sub-color]"
            : "border-b-2 border-[#5F69BE] font-bold text-[#5F69BE]"
        }`}
        onClick={() => setIsEvent(false)}
      >
        기타문의
      </div>
    </div>
  );
};

export default ContactUsToggle;
