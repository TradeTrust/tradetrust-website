import axios, { AxiosResponse, AxiosHeaders } from "axios";
import { SignedVerifiableCredential } from "@trustvc/trustvc";
import { decodeQrCode, getQRCodeLink } from "../utils/qrCode";

// Function to get the CSRF token from /csrf-token route
const fetchCsrfToken = async (documentStorageURL: string): Promise<string> => {
  try {
    const url = `${documentStorageURL}/csrf-token`;

    const response = await axios({
      method: "get",
      url: url,
      withCredentials: true,
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

const getHeaders = (csrfToken?: string): AxiosHeaders => {
  const headers = new AxiosHeaders({
    "Content-Type": "application/json",
  });

  const xApiKey = "x-api-key";

  const apiKey = process.env.REACT_APP_API_KEY_DOCUMENT_STORAGE;
  if (!apiKey) throw new Error("API key not found");

  headers.set(xApiKey, apiKey);

  if (csrfToken) {
    headers.set("X-CSRF-Token", csrfToken); // Set CSRF token if passed
  }

  return headers;
};

export const getQueueNumber = async (documentStorageURL: string): Promise<AxiosResponse> => {
  const url = `${documentStorageURL}/queue`;

  return axios({
    method: "get",
    url: url,
    headers: getHeaders(documentStorageURL),
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
