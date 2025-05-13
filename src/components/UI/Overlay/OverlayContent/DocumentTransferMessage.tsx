import React, { FunctionComponent, ReactNode } from "react";
import { useOverlayContext } from "../../../../common/contexts/OverlayContext";
import { Button, LinkButton } from "../../../Button";
import { OverlayContent, OverlayContentProps } from "./index";
import { MessageAddressResolver } from "./MessageAddressResolver";

export enum MessageTitle {
  NO_METAMASK = "Metamask not installed",
  NO_MANAGE_ACCESS = "No manage assets access",
  NO_USER_AUTHORIZATION = "User denied account authorization", // this error message must match error message from metamask extension itself
  TRANSACTION_ERROR = "Error - Failed transaction",
  SURRENDER_DOCUMENT_SUCCESS = "Return of ETR successful",
  ACCEPT_SURRENDER_DOCUMENT = "Return of ETR accepted",
  REJECT_SURRENDER_DOCUMENT = "Return of this ETR has been rejected by the Issuer",
  CONFIRM_REJECT_SURRENDER_DOCUMENT = "Confirm Document Return",
  CHANGE_BENEFICIARY_SUCCESS = "Change Owner Success",
  NOMINATE_BENEFICIARY_HOLDER_SUCCESS = "Nomination Success",
  TRANSFER_HOLDER_SUCCESS = "Transfer Holder Success",
  ENDORSE_TRANSFER_SUCCESS = "Endorse Ownership/Holdership Success",
}

interface ButtonCloseProps {
  className?: string;
}

export const ButtonClose: FunctionComponent<ButtonCloseProps> = ({ className }) => {
  const { closeOverlay } = useOverlayContext();

  return (
    <Button
      className={`bg-cerulean-500 rounded-xl text-white px-3 py-2 hover:bg-cerulean-800 ${className}`}
      onClick={closeOverlay}
    >
      Dismiss
    </Button>
  );
};

const ButtonMetamaskInstall: FunctionComponent = () => {
  return (
    <LinkButton
      className="bg-cerulean-500 rounded-xl text-white hover:text-white hover:bg-cerulean-800"
      href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
      target="_blank"
      rel="noreferrer noopener"
    >
      Install Metamask
    </LinkButton>
  );
};

const ButtonConfirmAction = (handleOnClick: () => void): ReactNode => {
  const { closeOverlay } = useOverlayContext();
  const onClick = (): void => {
    handleOnClick();
    closeOverlay();
  };
  return (
    <Button
      className="bg-cerulean-500 rounded-xl text-white hover:bg-cerulean-800"
      onClick={onClick}
      data-testid={"confirmActionBtn"}
    >
      Confirm
    </Button>
  );
};

interface DocumentTransferMessageProps extends OverlayContentProps {
  children: React.ReactNode;
  isButtonMetamaskInstall?: boolean;
  isConfirmationMessage?: boolean;
  onConfirmationAction?: () => void;
  footer?: React.ReactNode;
}

export const DocumentTransferMessage: FunctionComponent<DocumentTransferMessageProps> = ({
  isButtonMetamaskInstall,
  isConfirmationMessage,
  onConfirmationAction,
  children,
  footer,
  ...props
}) => {
  const documentTransferButton = (): ReactNode => {
    if (isButtonMetamaskInstall) {
      return <ButtonMetamaskInstall />;
    }
    if (isConfirmationMessage && onConfirmationAction) {
      return (
        <div className="flex mx-0">
          <div className="col-auto ml-2">
            <ButtonClose />
          </div>
          <div className="col-auto ml-2">{ButtonConfirmAction(onConfirmationAction)}</div>
        </div>
      );
    }
    return footer ? footer : <ButtonClose />;
  };

  return (
    <OverlayContent className="max-w-lg bg-white" {...props}>
      <div className="flex-1 mb-4">{children}</div>
      <div className="flex mx-0">
        <div className="flex w-full col-auto justify-center">{documentTransferButton()}</div>
      </div>
    </OverlayContent>
  );
};

interface MessageProps {
  address?: string;
  error?: string;
  beneficiaryTitle?: string;
  beneficiaryAddress?: string;
  holderTitle?: string;
  holderAddress?: string;
}

export const MessageNoMetamask: FunctionComponent = () => {
  return (
    <>
      <p className="mt-3">Oops! It seems like you have not installed the Metamask extension.</p>
      <p className="mt-3">You would need to install it before proceeding.</p>
    </>
  );
};

export const MessageNoManageAccess: FunctionComponent = () => {
  return <p className="mt-3">Oops! It seems like you do not have access to manage assets.</p>;
};

export const MessageNoUserAuthorization: FunctionComponent = () => {
  return (
    <>
      <p className="mt-3">Oops! It seems like you did not authorize to use Metamask extension.</p>
    </>
  );
};

