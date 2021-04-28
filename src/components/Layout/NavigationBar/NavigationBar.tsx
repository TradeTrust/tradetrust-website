import styled from "@emotion/styled";
import React from "react";
import { Settings } from "react-feather";

import { NavigationItemType, NavigationItem, NavigationBar as NavBar } from "@govtechsg/tradetrust-ui-components";

const navItems: NavigationItem[] = [
  {
    schema: NavigationItemType.DropDownList,
    id: "resources",
    label: "Resources",
    position: "left",
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
    ],
  },
  {
    schema: NavigationItemType.DropDownList,
    id: "news_events",
    label: "News & Events",
    position: "left",
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
    schema: NavigationItemType.NavigationLink,
    id: "contact",
    label: "Contact",
    path: "/contact",
    position: "left",
  },
  {
    schema: NavigationItemType.IconButton,
    id: "settings",
    label: "Settings",
    path: "/settings",
    icon: Settings,
    position: "right",
  },
  {
    schema: NavigationItemType.LabelButton,
    id: "create-documents",
    label: "Create Doc",
    path: "https://creator.tradetrust.io/",
    position: "right",
    className: "create-btn",
  },
  {
    schema: NavigationItemType.LabelButton,
    id: "verify",
    label: "Verify Doc",
    path: "/verify",
    position: "right",
    className: "verify-btn",
  },
];

const NavigationBarStyle = styled.nav`
  .create-btn {
    font-size: 16px;
    color: #3b8cc5;
    background: #ffffff;
    border: 1px solid #e7eaec;
    box-sizing: border-box;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
  }

  .verify-btn {
    font-size: 16px;
    color: #ffffff;
    background: #3b8cc5;
    border: 2px solid #3b8cc5;
    box-sizing: border-box;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
  }
`;

export const NavigationBar = () => {
  return (
    <NavigationBarStyle>
      <NavBar navigationItems={navItems} />
    </NavigationBarStyle>
  );
};
