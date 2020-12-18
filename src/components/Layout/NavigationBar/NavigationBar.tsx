import styled from "@emotion/styled";
import { Dropdown, DropdownItem } from "@govtechsg/tradetrust-ui-components";
import React, { useState } from "react";
import { Settings } from "react-feather";
import { useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import tw from "twin.macro";

interface NavItemsProps {
  id: string;
  label: string;
  path: string;
  dropdownItems?: { id: string; label: string; path: string }[];
}

export const navItems: NavItemsProps[] = [
  {
    id: "verify-documents",
    label: "Verify Documents",
    path: "/#verify-documents",
  },
  {
    id: "create-documents",
    label: "Create Documents",
    path: "https://creator.tradetrust.io/",
  },
  {
    id: "info",
    label: "Info",
    path: "/info",
    dropdownItems: [
      {
        id: "resources",
        label: "Resources",
        path: "/resources",
      },
      {
        id: "media",
        label: "Events and Media Centre",
        path: "/media",
      },
    ],
  },
  {
    id: "faq",
    label: "FAQ",
    path: "/faq",
  },
  {
    id: "contact",
    label: "Contact",
    path: "/#contact",
  },
  {
    id: "settings",
    label: "Settings",
    path: "/settings",
  },
];

export const NavBarItem = (item: NavItemsProps): React.ReactNode => {
  const location = useLocation();
  switch (true) {
    case item.id === "create-documents":
      return <a href={item.path}>{item.label}</a>;
    case item.id === "info":
      return (
        <Dropdown
          dropdownButtonText="Info"
          className="transition-colors duration-200 ease-out font-normal text-greyblue hover:text-white"
        >
          {item.dropdownItems?.map((dropdownItem: any, index: number) => {
            return (
              <DropdownItem key={index}>
                <NavHashLink
                  key={index}
                  to={dropdownItem.path}
                  className="dropdown-link px-2 py-1 block item-center text-nowrap"
                  smooth
                >
                  {dropdownItem.label}
                </NavHashLink>
              </DropdownItem>
            );
          })}
        </Dropdown>
      );
    case item.id === "settings":
      return (
        <NavHashLink
          data-testid="settings"
          to={item.path}
          className={`${location.pathname}${location.hash}` === item.path ? "active" : ""}
          activeClassName=""
          smooth
        >
          <Settings />
        </NavHashLink>
      );
    default:
      return (
        <NavHashLink
          to={item.path}
          className={`${location.pathname}${location.hash}` === item.path ? "active" : ""}
          activeClassName=""
          smooth
          data-testid={`navbar-${item.id}`}
        >
          {item.label}
        </NavHashLink>
      );
  }
};

export const NavBar = styled.nav`
  a {
    ${tw`text-greyblue`}

    &:hover {
      ${tw`text-white`}
    }

    &.active {
      ${tw`text-white`}
    }
  }

  .dropdown-link {
    ${tw`text-grey font-normal`}

    &:not(.active) {
      &:hover {
        ${tw`text-greyblue-700`}
      }
    }

    &.active {
      ${tw`text-orange`}
    }
  }
`;

export const NavigationBar = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <NavBar className="bg-navy">
      <div className="container py-4">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              onClick={() => {
                setIsOn(!isOn);
              }}
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOn ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center lg:items-stretch lg:justify-start">
            <div className="flex-shrink-0">
              <NavHashLink to="/" smooth>
                <img className="img-fluid h-12" src="/static/images/tradetrust_logo.svg" alt="TradeTrust" />
              </NavHashLink>
            </div>
            <div className="hidden lg:block lg:ml-auto">
              <div className="flex h-full items-center">
                {navItems.map((item, index) => {
                  return (
                    <div key={index} className="text-lg font-normal w-auto lg:ml-10">
                      {NavBarItem(item)}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`lg:hidden ${isOn ? "block" : "hidden"}`}>
        <div className="container py-4">
          {navItems.map((item, index) => {
            return (
              <div key={index} className="text-lg font-normal w-full mb-4">
                {NavBarItem(item)}
              </div>
            );
          })}
        </div>
      </div>
    </NavBar>
  );
};
