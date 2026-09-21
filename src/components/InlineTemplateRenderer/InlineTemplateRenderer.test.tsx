import { render } from "@testing-library/react";
import React from "react";
import { InlineTemplateRenderer } from "./InlineTemplateRenderer";

const html = `
  <div class="bol">
    <div data-field="blNumber"></div>
    <div data-field="shipperName"></div>
    <table><tbody>
      <template data-repeat="packages">
        <tr><td data-field="packagesDescription"></td></tr>
      </template>
    </tbody></table>
  </div>
`;
const css = ".bol { color: red; }";

const bolDocument = {
  renderMethod: [{ type: "INLINE_TEMPLATE", template: { templateName: "BILL_OF_LADING", html, css } }],
  credentialSubject: {
    blNumber: "SGCNM21566325",
    shipperName: "Shipper Co",
    packages: [{ packagesDescription: "1 container" }, { packagesDescription: "2nd container" }],
  },
};

describe("InlineTemplateRenderer", () => {
  it("fills the stored template against credentialSubject inside a Shadow DOM host", () => {
    const { getByTestId } = render(<InlineTemplateRenderer document={bolDocument} />);
    const host = getByTestId("inline-template-renderer");
    const shadow = host.shadowRoot;
    expect(shadow).not.toBeNull();
    expect(shadow!.querySelector('[data-field="blNumber"]')?.textContent).toBe("SGCNM21566325");
    expect(shadow!.querySelector('[data-field="shipperName"]')?.textContent).toBe("Shipper Co");
    expect(shadow!.querySelectorAll("tr")).toHaveLength(2);
    expect(shadow!.querySelector("style")?.textContent).toBe(css);
  });

  it("does not leak the template's CSS onto the light DOM host element", () => {
    const { getByTestId } = render(<InlineTemplateRenderer document={bolDocument} />);
    const host = getByTestId("inline-template-renderer");
    expect(host.querySelector("style")).toBeNull();
    expect(host.textContent).toBe("");
  });

  it("renders nothing when the document has no INLINE_TEMPLATE entry", () => {
    const { container } = render(
      <InlineTemplateRenderer document={{ renderMethod: [{ id: "https://x", type: "EMBEDDED_RENDERER" }] }} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
