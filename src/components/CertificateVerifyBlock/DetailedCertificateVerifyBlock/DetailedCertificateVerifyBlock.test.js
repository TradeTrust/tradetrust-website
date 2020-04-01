import React from "react";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import DetailedCertificateVerifyBlock from ".";

const validTokenResponse = [
  {
    type: "DOCUMENT_INTEGRITY",
    name: "OpenAttestationHash",
    data: true,
    status: "VALID",
  },
  {
    status: "SKIPPED",
    type: "DOCUMENT_STATUS",
    name: "OpenAttestationEthereumDocumentStoreIssued",
    reason: {
      code: 4,
      codeString: "SKIPPED",
      message: 'Document issuers doesn\'t have "documentStore" or "certificateStore" property or DOCUMENT_STORE method',
    },
  },
  {
    name: "OpenAttestationEthereumTokenRegistryMinted",
    type: "DOCUMENT_STATUS",
    data: {
      mintedOnAll: true,
      details: [
        {
          minted: true,
          address: "0xe59877ac86c0310e9ddaeb627f42fdee5f793fbe",
        },
      ],
    },
    status: "VALID",
  },
  {
    status: "SKIPPED",
    type: "DOCUMENT_STATUS",
    name: "OpenAttestationEthereumDocumentStoreRevoked",
    reason: {
      code: 4,
      codeString: "SKIPPED",
      message: 'Document issuers doesn\'t have "documentStore" or "certificateStore" property or DOCUMENT_STORE method',
    },
  },
  {
    name: "OpenAttestationDnsTxt",
    type: "ISSUER_IDENTITY",
    data: [
      {
        status: "VALID",
        location: "example.tradetrust.io",
        value: "0xe59877ac86c0310e9ddaeb627f42fdee5f793fbe",
      },
    ],
    status: "VALID",
  },
];

describe("detailedCertificateVerifyBlock", () => {
  it("should render when document is token", async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<DetailedCertificateVerifyBlock verificationStatus={validTokenResponse} />);
    });
    wrapper.setProps();
    expect(wrapper.find("h5").text()).toStrictEqual("Details");
    expect(wrapper.find("CertificateVerifyCheck")).toHaveLength(1);
  });
});
