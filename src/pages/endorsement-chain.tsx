import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useProviderContext } from "../common/contexts/provider";
import { EndorsementChainContainer } from "../components/EndorsementChain/EndorsementChainContainer";
import { Page } from "../components/Layout/Page";

import { useTokenInformationContext } from "../common/contexts/TokenInformationContext";
import { NetworkSelect } from "../components/Layout/NetworkSelect";
import { LoaderSpinner } from "../components/UI/Loader";
import { useTokenRegistryVersion } from "../common/hooks/useTokenRegistryVersion";

const EndorsementChainPage: React.FC = () => {
  const [tokenRegistry, setTokenRegistry] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [keyId, setKeyId] = useState("");
  const [formSubmittedAndNetworkReady, setFormSubmittedAndNetworkReady] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    initialize,
    tokenRegistryAddress: tokenRegistryContext,
    tokenId: tokenIdContext,
    beneficiary,
    holder,
    prevHolder,
    prevBeneficiary,
    remark,
    documentOwner,
    isReturnedToIssuer,
    isTokenBurnt,
    isTitleEscrow,
    titleEscrowAddress,
  } = useTokenInformationContext();
  const version = useTokenRegistryVersion();

  const { currentChainId, provider, networkChangeLoading } = useProviderContext();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setFormSubmittedAndNetworkReady(false); // Reset first for this submission attempt
    setIsSubmitting(false); // Reset submission state

    if (!currentChainId || !tokenRegistry || !tokenId) {
      alert("Please fill in Token Registry, Token ID, and ensure a network is selected via the dropdown.");
      setIsSubmitting(false);
      return; // formSubmittedAndNetworkReady remains false
    }

    // If network is currently changing (by NetworkSelect), prevent submission.
    if (networkChangeLoading) {
      alert("Network is currently changing. Please wait.");
      setIsSubmitting(false);
      return; // formSubmittedAndNetworkReady remains false
    }

    // Wait for useTokenInformationContext to load
    setIsSubmitting(true);
    initialize(tokenRegistry, tokenId);
  };

  // After useTokenInformationContext is loaded
  useEffect(() => {
    // All checks passed, ready to show the endorsement chain.
    if (
      tokenId === tokenIdContext &&
      tokenRegistry === tokenRegistryContext &&
      !formSubmittedAndNetworkReady &&
      isSubmitting
    ) {
      setFormSubmittedAndNetworkReady(true);
      setIsSubmitting(false);
    }
  }, [tokenRegistry, tokenId, tokenRegistryContext, tokenIdContext, formSubmittedAndNetworkReady, isSubmitting]);

  // Effect to manage formSubmittedAndNetworkReady based on inputs and network state
  useEffect(() => {
    const canProceed = tokenRegistry && tokenId && currentChainId && !networkChangeLoading;

    if (formSubmittedAndNetworkReady && !canProceed) {
      // If we thought we were ready (formSubmittedAndNetworkReady was true), but conditions are no longer met, reset.
      setFormSubmittedAndNetworkReady(false);
    }
    // Setting formSubmittedAndNetworkReady to true is primarily handled by handleSubmit.
    // This effect ensures it's reset if dependencies change negatively after a successful submission intent.
  }, [tokenRegistry, tokenId, currentChainId, networkChangeLoading, formSubmittedAndNetworkReady, provider]);

  const handleSetShowEndorsementChain = (show: boolean) => {
    if (!show) {
      setFormSubmittedAndNetworkReady(false); // Allow container to hide itself, resetting the view
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setter(e.target.value);
      setFormSubmittedAndNetworkReady(false); // Reset on any input change
      setIsSubmitting(false); // Also reset submission state
    };

  const canSubmit = !!tokenRegistry && !!tokenId && !!currentChainId;

  return (
    <>
      <Helmet>
        <meta
          property="description"
          content="View the endorsement chain for a TradeTrust token, detailing its history and transfers."
        />
        <meta
          property="og:description"
          content="View the endorsement chain for a TradeTrust token, detailing its history and transfers."
        />
        <meta property="og:title" content="TradeTrust - Endorsement Chain" />
        <meta property="og:url" content={`${window.location.origin}/endorsement-chain`} />
        <title>TradeTrust - Endorsement Chain</title>
        <meta
          name="keywords"
          content={
            "Blockchain, NFT, Ethereum, Endorsement Chain, Token History, Verifiable Document, Digital Trade Document"
          }
        />
      </Helmet>
      <Page title="View Endorsement Chain">
        <div className="font-sans max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-gray-50 p-5 rounded-lg shadow-md mb-8">
            <div className="mb-4">
              <label htmlFor="tokenRegistry" className="block mb-1 font-bold">
                Token Registry Address:
              </label>
              <input
                id="tokenRegistry"
                type="text"
                value={tokenRegistry}
                onChange={handleInputChange(setTokenRegistry)}
                required
                className="w-full p-2.5 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="tokenId" className="block mb-1 font-bold">
                Token ID:
              </label>
              <input
                id="tokenId"
                type="text"
                value={tokenId}
                onChange={handleInputChange(setTokenId)}
                required
                className="w-full p-2.5 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="keyId" className="block mb-1 font-bold">
                tt file ID (Optional):
              </label>
              <input
                id="keyId"
                type="text"
                value={keyId}
                onChange={handleInputChange(setKeyId)}
                placeholder="#key-1"
                className="w-full p-2.5 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-6 flex flex-col">
              <label className="block mb-1 font-bold">Network:</label>
              <NetworkSelect disabled={false} document={undefined} inPlaceLoading={true} />
            </div>
            <button
              type="submit"
              disabled={networkChangeLoading || isSubmitting || !canSubmit}
              className="w-full py-3 text-white rounded text-base font-bold transition-colors duration-150 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {networkChangeLoading ? (
                <span>Switching Network...</span>
              ) : isSubmitting ? (
                <>
                  <LoaderSpinner className="w-5 h-5 mr-2 inline-block" />
                  <span>Fetching Details...</span>
                </>
              ) : (
                <span>View Endorsement Chain</span>
              )}
            </button>
          </form>
        </div>

        {formSubmittedAndNetworkReady && (
          <>
            <div className="mt-5 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="mt-0 mb-2.5 border-b border-gray-300 pb-1">Token Information:</h3>
              <ul className="list-none pl-0">
                {Object.entries({
                  version,
                  beneficiary,
                  holder,
                  prevHolder,
                  prevBeneficiary,
                  remark,
                  documentOwner,
                  isReturnedToIssuer,
                  isTokenBurnt,
                  isTitleEscrow,
                  titleEscrowAddress,
                }).map(([key, value]) => (
                  <li key={key} className="mb-1">
                    <strong className="capitalize">{key.replace(/([A-Z])/g, " $1")}: </strong>
                    <span>{String(value)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <EndorsementChainContainer
              tokenRegistry={tokenRegistry}
              tokenId={tokenId}
              keyId={keyId || undefined}
              setShowEndorsementChain={handleSetShowEndorsementChain}
            />
          </>
        )}
      </Page>
    </>
  );
};

export default EndorsementChainPage;
