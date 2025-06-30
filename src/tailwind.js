const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

const localConfig = {
  content: [`./src/**/*.{ts,tsx,js,jsx}`],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    container: (theme) => ({
      center: true,
      padding: theme("spacing.4"),
    }),
    borderColor: (theme) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.cloud.100", "currentColor"),
    }),
    backgroundImage: {
      "single-wave": "url('/static/images/home/mainBenefits/single-wave.png')",
      "wave-lines-light": "url('/static/images/common/wave-lines-light.png')",
    },
    fontFamily: {
      sans: ["Gilroy-Medium", "sans-serif"],
      display: ["Gilroy-Medium", "sans-serif"],
      body: ["Gilroy-Medium", "sans-serif"],
      "gilroy-light": ["Gilroy-Light", "sans-serif"],
      "gilroy-medium": ["Gilroy-Medium", "sans-serif"],
      "gilroy-bold": ["Gilroy-Bold", "sans-serif"],
      "gilroy-extrabold": ["Gilroy-ExtraBold", "sans-serif"],
      ubuntu: ["Ubuntu", "sans-serif"],
    },
    extend: {
      inset: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
      },
      transitionProperty: {
        height: "max-height",
      },
      boxShadow: {
        default: `0 0 0 8px #f3f4f6`, // try to reuse tw colors if can
        accept: `0 0 0 8px #f5fbf7`, // try to reuse tw colors if can
        warning: `0 0 0 8px #ffe600`, // try to reuse tw colors if can
        invalid: `0 0 0 8px #ff5268`, // try to reuse tw colors if can
        dropdown: `0px 4px 20px rgba(0, 0, 0, 0.15)`, // try to reuse tw colors if can
      },
      height: {
        120: "30rem",
        132: "33rem",
        160: "40rem",
      },
      width: {
        104: "26rem",
      },
      maxWidth: {
        132: "33rem",
        172: "43rem",
      },
      minHeight: {
        18: "4.5rem",
      },
      opacity: {
        0: "0",
        10: ".1",
        20: ".2",
        30: ".3",
        40: ".4",
        50: ".5",
        60: ".6",
        70: ".7",
        80: ".8",
        90: ".9",
        100: "1",
      },
      transitionDuration: {
        0: "0ms",
        400: "400ms",
      },
      transitionTimingFunction: {
        "out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
      },
      colors: {
        cerulean: {
          50: "#F7F8FC",
          300: "#4DA6E8",
          500: "#2D5FAA",
          800: "#265190",
        },
        tangerine: {
          300: "#fbd38d",
          500: "#FF8200",
          800: "#DB611D",
        },
        lemon: {
          100: "#fff7e2",
          500: "#FDC53F",
          700: "#E3A002",
        },
        scarlet: {
          100: "#ffeeed",
          400: "#ff5268",
          500: "#E62617",
        },
        forest: {
          200: "#68d391",
          500: "#3AAF86",
          700: "#008a35",
        },
        cloud: {
          100: "#E7EAEC",
          200: "#D1D5D9",
          300: "#B4BCC2",
          400: "#89969F",
          500: "#6E787F",
          800: "#454B50",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".backface-visible": {
          backfaceVisibility: "visible",
        },
        ".backface-invisible": {
          backfaceVisibility: "hidden",
        },
      });
    }),
  ],
};

module.exports = localConfig;
