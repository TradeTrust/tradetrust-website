import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { NavigationBarItem } from "./NavigationBarItem";
import * as NavType from "./../type";
import { Settings } from "react-feather";

describe("NavigationLink", () => {
  it("should render correctly with the given customLink", () => {
    const NavigationLink: NavType.NavigationItem = {
      schema: NavType.NAVIGATION_ITEM_TYPE.NavigationLink,
      id: "verify",
      label: "Default NavigationLink",
      path: "/verify",
      customLink: <a href={"/verify"}>CustomLink NavigationLink</a>,
    };

    render(<NavigationBarItem item={NavigationLink} />);
    expect(screen.getAllByText("CustomLink NavigationLink")).toHaveLength(1);
  });

  it("should render default style with no customLink", () => {
    const NavigationLink: NavType.NavigationItem = {
      schema: NavType.NAVIGATION_ITEM_TYPE.NavigationLink,
      id: "verify",
      label: "Default NavigationLink",
      path: "/verify",
    };

    render(<NavigationBarItem item={NavigationLink} />);
    expect(screen.getAllByText("Default NavigationLink")).toHaveLength(1);
  });
});

describe("NavigationLabelButton", () => {
  it("should render correctly with the given customLink", () => {
    const NavigationLabelButton: NavType.NavigationItem = {
      schema: NavType.NAVIGATION_ITEM_TYPE.NavigationLabelButton,
      id: "verify",
      label: "Default NavigationLabelButton",
      path: "/verify",
      customLink: <a href={"/verify"}>CustomLink NavigationLabelButton</a>,
    };

    render(<NavigationBarItem item={NavigationLabelButton} />);
    expect(screen.getAllByText("CustomLink NavigationLabelButton")).toHaveLength(1);
  });

  it("should render default style with no customLink", () => {
    const NavigationLabelButton: NavType.NavigationItem = {
      schema: NavType.NAVIGATION_ITEM_TYPE.NavigationLabelButton,
      id: "verify",
      label: "Default NavigationLabelButton",
      path: "/verify",
    };

    render(<NavigationBarItem item={NavigationLabelButton} />);
    expect(screen.getAllByText("Default NavigationLabelButton")).toHaveLength(1);
  });
});

describe("NavigationIconButton", () => {
  it("should render correctly with the given customLink", () => {
    const NavigationIconButton: NavType.NavigationItem = {
      schema: NavType.NAVIGATION_ITEM_TYPE.NavigationIconButton,
      id: "settings",
      label: "Settings",
      path: "/settings",
      icon: Settings,
      customLink: <a href={"/verify"}>CustomLink NavigationIconButton</a>,
    };

    render(<NavigationBarItem item={NavigationIconButton} />);
    expect(screen.getAllByText("CustomLink NavigationIconButton")).toHaveLength(1);
  });

  it("should render default style with no customLink", () => {
    const NavigationIconButton: NavType.NavigationItem = {
      schema: NavType.NAVIGATION_ITEM_TYPE.NavigationIconButton,
      id: "settings",
      label: "Settings",
      path: "/settings",
      icon: Settings,
    };

    render(<NavigationBarItem item={NavigationIconButton} />);
    expect(screen.getAllByTestId("settings")).toHaveLength(1);
  });
});

describe("NavigationDropDownList", () => {
  it("should render correctly with the given customLink", () => {
    const NavigationDropDownList: NavType.NavigationItem = {
      schema: NavType.NAVIGATION_ITEM_TYPE.NavigationDropDownList,
      id: "news-events",
      label: "News & Events",
      path: "",
      dropdownItems: [
        {
          id: "news",
          label: "Default News",
          path: "/news",
          customLink: <a href={"/news"}>CustomLink News</a>,
        },
        {
          id: "event",
          label: "Default Event",
          path: "/event",
          customLink: <a href={"/event"}>CustomLink Event</a>,
        },
      ],
    };

    render(<NavigationBarItem item={NavigationDropDownList} />);
    fireEvent.click(screen.getByText("News & Events"));
    expect(screen.getAllByText("CustomLink News")).toHaveLength(1);
    expect(screen.getAllByText("CustomLink Event")).toHaveLength(1);
  });

  it("should render default style with no customLink", () => {
    const NavigationDropDownList: NavType.NavigationItem = {
      schema: NavType.NAVIGATION_ITEM_TYPE.NavigationDropDownList,
      id: "news-events",
      label: "News & Events",
      path: "",
      dropdownItems: [
        {
          id: "news",
          label: "Default News",
          path: "/news",
        },
        {
          id: "event",
          label: "Default Event",
          path: "/event",
        },
      ],
    };

    render(<NavigationBarItem item={NavigationDropDownList} />);
    fireEvent.click(screen.getByText("News & Events"));
    expect(screen.getAllByText("Default News")).toHaveLength(1);
    expect(screen.getAllByText("Default Event")).toHaveLength(1);
  });
});
