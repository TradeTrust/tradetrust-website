import React, { FunctionComponent, useCallback, useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Page } from "../components/Layout/Page";
import { trackTemplateEvent } from "../aiTemplateGenerator/analytics";
import { canGenerate } from "../aiTemplateGenerator/canGenerate";
import { STEP_TITLES } from "../aiTemplateGenerator/copy";
import { DownloadStep } from "../aiTemplateGenerator/DownloadStep";
import { generateTemplate, TemplateFiles } from "../aiTemplateGenerator/generate";
import { requestSignIn } from "../aiTemplateGenerator/googleIdentity";
import { tokenForAiCall, useGoogleSession } from "../aiTemplateGenerator/googleSession";
import { LeaveDialog } from "../aiTemplateGenerator/LeaveDialog";
import { getQuota } from "../aiTemplateGenerator/quota";
import { ReadingStep } from "../aiTemplateGenerator/ReadingStep";
import { ReviewStep } from "../aiTemplateGenerator/ReviewStep";
import { DraftFiles } from "../aiTemplateGenerator/templateFiles";
import { Step1ErrorCode } from "../aiTemplateGenerator/types";
import { UploadStep } from "../aiTemplateGenerator/UploadStep";

const Aside: FunctionComponent<{ waiting?: boolean }> = ({ waiting }) => {
  if (waiting) {
    return (
      <aside className="flex min-w-0 flex-col gap-4" style={{ flex: "1 1 300px" }}>
        <div className="rounded-lg border border-[#E7EAEC] bg-white p-6">
          <h4 className="m-0 text-base font-bold text-[#454B50]">While you wait</h4>
          <p className="mb-0 mt-2 text-sm leading-6 text-[#5F6970]">
            A template describes <strong className="font-bold text-[#454B50]">layout</strong> — where things sit, what
            the labels say. The <strong className="font-bold text-[#454B50]">values</strong> come from each document you
            issue. On the next screen the credentialSubject starts with the values read from your document, and the
            preview shows them; change any value and the preview follows.
          </p>
        </div>
      </aside>
    );
  }
  return (
    <aside className="flex min-w-0 flex-col gap-4" style={{ flex: "1 1 300px" }}>
      <div className="rounded-lg border border-[#E7EAEC] bg-white p-6">
        <h4 className="m-0 text-base font-bold text-[#454B50]">What you will download</h4>
        <div className="mt-2 text-sm">
          {[
            ["1 · HTML template", "HTML"],
            ["2 · Stylesheet", "CSS"],
            ["3 · CredentialSubject", "JSON, no values"],
            ["4 · @context", "JSON"],
          ].map(([label, value], index, rows) => (
            <div
              key={label}
              className={`flex justify-between gap-2 py-2 ${
                index < rows.length - 1 ? "border-b border-dashed border-[#E7EAEC]" : ""
              }`}
            >
              <span className="text-[#5F6970]">{label}</span>
              <span className="text-right font-bold">{value}</span>
            </div>
          ))}
        </div>
        <p className="mb-0 mt-3.5 rounded-lg bg-[#E3F5ED] p-3 text-sm leading-6 text-[#454B50]">
          All four download together as one .zip. Nothing is kept on our side after that.
        </p>
      </div>
      <div className="rounded-lg border border-[#E7EAEC] bg-white p-6">
        <h4 className="m-0 text-base font-bold text-[#454B50]">What this is not</h4>
        <ul className="mb-0 mt-2.5 flex list-disc flex-col gap-1 pl-5 text-sm leading-6 text-[#5F6970]">
          <li>
            Not an account — you sign in with Google only so we can count your daily attempts. There&apos;s no
            TradeTrust password or profile.
          </li>
          <li>Not a template library — we don&apos;t save or list templates.</li>
          <li>
            Not a full template editor — you can rename labels and field names here; everything else you edit in the
            files you download.
          </li>
          <li>Not an issuer — it produces a template, not a document.</li>
          <li>Not a general-purpose AI assistant.</li>
        </ul>
      </div>
      <div className="flex items-start gap-3.5 rounded-lg border border-[#E7EAEC] bg-white p-6">
        <div>
          <h4 className="m-0 text-base font-bold text-[#454B50]">No API key needed</h4>
          <p className="mb-0 mt-1 text-sm leading-6 text-[#5F6970]">
            TradeTrust provides and pays for the AI service, so you don&apos;t need your own key.
          </p>
        </div>
      </div>
    </aside>
  );
};

const stepButtonClass =
  "inline-flex items-center justify-center rounded-xl border px-3 py-2 font-jakarta text-base font-bold leading-5";

