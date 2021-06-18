import React from "react";
import { Footer as BaseFooter, FooterColumnItemProps } from "@govtechsg/tradetrust-ui-components";
import { NavLink } from "react-router-dom";
import { ExternalLink } from "react-feather";
import tw from "twin.macro";
import styled from "@emotion/styled";
import { URLS } from "../../constants";

const sharedStyles = `text-cloud-500 hover:text-black transition-color duration-200 ease-out font-medium text-sm`;
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
      { label: "Webinars", to: "/learn", render: renderExternalLink },
      { label: "Media", to: "/media", render: renderNavLink },
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
      { label: "Address Book", to: "/settings", render: renderNavLink },
      { label: "Address Book Resolver", to: "/settings", render: renderNavLink },
    ],
  },
];

const EnhancedFooter = styled(BaseFooter)`
  ${tw`px-7 md:py-0 md:pt-6`}
  > div {
    ${tw`md:flex-nowrap`}
  }
`;
export const Footer: React.FunctionComponent = () => {
  return <EnhancedFooter title={"TradeTrust"} copyright={"Copyright \u00A9 2021 TradeTrust"} data={data} />;
};
