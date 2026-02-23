// hooks/useToast.ts
import { create } from "zustand";

type ToastType = "success" | "error";

type ToastState = {
  visible: boolean;
  type: ToastType;
  message: string;
  showToast: (type: ToastType, message: string) => void;
  hideToast: () => void;
};

export const useToast = create<ToastState>((set) => ({
  visible: false,
  type: "success",
  message: "",
  showToast: (type, message) => {
    set({ visible: true, type, message });
    setTimeout(() => set({ visible: false }), 2500);
  },
  hideToast: () => set({ visible: false }),
}));
