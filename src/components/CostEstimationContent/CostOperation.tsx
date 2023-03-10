import React, { FunctionComponent, useContext } from "react";
import { OverlayContext } from "@govtechsg/tradetrust-ui-components";
import { useFetchGasCost } from "../../common/hooks/useFetchGasPrice";
import { CostData } from "./types";
import { CostModal } from "./CostModal";

export const CostOperation: FunctionComponent = () => {
  const { price, gwei } = useFetchGasCost("ethereum", 30000);
  const { price: maticPrice, gwei: maticGwei } = useFetchGasCost("polygon", 30000);
  const priceFactor = gwei * 0.000000001 * price;
  const maticPriceFactor = maticGwei * 0.000000001 * maticPrice;

  const currentDtStr = new Date().toLocaleString("en-SG", { hour12: true, timeZoneName: "short" });

  const transferHoldershipGas = 43634;
  const transferOwnershipGas = 324688;
  const issueDocGas = 239523;
  const burnDocGas = 56532;
  const surrenderDocGas = 93435;

  const costData: CostData[] = [
    {
      jobTitle: "The Exporter",
      icon: "/static/images/home/howItWorks/persona/persona1.png",
      costInformation: {
        costTitle: "Cost for The Exporter",
        contractCost: [
          {
            contractIcon: "/static/images/cost/exporter/transfer-holdership-icon.png",
            contractTitle: "Cost to transfer holdership",
            contractPriceInEthereum: `${transferHoldershipGas * priceFactor}`,
            contractPriceInPolygon: `${transferHoldershipGas * maticPriceFactor}`,
          },
          {
            contractIcon: "/static/images/cost/exporter/transfer-ownership-icon.png",
            contractTitle: "Cost to transfer ownership",
            contractPriceInEthereum: `${transferOwnershipGas * priceFactor}`,
            contractPriceInPolygon: `${transferOwnershipGas * maticPriceFactor}`,
          },
          {
            contractIcon: "/static/images/cost/total-cost-icon.png",
            contractTitle: "Total Cost",
            contractPriceInEthereum: `${transferOwnershipGas * priceFactor + transferHoldershipGas * priceFactor}`,
            contractPriceInPolygon: `${
              transferOwnershipGas * maticPriceFactor + transferHoldershipGas * maticPriceFactor
            }`,
          },
        ],
        description: `*Estimations based on the current gas average at ${Math.ceil(gwei)} gwei, ETH price at USD
          $${price} for Ethereum and ${Math.ceil(maticGwei)} gwei (MATIC), MATIC price at USD $${maticPrice} for Polygon
         as at ${currentDtStr}.`,
      },
    },
    {
      jobTitle: "The Carrier",
      icon: "/static/images/home/howItWorks/persona/persona2.png",
      costInformation: {
        costTitle: "Cost for The Exporter",
        contractCost: [
          {
            contractIcon: "/static/images/cost/carrier/issue-ebl-icon.png",
            contractTitle: "Cost to Issue eBL",
            contractPriceInEthereum: `${issueDocGas * priceFactor}`,
            contractPriceInPolygon: `${issueDocGas * maticPriceFactor}`,
          },
          {
            contractIcon: "/static/images/cost/carrier/burn-ebl-icon.png",
            contractTitle: "Cost to Burn eBL",
            contractPriceInEthereum: `${burnDocGas * priceFactor}`,
            contractPriceInPolygon: `${burnDocGas * maticPriceFactor}`,
          },
          {
            contractIcon: "/static/images/cost/total-cost-icon.png",
            contractTitle: "Total Cost",
            contractPriceInEthereum: `${issueDocGas * priceFactor + burnDocGas * priceFactor}`,
            contractPriceInPolygon: `${issueDocGas * maticPriceFactor + burnDocGas * maticPriceFactor}`,
          },
        ],
        description: `*Estimations based on the current gas average at ${Math.ceil(gwei)} gwei, ETH price at USD
        $${price} for Ethereum and ${Math.ceil(maticGwei)} gwei (MATIC), MATIC price at USD $${maticPrice} for Polygon
       as at ${currentDtStr}.`,
      },
    },
    {
      jobTitle: "The Importer",
      icon: "/static/images/home/howItWorks/persona/persona3.png",
      costInformation: {
        costTitle: "Cost for The Exporter",
        contractCost: [
          {
            contractIcon: "/static/images/cost/importer/surrender-ebl-icon.png",
            contractTitle: "Surrender eBL",
            contractPriceInEthereum: `${surrenderDocGas * priceFactor}`,
            contractPriceInPolygon: `${surrenderDocGas * maticPriceFactor}`,
          },
        ],
        description: `*Estimations based on the current gas average at ${Math.ceil(gwei)} gwei, ETH price at USD
        $${price} for Ethereum and ${Math.ceil(maticGwei)} gwei (MATIC), MATIC price at USD $${maticPrice} for Polygon
       as at ${currentDtStr}.`,
      },
    },
    {
      jobTitle: "The Banker",
      icon: "/static/images/home/howItWorks/persona/persona4.png",
      costInformation: {
        costTitle: "Cost for The Exporter",
        contractCost: [
          {
            contractIcon: "/static/images/cost/exporter/transfer-holdership-icon.png",
            contractTitle: "Cost to transfer holdership",
            contractPriceInEthereum: `${transferHoldershipGas * priceFactor}`,
            contractPriceInPolygon: `${transferHoldershipGas * maticPriceFactor}`,
          },
          {
            contractIcon: "/static/images/cost/exporter/transfer-ownership-icon.png",
            contractTitle: "Cost to transfer ownership",
            contractPriceInEthereum: `${transferOwnershipGas * priceFactor}`,
            contractPriceInPolygon: `${transferOwnershipGas * maticPriceFactor}`,
          },
          {
            contractIcon: "/static/images/cost/total-cost-icon.png",
            contractTitle: "Total Cost",
            contractPriceInEthereum: `${transferOwnershipGas * priceFactor + transferHoldershipGas * priceFactor}`,
            contractPriceInPolygon: `${
              transferOwnershipGas * maticPriceFactor + transferHoldershipGas * maticPriceFactor
            }`,
          },
        ],
        description: `*Estimations based on the current gas average at ${Math.ceil(gwei)} gwei, ETH price at USD
        $${price} for Ethereum and ${Math.ceil(maticGwei)} gwei (MATIC), MATIC price at USD $${maticPrice} for Polygon
       as at ${currentDtStr}.`,
      },
    },
  ];

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
            The cost varies with the role you are in the supply chain, trade document type and blockchain network.
            <br />
            Click on the persona to see how much it cost for each transaction based on blank-endorsed BL document flow.
          </h4>
          <div className="flex flex-col lg:flex-row items-center lg:justify-center mb-4">
            {costData.map((persona, index) => {
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
            for the full table of other contract cost.
          </div>
        </div>
      </div>
    </section>
  );
};
