"use client";

import React, { memo, useState, useEffect } from "react";
import { useWorkSample } from "./WorkSampleContext";
import SkeletonImage from "../SkeletonImage";

const PhoneFrame = memo(function PhoneFrame({ src }: { src: string }) {
  const frameW = "min(200px, 38vw)";

  return (
    <div className="flex items-center justify-center" style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.5))" }}>
      <div className="relative flex-shrink-0" style={{ width: frameW }}>
        {/* Outer shell */}
        <div
          className="relative rounded-[2.8rem] overflow-visible"
          style={{
            background: "linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 40%, #0d0d0d 100%)",
            padding: "2px",
          }}
        >
          {/* Side buttons — volume up/down */}
          <div className="absolute -start-[5px] top-[22%] w-[5px] h-[8%] rounded-s-sm"
            style={{ background: "linear-gradient(180deg, #333 0%, #222 100%)" }} />
          <div className="absolute -start-[5px] top-[33%] w-[5px] h-[8%] rounded-s-sm"
            style={{ background: "linear-gradient(180deg, #333 0%, #222 100%)" }} />
          {/* Power button */}
          <div className="absolute -end-[5px] top-[28%] w-[5px] h-[12%] rounded-e-sm"
            style={{ background: "linear-gradient(180deg, #333 0%, #222 100%)" }} />

          {/* Screen bezel */}
          <div
            className="rounded-[2.6rem] overflow-hidden relative"
            style={{
              background: "#0a0a0a",
              aspectRatio: "9/19.5",
            }}
          >
            {/* Dynamic island */}
            <div
              className="absolute top-[6px] left-1/2 -translate-x-1/2 z-20 rounded-full bg-black"
              style={{ width: "30%", height: "3.5%" }}
            />

            {/* Screen image — fills entire screen */}
            <div className="absolute inset-0">
              <SkeletonImage
                src={src}
                width={400}
                height={860}
                className="w-full h-full object-cover object-top"
                alt="App screenshot"
              />
            </div>

            {/* Home indicator */}
            <div
              className="absolute bottom-[6px] left-1/2 -translate-x-1/2 z-20 rounded-full"
              style={{ width: "28%", height: "4px", background: "rgba(255,255,255,0.3)" }}
            />
          </div>
        </div>

        {/* Reflection overlay */}
        <div
          className="absolute inset-0 rounded-[2.8rem] pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 50%)",
          }}
        />
      </div>
    </div>
  );
});

const LaptopFrame = memo(function LaptopFrame({ src }: { src: string }) {
  const frameW = "min(460px, 70vw)";

  return (
    <div className="flex flex-col items-center" style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.5))", width: frameW }}>
      {/* Lid / screen part */}
      <div
        className="w-full relative"
        style={{
          background: "linear-gradient(180deg, #2a2a2a 0%, #1e1e1e 100%)",
          borderRadius: "10px 10px 0 0",
          padding: "3px 3px 0 3px",
        }}
      >
        {/* Top bezel with camera */}
        <div className="flex items-center justify-center py-2">
          <div className="w-2 h-2 rounded-full bg-[#333] border border-[#444]" />
        </div>

        {/* Screen area */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: "16/10", background: "#000", borderRadius: "2px" }}
        >
          {/* Browser chrome bar */}
          <div className="flex items-center gap-1.5 px-3 py-2 bg-[#2a2a2a] border-b border-black/30">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <div className="flex-1 mx-2 h-4 rounded bg-[#1a1a1a] flex items-center px-2">
              <div className="w-3 h-3 rounded-full bg-[#333] me-1.5" />
              <div className="h-1.5 w-[40%] rounded bg-[#333]" />
            </div>
          </div>

          {/* Web screenshot — fills screen fully */}
          <div className="absolute inset-0 top-[34px]">
            <SkeletonImage
              src={src}
              width={800}
              height={500}
              className="w-full h-full object-cover object-top"
              alt="Web app screenshot"
            />
          </div>
        </div>
      </div>

      {/* Hinge / bottom chin */}
      <div
        className="w-full h-[5px]"
        style={{
          background: "linear-gradient(180deg, #1a1a1a 0%, #252525 100%)",
        }}
      />

      {/* Base / keyboard deck */}
      <div
        className="w-full relative"
        style={{
          background: "linear-gradient(180deg, #252525 0%, #1e1e1e 100%)",
          borderRadius: "0 0 8px 8px",
          paddingBottom: "12px",
          paddingTop: "10px",
        }}
      >
        {/* Keyboard rows (decorative) */}
        <div className="flex justify-center gap-0.5 px-4 mb-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex-1 h-[5px] rounded-sm bg-[#333]" />
          ))}
        </div>
        <div className="flex justify-center gap-0.5 px-5 mb-1">
          {Array.from({ length: 11 }).map((_, i) => (
            <div key={i} className="flex-1 h-[5px] rounded-sm bg-[#2e2e2e]" />
          ))}
        </div>
        <div className="flex justify-center gap-0.5 px-6 mb-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex-1 h-[5px] rounded-sm bg-[#2a2a2a]" />
          ))}
        </div>

        {/* Trackpad */}
        <div className="flex justify-center">
          <div className="w-[28%] h-[16px] rounded bg-[#2d2d2d] border border-[#333]" />
        </div>
      </div>

      {/* Foot/table edge shadow */}
      <div
        className="w-[110%] h-[4px] rounded-full mt-px"
        style={{ background: "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)" }}
      />
    </div>
  );
});

const Preview = memo(function Preview() {
  const { isWebFrame, getCurrentPictures, currentSampleIndex } = useWorkSample();
  const pictures = getCurrentPictures();
  const [imgKey, setImgKey] = useState(0);

  useEffect(() => {
    setImgKey((k) => k + 1);
  }, [currentSampleIndex, isWebFrame]);

  if (!pictures.length) return null;

  return (
    <div
      key={imgKey}
      className="flex items-center justify-center mt-[8vh] lg:mt-0 mb-6 lg:mb-0 animate-scale-in"
      style={{ animationDuration: "0.5s" }}
    >
      {isWebFrame ? (
        <LaptopFrame src={pictures[0]} />
      ) : (
        <PhoneFrame src={pictures[0]} />
      )}
    </div>
  );
});

export default Preview;
