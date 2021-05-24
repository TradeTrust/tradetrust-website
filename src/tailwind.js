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
      sans: ["Roboto", "sans-serif"],
      display: ["Roboto", "sans-serif"],
      body: ["Roboto", "sans-serif"],
      ubuntu: ["Ubuntu", "sans-serif"],
    },
    extend: {
      // START - to shift/consolidate this later in common-ui
      colors: {
        brand: {
          100: "#F7F8FC",
        },
      },
      // END - to shift/consolidate this later in common-ui
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
      minWidth: {
        135: "135px",
        200: "200px",
        220: "220px",
      },
      maxWidth: {
        220: "220px",
      },
      height: {
        140: "35rem",
      },
      minHeight: {
        90: "90px",
        220: "220px",
        400: "400px",
        600: "600px",
      },
      boxShadow: {
        default: `0 0 0 8px ${commonUiConfig.theme.extend.colors.blue["300"]}`,
        accept: `0 0 0 8px ${commonUiConfig.theme.extend.colors.green["100"]}`,
        warning: `0 0 0 8px ${commonUiConfig.theme.extend.colors.yellow}`,
        invalid: `0 0 0 8px ${commonUiConfig.theme.extend.colors.red["200"]}`,
      },
      backgroundImage: () => ({
        "homepage-map": "url('/static/images/home/map.png')",
      }),
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
};
const finalConfig = _.merge(commonUiConfig, localConfig); // deep merge

module.exports = finalConfig;
