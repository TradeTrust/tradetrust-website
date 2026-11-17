import prettyBytes from "pretty-bytes";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import {
  ATTEMPTS_NOTE,
  DISCLAIMER,
  QUOTA_UNAVAILABLE_MESSAGE,
  SIGN_IN_NOTICE,
  STEP1_ERROR_MESSAGES,
  STEP1_ERROR_TITLES,
  SUPPORT_FORM_URL,
} from "./copy";
import { googleClientId } from "./googleClientId";
import { mountGoogleSignIn } from "./googleIdentity";
import { useGoogleSession } from "./googleSession";
import { inspectFile } from "./inspectFile";
import { ACCEPTED_FILE_EXTENSIONS, MAX_FILE_BYTES, Step1ErrorCode } from "./types";

const ACCEPT = {
  "application/pdf": [".pdf"],
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
};

const FILE_ERRORS: Step1ErrorCode[] = ["INVALID_FILE_TYPE", "FILE_TOO_LARGE", "UNREADABLE_FILE"];

function rejectionCode(rejections: FileRejection[]): Step1ErrorCode {
  const codes = rejections.flatMap((rejection) => rejection.errors.map((error) => error.code));
  if (codes.includes("file-too-large") && !codes.includes("file-invalid-type")) return "FILE_TOO_LARGE";
  return "INVALID_FILE_TYPE";
}

