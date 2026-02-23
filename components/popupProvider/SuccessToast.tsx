"use client";

import { useToast } from "../hooks/useToast";

const SuccessToast = () => {
  const { visible, type, message } = useToast();

  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-28 left-1/2 z-50 -translate-x-1/2 rounded-xl text-white shadow-md ${
        type === "success" ? "bg-[#00C5B9]" : "bg-[#FF2C6C]"
      }`}
    >
      <div className="flex items-center justify-center rounded-lg p-6 text-sm font-semibold">
        {message}
      </div>
    </div>
  );
};

export default SuccessToast;
