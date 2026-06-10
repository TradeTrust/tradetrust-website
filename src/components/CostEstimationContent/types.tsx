export interface CostData {
  title: string;
  icon: string;
  costs: ContractCost[];
}

export interface ContractCost {
  icon: string;
  title: string;
  ethPrice: string;
  polPrice: string;
}

interface Price {
  eth: string;
  pol: string;
}
export interface PriceTable {
  xferOwner: Price;
  xferHolder: Price;
  issue: Price;
  burn: Price;
  surrender: Price;
}
