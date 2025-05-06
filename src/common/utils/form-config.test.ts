import { getFormConfigByName } from "./form-config";

jest.mock("../../config/formSchemas/bill_of_lading.json", () => ({ name: "bill_of_lading" }));
jest.mock("../../config/formSchemas/coo.json", () => ({ name: "coo" }));
jest.mock("../../config/formSchemas/epn.json", () => ({ name: "epn" }));
jest.mock("../../config/formSchemas/invoice.json", () => ({ name: "invoice" }));
jest.mock("../../config/formSchemas/warehouse_receipt.json", () => ({ name: "warehouse_receipt" }));

describe("getFormConfigByName", () => {
  it("should return the correct form config when a valid name is provided", () => {
    expect(getFormConfigByName("bill_of_lading")).toEqual({ name: "bill_of_lading" });
    expect(getFormConfigByName("coo")).toEqual({ name: "coo" });
    expect(getFormConfigByName("epn")).toEqual({ name: "epn" });
    expect(getFormConfigByName("invoice")).toEqual({ name: "invoice" });
    expect(getFormConfigByName("warehouse_receipt")).toEqual({ name: "warehouse_receipt" });
  });

  it("should return undefined when an invalid name is provided", () => {
    expect(getFormConfigByName("non_existing_name")).toBeUndefined();
  });
});
