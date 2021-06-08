import { useIdentifierResolver } from "@govtechsg/address-identity-resolver";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { TitleEscrowEvent, TradeTrustErc721Event } from "../../../types";
import { EndorsementChainLayout } from "./EndorsementChainLayout";

jest.mock("@govtechsg/address-identity-resolver", () => ({ useIdentifierResolver: jest.fn() }));

const mockUseIdentifierResolver = useIdentifierResolver as jest.Mock;

const sampleEndorsementChain: TitleEscrowEvent[] = [
  {
    documentOwner: "0x748938d2DEc5511A50F836ede82e2831cC4A7f80",
    eventType: "Transfer",
    beneficiary: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
    holderChangeEvents: [
      {
        blockNumber: 8282976,
        holder: "0x6FFeD6E6591b808130a9b248fEA32101b5220eca",
        timestamp: 1594608110000,
      },
      {
        blockNumber: 8283034,
        holder: "0x8e87c7cEc2D4464119C937bfef3398ebb1d9452e",
        timestamp: 1594608809000,
      },
    ],
  },
];

const sampleSurrenderEndorsementChain: TradeTrustErc721Event[] = [
  {
    documentOwner: "0x748938d2DEc5511A50F836ede82e2831cC4A7f80",
    eventType: "Surrender",
    eventTimestamp: 1594608110000,
  },
];

const sampleRejectEndorsementChain: (TradeTrustErc721Event | TitleEscrowEvent)[] = [
  {
    documentOwner: "0xd413cF518B7aE838fbd994a653Af350AF6f72379",
    eventType: "Transfer",
    beneficiary: "0x5B1c22C60E66E58B07Fc00191e5603d0C41d3538",
    holderChangeEvents: [
      {
        blockNumber: 8283046,
        holder: "0x5B1c22C60E66E58B07Fc00191e5603d0C41d3538",
        timestamp: 1594609044000,
      },
    ],
  },
  {
    documentOwner: "0x748938d2DEc5511A50F836ede82e2831cC4A7f80",
    eventType: "Surrender",
    eventTimestamp: 1594609205000,
  },
  {
    documentOwner: "0xd413cF518B7aE838fbd994a653Af350AF6f72379",
    eventType: "Transfer",
    beneficiary: "0x5B1c22C60E66E58B07Fc00191e5603d0C41d3538",
    holderChangeEvents: [
      {
        blockNumber: 8283052,
        holder: "0x5B1c22C60E66E58B07Fc00191e5603d0C41d3538",
        timestamp: 1594609306000,
      },
    ],
  },
];

const sampleBurntEndorsementChain: TradeTrustErc721Event[] = [
  {
    documentOwner: "0x000000000000000000000000000000000000dEaD",
    eventType: "Burnt",
    eventTimestamp: 1594608809000,
  },
];

describe("EndorsementChainLayout", () => {
  it("should render the error component if there is an error", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(<EndorsementChainLayout error={"Some Error"} pending={false} setShowEndorsementChain={() => {}} />);
    expect(screen.getAllByText("Some Error")).toHaveLength(1);
  });

  it("should render the loading component when pending is true", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(<EndorsementChainLayout error={""} pending={true} setShowEndorsementChain={() => {}} />);
    expect(screen.getAllByTestId("loader-skeleton")).toHaveLength(9);
  });

  it("should render the EndorsementChain component if everything is good", () => {
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={sampleEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("Action/Date")).toHaveLength(1);
    expect(screen.getAllByText("Owner")).toHaveLength(1);
    expect(screen.getAllByText("Holder")).toHaveLength(1);
  });

  it("should render text Surrendered to Issuer if surrender event present", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={sampleSurrenderEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("Document surrendered to issuer")).toHaveLength(1);
  });

  it("should render text 'Surrender of document rejected' if document is rejected", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={sampleRejectEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("Surrender of document rejected")).toHaveLength(1);
  });

  it("should render text Surrendered if burnt event is present", () => {
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={sampleBurntEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("Surrender of document accepted")).toHaveLength(1);
  });

  it("should fire setShowEndorsementChain when back button is clicked", async () => {
    const mockSetShowEndorsementChain = jest.fn();
    mockUseIdentifierResolver.mockReturnValue({ resolvedIdentifier: "FooBar" });
    render(
      <EndorsementChainLayout
        endorsementChain={sampleEndorsementChain}
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
