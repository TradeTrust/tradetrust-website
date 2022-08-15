import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export const FaqSelect: FunctionComponent = () => {
  const boxStyle = "flex flex-col items-center rounded px-12 py-6 bg-white shadow-md mr-5 mb-6";
  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-2/3">
        <p className="my-9 max-w-[766px]">
          Try clearing your cache and try again. Take note that issuing process might take a while depending on the
          blockchain traffic. Navigating out of the demo midway will cause an error on the issuing process.
        </p>
        <div className="flex flex-col md:flex-row">
          <Link to="/faq/generalfaq">
            <div className={`${boxStyle}`}>
              <img src="/static/images/faq/generalFaq.png" alt="general FAQs" />
              <h5 className="pt-3 text-cloud-800">General FAQs</h5>
            </div>
          </Link>
          <Link to="/faq/productfaq">
            <div className={`${boxStyle}`}>
              <img src="/static/images/faq/productFaq.png" alt="general FAQs" />
              <h5 className="pt-3 text-cloud-800">Product FAQs</h5>
            </div>
          </Link>
        </div>
      </div>
      <div className="mx-auto w-1/2 lg:w-1/3  hidden lg:block">
        <img src="/static/images/faq/faq-person.png" alt="FAQ person" />
      </div>
    </div>
  );
};
