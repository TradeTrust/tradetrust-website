export interface CostDataFn {
  (ePrice: number, mPrice: number, dateTime: string, eGwei: number, mGwei: number): CostData[];
}

export interface CostData {
  jobTitle: string;
  icon: string;
  costInformation: CostInformation;
}

export interface CostInformation {
  costTitle: string;
  contractCost: ContractCost[];
  description: string;
}

export interface ContractCost {
  contractIcon: string;
  contractTitle: string;
  contractPriceInEthereum: string;
  contractPriceInPolygon: string;
}