export const MessageTransactionError: FunctionComponent<MessageProps> = ({ error }) => {
  return (
    <>
      <p className="mt-3">Oops! It seems like there&apos;s a failed transaction.</p>
      <p className="mt-3">{error}</p>
      <p className="mt-3">Please try again.</p>
    </>
  );
};

export const MessageSurrenderSuccess: FunctionComponent = () => {
  return <p className="mt-3">This ETR has been returned, pending acceptance by the Issuer.</p>;
};

export const AcceptSurrender: FunctionComponent = () => {
  return <p className="mt-3">This ETR has been taken out of circulation by the Issuer.</p>;
};

export const RejectSurrender: FunctionComponent = () => {
  return <p className="mt-3">Return for this ETR has been rejected by the Issuer.</p>;
};

export const MessageRejectSurrenderConfirmation: FunctionComponent<MessageProps> = ({
  beneficiaryAddress,
  holderAddress,
}) => {
  return (
    <MessageTransferSuccess
      beneficiaryTitle="Restore document to Owner:"
      beneficiaryAddress={beneficiaryAddress}
      holderTitle="and to Holder:"
      holderAddress={holderAddress}
    />
  );
};

export const MessageBeneficiarySuccess: FunctionComponent<MessageProps> = ({ address }) => {
  return <MessageTransferSuccess beneficiaryAddress={address} />;
};

export const MessageHolderSuccess: FunctionComponent<MessageProps> = ({ address }) => {
  return <MessageTransferSuccess holderAddress={address} />;
};

export const MessageNominateBeneficiaryHolderSuccess: FunctionComponent = () => {
  return <p className="mt-3">Document has been nominated successfully. Please notify holder to execute transfer.</p>;
};

export const MessageEndorseTransferSuccess: FunctionComponent<MessageProps> = ({
  beneficiaryAddress,
  holderAddress,
}) => {
  return <MessageTransferSuccess beneficiaryAddress={beneficiaryAddress} holderAddress={holderAddress} />;
};

export const MessageTransferSuccess: FunctionComponent<MessageProps> = ({
  beneficiaryTitle = "Current Owner",
  beneficiaryAddress,
  holderTitle = "Current Holder",
  holderAddress,
}) => {
  return (
    <>
      {beneficiaryAddress && (
        <>
          <h6 className="mt-3">{beneficiaryTitle}</h6>
          {beneficiaryAddress && <MessageAddressResolver address={beneficiaryAddress} />}
        </>
      )}
      {holderAddress && (
        <>
          <h6 className="mt-3">{holderTitle}</h6>
          {holderAddress && <MessageAddressResolver address={holderAddress} />}
        </>
      )}
    </>
  );
};

interface ShowDocumentTransferMessageOptionProps {
  isSuccess: boolean;
  error?: string;
  beneficiaryTitle?: string;
  beneficiaryAddress?: string;
  holderTitle?: string;
  holderAddress?: string;
  isButtonMetamaskInstall?: boolean;
  onConfirmationAction?: () => void;
  isConfirmationMessage?: boolean;
}

export const showDocumentTransferMessage = (
  title: string,
  option: ShowDocumentTransferMessageOptionProps,
  footer?: React.ReactNode
): ReactNode => {
  return (
    <DocumentTransferMessage
      title={title}
      isSuccess={option.isSuccess}
      isButtonMetamaskInstall={option.isButtonMetamaskInstall}
      onConfirmationAction={option.onConfirmationAction}
      isConfirmationMessage={option.isConfirmationMessage}
      footer={footer}
    >
      {title === MessageTitle.NO_METAMASK && <MessageNoMetamask />}
      {title === MessageTitle.NO_MANAGE_ACCESS && <MessageNoManageAccess />}
      {title === MessageTitle.NO_USER_AUTHORIZATION && <MessageNoUserAuthorization />}
      {title === MessageTitle.TRANSACTION_ERROR && <MessageTransactionError error={option.error} />}
      {title === MessageTitle.SURRENDER_DOCUMENT_SUCCESS && <MessageSurrenderSuccess />}
      {title === MessageTitle.ACCEPT_SURRENDER_DOCUMENT && <AcceptSurrender />}
      {title === MessageTitle.REJECT_SURRENDER_DOCUMENT && <RejectSurrender />}
      {title === MessageTitle.CONFIRM_REJECT_SURRENDER_DOCUMENT && (
        <MessageRejectSurrenderConfirmation
          beneficiaryAddress={option.beneficiaryAddress}
          holderAddress={option.holderAddress}
        />
      )}
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
      {!(Object.values(MessageTitle) as string[]).includes(title) && title?.length > 0 && (
        <MessageTransferSuccess {...option} />
      )}
    </DocumentTransferMessage>
  );
};
