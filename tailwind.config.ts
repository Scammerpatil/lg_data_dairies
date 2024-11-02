import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  screens: {
    xs: "450px",
    sm: "575px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
    "2xl": "1400px",
  },
  extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
    },
  },
  boxShadow: {
    signUp: "0px 5px 10px rgba(4, 10, 34, 0.2)",
    one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
    two: "0px 5px 10px rgba(6, 8, 15, 0.1)",
    three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
    sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
    "sticky-dark": "inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)",
    "feature-2": "0px 10px 40px rgba(48, 86, 211, 0.12)",
    submit: "0px 5px 20px rgba(4, 10, 34, 0.1)",
    "submit-dark": "0px 5px 20px rgba(4, 10, 34, 0.1)",
    btn: "0px 1px 2px rgba(4, 10, 34, 0.15)",
    "btn-hover": "0px 1px 2px rgba(0, 0, 0, 0.15)",
    "btn-light": "0px 1px 2px rgba(0, 0, 0, 0.1)",
  },
  dropShadow: {
    three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
  },
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: true,
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: true,
    themeRoot: ":root",
  },
};
export default config;
