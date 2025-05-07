import { queryDidDocument } from "@trustvc/trustvc/w3c/issuer";
import { useState } from "react";

type CreateDidWebResult = {
  requestId: string;
  domain: string;
  wellKnownDid: Record<string, unknown>;
  didKeyPairs: Record<string, unknown>;
};

interface useDidWebResult {
  didKeyPair?: Record<string, unknown>;
  didWebId?: string;
  loadDid: () => Promise<string | false>;
  setupDid: () => Promise<string | false>;
  createDidWeb: () => Promise<CreateDidWebResult>;
  verifyDidWeb: (did: string) => Promise<boolean>;
}

export const useDidWeb = (): useDidWebResult => {
  const [didKeyPair, setDidKeyPair] = useState<Record<string, unknown> | undefined>();
  const [didWebId, setDidWebId] = useState<string | undefined>();

  const createDidWeb = async (): Promise<CreateDidWebResult> => {
    const didCreateServer = process.env.DID_SERVER_URL;
    if (!didCreateServer) {
      throw new Error("DID create server not found");
    }
    const response: Response = await fetch(`${didCreateServer}/didweb`, {
      method: "POST",
    });
    return await response.json();
  };

  const verifyDidWeb = async (did: string): Promise<boolean> => {
    const { wellKnownDid } = await queryDidDocument({ did });
    return !!wellKnownDid;
  };

  const loadDid = async (): Promise<string | false> => {
    try {
      const localStorageDid = localStorage.getItem("did") as string;
      const localStorageId = localStorage.getItem("didId") as string;

      if (!localStorageDid || !localStorageId) {
        return false;
      }

      // verify if did web still exists
      const isVerified = await verifyDidWeb(localStorageId);
      if (!isVerified) {
        return false;
      }

      setDidKeyPair(JSON.parse(localStorageDid));
      setDidWebId(localStorageId);

      return localStorageId;
    } catch (e: unknown) {
      return false;
    }
  };

  const setupDid = async (): Promise<string | false> => {
    try {
      if (!localStorage) {
        return false;
      }

      const { didKeyPairs, wellKnownDid } = await createDidWeb();
      setDidKeyPair(didKeyPairs);
      setDidWebId(wellKnownDid?.id as string);

      localStorage.setItem("did", JSON.stringify(didKeyPairs));
      localStorage.setItem("didId", wellKnownDid?.id as string);

      return wellKnownDid?.id as string;
    } catch (e: unknown) {
      return false;
    }
  };
  return {
    didKeyPair,
    didWebId,
    loadDid,
    setupDid,
    createDidWeb,
    verifyDidWeb,
  };
};
