import { useIdentifierResolver } from "@govtechsg/address-identity-resolver";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import React from "react";
import { EndorsementChain } from "../../../types";
import { EndorsementChainLayout } from "./EndorsementChainLayout";

jest.mock("@govtechsg/address-identity-resolver", () => ({ useIdentifierResolver: jest.fn() }));

const mockUseIdentifierResolver = useIdentifierResolver as jest.Mock;

const initialEndorsementChain: EndorsementChain = [
  {
    type: "INITIAL",
    transactionHash: "0x1144cd45c4b9deae74a885d38bececeb1a3e194dbbcc3ef6f8c180f911ac0bb0",
    transactionIndex: 104,
    blockNumber: 7831157,
    owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
    holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
    timestamp: 1666694532000,
  },
];

const transferHolderEndorsementChain: EndorsementChain = [
  {
    type: "TRANSFER_HOLDER",
    transactionHash: "0xe8621e14bb5237a741e716f01990e6b9e856020afa49cd600e4ec586a81b5765",
    transactionIndex: 24,
    blockNumber: 7835503,
    owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
    holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
    timestamp: 1666759236000,
  },
];

const endorseBeneficiaryEndorsementChain: EndorsementChain = [
  {
    type: "TRANSFER_BENEFICIARY",
    transactionHash: "0xaf4418d8acee750ac10fec640a3d3c1e3104c25400687483f5df534dbc420cc2",
    transactionIndex: 30,
    blockNumber: 7835628,
    owner: "0x90264b594B8dc2225cb7D05a14e78483BAc7FBF7",
    holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
    timestamp: 1666761060000,
  },
];

const changeOwnersEndorsementChain: EndorsementChain = [
  {
    type: "TRANSFER_OWNERS",
    transactionHash: "0x80da1fd7ae5c6e0a01155ad13097a531d74167aa5a04a47b9a38844146b4682f",
    transactionIndex: 20,
    blockNumber: 7835693,
    owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
    holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
    timestamp: 1666761996000,
  },
];

const surrenderEndorsementChain: EndorsementChain = [
  {
    type: "SURRENDERED",
    transactionHash: "0x6782d845fe298cd79584a25466d1e2d9a3ff8d14591b4b424922709b7605f58e",
    transactionIndex: 86,
    blockNumber: 7835738,
    owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
    holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
    timestamp: 1666762656000,
  },
];

const rejectSurrenderedEndorsementChain: EndorsementChain = [
  {
    type: "SURRENDERED",
    transactionHash: "0x6782d845fe298cd79584a25466d1e2d9a3ff8d14591b4b424922709b7605f58e",
    transactionIndex: 86,
    blockNumber: 7835738,
    owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
    holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
    timestamp: 1666762656000,
  },
  {
    type: "SURRENDER_REJECTED",
    transactionHash: "0x4668970e883841dab512dc53c63f05c7c7452e9876086c2838710cfd42286726",
    transactionIndex: 59,
    blockNumber: 7836089,
    owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
    holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
    timestamp: 1666767792000,
  },
];

const acceptSurrenderedEndorsementChain: EndorsementChain = [
  {
    type: "SURRENDERED",
    transactionHash: "0xb30c0a48f5ebe6748b31f7f5f370b605eece7a093f950d7715f54ede2474fee7",
    transactionIndex: 59,
    blockNumber: 7836273,
    owner: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
    holder: "0x8d366250A96deBE81C8619459a503a0eEBE33ca6",
    timestamp: 1666770456000,
  },
  {
    type: "SURRENDER_ACCEPTED",
    transactionHash: "0x497395d2d58837a3fe686a883eaaaa2675b3d8ad10479abec2184349f7d38cb4",
    transactionIndex: 18,
    blockNumber: 7836281,
    owner: "0x0000000000000000000000000000000000000000",
    holder: "0x0000000000000000000000000000000000000000",
    timestamp: 1666770564000,
  },
];

/*
 * Logic in EndorsementChainLayout.tsx:
 * When the endorsementChain events above, similar to the ones from the blockchain are passed into the component,
 * the information will be extracted and restructured into an array of HistoryChain using the getHistoryChain() method.
 * Which would then be used to populate and render the different events the document has gone through.
 */

