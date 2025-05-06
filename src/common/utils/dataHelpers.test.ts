import { validateData } from "./dataHelpers";

describe("validateData", () => {
  const schema = {
    type: "object",
    additionalProperties: false,
    properties: {
      logo: {
        type: "string",
        title: "Document Title",
      },
      title: {
        type: "string",
        title: "Document Title",
      },
      remarks: {
        type: "string",
        title: "Remarks",
      },
      backgroundColor: {
        type: "string",
        title: "Background Color",
      },
      titleColor: {
        type: "string",
        title: "Title Color",
      },
      remarksColor: {
        type: "string",
        title: "Remarks Color",
      },
    },
  };

  it("should validate correctly when all data is provided", async () => {
    const { isValid } = validateData(schema, {
      logo: "",
      title: "Some title 123",
      remarks: "",
      backgroundColor: "",
      titleColor: "",
      remarksColor: "",
    });
    expect(isValid).toBe(true);
  });

  it("should not validate if additional field is provided", async () => {
    const { isValid } = validateData(schema, { foo: "" });
    expect(isValid).toBe(false);
  });
});
