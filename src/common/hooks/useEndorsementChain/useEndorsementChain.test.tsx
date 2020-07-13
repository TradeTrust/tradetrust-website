import { useState, useEffect, useCallback } from "react";
import { useTokenRegistryContract } from "../useTokenRegistryContract";
import { providers, Signer, getDefaultProvider, Contract } from "ethers";
import { TitleEscrowFactory } from "@govtechsg/token-registry";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { TradeTrustERC721 } from "@govtechsg/token-registry/dist/ts/contracts/TradeTrustERC721";

const fetchEscrowTransfers = async (address: string, provider: providers.Provider) => {
  const titleEscrowContract = TitleEscrowFactory.connect(address, provider);
  const isTitleEscrow = await titleEscrowContract.supportsInterface("0xdcce2211");
  if (!isTitleEscrow) throw new Error(`Contract ${address} is not a title escrow contract`);
  const holderChangeFilter = titleEscrowContract.filters.HolderChanged(null, null);
  const holderChangeLogsDeferred = titleEscrowContract.queryFilter(holderChangeFilter);
  const beneficiaryDeferred = titleEscrowContract.beneficiary();
  const [beneficiary, holderChangeLogs] = await Promise.all([beneficiaryDeferred, holderChangeLogsDeferred]);
  return {
    titleEscrowAddress: address,
    beneficiary,
    holderChangeEvents: holderChangeLogs.map((event) => ({
      blockNumber: event.blockNumber,
      holder: event.args?.newHolder as string,
    })),
  };
};

interface TransferEvent {
  blockNumber: number;
  args: {
    from: string;
    to: string;
  };
}

export const useTitleEscrowContract = (tokenRegistryAddress: string, tokenId: string, provider: providers.Provider) => {
  const [titleEscrow, setTitleEscrow] = useState<TitleEscrow>();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, provider);

  const fetchTokenRegistryTransfers = async (contract: TradeTrustERC721) => {
    const transferLogFilter = contract.filters.Transfer(null, null, tokenId);
    const logs = await contract.queryFilter(transferLogFilter);
    const formattedLogs = logs.map((log) => {
      const { blockNumber, args, transactionHash } = log;
      if (!args) throw new Error(`Transfer log malformed: ${log}`);
      return {
        blockNumber,
        transactionHash,
        from: args["from"] as string,
        to: args["to"] as string,
      };
    });
    // Removing transactions with surrender
    const intermediateOwners = formattedLogs.filter(({ to }) => to !== tokenRegistryAddress);
    const titleEscrowLogs = await Promise.all(intermediateOwners.map((log) => fetchEscrowTransfers(log.to, provider)));
    console.log("Token Registry:", tokenRegistryAddress);
    console.log("Token ID:", tokenId);
    console.log(JSON.stringify(titleEscrowLogs, null, 2));
  };

  useEffect(() => {
    if (!tokenRegistry) return;
    fetchTokenRegistryTransfers(tokenRegistry);
  }, [tokenRegistry]);

  return { titleEscrow };
};

import { renderHook, act } from "@testing-library/react-hooks";

const ropstenProvider = getDefaultProvider("ropsten");
it("works", async () => {
  const { result } = renderHook(() =>
    useTitleEscrowContract(
      "0x10E936e6BA85dC92505760259881167141365821",
      "0x38082975c9b82138f8c154d97206861bf0eaac46ab59855c1931ed218f82c54f",
      ropstenProvider
    )
  );
  await new Promise((resolve) => setTimeout(resolve, 10000));
}, 20000);

// it("works", async () => {
//   const res = await fetchEscrowTransfers("0x748938d2DEc5511A50F836ede82e2831cC4A7f80", ropstenProvider);
//   expect(res).toEqual({
//     beneficiary: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
//     holderChangeEvents: [
//       {
//         blockNumber: 8282976,
//         holder: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
//       },
//       {
//         blockNumber: 8283034,
//         holder: "0x8e87c7cEc2D4464119C937bfef3398ebb1d9452e",
//       },
//     ],
//   });
// });

// it("works", async () => {
//   await expect(fetchEscrowTransfers("0x10E936e6BA85dC92505760259881167141365821", ropstenProvider)).rejects.toThrow(
//     /is not a title escrow contract/
//   );
// });
