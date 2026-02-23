import LoadingSpinnerIcon from "@/public/icons/loadingSpinnerIcon.svg";
import { HTMLAttributes } from "react";

type Props = {
  className?: string;
} & HTMLAttributes<HTMLDivElement>;
const LoadingSpinner = ({ className, ...props }: Readonly<Props>) => {
  return (
    <div className={`relative flex items-center justify-center ${className || ""}`} {...props}>
      <LoadingSpinnerIcon className={`size-10 animate-spin`} />
    </div>
  );
};

export default LoadingSpinner;
