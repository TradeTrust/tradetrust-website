import React, { FunctionComponent } from "react";
import { PartnersContent } from "./PartnersContent";
import { getCmsContentWithSlug } from "../../utils";

const allImportedPartners = require.context("./../../../cms/partners", false, /\.md$/);
const allPartners = getCmsContentWithSlug(allImportedPartners);

export const Partners: FunctionComponent = () => {
  return <PartnersContent partnersData={allPartners} />;
};
