import { useMemo } from "react";
import { ethers, providers } from "ethers";
import { NETWORK_NAME } from "../../config";

export const useDefaultProvider = (): { provider: providers.Provider } => {
  const provider = ethers.getDefaultProvider(NETWORK_NAME);
  return useMemo(
    () => ({
      provider
    }),
    [] // eslint-disable-line react-hooks/exhaustive-deps
  );
};
