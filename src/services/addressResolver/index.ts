import axios, { AxiosAdapter, AxiosError } from "axios";
import { ThirdPartyAPIEntryProps } from "../../common/hooks/useThirdPartyAPIEndpoints";
import { getLogger } from "./../../utils/logger";
import { cacheAdapterEnhancer } from "axios-extensions";
import { join } from "path";
import { ResolutionResult } from "../../common/hooks/useIdentifierResolver";

const { trace, error } = getLogger("service:addressresolver");

// Returns an url with no trailing slash
export const getPath = (path: string, base: string) => new URL(path, base).href;

const client = () =>
  axios.create({
    headers: { "Cache-Control": "no-cache" },
    adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter), // Typecast suggested by author to force non-null typing: https://github.com/kuitos/axios-extensions/issues/8
  });

export interface HeadersProps {
  [key: string]: string;
}

export const resolveAddressNameByEndpoint = async (url: string, apiHeader: string, apiKey: string) => {
  // Default TTL is 5 Mins to change timeout check https://github.com/kuitos/axios-extensions#cacheadapterenhancer
  try {
    const hasCustomHeaders = apiHeader && apiKey;
    let response;

    if (hasCustomHeaders) {
      const customHeaders: HeadersProps = {};
      customHeaders[apiHeader] = apiKey;
      response = await client().get(url, { headers: customHeaders });
    } else {
      response = await client().get(url);
    }
    return response.data?.identity?.name;
  } catch (e) {
    trace(`Resolve Address Status: ${e}`);
    return undefined;
  }
};

export const getIdentityName = async (
  addresses: ThirdPartyAPIEntryProps[],
  address: string
): Promise<ResolutionResult | undefined> => {
  const identityName = await addresses.reduce(async (accumulator, currentValue) => {
    if (await accumulator) return accumulator;
    if (!currentValue.path.addressResolution) return undefined;
    const url = getPath(join(currentValue.path.addressResolution, address), currentValue.endpoint);
    const result = await resolveAddressNameByEndpoint(url, currentValue.apiHeader, currentValue.apiKey);
    if (!result) return undefined;
    return { result, source: currentValue.name };
  }, Promise.resolve<ResolutionResult | undefined>(undefined));

  return identityName;
};

interface FeatureResponse {
  features: {
    addressResolution?: {
      location: string;
    };
    entityLookup?: {
      location: string;
    };
  };
  version: number;
}

export const getFeatures = async (url: string, apiHeader?: string, apiKey?: string): Promise<FeatureResponse> => {
  try {
    if (apiHeader && apiKey) {
      const customHeaders: HeadersProps = {};
      customHeaders[apiHeader] = apiKey;
      return (await axios.get<FeatureResponse>(url, { headers: customHeaders })).data;
    } else {
      return (await axios.get<FeatureResponse>(url)).data;
    }
  } catch (e) {
    const err: AxiosError = e;
    if (err.response?.data) {
      error(err.response.data);
    }
    throw new Error(err.response?.data?.message || err.message);
  }
};
