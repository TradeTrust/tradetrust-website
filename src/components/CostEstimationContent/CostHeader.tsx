import React, { FunctionComponent } from "react";
import { useFetchGasCost } from "../../common/hooks/useFetchGasPrice";
import { FiatLabel } from "../FiatLabel/FiatLabel";

export const CostHeader: FunctionComponent = () => {
  const { price, gwei } = useFetchGasCost("ethereum", 30000);
  const { price: maticPrice, gwei: maticGwei } = useFetchGasCost("polygon", 30000);
  const priceFactor = gwei * 0.000000001 * price;
  const maticPriceFactor = maticGwei * 0.000000001 * maticPrice;

  const defaultGasLimit = 43634;

  const EthereumPrice = defaultGasLimit * priceFactor;
  const PolygonPrice = defaultGasLimit * maticPriceFactor;

  console.log("Polygon: ", PolygonPrice);
  return (
    <section id="cost-header" className="bg-cerulean-50  py-16">
      <div className="container">
        <div
          style={{ backgroundImage: `url("/static/images/cost/cost-bg.png")` }}
          className="bg-no-repeat bg-[length:100%] md:bg-[length:50%] lg:bg-[length:40%] bg-bottom md:bg-right py-16 md:py-32 2xl:py-48"
        >
          <div className="text-center md:text-left w-full md:w-1/2 mt-24 mb-32 md:my-0">
            <h2 className="leading-none text-5xl">Costing</h2>
            <h3 className="font-gilroy-medium mt-4 leading-6 text-xl lg:text-xl">
              TradeTrust is free! Just pay for gas fees for as low as <FiatLabel>{`${EthereumPrice}`}</FiatLabel> per
              transaction.
            </h3>
            <h6>
              (<FiatLabel>{`${EthereumPrice}`}</FiatLabel> = lowest gas fee real time of the blockchain we support.)
            </h6>
          </div>
        </div>
      </div>
    </section>
  );
};
