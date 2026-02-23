"use client";
import { AnimatePresence, motion } from "framer-motion";
import { ModalType, usePopupAction, usePopupState } from "../../context/popupStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const PopupProvider = () => {
  const { type, content, isOpen } = usePopupState();
  const { closePopup } = usePopupAction();
  const pathName = usePathname();
  useEffect(() => {
    closePopup();
  }, [closePopup, pathName]);
  return (
    <AnimatePresence>
      {isOpen && type === ModalType.POPUP && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="pointer-events-none fixed inset-0 z-40 flex size-full items-center justify-center"
        >
          {content}
        </motion.div>
      )}

      {isOpen && type === ModalType.BOTTOMSHEET && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="pointer-events-none fixed inset-0 z-40 flex size-full items-center justify-center"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopupProvider;
