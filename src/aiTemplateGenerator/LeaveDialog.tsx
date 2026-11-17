import React, { FunctionComponent } from "react";

interface LeaveDialogProps {
  open: boolean;
  onStay: () => void;
  onLeave: () => void;
}

export const LeaveDialog: FunctionComponent<LeaveDialogProps> = ({ open, onStay, onLeave }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(69,75,80,0.55)] p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="leave-title"
        className="w-full max-w-[440px] rounded-xl bg-white p-6 shadow-[0_20px_25px_-5px_rgba(0,0,0,0.15)]"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF7E2]">
          <svg
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8A5A00"
            strokeWidth="2"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <h2 id="leave-title" className="mb-0 mt-4 text-xl font-bold text-[#454B50]">
          Leave without downloading?
        </h2>
        <p className="mb-0 mt-2 text-sm leading-6 text-[#5F6970]">
          Your template isn&apos;t saved anywhere. If you leave now, your edits and the generated files are lost, and a
          new upload uses another of today&apos;s attempts.
        </p>
        <div className="mt-5 flex flex-wrap justify-end gap-2">
          <button
            type="button"
            onClick={onLeave}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#D1D5D9] bg-white px-4 text-sm font-bold text-[#2D5FAA]"
          >
            Leave anyway
          </button>
          <button
            type="button"
            onClick={onStay}
            className="min-h-11 rounded-xl border border-[#2D5FAA] bg-[#2D5FAA] px-4 text-sm font-bold text-white"
          >
            Stay on this page
          </button>
        </div>
      </div>
    </div>
  );
};
