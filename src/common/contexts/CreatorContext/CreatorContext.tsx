import React, { createContext, useContext, useEffect, useState } from "react";
import { DocumentSetupType } from "../../../components/DocumentSetup/DocumentSetup";
import { useDidWeb } from "../../hooks/useDidWeb";
import { CreatorItemState } from "./types";
import { useDeployTokenRegistry } from "../../hooks/useDeployTokenRegistry";
import { ChainId, ChainInfo } from "../../../constants/chain-info";
import { ExternalLink } from "react-feather";
import { SIGNER_TYPE } from "../provider";
import { SignedVerifiableCredential } from "@trustvc/trustvc";

interface DocumentSetupContext {
  type: DocumentSetupType;
  state?: CreatorItemState;
  stateMessage?: string | React.ReactNode;
}

interface CreatorContext {
  did?: DocumentSetupContext & {
    didKeyPair?: Record<string, unknown>;
    id?: string;
  };
  tokenRegistry?: DocumentSetupContext & {
    address?: string;
    displayRedeployTokenRegistry?: boolean;
  };
  processDid: () => Promise<void>;
  resetDid: () => void;
  processTokenRegistry: (signer: any, chainId: ChainId, providerType: SIGNER_TYPE) => Promise<void>;
  resetTokenRegistry: () => void;
  haveDownloadedAllDocument: boolean;
  setHaveDownloadedAllDocument: (value: boolean) => void;
  createdDocuments: Record<string, any>[];
  setCreatedDocuments: (signedDocuments: SignedVerifiableCredential[]) => void;
  setDocumentDownloaded: (id: string) => void;
}

export const CreatorContext = createContext<CreatorContext>({
  did: undefined,
  tokenRegistry: undefined,
  processDid: async () => {},
  resetDid: () => {},
  processTokenRegistry: async () => {},
  resetTokenRegistry: () => {},
  haveDownloadedAllDocument: false,
  setHaveDownloadedAllDocument: () => {},
  createdDocuments: [],
  setCreatedDocuments: () => {},
  setDocumentDownloaded: () => {},
});

interface CreatorContextProviderProps {
  children: React.ReactNode;
}

