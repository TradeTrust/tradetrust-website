import React, { FunctionComponent } from "react";
import { Settings } from "react-feather";
import {
  Button,
  NavigationBar as NavBar,
  NavigationItem,
  NAVIGATION_ITEM_TYPE,
  ButtonSize,
} from "@govtechsg/tradetrust-ui-components";
import { NavLink } from "react-router-dom";
import { URLS } from "../../../constants";
import { NETWORK } from "./../../../config";

const leftNavItems: NavigationItem[] = [
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
        customLink: (
          <NavLink activeClassName="text-cerulean" className="block w-full px-4 py-3" to={"/learn"}>
            Learn
          </NavLink>
        ),
      },
      {
        id: "faq",
        label: "FAQ",
        path: "/faq",
        customLink: (
          <NavLink activeClassName="text-cerulean" className="block w-full px-4 py-3" to={"/faq"}>
            FAQ
          </NavLink>
        ),
      },
      {
        id: "eta",
        label: "ETA",
        path: "/eta",
        customLink: (
          <NavLink activeClassName="text-cerulean" className="block w-full px-4 py-3" to={"/eta"}>
            ETA
          </NavLink>
        ),
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
        id: "news",
        label: "News",
        path: "/news",
        customLink: (
          <NavLink activeClassName="text-cerulean" className="block w-full px-4 py-3" to={"/news"}>
            News
          </NavLink>
        ),
      },
      {
        id: "event",
        label: "Event",
        path: "/event",
        customLink: (
          <NavLink activeClassName="text-cerulean" className="block w-full px-4 py-3" to={"/event"}>
            Event
          </NavLink>
        ),
      },
    ],
  },
  {
    schema: NAVIGATION_ITEM_TYPE.NavigationLink,
    id: "contact",
    label: "Contact",
    path: "/contact",
    customLink: (
      <NavLink activeClassName="text-cerulean" className="block w-full text-current" to={"/contact"}>
        Contact
      </NavLink>
    ),
  },
];

if (NETWORK === "ropsten") {
  // demo flow is only for ropsten network
  leftNavItems.unshift({
    schema: NAVIGATION_ITEM_TYPE.NavigationLink,
    id: "demo",
    label: "Demo",
    path: "/demo",
    customLink: (
      <NavLink activeClassName="text-cerulean" className="block w-full text-current" to={"/demo"}>
        Demo
      </NavLink>
    ),
  });
}

const rightNavItems: NavigationItem[] = [
  {
    schema: NAVIGATION_ITEM_TYPE.NavigationIconButton,
    id: "settings",
    label: "Settings",
    path: "/settings",
    icon: Settings,
    customLink: (
      <NavLink activeClassName="text-cerulean" className="block w-full py-2 text-current" to={"/settings"}>
        <Settings className="stroke-current" />
      </NavLink>
    ),
  },
  {
    schema: NAVIGATION_ITEM_TYPE.NavigationLabelButton,
    id: "create-documents",
    label: "Create Doc",
    path: URLS.CREATOR,
    customLink: (
      <a href={URLS.CREATOR}>
        <Button className="bg-white text-cerulean hover:bg-gray-50" size={ButtonSize.SM}>
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
      <NavLink to={"/verify"}>
        <Button className="bg-cerulean text-white hover:bg-cerulean-500" size={ButtonSize.SM}>
          Verify Doc
        </Button>
      </NavLink>
    ),
  },
];

const NavLogo = () => {
  return (
    <NavLink to={"/"} data-testid="nav-logo-home">
      <h4 className="text-gray-800">TradeTrust</h4>
    </NavLink>
  );
};

export const NavigationBar: FunctionComponent<{
  toggleNavBar: boolean;
  setToggleNavBar: (toggleNavbar: boolean) => void;
}> = (props) => {
  return (
    <NavBar
      logo={<NavLogo />}
      menuLeft={leftNavItems}
      menuRight={rightNavItems}
      menuMobile={leftNavItems.concat(rightNavItems)}
      setToggleNavBar={props.setToggleNavBar}
      toggleNavBar={props.toggleNavBar}
    />
  );
};
