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
    path: "https://forms.tradetrust.io/",
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
    <div className="deleted-stuff" />
  );
};
