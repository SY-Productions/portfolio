import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

type State = {
  isOpen: boolean;
  isWebFrame: boolean;
  sampleWebIndex: number;
  sampleMobIndex: number;
  webSamples: number;
  MobSamples: number;
  sideBarScroll: string;
  isDrawerOpen: boolean;
  samplePicIndex: number;
  isOnMobile: boolean;
  isLoading: boolean;
};
type Action = {
  setIsWebFrame: (f: boolean) => void;
  setOpen: () => void;
  setFixedOpen: () => void;
  setSampleWebIndex: (sign: number) => void;
  setSampleMobIndex: (sign: number) => void;
  setWebSamples: (n: number) => void;
  setMobSamples: (n: number) => void;
  setSideBarScroll: (name: string) => void;
  setDrawerOpening: (bool: boolean) => void;
  increaseSamplePicIndex: () => number;
  decreaseSamplePicIndex: () => number;
  setIsOnMobile: (screenSize: boolean) => void;
  setIsLoading: (bool: boolean) => void;
};
export const useZState = create<State & Action>((set) => ({
  isOpen: false,
  sampleWebIndex: 0,
  sampleMobIndex: 0,
  isWebFrame: true,
  webSamples: 0, // Always should -1 of Real number of web Samples
  MobSamples: 0, // Always should -1 of Real number of mob Samples
  sideBarScroll: "#about-me",
  isDrawerOpen: false,
  samplePicIndex: 0,
  isOnMobile: true,
  isLoading: true,
  setOpen: () => set((s) => ({ isOpen: !s.isOpen })),
  setFixedOpen: () => set(() => ({ isOpen: true })),
  setIsWebFrame: (f) => set(() => ({ isWebFrame: f })),
  setSampleWebIndex: (sign) =>
    set((s) =>
      sign == 1
        ? { sampleWebIndex: s.sampleWebIndex + 1 }
        : sign == 0
        ? {
            sampleWebIndex: s.sampleWebIndex - 1,
          }
        : { sampleWebIndex: s.sampleWebIndex }
    ),
  setSampleMobIndex: (sign) =>
    set((s) =>
      sign == 1
        ? { sampleMobIndex: s.sampleMobIndex + 1 }
        : sign == 0
        ? { sampleMobIndex: s.sampleMobIndex - 1 }
        : { sampleMobIndex: s.sampleMobIndex }
    ),
  setWebSamples: (n) => set(() => ({ webSamples: n })),
  setMobSamples: (n) => set(() => ({ MobSamples: n })),
  setSideBarScroll: (name) => set(() => ({ sideBarScroll: name })),
  setDrawerOpening: (bool) => set(() => ({ isDrawerOpen: bool })),
  increaseSamplePicIndex: () =>
    set((pre) => ({ samplePicIndex: pre.samplePicIndex + 1 }))!,
  decreaseSamplePicIndex: () =>
    set((pre) => ({ samplePicIndex: pre.samplePicIndex - 1 }))!,
  setIsOnMobile: (size) => set(() => ({ isOnMobile: size })),
  setIsLoading: (bool) => set(() => ({ isLoading: bool })),
}));

if (process.env.NODE_ENV === "development")
  mountStoreDevtool("!!!STATES!!!", useZState);
