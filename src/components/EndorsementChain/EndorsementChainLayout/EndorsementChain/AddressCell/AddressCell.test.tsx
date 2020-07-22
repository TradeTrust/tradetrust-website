import { render, screen } from "@testing-library/react";
import React from "react";
import { AddressCell } from "./AddressCell";

describe("AddressCell", () => {
  it("should render correctly", () => {
    render(
      <AddressCell
        address="0x6FFeD6E6591b808130a9b248fEA32101b5220eca"
        titleEscrowAddress="0x748938d2DEc5511A50F836ede82e2831cC4A7f80"
        newAddress={true}
      />
    );
    expect(screen.getAllByText("0x6FFeD6E6591b808130a9b248fEA32101b5220eca")).toHaveLength(1);
    expect(screen.getAllByText("0x748938d2DEc5511A50F836ede82e2831cC4A7f80")).toHaveLength(1);
    expect(screen.getByTestId("dot")).not.toBeNull();
  });

  it("should not render the dot in the UI if newAddress is false", () => {
    render(
      <AddressCell
        address="0x6FFeD6E6591b808130a9b248fEA32101b5220eca"
        titleEscrowAddress="0x748938d2DEc5511A50F836ede82e2831cC4A7f80"
        newAddress={false}
      />
    );
    expect(screen.queryByTestId("dot")).toBeNull();
  });
});
