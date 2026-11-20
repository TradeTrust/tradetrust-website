import React, { FunctionComponent, useState } from "react";
import { trackTemplateEvent } from "./analytics";
import { SUPPORT_FORM_URL } from "./copy";
import { DraftFiles, downloadZip } from "./templateFiles";

interface DownloadStepProps {
  documentType: string;
  draft: DraftFiles;
  onDownloaded: () => void;
}

const FILES = [
  { badge: "HTML", color: "#E4572E", name: "template.html", label: "HTML template" },
  { badge: "CSS", color: "#2D5FAA", name: "template.css", label: "stylesheet" },
  { badge: "JSON", color: "#00702B", name: "credentialSubject.json", label: "fields and values" },
  { badge: "JSON", color: "#7B1FA2", name: "context.json", label: "@context" },
];

export const DownloadStep: FunctionComponent<DownloadStepProps> = ({ documentType, draft, onDownloaded }) => {
  const [ack, setAck] = useState(false);
  const slug = /^[a-z0-9-]{1,40}$/.test(documentType) ? documentType : "document";
  const names = [`${slug}.template.html`, `${slug}.template.css`, "credentialSubject.json", "context.json"];

  return (
    <>
      <section
        style={{ flex: "2 1 560px" }}
        className="box-border min-w-0 rounded-lg bg-white p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] md:p-8"
      >
        <h3 className="m-0 text-xl font-bold text-[#454B50]">Download your files</h3>
        <p className="mb-0 mt-2 text-sm leading-6 text-[#5F6970]">
          You&apos;ll get one .zip with four files: the template, its stylesheet, the credentialSubject and the
          @context. Then this session ends and everything is deleted.
        </p>
        <div className="mt-4 overflow-hidden rounded-lg border border-[#D1D5D9]">
          <div className="flex min-h-16 items-center gap-3 border-b border-[#E7EAEC] bg-[#F7F8FC] px-4 py-2.5">
            <p className="m-0 min-w-0 flex-1 break-all font-bold text-[#454B50]">
              {slug}-template.zip <span className="text-xs font-medium text-[#5F6970]">(4 files)</span>
            </p>
          </div>
          <ul aria-label={`Files in ${slug}-template.zip`} className="m-0 list-none py-2.5 pl-8 pr-4">
            {FILES.map((file, index) => (
              <li key={file.name} className="relative flex min-h-10 items-center gap-2.5 pl-7">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 w-0 border-l-2 border-[#D1D5D9] ${
                    index === FILES.length - 1 ? "top-0 h-1/2" : "top-0 bottom-0"
                  }`}
                />
                <span aria-hidden="true" className="absolute left-0 top-1/2 w-[18px] border-t-2 border-[#D1D5D9]" />
                <span
                  className="rounded px-1.5 py-0.5 text-[10px] font-bold text-white"
                  style={{ background: file.color }}
                >
                  {file.badge}
                </span>
                <span className="min-w-0 break-all">
                  <span className="font-mono text-[13px] text-[#454B50]">{names[index]}</span>{" "}
                  <span className="text-xs text-[#5F6970]">· {file.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-sm leading-6 text-[#5F6970]">
          <input
            type="checkbox"
            className="mt-0.5 h-[18px] w-[18px] flex-none accent-[#2D5FAA]"
            checked={ack}
            onChange={(event) => setAck(event.target.checked)}
          />
          <span>
            I understand my template is <strong className="font-bold text-[#454B50]">not saved</strong>. Once this
            session ends, this download is the only copy.
          </span>
        </label>
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
          <button
            type="button"
            disabled={!ack}
            onClick={() => {
              trackTemplateEvent("download", { step: 4 });
              downloadZip(slug, draft);
              onDownloaded();
            }}
            className={`inline-flex min-h-12 items-center justify-center rounded-xl px-5 text-base font-bold ${
              ack
                ? "border border-[#2D5FAA] bg-[#2D5FAA] text-white"
                : "cursor-not-allowed border border-[#E5E7EB] bg-[#E5E7EB] text-[#6E787F]"
            }`}
          >
            Download
          </button>
        </div>
      </section>
      <aside className="flex min-w-0 flex-col gap-4" style={{ flex: "1 1 300px" }}>
        <div className="flex flex-col gap-2 rounded-lg border border-[#E7EAEC] bg-white p-6">
          <h4 className="m-0 text-base font-bold text-[#454B50]">How to use these files</h4>
          <p className="m-0 text-sm leading-6 text-[#5F6970]">
            A step-by-step guide to embedding the template in a W3C credential with the TrustVC SDK (compressTemplate,
            then inlineTemplate) or the TrustVC CLI, and how to change anything later.
          </p>
          <a
            href="https://docs.tradetrust.io/docs/how-tos/ai-template-files"
            className="inline-flex min-h-11 items-center self-start rounded-xl border border-[#2D5FAA] bg-white px-3.5 text-sm font-bold text-[#2D5FAA] no-underline"
          >
            Read the guide ↗
          </a>
        </div>
        <div className="flex flex-col gap-2 rounded-lg border-2 border-dashed border-[#B4BCC2] bg-white p-6">
          <span className="self-start rounded bg-[#E7EAEC] px-2 py-0.5 text-xs font-bold text-[#454B50]">
            Coming later
          </span>
          <h4 className="m-0 text-base font-bold text-[#454B50]">Next: issue a document with it</h4>
          <p className="m-0 text-sm leading-6 text-[#5F6970]">
            Take the files to{" "}
            <a href="https://ref.tradetrust.io/creator" className="font-bold">
              ref.tradetrust.io/creator
            </a>
            , choose &quot;bring your own template&quot;, and issue on the sandbox identity.
          </p>
        </div>
      </aside>
      <section
        aria-label="Feedback"
        className="mt-8 flex w-full basis-full flex-wrap items-center justify-between gap-3 rounded-lg border border-[#E7EAEC] bg-white px-4 py-4 md:px-6"
      >
        <p className="m-0 text-sm leading-6 text-[#454B50]">
          Did the AI get your document right? Tell us what worked and what didn&apos;t.
        </p>
        <a
          href={SUPPORT_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackTemplateEvent("feedback_click", { step: 4 })}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#2D5FAA] bg-white px-3.5 text-sm font-bold text-[#2D5FAA] no-underline"
        >
          Give feedback ↗
        </a>
      </section>
    </>
  );
};
