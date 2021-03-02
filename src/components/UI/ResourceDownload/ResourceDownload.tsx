import React, { FunctionComponent } from "react";
import { Download } from "react-feather";

export type Newsletter = {
  attributes: {
    title: string;
    file: string;
  };
};

export interface ResourceDownloadProps {
  title: string;
  resources: Newsletter[];
}

export const ResourceDownload: FunctionComponent<ResourceDownloadProps> = ({ title, resources }) => {
  return (
    <div className="bg-white shadow-md mb-4 pt-2 px-3 pb-3">
      <div className="flex-grow">
        <div className="text-grey-700 text-xl font-medium">{title}</div>
        {resources.map((resource, index) => (
          <div className="pt-2 text-blue" key={index}>
            <div className="flex">
              <a
                href={resource.attributes.file}
                download={resource.attributes.title}
                className="text-base font-medium flex items-end mb-2"
              >
                <Download className="mr-1" />
                {resource.attributes.title}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
