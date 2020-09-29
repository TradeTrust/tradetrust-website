import React from "react";
import { useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import styled from "@emotion/styled";
import { mixin, vars } from "../../../styles";
import { Settings } from "react-feather";
import { Navbar, Nav } from "react-bootstrap";

export const navItems = [
  {
    id: "verify-documents",
    label: "Verify Documents",
    path: "/#verify-documents",
  },
  {
    id: "create-documents",
    label: "Create Documents",
    path: "//creator.tradetrust.io/",
  },
  {
    id: "resources",
    label: "Resources",
    path: "/resources",
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
  }
`;

export const NavigationBar = () => {
  const location = useLocation();

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
                      {item.id === "create-documents" ? (
                        <a href={item.path}>{item.label}</a>
                      ) : (
                        <NavHashLink
                          to={item.path}
                          className={`${location.pathname}${location.hash}` === item.path ? "active" : ""}
                          activeClassName=""
                          smooth
                        >
                          {item.id === "settings" ? <Settings /> : item.label}
                        </NavHashLink>
                      )}
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
