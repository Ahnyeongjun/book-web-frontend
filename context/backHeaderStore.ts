import { ReactNode } from "react";
import { create } from "zustand";

type BackHeaderStore = {
  title: ReactNode;
  setTitle: (title: ReactNode) => void;
  etcButton: ReactNode;
  setEtcButton: (etcButton: ReactNode) => void;
};

const useBackHeaderStore = create<BackHeaderStore>((set) => ({
  title: "",
  setTitle: (title: ReactNode) => set({ title }),
  etcButton: null,
  setEtcButton: (etcButton: ReactNode) => set({ etcButton }),
}));

export const useBackHeader = () => {
  const title = useBackHeaderStore((state) => state.title);
  const setTitle = useBackHeaderStore((state) => state.setTitle);

  const etcButton = useBackHeaderStore((state) => state.etcButton);
  const setEtcButton = useBackHeaderStore((state) => state.setEtcButton);
  return { title, setTitle, etcButton, setEtcButton };
};
