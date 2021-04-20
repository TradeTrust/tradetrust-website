import styled from "@emotion/styled";
import React, { useState } from "react";
import { Settings } from "react-feather";
import { useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";

type NavItemsProps = {
  id: string;
  label: string;
  path?: string;
  position?: "center" | "right";
  dropdownItems?: { id: string; label: string; path: string }[];
};

export const navItems: NavItemsProps[] = [
  {
    id: "demo",
    label: "Demo",
    path: "/demo",
    position: "center",
  },
  {
    id: "resources",
    label: "Resources",
    position: "center",
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
    id: "news_events",
    label: "News & Events",
    position: "center",
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
    id: "contact",
    label: "Contact",
    path: "/contact",
    position: "center",
  },
  {
    id: "settings",
    label: "Settings",
    path: "/settings",
    position: "right",
  },
  {
    id: "create-documents",
    label: "Create Doc",
    path: "https://creator.tradetrust.io/",
    position: "right",
  },
  {
    id: "verify",
    label: "Verify Doc",
    path: "/verify",
    position: "right",
  },
];

export const NavBarItem = (item: NavItemsProps): React.ReactNode => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  switch (item.id) {
    case "resources":
    case "news_events":
      return (
        <div className="relative inline-block text-left">
          <button
            type="button"
            className="inline-flex w-full text-lg font-normal focus:outline-none items-center dropdown-link"
            aria-expanded={isOpen}
            aria-haspopup="true"
            onClick={() => setIsOpen(!isOpen)}
            id={item.id + "-button"}
          >
            {item.label}
            <svg
              className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-200 ease-linear transform lg:rotate-0 ${
                isOpen ? "rotate-0" : "-rotate-90"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isOpen && (
            <div
              className="mt-2 w-full bg-white focus:outline-none md:origin-top-right md:absolute md:right-0 md:mt-2 rounded-md md:shadow-lg md:ring-1 md:ring-black md:ring-opacity-5 z-30"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby={item.id + "-button"}
            >
              <div className="py-1" role="none">
                {item.dropdownItems?.map((dropdownItem: any, index: number) => {
                  return (
                    <a href={dropdownItem.path} key={index} className="block px-4 py-2 text-lg" role="menuitem">
                      {dropdownItem.label}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    case "create-documents":
      return (
        <a href={item.path} className="w-full">
          <button className="create-btn text-lg font-semibold py-2 px-4">{item.label}</button>
        </a>
      );
    case "verify":
      return (
        <a href={item.path} className="w-full">
          <button className="verify-btn text-lg font-semibold py-2 px-4" data-testid="navbar-verify-documents">
            {item.label}
          </button>
        </a>
      );

    case "settings":
      return (
        <NavHashLink
          to={item.path ?? ""}
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
          to={item.path ?? ""}
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
    color: #6e787f;
    display: block;
  }

  button {
    color: #6e787f;
  }

  .navbar-toggler {
    padding: 0.25rem 0.75rem;
    font-size: 1.25rem;
    line-height: 1;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 0.25rem;

    &:hover,
    &:focus {
      text-decoration: none;
      outline: none;
    }

    .icon-bar {
      background-color: #563d7c;
      display: block;
      width: 22px;
      height: 2px;
      border-radius: 1px;
      transition: all 0.2s;
    }

    .icon-bar + .icon-bar {
      margin-top: 10px;
    }

    .top-bar {
      transform: rotate(45deg);
      transform-origin: 10% 10%;
    }

    .bottom-bar {
      transform: rotate(-45deg);
      transform-origin: 10% 90%;
    }

    &.collapsed .top-bar {
      transform: rotate(0);
    }

    &.collapsed .bottom-bar {
      transform: rotate(0);
    }
  }

  .create-btn {
    color: #3b8cc5;
    background: #ffffff;
    border: 1px solid #e7eaec;
    box-sizing: border-box;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
  }

  .verify-btn {
    color: #ffffff;
    background: #3b8cc5;
    border: 2px solid #3b8cc5;
    box-sizing: border-box;
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.15);
    border-radius: 12px;
  }
`;

export const NavigationBar = () => {
  const [isOn, setIsOn] = useState(false);
  return (
    <NavBar>
      <div className={`container py-2`}>
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            <button
              className={`navbar-toggler outline-none ${isOn ? "" : "collapsed"}`}
              onClick={() => {
                setIsOn(!isOn);
              }}
            >
              <span className="icon-bar top-bar" />
              <span className="icon-bar bottom-bar" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center lg:items-stretch lg:justify-start">
            <div className="flex-shrink-0">
              <NavHashLink to="/" smooth>
                <img
                  data-testid="nav-logo-home"
                  className="img-fluid h-12"
                  src="/static/images/tradetrust_logo.svg"
                  alt="TradeTrust"
                />
              </NavHashLink>
            </div>
            <div className="hidden lg:block lg:mx-auto">
              <div className="flex h-full items-center">
                {navItems.map((item, index) => {
                  if (item.position == "center") {
                    return (
                      <div key={index} className="text-lg font-normal w-auto lg:ml-6">
                        {NavBarItem(item)}
                      </div>
                    );
                  }
                  return "";
                })}
              </div>
            </div>
            <div className="hidden lg:block lg:ml-auto">
              <div className="flex h-full items-center">
                {navItems.map((item, index) => {
                  if (item.position == "right") {
                    return (
                      <div key={index} className="text-lg font-normal w-auto lg:ml-6">
                        {NavBarItem(item)}
                      </div>
                    );
                  }
                  return "";
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`lg:hidden`}>
        <div
          className={`container  w-full bg-white overflow-auto  transition-height ease-in-out duration-700 h-full max-h-0 ${
            isOn ? "max-h-full" : ""
          }`}
        >
          {navItems.map((item, index) => {
            return (
              <div key={index} className="text-lg font-normal w-full py-4">
                {NavBarItem(item)}
              </div>
            );
          })}
        </div>
      </div>
    </NavBar>
  );
};
