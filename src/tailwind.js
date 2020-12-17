const _ = require("lodash"); //eslint-disable-line @typescript-eslint/no-var-requires
const commonUiConfig = require("@govtechsg/tradetrust-ui-components/build/tailwind"); //eslint-disable-line @typescript-eslint/no-var-requires

// https://tailwindcss.com/docs/theme
const localConfig = {
  purge: {
    content: ["./src/**/*.ts", "./src/**/*.tsx", "./node_modules/@govtechsg/tradetrust-ui-components/src/**/*.tsx"],
  },
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      display: ["Roboto", "sans-serif"],
      body: ["Roboto", "sans-serif"],
    },
    extend: {
      inset: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
      },
      minWidth: {
        135: "135px",
        200: "200px",
      },
      minHeight: {
        400: "400px",
        600: "600px",
      },
      colors: {
        blue: {
          300: "#f3f8fc",
          400: "#a6c1ee",
          800: "#001F29",
        },
        orange: {
          300: "#fbd38d",
        },
        green: {
          100: "#f5fbf7",
          400: "#68d391",
        },
        red: {
          100: "#fbeae9",
          200: "#f7d7d7",
          300: "#fc8686",
          400: "#e46767",
          900: "#8b0000",
        },
        yellow: {
          300: "#fff48f",
          default: "#ffe600",
          600: "#ffbf00",
        },
        pink: {
          default: "#fbc2eb",
        },
        greyblue: {
          200: "#e2e8f0",
          700: "#a7afb7",
          900: "#343a40",
        },
      },
    },
  },
};
const finalConfig = _.merge(commonUiConfig, localConfig); // deep merge

module.exports = finalConfig;
