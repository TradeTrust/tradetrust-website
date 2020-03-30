import { useMemo } from "react";
import { ethers, providers } from "ethers";
import { NETWORK_NAME } from "../../config";

export const useDefaultProvider = (): { provider: providers.Provider } => {
  return useMemo(
    () => ({
      provider: ethers.getDefaultProvider(NETWORK_NAME)
    }),
    []
  );
};
