"use client";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useZState } from "@/app/states";
export default function SampleSwitcher() {
  const {
    setSampleWebIndex,
    setSampleMobIndex,
    sampleWebIndex,
    sampleMobIndex,
    isWebFrame,

    MobSamples,
    webSamples,
  } = useZState();
  const buttonClasses =
    "btn rounded-none w-[15vw] lg:w-[4vw] h-[7vh] lg:h-[6vh] bg-white/5 hover:bg-white/10 hover:border-white/15 border border-white/10 active:bg-b/20";
  function handleButtons(ZeroOrOne: number) {
    if (isWebFrame) {
      if (ZeroOrOne == 1) {
        if (sampleWebIndex < webSamples) return setSampleWebIndex(1);
        return setSampleWebIndex(2);
      }
      if (sampleWebIndex != 0 && sampleWebIndex <= webSamples)
        return setSampleWebIndex(0);
      return setSampleWebIndex(2);
    }
    if (ZeroOrOne == 1) {
      if (sampleMobIndex < MobSamples) return setSampleMobIndex(1);
      return setSampleMobIndex(2);
    }
    if (sampleMobIndex != 0 && sampleMobIndex <= MobSamples)
      return setSampleMobIndex(0);
    return setSampleMobIndex(2);
  }
  return (
    <div className="float-end my-6 lg:mb-0">
      <button onClick={() => handleButtons(0)} className={buttonClasses}>
        <KeyboardArrowRightIcon sx={{ fontSize: 20, color: "white" }} />
      </button>
      <button onClick={() => handleButtons(1)} className={buttonClasses}>
        <KeyboardArrowRightIcon
          sx={{ transform: "rotate(180deg)", fontSize: 20, color: "white" }}
        />
      </button>
    </div>
  );
}
