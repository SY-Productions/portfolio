"use client";
import { useZState } from "@/app/states";
import React from "react";

export default function DrawerClickOutside() {
  const { setDrawerOpening } = useZState();

  return (
    <div
      onClick={() => setDrawerOpening(false)}
      className="just-for-clicking-outside-to-close-drawer w-auto basis-1/4 shrink-0"
    />
  );
}
