import React from "react";
import { useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import css from "./navBar.scss";

export const navItems = [
  {
    id: "verify-documents",
    label: "Verify Documents",
    path: "/#verify-documents",
    target: "_self",
  },
  {
    id: "create-documents",
    label: "Create Documents",
    path: "https://creator.tradetrust.io/",
    target: "_target",
  },
  {
    id: "integrate",
    label: "Integrate",
    path: "/#integrate",
    target: "_self",
  },
  {
    id: "training-videos",
    label: "Training Videos",
    path: "/training-videos",
    target: "_self",
  },
  {
    id: "about",
    label: "About",
    path: "/#about",
    target: "_self",
  },
  {
    id: "faq",
    label: "FAQ",
    path: "/faq",
    target: "_self",
  },
  {
    id: "contact",
    label: "Contact",
    path: "/#contact",
    target: "_self",
  },
  {
    id: "settings",
    label: "Settings",
    path: "/settings",
    target: "_self",
  },
];

export const NavigationBar = () => {
  const location = useLocation();

  return (
    <div className="bg-brand-navy">
      <div className="container-custom">
        <nav className={`navbar navbar-expand-xl navbar-dark ${css.topnavbar}`}>
          <NavHashLink className={`navbar-brand ${css.logo}`} to="/" smooth>
            <img className="img-fluid" src="/static/images/tradetrust_logo.svg" alt="TradeTrust" />
          </NavHashLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#top-nav"
            aria-controls="top-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="py-3 py-xl-0 collapse navbar-collapse" id="top-nav">
            <ul className="navbar-nav row ml-auto">
              {navItems.map((item, index) => {
                return (
                  <li className={`col-auto nav-item my-2 my-xl-0 ${css["topnavbar-item"]}`} key={index}>
                    {item.target === "_self" ? (
                      <NavHashLink
                        to={item.path}
                        target={item.target}
                        rel="noopener noreferrer"
                        className={`${location.pathname}${location.hash}` === item.path ? css["active"] : ""}
                        smooth
                      >
                        {item.label}
                      </NavHashLink>
                    ) : (
                      <a href={item.path} target={item.target} rel="noopener">
                        {item.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};
