export interface CostDataFn {
  (eprice: number, mPrice: number, dateTime: string): CostData[];
}

export interface CostData {
  jobTitle: string;
  icon: string;
  costInformation: CostInformation;
}

interface CostInformation {
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

export class Persona {
  jobTitle: string;
  icon: string;
  costInformation: CostInformation;

  constructor(data: CostData) {
    this.jobTitle = data.jobTitle;
    this.icon = data.icon;
    this.costInformation = data.costInformation;
  }
}
