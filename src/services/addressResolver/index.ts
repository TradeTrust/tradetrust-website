import axios from "axios";

export const resolveAddressNameByEndpoint = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data.identity.name;
  } catch (e) {
    return undefined;
  }
};
