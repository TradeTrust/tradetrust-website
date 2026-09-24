import { findInlineTemplateRenderMethod } from "./findInlineTemplateRenderMethod";

describe("findInlineTemplateRenderMethod", () => {
  it("finds an INLINE_TEMPLATE entry among other renderMethod entries", () => {
    const document = {
      renderMethod: [
        { id: "https://generic-templates.tradetrust.io", type: "EMBEDDED_RENDERER", templateName: "BILL_OF_LADING" },
        { type: "INLINE_TEMPLATE", template: { templateName: "BILL_OF_LADING", html: "<div></div>", css: "" } },
      ],
    };
    expect(findInlineTemplateRenderMethod(document)?.template.templateName).toBe("BILL_OF_LADING");
  });

  it("returns undefined when there is no INLINE_TEMPLATE entry", () => {
    const document = {
      renderMethod: [{ id: "https://x", type: "EMBEDDED_RENDERER", templateName: "X" }],
    };
    expect(findInlineTemplateRenderMethod(document)).toBeUndefined();
  });

  it("returns undefined when renderMethod is missing entirely", () => {
    expect(findInlineTemplateRenderMethod({})).toBeUndefined();
  });
});
