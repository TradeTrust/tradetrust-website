import React, { FunctionComponent, useState, useEffect, useCallback } from "react";
import { OverlayContent } from "@govtechsg/tradetrust-ui-components";
import { CostData } from "./types";
import { FiatLabel } from "@govtechsg/open-attestation-utils";
import { currentDateStr } from "../../utils";
import { REFRESH_RATE } from "../../constants/cost-estimation";
import { useFetchGasPrice } from "../../common/hooks/useFetchGasPrice";

interface CostModalProps {
  costData: CostData;
}

export const CostModal: FunctionComponent<CostModalProps> = ({ costData }) => {
  const [dateTime, setDateTime] = useState(currentDateStr());
  const { price: ePrice, gwei: eGwei } = useFetchGasPrice("ethereum", REFRESH_RATE);
  const { price: mPrice, gwei: mGwei } = useFetchGasPrice("polygon", REFRESH_RATE);

  useEffect(() => {
    setDateTime(currentDateStr());
  }, [eGwei, mGwei]);

  const generateDescription = useCallback(() => {
    return `*Estimations based on the current gas average at ${Math.ceil(eGwei)} gwei (ETH), ETH price at USD
      $${ePrice} for Ethereum and ${Math.ceil(mGwei)} gwei (MATIC), MATIC price at USD $${mPrice} for Polygon
     as at ${dateTime}.`;
  }, [eGwei, mGwei, ePrice, mPrice, dateTime]);
  const description = generateDescription();

  const { title, costs } = costData;
  return (
    <section id="cost-modal">
      <OverlayContent title="" className="max-h-[90vh] text-white !bg-cerulean-500 rounded-xl" crossStyle="text-white">
        <div
          className="mx-5 my-0 bg-cover relative flex flex-col text-white p-5 overflow-auto h-auto"
          style={{ backgroundImage: "url('/static/images/common/wave-lines-light-2.png')" }}
        >
          <div className="flex flex-col items-center">
            <h3 className="mb-8">Cost for {title}</h3>
            <div className="flex flex-col lg:flex-row justify-around w-full max-w-5xl">
              {costs.map((cost, i) => {
                return (
                  <div key={`cost-information-${i}`} className="flex flex-col items-center mt-2 mb-6 mx-4">
                    <img className="max-h-10 h-10 max-w-[3rem]" src={cost.icon} alt={`cost-info-${cost.title}`} />
                    <h4 className="mt-4 text-center">{cost.title}</h4>
                    <div className="flex">
                      Ethereum:
                      <h5 className="ml-2 text-center">
                        US<FiatLabel>{cost.ethPrice}</FiatLabel>*
                      </h5>
                    </div>
                    <div className="flex">
                      Polygon:
                      <h5 className="ml-2 text-center">
                        US<FiatLabel>{cost.maticPrice}</FiatLabel>*
                      </h5>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center my-4 max-w-5xl">{description}</div>
            <div>
              <a
                href="https://www.openattestation.com/docs/docs-section/appendix/contract-costs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-bold hover:text-white"
              >
                Click here
              </a>{" "}
              for the list of costs for other transactions.
            </div>{" "}
          </div>
        </div>
      </OverlayContent>
    </section>
  );
};
