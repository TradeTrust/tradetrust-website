import { useState, useEffect, useCallback } from "react";
import { useTokenRegistryContract } from "../useTokenRegistryContract";
import { providers, Signer, getDefaultProvider } from "ethers";
import { TitleEscrowFactory } from "@govtechsg/token-registry";
import { TitleEscrow } from "@govtechsg/token-registry/types/TitleEscrow";
import { TradeTrustERC721 } from "@govtechsg/token-registry/dist/ts/contracts/TradeTrustERC721";

export const useTitleEscrowContract = (tokenRegistryAddress: string, tokenId: string, provider: providers.Provider) => {
  const [titleEscrow, setTitleEscrow] = useState<TitleEscrow>();
  const { tokenRegistry } = useTokenRegistryContract(tokenRegistryAddress, provider);

  const fetchData = async (contract: TradeTrustERC721) => {
    const logs = await contract.queryFilter(contract.filters.Transfer(null, null, tokenId))
    console.log(logs);
  };

  useEffect(() => {
    if (!tokenRegistry) return;
    fetchData(tokenRegistry);
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
},20000);
