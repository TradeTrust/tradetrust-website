import React from "react";
import { useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import styled from "@emotion/styled";
import { mixin, vars } from "../../../styles";
import { Settings } from "react-feather";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

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

const NavHeader = styled.header`
  padding: 20px 0;

  @media print {
    display: none;
  }

  .navbar-brand {
    img {
      height: 50px;
    }
  }

  a {
    ${mixin.fontMontserratMedium}
    ${mixin.fontSize(16)}
    color: ${vars.greyblue};

    &:hover {
      color: ${vars.white};
      text-decoration: none;
    }

    &.active {
      color: ${vars.white};
    }

    &.dropdown-link {
      color: ${vars.greyDark};

      &:hover {
        color: ${vars.greyLight};
        text-decoration: none;
      }

      &.active {
        color: ${vars.orange};
      }
    }
  }

  .dropdown > a {
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export const NavBarItem = (item: NavItemsProps): React.ReactNode => {
  const location = useLocation();
  switch (true) {
    case item.id === "create-documents":
      return <a href={item.path}>{item.label}</a>;
    case item.id === "info":
      return (
        <NavDropdown title={item.label} id="basic-nav-dropdown" className="p-0">
          {item.dropdownItems?.map((dropdownItem: any, index: number) => {
            return (
              <NavHashLink
                key={index}
                to={dropdownItem.path}
                className="dropdown-link px-2 py-1 d-block item-center text-nowrap"
                smooth
              >
                {dropdownItem.label}
              </NavHashLink>
            );
          })}
        </NavDropdown>
      );
    case item.id === "settings":
      return (
        <NavHashLink
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
        >
          {item.label}
        </NavHashLink>
      );
  }
};

export const NavigationBar = () => {
  return (
    <NavHeader className="bg-brand-navy">
      <div className="container-custom">
        <Navbar className="p-0" collapseOnSelect expand="lg" variant="dark">
          <NavHashLink className="navbar-brand" to="/" smooth>
            <img className="img-fluid" src="/static/images/tradetrust_logo.svg" alt="TradeTrust" />
          </NavHashLink>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto py-3 py-lg-0">
              <div className="row">
                {navItems.map((item, index) => {
                  return (
                    <div className="col-12 col-lg-auto my-2 my-xl-0" key={index}>
                      {NavBarItem(item)}
                    </div>
                  );
                })}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </NavHeader>
  );
};
