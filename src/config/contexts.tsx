import { OverlayProvider } from "./../common/context/OverlayContext";

export const contexts = [
  {
    icon: "box",
    title: "Overlay",
    components: [OverlayProvider],
    params: [
      {
        name: "OverlayContext",
        props: {
          value: {
            overlayId: "",
            setOverlayId: () => {
              console.log("set id");
            },
            isOverlayVisible: false,
            setOverlayVisible: () => {
              console.log("set visible");
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
