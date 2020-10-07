import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { TitleEscrowEvent, TradeTrustErc721Event } from "../../../types";
import { EndorsementChainLayout } from "./EndorsementChainLayout";

jest.mock("../../../common/hooks/useIdentifierResolver");

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

const sampleBurntEndorsementChain: TradeTrustErc721Event[] = [
  {
    documentOwner: "0x000000000000000000000000000000000000dEaD",
    eventType: "Burnt",
    eventTimestamp: 1594608809000,
  },
];

describe("EndorsementChainLayout", () => {
  it("should render the error component if there is an error", () => {
    render(<EndorsementChainLayout error={"Some Error"} pending={false} setShowEndorsementChain={() => {}} />);
    expect(screen.getAllByText("Some Error")).toHaveLength(1);
  });

  it("should render the loading component when pending is true", () => {
    render(<EndorsementChainLayout error={""} pending={true} setShowEndorsementChain={() => {}} />);
    expect(screen.getAllByRole("loaderSkeleton")).toHaveLength(9);
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
    expect(screen.getAllByText("Date")).toHaveLength(1);
    expect(screen.getAllByText("Owner")).toHaveLength(1);
    expect(screen.getAllByText("Holder")).toHaveLength(1);
  });

  it("should render text Surrendered to Issuer if surrender event present", () => {
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={sampleSurrenderEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("Surrendered To Issuer")).toHaveLength(1);
  });

  it("should render text Surrendered if burnt event is present", () => {
    render(
      <EndorsementChainLayout
        error={""}
        pending={false}
        endorsementChain={sampleBurntEndorsementChain}
        setShowEndorsementChain={() => {}}
      />
    );
    expect(screen.getAllByText("Surrendered Accepted")).toHaveLength(1);
  });

  it("should fire setShowEndorsementChain when back button is clicked", async () => {
    const mockSetShowEndorsementChain = jest.fn();
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
