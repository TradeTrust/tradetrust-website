import React, { FunctionComponent } from "react";
import { Resource } from "../../../types";

export interface ResourceLinkProps {
  title: string;
  resources: Resource[];
  icon?: string;
}

export const ResourceLink: FunctionComponent<ResourceLinkProps> = ({ title, resources, icon }) => {
  return (
    <div className="bg-white shadow-md mb-4 pt-2 px-3 pb-3">
      <div className="flex">
        <div className="flex-grow">
          <div className="text-gray-700 text-xl font-medium">{title}</div>
          {resources.map((resource, index) => (
            <div className="pt-2 text-blue" key={index}>
              <a
                className="text-base font-medium flex items-end mb-2"
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link"
              >
                {resource.title}
              </a>
              {resource.date && (
                <div className="text-gray-500 text-base font-medium border-b border-solid border-gray-300 pb-4 mb-1">
                  {resource.date}
                </div>
              )}
            </div>
          ))}
        </div>
        {icon && <img src={icon} alt="link icon" className="object-contain" data-testid="link-icon" />}
      </div>
    </div>
  );
};
