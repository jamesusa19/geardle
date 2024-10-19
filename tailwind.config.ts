import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': {opacity: '0'},
          '100%': {opacity: '100'}
        }
      },
      colors: {
        gred: "rgb(var(--color-gred))",
        ggray: "rgb(var(--color-ggray))",
      },
    },
  },
  plugins: [],
}
export default config
