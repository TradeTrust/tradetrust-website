import { Footer as BaseFooter, FooterColumnItemProps } from "@govtechsg/tradetrust-ui-components";
import React from "react";
import { ExternalLink } from "react-feather";
import { NavLink } from "react-router-dom";
import { URLS } from "../../constants";
import { FORM_SG_URL } from "../../routes";

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
    <NavLink className={`${sharedStyles} px-4 border-r`} to={to}>
      {label}
    </NavLink>
  );
};

const data = [
  {
    category: "Utilities",
    items: [
      { label: "Verify Documents", to: "/verify", render: renderNavLink },
      { label: "Create Documents", to: URLS.CREATOR, render: renderExternalLink },
    ],
  },
  {
    category: "Resources",
    items: [
      { label: "Learn", to: "/learn", render: renderNavLink },
      { label: "FAQ", to: "/faq", render: renderNavLink },
      { label: "ETA", to: "/eta", render: renderNavLink },
    ],
  },
  {
    category: "News & Event",
    items: [
      { label: "News", to: "/news", render: renderNavLink },
      { label: "Events", to: "/event", render: renderNavLink },
    ],
  },
  {
    category: "Support",
    items: [
      { label: "Github", to: URLS.GITHUB, render: renderExternalLink },
      { label: "Documentation", to: URLS.DOCS, render: renderExternalLink },
      { label: "Contact", to: FORM_SG_URL, render: renderExternalLink },
      { label: "FAQ", to: "/faq", render: renderNavLink },
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
  copyright: "Copyright \u00A9 2021 TradeTrust",
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
