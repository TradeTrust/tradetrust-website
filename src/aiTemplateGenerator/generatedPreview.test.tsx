import { render, screen } from "@testing-library/react";
import React from "react";
import { TemplateFiles } from "./generate";
import { ReviewStep } from "./ReviewStep";
import { draftFromFiles, formatMarkup, formatStylesheet, generatedPreview, prettifyFile, syncRename } from "./templateFiles";

const files: TemplateFiles = {
  documentType: "certificate-of-origin",
  template: [
    "<h1>Certificate of Origin</h1>",
    "<p>Form for China-Australia Free Trade Agreement</p>",
    '<h2>Exporter</h2><span data-field="exporterName"></span>',
    '<h2>Importer</h2><span data-field="importerName"></span>',
  ].join(""),
  stylesheet: ".page{color:#424448}",
  credentialSubject: {
    exporterName: { key: "Name", value: "Treasury Wine Estates" },
    importerName: { key: "Name", value: "East Meets West Fine Wines" },
  },
  context: { "@context": { exporterName: "https://example.test/exporterName", importerName: "https://example.test/importerName" } },
  fields: [
    { id: "exporterName", label: "Name", name: "exporterName", group: "Exporter", type: "string" },
    { id: "importerName", label: "Name", name: "importerName", group: "Importer", type: "string" },
  ],
  attemptsRemaining: 2,
};

describe("template file formatting", () => {
  it("breaks a minified template and stylesheet onto indented lines", () => {
    const html = formatMarkup('<div class="page"><h1>Certificate of Origin</h1><span data-field="exporterName"></span></div>');
    expect(html.split("\n")).toEqual([
      '<div class="page">',
      "  <h1>",
      "    Certificate of Origin",
      "  </h1>",
      '  <span data-field="exporterName">',
      "  </span>",
      "</div>",
    ]);
    const css = formatStylesheet(".page{color:#424448;font-size:12px}@media (max-width:640px){.page{padding:8px}}");
    expect(css).toBe(
      [".page {", "  color: #424448;", "  font-size: 12px;", "}", "@media (max-width:640px) {", "  .page {", "    padding: 8px;", "  }", "}"].join(
        "\n"
      )
    );
    expect(prettifyFile("cs", '{"credentialSubject":{"name":{"key":"Name","value":"Ada"}}}')).toBe(
      '{\n  "credentialSubject": {\n    "name": {\n      "key": "Name",\n      "value": "Ada"\n    }\n  }\n}'
    );
    expect(prettifyFile("ctx", "{")).toBe("{");
  });
});

describe("generated preview", () => {
  it("groups the printed labels and the values from the credentialSubject", () => {
    const preview = generatedPreview(draftFromFiles(files), {
      documentType: files.documentType,
      template: files.template,
      fields: files.fields,
    });
    expect(preview?.title).toBe("Certificate of Origin");
    expect(preview?.subtitle).toBe("Form for China-Australia Free Trade Agreement");
    expect(preview?.groups.map((group) => group.name)).toEqual(["Exporter", "Importer"]);
    expect(preview?.groups[0].fields[0]).toMatchObject({ label: "Name", value: "Treasury Wine Estates" });
  });

  it("renders field cards and both preview views", () => {
    render(<ReviewStep files={files} upload={null} onDownload={() => undefined} onReviewChange={() => undefined} />);
    expect(screen.getByRole("tab", { name: "Generated template" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Treasury Wine Estates")).toBeInTheDocument();
    expect(screen.getByText("East Meets West Fine Wines")).toBeInTheDocument();
    expect(screen.getByText("Exporter")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /prettify html template/i })).toBeInTheDocument();
    expect(document.body.innerHTML).toContain("sm:w-[273px]");
  });

  it("shows the field name when the extracted value is empty", () => {
    const draft = draftFromFiles({
      ...files,
      credentialSubject: {
        exporterName: { key: "Name", value: "" },
        importerName: { key: "Name", value: "East Meets West Fine Wines" },
      },
    });
    const preview = generatedPreview(draft, {
      documentType: files.documentType,
      template: files.template,
      fields: files.fields,
    });
    expect(preview?.groups[0].fields[0].value).toBe("exporterName");
  });
});

describe("field sync", () => {
  const context = {
    "@context": {
      "@version": 1.1,
      doc: "https://trustvc.io/context/document.json#",
      Document: {
        "@id": "doc:Document",
        "@context": {
          exporterName: { "@id": "doc:exporterName", "@type": "xsd:string" },
          importerName: { "@id": "doc:importerName", "@type": "xsd:string" },
        },
      },
    },
  };
  const base = {
    tpl: '<span data-field="exporterName"></span><span data-field="importerName"></span>',
    css: ".page{color:#424448}",
    cs: JSON.stringify({
      credentialSubject: {
        exporterName: { key: "Name", value: "ABC" },
        importerName: { key: "Name", value: "XYZ" },
      },
    }),
    ctx: JSON.stringify(context),
  };

  it("renames a field from the HTML template into credentialSubject and @context", () => {
    const next = syncRename(base, { ...base, tpl: base.tpl.replace("exporterName", "shipperName") }, "tpl");
    expect(next.cs).toContain('"shipperName"');
    expect(next.cs).not.toContain('"exporterName"');
    expect(next.ctx).toContain('"shipperName"');
    expect(next.ctx).toContain("doc:shipperName");
    expect(next.ctx).not.toContain("exporterName");
  });

  it("renames a field from credentialSubject into the HTML template and @context", () => {
    const subject = JSON.parse(base.cs);
    subject.credentialSubject.shipperName = subject.credentialSubject.exporterName;
    delete subject.credentialSubject.exporterName;
    const next = syncRename(base, { ...base, cs: JSON.stringify(subject) }, "cs");
    expect(next.tpl).toContain('data-field="shipperName"');
    expect(next.tpl).not.toContain('data-field="exporterName"');
    expect(next.ctx).toContain("doc:shipperName");
  });

  it("renames a field from @context into the HTML template and credentialSubject", () => {
    const renamed = JSON.parse(base.ctx);
    const terms = renamed["@context"].Document["@context"];
    terms.shipperName = { ...terms.exporterName, "@id": "doc:shipperName" };
    delete terms.exporterName;
    const next = syncRename(base, { ...base, ctx: JSON.stringify(renamed) }, "ctx");
    expect(next.tpl).toContain('data-field="shipperName"');
    expect(next.cs).toContain('"shipperName"');
    expect(next.cs).not.toContain('"exporterName"');
  });

  it("adds a new HTML field and removes it when its last use is gone", () => {
    const added = syncRename(base, { ...base, tpl: `${base.tpl}<span data-field="vesselName"></span>` }, "tpl");
    expect(JSON.parse(added.cs).credentialSubject.vesselName).toEqual({ key: "vesselName", value: "" });
    expect(JSON.parse(added.ctx)["@context"].Document["@context"].vesselName["@id"]).toBe("doc:vesselName");
    const removed = syncRename(added, { ...added, tpl: base.tpl }, "tpl");
    expect(JSON.parse(removed.cs).credentialSubject.vesselName).toBeUndefined();
    expect(JSON.parse(removed.ctx)["@context"].Document["@context"].vesselName).toBeUndefined();
  });

  it("does not copy an invalid field name", () => {
    const next = syncRename(base, { ...base, tpl: base.tpl.replace("exporterName", "1bad") }, "tpl");
    expect(next.cs).toContain('"exporterName"');
    expect(next.ctx).toContain("exporterName");
    expect(next.cs).not.toContain("1bad");
  });
});
