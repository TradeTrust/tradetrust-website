const merge = require("lodash/merge");
const commonUiConfig = require("@govtechsg/tradetrust-ui-components/build/tailwind"); //eslint-disable-line @typescript-eslint/no-var-requires
const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

const localConfig = {
  content: [
    `./src/**/*.{ts,tsx,js,jsx}`,
    "./node_modules/@govtechsg/tradetrust-ui-components/src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    screens: {
      xs: "475px",
      ...defaultTheme.screens,
    },
    backgroundImage: {
      "single-wave": "url('/static/images/home/mainBenefits/single-wave.png')",
      "wave-lines-light": "url('/static/images/common/wave-lines-light.png')",
    },
    fontFamily: {
      sans: ["Gilroy-Medium", "sans-serif"],
      display: ["Gilroy-Medium", "sans-serif"],
      body: ["Gilroy-Medium", "sans-serif"],
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

const finalConfig = merge(commonUiConfig, localConfig); // deep merge

module.exports = finalConfig;
