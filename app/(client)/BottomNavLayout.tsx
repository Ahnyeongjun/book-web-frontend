"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import BottomNav from "./components/bottomNav/BottomNav";
import SearchBottomPanel from "./components/searchBottomPanel/SearchBottomPanel";

const BottomNavLayout = () => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  return (
    <>
      <AnimatePresence mode="wait">
        {isSearchOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 z-40 mx-auto size-full"
          >
            <SearchBottomPanel setIsSearchOpen={setIsSearchOpen} />
          </motion.div>
        )}
      </AnimatePresence>
      <BottomNav isSearchOpen={isSearchOpen} setSearchOpen={setIsSearchOpen} />
    </>
  );
};

export default BottomNavLayout;
