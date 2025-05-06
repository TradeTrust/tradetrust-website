import React, { createContext, useContext, useState } from "react";
import { DocumentSetupType } from "../../../components/DocumentSetup/DocumentSetup";
import { useDidWeb } from "../../hooks/useDidWeb";
import { CreatorItemState } from "./types";

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
  };
  processDid: () => Promise<void>;
  resetDid: () => void;
}

export const CreatorContext = createContext<CreatorContext>({
  did: undefined,
  tokenRegistry: undefined,
  processDid: async () => {},
  resetDid: () => {},
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
    FETCH_LOCAL_CACHE: "Checking Token Registry...",
    LOCAL_CACHE_FOUND: "Record found: ",
    LOCAL_CACHE_NOT_FOUND: "Record not found. Generating for you...",
    GENERATED: "Record Generated: ",
    ERROR: "Error generating record",
  },
};

export const CreatorContextProvider: any = ({ children }: CreatorContextProviderProps) => {
  const [tokenRegistryAddress] = useState<string>();

  const [didState, setDidState] = useState<CreatorItemState | undefined>(undefined);
  const [tokenRegistryState] = useState<CreatorItemState | undefined>(undefined);

  const [didStateMessage, setDidStateMessage] = useState<string | React.ReactNode>();
  const [tokenRegistryStateMessage] = useState<string | React.ReactNode>();

  const { loadDid, setupDid, didKeyPair, didWebId } = useDidWeb();

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

  const resetDid = () => {
    setDidState(undefined);
    setDidStateMessage(undefined);
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
        },
        processDid,
        resetDid,
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
};

export const useCreatorContext = (): CreatorContext => useContext(CreatorContext);
