"use client";
import React, { HTMLAttributes, ReactNode, useLayoutEffect, useRef } from "react";

type Props = {
  className?: string;
  childeren?: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
const BottomSheetModal = ({ className, children, ...props }: Readonly<Props>) => {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const bodyElement = document.body.getBoundingClientRect();
    if (ref.current) {
      ref.current.style.width = bodyElement.width + "px";
    }
  }, []);
  return (
    <div
      className={`fixed bottom-0 left-0 z-50 flex h-fit w-full items-center justify-center ${className || ""}`}
      {...props}
    >
      <div className="pointer-events-auto flex size-fit w-full items-center justify-center" ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default BottomSheetModal;
