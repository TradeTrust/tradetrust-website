import { render, waitFor } from "@testing-library/react";
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
  renderMethod: [{ type: "INLINE_HTML_TEMPLATE", template: { templateName: "BILL_OF_LADING", html, css } }],
  credentialSubject: {
    blNumber: "SGCNM21566325",
    shipperName: "Shipper Co",
    packages: [{ packagesDescription: "1 container" }, { packagesDescription: "2nd container" }],
  },
};

// jsdom doesn't load srcdoc frames, so assert on the srcdoc the frame was given.
const frameDocument = (frame: HTMLIFrameElement) => new DOMParser().parseFromString(frame.srcdoc, "text/html");

describe("InlineTemplateRenderer", () => {
  it("fills the stored template against credentialSubject inside a sandboxed iframe", async () => {
    const { getByTestId } = render(<InlineTemplateRenderer document={bolDocument} />);
    const host = getByTestId("inline-template-renderer");
    // The template is decompressed asynchronously before it is mounted.
    await waitFor(() => expect(host.querySelector("iframe")).not.toBeNull());
    const frame = host.querySelector("iframe") as HTMLIFrameElement;
    expect(frame.getAttribute("sandbox")).toBe("allow-same-origin allow-modals");
    const doc = frameDocument(frame);
    expect(doc.querySelector('[data-field="blNumber"]')?.textContent).toBe("SGCNM21566325");
    expect(doc.querySelector('[data-field="shipperName"]')?.textContent).toBe("Shipper Co");
    expect(doc.querySelectorAll("tr")).toHaveLength(2);
    expect(Array.from(doc.querySelectorAll("style")).map((s) => s.textContent)).toContain(css);
  });

  it("does not put the template's markup or CSS into the page's DOM", async () => {
    const { getByTestId } = render(<InlineTemplateRenderer document={bolDocument} />);
    const host = getByTestId("inline-template-renderer");
    await waitFor(() => expect(host.querySelector("iframe")).not.toBeNull());
    expect(host.shadowRoot).toBeNull();
    expect(host.querySelector("style, .bol")).toBeNull();
    expect(host.textContent).toBe("");
  });

  it("renders nothing when the document has no INLINE_HTML_TEMPLATE entry", () => {
    const { container } = render(
      <InlineTemplateRenderer document={{ renderMethod: [{ id: "https://x", type: "EMBEDDED_RENDERER" }] }} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});

describe("InlineTemplateRenderer — fallback", () => {
  it("calls onFailure when the template can't be rendered", async () => {
    const onFailure = jest.fn();
    // A compressed `template` string that isn't valid gzip fails to decompress.
    const brokenDocument = {
      renderMethod: [{ type: "INLINE_HTML_TEMPLATE", template: "not-gzip" }],
      credentialSubject: {},
    };
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    render(<InlineTemplateRenderer document={brokenDocument} onFailure={onFailure} />);
    await waitFor(() => expect(onFailure).toHaveBeenCalledTimes(1));
  });

  it("does not call onFailure when the template renders", async () => {
    const onFailure = jest.fn();
    const { getByTestId } = render(<InlineTemplateRenderer document={bolDocument} onFailure={onFailure} />);
    await waitFor(() => expect(getByTestId("inline-template-renderer").querySelector("iframe")).not.toBeNull());
    expect(onFailure).not.toHaveBeenCalled();
  });
});

describe("InlineTemplateRenderer — print", () => {
  it("prints the rendered template's frame through its ref", async () => {
    const ref = React.createRef<{ print: () => void }>();
    const { getByTestId } = render(<InlineTemplateRenderer document={bolDocument} ref={ref} />);
    await waitFor(() => expect(getByTestId("inline-template-renderer").querySelector("iframe")).not.toBeNull());
    const frameWindow = (getByTestId("inline-template-renderer").querySelector("iframe") as HTMLIFrameElement)
      .contentWindow as Window;
    jest.spyOn(frameWindow, "focus").mockImplementation(() => undefined);
    const framePrint = jest.spyOn(frameWindow, "print").mockImplementation(() => undefined);
    ref.current?.print();
    expect(framePrint).toHaveBeenCalledTimes(1);
  });
});
