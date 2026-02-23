import { create } from "zustand";

type UserStore = {
  userId: string;
  setUserId: (userId: string) => void;
  loadUserId: () => void;
};

const useUserStore = create<UserStore>((set) => ({
  userId: "",
  /**
   * id 스토어에 저장 및 세션 저장소에 저장
   */
  setUserId: (userId: string) => {
    set({ userId });
    window.sessionStorage.setItem("userId", userId);
  },
  /**
   * 새로고침으로 상태가 날라갔을때 세션저장소에서 불러오는용
   */
  loadUserId: () => {
    set({ userId: window.sessionStorage.getItem("userId") || "" });
  },
}));

export const useUserStoreState = () => {
  const userId = useUserStore((state) => state.userId);
  return { userId };
};

export const useUserStoreAction = () => {
  const setUserId = useUserStore((state) => state.setUserId);
  const loadUserId = useUserStore((state) => state.loadUserId);
  return { setUserId, loadUserId };
};
