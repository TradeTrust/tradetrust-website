import React, { FunctionComponent, useContext, useState, useEffect, useCallback } from "react";
import { OverlayContext } from "@govtechsg/tradetrust-ui-components";
import { useFetchGasPrice } from "../../common/hooks/useFetchGasPrice";
import { CostData, CostDataFn, Persona } from "./types";
import { CostModal } from "./CostModal";
import { currentDateStr } from "../../utils";
import {
  TRANSFER_HOLDERSHIP_GAS,
  TRANSFER_OWNERSHIP_GAS,
  ISSUE_DOC_GAS,
  BURN_DOC_GAS,
  SURRENDER_DOC_GAS,
  GWEI_FACTOR,
  REFRESH_RATE,
} from "../../constants/cost-estimation";

export const CostOperation: FunctionComponent = () => {
  const [dateTime, setDateTime] = useState(currentDateStr());
  const { price: ePrice, gwei: eGwei } = useFetchGasPrice("ethereum", REFRESH_RATE);
  const { price: mPrice, gwei: mGwei } = useFetchGasPrice("polygon", REFRESH_RATE);

  useEffect(() => {
    setDateTime(currentDateStr());
  }, [eGwei, mGwei]);

  const costData: CostDataFn = useCallback(
    (price, maticPrice, dateTimeString) => {
      const priceFactor = eGwei * GWEI_FACTOR * price;
      const maticPriceFactor = mGwei * GWEI_FACTOR * maticPrice;

      const description = `*Estimations based on the current gas average at ${Math.ceil(
        eGwei
      )} gwei (ETH), ETH price at USD
      $${price} for Ethereum and ${Math.ceil(mGwei)} gwei (MATIC), MATIC price at USD $${maticPrice} for Polygon
     as at ${dateTimeString}.`;

      const Exporter = new Persona({
        jobTitle: "The Exporter",
        icon: "/static/images/home/howItWorks/persona/persona1.png",
        costInformation: {
          costTitle: "Cost for The Exporter",
          contractCost: [
            {
              contractIcon: "/static/images/cost/exporter/transfer-holdership-icon.png",
              contractTitle: "Cost to transfer holdership",
              contractPriceInEthereum: `${TRANSFER_HOLDERSHIP_GAS * priceFactor}`,
              contractPriceInPolygon: `${TRANSFER_HOLDERSHIP_GAS * maticPriceFactor}`,
            },
            {
              contractIcon: "/static/images/cost/exporter/transfer-ownership-icon.png",
              contractTitle: "Cost to transfer ownership",
              contractPriceInEthereum: `${TRANSFER_OWNERSHIP_GAS * priceFactor}`,
              contractPriceInPolygon: `${TRANSFER_OWNERSHIP_GAS * maticPriceFactor}`,
            },
            {
              contractIcon: "/static/images/cost/total-cost-icon.png",
              contractTitle: "Total Cost",
              contractPriceInEthereum: `${
                TRANSFER_OWNERSHIP_GAS * priceFactor + TRANSFER_HOLDERSHIP_GAS * priceFactor
              }`,
              contractPriceInPolygon: `${
                TRANSFER_OWNERSHIP_GAS * maticPriceFactor + TRANSFER_HOLDERSHIP_GAS * maticPriceFactor
              }`,
            },
          ],
          description: description,
        },
      });

      const Carrier = new Persona({
        jobTitle: "The Carrier",
        icon: "/static/images/home/howItWorks/persona/persona2.png",
        costInformation: {
          costTitle: "Cost for The Exporter",
          contractCost: [
            {
              contractIcon: "/static/images/cost/carrier/issue-ebl-icon.png",
              contractTitle: "Cost to Issue eBL",
              contractPriceInEthereum: `${ISSUE_DOC_GAS * priceFactor}`,
              contractPriceInPolygon: `${ISSUE_DOC_GAS * maticPriceFactor}`,
            },
            {
              contractIcon: "/static/images/cost/carrier/burn-ebl-icon.png",
              contractTitle: "Cost to Burn eBL",
              contractPriceInEthereum: `${BURN_DOC_GAS * priceFactor}`,
              contractPriceInPolygon: `${BURN_DOC_GAS * maticPriceFactor}`,
            },
            {
              contractIcon: "/static/images/cost/total-cost-icon.png",
              contractTitle: "Total Cost",
              contractPriceInEthereum: `${ISSUE_DOC_GAS * priceFactor + BURN_DOC_GAS * priceFactor}`,
              contractPriceInPolygon: `${ISSUE_DOC_GAS * maticPriceFactor + BURN_DOC_GAS * maticPriceFactor}`,
            },
          ],
          description: description,
        },
      });

      const Importer = new Persona({
        jobTitle: "The Importer",
        icon: "/static/images/home/howItWorks/persona/persona3.png",
        costInformation: {
          costTitle: "Cost for The Exporter",
          contractCost: [
            {
              contractIcon: "/static/images/cost/importer/surrender-ebl-icon.png",
              contractTitle: "Surrender eBL",
              contractPriceInEthereum: `${SURRENDER_DOC_GAS * priceFactor}`,
              contractPriceInPolygon: `${SURRENDER_DOC_GAS * maticPriceFactor}`,
            },
          ],
          description: description,
        },
      });

      const Banker = new Persona({
        jobTitle: "The Banker",
        icon: "/static/images/home/howItWorks/persona/persona4.png",
        costInformation: {
          costTitle: "Cost for The Exporter",
          contractCost: [
            {
              contractIcon: "/static/images/cost/exporter/transfer-holdership-icon.png",
              contractTitle: "Cost to transfer holdership",
              contractPriceInEthereum: `${TRANSFER_HOLDERSHIP_GAS * priceFactor}`,
              contractPriceInPolygon: `${TRANSFER_HOLDERSHIP_GAS * maticPriceFactor}`,
            },
            {
              contractIcon: "/static/images/cost/exporter/transfer-ownership-icon.png",
              contractTitle: "Cost to transfer ownership",
              contractPriceInEthereum: `${TRANSFER_OWNERSHIP_GAS * priceFactor}`,
              contractPriceInPolygon: `${TRANSFER_OWNERSHIP_GAS * maticPriceFactor}`,
            },
            {
              contractIcon: "/static/images/cost/total-cost-icon.png",
              contractTitle: "Total Cost",
              contractPriceInEthereum: `${
                TRANSFER_OWNERSHIP_GAS * priceFactor + TRANSFER_HOLDERSHIP_GAS * priceFactor
              }`,
              contractPriceInPolygon: `${
                TRANSFER_OWNERSHIP_GAS * maticPriceFactor + TRANSFER_HOLDERSHIP_GAS * maticPriceFactor
              }`,
            },
          ],
          description: description,
        },
      });

      return [Exporter, Carrier, Importer, Banker];
    },
    [eGwei, mGwei]
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
            {costData(ePrice, mPrice, dateTime).map((persona, index) => {
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
