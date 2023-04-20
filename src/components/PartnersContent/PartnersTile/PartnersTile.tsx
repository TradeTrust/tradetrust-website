import React, { FunctionComponent } from "react";
import { Button, ButtonSize } from "@govtechsg/tradetrust-ui-components";
import { PartnersTileProps } from "../types";

export const PartnersTile: FunctionComponent<PartnersTileProps> = ({ data }) => {
  const { companyName, description, logo, websiteLink } = data;
  return (
    <div className="max-w-[380px] min-w-[380px] bg-white rounded-xl shadow-md p-5 mb-10 mr-8">
      <p className="text-2xl">{companyName}</p>
      <div className="max-h-[148px] min-h-[148px] flex justify-center">
        <img src={logo} className="mx-auto" />
      </div>
      <div className="mb-12 max-h-[152px] min-h-[152px] break-words">{description}</div>
      <div className="flex justify-center">
        <a
          href={websiteLink}
          target="_blank"
          rel="noopener noreferrer"
          data-testid={`partner-website-link-${companyName}`}
        >
          <Button className="bg-white text-cerulean-500 hover:bg-cloud-100" size={ButtonSize.SM}>
            Visit Website
          </Button>
        </a>
      </div>
    </div>
  );
};
