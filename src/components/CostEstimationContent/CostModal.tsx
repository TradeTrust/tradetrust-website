import React, { FunctionComponent } from "react";
import { OverlayContent } from "@govtechsg/tradetrust-ui-components";
import { CostData } from "./types";
import { FiatLabel } from "../FiatLabel/FiatLabel";

interface CostModalProps {
  costData: CostData;
}

export const CostModal: FunctionComponent<CostModalProps> = ({ costData }) => {
  const { jobTitle, costInformation } = costData;
  return (
    <section id="cost-modal">
      <OverlayContent title="" className="max-h-[90vh] text-white bg-cerulean-500 rounded-xl" crossStyle="text-white">
        <div
          className="mx-5 my-0 bg-cover relative flex flex-col text-white p-5 overflow-auto h-auto"
          style={{ backgroundImage: "url('/static/images/common/wave-lines-light-2.png')" }}
        >
          <div className="flex flex-col items-center">
            <h3 className="mb-8">Cost for {jobTitle}</h3>
            <div className="flex flex-col lg:flex-row justify-around w-full max-w-5xl">
              {costInformation.contractCost.map((contractCost, i) => {
                return (
                  <div key={`cost-information-${i}`} className="flex flex-col items-center mt-2 mb-6 mx-4">
                    <img
                      className="max-h-10 h-10 max-w-[3rem]"
                      src={contractCost.contractIcon}
                      alt={`cost-info-${contractCost.contractTitle}`}
                    />
                    <h4 className="mt-4 text-center">{contractCost.contractTitle}</h4>
                    <div className="flex">
                      Ethereum:
                      <h5 className="ml-2 text-center">
                        US<FiatLabel>{contractCost.contractPriceInEthereum}</FiatLabel>*
                      </h5>
                    </div>
                    <div className="flex">
                      Polygon:
                      <h5 className="ml-2 text-center">
                        US<FiatLabel>{contractCost.contractPriceInPolygon}</FiatLabel>*
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center my-4">{costInformation.description}</div>
            <div>
              <a
                href="https://www.openattestation.com/docs/docs-section/appendix/contract-costs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-bold hover:text-white"
              >
                Click here
              </a>{" "}
              for other contract cost.
            </div>{" "}
          </div>
        </div>
      </OverlayContent>
    </section>
  );
};
