import React from "react";
import { Bottom, Category, mapper } from "./helpers";
import { FooterColumnProps, FooterProps } from "./types";

const sharedColumnPadding = `px-2 lg:px-6 xl:px-8`;

const Logo = (props: Pick<FooterProps, "title" | "logoUrl">): React.ReactElement => {
  const { title, logoUrl } = props;

  return (
    <div className="w-full lg:w-auto mb-12 lg:mb-0">
      {title ? (
        <p className={"text-xl lg:text-3xl text-center lg:text-left font-gilroy-bold max-w-[142px]"}>{title}</p>
      ) : (
        <img className="max-w-[142px]" src={logoUrl || "/static/images/tradetrust_logo.svg"} alt="TradeTrust Logo" />
      )}
    </div>
  );
};

const FooterColumn = (props: FooterColumnProps): React.ReactElement => {
  const { category, items } = props;
  return (
    <div className={`w-1/2 lg:w-auto mb-8 lg:mb-0 text-cloud-500 ${sharedColumnPadding}`}>
      <Category category={category} />
      {items.map(mapper)}
    </div>
  );
};

export const Footer = (props: FooterProps): React.ReactElement => {
  const { className = "", title = "", logoUrl = "", data, legalData } = props;

  return (
    <footer className={`bg-white no-print ${className}`}>
      <div className="container">
        <div className="flex flex-col flex-wrap sm:flex-row lg:flex-nowrap pb-3.5 lg:justify-between">
          <Logo title={title} logoUrl={logoUrl} />
          {data ? (
            data.map((columnData, index) => <FooterColumn key={`col-${index}`} {...columnData} />)
          ) : (
            <div className="flex-auto" />
          )}
        </div>
        <hr />
        {legalData && <Bottom legalData={legalData} />}
      </div>
    </footer>
  );
};
