import bill_of_lading from "../../config/formSchemas/bill_of_lading.json";
import coo from "../../config/formSchemas/coo.json";
import epn from "../../config/formSchemas/epn.json";
import invoice from "../../config/formSchemas/invoice.json";
import warehouse_receipt from "../../config/formSchemas/warehouse_receipt.json";

const allFormConfigs = [bill_of_lading, coo, epn, invoice, warehouse_receipt];

export function getFormConfigByName(name: string) {
  return allFormConfigs.find((config) => config.name === name);
}