describe("EndorsementChainLayout", () => {
  it("should render the loading component when pending is true", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(<EndorsementChainLayout error={""} pending={true} setShowEndorsementChain={() => {}} />);
    expect(screen.getAllByTestId("loader-skeleton")).toHaveLength(9);
  });

  it("should render 'Document has been issued'", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={initialEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getByTestId("row-event-0")).toHaveTextContent("Document has been issued");
    expect(within(screen.getByTestId("row-event-0")).getByTestId("row-event-Holder")).toHaveTextContent(
      "0x8d366250A96deBE81C8619459a503a0eEBE33ca6"
    );
    expect(within(screen.getByTestId("row-event-0")).getByTestId("row-event-Owner")).toHaveTextContent(
      "0x8d366250A96deBE81C8619459a503a0eEBE33ca6"
    );
  });

  it("should render 'Transfer holdership' and new address of new holder when there is a change in holdership from previous holder", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={transferHolderEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getByTestId("row-event-0")).toHaveTextContent("Transfer holdership");
    expect(within(screen.getByTestId("row-event-0")).getByTestId("row-event-Holder")).toHaveTextContent(
      "0x8d366250A96deBE81C8619459a503a0eEBE33ca6"
    );
  });

  it("should render 'Endorse change of ownership' and new address of new beneficiary when there is a change in ownership from previous beneficiary", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={endorseBeneficiaryEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getByTestId("row-event-0")).toHaveTextContent("Endorse change of ownership");
    expect(within(screen.getByTestId("row-event-0")).getByTestId("row-event-Owner")).toHaveTextContent(
      "0x90264b594B8dc2225cb7D05a14e78483BAc7FBF7"
    );
  });

  it("should render 'Change Owners' and address of beneficiary and Holder", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={changeOwnersEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getByTestId("row-event-0")).toHaveTextContent("Change Owners");
    expect(within(screen.getByTestId("row-event-0")).getByTestId("row-event-Holder")).toHaveTextContent(
      "0x8d366250A96deBE81C8619459a503a0eEBE33ca6"
    );
    expect(within(screen.getByTestId("row-event-0")).getByTestId("row-event-Owner")).toHaveTextContent(
      "0x8d366250A96deBE81C8619459a503a0eEBE33ca6"
    );
  });

  it("should render 'Document surrendered to issuer' when document is surrendered and sent to token registry", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={surrenderEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getByTestId("row-event-0")).toHaveTextContent("Document surrendered to issuer");
  });

  it("should render 'Surrender of document rejected' and addresses of previous beneficiary and holder when surrendered document is rejected by token registry", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={rejectSurrenderedEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getByTestId("row-event-0")).toHaveTextContent("Document surrendered to issuer");
    expect(screen.getByTestId("row-event-1")).toHaveTextContent("Surrender of document rejected");
    expect(within(screen.getByTestId("row-event-1")).getByTestId("row-event-Owner")).toHaveTextContent(
      "0x8d366250A96deBE81C8619459a503a0eEBE33ca6"
    );
    expect(within(screen.getByTestId("row-event-1")).getByTestId("row-event-Holder")).toHaveTextContent(
      "0x8d366250A96deBE81C8619459a503a0eEBE33ca6"
    );
  });

  it("should render 'Surrender of document accepted' when surrendered document is accepted and burnt by token registry", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={acceptSurrenderedEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getByTestId("row-event-0")).toHaveTextContent("Document surrendered to issuer");
    expect(screen.getByTestId("row-event-1")).toHaveTextContent("Surrender of document accepted");
  });

  it("should fire setShowEndorsementChain when back button is clicked", async () => {
    const mockSetShowEndorsementChain = jest.fn();
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        endorsementChain={transferHolderEndorsementChain}
        setShowEndorsementChain={mockSetShowEndorsementChain}
        error={""}
        pending={false}
      />
    );
    act(() => {
      fireEvent.click(screen.getByTestId("back-button"));
    });
    expect(mockSetShowEndorsementChain).toHaveBeenCalledTimes(1);
  });
});
