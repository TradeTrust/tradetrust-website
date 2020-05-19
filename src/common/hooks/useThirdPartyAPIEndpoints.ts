import createPersistedState from "use-persisted-state";

export interface ThirdPartyAPIEntryProps {
  id: string;
  name: string;
  endpoint: string;
}

export const useThirdPartyAPIEndpoints = () => {
  const defaultThirdPartyAPIEndpoints: ThirdPartyAPIEntryProps[] = [];
  const [thirdPartyAPIEndpoints, setThirdPartyAPIEndpoints] = createPersistedState("ADDRESS_THIRD_PARTY_ENDPOINTS")(
    defaultThirdPartyAPIEndpoints
  );

  const addThirdPartyAPIEndpoint = ({ id, name, endpoint }: ThirdPartyAPIEntryProps) => {
    setThirdPartyAPIEndpoints([...thirdPartyAPIEndpoints, { id, name, endpoint }]);
  };

  const removeThirdPartyAPIEndpoint = (id: string) => {
    const filtered = thirdPartyAPIEndpoints.filter((item) => {
      return item.id !== id;
    });
    setThirdPartyAPIEndpoints(filtered);
  };

  return { thirdPartyAPIEndpoints, setThirdPartyAPIEndpoints, addThirdPartyAPIEndpoint, removeThirdPartyAPIEndpoint };
};
