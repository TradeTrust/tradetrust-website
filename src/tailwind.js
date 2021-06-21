const _ = require("lodash"); //eslint-disable-line @typescript-eslint/no-var-requires
const commonUiConfig = require("@govtechsg/tradetrust-ui-components/build/tailwind"); //eslint-disable-line @typescript-eslint/no-var-requires

// https://tailwindcss.com/docs/theme
const localConfig = {
  purge: {
    content: [
      "./src/**/*.ts",
      "./src/**/*.tsx",
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./node_modules/@govtechsg/tradetrust-ui-components/src/**/*.tsx",
    ],
  },
  theme: {
    fontFamily: {
      roboto: ["Roboto", "sans-serif"],
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
        "-24": "-6rem",
        "50%": "50%",
      },
      fontSize: {
        "4.5xl": [
          "2.5rem",
          {
            letterSpacing: "-0.02em",
            lineHeight: "44px",
          },
        ],
      },
      minWidth: {
        135: "135px",
        200: "200px",
        xxs: "15.5rem",
      },
      maxWidth: {
        46: "11.5rem",
        220: "220px",
        xxs: "15.5rem",
        xxxs: "12.5rem",
      },
      height: {
        140: "35rem",
      },
      minHeight: {
        400: "400px",
        600: "600px",
      },
      maxHeight: {
        0: "0",
        120: "40rem",
        full: "1000px",
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
      cursor: {
        grab: "grab",
        grabbing: "grabbing",
      },
      backgroundPosition: {
        "center-right": "center right",
      },
      backgroundSize: {
        "135%": "135%",
      },
      margin: {
        "-10%": "-10%",
        "85%": "85%",
      },
    },
  },
  variants: {
    cursor: ["responsive", "hover", "focus", "active"],
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};

const finalConfig = _.merge(commonUiConfig, localConfig); // deep merge

module.exports = finalConfig;
