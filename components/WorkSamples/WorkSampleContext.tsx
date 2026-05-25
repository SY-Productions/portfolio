"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  ReactNode,
} from "react";

// Define types for better type safety
export interface WorkSample {
  id: number;
  enTitle: string;
  faTitle: string;
  arTitle?: string;
  enDescription: string;
  faDescription: string;
  arDescription?: string;
  pictures: string;
  isWeb: boolean;
  link: string;
  customLinks: string;
  technologys: string;
  faStartDate: string;
  enStartDate: string;
  arStartDate?: string;
  faEndDate: string;
  enEndDate: string;
  arEndDate?: string;
}

interface WorkSampleContextType {
  data: WorkSample[];
  mobileData: WorkSample[];
  webData: WorkSample[];
  isWebFrame: boolean;
  setIsWebFrame: (value: boolean) => void;
  currentSampleIndex: number;
  setCurrentSampleIndex: (index: number) => void;
  goToNextSample: () => void;
  goToPrevSample: () => void;
  currentPicIndex: number;
  setCurrentPicIndex: (index: number) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
  getCurrentSample: () => WorkSample | undefined;
  getCurrentPictures: () => string[];
  totalSamples: number;
}

const WorkSampleContext = createContext<WorkSampleContextType | undefined>(
  undefined,
);

export function WorkSampleProvider({
  children,
  data,
}: {
  children: ReactNode;
  data: WorkSample[];
}) {
  // Core state
  const [isWebFrame, setIsWebFrame] = useState(false);
  const [currentSampleIndex, setCurrentSampleIndex] = useState(0);
  const [currentPicIndex, setCurrentPicIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Memoized derived data for better performance
  const mobileData = useMemo(
    () => data.filter((sample) => !sample.isWeb),
    [data],
  );
  const webData = useMemo(() => data.filter((sample) => sample.isWeb), [data]);

  // Calculate current data set based on active tab
  const currentData = useMemo(
    () => (isWebFrame ? webData : mobileData),
    [isWebFrame, webData, mobileData],
  );

  // Get total samples count
  const totalSamples = useMemo(() => currentData.length, [currentData]);

  // Validate current index doesn't exceed bounds when data changes
  useEffect(() => {
    if (currentSampleIndex >= totalSamples) {
      setCurrentSampleIndex(Math.max(0, totalSamples - 1));
    }
  }, [totalSamples, currentSampleIndex]);

  // Reset pic index when sample changes
  useEffect(() => {
    setCurrentPicIndex(0);
  }, [currentSampleIndex, isWebFrame]);

  // Get current sample data
  const getCurrentSample = () => currentData[currentSampleIndex];

  // Get pictures array for current sample
  const getCurrentPictures = () => {
    const sample = getCurrentSample();
    return sample ? sample.pictures.split(" ") : [];
  };

  // Navigation functions
  const goToNextSample = () => {
    if (currentSampleIndex < totalSamples - 1) {
      setCurrentSampleIndex(currentSampleIndex + 1);
    } else {
      setCurrentSampleIndex(0); // Loop back to first
    }
  };

  const goToPrevSample = () => {
    if (currentSampleIndex > 0) {
      setCurrentSampleIndex(currentSampleIndex - 1);
    } else {
      setCurrentSampleIndex(totalSamples - 1); // Loop to last
    }
  };

  const value = {
    data,
    mobileData,
    webData,
    isWebFrame,
    setIsWebFrame,
    currentSampleIndex,
    setCurrentSampleIndex,
    goToNextSample,
    goToPrevSample,
    currentPicIndex,
    setCurrentPicIndex,
    isDrawerOpen,
    setIsDrawerOpen,
    getCurrentSample,
    getCurrentPictures,
    totalSamples,
  };

  return (
    <WorkSampleContext.Provider value={value}>
      {children}
    </WorkSampleContext.Provider>
  );
}

export function useWorkSample() {
  const context = useContext(WorkSampleContext);
  if (context === undefined) {
    throw new Error("useWorkSample must be used within a WorkSampleProvider");
  }
  return context;
}
