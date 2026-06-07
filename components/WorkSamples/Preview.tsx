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

export const LaptopFrame = memo(function LaptopFrame({ src }: { src: string }) {
  return (
    <div
      className="flex flex-col items-center mx-auto"
      style={{
        width: "min(480px, 72vw)",
        filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.55))",
      }}
    >
      {/* ── LID ── */}
      <div
        className="relative w-full"
        style={{
          background: "linear-gradient(160deg, #3a3a3c 0%, #2a2a2c 40%, #1c1c1e 100%)",
          borderRadius: "12px 12px 0 0",
          padding: "2px 2px 0",
        }}
      >
        {/* Top bezel: camera + ambient sensor */}
        <div className="flex items-center justify-center gap-2 py-[6px]">
          <div
            className="w-[7px] h-[7px] rounded-full"
            style={{
              background: "radial-gradient(circle, #5a5a5c 0%, #3a3a3c 100%)",
              boxShadow: "inset 0 0 2px rgba(0,0,0,0.5)",
            }}
          />
        </div>

        {/* Screen */}
        <div
          className="relative overflow-hidden"
          style={{
            background: "#000",
            borderRadius: "3px 3px 0 0",
            aspectRatio: "16/10",
          }}
        >
          {/* macOS-style menu bar */}
          <div
            className="flex items-center gap-[5px] px-2.5 flex-shrink-0"
            style={{
              height: 22,
              background: "rgba(30,30,32,0.98)",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" style={{ boxShadow: "0 0 0 0.5px rgba(0,0,0,0.3)" }} />
            <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" style={{ boxShadow: "0 0 0 0.5px rgba(0,0,0,0.3)" }} />
            <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" style={{ boxShadow: "0 0 0 0.5px rgba(0,0,0,0.3)" }} />
            {/* URL bar */}
            <div
              className="flex-1 mx-2 flex items-center px-2 gap-1.5"
              style={{
                height: 14,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 3,
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div className="w-[6px] h-[6px] rounded-full bg-[#555] flex-shrink-0" />
              <div className="flex-1 h-[4px] rounded-full bg-[#444]" />
            </div>
          </div>

          {/* Page screenshot */}
          <SkeletonImage
            src={src}
            width={800}
            height={500}
            className="w-full object-cover object-top"
            alt="Web app screenshot"
          />

          {/* Subtle screen sheen */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(140deg, rgba(255,255,255,0.04) 0%, transparent 40%)",
            }}
          />
        </div>
      </div>

      {/* ── HINGE ── */}
      <div
        className="w-full"
        style={{
          height: 6,
          background: "linear-gradient(180deg, #1c1c1e 0%, #2a2a2c 100%)",
        }}
      />

      {/* ── BASE ── */}
      <div
        className="relative w-full"
        style={{
          background: "linear-gradient(180deg, #2e2e30 0%, #1c1c1e 80%, #111 100%)",
          borderRadius: "0 0 10px 10px",
          paddingTop: 10,
          paddingBottom: 14,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        {/* Keyboard area — styled rows */}
        <div className="space-y-1 mb-3">
          {[11, 10, 9, 8].map((keys, row) => (
            <div key={row} className="flex gap-[2px] justify-center">
              {Array.from({ length: keys }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 max-w-[4.5%]"
                  style={{
                    height: 6,
                    background: "linear-gradient(180deg, #3a3a3c 0%, #2a2a2c 100%)",
                    borderRadius: 2,
                    boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.4), 0 0.5px 0 rgba(255,255,255,0.04)",
                  }}
                />
              ))}
            </div>
          ))}
          {/* Space bar row */}
          <div className="flex gap-[2px] justify-center">
            {[3, 4, 3].map((keys, gi) => (
              <React.Fragment key={gi}>
                {gi === 1 ? (
                  <div
                    className="flex-1"
                    style={{
                      height: 6,
                      background: "linear-gradient(180deg, #3a3a3c 0%, #2a2a2c 100%)",
                      borderRadius: 2,
                      boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.4)",
                      maxWidth: "40%",
                    }}
                  />
                ) : (
                  Array.from({ length: keys }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 max-w-[4.5%]"
                      style={{
                        height: 6,
                        background: "linear-gradient(180deg, #3a3a3c 0%, #2a2a2c 100%)",
                        borderRadius: 2,
                        boxShadow: "inset 0 -1px 0 rgba(0,0,0,0.4)",
                      }}
                    />
                  ))
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Trackpad */}
        <div className="flex justify-center">
          <div
            style={{
              width: "26%",
              height: 18,
              background: "linear-gradient(160deg, #2e2e30 0%, #252527 100%)",
              borderRadius: 4,
              border: "1px solid rgba(255,255,255,0.06)",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.4)",
            }}
          />
        </div>
      </div>

      {/* Ground shadow */}
      <div
        className="w-[80%]"
        style={{
          height: 3,
          background: "radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
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
