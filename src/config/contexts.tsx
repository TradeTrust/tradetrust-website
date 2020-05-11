import { action } from "@storybook/addon-actions";
import { OverlayContextProvider } from "../common/contexts/OverlayContext";

// https://www.npmjs.com/package/@storybook/addon-contexts
export const contexts = [
  {
    icon: "box",
    title: "Overlays",
    components: [OverlayContextProvider],
    params: [
      {
        name: "Overlay",
        props: {
          value: {
            overlayContent: undefined,
            setOverlayContent: () => {
              action("Set overlay Content")();
            },
            isOverlayVisible: false,
            setOverlayVisible: () => {
              action("Close overlay")(); // https://github.com/storybookjs/storybook/issues/1153#issuecomment-442165039
            },
          },
        },
        default: true,
      },
    ],
    options: {
      deep: true,
      disable: false,
      cancelable: true,
    },
  },
];
