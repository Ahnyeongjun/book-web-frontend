"use client";
import { AnimatePresence, motion } from "framer-motion";
const PageTransitonTemplate = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const layoutVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={layoutVariants}
        className="flex flex-1 flex-col overflow-hidden"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransitonTemplate;
