import createPersistedState from "use-persisted-state";
import { reject } from "lodash";

export interface ThirdPartyAPIEntryProps {
  name: string;
  endpoint: string;
}

export const useThirdPartyAPIEndpoints = () => {
  const defaultThirdPartyAPIEndpoints: ThirdPartyAPIEntryProps[] = [];
  const [thirdPartyAPIEndpoints, setThirdPartyAPIEndpoints] = createPersistedState("ADDRESS_THIRD_PARTY_ENDPOINTS")(
    defaultThirdPartyAPIEndpoints
  );

  const addThirdPartyAPIEndpoint = ({ name, endpoint }: ThirdPartyAPIEntryProps) => {
    const endpoints = [...thirdPartyAPIEndpoints];
    endpoints.unshift({
      name,
      endpoint,
    });
    setThirdPartyAPIEndpoints(endpoints);
  };

  const removeThirdPartyAPIEndpoint = (endpointToRemove: string) => {
    const endpoints = reject(thirdPartyAPIEndpoints, { endpoint: endpointToRemove });
    setThirdPartyAPIEndpoints(endpoints);
  };

  return { thirdPartyAPIEndpoints, setThirdPartyAPIEndpoints, addThirdPartyAPIEndpoint, removeThirdPartyAPIEndpoint };
};
