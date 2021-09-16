import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NavigationBar } from "./NavigationBar";

jest.mock("./../../../config", () => ({
  NETWORK: "mainnet",
}));

describe("navigation bar demo flow", () => {
  it("should not render demo if network is mainnet", () => {
    render(
      <MemoryRouter>
        <NavigationBar setToggleNavBar={() => {}} toggleNavBar={false} />
      </MemoryRouter>
    );
    expect(screen.queryAllByRole("link", { name: "Demo" }).length).toBe(0);
  });
});