const Stepper: FunctionComponent<{ step: number; action?: React.ReactNode; notice?: React.ReactNode }> = ({
  step,
  action,
  notice,
}) => {
  return (
    <section
      aria-label="Progress"
      className="mt-4 flex flex-col gap-7 rounded-lg bg-white px-4 pb-8 pt-6 shadow-dropdown sm:px-8"
    >
      <div aria-label={`Step ${step} of 4`} className="flex gap-1 py-4">
        {STEP_TITLES.map((title, index) => {
          const active = index === step - 1;
          const done = index < step;
          return (
            <div
              key={title}
              className="relative h-1 flex-1"
              style={{ background: done ? "#2D5FAA" : "#B4BCC2" }}
            >
              {active && (
                <div className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#2D5FAA] font-jakarta text-xs font-bold text-white">
                  {step}
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-4">
        <h2
          className="m-0 font-ubuntu text-[26px] font-normal leading-[30px] text-[#424448]"
          data-testid="step-title"
        >
          {STEP_TITLES[step - 1]}
        </h2>
        {action}
      </div>
      {notice}
    </section>
  );
};

export const AiTemplateGeneratorPage: FunctionComponent = () => {
  const session = useGoogleSession();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<Step1ErrorCode | null>(null);
  const [rejectedLabel, setRejectedLabel] = useState<string | null>(null);
  const [quotaError, setQuotaError] = useState<Step1ErrorCode | null>(null);
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);
  const [quotaState, setQuotaState] = useState<"idle" | "loading" | "ready" | "unavailable">("idle");
  const [ackUtility, setAckUtility] = useState(false);
  const [ackConfidential, setAckConfidential] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [reading, setReading] = useState<"loading" | "error" | "ready">("loading");
  const [readingError, setReadingError] = useState<string | null>(null);
  const [files, setFiles] = useState<TemplateFiles | null>(null);
  const [draft, setDraft] = useState<DraftFiles | null>(null);
  const [downloaded, setDownloaded] = useState(false);
  const [leave, setLeave] = useState(false);
  const [issueCount, setIssueCount] = useState(0);
  const reviewDraft = useRef<DraftFiles | null>(null);
  const authResends = useRef(0);
  const quotaRequest = useRef(0);
  const generating = useRef(false);
  const leaveReason = useRef<"start_over" | "upload_new_document">("start_over");
  const reportedErrors = useRef(0);

  useEffect(() => {
    if (!session.idToken) authResends.current = 0;
  }, [session.idToken]);

  useEffect(() => {
    if (step < 3 || downloaded) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [step, downloaded]);

  useEffect(() => {
    const token = session.idToken;
    if (!token) {
      setAttemptsRemaining(null);
      setQuotaError(null);
      setQuotaState("idle");
      return;
    }
    const requestId = ++quotaRequest.current;
    let cancelled = false;
    const stillCurrent = () => !cancelled && quotaRequest.current === requestId;
    setQuotaState("loading");
    const apply = (result: Awaited<ReturnType<typeof getQuota>>) => {
      if (!stillCurrent()) return;
      if (result.ok) {
        setAttemptsRemaining(result.attemptsRemaining);
        setQuotaError(null);
        setQuotaState("ready");
        return;
      }
      setAttemptsRemaining(null);
      if (result.code === "UNKNOWN") {
        setQuotaError(null);
        setQuotaState("unavailable");
        return;
      }
      setQuotaError(result.code);
      setQuotaState("ready");
    };
    getQuota(token).then(async (result) => {
      if (!stillCurrent()) return;
      if (!result.ok && result.code === "AUTH_REQUIRED" && authResends.current < 1) {
        authResends.current += 1;
        const next = await requestSignIn();
        if (!stillCurrent()) return;
        if (!next) {
          apply(result);
          return;
        }
        apply(await getQuota(next));
        return;
      }
      apply(result);
    });
    return () => {
      cancelled = true;
    };
  }, [session.idToken]);

  const continueToReview = useCallback(() => setStep(3), []);

  const runGenerate = async () => {
    if (!file || generating.current) return;
    generating.current = true;
    trackTemplateEvent("generate", { step: 2 });
    setStep(2);
    setReading("loading");
    setReadingError(null);
    setDownloaded(false);
    try {
      let token = await tokenForAiCall(requestSignIn);
      if (!token) {
        setReading("error");
        setReadingError("AUTH_REQUIRED");
        return;
      }
      let result = await generateTemplate(token, file);
      if (!result.ok && result.code === "AUTH_REQUIRED") {
        token = await requestSignIn();
        if (token) result = await generateTemplate(token, file);
      }
      if (result.ok) {
        if (result.files.attemptsRemaining !== null) setAttemptsRemaining(result.files.attemptsRemaining);
        setFiles(result.files);
        setReading("ready");
        return;
      }
      setReading("error");
      setReadingError(result.code);
    } finally {
      generating.current = false;
    }
  };

  const startOver = () => {
    setStep(1);
    setReading("loading");
    setReadingError(null);
    setFile(null);
    setFileError(null);
    setRejectedLabel(null);
    setAckUtility(false);
    setAckConfidential(false);
    setFiles(null);
    setDraft(null);
    setDownloaded(false);
    setLeave(false);
    setIssueCount(0);
    reportedErrors.current = 0;
    reviewDraft.current = null;
  };

  const onReviewChange = useCallback((state: { draft: DraftFiles; issueCount: number }) => {
    reviewDraft.current = state.draft;
    if (reportedErrors.current === 0 && state.issueCount > 0) trackTemplateEvent("template_error", { step: 3 });
    reportedErrors.current = state.issueCount;
    setIssueCount((current) => (current === state.issueCount ? current : state.issueCount));
  }, []);

  const generateEnabled = canGenerate({
    signedIn: Boolean(session.idToken),
    hasFile: Boolean(file),
    ackUtility,
    ackConfidential,
    fileError,
    quotaError,
    attemptsRemaining,
  });

  return (
    <>
      <Helmet>
        <title>TradeTrust - AI Template Generator</title>
      </Helmet>
      <Page>
        <div className="text-[#424448]">
          <div className="flex flex-col items-start gap-3">
            <h1
              className="m-0 max-w-[768px] font-ubuntu text-[30px] font-bold leading-[46px] text-[#424448] sm:text-[40px]"
              data-testid="page-title"
            >
              Get a starting template from a document you already use
            </h1>
            <p
              className="m-0 max-w-[688px] font-jakarta text-[16px] font-medium leading-[29px] text-[#424448] sm:text-[20px]"
              data-testid="page-subtitle"
            >
              Upload a PDF or an image of a document you issue today. The AI reads it once and gives you back the
              template code. You can rename the labels and field names here, then download the files.
            </p>
            <div className="w-full rounded-full bg-[#E3F5ED] px-3 py-[5px] font-jakarta text-xs font-bold leading-normal text-[#00702B] sm:w-auto">
              Reference utility · one document per session · your document is not kept
            </div>
          </div>
          <Stepper
            step={step}
            action={
              step === 3 ? (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      leaveReason.current = "start_over";
                      setLeave(true);
                    }}
                    className={`${stepButtonClass} border-[#E7EAEC] bg-white text-[#2D5FAA]`}
                  >
                    Start over
                  </button>
                  <button
                    type="button"
                    disabled={issueCount > 0}
                    onClick={() => {
                      if (reviewDraft.current && issueCount === 0) {
                        setDraft(reviewDraft.current);
                        setStep(4);
                      }
                    }}
                    className={`${stepButtonClass} ${
                      issueCount > 0
                        ? "cursor-not-allowed border-[#E7EAEC] bg-[#E7EAEC] text-[#5F6970]"
                        : "border-[#2D5FAA] bg-[#2D5FAA] text-white"
                    }`}
                  >
                    Download files
                  </button>
                </div>
              ) : step === 4 ? (
                <button
                  type="button"
                  onClick={() => {
                    leaveReason.current = "upload_new_document";
                    setLeave(true);
                  }}
                  className={`${stepButtonClass} border-[#E7EAEC] bg-white text-[#2D5FAA]`}
                >
                  Upload new document
                </button>
              ) : undefined
            }
            notice={
              step === 3 && issueCount > 0 ? (
                <p className="m-0 font-jakarta text-sm leading-6 text-[#A3170D]">
                  Download is paused: {issueCount} {issueCount === 1 ? "error" : "errors"} in Your template files. Fix
                  them to download.
                </p>
              ) : undefined
            }
          />
          <div className="mt-4 flex flex-wrap items-start gap-4">
            {step === 1 && (
              <>
                <UploadStep
                  file={file}
                  fileError={fileError}
                  rejectedLabel={rejectedLabel}
                  quotaError={quotaError}
                  attemptsRemaining={attemptsRemaining}
                  quotaState={quotaState}
                  ackUtility={ackUtility}
                  ackConfidential={ackConfidential}
                  canGenerate={generateEnabled}
                  onAckUtility={setAckUtility}
                  onAckConfidential={setAckConfidential}
                  onFile={(nextFile, error, label) => {
                    setFile(nextFile);
                    setFileError(error);
                    setRejectedLabel(label ?? null);
                  }}
                  onGenerate={() => {
                    void runGenerate();
                  }}
                />
                <Aside />
              </>
            )}
            {step === 2 && (
              <>
                <ReadingStep
                  phase={reading}
                  errorCode={readingError}
                  onContinue={continueToReview}
                  onRetry={() => {
                    void runGenerate();
                  }}
                  onStartOver={() => {
                    trackTemplateEvent("start_over", { step: 2 });
                    startOver();
                  }}
                />
                <Aside waiting />
              </>
            )}
            {step === 3 && files && (
              <div className="min-w-0 w-full">
                <ReviewStep
                  files={files}
                  upload={file}
                  onReviewChange={onReviewChange}
                  onDownload={(next) => {
                    setDraft(next);
                    setStep(4);
                  }}
                />
              </div>
            )}
            {step === 4 && draft && files && (
              <DownloadStep documentType={files.documentType} draft={draft} onDownloaded={() => setDownloaded(true)} />
            )}
          </div>
          {downloaded && (
            <p className="mt-6 text-sm text-[#00702B]">
              Downloaded. This session has ended and the document is no longer kept in this tab.
            </p>
          )}
        </div>
        <LeaveDialog
          open={leave}
          onStay={() => setLeave(false)}
          onLeave={() => {
            trackTemplateEvent(leaveReason.current, { step });
            startOver();
          }}
        />
      </Page>
    </>
  );
};
