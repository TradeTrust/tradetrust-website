import React, { FunctionComponent } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { configureStore } from "../../../store";
import { FormPreviewComponent } from "./FormPreviewComponent";

export default {
  title: "Creator/FormPreview/FormPreviewComponent",
  component: FormPreviewComponent,
  parameters: {
    componentSubtitle: "Component for rendering document preview",
  },
};

// Sample document for stories
const sampleDocument = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://trustvc.io/context/warehouse-receipt.json",
    "https://trustvc.io/context/render-method-context.json",
    "https://w3id.org/security/bbs/v1",
  ],
  renderMethod: [
    {
      type: "EMBEDDED_RENDERER",
      templateName: "WAREHOUSE_RECEIPT",
      id: "https://generic-templates.tradetrust.io",
    },
  ],
  credentialSubject: {
    type: ["WarehouseReceipt"],
    warehouseReceipt: "Sample Warehouse Receipt",
    spl: "Sample SPL",
  },
  type: ["VerifiableCredential"],
  issuer: "did:web:example.com",
  issuanceDate: "2025-05-23T02:17:51.740Z",
  id: "urn:bnid:_:0196faee-bb7e-788c-8825-1bfea01bac99",
  proof: {
    type: "BbsBlsSignature2020",
    created: "2025-05-23T02:17:51Z",
    proofPurpose: "assertionMethod",
    proofValue: "exampleProofValue",
    verificationMethod: "did:web:example.com#keys-1",
  },
};

const store = configureStore();

export const DefaultPreview: FunctionComponent = () => {
  return (
    <MemoryRouter>
      <Provider store={store}>
        <div className="max-w-screen-lg p-4 border rounded-md shadow-md">
          <FormPreviewComponent document={sampleDocument} />
        </div>
      </Provider>
    </MemoryRouter>
  );
};
