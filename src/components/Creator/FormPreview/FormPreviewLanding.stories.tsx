import React, { FunctionComponent, ReactNode } from "react";
import { FormPreviewLanding } from "./FormPreviewLanding";
import { FormsContextProvider } from "../../../common/contexts/FormsContext";
import { ProviderContextProvider } from "../../../common/contexts/provider";
import { ChainId, ChainInfo } from "../../../constants/chain-info";
import { MemoryRouter } from "react-router-dom";
import { QueueState } from "../../../constants/QueueState";
import { SignedVerifiableCredential } from "@trustvc/trustvc";

// // Mock form data for stories
// const mockForm = {
//   data: {
//     formData: {
//       warehouseReceipt: "Sample Receipt",
//       spl: "Sample SPL",
//     },
//   },
//   ownership: {
//     beneficiaryAddress: "0x1234567890123456789012345678901234567890",
//     holderAddress: "0x1234567890123456789012345678901234567890",
//   },
//   remarks: "Sample remarks",
// };

// const mockFormTemplate = {
//   type: "TRANSFERABLE_RECORD",
//   name: "Warehouse Receipt",
//   fileName: "warehouse-receipt.tt",
//   defaults: {
//     "@context": [
//       "https://www.w3.org/2018/credentials/v1",
//       "https://trustvc.io/context/warehouse-receipt.json",
//       "https://trustvc.io/context/render-method-context.json",
//     ],
//     renderMethod: [
//       {
//         type: "EMBEDDED_RENDERER",
//         templateName: "WAREHOUSE_RECEIPT",
//         id: "https://generic-templates.tradetrust.io",
//       },
//     ],
//     credentialSubject: {
//       type: ["WarehouseReceipt"],
//     },
//     type: ["VerifiableCredential"],
//   },
// };

// Sample document for preview
const sampleDocument = {
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://trustvc.io/context/warehouse-receipt.json",
    "https://trustvc.io/context/render-method-context.json",
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
    warehouseReceipt: "Sample Receipt",
    spl: "Sample SPL",
  },
  type: ["VerifiableCredential"],
  issuer: "did:web:example.com",
  issuanceDate: "2025-05-23T02:17:51.740Z",
  id: "urn:bnid:_:0196faee-bb7e-788c-8825-1bfea01bac99",
} as SignedVerifiableCredential;

// Mock the FormsContextProvider for Storybook
interface MockFormsContextProviderProps {
  children: ReactNode;
  queueState: QueueState;
  document?: SignedVerifiableCredential;
  error?: Error | null;
}

const MockFormsContextProvider: FunctionComponent<MockFormsContextProviderProps> = ({
  children,
  queueState,
  document,
  error = null,
}) => {
  // Mock the useQueue hook by overriding the module
  // This is a bit of a hack for Storybook, but it works
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__useQueueMock = {
    processDocument: () => Promise.resolve(),
    document,
    queueState,
    error,
  };

  return (
    <MemoryRouter>
      <ProviderContextProvider networks={Object.values(ChainInfo)} defaultChainId={ChainId.Sepolia}>
        <FormsContextProvider
        // initialForms={{
        //   forms: [],
        //   formTemplates: [],
        //   currentForm: mockForm,
        //   currentFormTemplate: mockFormTemplate,
        // }}
        >
          {children}
        </FormsContextProvider>
      </ProviderContextProvider>
    </MemoryRouter>
  );
};

// Override the useQueue hook for Storybook
// This needs to be added to the FormPreviewLanding.tsx file for Storybook to work:
// if (window.__useQueueMock) return window.__useQueueMock;

export default {
  title: "Creator/FormPreview/FormPreviewLanding",
  component: FormPreviewLanding,
  parameters: {
    componentSubtitle: "Landing page for document preview",
    docs: {
      description: {
        component: "Note: This story requires modification of the FormPreviewLanding component to work with Storybook.",
      },
    },
  },
};

export const DefaultPreview: FunctionComponent = () => {
  return (
    <MockFormsContextProvider queueState={QueueState.CONFIRMED} document={sampleDocument}>
      <div className="max-w-screen-lg">
        <FormPreviewLanding />
      </div>
    </MockFormsContextProvider>
  );
};

export const LoadingState: FunctionComponent = () => {
  return (
    <MockFormsContextProvider queueState={QueueState.PENDING}>
      <div className="max-w-screen-lg">
        <FormPreviewLanding />
      </div>
    </MockFormsContextProvider>
  );
};

export const ErrorState: FunctionComponent = () => {
  return (
    <MockFormsContextProvider queueState={QueueState.ERROR} error={new Error("Sample error message")}>
      <div className="max-w-screen-lg">
        <FormPreviewLanding />
      </div>
    </MockFormsContextProvider>
  );
};
