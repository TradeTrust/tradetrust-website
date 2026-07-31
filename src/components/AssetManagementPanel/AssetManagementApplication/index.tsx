import { v5RoleHash, v4RoleHash } from "@trustvc/trustvc";
import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { AlertCircle, Info, Upload } from "react-feather";
import { Link } from "react-router-dom";
import { useProviderContext } from "../../../common/contexts/provider";
import { useTokenInformationContext } from "../../../common/contexts/TokenInformationContext";
import { useTokenRegistryContract } from "../../../common/hooks/useTokenRegistryContract";
import { useTokenRegistryRole } from "../../../common/hooks/useTokenRegistryRole";
import { FORM_SG_URL } from "../../../routes";
import { Button } from "../../Button";
import { DocumentStatus } from "../../DocumentStatus";
import { Banner } from "../../UI/Banner";
import { AssetManagementActions } from "../AssetManagementActions";
import { AssetManagementForm } from "../AssetManagementForm";
import { TagBordered } from "../../UI/Tag";
import { useTokenRegistryVersion } from "../../../common/hooks/useTokenRegistryVersion";
import { TokenRegistryVersions } from "../../../constants";
import { ChainInfo } from "../../../constants/chain-info";
import { checkEIP7702Delegation } from "../../../gasless/checkDelegation";
import { checkPaymasterWhitelist } from "../../../gasless/checkPaymasterWhitelist";
import { getPaymasterAddress, setPaymasterAddress as storePaymasterAddress } from "../../../gasless/paymasterStore";
import { utils } from "ethers";
import { IconSuccess } from "../../UI/Icon";

interface AssetManagementIsTransferableDocumentProps {
  isMagicDemo?: boolean;
  tokenId: string;
  tokenRegistryAddress: string;
  setShowEndorsementChain: (payload: boolean) => void;
  isTransferableDocument: true;
  isExpired: boolean;
}

interface AssetManagementIsNotTransferableDocumentProps {
  isMagicDemo?: boolean;
  isTransferableDocument: false;
  isExpired: boolean;
}

type AssetManagementApplicationProps =
  | (AssetManagementIsNotTransferableDocumentProps | AssetManagementIsTransferableDocumentProps) & {
      isSampleDocument: boolean;
    };

const renderBanner = (isSample: boolean, isMagic: boolean | undefined) => {
  const props = {
    to: FORM_SG_URL,
    buttonText: "Contact us now",
    title: "Ready to learn how TradeTrust can benefit your business?",
    absolute: true,
  };
  if (isSample || isMagic) {
    return <Banner {...props} />;
  } else {
    return null;
  }
};

