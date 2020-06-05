import styled from "@emotion/styled";
import React, { useContext } from "react";
import { OverlayContext } from "../../../../common/contexts/OverlayContext";
import { mixin, vars } from "../../../../styles";
import { AnchorLinkButtonSolidOrangeWhite, ButtonSolidOrangeWhite } from "../../Button";
import { OverlayContentBaseStyle } from "../Overlay";
import { OverlayContent, OverlayContentProps } from "./index";
import { MessageAddressResolver } from "./MessageAddressResolver";

export enum MessageTitle {
  NO_METAMASK = "Metamask not installed",
  NO_MANAGE_ACCESS = "No manage assets access",
  NO_USER_AUTHORIZATION = "User denied account authorization", // this error message must match error message from metamask extension itself
  TRANSACTION_ERROR = "Error - Failed transaction",
  SURRENDER_DOCUMENT_SUCCESS = "Surrender Document Success",
  CHANGE_BENEFICIARY_SUCCESS = "Change Beneficiary Success",
  NOMINATE_BENEFICIARY_HOLDER_SUCCESS = "Nomination Success",
  TRANSFER_HOLDER_SUCCESS = "Transfer Holder Success",
  ENDORSE_TRANSFER_SUCCESS = "Endorse Beneficiary/Holder Success",
}

const ButtonClose = () => {
  const { setOverlayVisible } = useContext(OverlayContext);
  const handleCloseOverlay = () => {
    setOverlayVisible(false);
  };

  return <ButtonSolidOrangeWhite onClick={handleCloseOverlay}>Close</ButtonSolidOrangeWhite>;
};

const ButtonMetamaskInstall = () => {
  return (
    <AnchorLinkButtonSolidOrangeWhite
      href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
      target="_blank"
      rel="noopener noreferrer"
    >
      Install Metamask
    </AnchorLinkButtonSolidOrangeWhite>
  );
};

interface DocumentTransferMessageProps extends OverlayContentProps {
  children: React.ReactNode;
  isButtonMetamaskInstall?: boolean;
}

export const DocumentTransferMessage = styled(
  ({ isButtonMetamaskInstall, children, ...props }: DocumentTransferMessageProps) => {
    const documentTransferButton = () => {
      if (isButtonMetamaskInstall) {
        return <ButtonMetamaskInstall />;
      }
      return <ButtonClose />;
    };

    return (
      <OverlayContent {...props}>
        <div className="flex-fill">
          <div className="message">{children}</div>
        </div>
        <div className="row no-gutters">
          <div className="col-auto ml-auto">{documentTransferButton()}</div>
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

interface MessageProps {
  address?: string;
  error?: string;
  beneficiaryAddress?: string;
  holderAddress?: string;
}

export const MessageNoMetamask = () => {
  return (
    <>
      <p>Oops! It seems like you have not installed the Metamask extension.</p>
      <p>You would need to install it before proceeding.</p>
    </>
  );
};

export const MessageNoManageAccess = () => {
  return <p>Oops! It seems like you do not have access to manage assets.</p>;
};

export const MessageNoUserAuthorization = () => {
  return (
    <>
      <p>Oops! It seems like you did not authorize to use Metamask extension.</p>
    </>
  );
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
  return <p>This transferable document has been surrendered.</p>;
};

export const MessageBeneficiarySuccess = ({ address }: MessageProps) => {
  return (
    <>
      <h6>Current Beneficiary</h6>
      {address && <MessageAddressResolver address={address} />}
    </>
  );
};

export const MessageHolderSuccess = ({ address }: MessageProps) => {
  return (
    <>
      <h6>Current Holder</h6>
      {address && <MessageAddressResolver address={address} />}
    </>
  );
};

export const MessageNominateBeneficiaryHolderSuccess = () => {
  return <p>Document has been nominated successfully. Please notify holder to execute transfer.</p>;
};

export const MessageEndorseTransferSuccess = ({ beneficiaryAddress, holderAddress }: MessageProps) => {
  return (
    <>
      <h6>Current Beneficiary</h6>
      {beneficiaryAddress && <MessageAddressResolver address={beneficiaryAddress} />}
      <div />
      <h6>Current Holder</h6>
      {holderAddress && <MessageAddressResolver address={holderAddress} />}
    </>
  );
};

interface ShowDocumentTransferMessageOptionProps {
  isSuccess: boolean;
  error?: string;
  beneficiaryAddress?: string;
  holderAddress?: string;
  isButtonMetamaskInstall?: boolean;
}

export const showDocumentTransferMessage = (title: string, option: ShowDocumentTransferMessageOptionProps) => {
  return (
    <DocumentTransferMessage
      title={title}
      isSuccess={option.isSuccess}
      isButtonMetamaskInstall={option.isButtonMetamaskInstall}
    >
      {title === MessageTitle.NO_METAMASK && <MessageNoMetamask />}
      {title === MessageTitle.NO_MANAGE_ACCESS && <MessageNoManageAccess />}
      {title === MessageTitle.NO_USER_AUTHORIZATION && <MessageNoUserAuthorization />}
      {title === MessageTitle.TRANSACTION_ERROR && <MessageTransactionError error={option.error} />}
      {title === MessageTitle.SURRENDER_DOCUMENT_SUCCESS && <MessageSurrenderSuccess />}
      {title === MessageTitle.CHANGE_BENEFICIARY_SUCCESS && (
        <MessageBeneficiarySuccess address={option.beneficiaryAddress} />
      )}
      {title === MessageTitle.NOMINATE_BENEFICIARY_HOLDER_SUCCESS && <MessageNominateBeneficiaryHolderSuccess />}
      {title === MessageTitle.TRANSFER_HOLDER_SUCCESS && <MessageHolderSuccess address={option.holderAddress} />}
      {title === MessageTitle.ENDORSE_TRANSFER_SUCCESS && (
        <MessageEndorseTransferSuccess
          beneficiaryAddress={option.beneficiaryAddress}
          holderAddress={option.holderAddress}
        />
      )}
    </DocumentTransferMessage>
  );
};
