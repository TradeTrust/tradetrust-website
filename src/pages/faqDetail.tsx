import React, { FunctionComponent, useEffect, useState } from "react";
import { ChevronLeft } from "react-feather";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { FaqType } from "../constants";
import { FaqContent } from "../components/FAQ/FaqContent";

export const FaqPageDetail: FunctionComponent = () => {
  const location = useLocation();
  const [faqType, setFaqType] = useState<FaqType>(FaqType.GENERAL);

  const getFaqType = (pathname: string) => {
    switch (pathname) {
      case "/faq/general-faq":
        return FaqType.GENERAL;

      case "/faq/product-faq":
        return FaqType.PRODUCT;

      default:
        return FaqType.GENERAL;
    }
  };

  useEffect(() => {
    setFaqType(getFaqType(location.pathname));
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <meta property="description" content="Frequently Asked Questions" />
        <meta property="og:description" content="Frequently Asked Questions" />
        <meta property="og:title" content="TradeTrust - An easy way to check and verify your documents" />
        <meta property="og:url" content={`${window.location.origin}${location.pathname}`} />
        <title>TradeTrust - Frequently Asked Questions</title>
      </Helmet>
      <div className="container py-12">
        <div className="flex">
          <div className="w-auto">
            <Link to="/faq" className="text-cloud-800 flex flex-nowrap items-center">
              <ChevronLeft />
              <h5>Back</h5>
            </Link>
          </div>
        </div>
        <div>
          <h2 className="my-3">{`${faqType} FAQs`}</h2>
          <FaqContent faqType={faqType} />
        </div>
      </div>
    </>
  );
};
