import React from "react";
import { ExternalLink } from "react-feather";
import { NavLink } from "react-router-dom";
import { URLS } from "../../constants";
import { FORM_SG_URL } from "../../routes";
import { Footer as BaseFooter, FooterColumnItemProps } from "../UI/Footer";

const sharedStyles = `font-medium text-sm text-cloud-500 hover:text-cerulean-500`;
const renderNavLink = ({ label, to }: FooterColumnItemProps) => {
  return (
    <NavLink className={sharedStyles} to={to}>
      {label}
    </NavLink>
  );
};
const renderExternalLink = ({ label, to }: FooterColumnItemProps) => {
  return (
    <a className="flex items-center" href={to} target={"_blank"} rel="noopener noreferrer">
      <p className={`${sharedStyles} mr-1`}>{label}</p>
      <div className={`w-auto`}>
        <ExternalLink size={12} color={"#89969F"} />
      </div>
    </a>
  );
};
const renderBottomNavLink = ({ label, to }: FooterColumnItemProps) => {
  return (
    <NavLink
      className={`${sharedStyles} px-0 sm:px-4 py-2 flex sm:items-center text-center min-h-[40px] min-w-[80px]`}
      to={to}
    >
      {label}
    </NavLink>
  );
};

const data = [
  {
    category: "Utilities",
    items: [
      { label: "Verify Documents", to: "/", render: renderNavLink },
      { label: "Create Documents", to: "/creator", render: renderNavLink },
    ],
  },
  {
    category: "Support",
    items: [
      { label: "Github", to: URLS.GITHUB, render: renderExternalLink },
      { label: "Documentation", to: URLS.DOCS, render: renderExternalLink },
      { label: "Contact", to: FORM_SG_URL, render: renderExternalLink },
    ],
  },
  {
    category: "Settings",
    items: [
      { label: "Address Book", to: "/settings/address-book", render: renderNavLink },
      { label: "Address Book Resolver", to: "/settings/address-resolver", render: renderNavLink },
    ],
  },
];

const legalData = {
  copyright: (
    <div className="font-medium text-sm text-cloud-500 px-0 sm:px-4 flex sm:items-center sm:text-center min-h-[2rem]">
      {`Copyright \u00A9 ${new Date().getFullYear()} TradeTrust`}
    </div>
  ),
  items: [
    { label: "Privacy Policy", to: "/privacy-policy", render: renderBottomNavLink },
    { label: "Terms of Use", to: "/terms-of-use", render: renderBottomNavLink },
  ],
};

export const Footer: React.FunctionComponent = () => {
  return (
    <BaseFooter
      className="py-8 px-6"
      logoUrl={"/static/images/tradetrust_logo.svg"}
      legalData={legalData}
      data={data}
    />
  );
};
