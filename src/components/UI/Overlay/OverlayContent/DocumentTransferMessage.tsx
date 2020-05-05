import React, { useContext } from "react";
import { OverlayContentBaseStyle } from "../Overlay";
import { OverlayContent, OverlayContentProps } from "./index";
import styled from "@emotion/styled";
import { vars, mixin } from "../../../../styles";
import { ButtonSolidOrangeWhite, AnchorLinkButtonSolidOrangeWhite } from "../../Button";
import { OverlayContext } from "../../../../common/contexts/OverlayContext";

interface MessageProps {
  name?: string;
  error?: string;
}

export const MessageNoMetamask = () => {
  return (
    <>
      <p>Oops! It seems like you have not installed the Metamask extension.</p>
      <p>You would need to install it before proceeding.</p>
    </>
  );
};

export const MessageNoUserAuthorization = () => {
  return (
    <>
      <p>Oops! It seems like you did not authorize to use Metamask extension.</p>
    </>
  );
};

export const MessageNoManageAccess = () => {
  return <p>Oops! It seems like you do not have access to manage assets.</p>;
};

export const MessageTransactionError = ({ error }: MessageProps) => {
  return (
    <>
      <p>Oops! It seems like there&apos;s a failed transaction.</p>
      <p>{error}</p>
      <p>Please try again.</p>
    </>
  );
};

export const MessageSurrenderSuccess = () => {
  return <p>This Bill of Lading has been surrendered.</p>;
};

export const MessageBeneficiarySuccess = ({ name }: MessageProps) => {
  return (
    <>
      <h6>Current Beneficiary</h6>
      <p>{name}</p>
    </>
  );
};

export const MessageHolderSuccess = ({ name }: MessageProps) => {
  return (
    <>
      <h6>Current Holder</h6>
      <p>{name}</p>
    </>
  );
};

interface DocumentTransferMessageProps extends OverlayContentProps {
  isMetamaskLink?: boolean;
}

export const DocumentTransferMessage = styled(
  ({ isMetamaskLink, children, ...props }: DocumentTransferMessageProps) => {
    const { setOverlayVisible } = useContext(OverlayContext);
    const handleCloseOverlay = () => {
      setOverlayVisible(false);
    };

    return (
      <OverlayContent {...props}>
        <div className="flex-fill">
          <div className="message">{children}</div>
        </div>
        <div className="row no-gutters">
          <div className="col-auto ml-auto">
            {isMetamaskLink ? (
              <AnchorLinkButtonSolidOrangeWhite
                href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                Install Metamask
              </AnchorLinkButtonSolidOrangeWhite>
            ) : (
              <ButtonSolidOrangeWhite onClick={handleCloseOverlay}>Close</ButtonSolidOrangeWhite>
            )}
          </div>
        </div>
      </OverlayContent>
    );
  }
)`
  ${OverlayContentBaseStyle()}

  max-width: 420px;
  height: auto;

  .overlay-title {
    ${mixin.fontSize(24)};
  }

  .message {
    h6 {
      ${mixin.fontSourcesansproBold};
      color: ${vars.greyDark};
    }
  }
`;
