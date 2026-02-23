"use client";
import {
  ContentsFilterType,
  useSchedulePageFilterControllerData,
} from "@/app/(client)/(backButtonHeader)/schedule/components/SchedulePageDataProvider";
import CommonPillButton from "@/components/common/CommonPillButton";
import BottomSheetModal from "@/components/popupProvider/BottomSheetModal";
import YearMonthFilterSelector from "@/components/popupProvider/alphabetFilterSelector/YearMonthFilterSelector";
import { ModalType, usePopupAction } from "@/context/popupStore";
import TriangleArrow from "@/public/icons/triangleArrowIcon.svg";
import { useLayoutEffect, useRef } from "react";

const ScheduleFilterController = () => {
  const {
    contentsfilter,
    setContentsFilter,
    alphabetFilter,
    setAlphabetFilter,
  } = useSchedulePageFilterControllerData();
  const { openPopup, closePopup } = usePopupAction();
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const bodyElement = document.body.getBoundingClientRect();
    if (ref.current) {
      ref.current.style.width = bodyElement.width + "px";
    }
  }, []);

  const bottomSheetOpenHander = () => {
    openPopup<string>(
      <BottomSheetModal>
        <YearMonthFilterSelector />
      </BottomSheetModal>,
      closePopup,
      setAlphabetFilter,
      ModalType.BOTTOMSHEET
    );
  };

  return (
    <div
      className="fixed z-30 flex w-full bg-[#FFFFFFD9] pb-3 pl-[var(--client-layout-margin)] backdrop-blur-[5px]"
      ref={ref}
    >
      <div className="scrollbar-hide flex flex-row items-center justify-start gap-2 overflow-x-auto text-xl">
        <CommonPillButton
          className={`!size-fit shrink-0 px-4 transition-colors ${
            contentsfilter?.includes(ContentsFilterType.SOLO)
              ? "border-none bg-gradient-to-r from-[#B0B5DF] to-[#EEDBE0] !font-semibold text-white"
              : "border-gray-200 px-4 text-[var(--sub-color)]"
          }`}
          onClick={() =>
            setContentsFilter((prev) =>
              prev?.includes(ContentsFilterType.SOLO)
                ? prev.length < 0
                  ? prev?.filter((item) => item !== ContentsFilterType.SOLO)
                  : [ContentsFilterType.TOGETHER]
                : [...prev, ContentsFilterType.SOLO]
            )
          }
        >
          혼자
        </CommonPillButton>
        <CommonPillButton
          className={`!size-fit shrink-0 px-4 transition-colors ${
            contentsfilter?.includes(ContentsFilterType.TOGETHER)
              ? "border-none bg-gradient-to-r from-[#B0B5DF] to-[#EEDBE0] !font-semibold text-white"
              : "border-gray-200 px-4 text-[var(--sub-color)]"
          }`}
          onClick={() =>
            setContentsFilter((prev) =>
              prev?.includes(ContentsFilterType.TOGETHER)
                ? prev.length < 0
                  ? prev?.filter((item) => item !== ContentsFilterType.TOGETHER)
                  : [ContentsFilterType.SOLO]
                : [...prev, ContentsFilterType.TOGETHER]
            )
          }
        >
          함께
        </CommonPillButton>
        <CommonPillButton
          className="!size-fit shrink-0 border-gray-200 from-[#B0B5DF] to-[#EEDBE0] px-4 text-[var(--sub-color)] transition-colors focus:bg-gradient-to-r focus:font-semibold focus:text-white"
          onClick={bottomSheetOpenHander}
        >
          모집시기 {alphabetFilter}
          <TriangleArrow
            className={`flex size-4 rotate-180 items-center justify-center transition duration-300`}
          />
        </CommonPillButton>
      </div>
    </div>
  );
};

export default ScheduleFilterController;
