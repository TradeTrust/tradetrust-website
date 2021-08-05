import { Overlay, OverlayContextProvider } from "@govtechsg/tradetrust-ui-components";
import React, { useState } from "react";
import { FormState } from "../../../constants/FormState";
import { AssetManagementActions } from "../AssetManagementActions";
import { AssetManagementForm } from "./AssetManagementForm";
import { whenDocumentValidAndIssuedByDns } from "../../../test/fixture/verifier-responses";
import { v2, WrappedDocument } from "@govtechsg/open-attestation";
import { VerificationFragment } from "@govtechsg/oa-verify";

export default {
  title: "TitleTransfer/AssetManagementForm",
  component: AssetManagementForm,
  parameters: {
    componentSubtitle: "All various scenarios with title transfer.",
  },
};

const obfuscatedDocument = {
  version: "https://schema.openattestation.com/2.0/schema.json",
  data: {
    $template: {
      name: "fdb9d37a-ac86-4956-887c-d221c8e0cd62:string:main",
      type: "31f7607f-54b9-46e7-8c1d-9c013c2ecd88:string:EMBEDDED_RENDERER",
      url: "744f3009-426f-4ab7-91be-72abc02332e1:string:https://tutorial-renderer.openattestation.com",
    },
    recipient: {},
    issuers: [
      {
        name: "d722d892-03c5-479d-af14-e4e7c6a4b822:string:Demo Issuer",
        documentStore: "0aaf2824-6679-4bda-a669-b94ce50ef590:string:0x8bA63EAB43342AAc3AdBB4B827b68Cf4aAE5Caca",
        identityProof: {
          type: "af17ca30-0e7f-4fd9-848e-815f12badd6f:string:DNS-TXT",
          location: "39c6d282-3061-492c-ae56-85745cc3edb7:string:demo-tradetrust.openattestation.com",
        },
      },
    ],
  },
  signature: {
    type: "SHA3MerkleProof",
    targetHash: "c5d53262962b192c5c977f2252acd4862f41cc1ccce7e87c5b406905a2726692",
    proof: [],
    merkleRoot: "c5d53262962b192c5c977f2252acd4862f41cc1ccce7e87c5b406905a2726692",
  },
  privacy: {},
} as WrappedDocument<v2.OpenAttestationDocument>;

export const NotLoggedIn = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.None);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account=""
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
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
        approvedBeneficiary=""
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        approvedHolder=""
        formAction={assetManagementAction}
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        onSetFormAction={setAssetManagementAction}
        isSurrendered={false}
        onSurrender={() => alert("Surrender document")}
        surrenderingState={FormState.UNINITIALIZED}
        onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
        holderTransferringState={FormState.UNINITIALIZED}
        onEndorseBeneficiary={(newBeneficiary, newHolder) =>
          alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
        }
        beneficiaryEndorseState={FormState.UNINITIALIZED}
        onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
          alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
        }
        approveNewTransferTargetsState={FormState.UNINITIALIZED}
        onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
          alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
        }
        transferToNewEscrowState={FormState.UNINITIALIZED}
        isTitleEscrow={true}
        onDestroyToken={() => alert("Accept document surrender")}
        destroyTokenState={FormState.UNINITIALIZED}
        isTokenBurnt={false}
        onRestoreToken={() => alert("Reject document surrender")}
        restoreTokenState={FormState.UNINITIALIZED}
        tokenId=""
        document={obfuscatedDocument}
        verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
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
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
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
      approvedBeneficiary=""
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
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
      approvedBeneficiary=""
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
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
      approvedBeneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      approvedHolder="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
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
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.ERROR}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
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
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.PENDING_CONFIRMATION}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
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
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.PENDING_CONFIRMATION}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.ERROR}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
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
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.PENDING_CONFIRMATION}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.PENDING_CONFIRMATION}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
    />
  );
};

export const NominateBeneficiaryAndHolderError = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.NominateBeneficiaryHolder);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.ERROR}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
    />
  );
};

export const NominateBeneficiaryAndHolderPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.NominateBeneficiaryHolder);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.PENDING_CONFIRMATION}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
    />
  );
};

export const EndorseTransferHolderBeneficiary = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.EndorseTransfer);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      approvedHolder="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
    />
  );
};

export const EndorseTransferHolderBeneficiaryPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.EndorseTransfer);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      holder="0x1D350495B4C2a51fBf1c9DEDadEAb288250C703e"
      approvedHolder="0xE94E4f16ad40ADc90C29Dc85b42F1213E034947C"
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.PENDING_CONFIRMATION}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
    />
  );
};

export const SurrenderDocument = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.Surrender);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={true}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
    />
  );
};

export const SurrenderPending = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.Surrender);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.PENDING_CONFIRMATION}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
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
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      documentOwner="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={true}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={false}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      isMinter={false}
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
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
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      documentOwner="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={true}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={false}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      isMinter={true}
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
    />
  );
};

export const SurrenderedAcceptForm = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.AcceptSurrendered);

  return (
    <AssetManagementForm
      setShowEndorsementChain={() => {}}
      account="0xa61B056dA0084a5f391EC137583073096880C2e3"
      onConnectToWallet={() => alert("Login to Metamask")}
      beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      documentOwner="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={true}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={false}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={false}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      isMinter={true}
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
    />
  );
};

export const SurrenderedRejectForm = () => {
  const [assetManagementAction, setAssetManagementAction] = useState(AssetManagementActions.RejectSurrendered);

  return (
    <OverlayContextProvider>
      <Overlay />
      <AssetManagementForm
        setShowEndorsementChain={() => {}}
        account="0xa61B056dA0084a5f391EC137583073096880C2e3"
        onConnectToWallet={() => alert("Login to Metamask")}
        beneficiary="0xa61B056dA0084a5f391EC137583073096880C2e3"
        approvedBeneficiary=""
        holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
        approvedHolder=""
        formAction={assetManagementAction}
        tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        documentOwner="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
        onSetFormAction={setAssetManagementAction}
        isSurrendered={true}
        onSurrender={() => alert("Surrender document")}
        surrenderingState={FormState.UNINITIALIZED}
        onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
        holderTransferringState={FormState.UNINITIALIZED}
        onEndorseBeneficiary={(newBeneficiary, newHolder) =>
          alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
        }
        beneficiaryEndorseState={FormState.UNINITIALIZED}
        onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
          alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
        }
        approveNewTransferTargetsState={FormState.UNINITIALIZED}
        onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
          alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
        }
        transferToNewEscrowState={FormState.UNINITIALIZED}
        isTitleEscrow={false}
        onDestroyToken={() => alert("Accept document surrender")}
        destroyTokenState={FormState.UNINITIALIZED}
        isTokenBurnt={false}
        onRestoreToken={() => alert("Reject document surrender")}
        restoreTokenState={FormState.UNINITIALIZED}
        tokenId=""
        isMinter={true}
        document={obfuscatedDocument}
        verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
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
      approvedBeneficiary=""
      holder="0xa61B056dA0084a5f391EC137583073096880C2e3"
      approvedHolder=""
      formAction={assetManagementAction}
      tokenRegistryAddress="0xdA8DBd2Aaffc995F11314c0040716E791de5aEd2"
      onSetFormAction={setAssetManagementAction}
      isSurrendered={false}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.PENDING_CONFIRMATION}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Owner: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Owner: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
      isTitleEscrow={true}
      onDestroyToken={() => alert("Accept document surrender")}
      destroyTokenState={FormState.UNINITIALIZED}
      isTokenBurnt={true}
      onRestoreToken={() => alert("Reject document surrender")}
      restoreTokenState={FormState.UNINITIALIZED}
      tokenId=""
      document={obfuscatedDocument}
      verificationStatus={whenDocumentValidAndIssuedByDns as VerificationFragment[]}
    />
  );
};
