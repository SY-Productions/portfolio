"use client";

import { Toaster } from "react-hot-toast";

export default function BlogToaster() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: {
          background: "#1a0505",
          color: "#fff",
          border: "1px solid rgba(90,14,18,0.4)",
        },
      }}
    />
  );
}
