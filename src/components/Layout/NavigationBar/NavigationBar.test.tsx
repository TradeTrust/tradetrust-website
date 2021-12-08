import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NavigationBar, leftNavItems, rightNavItems } from "./NavigationBar";
import * as featureFlag from "./../../../components/FeatureFlag";

jest.mock("./../../../config", () => ({
  NETWORK_NAME: "homestead",
}));
jest.mock("magic-sdk");
jest.mock("./../../../components/FeatureFlag");

const mockedFeatureFlag = featureFlag as jest.Mocked<typeof featureFlag>;

describe("navigation bar demo flow", () => {
  beforeAll(() => {
    mockedFeatureFlag.useFeatureFlag.mockReturnValue(false);
  });

  it("should not render demo if network is mainnet", () => {
    render(
      <MemoryRouter>
        <NavigationBar
          setToggleNavBar={() => {}}
          toggleNavBar={false}
          leftItems={leftNavItems}
          rightItems={rightNavItems}
        />
      </MemoryRouter>
    );
    expect(screen.queryAllByRole("link", { name: "Demo" }).length).toBe(0);
  });
});
