import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef9ff",
          500: "#0099ff",
          700: "#0066cc"
        }
      }
    }
  },
  plugins: []
};

export default config;
