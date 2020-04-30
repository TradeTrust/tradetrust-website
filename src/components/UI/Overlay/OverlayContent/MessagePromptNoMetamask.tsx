import React from "react";
import { OverlayContentBaseStyle } from "../Overlay";
import { OverlayContent, OverlayContentProps } from "./index";
import styled from "@emotion/styled";
import { mixin } from "../../../../styles";
import { AnchorLinkButtonSolidOrangeWhite } from "../../Button";

export const MessagePromptNoMetamask = styled(({ ...props }: OverlayContentProps) => {
  return (
    <OverlayContent {...props}>
      <div className="flex-fill">
        <p>Oops! It seems like you have not installed the Metamask extension.</p>
        <p>You would need to install it before proceeding.</p>
      </div>
      <div className="row no-gutters">
        <div className="col-auto ml-auto">
          <AnchorLinkButtonSolidOrangeWhite
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
            target="_blank"
            rel="noopener noreferrer"
          >
            Install Metamask
          </AnchorLinkButtonSolidOrangeWhite>
        </div>
      </div>
    </OverlayContent>
  );
})`
  ${OverlayContentBaseStyle()}

  max-width: 400px;
  max-height: 240px;

  .overlay-title {
    ${mixin.fontSize(26)};
  }
`;
