import {
  TRANSFER_OWNERSHIP_GAS,
  TRANSFER_HOLDERSHIP_GAS,
  ISSUE_DOC_GAS,
  BURN_DOC_GAS,
  SURRENDER_DOC_GAS,
} from "../../constants/cost-estimation";
import { CostData } from "./types";
import { PersonaContractCost, PersonaCostInformation, Persona } from "../../models/CostPersona";

const getGasPrice = (gas: number, priceFactor: number): number => gas * priceFactor;

export const makeExporter = (priceFactor: number, maticPriceFactor: number, description: string): CostData => {
  const transferHoldershipContractCost = new PersonaContractCost(
    "/static/images/cost/exporter/transfer-holdership-icon.png",
    "Cost to transfer holdership",
    `${getGasPrice(TRANSFER_HOLDERSHIP_GAS, priceFactor)}`,
    `${getGasPrice(TRANSFER_HOLDERSHIP_GAS, maticPriceFactor)}`
  );
  const transferOwnershipContractCost = new PersonaContractCost(
    "/static/images/cost/exporter/transfer-ownership-icon.png",
    "Cost to transfer ownership",
    `${getGasPrice(TRANSFER_OWNERSHIP_GAS, priceFactor)}`,
    `${getGasPrice(TRANSFER_OWNERSHIP_GAS, maticPriceFactor)}`
  );
  const totalContractCost = new PersonaContractCost(
    "/static/images/cost/total-cost-icon.png",
    "Total Cost",
    `${getGasPrice(TRANSFER_HOLDERSHIP_GAS, priceFactor) + getGasPrice(TRANSFER_OWNERSHIP_GAS, priceFactor)}`,
    `${getGasPrice(TRANSFER_HOLDERSHIP_GAS, maticPriceFactor) + getGasPrice(TRANSFER_OWNERSHIP_GAS, maticPriceFactor)}`
  );
  const exporterCostInformation = new PersonaCostInformation(
    "Cost for The Exporter",
    [transferHoldershipContractCost, transferOwnershipContractCost, totalContractCost],
    description
  );
  return new Persona("The Exporter", "/static/images/home/howItWorks/persona/persona1.png", exporterCostInformation);
};

export const makeCarrier = (priceFactor: number, maticPriceFactor: number, description: string): CostData => {
  const issueContractCost = new PersonaContractCost(
    "/static/images/cost/carrier/issue-ebl-icon.png",
    "Cost to Issue eBL",
    `${getGasPrice(ISSUE_DOC_GAS, priceFactor)}`,
    `${getGasPrice(ISSUE_DOC_GAS, maticPriceFactor)}`
  );
  const burnContractCost = new PersonaContractCost(
    "/static/images/cost/carrier/burn-ebl-icon.png",
    "Cost to Burn eBL",
    `${getGasPrice(BURN_DOC_GAS, priceFactor)}`,
    `${getGasPrice(BURN_DOC_GAS, maticPriceFactor)}`
  );
  const totalContractCost = new PersonaContractCost(
    "/static/images/cost/total-cost-icon.png",
    "Total Cost",
    `${getGasPrice(ISSUE_DOC_GAS, priceFactor) + getGasPrice(BURN_DOC_GAS, priceFactor)}`,
    `${getGasPrice(ISSUE_DOC_GAS, maticPriceFactor) + getGasPrice(BURN_DOC_GAS, maticPriceFactor)}`
  );
  const carrierCostInformation = new PersonaCostInformation(
    "Cost for The Exporter",
    [issueContractCost, burnContractCost, totalContractCost],
    description
  );
  return new Persona("The Carrier", "/static/images/home/howItWorks/persona/persona2.png", carrierCostInformation);
};

export const makeImporter = (priceFactor: number, maticPriceFactor: number, description: string): CostData => {
  const surrenderContractCost = new PersonaContractCost(
    "/static/images/cost/importer/surrender-ebl-icon.png",
    "Surrender eBL",
    `${getGasPrice(SURRENDER_DOC_GAS, priceFactor)}`,
    `${getGasPrice(SURRENDER_DOC_GAS, maticPriceFactor)}`
  );
  const importerCostInformation = new PersonaCostInformation(
    "Cost for The Exporter",
    [surrenderContractCost],
    description
  );
  return new Persona("The Importer", "/static/images/home/howItWorks/persona/persona3.png", importerCostInformation);
};

export const makeBanker = (priceFactor: number, maticPriceFactor: number, description: string): CostData => {
  const transferHoldershipContractCost = new PersonaContractCost(
    "/static/images/cost/exporter/transfer-holdership-icon.png",
    "Cost to transfer holdership",
    `${getGasPrice(TRANSFER_HOLDERSHIP_GAS, priceFactor)}`,
    `${getGasPrice(TRANSFER_HOLDERSHIP_GAS, maticPriceFactor)}`
  );
  const transferOwnershipContractCost = new PersonaContractCost(
    "/static/images/cost/exporter/transfer-ownership-icon.png",
    "Cost to transfer ownership",
    `${getGasPrice(TRANSFER_OWNERSHIP_GAS, priceFactor)}`,
    `${getGasPrice(TRANSFER_OWNERSHIP_GAS, maticPriceFactor)}`
  );
  const totalContractCost = new PersonaContractCost(
    "/static/images/cost/total-cost-icon.png",
    "Total Cost",
    `${getGasPrice(TRANSFER_HOLDERSHIP_GAS, priceFactor) + getGasPrice(TRANSFER_OWNERSHIP_GAS, priceFactor)}`,
    `${getGasPrice(TRANSFER_HOLDERSHIP_GAS, maticPriceFactor) + getGasPrice(TRANSFER_OWNERSHIP_GAS, maticPriceFactor)}`
  );
  const bankerCostInformation = new PersonaCostInformation(
    "Cost for The Exporter",
    [transferHoldershipContractCost, transferOwnershipContractCost, totalContractCost],
    description
  );
  return new Persona("The Banker", "/static/images/home/howItWorks/persona/persona4.png", bankerCostInformation);
};
