import colors from "tailwindcss/colors";
import defaultTheme from "tailwindcss/defaultTheme";

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xsm: "360px",
      },

      transitionProperty: {
        width: "width",
        spacing: "margin, padding",
        "max-height&opacity": "max-height, opacity",
        "max-height&padding": "max-height, padding",
        "gap&scale": "transform, gap",
      },
      fontFamily: {
        sans: ['"Montserrat"', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        sm: ["var(--font-size-sm)", "calc(var(--font-size-sm)*1.4)"],
        base: ["var(--font-size-base)", "calc(var(--font-size-base)*1.4)"],
        md: ["var(--font-size-md)", "calc(var(--font-size-base)*1.4)"],
        lg: ["var(--font-size-lg)", "calc(var(--font-size-lg)*1.4)"],
        xl: ["var(--font-size-xl)", "calc(var(--font-size-xl)*1.4)"],
        "2xl": ["var(--font-size-2xl)", "calc(var(--font-size-2xl)*1.3)"],
        "3xl": ["var(--font-size-3xl)", "calc(var(--font-size-3xl)*1.3)"],
        "4xl": ["var(--font-size-4xl)", "calc(var(--font-size-4xl)*1.3)"],
        "5xl": ["var(--font-size-5xl)", "calc(var(--font-size-5xl)*1.3)"],
        "6xl": ["var(--font-size-6xl)", "calc(var(--font-size-6xl)*1.3)"],
        "7xl": ["var(--font-size-7xl)", "calc(var(--font-size-7xl)*1.3)"],
      },

      colors: {
        bg_gray: "[#F5F2EB]",
        dark_blue: "#0D2438",
        bg_primary: "#FBFCFF",
        secondary: "var(--secondary_text)",
        bg_dark: "var(--dark_background)",
        bg_secondary: "var(--secondary_text)",
        text_faded: "var(--faded_text)",
        text_primary_light: colors.slate[100],
        text_primary_dark: colors.black,
        text_secondary: "var(--secondary_text)",
        border_light: "var(--border_light)",
        border_grey: "",
        border_dark: "#7B8693",
        overLayColor: "rgba(0, 0, 0 , 0.6)",
        bg_dark_card: colors.gray[800],
        bg_light_card: colors.white,
        deleteRed: colors.red[600],
        bg_grey: "#53535321",
        pink: "#ff536b",
      },
      backgroundImage: {
        bg_gradient_dark:
          "linear-gradient(180deg, rgba(0,0,0,1) 60%, var(--dark_background) 100%)",
        "custom-gradient1": "linear-gradient(90deg, #00BF8F 0%, #001510 100%)",
        "custom-gradient2": "linear-gradient(90deg, #870000 0%, #190A05 100%)",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "100" },
        },
      },

      animation: {
        fadeIn: "fadeIn 1s ease-in-out",
      },
    },
  },
  plugins: [],
};