export const Step1Error: FunctionComponent<{
  code: Step1ErrorCode;
  fileLabel?: string;
  onChooseAnother?: () => void;
}> = ({ code, fileLabel, onChooseAnother }) => {
  const fileError = FILE_ERRORS.includes(code);
  return (
    <div
      role="alert"
      data-testid="step1-error"
      className={`mt-4 box-border flex flex-col items-center gap-2 rounded-xl px-4 py-10 text-center ${
        fileError ? "border-2 border-dashed border-[#F3B4AE] bg-[#FEF2F2]" : "border border-[#D1D5D9] bg-[#F7F8FC]"
      }`}
    >
      {fileError ? (
        <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C21F12" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="15" y1="9" x2="9" y2="15" />
          <line x1="9" y1="9" x2="15" y2="15" />
        </svg>
      ) : (
        <svg aria-hidden="true" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6E787F" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      )}
      <p className={`m-0 mt-2 text-lg font-bold ${fileError ? "text-[#C21F12]" : "text-[#454B50]"}`}>
        {STEP1_ERROR_TITLES[code]}
      </p>
      <p className="m-0 max-w-[440px] text-sm leading-6 text-[#454B50]">{STEP1_ERROR_MESSAGES[code]}</p>
      {fileError && fileLabel && <p className="m-0 text-xs text-[#5F6970]">{fileLabel}</p>}
      {fileError && <p className="m-0 text-xs font-bold text-[#00702B]">This didn&apos;t use an attempt.</p>}
      {fileError && onChooseAnother && (
        <button
          type="button"
          onClick={onChooseAnother}
          className="mt-2 inline-flex min-h-11 min-w-[200px] items-center justify-center rounded-xl border border-[#2D5FAA] bg-[#2D5FAA] px-4 font-bold text-white"
        >
          Choose another file
        </button>
      )}
    </div>
  );
};

interface UploadStepProps {
  file: File | null;
  fileError: Step1ErrorCode | null;
  rejectedLabel: string | null;
  quotaError: Step1ErrorCode | null;
  attemptsRemaining: number | null;
  quotaState: "idle" | "loading" | "ready" | "unavailable";
  ackUtility: boolean;
  ackConfidential: boolean;
  canGenerate: boolean;
  onAckUtility: (value: boolean) => void;
  onAckConfidential: (value: boolean) => void;
  onFile: (file: File | null, error: Step1ErrorCode | null, rejectedLabel?: string | null) => void;
  onGenerate: () => void;
}

export const UploadStep: FunctionComponent<UploadStepProps> = ({
  file,
  fileError,
  rejectedLabel,
  quotaError,
  attemptsRemaining,
  quotaState,
  ackUtility,
  ackConfidential,
  canGenerate,
  onAckUtility,
  onAckConfidential,
  onFile,
  onGenerate,
}) => {
  const session = useGoogleSession();
  const noticeRef = useRef<HTMLParagraphElement>(null);
  const buttonHostRef = useRef<HTMLDivElement>(null);
  const [signInUnavailable, setSignInUnavailable] = useState(false);
  const signedIn = Boolean(session.idToken);
  const visibleError = fileError ?? quotaError;
  const limitError = Boolean(quotaError);
  const showDrop = signedIn && !file && !fileError && !limitError;

  useEffect(() => {
    if (session.idToken) return;
    if (!noticeRef.current || !buttonHostRef.current) return;
    let cancelled = false;
    mountGoogleSignIn(buttonHostRef.current, googleClientId()).catch(() => {
      if (!cancelled) setSignInUnavailable(true);
    });
    return () => {
      cancelled = true;
    };
  }, [session.idToken]);

  const onDrop = async (accepted: File[]) => {
    const next = accepted[0];
    if (!next) return;
    const error = await inspectFile(next);
    onFile(error ? null : next, error, error ? `${next.name} · ${prettyBytes(next.size)}` : null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPT,
    maxSize: MAX_FILE_BYTES,
    multiple: false,
    maxFiles: 1,
    noClick: !showDrop,
    noDrag: !showDrop,
    onDrop,
    onDropRejected: (rejections) => {
      const rejected = rejections[0]?.file;
      onFile(null, rejectionCode(rejections), rejected ? `${rejected.name} · ${prettyBytes(rejected.size)}` : null);
    },
  });

  const attemptsLabel = (() => {
    if (!signedIn) return "Sign in to see your attempts";
    if (quotaError === "RATE_LIMITED" || attemptsRemaining === 0) return "0 AI attempts left today";
    if (quotaError) return "Service unavailable";
    if (quotaState === "loading") return "Checking attempts left today";
    if (quotaState === "unavailable") return QUOTA_UNAVAILABLE_MESSAGE;
    if (attemptsRemaining === null) return "Sign in to see your attempts";
    const noun = attemptsRemaining === 1 ? "attempt" : "attempts";
    return `${attemptsRemaining} AI ${noun} left today`;
  })();

  const gateHint = !signedIn
    ? "Sign in with Google to continue."
    : quotaError
    ? "Generating is unavailable right now."
    : !file
    ? "Add your document to continue."
    : "Tick both boxes to continue.";

  return (
    <section
      style={{ flex: "2 1 560px" }}
      className="box-border min-w-0 rounded-lg bg-white p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] md:p-8"
    >
      <h3 className="m-0 text-xl font-bold text-[#454B50]">Your document</h3>
      <p className="mb-0 mt-2 text-sm text-[#5F6970]">
        One document, one read. A commercial AI service reads it to work out the layout and the fields, then it&apos;s
        discarded.
      </p>

      {!signedIn && (
        <div className="mt-4 flex flex-col items-center rounded-xl border border-[#D1D5D9] bg-[#F7F8FC] px-4 py-8 text-center">
          <svg
            aria-hidden="true"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2D5FAA"
            strokeWidth="2"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <p className="mb-0 mt-3 text-lg font-bold text-[#454B50]">Sign in to start</p>
          <p className="mb-4 mt-1.5 max-w-[440px] text-sm leading-6 text-[#5F6970]">
            We use sign-in only to count your daily attempts. There&apos;s no TradeTrust account or password.
          </p>
          <p
            ref={noticeRef}
            data-testid="sign-in-notice"
            style={{ order: 2 }}
            className="mb-0 mt-4 max-w-[460px] rounded-lg border border-[#E7EAEC] bg-white p-3 text-left text-xs leading-5 text-[#5F6970]"
          >
            <strong className="font-bold text-[#454B50]">About your Google account.</strong>{" "}
            {SIGN_IN_NOTICE.replace(/^About your Google account\.\s*/, "")}{" "}
            <a href="/privacy-policy">Privacy statement</a> ·{" "}
            <a href={SUPPORT_FORM_URL} target="_blank" rel="noopener noreferrer">
              Ask about your data
            </a>
          </p>
          <div ref={buttonHostRef} data-testid="google-sign-in" style={{ order: 1 }}>
            <button
              type="button"
              disabled
              className="inline-flex min-h-11 items-center justify-center gap-2.5 rounded border border-[#DADCE0] bg-white px-4 text-sm font-medium text-[#3C4043]"
            >
              Sign in with Google
            </button>
          </div>
          {signInUnavailable && (
            <p className="mb-0 mt-2 text-xs text-[#5F6970]">Sign-in is not available in this environment.</p>
          )}
        </div>
      )}

      {showDrop && (
        <div
          {...getRootProps()}
          data-testid="template-source-dropzone"
          className={`mt-4 flex w-full cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-[#D1D5D9] bg-white px-4 py-14 text-center text-[#454B50] ${
            isDragActive ? "bg-[#F7F8FC]" : ""
          }`}
        >
          <input {...getInputProps({ "data-testid": "template-file-input" })} />
          <img className="mb-7 h-auto w-14" src="/static/images/uploadicon/upload-icon-dark.png" alt="" />
          <span className="text-lg font-bold">Drag and drop your file here</span>
          <span className="mt-3.5 text-base">or</span>
          <span className="mt-3.5 inline-flex min-h-11 w-[200px] items-center justify-center rounded-xl border border-[#2D5FAA] bg-[#2D5FAA] text-base font-bold text-white">
            Browse File
          </span>
          <span className="mt-5 text-sm text-[#5F6970]">
            PDF, PNG or JPG · up to 10 MB · one document
            <span className="sr-only"> Accepted: {ACCEPTED_FILE_EXTENSIONS.join(", ")}</span>
          </span>
        </div>
      )}

      {file && !visibleError && (
        <div
          data-testid="upload-file-0"
          className="mt-4 flex min-h-16 items-center gap-3 rounded border border-[#D1D5D9] py-2 pl-4 pr-2"
        >
          <p className="m-0 min-w-0 flex-1 break-all font-bold text-[#454B50]">
            {file.name} <span className="text-xs font-medium text-[#5F6970]">({prettyBytes(file.size)})</span>
          </p>
          <button
            type="button"
            data-testid="remove-uploaded-file-0"
            aria-label="Remove file"
            className="flex h-11 w-11 items-center justify-center border-0 bg-transparent text-[#2D5FAA]"
            onClick={() => onFile(null, null, null)}
          >
            <svg
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}

      {visibleError && (
        <Step1Error
          code={visibleError}
          fileLabel={fileError ? rejectedLabel || undefined : undefined}
          onChooseAnother={
            fileError
              ? () => {
                  onFile(null, null, null);
                }
              : undefined
          }
        />
      )}

      <div className="mt-6 flex items-start gap-3 rounded-lg border border-[#F3D58A] bg-[#FFF7E2] p-4">
        <img src="/static/images/dropzone/warning.svg" className="mt-0.5 h-5 w-5 flex-none" alt="" />
        <p className="m-0 text-sm leading-6 text-[#454B50]" data-testid="attempts-note">
          <strong className="font-bold">3 attempts a day.</strong> {ATTEMPTS_NOTE.replace(/^3 attempts a day\.\s*/, "")}
        </p>
      </div>

      <hr className="my-6 border-0 border-t border-[#E7EAEC]" />

      <h4 className="m-0 text-base font-bold text-[#454B50]">Before you continue</h4>
      <div
        data-testid="ai-disclaimer"
        className="mt-3 flex items-start gap-3 rounded-lg border border-[#E7EAEC] bg-[#F7F8FC] px-4 py-3.5"
      >
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2D5FAA"
          strokeWidth="2"
          className="mt-0.5 flex-none"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        <p className="m-0 text-sm leading-6 text-[#454B50]">
          <strong className="font-bold">What happens to your upload.</strong>{" "}
          {DISCLAIMER.replace(/^What happens to your upload\.\s*/, "")}
        </p>
      </div>
      <div className="mt-3 flex flex-col gap-3">
        <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-6 text-[#5F6970]">
          <input
            type="checkbox"
            className="mt-0.5 h-[18px] w-[18px] flex-none accent-[#2D5FAA]"
            checked={ackUtility}
            onChange={(event) => onAckUtility(event.target.checked)}
          />
          <span>
            I understand this is a{" "}
            <strong className="font-bold text-[#454B50]">reference utility provided as-is</strong>, with no service
            level, no support commitment and no warranty that the template is fit for my purpose. It is a{" "}
            <strong className="font-bold text-[#454B50]">starting point I will review and finish myself</strong>.
          </span>
        </label>
        <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-6 text-[#5F6970]">
          <input
            type="checkbox"
            className="mt-0.5 h-[18px] w-[18px] flex-none accent-[#2D5FAA]"
            checked={ackConfidential}
            onChange={(event) => onAckConfidential(event.target.checked)}
          />
          <span>
            I confirm this document contains{" "}
            <strong className="font-bold text-[#454B50]">no personal data or confidential information</strong> I am not
            permitted to send to a third-party AI service.
          </span>
        </label>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
        <span className="text-sm text-[#5F6970]" data-testid="attempts-remaining">
          {attemptsLabel}
        </span>
        <button
          type="button"
          data-testid="generate-template"
          disabled={!canGenerate}
          onClick={onGenerate}
          className={`inline-flex min-h-12 items-center justify-center rounded-xl px-5 text-base font-bold ${
            canGenerate
              ? "border border-[#2D5FAA] bg-[#2D5FAA] text-white"
              : "cursor-not-allowed border border-[#E5E7EB] bg-[#E5E7EB] text-[#6E787F]"
          }`}
        >
          Generate template
        </button>
      </div>
      {!canGenerate && <p className="mb-0 mt-2 text-right text-xs text-[#5F6970]">{gateHint}</p>}
    </section>
  );
};
