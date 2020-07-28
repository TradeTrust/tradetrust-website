import React, { useState } from "react";
import { AssetManagementForm } from "./AssetManagementForm";
import { AssetManagementActions } from "../AssetManagementActions";
import { FormState } from "../../../constants/FormState";
import { Overlay } from "./../../UI/Overlay";
import { OverlayContextProvider } from "./../../../common/contexts/OverlayContext";

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
        alert(`Change Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Beneficiary: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
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
          alert(`Change Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
        }
        beneficiaryEndorseState={FormState.UNINITIALIZED}
        onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
          alert(`Nominate Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
        }
        approveNewTransferTargetsState={FormState.UNINITIALIZED}
        onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
          alert(`Endorse Beneficiary: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
        }
        transferToNewEscrowState={FormState.UNINITIALIZED}
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
        alert(`Change Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Beneficiary: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
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
        alert(`Change Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Beneficiary: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
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
        alert(`Change Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Beneficiary: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
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
        alert(`Change Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Beneficiary: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
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
        alert(`Change Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Beneficiary: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
    />
  );
};

export const Surrendered = () => {
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
      isSurrendered={true}
      onSurrender={() => alert("Surrender document")}
      surrenderingState={FormState.UNINITIALIZED}
      onTransferHolder={(newHolder) => alert(`Transfer holder to ${newHolder}`)}
      holderTransferringState={FormState.UNINITIALIZED}
      onEndorseBeneficiary={(newBeneficiary, newHolder) =>
        alert(`Change Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Beneficiary: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
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
        alert(`Change Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Beneficiary: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
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
        alert(`Change Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Beneficiary: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
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
        alert(`Change Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.ERROR}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Beneficiary: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
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
        alert(`Change Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.PENDING_CONFIRMATION}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Beneficiary: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
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
        alert(`Change Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.ERROR}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Beneficiary: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
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
        alert(`Change Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.PENDING_CONFIRMATION}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Beneficiary: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
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
        alert(`Change Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Beneficiary: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.UNINITIALIZED}
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
        alert(`Change Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      beneficiaryEndorseState={FormState.UNINITIALIZED}
      onApproveNewTransferTargets={(newBeneficiary, newHolder) =>
        alert(`Nominate Beneficiary: ${newBeneficiary}, Holder: ${newHolder}`)
      }
      approveNewTransferTargetsState={FormState.UNINITIALIZED}
      onTransferToNewEscrow={(approvedBeneficiary, approvedHolder) =>
        alert(`Endorse Beneficiary: ${approvedBeneficiary}, Holder: ${approvedHolder}`)
      }
      transferToNewEscrowState={FormState.PENDING_CONFIRMATION}
    />
  );
};
