import { Step1ErrorCode } from "./types";

export function canGenerate(input: {
  signedIn: boolean;
  hasFile: boolean;
  ackUtility: boolean;
  ackConfidential: boolean;
  fileError: Step1ErrorCode | null;
  quotaError: Step1ErrorCode | null;
  attemptsRemaining: number | null;
}): boolean {
  if (!input.signedIn || !input.hasFile || !input.ackUtility || !input.ackConfidential) return false;
  if (input.fileError || input.quotaError) return false;
  if (input.attemptsRemaining === null || input.attemptsRemaining <= 0) return false;
  return true;
}
