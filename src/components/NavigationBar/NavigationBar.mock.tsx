import React from "react";
import { Settings } from "react-feather";
import { NavigationItem, NAVIGATION_ITEM_TYPE } from "./type";
import { Button, ButtonSize } from "../Button";

export const MockLogo = (): React.ReactElement => {
  return (
    <a href="https://www.tradetrust.io/" className="inline-block mx-auto">
      <img src={"/static/images/tradetrust_logo.svg"} />
    </a>
  );
};

export const MockLeftNavItems: NavigationItem[] = [
  {
    schema: NAVIGATION_ITEM_TYPE.NavigationDropDownList,
    id: "resources",
    label: "Resources",
    path: "",
    dropdownItems: [
      {
        id: "learn",
        label: "Learn",
        path: "/learn",
      },
      {
        id: "faq",
        label: "FAQ",
        path: "/faq",
      },
      {
        id: "guidelines",
        label: "Guidelines (Non-Ethereum)",
        path: "/guidelines",
      },
    ],
  },
  {
    schema: NAVIGATION_ITEM_TYPE.NavigationDropDownList,
    id: "news-events",
    label: "News & Events",
    path: "",
    dropdownItems: [
      {
        id: "media",
        label: "Media",
        path: "/media",
      },
      {
        id: "event",
        label: "Event",
        path: "/event",
      },
    ],
  },
  {
    schema: NAVIGATION_ITEM_TYPE.NavigationLink,
    id: "contact",
    label: "Contact",
    path: "/contact",
  },
];

export const MockRightNavItems: NavigationItem[] = [
  {
    schema: NAVIGATION_ITEM_TYPE.NavigationIconButton,
    id: "settings",
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    schema: NAVIGATION_ITEM_TYPE.NavigationLabelButton,
    id: "create-documents",
    label: "Create Doc",
    path: "https://creator.tradetrust.io/",
    customLink: (
      <a href="#">
        <Button className="bg-white text-cerulean-500 hover:bg-gray-50 border border-cloud-200" size={ButtonSize.SM}>
          Create Doc
        </Button>
      </a>
    ),
  },
  {
    schema: NAVIGATION_ITEM_TYPE.NavigationLabelButton,
    id: "verify",
    label: "Verify Doc",
    path: "/verify",
    customLink: (
      <a href="#">
        <Button className="bg-cerulean-500 text-white hover:bg-cerulean-800" size={ButtonSize.SM}>
          Verify Doc
        </Button>
      </a>
    ),
  },
];

export const MockMobileNavItems: NavigationItem[] = MockLeftNavItems.concat(MockRightNavItems);
