import React, { FunctionComponent, useState, useEffect } from "react";
import { PartnersTile } from "./PartnersTile";
import { Pagination } from "@govtechsg/tradetrust-ui-components";
import { PartnerDataSingle, PartnersDataProps } from "./types";

const MAX_PARTNER_TILES_TO_DISPLAY = 9;

export const sortPartnersData = (allPartnersData: PartnerDataSingle[]): PartnerDataSingle[] => {
  return allPartnersData.sort((a, b) => a.attributes.companyName.localeCompare(b.attributes.companyName)); // this sort it alphabetically by companyName
};

export const PartnersContent: FunctionComponent<PartnersDataProps> = ({ partnersData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState<PartnerDataSingle[]>([]);
  const [totalNoOfPages, setTotalNoOfPages] = useState(1);

  useEffect(() => {
    const sortedData = sortPartnersData(partnersData);
    setTotalNoOfPages(Math.ceil(sortedData.length / MAX_PARTNER_TILES_TO_DISPLAY));

    const currentPageData = sortedData.slice(
      (currentPage - 1) * MAX_PARTNER_TILES_TO_DISPLAY,
      currentPage * MAX_PARTNER_TILES_TO_DISPLAY
    );
    setPageData(currentPageData);
  }, [currentPage, partnersData]);

  return (
    <>
      <div className="flex flex-wrap justify-center md:justify-start mt-6">
        {pageData.map((data, i) => (
          <PartnersTile data={data} key={`partners-tile-${i}`} />
        ))}
      </div>
      <Pagination totalNoOfPages={totalNoOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
};
