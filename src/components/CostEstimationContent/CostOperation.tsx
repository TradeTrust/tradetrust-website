import React, { FunctionComponent, useContext, useCallback } from "react";
import { OverlayContext } from "@govtechsg/tradetrust-ui-components";
import { useFetchGasPrice } from "../../common/hooks/useFetchGasPrice";
import { CostData, PriceTable } from "./types";
import { CostModal } from "./CostModal";
import { GWEI_FACTOR, REFRESH_RATE } from "../../constants/cost-estimation";
import {
  TRANSFER_OWNERSHIP_GAS,
  TRANSFER_HOLDERSHIP_GAS,
  ISSUE_DOC_GAS,
  BURN_DOC_GAS,
  SURRENDER_DOC_GAS,
} from "../../constants/cost-estimation";

export const CostOperation: FunctionComponent = () => {
  const { price: ePrice, gwei: eGwei } = useFetchGasPrice("ethereum", REFRESH_RATE);
  const { price: mPrice, gwei: mGwei } = useFetchGasPrice("polygon", REFRESH_RATE);

  const makePrices = useCallback(() => {
    const priceFactor = eGwei * GWEI_FACTOR * ePrice;
    const maticPriceFactor = mGwei * GWEI_FACTOR * mPrice;
    const gasEstimates = [
      TRANSFER_OWNERSHIP_GAS,
      TRANSFER_HOLDERSHIP_GAS,
      ISSUE_DOC_GAS,
      BURN_DOC_GAS,
      SURRENDER_DOC_GAS,
    ];
    const operationKeys = ["xferOwner", "xferHolder", "issue", "burn", "surrender"];
    // [] -> [] -> {}
    const tree = gasEstimates.map((estimate, i) => {
      return [operationKeys[i], { eth: estimate * priceFactor, matic: estimate * maticPriceFactor }];
    });
    return Object.fromEntries(tree);
  }, [ePrice, mPrice, eGwei, mGwei]);

  const makeCostData = useCallback(() => {
    const table: PriceTable = makePrices();

    const sharedCosts = [
      {
        icon: "/static/images/cost/exporter/transfer-holdership-icon.png",
        title: "Cost to transfer holdership",
        ethPrice: table.xferHolder.eth,
        maticPrice: table.xferHolder.matic,
      },
      {
        icon: "/static/images/cost/exporter/transfer-ownership-icon.png",
        title: "Cost to transfer ownership",
        ethPrice: table.xferOwner.eth,
        maticPrice: table.xferOwner.matic,
      },
      {
        icon: "/static/images/cost/total-cost-icon.png",
        title: "Total Cost",
        ethPrice: table.xferHolder.eth + table.xferOwner.eth,
        maticPrice: table.xferHolder.matic + table.xferOwner.matic,
      },
    ];

    const exporter = {
      title: "The Exporter",
      icon: "/static/images/home/howItWorks/persona/persona1.png",
      costs: sharedCosts,
    };

    const carrier = {
      title: "The Carrier",
      icon: "/static/images/home/howItWorks/persona/persona2.png",
      costs: [
        {
          icon: "/static/images/cost/carrier/issue-ebl-icon.png",
          title: "Cost to Issue eBL",
          ethPrice: table.issue.eth,
          maticPrice: table.issue.matic,
        },
        {
          icon: "/static/images/cost/carrier/burn-ebl-icon.png",
          title: "Cost to Burn eBL",
          ethPrice: table.burn.eth,
          maticPrice: table.burn.matic,
        },
        {
          icon: "/static/images/cost/total-cost-icon.png",
          title: "Total Cost",
          ethPrice: table.issue.eth + table.burn.eth,
          maticPrice: table.issue.matic + table.burn.matic,
        },
      ],
    };

    const importer = {
      title: "The Importer",
      icon: "/static/images/home/howItWorks/persona/persona3.png",
      costs: [
        {
          icon: "/static/images/cost/importer/surrender-ebl-icon.png",
          title: "Surrender eBL",
          ethPrice: table.surrender.eth + table.surrender.eth,
          maticPrice: table.surrender.matic + table.surrender.matic,
        },
      ],
    };

    const banker = {
      title: "The Banker",
      icon: "/static/images/home/howItWorks/persona/persona4.png",
      costs: sharedCosts,
    };

    return [exporter, carrier, importer, banker];
  }, [makePrices]);

  const costData = makeCostData();

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
                    alt={`${persona.title} Icon`}
                  />
                  <h4 className="text-inherit">{persona.title}</h4>
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
