import { templateGeneratorUrl } from "./apiBase";
import { isStep1ErrorCode, Step1ErrorCode } from "./types";

export type QuotaResult = { ok: true; attemptsRemaining: number } | { ok: false; code: Step1ErrorCode | "UNKNOWN" };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** Reads GET /template-generator/quota. Any server message is ignored so it cannot reach the page. */
export async function getQuota(idToken: string): Promise<QuotaResult> {
  let response: Response;
  try {
    response = await fetch(templateGeneratorUrl("/template-generator/quota"), {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${idToken}`,
      },
    });
  } catch {
    return { ok: false, code: "UNKNOWN" };
  }

  let body: unknown = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  const code = isRecord(body) && typeof body.code === "string" ? body.code : undefined;
  if (response.ok && isRecord(body) && typeof body.attemptsRemaining === "number") {
    return { ok: true, attemptsRemaining: body.attemptsRemaining };
  }
  if (code && isStep1ErrorCode(code)) return { ok: false, code };
  if (response.status === 401) return { ok: false, code: "AUTH_REQUIRED" };
  return { ok: false, code: "UNKNOWN" };
}
