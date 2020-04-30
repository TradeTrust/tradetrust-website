import { action } from "@storybook/addon-actions";
import { OverlayProvider } from "../common/contexts/OverlayContext";

// https://www.npmjs.com/package/@storybook/addon-contexts
export const contexts = [
  {
    icon: "box",
    title: "Overlays",
    components: [OverlayProvider],
    params: [
      {
        name: "Overlay",
        props: {
          value: {
            overlayId: "",
            setOverlayId: () => {
              action("Set overlay ID")();
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
