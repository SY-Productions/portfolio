"use client";

import React, { memo, useState, useEffect } from "react";
import { useWorkSample } from "./WorkSampleContext";
import SkeletonImage from "../SkeletonImage";

export const PhoneFrame = memo(function PhoneFrame({ src }: { src: string }) {
  return (
    <div
      className="relative flex-shrink-0 mx-auto"
      style={{
        width: "min(200px, 38vw)",
        filter: "drop-shadow(0 20px 60px rgba(0,0,0,0.6))",
      }}
    >
      {/* Outer titanium shell */}
      <div
        className="relative"
        style={{
          background: "linear-gradient(145deg, #3a3a3c 0%, #1c1c1e 50%, #2a2a2c 100%)",
          borderRadius: "2.8rem",
          padding: "2.5px",
        }}
      >
        {/* Volume down */}
        <div className="absolute -start-[4.5px] rounded-s-sm" style={{ top: "22%", width: 4, height: "7%", background: "linear-gradient(90deg,#3a3a3c,#2a2a2a)" }} />
        {/* Volume up */}
        <div className="absolute -start-[4.5px] rounded-s-sm" style={{ top: "31%", width: 4, height: "7%", background: "linear-gradient(90deg,#3a3a3c,#2a2a2a)" }} />
        {/* Silent switch */}
        <div className="absolute -start-[4.5px] rounded-s-sm" style={{ top: "16%", width: 4, height: "4%", background: "linear-gradient(90deg,#3a3a3c,#2a2a2a)" }} />
        {/* Power / side button */}
        <div className="absolute -end-[4.5px] rounded-e-sm" style={{ top: "27%", width: 4, height: "10%", background: "linear-gradient(90deg,#2a2a2a,#3a3a3c)" }} />

        {/* Screen bezel */}
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: "2.6rem",
            background: "#000",
            aspectRatio: "9/19.5",
          }}
        >
          {/* Dynamic island */}
          <div
            className="absolute z-20 bg-black"
            style={{
              top: 8,
              left: "50%",
              transform: "translateX(-50%)",
              width: "32%",
              height: "4%",
              borderRadius: 999,
            }}
          />

          {/* Screen content */}
          <SkeletonImage
            src={src}
            width={400}
            height={860}
            className="absolute inset-0 w-full h-full object-cover object-top"
            alt="App screenshot"
          />

          {/* Home indicator */}
          <div
            className="absolute z-20"
            style={{
              bottom: 6,
              left: "50%",
              transform: "translateX(-50%)",
              width: "28%",
              height: 4,
              borderRadius: 999,
              background: "rgba(255,255,255,0.3)",
            }}
          />

          {/* Subtle glass sheen */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 45%)",
            }}
          />
        </div>
      </div>
    </div>
  );
});

export const BrowserFrame = memo(function BrowserFrame({ src }: { src: string }) {
  return (
    <div
      className="mx-auto"
      style={{
        width: "min(480px, 72vw)",
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.08)",
        filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.6))",
      }}
    >
      {/* Chrome bar */}
      <div
        style={{
          height: 34,
          background: "rgba(22,22,24,0.98)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          gap: 6,
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", flexShrink: 0 }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", flexShrink: 0 }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", flexShrink: 0 }} />
        <div
          style={{
            flex: 1,
            marginLeft: 6,
            height: 20,
            borderRadius: 5,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            display: "flex",
            alignItems: "center",
            padding: "0 8px",
            gap: 5,
          }}
        >
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#3a3a3c", flexShrink: 0 }} />
          <div style={{ flex: 1, height: 3, borderRadius: 2, background: "#2a2a2c" }} />
        </div>
      </div>

      {/* Screenshot */}
      <div style={{ background: "#000", aspectRatio: "16/10", overflow: "hidden" }}>
        <SkeletonImage
          src={src}
          width={800}
          height={500}
          className="w-full object-cover object-top"
          alt="Web app screenshot"
        />
      </div>
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
        <BrowserFrame src={pictures[0]} />
      ) : (
        <PhoneFrame src={pictures[0]} />
      )}
    </div>
  );
});

export default Preview;
