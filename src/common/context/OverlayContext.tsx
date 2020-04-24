import React from "react";

export enum OverlayId {
  VideoCrossBorderTrade = "video-cross-border-trade",
  AddressBook = "address-book",
  MessagePromptNoMetamask = "message-prompt-no-metamask",
  MessagePromptNoManageAccess = "message-prompt-no-manage-access",
}

interface OverlayProps {
  overlayId: string;
  setOverlayId: (overlayId: string) => void;
  isOverlayVisible: boolean;
  setOverlayVisible: (isOverlayVisible: boolean) => void;
}

export const OverlayContext = React.createContext({} as OverlayProps);

export const OverlayProvider = OverlayContext.Provider;
export const OverlayConsumer = OverlayContext.Consumer;
