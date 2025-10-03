import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "360px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        a: "#1B5B5C",
        b: "#0F3D3E",
        c: "#171717",
        d: "#2A9D9A",
      },
    },
  },
  daisyui: {
    themes: [],
  },
  plugins: [require("daisyui")],
};
export default config;
