import React, { FunctionComponent } from "react";
import { PartnersContent } from "./PartnersContent";
import { getCmsContentWithSlug } from "../../utils";
import { PartnerDataSingle } from "./types";

export const sortPartnersData = (allPartnersData: PartnerDataSingle[]): PartnerDataSingle[] => {
  return allPartnersData.sort((a, b) => a.attributes.companyName.localeCompare(b.attributes.companyName)); // this sort it alphabetically by companyName
};

const allImportedPartners = require.context("./../../../cms/partners", false, /\.md$/);
const allPartners = getCmsContentWithSlug(allImportedPartners);
const sortedData = sortPartnersData(allPartners);

export const Partners: FunctionComponent = () => {
  return <PartnersContent sortedPartnersData={sortedData} />;
};
