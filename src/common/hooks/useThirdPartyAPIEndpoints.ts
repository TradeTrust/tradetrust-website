import createPersistedState from "use-persisted-state";

export interface ThirdPartyAPIEntryProps {
  name: string;
  endpoint: string;
  apiHeader: string;
  apiKey: string;
  path: {
    addressResolution?: string;
    entityLookup?: string;
  };
}

export const useThirdPartyAPIEndpoints = () => {
  const defaultThirdPartyAPIEndpoints: ThirdPartyAPIEntryProps[] = [];
  const [thirdPartyAPIEndpoints, setThirdPartyAPIEndpoints] = createPersistedState("ADDRESS_THIRD_PARTY_ENDPOINTS")(
    defaultThirdPartyAPIEndpoints
  );

  const addThirdPartyAPIEndpoint = (newValues: ThirdPartyAPIEntryProps) => {
    setThirdPartyAPIEndpoints([...thirdPartyAPIEndpoints, newValues]);
  };

  const removeThirdPartyAPIEndpoint = (id: number) => {
    const filtered = thirdPartyAPIEndpoints.filter((item, index) => {
      return index !== id;
    });
    setThirdPartyAPIEndpoints(filtered);
  };

  const getFeature = (feature: "ADDRESS_RESOLUTION" | "ENTITY_LOOKUP", index: number) => {
    if (feature === "ADDRESS_RESOLUTION") return thirdPartyAPIEndpoints[index].path.addressResolution;
    if (feature === "ENTITY_LOOKUP") return thirdPartyAPIEndpoints[index].path.entityLookup;
  };

  return {
    thirdPartyAPIEndpoints,
    setThirdPartyAPIEndpoints,
    addThirdPartyAPIEndpoint,
    removeThirdPartyAPIEndpoint,
    getFeature,
  };
};
