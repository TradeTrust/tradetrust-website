import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { NavigationBar } from "./NavigationBar";
import { MockLogo, MockLeftNavItems, MockRightNavItems, MockMobileNavItems } from "./NavigationBar.mock";

describe("Navigation Bar", () => {
  it("should render correctly with the given input on desktop menu", () => {
    render(
      <NavigationBar
        logo={<MockLogo />}
        menuLeft={MockLeftNavItems}
        menuRight={MockRightNavItems}
        menuMobile={[]}
        setToggleNavBar={() => {}}
        toggleNavBar={false}
      />
    );

    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("News & Events")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Create Doc")).toBeInTheDocument();
    expect(screen.getByText("Verify Doc")).toBeInTheDocument();
    expect(screen.getByTestId("settings")).toBeInTheDocument();
  });

  it("should render correctly with the given input on mobile menu", () => {
    render(
      <NavigationBar
        logo={<MockLogo />}
        menuLeft={[]}
        menuRight={[]}
        menuMobile={MockMobileNavItems}
        setToggleNavBar={() => {}}
        toggleNavBar={false}
      />
    );

    expect(screen.getByText("Resources")).toBeInTheDocument();
    expect(screen.getByText("News & Events")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Create Doc")).toBeInTheDocument();
    expect(screen.getByText("Verify Doc")).toBeInTheDocument();
    expect(screen.getByTestId("settings")).toBeInTheDocument();
  });

  it("should render correctly with the given input on desktop and mobile menu", () => {
    render(
      <NavigationBar
        logo={<MockLogo />}
        menuLeft={MockLeftNavItems}
        menuRight={MockRightNavItems}
        menuMobile={MockMobileNavItems}
        setToggleNavBar={() => {}}
        toggleNavBar={false}
      />
    );

    expect(screen.getAllByText("Resources")).toHaveLength(2);
    expect(screen.getAllByText("News & Events")).toHaveLength(2);
    expect(screen.getAllByText("Contact")).toHaveLength(2);
    expect(screen.getAllByText("Create Doc")).toHaveLength(2);
    expect(screen.getAllByText("Verify Doc")).toHaveLength(2);
    expect(screen.getAllByTestId("settings")).toHaveLength(2);
  });

  it("should collapse dropdown menu when click on other links", () => {
    render(
      <NavigationBar
        logo={<MockLogo />}
        menuLeft={MockLeftNavItems}
        menuRight={MockRightNavItems}
        menuMobile={[]}
        setToggleNavBar={() => {}}
        toggleNavBar={false}
      />
    );

    fireEvent.click(screen.getByText("Resources"));
    expect(screen.getByText("Learn")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Contact"));
    expect(screen.queryByText("Learn")).not.toBeInTheDocument();
  });

  it("should collapse dropdown menu when click anywhere else", () => {
    render(
      <NavigationBar
        logo={<MockLogo />}
        menuLeft={MockLeftNavItems}
        menuRight={MockRightNavItems}
        menuMobile={[]}
        setToggleNavBar={() => {}}
        toggleNavBar={false}
      />
    );

    fireEvent.click(screen.getByText("Resources"));
    expect(screen.getByText("Learn")).toBeInTheDocument();
    fireEvent.click(document.body);
    expect(screen.queryByText("Learn")).not.toBeInTheDocument();
  });
});
