import { useEffect, useState, useRef } from "react";
import { useRefresh } from "./useRefresh";
import { CRYPTOCOMPARE_API_KEY } from "../../config";

const gasApi = {
  ethereum: "https://api.blocknative.com/gasprices/blockprices",
  polygon: "https://api.blocknative.com/gasprices/blockprices?chainid=137",
};

const gasApiOptions = () => {
  return {
    headers: {
      Authorization: "",
    },
  };
};

const parseGasRes = (res: any) => {
  const estPrice = res.blockPrices[0].estimatedPrices[0];
  if (estPrice.price || estPrice.maxPriorityFeePerGas) {
    return estPrice.price + estPrice.maxPriorityFeePerGas;
  }
  return 0;
};

const priceApiUrl = (fsym: string): string => {
  const key = CRYPTOCOMPARE_API_KEY ? `&api_key=${encodeURIComponent(CRYPTOCOMPARE_API_KEY)}` : "";
  return `https://min-api.cryptocompare.com/data/price?fsym=${fsym}&tsyms=USD${key}`;
};

const priceApi = {
  ethereum: priceApiUrl("ETH"),
  polygon: priceApiUrl("POL"),
};

type chainType = "ethereum" | "polygon";

const fetchGasCostData = async (chain: chainType) => {
  try {
    const [ethReq, gweiReq] = await Promise.all([fetch(priceApi[chain]), fetch(gasApi[chain], gasApiOptions())]);
    const [ethRes, gweiRes] = await Promise.all([ethReq.json(), gweiReq.json()]);

    return {
      price: ethRes.USD,
      gwei: parseGasRes(gweiRes),
    };
  } catch (e) {
    if (e instanceof Error) {
      console.error(`Error: ${e.message}`);
    }
  }
};

/**
 * A React Hook that takes in a chainType and an interval; returns the price and gwei of the selected blockchain in every interval.
 *
 * @param chain - chainType, either "ethereum" or "polygon"
 * @param interval - number in milliseconds to set the interval of the refresh
 * @returns Price and gwei for the selected chain
 */
export const useFetchGasPrice = (chain: chainType, interval = 0): { price: number; gwei: number } => {
  const [price, setPrice] = useState(0);
  const [gwei, setGwei] = useState(0);
  const tick = useRefresh(interval);
  const isMounted = useRef(true);
  const fetchData = async () => {
    const data = await fetchGasCostData(chain);
    if (!isMounted || !data) return;
    setPrice(data.price);
    setGwei(data.gwei);
  };

  useEffect(() => {
    fetchData();
    isMounted.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  return { price, gwei };
};
