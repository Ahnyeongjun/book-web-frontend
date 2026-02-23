"use client";
import React from "react";
import B from "@/public/B.svg";
import Ksight from "@/public/ksight.svg";
import EyeBallPupil from "@/public/eyeBallPupil.svg";
import EyeBallIris from "@/public/eyeBallIris.svg";
import { motion } from "framer-motion";

const Logo = () => {
  return (
    <div className="relative flex h-5 flex-row items-center">
      <B />
      <EyeBall className="translate-x-[1px] translate-y-[1px]" />
      <EyeBall className="-translate-x-[1px] translate-y-[1px]" />
      <Ksight />
    </div>
  );
};

export default Logo;

type EyeBallProps = {
  className?: string;
};
const EyeBall = ({ className }: Readonly<EyeBallProps>) => {
  return (
    <div className={`relative flex flex-row items-center justify-center ${className || ""}`}>
      <EyeBallPupil />
      <motion.div
        className="absolute"
        animate={{ translateX: [2, -1, -1, 0, 0, 0, 0, 2, 2], translateY: [0, -2, -2, 2, 2, 0, 0, 0, 0] }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Infinity,
          times: [0, 0.02, 0.04, 0.08, 0.1, 0.12, 0.14, 0.16, 1],
        }}
      >
        <EyeBallIris />
      </motion.div>
    </div>
  );
};
