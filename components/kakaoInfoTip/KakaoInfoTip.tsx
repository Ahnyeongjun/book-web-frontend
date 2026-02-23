import React from "react";
import KakaoIcon from "@/public/icons/kakaoIcon.svg";

const KakaoInfoTip = () => {
  return (
    <label
      htmlFor="toggle"
      className="relative flex h-5 min-w-5 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#FEE500] text-[#000000]"
    >
      <input type="checkbox" id="toggle" className="peer hidden" />
      <div className="flex size-5 items-center justify-center rounded-md">
        <KakaoIcon className="size-3" />
      </div>
      <div className="flex w-0 items-center overflow-hidden transition-all duration-300 peer-checked:w-[200px]">
        <p className="truncate whitespace-nowrap text-xs">이 정보는 카카오 api에서 제공 되었습니다</p>
      </div>
    </label>
  );
};

export default KakaoInfoTip;
