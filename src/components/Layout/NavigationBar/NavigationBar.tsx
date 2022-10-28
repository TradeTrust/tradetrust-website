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

const sharedStyles = "block w-full px-4 py-3 text-cloud-500";

export const leftNavItems: NavigationItem[] = [
  // HOT FIX (remove magic demo until a more concrete business decision can be made)
  // {
  //   schema: NAVIGATION_ITEM_TYPE.NavigationLink,
  //   id: "demo",
  //   label: "Demo",
  //   path: "/demo",
  //   customLink: (
  //     <NavLink activeClassName="text-cerulean-500" className="block w-full text-current" to={"/demo"}>
  //       Demo
  //     </NavLink>
  //   ),
  // },
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
          <NavLink activeClassName="text-cerulean-500" className={sharedStyles} to={"/learn"}>
            Learn
          </NavLink>
        ),
      },
      {
        id: "faq",
        label: "FAQ",
        path: "/faq",
        customLink: (
          <NavLink activeClassName="text-cerulean-500" className={sharedStyles} to={"/faq"}>
            FAQ
          </NavLink>
        ),
      },
      {
        id: "eta",
        label: "ETA",
        path: "/eta",
        customLink: (
          <NavLink activeClassName="text-cerulean-500" className={sharedStyles} to={"/eta"}>
            ETA
          </NavLink>
        ),
      },
      {
        id: "guidelines(non-ethereum)",
        label: "Guidelines (Non-Ethereum)",
        path: "/guidelines",
        customLink: (
          <NavLink activeClassName="text-cerulean-500" className={sharedStyles} to={"/guidelines"}>
            Guidelines (Non-Ethereum)
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
          <NavLink activeClassName="text-cerulean-500" className={sharedStyles} to={"/news"}>
            News
          </NavLink>
        ),
      },
      {
        id: "event",
        label: "Event",
        path: "/event",
        customLink: (
          <NavLink activeClassName="text-cerulean-500" className={sharedStyles} to={"/event"}>
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
      <NavLink activeClassName="text-cerulean-500" className="block w-full text-current" to={"/contact"}>
        Contact
      </NavLink>
    ),
  },
];

export const rightNavItems: NavigationItem[] = [
  {
    schema: NAVIGATION_ITEM_TYPE.NavigationIconButton,
    id: "settings",
    label: "Settings",
    path: "/settings",
    icon: Settings,
    customLink: (
      <NavLink activeClassName="text-cerulean-500" className="block w-full py-2 text-current" to={"/settings"}>
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
        <Button className="bg-white text-cerulean-500 hover:bg-cloud-100" size={ButtonSize.SM}>
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
        <Button className="bg-cerulean-500 text-white hover:bg-cerulean-800" size={ButtonSize.SM}>
          Verify Doc
        </Button>
      </NavLink>
    ),
  },
];

const NavLogo = () => {
  return (
    <NavLink to={"/"} data-testid="nav-logo-home">
      <img src="/static/images/tradetrust_logo.svg" />
    </NavLink>
  );
};

interface NavigationBarProps {
  toggleNavBar: boolean;
  setToggleNavBar: (toggleNavbar: boolean) => void;
  leftItems: NavigationItem[];
  rightItems: NavigationItem[];
}

export const NavigationBar: FunctionComponent<NavigationBarProps> = (props) => {
  const { leftItems, rightItems } = props;

  return (
    <NavBar
      logo={<NavLogo />}
      menuLeft={leftItems}
      menuRight={rightItems}
      menuMobile={[...leftItems, ...rightItems]}
      setToggleNavBar={props.setToggleNavBar}
      toggleNavBar={props.toggleNavBar}
    />
  );
};
