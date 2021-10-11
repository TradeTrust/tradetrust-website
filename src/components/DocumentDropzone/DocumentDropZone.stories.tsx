import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { v2, wrapDocument } from "@govtechsg/open-attestation";
import { DocumentDropzone } from "./DocumentDropzone";
import { configureStore } from "../../store";
import { whenDocumentHashInvalidAndNotIssued } from "../../test/fixture/verifier-responses";

const sampleDocument = wrapDocument({
  issuers: [
    {
      name: "John Doe",
      documentStore: "0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd",
      identityProof: {
        type: v2.IdentityProofType.DNSTxt,
        location: "helloworld.com",
      },
    },
  ],
  name: "foobar",
});

const RenderWithStore = ({ children, ...props }: any) => {
  const { document, fragments, isPending } = props;
  const store = configureStore({
    certificate: { rawModified: document, verificationStatus: fragments, verificationPending: isPending },
    demoVerify: { rawModifiedDocument: document, verificationStatus: fragments, verificationPending: isPending },
  });
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
};

export default {
  title: "Dropzone/DocumentDropzone",
  component: DocumentDropzone,
  parameters: {
    componentSubtitle: "All various scenarios with document verification.",
  },
};

export const Default = () => {
  return (
    <RenderWithStore document={sampleDocument} fragments={null}>
      <DocumentDropzone isDemo={false} />
    </RenderWithStore>
  );
};

export const Demo = () => {
  return (
    <RenderWithStore document={sampleDocument} fragments={null}>
      <DocumentDropzone isDemo={true} />
    </RenderWithStore>
  );
};

export const Verifying = () => {
  return (
    <RenderWithStore document={sampleDocument} fragments={null} isPending={true}>
      <DocumentDropzone isDemo={false} />
    </RenderWithStore>
  );
};

export const AllVerificationErrors = () => {
  return (
    <RenderWithStore document={sampleDocument} fragments={whenDocumentHashInvalidAndNotIssued}>
      <DocumentDropzone isDemo={false} />
    </RenderWithStore>
  );
};
