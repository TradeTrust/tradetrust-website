import axios, { AxiosError } from "axios";
import { cachedAxios } from "./axiosClient";
import { ThirdPartyAPIEntryProps } from "../../common/hooks/useThirdPartyAPIEndpoints";
import { getLogger } from "./../../utils/logger";
import { join } from "path";
import { ResolutionResult } from "../../common/hooks/useIdentifierResolver";

const { trace, error } = getLogger("service:addressresolver");

// Returns an url with no trailing slash
export const getPath = (path: string, base: string) => new URL(path, base).href;

export interface AddressBookThirdPartyResultsProps {
  identifier: string;
  name: string;
  remarks: string;
}

export interface HeadersProps {
  [key: string]: string;
}

interface EntityLookupProps {
  query: string;
  endpoint: string;
  apiHeader?: string;
  apiKey?: string;
}

const get = async ({
  url,
  apiHeader,
  apiKey,
  cache = false,
}: {
  url: string;
  apiHeader?: string;
  apiKey?: string;
  cache?: boolean;
}) => {
  const client = cache ? cachedAxios : axios;
  if (apiHeader && apiKey) {
    const headers: HeadersProps = {};
    headers[apiHeader] = apiKey;
    return client.get(url, { headers });
  } else {
    return client.get(url);
  }
};

export const entityLookup = async ({
  query,
  endpoint,
  apiHeader,
  apiKey,
}: EntityLookupProps): Promise<AddressBookThirdPartyResultsProps[]> => {
  const url = `${endpoint}search?q=${query}`;
  const response = await get({ url, apiHeader, apiKey });
  return response.data.identities;
};

export const resolveAddressNameByEndpoint = async (url: string, apiHeader: string, apiKey: string) => {
  // Default TTL is 5 Mins to change timeout check https://github.com/kuitos/axios-extensions#cacheadapterenhancer
  try {
    const response = await get({
      url,
      apiHeader,
      apiKey,
      cache: true,
    });
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
    const response = await get({
      url,
      apiHeader,
      apiKey,
      cache: true,
    });
    return response.data;
  } catch (e) {
    const err: AxiosError = e;
    if (err.response?.data) {
      error(err.response.data);
    }
    throw new Error(err.response?.data?.message || err.message);
  }
};
