import { getGasPrice, makeExporter, makeBanker, makeCarrier, makeImporter } from "../utils";

describe("getGasPrice", () => {
  it("should return the 'gas price' correctly", () => {
    expect(getGasPrice(463, 18)).toEqual(8334);
  });
});

const description = "This is a mock description";

describe("makeExporter", () => {
  it("should make The Exporter persona data correctly", () => {
    const exporter = makeExporter(8334, 180, description);
    expect(exporter).toMatchSnapshot();
  });
});
describe("makeImporter", () => {
  it("should make The Importer persona data correctly", () => {
    const importer = makeImporter(8334, 180, description);
    expect(importer).toMatchSnapshot();
  });
});
describe("makeBanker", () => {
  it("should make The Banker persona data correctly", () => {
    const banker = makeBanker(8334, 180, description);
    expect(banker).toMatchSnapshot();
  });
});
describe("makeCarrier", () => {
  it("should make The Carrier persona data correctly", () => {
    const carrier = makeCarrier(8334, 180, description);
    expect(carrier).toMatchSnapshot();
  });
});
