import React, { FunctionComponent } from "react";
import { Download } from "react-feather";
import { ResourcesLinkProps } from "../../../types";

export const ResourcesLink: FunctionComponent<ResourcesLinkProps> = ({ title, details, type, icon }) => {
  return (
    <div className="bg-white pt-2 px-3 pb-3 shadow-md mb-4 flex">
      <div className="flex-grow">
        <div className="text-grey-700 text-xl font-medium">{title}</div>
        {details.map((detail, index) => (
          <div className="pt-2 text-blue" key={index}>
            {type === "link" && (
              <a
                className="text-base font-medium flex items-end mb-2"
                href={detail.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link"
              >
                {detail.title}
              </a>
            )}
            {detail.date && (
              <div className="text-grey text-base font-medium border-b border-solid border-grey-300 pb-4 mb-1">
                {detail.date}
              </div>
            )}
            {type === "download" && (
              <div className="flex">
                <a
                  href={detail.url}
                  download={`${detail.title}.pdf`}
                  className="text-base font-medium flex items-end mb-2"
                  data-testid="download"
                >
                  <Download className="mr-1" />
                  {detail.title}
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
      {icon && <img src={icon} alt="link icon" className="object-contain" data-testid="link-icon" />}
    </div>
  );
};
