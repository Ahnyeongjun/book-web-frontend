import { HTMLAttributes } from "react";

type Props = {
  className?: string;
  placeholder?: string;
  type?: string;
} & HTMLAttributes<HTMLInputElement>;
const CommonInputField = ({ className, ...props }: Readonly<Props>) => {
  return (
    <input
      className={`relative size-full rounded-xl border px-4 py-2.5 placeholder-[var(--placeholder-color)] outline-none placeholder:text-sm ${
        className || ""
      }`}
      {...props}
    ></input>
  );
};

export default CommonInputField;
