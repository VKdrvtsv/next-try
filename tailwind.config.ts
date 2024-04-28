import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        "270": "270px",
        "480": "480px",
      },
      height: {
        "480": "480px",
      },
      backgroundColor: {
        "coverOpacity": "rgba(22, 28, 36, 0.64)",
      },
      lineHeight: {
        "48": "48px",
      },
      maxWidth: {
        "720": "720px",
      }
    },
  },
  plugins: [],
};
export default config;
