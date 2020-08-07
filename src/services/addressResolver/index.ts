import axios from "axios";
import { ThirdPartyAPIEntryProps } from "../../common/hooks/useThirdPartyAPIEndpoints";
import { getLogger } from "./../../utils/logger";

const { trace } = getLogger("service:addressresolver");

export interface HeadersProps {
  [key: string]: string;
}

export const resolveAddressNameByEndpoint = async (url: string, apiHeader: string, apiKey: string) => {
  try {
    const hasCustomHeaders = apiHeader && apiKey;
    let response;

    if (hasCustomHeaders) {
      const defaultHeaders: HeadersProps = {};
      const customHeaders = defaultHeaders;
      customHeaders[apiHeader] = apiKey;
      response = await axios.get(url, { headers: customHeaders });
    } else {
      response = await axios.get(url);
    }

    return response.data?.identity?.name;
  } catch (e) {
    trace(`Resolve Address Status: ${e}`);
    return undefined;
  }
};

export const getIdentityName = async (addresses: ThirdPartyAPIEntryProps[], address: string) => {
  const identityName = await addresses.reduce(async (accumulator, currentValue) => {
    if (await accumulator) return accumulator;
    const result = await resolveAddressNameByEndpoint(
      currentValue.endpoint + address,
      currentValue.apiHeader,
      currentValue.apiKey
    );
    return result;
  }, Promise.resolve(undefined));

  return identityName;
};