const STATE_MESSAGE = {
  DID: {
    FETCH_LOCAL_CACHE: "Checking DNS / DID:web record...",
    LOCAL_CACHE_FOUND: "Record found: ",
    LOCAL_CACHE_NOT_FOUND: "Record not found. Generating for you...",
    GENERATED: "Record Generated: ",
    ERROR: "Error generating record!",
  },
  TOKEN_REGISTRY: {
    FETCH_LOCAL_CACHE: "Checking Token Registry Address on ",
    LOCAL_CACHE_FOUND: "Token Registry address found on ",
    LOCAL_CACHE_NOT_FOUND: "Token Registry address not found on ",
    GENERATING_ADDRESS: "Generating Token Registry Address...",
    GENERATED: "Token Registry Address generated on ",
    ERROR: "Error generating record",
  },
};
function customStateMessage(msg: string, desc: string, link?: string) {
  return (
    <div>
      {msg}
      {link ? (
        <a href={link} className="inline-flex items-center" rel="noopener noreferrer" target="_blank">
          <span className="inline">
            {desc}
            <span className="whitespace-nowrap">
              <ExternalLink size={16} className="ml-1 inline-block text-cerulean-800 align-text-top" />
            </span>
          </span>
        </a>
      ) : (
        { desc }
      )}
    </div>
  );
}
export const CreatorContextProvider: any = ({ children }: CreatorContextProviderProps) => {
  const [haveDownloadedAllDocument, setHaveDownloadedAllDocument] = useState<boolean>(false);
  const [createdDocuments, setCreatedDocuments] = useState<SignedVerifiableCredential[]>([]);
  const [createdDocumentDownloaded, setCreatedDocumentDownloaded] = useState<Record<string, boolean>>({});

  const [didState, setDidState] = useState<CreatorItemState | undefined>(undefined);
  const [tokenRegistryState, setTokenRegistryState] = useState<CreatorItemState | undefined>(undefined);

  const [didStateMessage, setDidStateMessage] = useState<string | React.ReactNode>();
  const [tokenRegistryStateMessage, setTokenRegistryStateMessage] = useState<string | React.ReactNode>();
  const [displayRedeployTokenRegistry, setDisplayRedeployTokenRegistry] = useState<boolean>(false);

  const { loadDid, setupDid, didKeyPair, didWebId } = useDidWeb();
  const { tokenRegistryAddress, deployTokenRegistry, loadTokenRegistry, deploymentInProgress } =
    useDeployTokenRegistry();

  //soley to change the state message to showing the deployment in progress
  useEffect(() => {
    if (deploymentInProgress) setTokenRegistryStateMessage(STATE_MESSAGE.TOKEN_REGISTRY.GENERATING_ADDRESS);
  }, [deploymentInProgress]);
  const processDid = async () => {
    // Set loading state
    setDidState(CreatorItemState.LOADING);
    setDidStateMessage(STATE_MESSAGE.DID.FETCH_LOCAL_CACHE);

    // Load local cache
    // add a 1s delay while performing loadDid
    const didLoaded = await new Promise((resolve: (value: string) => void) =>
      setTimeout(async () => {
        const result = await loadDid();
        resolve(result as string);
      }, 1000)
    );

    // If local cache not found, setup
    if (!didLoaded) {
      setDidStateMessage(STATE_MESSAGE.DID.LOCAL_CACHE_NOT_FOUND);

      // Setup
      const didSetup = await setupDid();

      // If setup failed, return
      if (!didSetup) {
        setDidState(CreatorItemState.ERROR);
        setDidStateMessage(STATE_MESSAGE.DID.ERROR);
        return;
      }

      // If setup successful, set state
      setDidStateMessage(
        <div>
          {STATE_MESSAGE.DID.GENERATED} {didSetup}
        </div>
      );
    } else {
      // If local cache found, set state
      setDidStateMessage(
        <div>
          {STATE_MESSAGE.DID.LOCAL_CACHE_FOUND} {didLoaded}
        </div>
      );
    }

    // Set success state
    setDidState(CreatorItemState.SUCCESS);
  };

  const processTokenRegistry = async (
    signer: any,
    chainId: ChainId,
    providerType: SIGNER_TYPE = SIGNER_TYPE.METAMASK
  ) => {
    if (!signer || !chainId) return;

    if (displayRedeployTokenRegistry) setDisplayRedeployTokenRegistry(false); // Set redeploy state to false
    let networkName = ChainInfo[chainId].networkName as string;
    networkName = networkName.charAt(0).toUpperCase() + networkName.slice(1);
    // Set loading state
    setTokenRegistryState(CreatorItemState.LOADING);
    setTokenRegistryStateMessage(STATE_MESSAGE.TOKEN_REGISTRY.FETCH_LOCAL_CACHE + networkName);

    //load local cache token registry address
    const trLoaded = await new Promise((resolve: (value: string) => void) =>
      setTimeout(async () => {
        const result = await loadTokenRegistry(await signer.getAddress(), chainId as unknown as string);
        resolve(result as string);
      }, 1000)
    );

    // If local cache found
    if (trLoaded) {
      setTokenRegistryState(CreatorItemState.SUCCESS);

      const stateMessage = customStateMessage(
        STATE_MESSAGE.TOKEN_REGISTRY.LOCAL_CACHE_FOUND + networkName + ":",
        trLoaded,
        `${ChainInfo[chainId].explorerUrl}/address/${trLoaded}`
      );
      setTokenRegistryStateMessage(stateMessage);
      return;
    }
    setTokenRegistryStateMessage(
      <>
        {STATE_MESSAGE.TOKEN_REGISTRY.LOCAL_CACHE_NOT_FOUND} {networkName}.<div>Generating for you...</div>
        {providerType === SIGNER_TYPE.METAMASK && <div> Please confirm the transaction on metamask</div>}
      </>
    );

    //If local cache not found, deploy
    const { newTokenRegistryAddress, errorMsg, code } = await deployTokenRegistry(
      "Sandbox Token Registry", //standard name
      "STR",
      signer
    );

    if (errorMsg) {
      setTokenRegistryState(CreatorItemState.ERROR);
      //custom state error message
      if (code == "INSUFFICIENT_FUNDS") {
        const stateMessage = customStateMessage(
          errorMsg,
          "Learn how to top-up cryptocurrency",
          "https://metamask.io/en-GB/news/how-to-buy-crypto"
        );
        setTokenRegistryStateMessage(stateMessage);
      } else {
        setTokenRegistryStateMessage(errorMsg);
      }

      //enable redeploy token registry
      setDisplayRedeployTokenRegistry(true);
    } else {
      setTokenRegistryState(CreatorItemState.SUCCESS);
      const stateMessage = customStateMessage(
        STATE_MESSAGE.TOKEN_REGISTRY.GENERATED + networkName + " :",
        newTokenRegistryAddress,
        `${ChainInfo[chainId].explorerUrl}/address/${newTokenRegistryAddress}`
      );
      setTokenRegistryStateMessage(stateMessage);
    }
  };

  const resetDid = () => {
    setDidState(undefined);
    setDidStateMessage(undefined);
  };
  const resetTokenRegistry = () => {
    setTokenRegistryState(undefined);
    setTokenRegistryStateMessage(undefined);
    setDisplayRedeployTokenRegistry(false);
  };

  useEffect(() => {
    setCreatedDocumentDownloaded(createdDocuments.reduce((prev, curr) => ({ ...prev, [curr.id]: false }), {}));
  }, [createdDocuments]);

  useEffect(() => {
    const allDownloaded = Object.values(createdDocumentDownloaded).every((value) => value);
    setHaveDownloadedAllDocument(allDownloaded);
  }, [createdDocumentDownloaded]);

  const setDocumentDownloaded = (id: string) => {
    setCreatedDocumentDownloaded((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <CreatorContext.Provider
      value={{
        did: {
          type: DocumentSetupType.DID_WEB,
          state: didState,
          stateMessage: didStateMessage,
          didKeyPair,
          id: didWebId,
        },
        tokenRegistry: {
          type: DocumentSetupType.TOKEN_REGISTRY,
          state: tokenRegistryState,
          stateMessage: tokenRegistryStateMessage,
          address: tokenRegistryAddress || "",
          displayRedeployTokenRegistry: displayRedeployTokenRegistry,
        },
        processDid,
        resetDid,
        processTokenRegistry,
        resetTokenRegistry,
        haveDownloadedAllDocument,
        setHaveDownloadedAllDocument,
        createdDocuments,
        setCreatedDocuments,
        setDocumentDownloaded,
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
};

export const useCreatorContext = (): CreatorContext => useContext(CreatorContext);
