import React, { FunctionComponent } from "react";
import { Settings } from "react-feather";
import { NavigationBarStyled, NavigationBar as NavBar } from "@govtechsg/tradetrust-ui-components";
import { NavigationItem, NavigationItemType } from "./type"; // for CR: see if any chance to use this as exported from tradetrust-ui-components (to maintain component shape)
import { NavigationBarItem } from "./NavigationBarItem"; // for CR: see if any chance to use this as exported from tradetrust-ui-components (to maintain component shape)

const leftNavItems: NavigationItem[] = [
  {
    schema: NavigationItemType.DropDownList,
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
    ],
  },
  {
    schema: NavigationItemType.DropDownList,
    id: "media_events",
    label: "Media & Events",
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
    schema: NavigationItemType.NavigationLink,
    id: "contact",
    label: "Contact",
    path: "/contact",
  },
];

// for CR: see if any chance to use this as exported from tradetrust-ui-components (to maintain component shape)
const leftMenu = (navigationItems: NavigationItem[]) => {
  return (
    <div className="flex items-center">
      {navigationItems.map((item, index) => {
        return (
          <div key={index} className="lg:ml-6">
            <NavigationBarItem item={item} />
          </div>
        );
      })}
    </div>
  );
};

const rightNavItems: NavigationItem[] = [
  {
    schema: NavigationItemType.IconButton,
    id: "settings",
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
  {
    schema: NavigationItemType.LabelButton,
    id: "create-documents",
    label: "Create Doc",
    path: "https://creator.tradetrust.io/",
    className: "bg-white text-cerulean border-cerulean-100 hover:bg-gray-50",
  },
  {
    schema: NavigationItemType.LabelButton,
    id: "verify",
    label: "Verify Doc",
    path: "/verify",
    className: "bg-cerulean text-white border-cerulean hover:bg-cerulean-300 hover:border-cerulean-300",
  },
];

// for CR: see if any chance to use this as exported from tradetrust-ui-components (to maintain component shape)
const rightMenu = (navigationItems: NavigationItem[]) => {
  return (
    <div className="flex items-center">
      {navigationItems.map((item, index) => {
        return (
          <div key={index} className="md:ml-2 lg:ml-4">
            <NavigationBarItem item={item} />
          </div>
        );
      })}
    </div>
  );
};

const mobileMenu = (navigationItems: NavigationItem[]) => {
  return navigationItems.map((item, index) => {
    if (item.id === "create-documents" || item.id === "verify" || item.id === "settings") {
      return (
        <div key={index} className="py-4 md:hidden">
          <NavigationBarItem item={item} />
        </div>
      );
    }
    return (
      <div key={index} className="py-4">
        <NavigationBarItem item={item} />
      </div>
    );
  });
};

export const NavigationBar: FunctionComponent<{
  toggleNavBar: boolean;
  setToggleNavBar: (toggleNavbar: boolean) => void;
}> = (props) => {
  return (
    <NavigationBarStyled>
      <NavBar
        leftMenuChildren={leftMenu(leftNavItems)}
        rightMenuChildren={rightMenu(rightNavItems)}
        mobileMenuChildren={mobileMenu(leftNavItems.concat(rightNavItems))}
        setToggleNavBar={props.setToggleNavBar}
        toggleNavBar={props.toggleNavBar}
      />
    </NavigationBarStyled>
  );
};
