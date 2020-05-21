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
    setThirdPartyAPIEndpoints([...thirdPartyAPIEndpoints, { name, endpoint }]);
  };

  const removeThirdPartyAPIEndpoint = (id: number) => {
    const filtered = thirdPartyAPIEndpoints.filter((item, index) => {
      return index !== id;
    });
    setThirdPartyAPIEndpoints(filtered);
  };

  return { thirdPartyAPIEndpoints, setThirdPartyAPIEndpoints, addThirdPartyAPIEndpoint, removeThirdPartyAPIEndpoint };
};
