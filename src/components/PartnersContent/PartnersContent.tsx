import React, { FunctionComponent, useState, useEffect } from "react";
import { PartnersTile } from "./PartnersTile";
import { getCmsContentWithSlug } from "../../utils";
import { Pagination } from "@govtechsg/tradetrust-ui-components";
import { PartnersData, PartnerType, TypesOfPartners } from "./types";

const MAX_PARTNER_TILES_TO_DISPLAY = 9;

const allImportedPartners = require.context("./../../../cms/partners", false, /\.md$/);
const allPartners = getCmsContentWithSlug(allImportedPartners);

const getPartnersData = (type: PartnerType) => {
  return allPartners
    .filter((partner) => {
      return partner.attributes.typeOfPartner === type;
    })
    .map((partner) => partner.attributes)
    .sort((a, b) => a.companyName.localeCompare(b.companyName)); // this sort it alphabetically by companyName
};

export const PartnersContent: FunctionComponent = () => {
  const [partnerState, setPartnerState] = useState<PartnerType>(TypesOfPartners.PLATFORM);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState<PartnersData[]>([]);
  const [totalNoOfPages, setTotalNoOfPages] = useState(1);
  const [anyPlatformData, setAnyPlatformData] = useState(false);
  const [anyPartnersData, setAnyPartnersData] = useState(false);

  useEffect(() => {
    setAnyPlatformData(getPartnersData(TypesOfPartners.PLATFORM).length > 0);
    setAnyPartnersData(getPartnersData(TypesOfPartners.PARTNER).length > 0);
  }, []);

  useEffect(() => {
    const partnerData = getPartnersData(partnerState);
    setTotalNoOfPages(Math.ceil(partnerData.length / MAX_PARTNER_TILES_TO_DISPLAY));

    const currentPageData = partnerData.slice(
      (currentPage - 1) * MAX_PARTNER_TILES_TO_DISPLAY,
      currentPage * MAX_PARTNER_TILES_TO_DISPLAY
    );
    setPageData(currentPageData);
  }, [currentPage, partnerState]);

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex justify-around text-cerulean-300 text-2xl w-[260px]">
          {anyPlatformData && (
            <div
              className={`${
                partnerState === TypesOfPartners.PLATFORM ? "font-bold underline cursor-pointer" : "cursor-pointer"
              }`}
              onClick={() => setPartnerState(TypesOfPartners.PLATFORM)}
            >
              {TypesOfPartners.PLATFORM}
            </div>
          )}
          {anyPartnersData && (
            <div
              className={`${
                partnerState === TypesOfPartners.PARTNER ? "font-bold underline cursor-pointer" : "cursor-pointer"
              }`}
              onClick={() => setPartnerState(TypesOfPartners.PARTNER)}
            >
              {TypesOfPartners.PARTNER}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center lg:justify-start mt-6">
        {pageData.map((data, i) => (
          <PartnersTile data={data} key={`partners-tile-${i}`} />
        ))}
      </div>
      <Pagination totalNoOfPages={totalNoOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};
