import React from "react";
import { Footer as BaseFooter, FooterColumnItemProps } from "@govtechsg/tradetrust-ui-components";
import { NavLink } from "react-router-dom";
import { ExternalLink } from "react-feather";
import { URLS } from "../../constants";

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
      { label: "Contact", to: "/contact", render: renderNavLink },
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

export const Footer: React.FunctionComponent = () => {
  return (
    <BaseFooter
      className="py-8 px-6"
      logoUrl={"/static/images/tradetrust_logo.svg"}
      copyright={"Copyright \u00A9 2021 TradeTrust"}
      data={data}
    />
  );
};
