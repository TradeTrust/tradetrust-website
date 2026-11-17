import React, { FunctionComponent } from "react";
import { Settings } from "react-feather";
import { NavLink } from "react-router-dom";
import { signOut } from "../../../aiTemplateGenerator/googleIdentity";
import { useGoogleSession } from "../../../aiTemplateGenerator/googleSession";
import { URLS } from "../../../constants";
import { Button, ButtonSize } from "../../Button";
import { NavigationBar as NavBar, NAVIGATION_ITEM_TYPE, NavigationItem } from "../../NavigationBar";

const signOutNavItem: NavigationItem = {
  schema: NAVIGATION_ITEM_TYPE.NavigationLink,
  id: "sign-out",
  label: "Sign out",
  path: "/ai-template-generator",
  customLink: (
    <button
      type="button"
      data-testid="sign-out"
      className="text-cloud-500 hover:text-cerulean-500 font-gilroy-bold text-sm bg-transparent border-0 cursor-pointer"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  ),
};

export const leftNavItems: NavigationItem[] = [
  {
    schema: NAVIGATION_ITEM_TYPE.NavigationLink,
    id: "ai-template-generator",
    label: "AI Template Generator",
    path: "/ai-template-generator",
    customLink: (
      <NavLink
        to="/ai-template-generator"
        data-testid="nav-ai-template-generator"
        className="text-cloud-500 hover:text-cerulean-500"
        activeClassName="text-cerulean-500 font-gilroy-bold border-b-2 border-cerulean-500"
      >
        AI Template Generator
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
      <NavLink
        activeClassName="text-cerulean-500"
        className="block w-full py-2 text-current"
        to={"/settings"}
        aria-label="Settings"
      >
        <Settings className="stroke-current" />
      </NavLink>
    ),
  },
  {
    schema: NAVIGATION_ITEM_TYPE.NavigationLabelButton,
    id: "create-documents",
    label: "Create Doc",
    path: "/creator",
    customLink: (
      <NavLink to={"/creator"}>
        <Button className="bg-white text-cerulean-500 hover:bg-cloud-100" size={ButtonSize.SM}>
          Create Doc
        </Button>
      </NavLink>
    ),
  },
  {
    schema: NAVIGATION_ITEM_TYPE.NavigationLabelButton,
    id: "verify",
    label: "Verify Doc",
    path: "/",
    customLink: (
      <NavLink to={"/"}>
        <Button className="bg-cerulean-500 text-white hover:bg-cerulean-800" size={ButtonSize.SM}>
          Verify Doc
        </Button>
      </NavLink>
    ),
  },
];

const NavLogo = () => {
  return (
    <a href={`${URLS.INFO}`} data-testid="nav-logo-home">
      <img src="/static/images/tradetrust_logo.svg" alt="TradeTrust Logo" />
    </a>
  );
};

interface NavigationBarProps {
  toggleNavBar: boolean;
  setToggleNavBar: (toggleNavbar: boolean) => void;
  leftItems: NavigationItem[];
  rightItems: NavigationItem[];
}

function signedInEmailItem(email: string | null): NavigationItem {
  return {
    schema: NAVIGATION_ITEM_TYPE.NavigationLink,
    id: "signed-in-email",
    label: email || "Signed in",
    path: "/ai-template-generator",
    customLink: (
      <span data-testid="signed-in-email" className="text-sm text-cloud-500">
        {email || "Signed in"}
      </span>
    ),
  };
}

export function useLayoutNavItems(): { leftItems: NavigationItem[]; rightItems: NavigationItem[] } {
  const session = useGoogleSession();
  return {
    leftItems: leftNavItems,
    rightItems: session.idToken ? [signedInEmailItem(session.email), signOutNavItem, ...rightNavItems] : rightNavItems,
  };
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
