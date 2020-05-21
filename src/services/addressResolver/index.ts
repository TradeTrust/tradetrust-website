import axios from "axios";
import { ThirdPartyAPIEntryProps } from "../../common/hooks/useThirdPartyAPIEndpoints";
import { getLogger } from "./../../utils/logger";

const { trace } = getLogger("service:addressresolver");

export const resolveAddressNameByEndpoint = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data?.identity?.name;
  } catch (e) {
    trace(`Resolve Address Status: ${e}`);
    return undefined;
  }
};

export const getIdentityName = async (addresses: ThirdPartyAPIEntryProps[], address: string) => {
  const identityName = await addresses.reduce(async (accumulator, currentValue) => {
    if (await accumulator) return accumulator;
    const result = await resolveAddressNameByEndpoint(currentValue.endpoint + address);
    return result;
  }, Promise.resolve(undefined));

  return identityName;
};
