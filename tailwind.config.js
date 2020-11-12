module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    container: (theme) => ({
      center: true,
      padding: theme("spacing.4"),
    }),
    extend: {
      colors: {
        brand: {
          blue: "#0099cc",
          orange: "#ff9933",
          navy: "#324353",
        },
        grey: {
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#dddddd",
          500: "#8f8f8f",
          700: "#5a5a5a",
          800: "#4f4f4f",
        },
        greyblue: {
          default: "#c1c9d1",
          dark: "#a7afb7",
          darker: "#343a40",
        },
        blue: {
          lightest: "#f5f8fb",
          lighter: "#f3f8fc",
          light: "#a6c1ee",
          default: "#099de3",
          dark: "#001F29",
        },
        navy: {
          default: "#324353",
        },
        orange: {
          lighter: "#fbd38d",
          default: "#ffb152",
          dark: "#ed8936",
        },
        green: {
          lightest: "#f5fbf7",
          lighter: "#68d391",
          default: "#00c04a",
          dark: "#38a169",
          darker: "#001f29",
        },
        teal: {
          lighter: "#e5f9f8",
          default: "#00cbbc",
        },
        pink: {
          default: "#fbc2eb",
        },
        red: {
          lighter: "#fbeae9",
          default: "#ff5268",
          dark: "#8b0000",
        },
        white: {
          default: "#ffffff",
        },
        black: {
          light: "#212529",
          default: "#000000",
        },
        offblack: {
          default: "#212529",
        },
      },
    },
  },
  variants: {},
  plugins: [],
}
