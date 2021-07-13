import { NETWORK_NAME } from "../../config";

type LoadCertificate = (certificate: any) => void;

export const DEMO_CERT = `/static/demo/${NETWORK_NAME}.tt`;

export const loadDemoCertificate = (loadCertificate: LoadCertificate): void => {
  window
    .fetch(DEMO_CERT)
    .then((res) => res.json())
    .then((res) => {
      loadCertificate(res);
    });
};
