import { HTMLAttributes } from "react";

type Props = { className?: string; optionItems: string[] } & HTMLAttributes<HTMLSelectElement>;
const CommonSelectBox = ({ className, optionItems, ...props }: Readonly<Props>) => {
  return (
    <select
      className={`relative size-full rounded-xl border px-4 py-2.5 text-sm text-[var(--sub-color)] ${className || ""}`}
      {...props}
    >
      {optionItems.map((option, index) => (
        <option key={index}>{option}</option>
      ))}
    </select>
  );
};

export default CommonSelectBox;
