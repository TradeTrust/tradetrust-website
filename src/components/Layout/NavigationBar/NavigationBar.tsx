import React, { FunctionComponent } from "react";
import { Settings } from "react-feather";
import {
  Button,
  NavigationBar as NavBar,
  NavigationItem,
  NAVIGATION_ITEM_TYPE,
  ButtonSize,
} from "@govtechsg/tradetrust-ui-components";
import { URLS } from "../../../constants";
import { useFeatureFlag } from "../../FeatureFlag";
import { NavLink } from "../../UI/NavLink";

export const leftNavItems: NavigationItem[] = [
  {
    schema: NAVIGATION_ITEM_TYPE.NavigationLink,
    id: "demo",
    label: "Demo",
    path: "/demo",
    customLink: (
      <NavLink activeClassName="text-cerulean" href={"/demo"}>
        <a className="block w-full text-current">Demo</a>
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
          <NavLink activeClassName="text-cerulean" href={"/learn"}>
            <a className="block w-full px-4 py-3">Learn</a>
          </NavLink>
        ),
      },
      {
        id: "faq",
        label: "FAQ",
        path: "/faq",
        customLink: (
          <NavLink activeClassName="text-cerulean" href={"/faq"}>
            <a className="block w-full px-4 py-3">FAQ</a>
          </NavLink>
        ),
      },
      {
        id: "eta",
        label: "ETA",
        path: "/eta",
        customLink: (
          <NavLink activeClassName="text-cerulean" href={"/eta"}>
            <a className="block w-full px-4 py-3">ETA</a>
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
          <NavLink activeClassName="text-cerulean" href={"/news"}>
            <a className="block w-full px-4 py-3">News</a>
          </NavLink>
        ),
      },
      {
        id: "event",
        label: "Event",
        path: "/event",
        customLink: (
          <NavLink activeClassName="text-cerulean" href={"/event"}>
            <a className="block w-full px-4 py-3">Event</a>
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
      <NavLink activeClassName="text-cerulean" href={"/contact"}>
        <a className="block w-full text-current">Contact</a>
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
      <NavLink activeClassName="text-cerulean" href={"/settings"}>
        <a className="block w-full py-2 text-current">
          <Settings className="stroke-current" />
        </a>
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
      <Button className="bg-cerulean hover:bg-cerulean-500" size={ButtonSize.SM}>
        <NavLink href={"/verify"}>
          <a className="text-white">Verify Doc</a>
        </NavLink>
      </Button>
    ),
  },
];

const NavLogo = () => {
  return (
    <NavLink href={"/"} data-testid="nav-logo-home">
      <a>
        <h4 className="text-gray-800">TradeTrust</h4>
      </a>
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
