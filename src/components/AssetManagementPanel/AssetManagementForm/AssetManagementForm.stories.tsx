import React, { useState } from "react";
import { OverlayContextProvider } from "../../../common/contexts/OverlayContext";
import { FormState } from "../../../constants/FormState";
import { Overlay } from "../../UI/Overlay";
import { AssetManagementActions } from "../AssetManagementActions";
import { AssetManagementForm } from "./AssetManagementForm";

export default {
  title: "TitleTransfer/AssetManagementForm",
  component: AssetManagementForm,
  parameters: {
    componentSubtitle: "All various scenarios with title transfer.",
  },
};

export const NotLoggedIn = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account=""
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      nominee=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={false}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const NoMatch = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <OverlayContextProvider>
      <Overlay />
      <AssetManagementForm
        setShowEndorsementChain={() => {}}
        account="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
        onConnectToWallet={() => alert("Login to Metamask")}
        beneficiary="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
        nominee=""
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        formAction={assetManagementAction}
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        onSetFormAction={setAssetManagementAction}
        isReturnedToIssuer={false}
        onReturnToIssuer={() => alert("Return ETR to issuer")}
        returnToIssuerState={FormState.UNINITIALIZED}
        onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
        holderTransferringState={FormState.UNINITIALIZED}
        onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
        beneficiaryEndorseState={FormState.UNINITIALIZED}
        nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
        nominateBeneficiaryState={FormState.UNINITIALIZED}
        transferOwners={(approvedBeneficiary, approvedHolder) =>
          alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
        }
        transferOwnersState={FormState.UNINITIALIZED}
        isTitleEscrow={true}
        onDestroyToken={() => alert("Accept document surrender")}
        destroyTokenState={FormState.UNINITIALIZED}
        isTokenBurnt={false}
        onRestoreToken={() => alert("Reject document surrender")}
        restoreTokenState={FormState.UNINITIALIZED}
        rejectTransferOwner={() => alert("Reject transfer owner")}
        rejectTransferOwnerState={FormState.UNINITIALIZED}
        rejectTransferHolder={() => alert("Reject transfer holder")}
        rejectTransferHolderState={FormState.UNINITIALIZED}
        rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
        rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
        keyId="123"
      />
    </OverlayContextProvider>
  );
};

export const BeneficiaryAndHolder = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={false}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const Beneficiary = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee=""
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={false}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const Holder = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee=""
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={false}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const HolderWithApprovedBeneficiaryAndApprovedHolder = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={false}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const TransferHolderError = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.TransferHolder);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={false}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.ERROR}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const TransferHolderPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.TransferHolder);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={false}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.PENDING_CONFIRMATION}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const EndorseChangeBeneficiaryError = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.EndorseBeneficiary);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={false}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.PENDING_CONFIRMATION}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.ERROR}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const EndorseChangeBeneficiaryPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.EndorseBeneficiary);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={false}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.PENDING_CONFIRMATION}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.PENDING_CONFIRMATION}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const NominateBeneficiaryAndHolderError = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.NominateBeneficiary);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee=""
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={false}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.ERROR}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const NominateBeneficiaryAndHolderPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.NominateBeneficiary);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee=""
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={false}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.PENDING_CONFIRMATION}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const EndorseTransferHolderBeneficiary = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.TransferOwnerHolder);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={false}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const EndorseTransferHolderBeneficiaryPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.TransferOwnerHolder);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={false}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.PENDING_CONFIRMATION}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const SurrenderDocument = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.ReturnToIssuer);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={true}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const SurrenderPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.ReturnToIssuer);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={false}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.PENDING_CONFIRMATION}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const SurrenderedNotMinter = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      documentOwner="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={true}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={false}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      isAcceptor={false}
      isRestorer={false}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const SurrenderedIsMinter = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      documentOwner="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={true}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={false}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      isRestorer={true}
      isAcceptor={true}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const SurrenderedAcceptForm = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.AcceptReturnToIssuer);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      documentOwner="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={true}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={false}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      isAcceptor={true}
      isRestorer={false}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};

export const SurrenderedRejectForm = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.RejectReturnToIssuer);

  return (
    <OverlayContextProvider>
      <Overlay />
      <AssetManagementForm
        setShowEndorsementChain={() => {}}
        account="0xa61B056dA0084a5f391EC137583073096880C2e3"
        onConnectToWallet={() => alert("Login to Metamask")}
        beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
        nominee=""
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        formAction={assetManagementAction}
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        documentOwner="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        onSetFormAction={setAssetManagementAction}
        isReturnedToIssuer={true}
        onReturnToIssuer={() => alert("Return ETR to issuer")}
        returnToIssuerState={FormState.UNINITIALIZED}
        onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
        holderTransferringState={FormState.UNINITIALIZED}
        onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
        beneficiaryEndorseState={FormState.UNINITIALIZED}
        nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
        nominateBeneficiaryState={FormState.UNINITIALIZED}
        transferOwners={(approvedBeneficiary, approvedHolder) =>
          alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
        }
        transferOwnersState={FormState.UNINITIALIZED}
        isTitleEscrow={false}
        onDestroyToken={() => alert("Accept document surrender")}
        destroyTokenState={FormState.UNINITIALIZED}
        isTokenBurnt={false}
        onRestoreToken={() => alert("Reject document surrender")}
        restoreTokenState={FormState.UNINITIALIZED}
        isRestorer={true}
        isAcceptor={false}
        rejectTransferOwner={() => alert("Reject transfer owner")}
        rejectTransferOwnerState={FormState.UNINITIALIZED}
        rejectTransferHolder={() => alert("Reject transfer holder")}
        rejectTransferHolderState={FormState.UNINITIALIZED}
        rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
        rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
        keyId="123"
      />
    </OverlayContextProvider>
  );
};

export const SurrenderedDocument = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      nominee=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isReturnedToIssuer={false}
      onReturnToIssuer={() => alert("Return ETR to issuer")}
      returnToIssuerState={FormState.PENDING_CONFIRMATION}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary) => alert(`Change Beneficiary: ${newBeneficiary}`)}
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      nominateBeneficiary={(newBeneficiary) => alert(`Nominate Owner: ${newBeneficiary}`)}
      nominateBeneficiaryState={FormState.UNINITIALIZED}
      transferOwners={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferOwnersState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={true}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      rejectTransferOwner={() => alert("Reject transfer owner")}
      rejectTransferOwnerState={FormState.UNINITIALIZED}
      rejectTransferHolder={() => alert("Reject transfer holder")}
      rejectTransferHolderState={FormState.UNINITIALIZED}
      rejectTransferOwnerHolder={() => alert("Reject transfer owner holder")}
      rejectTransferOwnerHolderState={FormState.UNINITIALIZED}
      keyId="123"
    />
  );
};
