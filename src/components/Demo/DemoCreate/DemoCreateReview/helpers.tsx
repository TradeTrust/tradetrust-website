import { v2 } from "@tradetrust-tt/tradetrust";
import { IdentityProofType, Issuer, TemplateType } from "@tradetrust-tt/tradetrust/dist/types/__generated__/schema.2.0";

export const makeRawDocument = (
  documentStoreAddress: string,
  formValues: Record<string, any>,
  identityLocation: string
): v2.OpenAttestationDocument => {
  const issuers: Issuer[] = [
    {
      name: "Demo Issuer",
      documentStore: documentStoreAddress,
      identityProof: {
        type: "DNS-TXT" as IdentityProofType,
        location: identityLocation,
      },
    },
  ];

  return {
    $template: {
      type: "EMBEDDED_RENDERER" as TemplateType,
      name: "SIMPLE_COO",
      url: "https://generic-templates.tradetrust.io",
    },
    issuers,
    ...formValues,
  };
};
