import { CostInformation, ContractCost } from "../components/CostEstimationContent/types";

export class Persona {
  jobTitle: string;
  icon: string;
  costInformation: CostInformation;

  constructor(jobTitle: string, icon: string, costInformation: CostInformation) {
    this.jobTitle = jobTitle;
    this.icon = icon;
    this.costInformation = costInformation;
  }
}

export class PersonaCostInformation {
  costTitle: string;
  contractCost: ContractCost[];
  description: string;

  constructor(costTitle: string, contractCost: ContractCost[], description: string) {
    this.costTitle = costTitle;
    this.contractCost = contractCost;
    this.description = description;
  }
}

export class PersonaContractCost {
  contractIcon: string;
  contractTitle: string;
  contractPriceInEthereum: string;
  contractPriceInPolygon: string;

  constructor(
    contractIcon: string,
    contractTitle: string,
    contractPriceInEthereum: string,
    contractPriceInPolygon: string
  ) {
    this.contractIcon = contractIcon;
    this.contractTitle = contractTitle;
    this.contractPriceInEthereum = contractPriceInEthereum;
    this.contractPriceInPolygon = contractPriceInPolygon;
  }
}
