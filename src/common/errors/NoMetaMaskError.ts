import { MessageTitle } from "@tradetrust-tt/tradetrust-ui-components";

export class NoMetaMaskError extends Error {
  constructor() {
    super(MessageTitle.NO_METAMASK);
    this.name = "NoMetaMaskError";
  }
}
