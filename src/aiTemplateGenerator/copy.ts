import { Step1ErrorCode } from "./types";

/** Shown beside the Google button before it can be used. */
export const SIGN_IN_NOTICE =
  "About your Google account. We use it only to count your daily attempts. We don't store your email; we keep only your Google account ID, cleared 90 days after your last visit.";

export const DISCLAIMER =
  "What happens to your upload. It is sent to a commercial AI service on zero-retention terms — the service doesn't store it or train on it. TradeTrust doesn't keep your document or the result. To apply the daily limit we keep your Google account ID and how many attempts you've used, never your email; the ID is cleared 90 days after your last visit.";

export const ATTEMPTS_NOTE =
  "3 attempts a day. A read that finishes, times out, or cannot be turned into a template uses one attempt. If the service cannot be reached, that try does not use an attempt. Renaming labels and field names on the next screen is always free.";

export const CONSENT_REFERENCE_UTILITY =
  "I understand this is a reference utility provided as-is, with no service level, no support commitment and no warranty that the template is fit for my purpose. It is a starting point I will review and finish myself.";

export const CONSENT_NO_CONFIDENTIAL_DATA =
  "I confirm this document contains no personal data or confidential information I am not permitted to send to a third-party AI service.";

/** Step-1 copy for each API and validation code. The code itself is never shown. */
export const STEP1_ERROR_TITLES: Record<Step1ErrorCode, string> = {
  INVALID_FILE_TYPE: "This file type isn't supported",
  FILE_TOO_LARGE: "This file is too large",
  UNREADABLE_FILE: "We couldn't read this file",
  RATE_LIMITED: "You've used today's attempts",
  DAILY_LIMIT_REACHED: "The service has reached today's limit",
  CREDIT_EXHAUSTED: "You have used up all available credits",
  AUTH_REQUIRED: "Please sign in with Google",
};

export const STEP1_ERROR_MESSAGES: Record<Step1ErrorCode, string> = {
  INVALID_FILE_TYPE: "Please upload a PDF, PNG or JPG.",
  FILE_TOO_LARGE: "The file could not be reduced to 4 MB.",
  UNREADABLE_FILE: "Try a clearer scan or a different export.",
  RATE_LIMITED: "You can try again after 12:00 AM (SGT).",
  DAILY_LIMIT_REACHED: "Please come back tomorrow.",
  CREDIT_EXHAUSTED: "Please check back later.",
  AUTH_REQUIRED: "Sign in with Google to continue.",
};

export const QUOTA_UNAVAILABLE_MESSAGE = "We couldn't check how many attempts are left. Try again in a moment.";

export const READING_MESSAGE = "Please wait while we generate your template.";

/** Reading-step copy. Codes that also appear on upload reuse the upload wording. */
export const GENERATE_ERROR_TITLES: Record<string, string> = {
  ...STEP1_ERROR_TITLES,
  AI_TIMEOUT: "This took too long",
  AI_INVALID_OUTPUT: "We couldn't produce a usable template from this document",
  SERVICE_DOWN: "The service is unavailable right now",
  NOT_A_DOCUMENT: "This doesn't look like a document we can make a template from",
  UNKNOWN: "The service is unavailable right now",
};

export const GENERATE_ERROR_MESSAGES: Record<string, string> = {
  ...STEP1_ERROR_MESSAGES,
  AI_TIMEOUT: "You can try again; this used one of today's attempts.",
  AI_INVALID_OUTPUT: "You can try again; this used one of today's attempts.",
  SERVICE_DOWN: "Please try again later.",
  NOT_A_DOCUMENT: "Please upload a document, certificate, or a similar page.",
  CONSENT_REQUIRED: "Please tick both boxes before generating your template.",
  UNKNOWN: "The service is unavailable right now. Please try again later.",
};

export const SUPPORT_FORM_URL = "https://www.form.gov.sg/635f32c5001b2d0011fff09b";

export const STEP_TITLES = [
  "Upload your document",
  "Reading your document",
  "Check & rename the fields",
  "Download and end session",
] as const;
