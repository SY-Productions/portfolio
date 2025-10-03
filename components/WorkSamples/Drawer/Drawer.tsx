"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useWorkSample } from "../WorkSampleContext";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DrawerCarousel from "./DrawerCarousel";
import DrawerBody from "./DrawerBody";

export default function Drawer() {
  const {
    isDrawerOpen,
    setIsDrawerOpen,
    getCurrentSample,
    getCurrentPictures,
  } = useWorkSample();

  const currentSample = getCurrentSample();



  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [isDrawerOpen, setIsDrawerOpen]);

  // Close drawer when clicking outside
  const handleClickOutside = useCallback(() => {
    setIsDrawerOpen(false);
  }, [setIsDrawerOpen]);

  if (!isDrawerOpen || !currentSample) return null;


  return (
    <div className="Drawer-with-hiddenDiv fixed z-50 w-auto left-0 right-0 bottom-0 flex flex-col justify-between h-screen max-h-max transition-all delay-0 duration-500">
      {/* Click outside to close */}
      <div
        onClick={handleClickOutside}
        className="just-for-clicking-outside-to-close-drawer w-auto basis-1/4 shrink-0"
      />

      {/* Drawer content */}
      <div className="DRAWER w-auto overflow-y-auto rounded-t-[2rem] lg:rounded-t-[5rem] basis-3/4 grow-0 bg-[#0A0A0A] border-t border-l border-r border-[#222]">
        <DrawerCarousel />
        <DrawerBody />
      </div>
    </div>
  );
}
