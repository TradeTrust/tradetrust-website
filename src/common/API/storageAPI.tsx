import { SignedVerifiableCredential } from "@trustvc/trustvc";
import { decodeQrCode, getQRCodeLink } from "../utils/qrCode";
import axios, { AxiosRequestHeaders, AxiosResponse } from "axios";

// Function to get the CSRF token from /csrf-token route
const fetchCsrfToken = async (documentStorageURL: string): Promise<string> => {
  try {
    const url = `${documentStorageURL}/csrf-token`;

    const response = await axios({
      method: "get",
      url: url,
      withCredentials: true,
      headers: getHeaders(),
    });

    const csrfToken = response.data.csrfToken;
    if (!csrfToken) {
      throw new Error("CSRF token not found in response");
    }
    return csrfToken;
  } catch (error) {
    console.error("Error fetching CSRF token", error);
    throw error; // Rethrow or handle as needed
  }
};

const getHeaders = (csrfToken?: string): AxiosRequestHeaders => {
  const headers: any = {
    "Content-Type": "application/json",
  };

  const xApiKey = "x-api-key";
  const apiKey = process.env.API_KEY_DOCUMENT_STORAGE;

  if (!apiKey) throw new Error("API key not found");

  headers[xApiKey] = apiKey;

  if (csrfToken) {
    headers["X-CSRF-Token"] = csrfToken;
  }

  return headers;
};

export const getQueueNumber = async (documentStorageURL: string): Promise<AxiosResponse> => {
  const url = `${documentStorageURL}/queue`;

  return axios({
    method: "get",
    url: url,
    headers: getHeaders(),
  });
};

export const uploadToStorage = async (
  doc: SignedVerifiableCredential,
  documentStorageURL: string
): Promise<AxiosResponse> => {
  const qrCodeLink = getQRCodeLink(doc);
  const qrCodeObj = decodeQrCode(qrCodeLink);
  const uri = qrCodeObj.payload.uri;

  const csrfToken = await fetchCsrfToken(documentStorageURL); // Fetch the CSRF token

  return axios({
    method: "post",
    url: uri,
    headers: getHeaders(csrfToken), // Add CSRF token to headers
    data: {
      document: doc,
    },
    withCredentials: true,
  });
};
