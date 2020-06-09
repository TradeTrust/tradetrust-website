import React, { useContext } from "react";
import { OverlayContextProvider } from "./../../../common/contexts/OverlayContext";
import { OverlayContext } from "./../../../common/contexts/OverlayContext";
import { Overlay, OverlayUnStyled } from "./Overlay";
import { Textual } from "./OverlayContent/Textual";
import { Youtube } from "./OverlayContent/Youtube";
import { AddressBook } from "./OverlayContent/AddressBook";
import { DeleteResolverConfirmation } from "./OverlayContent/DeleteResolverConfirmation";
import {
  MessageTitle,
  DocumentTransferMessage,
  MessageNoMetamask,
  MessageNoManageAccess,
  MessageNoUserAuthorization,
  MessageTransactionError,
  MessageSurrenderSuccess,
  MessageBeneficiarySuccess,
  MessageHolderSuccess,
  MessageNominateBeneficiaryHolderSuccess,
} from "./OverlayContent/DocumentTransferMessage";
import { ButtonSolid } from "./../../UI/Button";

interface OverlayDemoProps {
  buttonText: string;
  children: React.ReactNode;
}

const OverlayDemo = ({ buttonText, children }: OverlayDemoProps) => {
  const { showOverlay } = useContext(OverlayContext);

  return (
    <>
      <Overlay />
      <ButtonSolid onClick={() => showOverlay(children)}>{buttonText}</ButtonSolid>
    </>
  );
};

export default {
  title: "UI/Overlay",
  component: OverlayUnStyled,
  parameters: {
    componentSubtitle:
      "Types of overlays, Textual, Video, AddressBook, Metamask messages, Document transfer messages, Address resolver messages.",
  },
};

export const Text = () => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Text">
        <Textual title="Textual">
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
            sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
            ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
            nulla pariatur
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
            sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
            ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
            nulla pariatur
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
            sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
            ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
            nulla pariatur
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
            sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
            ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
            nulla pariatur
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
            sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
            suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in
            ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas
            nulla pariatur
          </p>
        </Textual>
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const Video = () => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Video">
        <Youtube title="Digitalising Trust for Cross-Border Trade" youtubeId="udvPQyuqEug" />
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const AddressBookEmpty = () => {
  const addressBook = {};
  localStorage.setItem("ADDRESS_BOOK", JSON.stringify(addressBook));

  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Address Book Empty">
        <AddressBook title="Address Book" />
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const AddressBookPopulated = () => {
  const addressBook = {
    "0xe94e4f16ad40adc90c29dc85b42f1213e034947c": "Bank of China",
    "0xa61b056da0084a5f391ec137583073096880c2e3": "DBS",
    "0x1d350495b4c2a51fbf1c9dedadeab288250c703e": "China Oil",
    "0x28f7ab32c521d13f2e6980d072ca7ca493020145": "Standard Chartered",
    "0xa": "Name A",
    "0xb": "Name B",
    "0xc": "Name C",
    "0xd": "Name D",
    "0xe": "Name E",
    "0xf": "Name F",
    "0xg": "Name G",
    "0xh": "Name H",
  };
  localStorage.setItem("ADDRESS_BOOK", JSON.stringify(addressBook));

  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Address Book Populated">
        <AddressBook title="Address Book" />
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const NoMetamask = () => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="No Metamask">
        <DocumentTransferMessage title={MessageTitle.NO_METAMASK} isSuccess={false} isButtonMetamaskInstall={true}>
          <MessageNoMetamask />
        </DocumentTransferMessage>
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const NoManageAccess = () => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="No Manage Access">
        <DocumentTransferMessage title={MessageTitle.NO_MANAGE_ACCESS} isSuccess={false}>
          <MessageNoManageAccess />
        </DocumentTransferMessage>
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const NoUserAuthorization = () => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="No User Authorization">
        <DocumentTransferMessage title={MessageTitle.NO_USER_AUTHORIZATION} isSuccess={false}>
          <MessageNoUserAuthorization />
        </DocumentTransferMessage>
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const FailTransaction = () => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Fail Transaction">
        <DocumentTransferMessage title={MessageTitle.TRANSACTION_ERROR} isSuccess={false}>
          <MessageTransactionError error="Blockchain error message" />
        </DocumentTransferMessage>
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const SuccessSurrender = () => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Success Surrender">
        <DocumentTransferMessage title={MessageTitle.SURRENDER_DOCUMENT_SUCCESS} isSuccess={true}>
          <MessageSurrenderSuccess />
        </DocumentTransferMessage>
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const SuccessChangeBeneficiary = () => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Success Change Beneficiary">
        <DocumentTransferMessage title={MessageTitle.CHANGE_BENEFICIARY_SUCCESS} isSuccess={true}>
          <MessageBeneficiarySuccess address="Bank of China Pte Ltd" />
        </DocumentTransferMessage>
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const SuccessChangeHolder = () => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Success Change Holder">
        <DocumentTransferMessage title={MessageTitle.TRANSFER_HOLDER_SUCCESS} isSuccess={true}>
          <MessageHolderSuccess address="Bank of China Pte Ltd" />
        </DocumentTransferMessage>
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const SuccessNominateBeneficiaryHolder = () => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Success Nominate Beneficiary and Holder">
        <DocumentTransferMessage title={MessageTitle.NOMINATE_BENEFICIARY_HOLDER_SUCCESS} isSuccess={true}>
          <MessageNominateBeneficiaryHolderSuccess />
        </DocumentTransferMessage>
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const DeleteAddressResolver = () => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Delete Address Resolver">
        <DeleteResolverConfirmation
          title="Delete Address Resolver"
          name="Swift"
          deleteAddress={() => {
            alert("delete address");
          }}
        />
      </OverlayDemo>
    </OverlayContextProvider>
  );
};