export const AssetManagementApplication: FunctionComponent<AssetManagementApplicationProps> = (props) => {
  const { isMagicDemo, tokenId, tokenRegistryAddress, setShowEndorsementChain, isTransferableDocument, isExpired } =
    props as AssetManagementIsTransferableDocumentProps;
  const isSampleDocument = props.isSampleDocument;
  const {
    approvedBeneficiary: nominee,
    holder,
    beneficiary,
    prevBeneficiary,
    prevHolder,
    isReturnedToIssuer,
    isTokenBurnt,
    isTitleEscrow,
    documentOwner,
    titleEscrowAddress,
    // nominate
    nominate,
    nominateState,
    // transferHolder
    changeHolder,
    changeHolderState,
    // endorseBeneficiary / transferBeneficiary
    endorseBeneficiary,
    endorseBeneficiaryState,
    // transferOwners
    transferOwners,
    transferOwnersState,
    // returnToIssuer
    returnToIssuer,
    returnToIssuerState,
    // reject return to issuer
    restoreToken,
    restoreTokenState,
    // accept return to issuer
    destroyToken,
    destroyTokenState,
    // reject transfer owner
    rejectTransferOwner,
    rejectTransferOwnerState,
    // reject transfer holder
    rejectTransferHolder,
    rejectTransferHolderState,
    // reject transfer owner holder
    rejectTransferOwnerHolder,
    rejectTransferOwnerHolderState,
  } = useTokenInformationContext();
  const [assetManagementAction, setAssetManagementAction] = useState<AssetManagementActions>(
    AssetManagementActions.None
  );
  const tokenRegistryVersion = useTokenRegistryVersion();
  const { provider, account, currentChainId } = useProviderContext();

  // ── EIP-7702 gasless check ────────────────────────────────────────────────
  const [isDelegated, setIsDelegated] = useState(false);
  const [paymasterAddress, setPaymasterAddress] = useState("");
  const [gaslessStatus, setGaslessStatus] = useState<"idle" | "checking" | "success" | "error">("idle");
  const [gaslessError, setGaslessError] = useState("");

  const getRpcUrl = (): string | undefined => (currentChainId ? (ChainInfo as any)[currentChainId]?.rpcUrl : undefined);

  useEffect(() => {
    if (!account || !currentChainId) {
      setIsDelegated(false);
      return;
    }
    const rpcUrl = getRpcUrl();
    if (!rpcUrl) {
      setIsDelegated(false);
      return;
    }
    checkEIP7702Delegation(account, rpcUrl).then(setIsDelegated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, currentChainId]);

  useEffect(() => {
    setGaslessStatus("idle");
    setGaslessError("");
    setPaymasterAddress("");
  }, [account]);

  const checkGasless = useCallback(
    async (address: string) => {
      const trimmed = address.trim();
      if (!utils.isAddress(trimmed)) return;
      if (!account || !titleEscrowAddress) {
        setGaslessError("Connect your wallet and load a document first.");
        setGaslessStatus("error");
        return;
      }
      const rpcUrl = getRpcUrl();
      if (!rpcUrl) {
        setGaslessError("No RPC URL for this network.");
        setGaslessStatus("error");
        return;
      }
      setGaslessStatus("checking");
      setGaslessError("");
      try {
        const result = await checkPaymasterWhitelist(trimmed, account, titleEscrowAddress, rpcUrl);
        if (result.isCallerAuthorized && result.isTitleEscrowAuthorized) {
          storePaymasterAddress(account, trimmed);
          setGaslessStatus("success");
        } else {
          setGaslessError("This paymaster address is not applicable to you.");
          setGaslessStatus("error");
        }
      } catch {
        setGaslessError("Unable to verify — please try again.");
        setGaslessStatus("error");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [account, titleEscrowAddress, currentChainId]
  );

  useEffect(() => {
    if (!isDelegated || !account) return;
    const stored = getPaymasterAddress(account);
    if (!stored) return;
    setPaymasterAddress(stored);
    checkGasless(stored);
  }, [isDelegated, account, checkGasless]);
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, provider);
  const { hasRole: hasAccepterRole } = useTokenRegistryRole({
    tokenRegistry,
    account,
    role: tokenRegistryVersion === TokenRegistryVersions.V4 ? v4RoleHash.AccepterRole : v5RoleHash.AccepterRole,
  });
  const { hasRole: hasRestorerRole } = useTokenRegistryRole({
    tokenRegistry,
    account,
    role: tokenRegistryVersion === TokenRegistryVersions.V4 ? v4RoleHash.RestorerRole : v5RoleHash.RestorerRole,
  });

  const onDestroyToken = (remarks: string = "0x") => {
    destroyToken({ tokenId, remarks });
  };

  const onRestoreToken = (remarks: string = "0x") => {
    restoreToken({ tokenId, remarks });
  };

  const onSetFormAction = useCallback(
    (assetManagementActions: AssetManagementActions) => {
      setAssetManagementAction(assetManagementActions);
    },
    [setAssetManagementAction]
  );

  useEffect(() => {
    onSetFormAction(AssetManagementActions.None);
  }, [account, onSetFormAction]); // unset action panel to none, whenever user change metamask account

  return (
    <div id="title-transfer-panel" className="container justify-between">
      <div id="asset-management-box" className="flex p-4 flex-col gap-2 bg-white rounded-xl">
        <div id="file-name" className="flex-1">
          <div className="flex flex-col xs:flex-row justify-between items-stretch xs:items-center min-h-16 gap-2">
            {/* Gasless / Pay-on-behalf status */}
            <div className="flex-1 min-w-0">
              {isDelegated && gaslessStatus === "success" ? (
                <div className="flex items-start gap-2 bg-forest-50 border border-forest-500 rounded-lg px-3 py-2">
                  <IconSuccess className="shrink-0 text-forest-500 w-5 h-5" />
                  <span className="text-base font-normal not-italic leading-normal tracking-normal align-middle">
                    This wallet has the pay-on-behalf feature enabled. Transaction fees are covered for you, so
                    you&apos;ll see a Signature Request instead of a Transaction Request when confirming.
                  </span>
                </div>
              ) : isDelegated ? (
                <div className="flex items-start gap-2 bg-lemon-100 border border-tangerine-300 rounded-lg px-3 py-2">
                  <Info size={16} className="shrink-0 text-tangerine-500 mt-0.5" />
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <span className="text-base font-normal not-italic leading-normal tracking-normal align-middle">
                      We have detected that you have the pay-on-behalf feature. To enable it, please enter your
                      paymaster address:
                    </span>
                    <input
                      type="text"
                      placeholder="Enter paymaster address"
                      value={paymasterAddress}
                      disabled={gaslessStatus === "checking"}
                      className="flex flex-row items-center p-1 isolate max-w-[452.5px] h-10 bg-white rounded-lg border border-[#A9B2BB] focus:outline-none disabled:opacity-50"
                      onChange={(e) => {
                        const val = e.target.value;
                        setPaymasterAddress(val);
                        const trimmed = val.trim();
                        if (utils.isAddress(trimmed)) {
                          checkGasless(trimmed);
                        } else if (trimmed.length > 0) {
                          setGaslessStatus("error");
                          setGaslessError("Invalid paymaster address");
                        } else {
                          setGaslessStatus("idle");
                          setGaslessError("");
                        }
                      }}
                    />
                    {gaslessStatus === "error" && gaslessError && (
                      <div className="flex items-center gap-1 text-red-500">
                        <AlertCircle size={12} className="shrink-0" />
                        <span className="text-xs">{gaslessError}</span>
                      </div>
                    )}
                    {gaslessStatus === "checking" && (
                      <span
                        className="text-base font-normal not-italic leading-normal tracking-normal align-middle text-tangerine-500"
                        style={{ fontFamily: "Avenir" }}
                      >
                        Verifying...
                      </span>
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            <Link
              id="upload-new-file"
              data-testid="upload-new-file"
              className="content-center shrink-0 w-full xs:w-auto"
              to={"/"}
            >
              <Button className="bg-white text-cerulean-500 hover:bg-cloud-100 w-full h-10 xs:w-10 xs:h-10 sm:w-auto sm:min-w-[180px] flex items-center justify-center whitespace-nowrap">
                <div className="sm:block hidden px-2">Upload New File</div>
                <Upload className="sm:hidden block text-cerulean-500 max-w-[16px]" />
              </Button>
            </Link>
          </div>
        </div>
        {(assetManagementAction === AssetManagementActions.None ||
          assetManagementAction === AssetManagementActions.RejectTransferHolder ||
          assetManagementAction === AssetManagementActions.RejectTransferOwner ||
          assetManagementAction === AssetManagementActions.RejectTransferOwnerHolder) && (
          <DocumentStatus
            isMagicDemo={isMagicDemo}
            isTransferableDocument={isTransferableDocument}
            tokenRegistryAddress={tokenRegistryAddress}
            setShowEndorsementChain={setShowEndorsementChain}
          />
        )}

        <div id="divider" className="flex-1 border-t-2 my-2" />

        {isTransferableDocument && isTitleEscrow !== undefined ? (
          <AssetManagementForm
            beneficiary={beneficiary}
            holder={holder}
            nominee={nominee}
            prevBeneficiary={prevBeneficiary}
            prevHolder={prevHolder}
            account={account}
            isGaslessEnabled={isDelegated && gaslessStatus === "success"}
            formAction={assetManagementAction}
            tokenRegistryAddress={tokenRegistryAddress}
            onSetFormAction={onSetFormAction}
            documentOwner={documentOwner}
            isRestorer={hasRestorerRole}
            isAcceptor={hasAccepterRole}
            isReturnedToIssuer={isReturnedToIssuer}
            isTitleEscrow={isTitleEscrow}
            setShowEndorsementChain={setShowEndorsementChain}
            isTokenBurnt={isTokenBurnt}
            onTransferHolder={changeHolder}
            holderTransferringState={changeHolderState}
            onEndorseBeneficiary={endorseBeneficiary}
            beneficiaryEndorseState={endorseBeneficiaryState}
            nominateBeneficiary={nominate}
            nominateBeneficiaryState={nominateState}
            transferOwners={transferOwners}
            transferOwnersState={transferOwnersState}
            rejectTransferOwner={rejectTransferOwner}
            rejectTransferOwnerState={rejectTransferOwnerState}
            rejectTransferHolder={rejectTransferHolder}
            rejectTransferHolderState={rejectTransferHolderState}
            rejectTransferOwnerHolder={rejectTransferOwnerHolder}
            rejectTransferOwnerHolderState={rejectTransferOwnerHolderState}
            onReturnToIssuer={returnToIssuer}
            returnToIssuerState={returnToIssuerState}
            onDestroyToken={onDestroyToken}
            destroyTokenState={destroyTokenState}
            onRestoreToken={onRestoreToken}
            restoreTokenState={restoreTokenState}
            isExpired={isExpired}
          />
        ) : (
          isExpired && (
            <div className="flex-1 content-center space-y-2 md:space-x-2 md:space-y-0">
              <TagBordered
                id="expired-sign"
                rounded="rounded-full"
                className="border-scarlet-100 bg-scarlet-100 text-scarlet-500 content-center justify-self-center w-full xs:w-auto h-10 px-4 py-2"
              >
                <h5 data-testid="expiredDoc" className="text-center break-keep">
                  Expired
                </h5>
              </TagBordered>
            </div>
          )
        )}
        {!isTransferableDocument && renderBanner(isSampleDocument, isMagicDemo)}
      </div>
    </div>
  );
};
