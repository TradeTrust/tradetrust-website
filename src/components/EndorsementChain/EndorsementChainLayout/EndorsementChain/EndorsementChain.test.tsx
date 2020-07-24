import { fireEvent, render, screen, act } from "@testing-library/react";
import React from "react";
import { TitleEscrowEvent } from "../../../../types";
import { EndorsementChain } from "./EndorsementChain";

jest.mock("../../../../common/hooks/useIdentifierResolver");

const sampleEndorsementChain: TitleEscrowEvent[] = [
  {
    titleEscrowAddress: "0x748938d2DEc5511A50F836ede82e2831cC4A7f80",
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

describe("EndorsementChain", () => {
  it("should render correctly", () => {
    render(<EndorsementChain endorsementChain={sampleEndorsementChain} setShowEndorsementChain={() => {}} />);

    expect(screen.queryAllByText("0x6FFeD6E6591b808130a9b248fEA32101b5220eca")).toHaveLength(3);
    expect(screen.queryAllByText("0x8e87c7cEc2D4464119C937bfef3398ebb1d9452e")).toHaveLength(1);
    expect(screen.queryAllByText("Date")).toHaveLength(1);
    expect(screen.queryAllByText("Beneficiary")).toHaveLength(1);
    expect(screen.queryAllByText("Holder")).toHaveLength(1);
  });

  it("should fire setShowEndorsementChain when back button is clicked", async () => {
    const mockSetShowEndorsementChain = jest.fn();
    render(
      <EndorsementChain
        endorsementChain={sampleEndorsementChain}
        setShowEndorsementChain={mockSetShowEndorsementChain}
      />
    );
    act(() => {
      fireEvent.click(screen.getByTestId("back-button"));
    });
    expect(mockSetShowEndorsementChain).toHaveBeenCalledTimes(1);
  });
});
