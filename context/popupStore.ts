import { Dispatch, ReactNode, SetStateAction } from "react";
import { create } from "zustand";

export enum ModalType {
  POPUP = "popup",
  BOTTOMSHEET = "bottomsheet",
}

type PopupState = {
  type: ModalType;
  content: ReactNode;
  isOpen: boolean;
  cancleCallback: () => void;
  confirmCallback?: ((...arg: unknown[]) => void) | Dispatch<SetStateAction<unknown>>;
};

type PopupActions = {
  openPopup: <T>(
    content: ReactNode,
    cancleCallback?: () => void,
    confirmCallback?: ((...arg: T[]) => void) | Dispatch<SetStateAction<T>>,
    type?: ModalType
  ) => void;
  closePopup: () => void;
};

const usePopupModalStore = create<PopupState & PopupActions>((set) => ({
  type: ModalType.POPUP,
  content: null,
  isOpen: false,
  cancleCallback: () => undefined,
  confirmCallback: undefined,

  openPopup: <T>(
    content: ReactNode,
    cancleCallback?: () => void,
    confirmCallback?: ((...arg: T[]) => void) | Dispatch<SetStateAction<T>>,
    type?: ModalType
  ) => {
    set({
      content,
      isOpen: true,
      cancleCallback,
      confirmCallback: confirmCallback as PopupState["confirmCallback"],
      type: type || ModalType.POPUP,
    });
  },
  closePopup: () => {
    set({
      type: ModalType.POPUP,
      content: null,
      isOpen: false,
      cancleCallback: undefined,
      confirmCallback: undefined,
    });
  },
}));

/**
 * 팝업 모달의 상태를 반환합니다.
 * @returns content - 팝업에 띄울 내용
 * @returns isOpen - 팝업이 열려 있는지 여부
 * @returns cancleCallback - 팝업을 닫을 때 추가적인 작업이 필요하다면 이 콜백을 사용합니다. 콜백핸들러 설정은 usePopupAction()의 openPopup에서 처리함
 * @returns confirmCallback - 확인 버튼을 누를 때 추가적인 작업이 필요하다면 이 콜백을 사용합니다. 콜백핸들러 설정은 usePopupAction()의 openPopup에서 처리함
 */
export const usePopupState = () => {
  const type = usePopupModalStore((state) => state.type);
  const content = usePopupModalStore((state) => state.content);
  const isOpen = usePopupModalStore((state) => state.isOpen);
  const closeCallback = usePopupModalStore((state) => state.cancleCallback);
  const confirmCallback = usePopupModalStore((state) => state.confirmCallback);

  return { type, content, isOpen, closeCallback, confirmCallback };
};

/**
 * 팝업 모달의 액션을 반환합니다.
 * @returns openPopup - 팝업을 엽니다. 필요한경우 closeCallback,confirmCallback을 설정할 수 있습니다.
 * @returns closePopup - 팝업을 닫습니다
 */
export const usePopupAction = () => {
  const openPopup = usePopupModalStore((state) => state.openPopup);
  const closePopup = usePopupModalStore((state) => state.closePopup);
  return { openPopup, closePopup };
};
