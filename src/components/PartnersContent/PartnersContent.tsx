import React, { FunctionComponent, useState, useEffect } from "react";
import { PartnersTile } from "./PartnersTile";
import { Pagination, getPaginatedPagesTotal, getPaginatedPosts } from "@govtechsg/tradetrust-ui-components";
import { PartnerDataSingle, PartnersDataProps } from "./types";

const MAX_PARTNER_TILES_TO_DISPLAY = 9;

export const PartnersContent: FunctionComponent<PartnersDataProps> = ({ sortedPartnersData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState<PartnerDataSingle[]>([]);
  const [totalNoOfPages, setTotalNoOfPages] = useState(1);

  useEffect(() => {
    setTotalNoOfPages(
      getPaginatedPagesTotal({ posts: sortedPartnersData, postsPerPage: MAX_PARTNER_TILES_TO_DISPLAY })
    );

    const currentPageData = getPaginatedPosts({
      posts: sortedPartnersData,
      postsPerPage: MAX_PARTNER_TILES_TO_DISPLAY,
      currentPage: currentPage,
    });
    setPageData(currentPageData);
  }, [currentPage, sortedPartnersData]);

  return (
    <>
      <div className="flex flex-wrap justify-center md:justify-start mt-6 -mx-4">
        {pageData.map((data, i) => (
          <PartnersTile data={data} key={`partners-tile-${i}`} />
        ))}
      </div>
      <Pagination totalNoOfPages={totalNoOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </>
  );
};
