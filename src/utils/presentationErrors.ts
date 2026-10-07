import { getPresentationFailure, getVerificationError, VerificationFragment } from "@trustvc/trustvc";

export interface PresentationError {
  type: string;
  /** Overriding copy, where no existing failureMessage conveys the cause. */
  message?: string;
}

/**
 * The single error a failing presentation should be reported as, or undefined when the
 * fragments describe no presentation failure at all (a credential, or a valid presentation).
 *
 * This used to be an ordered table of regexes matched against the verifier's English reason
 * text, with the copy for each outcome inlined here. That table now lives in
 * `@trustvc/trustvc`, keyed off a stable `reason.code` the fragments carry, so the matching is
 * no longer guesswork against prose a library release can reword.
 *
 * `getPresentationFailure` is the gate rather than a plain null check: `getVerificationError`
 * falls through to `errorMessageHandling` for anything that is NOT a presentation, which would
 * make this function claim every OpenAttestation failure as its own and pre-empt the caller's
 * own handling of them.
 *
 * `doc` is optional; without it, copy that names a credential falls back to the position alone
 * rather than the tab label.
 */
export const getPresentationError = (
  frags: VerificationFragment[] | null | undefined,
  doc?: unknown
): PresentationError | undefined => {
  if (!frags?.length) return undefined;
  if (!getPresentationFailure(frags)) return undefined;
  const resolved = getVerificationError(frags, doc);
  if (!resolved) return undefined;
  return { type: resolved.type, message: resolved.message };
};
