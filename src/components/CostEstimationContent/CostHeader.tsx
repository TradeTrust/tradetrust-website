import React, { FunctionComponent, useEffect, useState } from "react";
import { FiatLabel } from "@govtechsg/open-attestation-utils";
import { useFetchGasPrice } from "../../common/hooks/useFetchGasPrice";
import { currentDateStr } from "../../utils";
import { transferHoldershipGas, refreshRate, gweiFactor } from "../../constants/cost-estimation";

export const CostHeader: FunctionComponent = () => {
  const [dateTime, setDateTime] = useState(currentDateStr());
  const { price, gwei } = useFetchGasPrice("ethereum", refreshRate);
  const { price: maticPrice, gwei: maticGwei } = useFetchGasPrice("polygon", refreshRate);
  const priceFactor = gwei * gweiFactor * price;
  const maticPriceFactor = maticGwei * gweiFactor * maticPrice;

  // We use transferHoldershipGas as it is the lowest gas price based on the estimated averaged gas price we have.
  const EthereumPrice = transferHoldershipGas * priceFactor;
  const PolygonPrice = transferHoldershipGas * maticPriceFactor;

  const lowestPrice = Math.min(EthereumPrice, PolygonPrice);

  useEffect(() => {
    setDateTime(currentDateStr());
  }, [lowestPrice]);

  return (
    <section id="cost-header" className="bg-cerulean-50  py-16">
      <div className="container">
        <div
          style={{ backgroundImage: `url("/static/images/cost/cost-bg.png")` }}
          className="bg-no-repeat bg-[length:100%] md:bg-[length:50%] lg:bg-[length:40%] bg-bottom md:bg-right pt-20 md:pt-32 pb-16 md:py-8"
        >
          <div className="text-center md:text-left w-full md:w-1/2 mt-4 lg:mt-24 mb-32 md:my-0 relative -top-20 md:-top-12 lg:-top-24">
            <h1>Costing</h1>
            <h3 className="mt-4">
              TradeTrust is free to use for all, and anyone can implement using TradeTrust source code!
            </h3>
            <h4 className="mt-2">
              Just pay for gas fees from as low as <FiatLabel>{`${lowestPrice}`}</FiatLabel> per transaction* to use the
              blockchain.
            </h4>
            <h6 className="text-cloud-400 mt-2">
              *Transaction with the lowest gas fee as at {dateTime}: Cost to transfer holdership (Polygon)
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
};
