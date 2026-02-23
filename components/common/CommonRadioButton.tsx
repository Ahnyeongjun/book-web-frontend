"use client";
import React, { HTMLAttributes, useEffect, useState } from "react";

type Props = {
  className?: string;
  name?: string;
  isSelected: boolean;
} & HTMLAttributes<HTMLLabelElement>;
const CommonRadioButton = ({ className, isSelected, name, ...props }: Readonly<Props>) => {
  const [isChecked, setIsChecked] = useState(false);
  useEffect(() => {
    setIsChecked(isSelected);
  }, [isSelected]);
  return (
    <label className={`relative flex size-fit cursor-pointer items-center ${className || ""}`} {...props}>
      <input
        type="radio"
        name={name}
        className="peer sr-only"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <div className="peer size-4 rounded-full bg-gray-200 peer-checked:bg-[var(--highlight-color)] peer-checked:after:absolute peer-checked:after:left-[4px] peer-checked:after:top-[4px] peer-checked:after:size-2 peer-checked:after:rounded-full peer-checked:after:bg-white" />
    </label>
  );
};

export default CommonRadioButton;
