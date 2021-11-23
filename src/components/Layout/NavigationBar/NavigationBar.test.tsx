import React from "react";
import { render, screen } from "@testing-library/react";
import { NavigationBar, leftNavItems, rightNavItems } from "./NavigationBar";

jest.mock("./../../../config", () => ({
  NETWORK: "mainnet",
}));

describe("navigation bar demo flow", () => {
  it("should not render demo if network is mainnet", () => {
    render(
      <NavigationBar
        setToggleNavBar={() => {}}
        toggleNavBar={false}
        leftItems={leftNavItems}
        rightItems={rightNavItems}
      />
    );
    expect(screen.queryAllByRole("link", { name: "Demo" }).length).toBe(0);
  });
});
