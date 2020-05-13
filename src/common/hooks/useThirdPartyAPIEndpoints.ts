import createPersistedState from "use-persisted-state";

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
    setThirdPartyAPIEndpoints([{ name, endpoint }, ...thirdPartyAPIEndpoints]);
  };

  const removeThirdPartyAPIEndpoint = (name: string) => {
    const filtered = thirdPartyAPIEndpoints.filter((item) => {
      return item.endpoint !== name;
    });
    setThirdPartyAPIEndpoints(filtered);
  };

  return { thirdPartyAPIEndpoints, setThirdPartyAPIEndpoints, addThirdPartyAPIEndpoint, removeThirdPartyAPIEndpoint };
};
