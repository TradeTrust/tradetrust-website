export type CostData = {
  jobTitle: string;
  icon: string;
  costInformation: {
    costTitle: string;
    contractCost: ContractCost[];
    description: string;
  };
};

export type ContractCost = {
  contractIcon: string;
  contractTitle: string;
  contractPriceInEthereum: string;
  contractPriceInPolygon: string;
};
