import { v5ContractAddress, v5Contracts, v5Utils, SUPPORTED_CHAINS, CHAIN_ID } from "@trustvc/trustvc";
import { ethers, Signer } from "ethers";
import { useState } from "react";

type RegistryResponse = {
  newTokenRegistryAddress: string;
  errorMsg: string;
  code?: string;
};
interface useDeployTokenRegistryResult {
  tokenRegistryAddress?: string | undefined;
  loadTokenRegistry: (walletAddress: string, networkId: string) => Promise<string | false>;
  setupTokenRegistry: (
    walletAddress: string,
    networkId: string,
    newTokenRegistryAddress: string
  ) => Promise<string | false>;
  deployTokenRegistry: (name: string, symbol: string, signer: Signer) => Promise<RegistryResponse>;
  deploymentInProgress: boolean;
}

type TokenRegistryMap = {
  [walletAddress: string]: {
    [networkId: string]: string;
  };
};
export const useDeployTokenRegistry = (): useDeployTokenRegistryResult => {
  const [tokenRegistryAddress, setTokenRegistryAddress] = useState<string | undefined>();
  const [deploymentInProgress, setDeploymentInProgress] = useState<boolean>(false);
  function getLocalStorageKey(): string {
    return "tokenRegistry";
  }

  const deployTokenRegistry = async (name: string, symbol: string, signer: Signer): Promise<RegistryResponse> => {
    try {
      const walletAddress = await signer.getAddress();
      const networkId = await signer.getChainId();
      let tDocDeployerAddress: string;
      let implContractAddress: string;
      if (
        ["local", "development", "test"].includes(process.env.NODE_ENV!.toLowerCase()) &&
        networkId === Number(CHAIN_ID.local)
      ) {
        console.warn(
          "Deploying token registry for local network:",
          CHAIN_ID.local,
          "execute blockchain:contracts:testcafe before starting"
        );
        tDocDeployerAddress = "0x3488EAA1bF4f606f758b24F5ef6eb2a1E32335be"; //process.env.ERC1967_PROXY_ADDRESS!;
        implContractAddress = "0x0952a6817E00fc2455418a5303395760A9c4EE71"; //process.env.TOKEN_IMPLEMENTATION!;
      } else {
        tDocDeployerAddress = v5ContractAddress.Deployer[networkId];
        implContractAddress = v5ContractAddress.TokenImplementation[networkId];
      }
      const tDocDeployerV5 = new ethers.Contract(tDocDeployerAddress, v5Contracts.TDocDeployer__factory.abi, signer);
      const initParams = v5Utils.encodeInitParams({
        name,
        symbol,
        deployer: await signer.getAddress(),
      });

      const { gasStation } = SUPPORTED_CHAINS[networkId as unknown as CHAIN_ID];
      let mintingReceipt;
      if (gasStation) {
        const feeData = await gasStation();
        const { maxFeePerGas, maxPriorityFeePerGas } = feeData!;
        mintingReceipt = await tDocDeployerV5.deploy(implContractAddress, initParams, {
          maxPriorityFeePerGas: maxPriorityFeePerGas,
          maxFeePerGas: maxFeePerGas,
        });
      } else {
        mintingReceipt = await tDocDeployerV5.deploy(implContractAddress, initParams);
      }
      if (mintingReceipt) setDeploymentInProgress(true);
      const mintingTx = await mintingReceipt.wait();
      const newTokenRegistryAddress = mintingTx.events[0].address;
      setDeploymentInProgress(false);
      if (!localStorage) return { newTokenRegistryAddress, errorMsg: "No local storage available" };
      const storageKey = getLocalStorageKey();

      const storedData = localStorage.getItem(storageKey);
      const registryMap: TokenRegistryMap = storedData ? JSON.parse(storedData) : {};

      if (!registryMap[walletAddress]) {
        registryMap[walletAddress] = {};
      }
      registryMap[walletAddress][networkId] = newTokenRegistryAddress;

      localStorage.setItem(storageKey, JSON.stringify(registryMap));
      setTokenRegistryAddress(newTokenRegistryAddress);

      return { newTokenRegistryAddress, errorMsg: "" }; //newTokenRegistryAddress;
    } catch (e: any) {
      setDeploymentInProgress(false);
      if (e.code === "ACTION_REJECTED")
        return {
          newTokenRegistryAddress: "",
          errorMsg: "User rejected transaction.",
          code: "ACTION_REJECTED",
        };
      else if (e.code === "INSUFFICIENT_FUNDS")
        return {
          newTokenRegistryAddress: "",
          errorMsg: "Insufficient cryptocurrency.",
          code: "INSUFFICIENT_FUNDS",
        };

      return {
        newTokenRegistryAddress: "",
        errorMsg: (e as Error).message,
      };
    }
  };

  const loadTokenRegistry = async (walletAddress: string, networkId: string): Promise<string | false> => {
    try {
      const storageKey = getLocalStorageKey();

      // Get existing map or initialize new
      const storedData = localStorage.getItem(storageKey);
      const registryMap: TokenRegistryMap = storedData ? JSON.parse(storedData) : {};

      // Check if registry exists
      if (registryMap[walletAddress] && registryMap[walletAddress][networkId]) {
        setTokenRegistryAddress(registryMap[walletAddress][networkId]);
        return registryMap[walletAddress][networkId];
      }
      return false;
    } catch (e: unknown) {
      return false;
    }
  };

  const setupTokenRegistry = async (
    walletAddress: string,
    networkId: string,
    newTokenRegistryAddress: string
  ): Promise<string | false> => {
    try {
      if (!localStorage) {
        return false;
      }
      const storageKey = getLocalStorageKey();

      // Step 1: Get existing map or initialize new
      const storedData = localStorage.getItem(storageKey);
      const registryMap: TokenRegistryMap = storedData ? JSON.parse(storedData) : {};

      if (!registryMap[walletAddress]) {
        registryMap[walletAddress] = {};
      }
      registryMap[walletAddress][networkId] = newTokenRegistryAddress;

      localStorage.setItem(storageKey, JSON.stringify(registryMap));

      return newTokenRegistryAddress;
    } catch (e: unknown) {
      return false;
    }
  };
  return {
    tokenRegistryAddress,
    loadTokenRegistry,
    setupTokenRegistry,
    deployTokenRegistry,
    deploymentInProgress,
  };
};
