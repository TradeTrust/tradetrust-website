const _ = require("lodash");
const commonUiConfig = require("@govtechsg/tradetrust-ui-components/build/tailwind");

// https://tailwindcss.com/docs/theme
const localConfig = {
  // future: {
  //   removeDeprecatedGapUtilities: true,
  //   purgeLayersByDefault: true,
  // },
  // purge: ["./src/**/*.ts", "./src/**/*.tsx"], // not to purge, cos common ui might need certain styles (should purge specific layers instead if really need)
  theme: {
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      display: ["Roboto", "sans-serif"],
      body: ["Roboto", "sans-serif"],
    },
    extend: {
      minWidth: {
        135: "135px",
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
          default: "#ffe600",
          600: "#ffbf00",
        },
        pink: {
          default: "#fbc2eb",
        },
        greyblue: {
          default: "#c1c9d1",
          700: "#a7afb7",
          900: "#343a40",
        },
      },
    },
  },
};
const finalConfig = _.merge(commonUiConfig, localConfig); // deep merge

module.exports = finalConfig;
