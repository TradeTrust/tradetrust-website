import { templateGeneratorUrl } from "./apiBase";

export const GENERATE_ERROR_CODES = [
  "INVALID_FILE_TYPE",
  "FILE_TOO_LARGE",
  "UNREADABLE_FILE",
  "AI_TIMEOUT",
  "AI_INVALID_OUTPUT",
  "RATE_LIMITED",
  "DAILY_LIMIT_REACHED",
  "CREDIT_EXHAUSTED",
  "SERVICE_DOWN",
  "NOT_A_DOCUMENT",
  "CONSENT_REQUIRED",
  "AUTH_REQUIRED",
] as const;

export type GenerateErrorCode = (typeof GENERATE_ERROR_CODES)[number];

export type CredentialPair = { key: string; value: string };

export type CredentialSubject = Record<string, CredentialPair>;

export type TemplateField = {
  id: string;
  label: string;
  name: string;
  group: string;
  type: string;
  confidence?: number;
};

export type TemplateFiles = {
  documentType: string;
  template: string;
  stylesheet: string;
  credentialSubject: CredentialSubject;
  context: Record<string, unknown>;
  fields: TemplateField[];
  attemptsRemaining: number | null;
};

export type GenerateResult = { ok: true; files: TemplateFiles } | { ok: false; code: GenerateErrorCode | "UNKNOWN" };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isGenerateErrorCode(value: string): value is GenerateErrorCode {
  return (GENERATE_ERROR_CODES as readonly string[]).includes(value);
}

/** POST /template-generator/generate. Server text is dropped; only a known code is returned. */
export async function generateTemplate(idToken: string, file: File): Promise<GenerateResult> {
  const body = new FormData();
  body.append("file", file, file.name);
  body.append("consent", "true");

  let response: Response;
  try {
    response = await fetch(templateGeneratorUrl("/template-generator/generate"), {
      method: "POST",
      headers: { Accept: "application/json", Authorization: `Bearer ${idToken}` },
      body,
    });
  } catch {
    return { ok: false, code: "UNKNOWN" };
  }

  let payload: unknown = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }
  const code = isRecord(payload) && typeof payload.code === "string" ? payload.code : undefined;
  if (response.ok && isRecord(payload) && typeof payload.template === "string" && isRecord(payload.credentialSubject)) {
    const credentialSubject: CredentialSubject = {};
    Object.entries(payload.credentialSubject).forEach(([name, item]) => {
      if (!isRecord(item) || typeof item.key !== "string") return;
      credentialSubject[name] = { key: item.key, value: typeof item.value === "string" ? item.value : "" };
    });
    const fields = Array.isArray(payload.fields)
      ? payload.fields.flatMap((item) => {
          if (!isRecord(item) || typeof item.label !== "string" || typeof item.name !== "string") return [];
          return [
            {
              id: typeof item.id === "string" ? item.id : item.name,
              label: item.label,
              name: item.name,
              group: typeof item.group === "string" ? item.group : "",
              type: typeof item.type === "string" ? item.type : "string",
              ...(typeof item.confidence === "number" ? { confidence: item.confidence } : {}),
            },
          ];
        })
      : [];
    return {
      ok: true,
      files: {
        documentType: typeof payload.documentType === "string" ? payload.documentType : "document",
        template: payload.template,
        stylesheet: typeof payload.stylesheet === "string" ? payload.stylesheet : "",
        credentialSubject,
        context: isRecord(payload.context) ? payload.context : {},
        fields,
        attemptsRemaining: typeof payload.attemptsRemaining === "number" ? payload.attemptsRemaining : null,
      },
    };
  }
  if (code && isGenerateErrorCode(code)) return { ok: false, code };
  if (response.status === 401) return { ok: false, code: "AUTH_REQUIRED" };
  return { ok: false, code: "UNKNOWN" };
}
