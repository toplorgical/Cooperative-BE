import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        cyan: {
          50: "#1a56db",
          100: "#1a56db",
          200: "#1a56db",
          300: "#1a56db",
          400: "#1a56db",
          500: "#1a56db",
          600: "#1a56db",
          700: "#1a56db",
          800: "#1a56db",
          900: "#1a56db",
        },
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
