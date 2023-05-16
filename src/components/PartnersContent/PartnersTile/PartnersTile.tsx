import React, { FunctionComponent } from "react";
import { Button, ButtonSize } from "@govtechsg/tradetrust-ui-components";
import { PartnersTileProps } from "../types";

export const PartnersTile: FunctionComponent<PartnersTileProps> = ({ data }) => {
  const { slug, attributes } = data;
  const { companyName, description, logo, websiteLink } = attributes;
  return (
    <div className="w-[380px] md:w-1/2 lg:w-1/3 mb-8 px-4">
      <div className="bg-white rounded-xl shadow-md p-5">
        <p className="text-2xl min-h-[64px] lg:min-h-[96px] xl:min-h-[64px]">{companyName}</p>
        <div className="h-[148px] flex flex-col justify-center">
          <img src={logo} className="mx-auto" data-testid={`partner-logo-${slug}`} />
        </div>
        <div className="mb-12 h-[152px] 2xl:h-[120px] break-words">{description}</div>
        <div className="flex justify-center">
          <a href={websiteLink} target="_blank" rel="noopener noreferrer" data-testid={`partner-website-link-${slug}`}>
            <Button className="bg-white text-cerulean-500 hover:bg-cloud-100" size={ButtonSize.SM}>
              Visit Website
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};
