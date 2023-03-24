import React, { FunctionComponent, useContext, useState, useEffect, useCallback } from "react";
import { OverlayContext } from "@govtechsg/tradetrust-ui-components";
import { useFetchGasPrice } from "../../common/hooks/useFetchGasPrice";
import { CostData, CostDataFn } from "./types";
import { CostModal } from "./CostModal";
import { currentDateStr } from "../../utils";
import { GWEI_FACTOR, REFRESH_RATE } from "../../constants/cost-estimation";
import { makeExporter, makeCarrier, makeImporter, makeBanker } from "./utils";

export const CostOperation: FunctionComponent = () => {
  const [dateTime, setDateTime] = useState(currentDateStr());
  const { price: ePrice, gwei: eGwei } = useFetchGasPrice("ethereum", REFRESH_RATE);
  const { price: mPrice, gwei: mGwei } = useFetchGasPrice("polygon", REFRESH_RATE);

  useEffect(() => {
    setDateTime(currentDateStr());
  }, [eGwei, mGwei]);

  const generateDescription = useCallback(
    (dateTimeString, price, maticPrice) => {
      return `*Estimations based on the current gas average at ${Math.ceil(eGwei)} gwei (ETH), ETH price at USD
      $${price} for Ethereum and ${Math.ceil(mGwei)} gwei (MATIC), MATIC price at USD $${maticPrice} for Polygon
     as at ${dateTimeString}.`;
    },
    [eGwei, mGwei]
  );

  const costData: CostDataFn = useCallback(
    (price, maticPrice, dateTimeString, ethGwei, maticGwei) => {
      const priceFactor = ethGwei * GWEI_FACTOR * price;
      const maticPriceFactor = maticGwei * GWEI_FACTOR * maticPrice;

      const description = generateDescription(dateTimeString, price, maticPrice);

      return [
        makeExporter(priceFactor, maticPriceFactor, description),
        makeCarrier(priceFactor, maticPriceFactor, description),
        makeImporter(priceFactor, maticPriceFactor, description),
        makeBanker(priceFactor, maticPriceFactor, description),
      ];
    },
    [generateDescription]
  );

  const { showOverlay } = useContext(OverlayContext);
  const handleDisplayModal = (persona: CostData) => {
    showOverlay(<CostModal costData={persona} />);
  };

  return (
    <section id="cost-operation" className="py-16">
      <div className="container">
        <div className="text-center">
          <h2>Cost of Operation - Transferable Documents</h2>
          <h4 className="mt-3">
            The gas fee varies with the role you are in the supply chain, trade document type and blockchain network.
            <br />
            Click on the persona to see how much it cost for each transaction based on blank-endorsed BL document flow.
          </h4>
          <div className="flex flex-col lg:flex-row items-center lg:justify-center mb-4">
            {costData(ePrice, mPrice, dateTime, eGwei, mGwei).map((persona, index) => {
              return (
                <div
                  key={`${index}-cost-persona`}
                  className="flex flex-col justify-between cursor-pointer text-cerulean-300 hover:text-cerulean-500"
                  onClick={() => handleDisplayModal(persona)}
                >
                  <img
                    className="mx-auto min-w-[220px] min-h-[253px] max-h-[253px]"
                    src={persona.icon}
                    alt={`${persona.jobTitle} Icon`}
                  />
                  <h4 className="text-inherit">{persona.jobTitle}</h4>
                </div>
              );
            })}
          </div>
          <div className="mt-4">
            <a
              href="https://www.openattestation.com/docs/docs-section/appendix/contract-costs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Click here
            </a>{" "}
            for the list of costs for other transactions.
          </div>
        </div>
      </div>
    </section>
  );
};
