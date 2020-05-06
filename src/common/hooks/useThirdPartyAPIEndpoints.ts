import createPersistedState from "use-persisted-state";

export interface ThirdPartyAPIEntryProps {
  name: string;
  endpoint: string;
}

export const useThirdPartyAPIEndpoints = () => {
  const defaultThirdPartyAPIEndpoints: { name: string; endpoint: string }[] = [];
  const [thirdPartyAPIEndpoints, setThirdPartyAPIEndpoints] = createPersistedState("ADDRESS_RESOLVER_API_ENDPOINTS")(
    defaultThirdPartyAPIEndpoints
  );

  return { thirdPartyAPIEndpoints, setThirdPartyAPIEndpoints };
};
