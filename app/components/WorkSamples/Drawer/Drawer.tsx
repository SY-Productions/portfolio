import React from "react";
import DrawerClickOutside from "./DrawerClickOutside";
import DrawerCarousel from "./DrawerCarousel";
import { WorkSample } from "@prisma/client";
import DrawerBody from "./DrawerBody";

export default function Drawer({
  classes,
  data,
  mobile,
  web,
}: {
  classes: string;
  data: WorkSample[];
  mobile: WorkSample[];
  web: WorkSample[];
}) {
  return (
    <div
      className={`Drawer-with-hiddenDiv fixed z-50 w-auto left-0 right-0 bottom-0 flex flex-col justify-between h-screen max-h-max transition-all delay-0 duration-500 ${classes} `}
    >
      <DrawerClickOutside />
      <div
        // bg-c/95
        className="DRAWER w-auto overflow-y-auto rounded-t-[2rem] lg:rounded-t-[5rem] basis-3/4 grow-0 bg-c/95"
      >
        <DrawerCarousel data={data} />
        <DrawerBody web={web} mob={mobile} />
      </div>
    </div>
  );
}
