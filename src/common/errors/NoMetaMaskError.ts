import { MessageTitle } from "../../components/UI/Overlay/OverlayContent";

export class NoMetaMaskError extends Error {
  constructor() {
    super(MessageTitle.NO_METAMASK);
    this.name = "NoMetaMaskError";
  }
}
