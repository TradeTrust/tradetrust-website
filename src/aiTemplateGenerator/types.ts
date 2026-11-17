export const STEP1_ERROR_CODES = [
  "INVALID_FILE_TYPE",
  "FILE_TOO_LARGE",
  "UNREADABLE_FILE",
  "RATE_LIMITED",
  "DAILY_LIMIT_REACHED",
  "CREDIT_EXHAUSTED",
  "AUTH_REQUIRED",
] as const;

export type Step1ErrorCode = (typeof STEP1_ERROR_CODES)[number];

export const ACCEPTED_FILE_EXTENSIONS = [".pdf", ".png", ".jpg", ".jpeg"] as const;

export const MAX_FILE_BYTES = 10 * 1024 * 1024;

export const AI_TOKEN_RENEW_WITHIN_MS = 5 * 60 * 1000;

export function isStep1ErrorCode(value: string): value is Step1ErrorCode {
  return (STEP1_ERROR_CODES as readonly string[]).includes(value);
}
