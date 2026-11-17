import React, { FunctionComponent, useMemo, useState } from "react";
import { TemplateField, TemplateFiles } from "./generate";
import { LeaveDialog } from "./LeaveDialog";
import {
  DraftFiles,
  FILE_NOTES,
  FileTab,
  checkDraft,
  draftFromFiles,
  previewDocument,
  syncRename,
} from "./templateFiles";

const TABS: Array<{ id: FileTab; label: string; name: string }> = [
  { id: "tpl", label: "1 · HTML template", name: "HTML template" },
  { id: "css", label: "2 · Stylesheet", name: "Stylesheet" },
  { id: "cs", label: "3 · credentialSubject", name: "credentialSubject" },
  { id: "ctx", label: "4 · @context", name: "@context" },
];

interface ReviewStepProps {
  files: TemplateFiles;
  onDownload: (draft: DraftFiles) => void;
  onStartOver: () => void;
}

export const ReviewStep: FunctionComponent<ReviewStepProps> = ({ files, onDownload, onStartOver }) => {
  const original = useMemo(() => draftFromFiles(files), [files]);
  const [draft, setDraft] = useState<DraftFiles>(original);
  const [valid, setValid] = useState<DraftFiles>(original);
  const [tab, setTab] = useState<FileTab>("tpl");
  const [tip, setTip] = useState(false);
  const [leave, setLeave] = useState(false);

  const issues = checkDraft(draft);
  const changed = (Object.keys(original) as FileTab[]).some((key) => draft[key] !== original[key]);
  const preview = previewDocument(draft);
  const shown = preview || previewDocument(valid);
  const counts = issues.reduce<Record<string, number>>((total, issue) => {
    total[issue.tab] = (total[issue.tab] || 0) + 1;
    return total;
  }, {});
  const low = files.fields.filter((field) => typeof field.confidence === "number" && field.confidence < 0.85);

  const edit = (value: string) => {
    const next = syncRename(draft, { ...draft, [tab]: value }, tab);
    setDraft(next);
    if (checkDraft(next).length === 0) setValid(next);
  };

  return (
    <>
      <div className="mt-4 flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => setLeave(true)}
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#D1D5D9] bg-white px-4 text-base font-bold text-[#2D5FAA]"
        >
          Start over
        </button>
        <button
          type="button"
          disabled={issues.length > 0}
          onClick={() => onDownload(draft)}
          className={`inline-flex min-h-12 items-center justify-center rounded-xl px-5 text-base font-bold ${
            issues.length
              ? "cursor-not-allowed border border-[#D1D5D9] bg-[#E7EAEC] text-[#5F6970]"
              : "border border-[#2D5FAA] bg-[#2D5FAA] text-white"
          }`}
        >
          Download files
        </button>
      </div>
      {issues.length > 0 && (
        <p className="mb-0 mt-3 text-sm leading-6 text-[#A3170D]">
          Download is paused: {issues.length} {issues.length === 1 ? "error" : "errors"} in Your template files. Fix
          them to download.
        </p>
      )}
      <section aria-label="Preview" className="mt-8 rounded-xl border border-[#E7EAEC] bg-white px-4 py-6">
        <div className="mb-4">
          <div className="text-sm font-bold text-[#454B50]">Preview</div>
          <div className="text-xs text-[#5F6970]">
            The HTML template and stylesheet you will download, with the values from this document filled in. Change a
            value in the credentialSubject below and it changes here.
          </div>
        </div>
        {issues.length > 0 && (
          <div
            role="status"
            className="mb-3 flex items-start gap-2 rounded-lg border border-[#F3D58A] bg-[#FFF7E2] px-3 py-2.5 text-sm leading-6 text-[#6B4600]"
          >
            <strong className="font-bold">Preview paused.</strong> It shows your last valid version until the errors in
            Your template files are fixed.
          </div>
        )}
        {shown ? (
          <iframe
            title="Template preview"
            sandbox=""
            srcDoc={shown}
            className="h-[640px] w-full rounded-lg border border-[#E7EAEC] bg-white"
          />
        ) : (
          <p className="text-sm text-[#5F6970]">The preview appears when the four files are valid.</p>
        )}
      </section>

      <section
        aria-label="Your template files"
        className={`mt-6 rounded-xl bg-white px-4 py-6 ${
          issues.length ? "border-2 border-[#C21F12]" : "border border-[#E7EAEC]"
        }`}
      >
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="m-0 text-xl font-bold text-[#454B50]">Your template files</h3>
            <p className="mb-0 mt-1 max-w-[680px] text-sm leading-6 text-[#5F6970]">
              Every tab is editable: add elements, change labels and styles, rename fields or change the values. Rename
              a field name in the HTML template or @context and the other updates to match. The preview updates as soon
              as all four files are valid and match each other.
            </p>
          </div>
          <div className="relative flex items-center gap-2">
            {changed && (
              <button
                type="button"
                onClick={() => {
                  setDraft(original);
                  setValid(original);
                }}
                className="min-h-9 rounded-xl border border-[#D1D5D9] bg-white px-2.5 text-xs font-bold text-[#2D5FAA]"
              >
                Reset all files
              </button>
            )}
            <button
              type="button"
              aria-label="Label or field name — which is which?"
              aria-expanded={tip}
              onClick={() => setTip((open) => !open)}
              className="flex h-11 w-11 items-center justify-center border-0 bg-transparent text-[#6E787F]"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </button>
            {tip && (
              <div
                role="tooltip"
                className="absolute right-0 top-11 z-20 w-[360px] max-w-[calc(100vw-48px)] rounded-lg border border-[#E7EAEC] bg-white p-4 text-[#454B50] shadow-lg"
              >
                <div className="text-sm font-bold">Label or field name — which is which?</div>
                <p className="mb-0 mt-2 text-[13px] leading-5 text-[#5F6970]">
                  <strong className="text-[#454B50]">Label</strong> is the words printed on the document, stored as key.{" "}
                  <strong className="text-[#454B50]">Field name</strong> is the data-field value, such as
                  data-field=&quot;exporterName&quot;. Editing is free and never uses an AI attempt.
                </p>
              </div>
            )}
          </div>
        </div>

        {low.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2 text-[13px] text-[#5F6970]">
            <span>The AI was less sure about these fields. Check them in the preview:</span>
            {low.map((field: TemplateField) => (
              <span key={field.id} className="rounded-lg bg-[#FFF7E2] px-2 py-0.5 text-xs font-bold text-[#8A5A00]">
                {field.group ? `${field.group} · ` : ""}
                {field.label} {Math.round((field.confidence || 0) * 100)}%
              </span>
            ))}
          </div>
        )}

        <div role="tablist" aria-label="Template files" className="mt-4 flex items-end overflow-x-auto">
          {TABS.map((item) => {
            const count = counts[item.id] || 0;
            const selected = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={count ? `${item.label}, ${count} ${count === 1 ? "error" : "errors"}` : item.label}
                onClick={() => setTab(item.id)}
                className={`mr-2 inline-flex min-h-11 flex-none items-center whitespace-nowrap rounded-t-xl border border-b-0 px-3 text-sm ${
                  selected ? "border-[#1E242A] bg-[#1E242A] text-white" : "border-[#E7EAEC] bg-[#E7EAEC] text-[#454B50]"
                }`}
              >
                {item.label}
                {count > 0 && (
                  <span className="ml-2 rounded-full bg-[#C21F12] px-1.5 text-xs font-bold text-white">{count}</span>
                )}
              </button>
            );
          })}
        </div>
        <textarea
          value={draft[tab]}
          onChange={(event) => edit(event.target.value)}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          aria-label={`${TABS.find((item) => item.id === tab)?.name} (editable)`}
          aria-invalid={Boolean(counts[tab])}
          aria-describedby="file-errors"
          className={`box-border block h-[360px] w-full resize-y overflow-auto whitespace-pre rounded-b-xl rounded-tr-xl border-2 bg-[#1E242A] p-4 font-mono text-[12.5px] leading-7 text-[#DFE7EE] outline-offset-2 md:h-[560px] ${
            counts[tab] ? "border-[#E5675A]" : "border-[#1E242A]"
          }`}
        />
        <p className="mb-0 mt-2 text-xs leading-5 text-[#5F6970]">
          {FILE_NOTES[tab]} Use it with the TrustVC CLI or TrustVC SDK, or in ref.tradetrust.io/creator (coming later).
        </p>

        {issues.length > 0 && (
          <div
            id="file-errors"
            role="alert"
            className="mt-3 rounded-lg border border-[#C21F12] bg-[#FDECEA] px-4 py-3 text-[#7A160E]"
          >
            <div className="text-sm font-bold">
              {issues.length} {issues.length === 1 ? "error" : "errors"}. The preview and download are paused until they
              are fixed.
            </div>
            <ul className="m-0 mt-2 flex list-none flex-col gap-1 p-0">
              {issues.map((issue, index) => (
                <li key={`${issue.tab}-${issue.line}-${index}`}>
                  <button
                    type="button"
                    onClick={() => setTab(issue.tab)}
                    className="min-h-9 w-full rounded-md border-0 bg-transparent px-2 py-1.5 text-left text-[13px] leading-6 text-[#7A160E]"
                  >
                    <strong>
                      {TABS.find((item) => item.id === issue.tab)?.name}
                      {issue.line ? `, line ${issue.line}` : ""}:
                    </strong>{" "}
                    {issue.message}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => setLeave(true)}
          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#D1D5D9] bg-white px-4 text-base font-bold text-[#2D5FAA]"
        >
          Start over
        </button>
        {issues.length > 0 && <span className="text-sm text-[#A3170D]">Fix the errors above to download.</span>}
        <button
          type="button"
          disabled={issues.length > 0}
          onClick={() => onDownload(draft)}
          className={`inline-flex min-h-12 items-center justify-center rounded-xl px-5 text-base font-bold ${
            issues.length
              ? "cursor-not-allowed border border-[#D1D5D9] bg-[#E7EAEC] text-[#5F6970]"
              : "border border-[#2D5FAA] bg-[#2D5FAA] text-white"
          }`}
        >
          Download files
        </button>
      </div>
      <LeaveDialog open={leave} onStay={() => setLeave(false)} onLeave={onStartOver} />
    </>
  );
};
