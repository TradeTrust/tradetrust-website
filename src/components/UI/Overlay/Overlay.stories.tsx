import { Button } from "@tradetrust-tt/tradetrust-ui-components";
import React, { ReactElement } from "react";
import { OverlayContextProvider, useOverlayContext } from "../../../common/contexts/OverlayContext";
import { Overlay } from "./Overlay";
import { OverlayDemo } from "./Overlay.mock";
import {
  AddResolverConfirmation,
  DeleteResolverConfirmation,
  DocumentTransferMessage,
  MessageBeneficiarySuccess,
  MessageHolderSuccess,
  MessageNoManageAccess,
  MessageNoMetamask,
  MessageNominateBeneficiaryHolderSuccess,
  MessageNoUserAuthorization,
  MessageSurrenderSuccess,
  MessageTitle,
  MessageTransactionError,
  ProviderTimeoutMessage,
  Textual,
  Youtube,
} from "./OverlayContent";
import { HeaderIconState, Model } from "./OverlayContent/Model";

export default {
  title: "UI/Overlay",
  component: Overlay,
  parameters: {
    componentSubtitle:
      "Types of overlays, Textual, Video, AddressBook, Metamask messages, Document transfer messages, Address resolver messages.",
  },
};

export const Text = (): ReactElement => {
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

export const Video = (): ReactElement => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Video">
        <Youtube title="Digitalising Trust for Cross-Border Trade" youtubeId="udvPQyuqEug" />
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const NoMetamask = (): ReactElement => {
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

export const NoManageAccess = (): ReactElement => {
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

export const NoUserAuthorization = (): ReactElement => {
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

export const FailTransaction = (): ReactElement => {
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

export const SuccessSurrender = (): ReactElement => {
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

export const SuccessChangeBeneficiary = (): ReactElement => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Success Change Owner">
        <DocumentTransferMessage title={MessageTitle.CHANGE_BENEFICIARY_SUCCESS} isSuccess={true}>
          <MessageBeneficiarySuccess address="Bank of China Pte Ltd" />
        </DocumentTransferMessage>
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const SuccessChangeHolder = (): ReactElement => {
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

export const SuccessNominateBeneficiaryHolder = (): ReactElement => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Success Nominate Owner and Holder">
        <DocumentTransferMessage title={MessageTitle.NOMINATE_BENEFICIARY_HOLDER_SUCCESS} isSuccess={true}>
          <MessageNominateBeneficiaryHolderSuccess />
        </DocumentTransferMessage>
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const DeleteAddressResolver = (): ReactElement => {
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

export const AddAddressResolver = (): ReactElement => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Add Address Resolver">
        <AddResolverConfirmation />
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const ProviderTimeout = (): ReactElement => {
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Provider Timeout">
        <ProviderTimeoutMessage address="https://example.com" />
      </OverlayDemo>
    </OverlayContextProvider>
  );
};

export const ModelDemo = (): ReactElement => {
  const { closeOverlay } = useOverlayContext();
  return (
    <OverlayContextProvider>
      <OverlayDemo buttonText="Model">
        <Model
          title="Model"
          headerIconState={HeaderIconState.SUCCESS}
          footer={
            <Button
              onClick={() => {
                console.log("close");
                closeOverlay();
              }}
            >
              Close
            </Button>
          }
          collapsible={false}
        >
          <div className="">
            <div>Sed pariatur</div>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
              dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
              incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
              exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui
              dolorem eum fugiat quo voluptas nulla pariatur
            </p>
          </div>
        </Model>
      </OverlayDemo>
    </OverlayContextProvider>
  );
};
