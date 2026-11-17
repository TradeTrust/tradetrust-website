import React, { FunctionComponent, useEffect, useState } from "react";
import { GENERATE_ERROR_MESSAGES, GENERATE_ERROR_TITLES, READING_MESSAGE } from "./copy";

interface ReadingStepProps {
  phase: "loading" | "ready" | "error";
  errorCode: string | null;
  onContinue: () => void;
  onRetry: () => void;
  onStartOver: () => void;
}

export const ReadingStep: FunctionComponent<ReadingStepProps> = ({
  phase,
  errorCode,
  onContinue,
  onRetry,
  onStartOver,
}) => {
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    if (phase !== "ready") return;
    let left = 3;
    setSeconds(3);
    const tick = window.setInterval(() => {
      left -= 1;
      setSeconds(Math.max(left, 0));
      if (left <= 0) {
        window.clearInterval(tick);
        onContinue();
      }
    }, 1000);
    return () => window.clearInterval(tick);
  }, [phase, onContinue]);

  const title = GENERATE_ERROR_TITLES[errorCode || "UNKNOWN"] || GENERATE_ERROR_TITLES.UNKNOWN;
  const message = GENERATE_ERROR_MESSAGES[errorCode || "UNKNOWN"] || GENERATE_ERROR_MESSAGES.UNKNOWN;

  return (
    <section
      style={{ flex: "2 1 560px" }}
      className="box-border min-w-0 rounded-lg bg-white p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] md:p-8"
      data-testid="reading-step"
    >
      <style>{`@keyframes tt-scan{from{transform:translateY(0)}to{transform:translateY(92px)}}@keyframes tt-pulse{0%,100%{opacity:.25}50%{opacity:1}}@media (prefers-reduced-motion: reduce){.tt-anim{animation:none !important}}`}</style>
      {phase === "loading" && (
        <div role="status" aria-live="polite" className="flex flex-col items-center gap-5 px-2 py-10 text-center">
          <div
            aria-hidden="true"
            className="relative h-[120px] w-24 overflow-hidden rounded-lg border-2 border-[#2D5FAA] bg-white shadow-[0_6px_16px_rgba(45,95,170,0.15)]"
          >
            <div className="absolute left-3.5 right-3.5 top-[18px] h-1.5 rounded-sm bg-[#D1D5D9]" />
            <div className="absolute left-3.5 right-7 top-[34px] h-1.5 rounded-sm bg-[#E7EAEC]" />
            <div className="absolute left-3.5 right-3.5 top-[50px] h-1.5 rounded-sm bg-[#E7EAEC]" />
            <div className="absolute left-3.5 right-10 top-[66px] h-1.5 rounded-sm bg-[#E7EAEC]" />
            <div className="absolute left-3.5 right-5 top-[82px] h-1.5 rounded-sm bg-[#E7EAEC]" />
            <div
              className="tt-anim absolute left-0 right-0 top-0 h-7 border-b-2 border-[#4DA6E8] bg-gradient-to-b from-transparent to-[rgba(77,166,232,0.3)]"
              style={{ animation: "tt-scan 1.8s ease-in-out infinite alternate" }}
            />
          </div>
          <div aria-hidden="true" className="flex gap-2">
            {[0, 0.2, 0.4].map((delay) => (
              <span
                key={delay}
                className="tt-anim h-2 w-2 rounded-full bg-[#2D5FAA]"
                style={{ animation: `tt-pulse 1.2s ease-in-out ${delay}s infinite` }}
              />
            ))}
          </div>
          <p data-testid="reading-message" className="m-0 text-xl font-bold text-[#454B50]">
            {READING_MESSAGE}
          </p>
          <p className="m-0 max-w-[420px] text-sm leading-6 text-[#5F6970]">
            This usually takes 20–40 seconds. Please don&apos;t close this tab — nothing is saved to come back to.
          </p>
        </div>
      )}
      {phase === "ready" && (
        <div className="flex flex-col items-center gap-3 px-2 py-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E3F5ED]">
            <svg
              aria-hidden="true"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#00702B"
              strokeWidth="2"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <p
            role="status"
            aria-live="polite"
            data-testid="reading-ready"
            className="m-0 text-xl font-bold text-[#454B50]"
          >
            Your template is ready
          </p>
          <p className="m-0 text-sm text-[#5F6970]">
            {seconds > 0
              ? `Taking you to Check & rename the fields in ${seconds} ${seconds === 1 ? "second." : "seconds."}`
              : "Taking you to Check & rename the fields…"}
          </p>
          <div
            aria-hidden="true"
            className="mt-1 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-[#2D5FAA] text-xl font-bold text-[#2D5FAA]"
          >
            {seconds}
          </div>
        </div>
      )}
      {phase === "error" && (
        <div
          role="alert"
          data-testid="reading-error"
          className="flex flex-col gap-3 rounded-lg border border-[#F3B4AE] bg-[#FEF2F2] p-4"
        >
          <div className="flex items-start gap-3">
            <svg
              aria-hidden="true"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C21F12"
              strokeWidth="2"
              className="flex-none"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <div>
              <p className="m-0 text-base font-bold text-[#C21F12]">{title}</p>
              <p className="mb-0 mt-1 text-sm leading-6 text-[#454B50]">{message}</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-end gap-2">
            <button
              type="button"
              onClick={onStartOver}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#D1D5D9] bg-white px-4 text-sm font-bold text-[#2D5FAA]"
            >
              Start over
            </button>
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#2D5FAA] bg-[#2D5FAA] px-4 text-sm font-bold text-white"
            >
              Try again
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
