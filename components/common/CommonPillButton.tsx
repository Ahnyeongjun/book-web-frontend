import React, { HTMLAttributes, ReactNode } from "react";
type Props = {
  children?: ReactNode;
  className?: string;
} & HTMLAttributes<HTMLButtonElement>;
const CommonPillButton = ({ children, className, ...props }: Readonly<Props>) => {
  return (
    <button
      className={`relative flex size-full items-center justify-center rounded-full border border-[var(--highlight-color)] py-2 text-sm text-[var(--highlight-color)] ${
        className || ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CommonPillButton;
