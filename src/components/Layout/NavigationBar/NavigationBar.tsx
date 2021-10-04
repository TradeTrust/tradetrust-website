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
import { useFeatureFlag } from "../../FeatureFlag";

export const leftNavItems: NavigationItem[] = [
  {
    schema: NAVIGATION_ITEM_TYPE.NavigationLink,
    id: "demo",
    label: "Demo",
    path: "/demo",
    customLink: (
      <NavLink activeClassName="text-cerulean" className="block w-full text-current" to={"/demo"}>
        Demo
      </NavLink>
    ),
  },
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

export const rightNavItems: NavigationItem[] = [
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

const flagName = "MAGIC_DEMO";
const identityFn = (x: any) => x;
interface NavigationBarProps {
  toggleNavBar: boolean;
  setToggleNavBar: (toggleNavbar: boolean) => void;
  leftItems: NavigationItem[];
  rightItems: NavigationItem[];
}

export const NavigationBar: FunctionComponent<NavigationBarProps> = (props) => {
  const { leftItems, rightItems } = props;
  const [derivedLeftItems, setDerivedLeftItems] = React.useState<NavigationItem[]>([]);
  const flag = useFeatureFlag(flagName);
  React.useEffect(() => {
    const filterCallback = flag ? identityFn : (item: NavigationItem) => item.id !== "demo";
    const currentLeftItems = leftItems.filter(filterCallback);
    return setDerivedLeftItems(currentLeftItems);
  }, [flag, leftItems]);
  return (
    <NavBar
      logo={<NavLogo />}
      menuLeft={derivedLeftItems}
      menuRight={rightItems}
      menuMobile={[...derivedLeftItems, ...rightItems]}
      setToggleNavBar={props.setToggleNavBar}
      toggleNavBar={props.toggleNavBar}
    />
  );
};
